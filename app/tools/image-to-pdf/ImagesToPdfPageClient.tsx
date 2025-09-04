"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ImagesToPdfPageClient() {
  const [files, setFiles] = React.useState<File[]>([])
  const [loading, setLoading] = React.useState(false)
  const [blobUrl, setBlobUrl] = React.useState<string | null>(null)

  const onGenerate = async () => {
    if (!files.length) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    const lines = [
      "Mock PDF",
      "",
      "Included images:",
      ...files.map((f, i) => `${i + 1}. ${f.name}`),
      "",
      "(This is a placeholder PDF text for demo purposes.)",
    ].join("\n")
    // Create a minimal PDF-ish text blob for mock (not a real PDF)
    const blob = new Blob([lines], { type: "application/pdf" })
    const url = URL.createObjectURL(blob)
    setBlobUrl(url)
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Images → PDF</h1>
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Upload Images</CardTitle>
          <CardDescription>We will mock a PDF generation and provide a download.</CardDescription>
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
