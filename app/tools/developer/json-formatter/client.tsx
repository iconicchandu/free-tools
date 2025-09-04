"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function JsonFormatterClient() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState<string | null>(null)

  function formatJson() {
    try {
      setError(null)
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
    } catch (e: any) {
      setError(e?.message || "Invalid JSON")
      setOutput("")
    }
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <Card>
        <CardHeader>
          <CardTitle>JSON Formatter / Validator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea rows={8} placeholder="Paste JSON here" value={input} onChange={(e) => setInput(e.target.value)} />
          <div className="flex gap-2">
            <Button onClick={formatJson}>Format & Validate</Button>
            <Button
              variant="secondary"
              onClick={() => {
                setInput("")
                setOutput("")
                setError(null)
              }}
            >
              Clear
            </Button>
          </div>
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          {output && <pre className="rounded-md border bg-muted p-3 text-sm overflow-auto">{output}</pre>}
        </CardContent>
      </Card>
    </main>
  )
}
