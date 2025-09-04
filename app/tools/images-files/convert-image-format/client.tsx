"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ConvertFormatClient() {
  const [file, setFile] = useState<File | null>(null)
  const [format, setFormat] = useState<"image/jpeg" | "image/png" | "image/webp">("image/jpeg")
  async function handleConvert() {
    if (!file) return
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = URL.createObjectURL(file)
    await new Promise((res) => (img.onload = () => res(true)))
    const canvas = document.createElement("canvas")
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    canvas.getContext("2d")!.drawImage(img, 0, 0)
    const blob = await new Promise<Blob>((resolve) => canvas.toBlob((b) => resolve(b || new Blob()), format, 0.92))
    const a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    const ext = format === "image/png" ? "png" : format === "image/webp" ? "webp" : "jpg"
    a.download = `converted.${ext}`
    a.click()
    setTimeout(() => URL.revokeObjectURL(a.href), 500)
    URL.revokeObjectURL(img.src)
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
            <Label>Target format</Label>
            <Select value={format} onValueChange={(v) => setFormat(v as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image/jpeg">JPG</SelectItem>
                <SelectItem value="image/png">PNG</SelectItem>
                <SelectItem value="image/webp">WebP</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={handleConvert}>Convert & Download</Button>
      </CardContent>
    </Card>
  )
}
