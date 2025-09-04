"use client"

import { useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Textarea } from "@/components/ui/textarea"

export default function MarkdownEditorClient() {
  const [value, setValue] = useState<string>("# Hello FreeTools\n\n- Live preview\n- **Bold** and _italic_\n- `code`\n")
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Editor</label>
          <Textarea rows={20} value={value} onChange={(e) => setValue(e.target.value)} className="font-mono" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Preview</label>
          <div className="prose max-w-none rounded border p-4">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
          </div>
        </div>
      </div>
    </main>
  )
}
