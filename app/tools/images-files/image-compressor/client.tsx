"use client"

import { useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ImageDown } from "lucide-react"

type Result = {
  name: string
  originalBytes: number
  blob: Blob
}

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`
  const units = ["KB", "MB", "GB"]
  let u = -1
  do {
    b = b / 1024
    u++
  } while (b >= 1024 && u < units.length - 1)
  return `${b.toFixed(2)} ${units[u]}`
}

async function loadImage(file: File): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file)
  try {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = url
    await new Promise((res, rej) => {
      img.onload = () => res(true)
      img.onerror = rej
    })
    return img
  } finally {
    // URL.revokeObjectURL will be done after drawing to avoid losing src
  }
}

export default function ImageCompressorClient() {
  const [files, setFiles] = useState<File[]>([])
  const [quality, setQuality] = useState(0.8)
  const [maxW, setMaxW] = useState<number | "">(1920)
  const [maxH, setMaxH] = useState<number | "">(1080)
  const [results, setResults] = useState<Result[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const totalSaved = useMemo(() => {
    const original = files.reduce((s, f) => s + f.size, 0)
    const out = results.reduce((s, r) => s + r.blob.size, 0)
    return { original, out, saved: original - out }
  }, [files, results])

  async function handleCompress() {
    const out: Result[] = []
    for (const file of files) {
      const img = await loadImage(file)
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")!
      let w = img.naturalWidth
      let h = img.naturalHeight
      if (typeof maxW === "number" && w > maxW) {
        h = Math.round((h * maxW) / w)
        w = maxW
      }
      if (typeof maxH === "number" && h > maxH) {
        w = Math.round((w * maxH) / h)
        h = maxH
      }
      canvas.width = w
      canvas.height = h
      ctx.drawImage(img, 0, 0, w, h)

      // Prefer JPEG/WebP for better compression for photographs; keep PNG for graphics
      const isPNG = file.type === "image/png"
      const mime = isPNG ? "image/png" : "image/jpeg"
      const blob: Blob = await new Promise((resolve) => {
        canvas.toBlob((b) => resolve(b || new Blob()), mime, isPNG ? undefined : quality)
      })

      out.push({
        name: file.name.replace(/\.(png|jpg|jpeg|webp)$/i, "") + (isPNG ? ".png" : ".jpg"),
        originalBytes: file.size,
        blob,
      })
      URL.revokeObjectURL(img.src)
    }
    setResults(out)
  }

  function handleDownload(r: Result) {
    const url = URL.createObjectURL(r.blob)
    const a = document.createElement("a")
    a.href = url
    a.download = r.name
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 500)
  }

  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="files">Images (JPG/PNG)</Label>
            <Input
              ref={inputRef}
              id="files"
              type="file"
              accept="image/png,image/jpeg"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quality">Quality ({Math.round(quality * 100)}%)</Label>
              <input
                id="quality"
                type="range"
                min={0.1}
                max={1}
                step={0.05}
                value={quality}
                onChange={(e) => setQuality(Number.parseFloat(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Max Size</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="W"
                  value={maxW}
                  onChange={(e) => setMaxW(e.target.value === "" ? "" : Number(e.target.value))}
                />
                <Input
                  type="number"
                  placeholder="H"
                  value={maxH}
                  onChange={(e) => setMaxH(e.target.value === "" ? "" : Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={handleCompress}>
            <ImageDown className="mr-2 h-4 w-4" />
            Compress
          </Button>
          <div className="text-sm text-muted-foreground">
            {files.length > 0 && (
              <span>
                Original {formatBytes(totalSaved.original)} → Output {formatBytes(totalSaved.out)} (Saved{" "}
                {formatBytes(Math.max(0, totalSaved.saved))})
              </span>
            )}
          </div>
        </div>

        {results.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((r) => (
              <div key={r.name} className="rounded-lg border p-4">
                <div className="mb-2 text-sm font-medium">{r.name}</div>
                <div className="text-xs text-muted-foreground mb-3">
                  {formatBytes(r.originalBytes)} → {formatBytes(r.blob.size)}
                </div>
                <Button size="sm" onClick={() => handleDownload(r)}>
                  Download
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
