"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function PdfToWordClientPage() {
  const [file, setFile] = React.useState<File | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [blobUrl, setBlobUrl] = React.useState<string | null>(null)

  const onConvert = async () => {
    if (!file) return
    setLoading(true)
    // Mock conversion: create a simple .docx-like text blob
    await new Promise((r) => setTimeout(r, 1200))
    const content = `Mock DOCX generated from: ${file.name}\n\n(This is a placeholder file for demo purposes.)`
    const blob = new Blob([content], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    })
    const url = URL.createObjectURL(blob)
    setBlobUrl(url)
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">PDF → Word</h1>
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Upload PDF</CardTitle>
          <CardDescription>We will mock a conversion and provide a .docx download.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          {file && <p className="text-sm text-foreground/70">Selected: {file.name}</p>}
        </CardContent>
        <CardFooter className="flex items-center gap-3">
          <Button disabled={!file || loading} onClick={onConvert}>
            {loading ? "Converting..." : "Convert"}
          </Button>
          {blobUrl && (
            <Button asChild variant="outline">
              <a href={blobUrl} download={(file?.name || "document").replace(/\.pdf$/i, "") + ".docx"}>
                Download Word
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
