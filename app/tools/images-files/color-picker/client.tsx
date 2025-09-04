"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function toHex([r, g, b]: number[]) {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")
}

export default function ColorPickerClient() {
  const [file, setFile] = useState<File | null>(null)
  const [picked, setPicked] = useState<{ hex: string; rgb: string } | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  async function load() {
    if (!file) return
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = URL.createObjectURL(file)
    await new Promise((res) => (img.onload = () => res(true)))
    const c = canvasRef.current!
    c.width = img.naturalWidth
    c.height = img.naturalHeight
    c.getContext("2d")!.drawImage(img, 0, 0)
  }

  function onClick(e: React.MouseEvent<HTMLCanvasElement>) {
    const c = canvasRef.current!
    const rect = c.getBoundingClientRect()
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * c.width)
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * c.height)
    const d = c.getContext("2d")!.getImageData(x, y, 1, 1).data
    const rgb = `rgb(${d[0]}, ${d[1]}, ${d[2]})`
    setPicked({ hex: toHex([d[0], d[1], d[2]]), rgb })
  }

  async function copy(t: string) {
    await navigator.clipboard.writeText(t)
  }

  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <div className="space-y-2">
          <Label htmlFor="file">Image</Label>
          <Input id="file" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          <Button className="mt-2" variant="secondary" onClick={load}>
            Load
          </Button>
        </div>

        <div className="rounded-md border p-3">
          <canvas ref={canvasRef} className="max-w-full h-auto block cursor-crosshair" onClick={onClick} />
        </div>

        {picked && (
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded border" style={{ backgroundColor: picked.hex }} />
            <div className="text-sm">
              <div className="flex items-center gap-2">
                <span>{picked.hex}</span>
                <Button size="sm" variant="ghost" onClick={() => copy(picked.hex)}>
                  Copy
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <span>{picked.rgb}</span>
                <Button size="sm" variant="ghost" onClick={() => copy(picked.rgb)}>
                  Copy
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
