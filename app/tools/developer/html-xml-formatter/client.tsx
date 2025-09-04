"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

function formatXml(xml: string): string {
  try {
    // naive pretty-print: insert newlines between tags and indent
    let formatted = ""
    const reg = /(>)(<)(\/*)/g
    const xmlStr = xml.replace(reg, "$1\r\n$2$3")
    let pad = 0
    xmlStr.split("\r\n").forEach((node) => {
      let indent = 0
      if (node.match(/.+<\/\w[^>]*>$/)) indent = 0
      else if (node.match(/^<\/\w/)) {
        if (pad) pad -= 1
      } else if (node.match(/^<\w([^>]*[^/])?>.*$/)) indent = 1
      const padding = new Array(pad + 1).join("  ")
      formatted += padding + node + "\r\n"
      pad += indent
    })
    return formatted.trim()
  } catch {
    return "Unable to format input."
  }
}

function formatHtml(html: string): string {
  // Use the same simple formatter (works reasonably for HTML)
  return formatXml(html)
}

export default function HtmlXmlFormatterClient() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState<"html" | "xml">("html")

  function onFormat() {
    setOutput(mode === "html" ? formatHtml(input) : formatXml(input))
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <Tabs defaultValue="html" onValueChange={(v) => setMode(v as any)}>
        <TabsList>
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="xml">XML</TabsTrigger>
        </TabsList>
        <TabsContent value="html" className="space-y-3">
          <Textarea rows={10} placeholder="Paste HTML" value={input} onChange={(e) => setInput(e.target.value)} />
          <div className="flex gap-2">
            <Button onClick={onFormat}>Format</Button>
            <Button
              variant="secondary"
              onClick={() => {
                navigator.clipboard.writeText(output)
              }}
            >
              Copy
            </Button>
          </div>
          <Textarea readOnly rows={10} value={output} />
        </TabsContent>
        <TabsContent value="xml" className="space-y-3">
          <Textarea rows={10} placeholder="Paste XML" value={input} onChange={(e) => setInput(e.target.value)} />
          <div className="flex gap-2">
            <Button onClick={onFormat}>Format</Button>
            <Button
              variant="secondary"
              onClick={() => {
                navigator.clipboard.writeText(output)
              }}
            >
              Copy
            </Button>
          </div>
          <Textarea readOnly rows={10} value={output} />
        </TabsContent>
      </Tabs>
    </main>
  )
}
