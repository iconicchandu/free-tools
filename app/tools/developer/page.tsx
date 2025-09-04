import Link from "next/link"
import { TOOLS } from "@/lib/tools-index"

export const metadata = {
  title: "Developer Tools • FreeTools",
  description:
    "Handy developer utilities: JSON formatter, Base64, HTML/XML formatter, Regex tester, Minify/Beautify, UUIDs, Markdown editor.",
}

export default function DeveloperIndexPage() {
  const dev = TOOLS.filter((t) => t.category === "Developer")
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold text-balance">Developer Tools</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dev.map((t) => (
          <Link key={t.path} href={t.path} className="rounded-lg border p-4 hover:bg-accent">
            <h2 className="font-medium">{t.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t.keywords.slice(0, 3).join(" • ")}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
