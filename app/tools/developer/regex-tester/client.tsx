"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function RegexTesterClient() {
  const [pattern, setPattern] = useState("")
  const [flags, setFlags] = useState("g")
  const [text, setText] = useState("")

  const { error, highlighted, count } = useMemo(() => {
    try {
      const re = new RegExp(pattern, flags)
      const parts: (string | JSX.Element)[] = []
      let lastIndex = 0
      let m: RegExpExecArray | null
      let c = 0
      while ((m = re.exec(text)) !== null) {
        const start = m.index
        const end = re.lastIndex
        parts.push(text.slice(lastIndex, start))
        parts.push(
          <mark key={`${start}-${end}`} className="bg-yellow-300">
            {text.slice(start, end)}
          </mark>,
        )
        lastIndex = end
        if (!re.global) break
        c++
        if (m[0] === "") re.lastIndex++
      }
      parts.push(text.slice(lastIndex))
      return { error: null as string | null, highlighted: parts, count: c }
    } catch (e: any) {
      return { error: e.message as string, highlighted: [text], count: 0 }
    }
  }, [pattern, flags, text])

  return (
    <main className="container mx-auto px-4 py-6 space-y-3">
      <div className="grid gap-3 md:grid-cols-3">
        <Input placeholder="Regex pattern (e.g., \\w+)" value={pattern} onChange={(e) => setPattern(e.target.value)} />
        <Input placeholder="Flags (e.g., gmi)" value={flags} onChange={(e) => setFlags(e.target.value)} />
      </div>
      <Textarea rows={8} placeholder="Test string" value={text} onChange={(e) => setText(e.target.value)} />
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <div className="rounded-md border p-3">
        <div className="mb-2 text-sm text-muted-foreground">{count} matches</div>
        <div className="prose max-w-none">{highlighted}</div>
      </div>
    </main>
  )
}
