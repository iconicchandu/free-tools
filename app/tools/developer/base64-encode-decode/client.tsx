"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Base64Client() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  return (
    <main className="container mx-auto px-4 py-6">
      <Tabs defaultValue="encode" className="w-full">
        <TabsList>
          <TabsTrigger value="encode">Encode</TabsTrigger>
          <TabsTrigger value="decode">Decode</TabsTrigger>
        </TabsList>
        <TabsContent value="encode" className="space-y-3">
          <Textarea rows={6} placeholder="Enter text" value={input} onChange={(e) => setInput(e.target.value)} />
          <div className="flex gap-2">
            <Button onClick={() => setOutput(btoa(unescape(encodeURIComponent(input))))}>Encode</Button>
            <Button
              variant="secondary"
              onClick={() => {
                setInput("")
                setOutput("")
              }}
            >
              Clear
            </Button>
          </div>
          <Textarea readOnly rows={6} value={output} />
        </TabsContent>
        <TabsContent value="decode" className="space-y-3">
          <Textarea rows={6} placeholder="Enter Base64" value={input} onChange={(e) => setInput(e.target.value)} />
          <div className="flex gap-2">
            <Button
              onClick={() => {
                try {
                  setOutput(decodeURIComponent(escape(atob(input))))
                } catch {
                  setOutput("Invalid Base64")
                }
              }}
            >
              Decode
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setInput("")
                setOutput("")
              }}
            >
              Clear
            </Button>
          </div>
          <Textarea readOnly rows={6} value={output} />
        </TabsContent>
      </Tabs>
    </main>
  )
}
