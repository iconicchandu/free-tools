export type ToolItem = {
  slug: string
  title: string
  description: string
  href: string
  category: "Finance" | "Developer" | "General"
  icon?: string
  keywords?: string[]
}

export const toolsCatalog: ToolItem[] = [
  // Finance
  {
    slug: "emi-calculator",
    title: "EMI Calculator",
    description: "Calculate monthly EMI, interest and principal split.",
    href: "/tools/finance/emi-calculator",
    category: "Finance",
    icon: "Calculator",
    keywords: ["loan", "emi", "finance", "interest"],
  },
  {
    slug: "currency-converter",
    title: "Currency Converter",
    description: "Convert between currencies with live exchange rates.",
    href: "/tools/finance/currency-converter",
    category: "Finance",
    icon: "Coins",
    keywords: ["fx", "currency", "money"],
  },
  {
    slug: "mortgage-calculator",
    title: "Mortgage Calculator",
    description: "Estimate payments, interest, and amortization.",
    href: "/tools/finance/mortgage-calculator",
    category: "Finance",
    icon: "Home",
    keywords: ["mortgage", "home", "loan"],
  },
  {
    slug: "compound-interest",
    title: "Compound Interest",
    description: "Forecast savings growth with compounding.",
    href: "/tools/finance/compound-interest-calculator",
    category: "Finance",
    icon: "LineChart",
    keywords: ["savings", "compound", "growth"],
  },
  {
    slug: "sip-calculator",
    title: "SIP Calculator",
    description: "Project SIP value over time.",
    href: "/tools/finance/sip-calculator",
    category: "Finance",
    icon: "TrendingUp",
    keywords: ["sip", "mutual fund", "investment"],
  },
  {
    slug: "income-tax",
    title: "Income Tax Calculator",
    description: "Estimate income taxes quickly.",
    href: "/tools/finance/income-tax-calculator",
    category: "Finance",
    icon: "Receipt",
    keywords: ["tax", "salary", "income"],
  },
  {
    slug: "salary-wage",
    title: "Salary/Wage Calculator",
    description: "Convert hourly, monthly, and yearly pay.",
    href: "/tools/finance/salary-wage-calculator",
    category: "Finance",
    icon: "Briefcase",
    keywords: ["salary", "wage", "payroll"],
  },

  // Developer
  {
    slug: "json-formatter",
    title: "JSON Formatter",
    description: "Pretty-print, validate, and minify JSON.",
    href: "/tools/developer/json-formatter",
    category: "Developer",
    icon: "Braces",
    keywords: ["json", "format", "minify"],
  },
  {
    slug: "base64",
    title: "Base64 Encode/Decode",
    description: "Encode or decode Base64 strings.",
    href: "/tools/developer/base64-encode-decode",
    category: "Developer",
    icon: "Binary",
    keywords: ["base64", "encode", "decode"],
  },
  {
    slug: "html-xml-formatter",
    title: "HTML/XML Formatter",
    description: "Clean and format markup.",
    href: "/tools/developer/html-xml-formatter",
    category: "Developer",
    icon: "Code2",
    keywords: ["html", "xml", "format"],
  },
  {
    slug: "regex-tester",
    title: "Regex Tester",
    description: "Test regular expressions against sample text.",
    href: "/tools/developer/regex-tester",
    category: "Developer",
    icon: "SearchCode",
    keywords: ["regex", "test"],
  },
  {
    slug: "minify-beautify",
    title: "Minify & Beautify",
    description: "Minify or format code quickly.",
    href: "/tools/developer/minify-beautify",
    category: "Developer",
    icon: "Sparkles",
    keywords: ["minify", "beautify", "prettier"],
  },
  {
    slug: "uuid-generator",
    title: "UUID Generator",
    description: "Generate v4 UUIDs for development.",
    href: "/tools/developer/uuid-generator",
    category: "Developer",
    icon: "Fingerprint",
    keywords: ["uuid", "id"],
  },
  {
    slug: "markdown-editor",
    title: "Markdown Editor",
    description: "Write and preview Markdown.",
    href: "/tools/developer/markdown-editor",
    category: "Developer",
    icon: "FileCode",
    keywords: ["markdown", "editor"],
  },

  // General
  {
    slug: "word-counter",
    title: "Word Counter",
    description: "Count words and characters instantly.",
    href: "/tools/word-counter",
    category: "General",
    icon: "Type",
  },
  {
    slug: "age-calculator",
    title: "Age Calculator",
    description: "Calculate exact age from a date of birth.",
    href: "/tools/age-calculator",
    category: "General",
    icon: "CalendarCheck",
  },
  {
    slug: "pdf-to-docx",
    title: "PDF → DOCX Converter",
    description: "Convert PDFs to Word while preserving layout.",
    href: "/tools/pdf-to-word",
    category: "General",
    icon: "FileType2",
    keywords: ["pdf", "docx", "convert"],
  },
  {
    slug: "images-to-pdf",
    title: "Images → PDF",
    description: "Combine images into a single PDF.",
    href: "/tools/image-to-pdf",
    category: "General",
    icon: "ImageDown",
  },
]

export const toolCategories = ["All", "Finance", "Developer", "General"] as const
export type ToolCategory = (typeof toolCategories)[number]

export function getToolsByCategory(category: ToolCategory): ToolItem[] {
  if (category === "All") return toolsCatalog
  return toolsCatalog.filter((t) => t.category === category)
}

export function searchTools(query: string): ToolItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return toolsCatalog.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.slug.toLowerCase().includes(q) ||
      (t.keywords || []).some((k) => k.toLowerCase().includes(q)),
  )
}
