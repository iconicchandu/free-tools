"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function PdfToWordClient() {
  const [file, setFile] = React.useState<File | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [blobUrl, setBlobUrl] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl)
    }
  }, [blobUrl])

  const isConfigError = (msg: string | null) => !!msg && /server not configured/i.test(msg || "")

  const onConvert = async () => {
    if (!file) return
    setError(null)
    setLoading(true)
    try {
      const form = new FormData()
      form.append("file", file, file.name)

      const res = await fetch("/api/convert/pdf-to-docx", {
        method: "POST",
        body: form,
      })
      if (!res.ok) {
        const msg = await res.text().catch(() => "")
        throw new Error(msg || `Conversion failed with status ${res.status}`)
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      setBlobUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev)
        return url
      })
    } catch (e: any) {
      console.error("[v0] PDF→DOCX error:", e?.message || e)
      setError(e?.message || "Failed to convert PDF.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">PDF → Word</h1>
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Upload PDF</CardTitle>
          <CardDescription>High‑fidelity server conversion that preserves layout, styles, and colors.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          {file && <p className="text-sm text-foreground/70">Selected: {file.name}</p>}
          {isConfigError(error) && (
            <Alert variant="destructive">
              <AlertTitle>Server not configured</AlertTitle>
              <AlertDescription>
                Add CONVERTAPI_SECRET or CONVERT_API_SECRET in Project Settings → Environment Variables, then retry.
                This enables layout‑preserving PDF → DOCX conversion.
              </AlertDescription>
            </Alert>
          )}
          {!isConfigError(error) && error && <p className="text-sm text-red-600">{error}</p>}
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
      <p className="text-xs text-foreground/60">
        Setup required: Add CONVERTAPI_SECRET or CONVERT_API_SECRET in Project Settings → Environment Variables. After
        saving, refresh this page and try again.
      </p>
    </div>
  )
}
