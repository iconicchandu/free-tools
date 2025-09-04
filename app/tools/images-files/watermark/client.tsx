"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center"

export default function WatermarkClient() {
  const [file, setFile] = useState<File | null>(null)
  const [logo, setLogo] = useState<File | null>(null)
  const [text, setText] = useState("FreeTools")
  const [pos, setPos] = useState<Position>("bottom-right")
  const [opacity, setOpacity] = useState(0.6)
  const [useText, setUseText] = useState(true)
  const [size, setSize] = useState(24)
  const [padding, setPadding] = useState(16)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  async function draw() {
    if (!file) return
    const base = await loadImage(file)
    const cvs = canvasRef.current!
    const ctx = cvs.getContext("2d")!
    cvs.width = base.naturalWidth
    cvs.height = base.naturalHeight
    ctx.drawImage(base, 0, 0)

    if (useText) {
      ctx.globalAlpha = opacity
      ctx.fillStyle = "#000000"
      ctx.font = `${size}px sans-serif`
      const metrics = ctx.measureText(text)
      const { x, y } = place(pos, cvs.width, cvs.height, metrics.width, size, padding)
      ctx.fillText(text, x, y)
      ctx.globalAlpha = 1
    } else if (logo) {
      const mark = await loadImage(logo)
      const ratio = Math.min(cvs.width, cvs.height) / 5 / Math.max(mark.naturalWidth, mark.naturalHeight)
      const w = Math.round(mark.naturalWidth * ratio)
      const h = Math.round(mark.naturalHeight * ratio)
      const { x, y } = place(pos, cvs.width, cvs.height, w, h, padding)
      ctx.globalAlpha = opacity
      ctx.drawImage(mark, x, y, w, h)
      ctx.globalAlpha = 1
    }
  }

  async function handleDownload() {
    await draw()
    const blob = await new Promise<Blob>((res) => canvasRef.current!.toBlob((b) => res(b || new Blob()), "image/png"))
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "watermarked.png"
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 500)
  }

  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="file">Image</Label>
            <Input id="file" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </div>
          <div className="space-y-2">
            <Label>Position</Label>
            <Select value={pos} onValueChange={(v) => setPos(v as Position)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="top-left">Top left</SelectItem>
                <SelectItem value="top-right">Top right</SelectItem>
                <SelectItem value="bottom-left">Bottom left</SelectItem>
                <SelectItem value="bottom-right">Bottom right</SelectItem>
                <SelectItem value="center">Center</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox id="usetext" checked={useText} onCheckedChange={(v) => setUseText(Boolean(v))} />
              <Label htmlFor="usetext">Use text watermark</Label>
            </div>
            {useText ? (
              <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Watermark text" />
            ) : (
              <Input type="file" accept="image/*" onChange={(e) => setLogo(e.target.files?.[0] || null)} />
            )}
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label>Opacity {Math.round(opacity * 100)}%</Label>
              <input
                type="range"
                min={0.1}
                max={1}
                step={0.05}
                value={opacity}
                onChange={(e) => setOpacity(Number.parseFloat(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>Text size</Label>
              <Input type="number" value={size} onChange={(e) => setSize(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Padding</Label>
              <Input type="number" value={padding} onChange={(e) => setPadding(Number(e.target.value))} />
            </div>
          </div>
        </div>

        <div className="rounded-md border p-3">
          <canvas ref={canvasRef} className="max-w-full h-auto block" />
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" onClick={draw}>
            Preview
          </Button>
          <Button onClick={handleDownload}>Apply & Download</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function place(pos: string, cw: number, ch: number, w: number, h: number, pad: number) {
  switch (pos) {
    case "top-left":
      return { x: pad, y: pad + h }
    case "top-right":
      return { x: cw - w - pad, y: pad + h }
    case "bottom-left":
      return { x: pad, y: ch - pad }
    case "bottom-right":
      return { x: cw - w - pad, y: ch - pad }
    default:
      return { x: (cw - w) / 2, y: (ch + h) / 2 }
  }
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = URL.createObjectURL(file)
    img.onload = () => resolve(img)
    img.onerror = reject
  })
}
