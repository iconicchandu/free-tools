"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ImagesToPdfClient() {
  const [files, setFiles] = React.useState<File[]>([])
  const [loading, setLoading] = React.useState(false)
  const [blobUrl, setBlobUrl] = React.useState<string | null>(null)

  const onGenerate = async () => {
    if (!files.length) return
    try {
      setLoading(true)
      const form = new FormData()
      files.forEach((f) => form.append("images", f))
      const res = await fetch("/api/image-to-pdf", { method: "POST", body: form })
      if (!res.ok) {
        const msg = await res.text().catch(() => "Request failed")
        throw new Error(msg)
      }
      const blob = await res.blob()
      setBlobUrl(URL.createObjectURL(blob))
    } catch (e: any) {
      alert(`Failed to generate PDF: ${e?.message ?? "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Images → PDF</h1>
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Upload Images</CardTitle>
          <CardDescription>Mock generator that returns a downloadable PDF.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input type="file" multiple accept="image/*" onChange={(e) => setFiles(Array.from(e.target.files || []))} />
          {!!files.length && (
            <ul className="list-inside list-disc text-sm text-foreground/70">
              {files.map((f) => (
                <li key={f.name}>{f.name}</li>
              ))}
            </ul>
          )}
        </CardContent>
        <CardFooter className="flex items-center gap-3">
          <Button disabled={!files.length || loading} onClick={onGenerate}>
            {loading ? "Generating..." : "Generate PDF"}
          </Button>
          {blobUrl && (
            <Button asChild variant="outline">
              <a href={blobUrl} download="merged.pdf">
                Download PDF
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
