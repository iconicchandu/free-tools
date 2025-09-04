"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type Sel = { x: number; y: number; w: number; h: number } | null

export default function ResizerCropClient() {
  const [file, setFile] = useState<File | null>(null)
  const [img, setImg] = useState<HTMLImageElement | null>(null)
  const [sel, setSel] = useState<Sel>(null)
  const [width, setWidth] = useState<number | "">("")
  const [height, setHeight] = useState<number | "">("")
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!file) return
    const url = URL.createObjectURL(file)
    const image = new Image()
    image.crossOrigin = "anonymous"
    image.src = url
    image.onload = () => {
      setImg(image)
      setWidth(image.naturalWidth)
      setHeight(image.naturalHeight)
    }
    return () => URL.revokeObjectURL(url)
  }, [file])

  function onMouseDown(e: React.MouseEvent) {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const startX = e.clientX - rect.left
    const startY = e.clientY - rect.top
    const start: Sel = { x: startX, y: startY, w: 0, h: 0 }
    setSel(start)
    function onMove(ev: MouseEvent) {
      const cx = ev.clientX - rect.left
      const cy = ev.clientY - rect.top
      setSel({ x: Math.min(startX, cx), y: Math.min(startY, cy), w: Math.abs(cx - startX), h: Math.abs(cy - startY) })
    }
    function onUp() {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
    }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
  }

  async function handleDownload() {
    if (!img) return
    // If selection exists, crop; else just resize to width/height if provided
    const crop = sel
    const targetW = typeof width === "number" ? width : img.naturalWidth
    const targetH = typeof height === "number" ? height : img.naturalHeight

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")!

    if (crop && crop.w > 0 && crop.h > 0) {
      canvas.width = crop.w
      canvas.height = crop.h
      ctx.drawImage(img, crop.x, crop.y, crop.w, crop.h, 0, 0, crop.w, crop.h)
    } else {
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      ctx.drawImage(img, 0, 0)
    }

    // Resize if target differs
    if (canvas.width !== targetW || canvas.height !== targetH) {
      const out = document.createElement("canvas")
      out.width = targetW
      out.height = targetH
      const octx = out.getContext("2d")!
      octx.drawImage(canvas, 0, 0, targetW, targetH)
      const blob = await new Promise<Blob>((res) => out.toBlob((b) => res(b || new Blob()), "image/png"))
      const a = document.createElement("a")
      a.href = URL.createObjectURL(blob)
      a.download = "resized.png"
      a.click()
      setTimeout(() => URL.revokeObjectURL(a.href), 500)
    } else {
      const blob = await new Promise<Blob>((res) => canvas.toBlob((b) => res(b || new Blob()), "image/png"))
      const a = document.createElement("a")
      a.href = URL.createObjectURL(blob)
      a.download = "cropped.png"
      a.click()
      setTimeout(() => URL.revokeObjectURL(a.href), 500)
    }
  }

  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="file">Image</Label>
            <Input id="file" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="w">Width</Label>
              <Input
                id="w"
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value === "" ? "" : Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="h">Height</Label>
              <Input
                id="h"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value === "" ? "" : Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {img && (
          <div
            ref={containerRef}
            className="relative overflow-hidden rounded-md border"
            style={{ width: img.naturalWidth, maxWidth: "100%" }}
            onMouseDown={onMouseDown}
          >
            <img src={img.src || "/placeholder.svg"} alt="uploaded" className="block max-w-full h-auto select-none" />
            {sel && (
              <div
                className="absolute border-2 border-blue-500 bg-blue-500/10"
                style={{ left: sel.x, top: sel.y, width: sel.w, height: sel.h }}
              />
            )}
          </div>
        )}

        <div>
          <Button onClick={handleDownload}>Download</Button>
        </div>
      </CardContent>
    </Card>
  )
}
