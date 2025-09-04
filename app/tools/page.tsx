import { ToolCard } from "@/components/tool-card"
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
  Crop,
  Palette,
  Stamp,
  AppWindow,
  ArrowLeftRight,
} from "lucide-react"

export const metadata = {
  title: "All Tools – FreeTools",
  description: "Browse all available tools in a clean, SaaS-style interface.",
}

export default function ToolsHomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-balance text-2xl font-semibold">All Tools</h1>
        <p className="text-foreground/70">Quick access to everything. Organized and responsive.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {/* Core */}
        <ToolCard
          title="Word Counter"
          description="Count words, characters, and sentences in real time."
          href="/tools/word-counter"
          icon={<Type className="h-5 w-5 text-blue-600 dark:text-blue-500" />}
        />
        <ToolCard
          title="Age Calculator"
          description="Calculate exact age from your date of birth."
          href="/tools/age-calculator"
          icon={<CalendarClock className="h-5 w-5 text-blue-600 dark:text-blue-500" />}
        />
        <ToolCard
          title="PDF → Word"
          description="Convert PDFs to DOCX while preserving layout."
          href="/tools/pdf-to-word"
          icon={<FileText className="h-5 w-5 text-blue-600 dark:text-blue-500" />}
        />
        <ToolCard
          title="Images → PDF"
          description="Merge images into a single PDF document."
          href="/tools/image-to-pdf"
          icon={<ImageIcon className="h-5 w-5 text-blue-600 dark:text-blue-500" />}
        />

        {/* Finance */}
        <ToolCard
          title="Loan / EMI"
          description="Compute monthly EMIs and visualize schedule."
          href="/tools/finance/emi-calculator"
          icon={<Calculator className="h-5 w-5 text-blue-600 dark:text-blue-500" />}
        />
        <ToolCard
          title="Currency Converter"
          description="Convert between currencies using live rates."
          href="/tools/finance/currency-converter"
          icon={<Coins className="h-5 w-5 text-blue-600 dark:text-blue-500" />}
        />
        <ToolCard
          title="Mortgage Calculator"
          description="Monthly payment and amortization chart."
          href="/tools/finance/mortgage-calculator"
          icon={<Landmark className="h-5 w-5 text-blue-600 dark:text-blue-500" />}
        />
        <ToolCard
          title="Income Tax Calculator"
          description="Estimate tax with configurable slabs."
          href="/tools/finance/income-tax-calculator"
          icon={<Percent className="h-5 w-5 text-blue-600 dark:text-blue-500" />}
        />
        <ToolCard
          title="Compound Interest"
          description="Growth over time with compounding."
          href="/tools/finance/compound-interest-calculator"
          icon={<TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-500" />}
        />
        <ToolCard
          title="SIP / Investment"
          description="Maturity value with monthly investing."
          href="/tools/finance/sip-calculator"
          icon={<PiggyBank className="h-5 w-5 text-blue-600 dark:text-blue-500" />}
        />
        <ToolCard
          title="Salary / Wage"
          description="Hourly, daily, weekly, monthly breakdown."
          href="/tools/finance/salary-wage-calculator"
          icon={<Wallet className="h-5 w-5 text-blue-600 dark:text-blue-500" />}
        />
        <ToolCard
          title="Retirement Calculator"
          description="Estimate required monthly savings."
          href="/tools/finance/retirement-calculator"
          icon={<Banknote className="h-5 w-5 text-blue-600 dark:text-blue-500" />}
        />

        {/* Developer */}
        <ToolCard
          title="JSON Formatter"
          description="Format & validate JSON with errors."
          href="/tools/developer/json-formatter"
          icon={<Braces className="h-5 w-5 text-blue-600 dark:text-blue-500" />}
        />
        <ToolCard
          title="Base64 Encode/Decode"
          description="Convert text to and from Base64."
          href="/tools/developer/base64-encode-decode"
          icon={<Hash className="h-5 w-5 text-blue-600 dark:text-blue-500" />}
        />
        <ToolCard
          title="HTML/XML Formatter"
          description="Pretty-print HTML or XML."
          href="/tools/developer/html-xml-formatter"
          icon={<FileCode className="h-5 w-5 text-blue-600 dark:text-blue-500" />}
        />
        <ToolCard
          title="Regex Tester"
          description="Test patterns and see matches."
          href="/tools/developer/regex-tester"
          icon={<Regex className="h-5 w-5 text-blue-600 dark:text-blue-500" />}
        />
        <ToolCard
          title="Minify/Beautify"
          description="Minify or beautify JS, CSS, HTML."
          href="/tools/developer/minify-beautify"
          icon={<FileCode className="h-5 w-5 text-blue-600 dark:text-blue-500" />}
        />
        <ToolCard
          title="UUID Generator"
          description="Generate one or many UUIDv4s."
          href="/tools/developer/uuid-generator"
          icon={<Hash className="h-5 w-5 text-blue-600 dark:text-blue-500" />}
        />
        <ToolCard
          title="Markdown Editor"
          description="Edit Markdown with live preview."
          href="/tools/developer/markdown-editor"
          icon={<FileCode className="h-5 w-5 text-blue-600 dark:text-blue-500" />}
        />

        <ToolCard
          title="Image Compressor"
          description="Reduce file size (JPG/PNG) with quality control."
          href="/tools/images-files/image-compressor"
          icon={<ImageIcon className="h-5 w-5 text-blue-600 dark:text-blue-500" />}
        />
        <ToolCard
          title="Image Resize & Crop"
          description="Resize or crop images precisely."
          href="/tools/images-files/image-resizer-crop"
          icon={<Crop className="h-5 w-5 text-blue-600 dark:text-blue-500" />}
        />
        <ToolCard
          title="Convert Image Format"
          description="JPG, PNG, and WebP conversions."
          href="/tools/images-files/convert-image-format"
          icon={<ArrowLeftRight className="h-5 w-5 text-blue-600 dark:text-blue-500" />}
        />
        <ToolCard
          title="Add Watermark"
          description="Apply text or logo watermark."
          href="/tools/images-files/watermark"
          icon={<Stamp className="h-5 w-5 text-blue-600 dark:text-blue-500" />}
        />
        <ToolCard
          title="Color Picker (from Image)"
          description="Pick HEX/RGB by clicking on an image."
          href="/tools/images-files/color-picker"
          icon={<Palette className="h-5 w-5 text-blue-600 dark:text-blue-500" />}
        />
        <ToolCard
          title="Favicon Generator"
          description="Create multi-size favicons."
          href="/tools/images-files/favicon-generator"
          icon={<AppWindow className="h-5 w-5 text-blue-600 dark:text-blue-500" />}
        />
      </div>
    </div>
  )
}
