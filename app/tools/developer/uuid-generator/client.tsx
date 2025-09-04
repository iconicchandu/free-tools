"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function UuidClient() {
  const [count, setCount] = useState(1)
  const [uuids, setUuids] = useState<string[]>([])

  function generate() {
    const n = Math.min(1000, Math.max(1, count))
    const list = Array.from({ length: n }, () => crypto.randomUUID())
    setUuids(list)
  }

  return (
    <main className="container mx-auto px-4 py-6 space-y-3">
      <div className="flex items-center gap-3">
        <Input
          type="number"
          min={1}
          max={1000}
          value={count}
          onChange={(e) => setCount(Number.parseInt(e.target.value || "1", 10))}
          className="w-32"
        />
        <Button onClick={generate}>Generate UUIDs</Button>
        <Button
          variant="secondary"
          onClick={() => navigator.clipboard.writeText(uuids.join("\n"))}
          disabled={!uuids.length}
        >
          Copy
        </Button>
      </div>
      <Textarea readOnly rows={12} value={uuids.join("\n")} />
    </main>
  )
}
