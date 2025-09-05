"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Menu, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { searchTools } from "@/lib/tools-index"

type NavbarProps = {
  onOpenSidebar?: () => void
}

export function Navbar({ onOpenSidebar }: NavbarProps) {
  const router = useRouter()
  const [q, setQ] = useState("")
  const [results, setResults] = useState<{ name: string; path: string }[]>([])
  const [openResults, setOpenResults] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setResults(searchTools(q).map((t) => ({ name: t.name, path: t.path })))
    setOpenResults(q.length > 0)
  }, [q])

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!boxRef.current) return
      if (!boxRef.current.contains(e.target as Node)) setOpenResults(false)
    }
    document.addEventListener("click", onDocClick)
    return () => document.removeEventListener("click", onDocClick)
  }, [])

  function go(path: string) {
    setQ("")
    setOpenResults(false)
    router.push(path)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onOpenSidebar}
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="group flex items-center gap-2" aria-label="FreeTools Home">
            <img src="/logo-freetools.png" alt="FreeTools logo" className="h-6 w-auto" />
          </Link>
        </div>

        {/* Live search input with results dropdown */}
        <div className="relative hidden max-w-sm grow items-center px-4 md:flex" ref={boxRef}>
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search tools…"
            aria-label="Search tools"
            className="w-full"
          />
          {openResults && results.length > 0 && (
            <div className="absolute left-4 right-4 top-10 z-50 rounded-md border bg-popover text-popover-foreground shadow">
              <ul className="max-h-72 overflow-auto py-1 text-sm">
                {results.map((r) => (
                  <li key={r.path}>
                    <button className="w-full px-3 py-2 text-left hover:bg-accent" onClick={() => go(r.path)}>
                      {r.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <nav className="flex justify-center items-center bg-[#ccfbff] p-[5px] rounded-md">
          <Link href="/tools" className="flex text-sm text-foreground/80 hover:text-foreground justify-center items-center">
            <Settings className="w-4 h-4 mr-1"/>Tools
          </Link>
          {/* ModeToggle component removed */}
        </nav>
      </div>
    </header>
  )
}
