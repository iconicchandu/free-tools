import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Sparkles, ShieldCheck, Timer, FileText, ImagesIcon, CalculatorIcon } from "lucide-react"
import AllToolsSection from "@/components/all-tools-section"

export const metadata = {
  title: "FreeTools – Free, Modern Utilities",
  description:
    "FreeTools is a modern suite of everyday utilities: word counter, converters, and finance tools. Clean UI, mobile-friendly, and themeable.",
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section
          className="relative overflow-hidden border-b"
          style={{
            background:
              "radial-gradient(800px 400px at 10% 0%, rgba(99,102,241,0.18), transparent 60%), radial-gradient(700px 400px at 90% 10%, rgba(45,212,191,0.18), transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.95))",
          }}
        >
          {/* subtle overlay for dark mode readability */}
          <div aria-hidden className="pointer-events-none absolute inset-0 dark:bg-background/40" />
          <div className="relative mx-auto max-w-5xl px-4 py-20">
            <div className="flex items-center gap-3">
              {/* <img src="/logo-freetools.png" alt="FreeTools logo" className="h-10 w-auto" /> */}
              <h1 className="text-balance text-4xl font-semibold leading-tight md:text-5xl">
                <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                  FreeTools
                </span>{" "}
                — simple, beautiful tools for everyday work
              </h1>
            </div>
            <p className="mt-4 max-w-2xl text-pretty text-foreground/70">
              Word counter, age calculator, document converters, and finance utilities. Built with a clean SaaS
              interface, responsive design, and light/dark themes.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <Button asChild>
                <Link href="/tools">Browse Tools</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/tools/finance/currency-converter">Try Currency Converter</Link>
              </Button>
            </div>

            {/* Feature badges with icons */}
            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="flex items-center gap-2 rounded-lg border bg-card p-4 text-sm text-foreground/80 shadow-sm">
                <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-500" />
                <span>Polished UX</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border bg-card p-4 text-sm text-foreground/80 shadow-sm">
                <Timer className="h-4 w-4 text-blue-600 dark:text-blue-500" />
                <span>Fast & Private</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border bg-card p-4 text-sm text-foreground/80 shadow-sm">
                <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-500" />
                <span>No Sign‑up</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border bg-card p-4 text-sm text-foreground/80 shadow-sm">
                <CalculatorIcon className="h-4 w-4 text-blue-600 dark:text-blue-500" />
                <span>Finance Ready</span>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-5xl px-4 py-12">
          <h2 className="text-xl font-semibold">How FreeTools works</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-4">
              <h3 className="font-medium">1. Pick a tool</h3>
              <p className="mt-2 text-sm text-foreground/70">
                Browse the collection and open the tool you need, from documents to finance.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <h3 className="font-medium">2. Use it instantly</h3>
              <p className="mt-2 text-sm text-foreground/70">
                Most tools run directly in your browser for speed and privacy.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <h3 className="font-medium">3. Get results</h3>
              <p className="mt-2 text-sm text-foreground/70">
                Download your output or copy the result. No sign‑ups or clutter.
              </p>
            </div>
          </div>
        </section>

        {/* Popular tools with icons */}
        <section className="mx-auto max-w-5xl px-4 pb-12">
          <h2 className="text-xl font-semibold">Popular tools</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Link href="/tools/word-counter" className="rounded-lg border bg-card p-4 hover:bg-accent">
              <div className="flex items-center gap-2 font-medium">
                <FileText className="h-4 w-4 text-blue-600 dark:text-blue-500" />
                Word Counter
              </div>
              <p className="mt-1 text-sm text-foreground/70">Live word and character counts as you type.</p>
            </Link>
            <Link href="/tools/pdf-to-word" className="rounded-lg border bg-card p-4 hover:bg-accent">
              <div className="flex items-center gap-2 font-medium">
                <FileText className="h-4 w-4 text-blue-600 dark:text-blue-500" />
                PDF → Word
              </div>
              <p className="mt-1 text-sm text-foreground/70">Preserve formatting, styles, and colors.</p>
            </Link>
            <Link href="/tools/image-to-pdf" className="rounded-lg border bg-card p-4 hover:bg-accent">
              <div className="flex items-center gap-2 font-medium">
                <ImagesIcon className="h-4 w-4 text-blue-600 dark:text-blue-500" />
                Images → PDF
              </div>
              <p className="mt-1 text-sm text-foreground/70">Combine images into a single, valid PDF.</p>
            </Link>
            <Link href="/tools/finance/currency-converter" className="rounded-lg border bg-card p-4 hover:bg-accent">
              <div className="flex items-center gap-2 font-medium">
                <CalculatorIcon className="h-4 w-4 text-blue-600 dark:text-blue-500" />
                Currency Converter
              </div>
              <p className="mt-1 text-sm text-foreground/70">Accurate, fast conversions with caching.</p>
            </Link>
            <Link href="/tools/finance/emi-calculator" className="rounded-lg border bg-card p-4 hover:bg-accent">
              <div className="flex items-center gap-2 font-medium">
                <CalculatorIcon className="h-4 w-4 text-blue-600 dark:text-blue-500" />
                EMI Calculator
              </div>
              <p className="mt-1 text-sm text-foreground/70">Visualize payments over time with charts.</p>
            </Link>
            <Link href="/tools/age-calculator" className="rounded-lg border bg-card p-4 hover:bg-accent">
              <div className="flex items-center gap-2 font-medium">
                <Timer className="h-4 w-4 text-blue-600 dark:text-blue-500" />
                Age Calculator
              </div>
              <p className="mt-1 text-sm text-foreground/70">Compute exact age from a given date.</p>
            </Link>
          </div>
        </section>

        {/* All Tools with filters */}
        <AllToolsSection />

        {/* FAQ */}
        <section className="mx-auto max-w-5xl px-4 pb-16">
          <h2 className="text-xl font-semibold">Frequently asked questions</h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-lg border bg-card p-4">
              <div className="font-medium">Are my files uploaded?</div>
              <p className="mt-1 text-sm text-foreground/70">
                Most conversions happen in your browser. When a server is required, we proxy securely.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="font-medium">Does dark mode work?</div>
              <p className="mt-1 text-sm text-foreground/70">
                Yes — FreeTools supports light and dark themes and follows your system preference by default.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="font-medium">Is FreeTools really free?</div>
              <p className="mt-1 text-sm text-foreground/70">
                Absolutely. Use any tool without sign‑up. If you like it, share it with a friend.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
