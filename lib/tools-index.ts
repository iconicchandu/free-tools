export type ToolItem = {
  name: string
  path: string
  category: "Core" | "Finance" | "Developer" | "General" | "Image & Files"
  keywords: string[]
}

export const TOOLS: ToolItem[] = [
  // Core
  { name: "Word Counter", path: "/tools/word-counter", category: "Core", keywords: ["word", "count", "text"] },
  { name: "Age Calculator", path: "/tools/age-calculator", category: "Core", keywords: ["age", "birthday", "dob"] },
  { name: "PDF → Word", path: "/tools/pdf-to-word", category: "Core", keywords: ["pdf", "docx", "convert"] },
  { name: "Images → PDF", path: "/tools/image-to-pdf", category: "Core", keywords: ["image", "pdf", "merge"] },

  // Finance
  { name: "Loan / EMI", path: "/tools/finance/emi-calculator", category: "Finance", keywords: ["emi", "loan"] },
  {
    name: "Mortgage Calculator",
    path: "/tools/finance/mortgage-calculator",
    category: "Finance",
    keywords: ["mortgage"],
  },
  {
    name: "Currency Converter",
    path: "/tools/finance/currency-converter",
    category: "Finance",
    keywords: ["currency", "fx"],
  },
  {
    name: "Income Tax Calculator",
    path: "/tools/finance/income-tax-calculator",
    category: "Finance",
    keywords: ["tax"],
  },
  {
    name: "Compound Interest",
    path: "/tools/finance/compound-interest-calculator",
    category: "Finance",
    keywords: ["interest"],
  },
  {
    name: "SIP / Investment",
    path: "/tools/finance/sip-calculator",
    category: "Finance",
    keywords: ["sip", "investment"],
  },
  {
    name: "Salary / Wage",
    path: "/tools/finance/salary-wage-calculator",
    category: "Finance",
    keywords: ["salary", "wage"],
  },
  {
    name: "Retirement Calculator",
    path: "/tools/finance/retirement-calculator",
    category: "Finance",
    keywords: ["retirement"],
  },

  // Developer
  {
    name: "JSON Formatter",
    path: "/tools/developer/json-formatter",
    category: "Developer",
    keywords: ["json", "format", "validate"],
  },
  {
    name: "Base64 Encode/Decode",
    path: "/tools/developer/base64-encode-decode",
    category: "Developer",
    keywords: ["base64", "encode", "decode"],
  },
  {
    name: "HTML/XML Formatter",
    path: "/tools/developer/html-xml-formatter",
    category: "Developer",
    keywords: ["html", "xml", "pretty"],
  },
  {
    name: "Regex Tester",
    path: "/tools/developer/regex-tester",
    category: "Developer",
    keywords: ["regex", "regexp", "test"],
  },
  {
    name: "Minify/Beautify",
    path: "/tools/developer/minify-beautify",
    category: "Developer",
    keywords: ["minify", "beautify", "js", "css", "html"],
  },
  { name: "UUID Generator", path: "/tools/developer/uuid-generator", category: "Developer", keywords: ["uuid", "id"] },
  {
    name: "Markdown Editor",
    path: "/tools/developer/markdown-editor",
    category: "Developer",
    keywords: ["markdown", "editor", "preview"],
  },
  {
    name: "Text ↔ ASCII Entities",
    path: "/tools/developer/text-ascii-converter",
    category: "Developer",
    keywords: ["ascii", "entities", "html", "text"],
  },

  // Image & Files
  {
    name: "Image Compressor",
    path: "/tools/images-files/image-compressor",
    category: "Image & Files",
    keywords: ["image", "compress", "jpg", "png", "quality"],
  },
  {
    name: "Image Resize & Crop",
    path: "/tools/images-files/image-resizer-crop",
    category: "Image & Files",
    keywords: ["image", "resize", "crop", "dimensions"],
  },
  {
    name: "Convert Image Format",
    path: "/tools/images-files/convert-image-format",
    category: "Image & Files",
    keywords: ["convert", "jpg", "png", "webp"],
  },
  {
    name: "Add Watermark",
    path: "/tools/images-files/watermark",
    category: "Image & Files",
    keywords: ["watermark", "logo", "text"],
  },
  {
    name: "Color Picker (from Image)",
    path: "/tools/images-files/color-picker",
    category: "Image & Files",
    keywords: ["color", "picker", "hex", "rgb"],
  },
  {
    name: "Favicon Generator",
    path: "/tools/images-files/favicon-generator",
    category: "Image & Files",
    keywords: ["favicon", "ico", "sizes", "png"],
  },
]

export function searchTools(query: string): ToolItem[] {
  const q = query.toLowerCase().trim()
  if (!q) return []
  return TOOLS.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.path.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.keywords.some((k) => k.toLowerCase().includes(q)),
  ).slice(0, 8)
}

export const FINANCE_NAV = TOOLS.filter((t) => t.category === "Finance")
export const DEV_NAV = TOOLS.filter((t) => t.category === "Developer")
export const IMGFILES_NAV = TOOLS.filter((t) => t.category === "Image & Files")

export const CATEGORIES = ["All", "General", "Finance", "Developer", "Image & Files"] as const
export type Category = (typeof CATEGORIES)[number]

export function listByCategory(category: Category) {
  if (category === "All") return TOOLS
  if (category === "General") {
    return TOOLS.filter((t) => t.category === "General" || t.category === "Core")
  }
  return TOOLS.filter((t) => t.category === category)
}
