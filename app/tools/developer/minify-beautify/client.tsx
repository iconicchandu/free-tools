"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

function beautify(code: string, type: "js" | "css" | "html"): string {
  // Very basic prettifier: insert newlines after braces/semicolons
  if (type === "css" || type === "js") {
    return code.replace(/;/g, ";\n").replace(/{/g, "{\n").replace(/}/g, "\n}\n")
  }
  // HTML: add newlines between tags
  return code.replace(/>(\s*<)/g, ">\n$1")
}

function minify(code: string, type: "js" | "css" | "html"): string {
  let out = code
  if (type === "js" || type === "css") {
    out = out.replace(/\/\*[\s\S]*?\*\//g, "") // block comments
    out = out.replace(/\/\/[^\n\r]*/g, "") // line comments
  }
  // collapse whitespace
  out = out.replace(/\s+/g, " ")
  // remove spaces around symbols
  out = out.replace(/\s*([{};,:>+~=()])\s*/g, "$1")
  return out.trim()
}

export default function MinifyBeautifyClient() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [type, setType] = useState<"js" | "css" | "html">("js")

  return (
    <main className="container mx-auto px-4 py-6">
      <Tabs defaultValue="js" onValueChange={(v) => setType(v as any)}>
        <TabsList>
          <TabsTrigger value="js">JS</TabsTrigger>
          <TabsTrigger value="css">CSS</TabsTrigger>
          <TabsTrigger value="html">HTML</TabsTrigger>
        </TabsList>
        <TabsContent value="js" className="space-y-3">
          <Textarea rows={10} placeholder="Paste JavaScript" value={input} onChange={(e) => setInput(e.target.value)} />
          <div className="flex gap-2">
            <Button onClick={() => setOutput(minify(input, "js"))}>Minify</Button>
            <Button variant="secondary" onClick={() => setOutput(beautify(input, "js"))}>
              Beautify
            </Button>
          </div>
          <Textarea readOnly rows={10} value={output} />
        </TabsContent>
        <TabsContent value="css" className="space-y-3">
          <Textarea rows={10} placeholder="Paste CSS" value={input} onChange={(e) => setInput(e.target.value)} />
          <div className="flex gap-2">
            <Button onClick={() => setOutput(minify(input, "css"))}>Minify</Button>
            <Button variant="secondary" onClick={() => setOutput(beautify(input, "css"))}>
              Beautify
            </Button>
          </div>
          <Textarea readOnly rows={10} value={output} />
        </TabsContent>
        <TabsContent value="html" className="space-y-3">
          <Textarea rows={10} placeholder="Paste HTML" value={input} onChange={(e) => setInput(e.target.value)} />
          <div className="flex gap-2">
            <Button onClick={() => setOutput(minify(input, "html"))}>Minify</Button>
            <Button variant="secondary" onClick={() => setOutput(beautify(input, "html"))}>
              Beautify
            </Button>
          </div>
          <Textarea readOnly rows={10} value={output} />
        </TabsContent>
      </Tabs>
    </main>
  )
}
