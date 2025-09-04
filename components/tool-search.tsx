"use client"
import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { searchTools } from "@/lib/tools-catalog"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function ToolSearch() {
  const [q, setQ] = useState("")
  const [open, setOpen] = useState(false)
  const results = useMemo(() => searchTools(q).slice(0, 8), [q])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => setOpen(q.trim().length > 0 && results.length > 0), [q, results.length])
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current) return
      if (!ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("click", onDocClick)
    return () => document.removeEventListener("click", onDocClick)
  }, [])

  return (
    <div ref={ref} className="relative w-full max-w-sm">
      <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tools..." aria-label="Search tools" />
      {open && (
        <Card className="absolute left-0 right-0 top-[110%] z-50 max-h-80 overflow-y-auto p-2">
          <div className="px-2 pb-2 text-xs text-muted-foreground">Results</div>
          <ul className="space-y-1">
            {results.map((r) => (
              <li key={r.slug}>
                <Link href={r.href} className="block rounded px-2 py-2 hover:bg-muted" onClick={() => setOpen(false)}>
                  <div className="text-sm font-medium">{r.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {r.category} • {r.description}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  )
}
