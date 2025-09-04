"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Copy, RefreshCw, ArrowLeftRight, ScanText } from "lucide-react"

function encodeToEntities(input: string) {
  // Encode each character (including spaces/newlines) to &#<code>;
  return Array.from(input)
    .map((ch) => `&#${ch.charCodeAt(0)};`)
    .join("")
}

function decodeFromEntities(input: string) {
  // Replace any &#number; with its character; retain other characters (including literal spaces)
  return input.replace(/&#(\d+);/g, (_, num: string) => String.fromCharCode(Number(num)))
}

export default function TextAsciiConverterClient() {
  const [mode, setMode] = useState<"text-to-ascii" | "ascii-to-text">("text-to-ascii")
  const [input, setInput] = useState("")
  const output = useMemo(
    () => (mode === "text-to-ascii" ? encodeToEntities(input) : decodeFromEntities(input)),
    [mode, input],
  )

  const copy = async (value: string) => {
    if (!value) return
    try {
      await navigator.clipboard.writeText(value)
    } catch {}
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <ScanText className="h-5 w-5" aria-hidden="true" />
          <span>Converter</span>
        </CardTitle>

        <Tabs value={mode} onValueChange={(v) => setMode(v as any)} className="w-auto">
          <TabsList>
            <TabsTrigger value="text-to-ascii" className="gap-1">
              <ArrowLeftRight className="h-4 w-4" /> Text → ASCII
            </TabsTrigger>
            <TabsTrigger value="ascii-to-text" className="gap-1">
              <ArrowLeftRight className="h-4 w-4" /> ASCII → Text
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="input">{mode === "text-to-ascii" ? "Text input" : "ASCII entities input"}</Label>
          <Textarea
            id="input"
            placeholder={
              mode === "text-to-ascii"
                ? "Type or paste text here..."
                : "Example: &#72;&#101;&#108;&#108;&#111;  or  &#72; &#101; &#108; &#108; &#111;"
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[180px]"
          />
          <div className="flex items-center gap-2">
            <Button type="button" variant="secondary" onClick={() => setInput("")}>
              <RefreshCw className="h-4 w-4 mr-1" /> Clear
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="output">Result</Label>
          <Textarea id="output" readOnly value={output} className="min-h-[180px]" aria-live="polite" />
          <div className="flex items-center gap-2">
            <Button type="button" onClick={() => copy(output)}>
              <Copy className="h-4 w-4 mr-1" /> Copy
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
