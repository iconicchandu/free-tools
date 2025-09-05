"use client"

import Link from "next/link"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CATEGORIES, listByCategory, type Category } from "@/lib/tools-index"
import {
  Type,
  CalendarClock,
  FileText,
  ImageIcon,
  Calculator,
  Coins,
  Landmark,
  Percent,
  TrendingUp,
  PiggyBank,
  Wallet,
  Banknote,
  FileCode,
  Braces,
  Regex,
  Hash,
  ScanText,
  Crop,
  Palette,
  Stamp,
  AppWindow,
  ArrowLeftRight,
} from "lucide-react"
import type { JSX } from "react/jsx-runtime" // Import JSX to fix the undeclared variable error

const ICONS: Record<string, JSX.Element> = {
  "/tools/word-counter": <Type className="h-5 w-5 text-blue-600 dark:text-blue-500" />,
  "/tools/age-calculator": <CalendarClock className="h-5 w-5 text-blue-600 dark:text-blue-500" />,
  "/tools/pdf-to-word": <FileText className="h-5 w-5 text-blue-600 dark:text-blue-500" />,
  "/tools/image-to-pdf": <ImageIcon className="h-5 w-5 text-blue-600 dark:text-blue-500" />,
  "/tools/finance/emi-calculator": <Calculator className="h-5 w-5 text-blue-600 dark:text-blue-500" />,
  "/tools/finance/currency-converter": <Coins className="h-5 w-5 text-blue-600 dark:text-blue-500" />,
  "/tools/finance/mortgage-calculator": <Landmark className="h-5 w-5 text-blue-600 dark:text-blue-500" />,
  "/tools/finance/income-tax-calculator": <Percent className="h-5 w-5 text-blue-600 dark:text-blue-500" />,
  "/tools/finance/compound-interest-calculator": <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-500" />,
  "/tools/finance/sip-calculator": <PiggyBank className="h-5 w-5 text-blue-600 dark:text-blue-500" />,
  "/tools/finance/salary-wage-calculator": <Wallet className="h-5 w-5 text-blue-600 dark:text-blue-500" />,
  "/tools/finance/retirement-calculator": <Banknote className="h-5 w-5 text-blue-600 dark:text-blue-500" />,
  "/tools/developer/json-formatter": <Braces className="h-5 w-5 text-blue-600 dark:text-blue-500" />,
  "/tools/developer/base64-encode-decode": <Hash className="h-5 w-5 text-blue-600 dark:text-blue-500" />,
  "/tools/developer/html-xml-formatter": <FileCode className="h-5 w-5 text-blue-600 dark:text-blue-500" />,
  "/tools/developer/regex-tester": <Regex className="h-5 w-5 text-blue-600 dark:text-blue-500" />,
  "/tools/developer/minify-beautify": <FileCode className="h-5 w-5 text-blue-600 dark:text-blue-500" />,
  "/tools/developer/uuid-generator": <Hash className="h-5 w-5 text-blue-600 dark:text-blue-500" />,
  "/tools/developer/markdown-editor": <FileCode className="h-5 w-5 text-blue-600 dark:text-blue-500" />,
  "/tools/developer/text-ascii-converter": <ScanText className="h-5 w-5 text-blue-600 dark:text-blue-500" />,
  "/tools/images-files/image-compressor": <ImageIcon className="h-5 w-5 text-blue-600 dark:text-blue-500" />,
  "/tools/images-files/image-resizer-crop": <Crop className="h-5 w-5 text-blue-600 dark:text-blue-500" />,
  "/tools/images-files/convert-image-format": <ArrowLeftRight className="h-5 w-5 text-blue-600 dark:text-blue-500" />,
  "/tools/images-files/watermark": <Stamp className="h-5 w-5 text-blue-600 dark:text-blue-500" />,
  "/tools/images-files/color-picker": <Palette className="h-5 w-5 text-blue-600 dark:text-blue-500" />,
  "/tools/images-files/favicon-generator": <AppWindow className="h-5 w-5 text-blue-600 dark:text-blue-500" />,
}

function ToolsGrid({ cat }: { cat: Category }) {
  const tools = listByCategory(cat)
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((t) => (
        <Link key={t.path} href={t.path}>
          <Card className="p-4 transition hover:shadow-sm">
            <div className="text-xs text-muted-foreground">{t.category}</div>
            <div className="mt-1 flex items-center justify-between">
              <div className="text-base font-semibold">{t.name}</div>
              <div aria-hidden>{ICONS[t.path]}</div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export default function AllToolsSection() {
  const [tab, setTab] = useState<Category>("All")
  return (
    <section className="container mx-auto max-w-5xl px-4 py-12">
      <h2 className="text-balance text-2xl font-semibold">All tools</h2>
      <p className="mb-4 text-sm text-muted-foreground">Browse by category or see everything.</p>
      <Tabs value={tab} onValueChange={(v) => setTab(v as Category)}>
        <TabsList className="flex flex-wrap gap-1">
          {CATEGORIES.map((c) => (
            <TabsTrigger key={c} value={c} className="capitalize">
              {c}
            </TabsTrigger>
          ))}
        </TabsList>
        {CATEGORIES.map((c) => (
          <TabsContent key={c} value={c} className="mt-6">
            <ToolsGrid cat={c} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}
