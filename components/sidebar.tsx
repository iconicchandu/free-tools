"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import {
  Type,
  CalendarClock,
  FileText,
  ImageIcon,
  Calculator,
  Landmark,
  Coins,
  PiggyBank,
  TrendingUp,
  Wallet,
  Banknote,
  Percent,
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
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

type SidebarLink = {
  href: string
  label: string
  icon: React.ElementType
}

const coreLinks: SidebarLink[] = [
  { href: "/tools/word-counter", label: "Word Counter", icon: Type },
  { href: "/tools/age-calculator", label: "Age Calculator", icon: CalendarClock },
  { href: "/tools/pdf-to-word", label: "PDF → Word", icon: FileText },
  { href: "/tools/image-to-pdf", label: "Images → PDF", icon: ImageIcon },
]

const financeLinks: SidebarLink[] = [
  { href: "/tools/finance/emi-calculator", label: "Loan / EMI", icon: Calculator },
  { href: "/tools/finance/mortgage-calculator", label: "Mortgage", icon: Landmark },
  { href: "/tools/finance/currency-converter", label: "Currency", icon: Coins },
  { href: "/tools/finance/income-tax-calculator", label: "Income Tax", icon: Percent },
  { href: "/tools/finance/compound-interest-calculator", label: "Compound Interest", icon: TrendingUp },
  { href: "/tools/finance/sip-calculator", label: "SIP / Investment", icon: PiggyBank },
  { href: "/tools/finance/salary-wage-calculator", label: "Salary / Wage", icon: Wallet },
  { href: "/tools/finance/retirement-calculator", label: "Retirement", icon: Banknote },
]

const developerLinks: SidebarLink[] = [
  { href: "/tools/developer/json-formatter", label: "JSON Formatter", icon: Braces },
  { href: "/tools/developer/base64-encode-decode", label: "Base64 Encode/Decode", icon: Hash },
  { href: "/tools/developer/html-xml-formatter", label: "HTML/XML Formatter", icon: FileCode },
  { href: "/tools/developer/regex-tester", label: "Regex Tester", icon: Regex },
  { href: "/tools/developer/minify-beautify", label: "Minify/Beautify", icon: FileCode },
  { href: "/tools/developer/uuid-generator", label: "UUID Generator", icon: Hash },
  { href: "/tools/developer/markdown-editor", label: "Markdown Editor", icon: FileCode },
  { href: "/tools/developer/text-ascii-converter", label: "Text ↔ ASCII Entities", icon: ScanText },
]

const imageFileLinks: SidebarLink[] = [
  { href: "/tools/images-files/image-compressor", label: "Image Compressor", icon: ImageIcon },
  { href: "/tools/images-files/image-resizer-crop", label: "Resize & Crop", icon: Crop },
  { href: "/tools/images-files/convert-image-format", label: "Convert Format", icon: ArrowLeftRight },
  { href: "/tools/images-files/watermark", label: "Add Watermark", icon: Stamp },
  { href: "/tools/images-files/color-picker", label: "Color Picker", icon: Palette },
  { href: "/tools/images-files/favicon-generator", label: "Favicon Generator", icon: AppWindow },
]

function Section({
  title,
  icon: Icon,
  links,
  isOpen,
  onToggle,
  pathname,
}: {
  title: string
  icon?: React.ElementType
  links: SidebarLink[]
  isOpen: boolean
  onToggle: () => void
  pathname: string
}) {
  return (
    <div>
      <button
        className="mb-2 flex w-full items-center gap-2 text-left text-xs font-medium uppercase text-foreground/60"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
        {title}
      </button>
      {isOpen && (
        <ul className="space-y-1">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted",
                  pathname.startsWith(l.href) && "bg-muted",
                )}
              >
                <l.icon className="h-4 w-4" />
                <span>{l.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function SidebarStatic() {
  const pathname = usePathname()
  type SectionName = "General" | "Finance" | "Image & Files" | "Developer"
  const [openSection, setOpenSection] = useState<SectionName | null>("General")

  return (
    <aside className="hidden h-[calc(100vh-56px)] w-64 shrink-0 border-r bg-background md:block">
      <div className="space-y-6 p-4">
        {/* General category (was Core Tools) */}
        <Section
          title="General"
          links={coreLinks}
          isOpen={openSection === "General"}
          onToggle={() => setOpenSection((s) => (s === "General" ? null : "General"))}
          pathname={pathname}
        />
        {/* Finance, Image & Files, Developer categories */}
        <Section
          title="Finance"
          icon={Landmark}
          links={financeLinks}
          isOpen={openSection === "Finance"}
          onToggle={() => setOpenSection((s) => (s === "Finance" ? null : "Finance"))}
          pathname={pathname}
        />
        {/* Image & Files group */}
        <Section
          title="Image & Files"
          icon={ImageIcon}
          links={imageFileLinks}
          isOpen={openSection === "Image & Files"}
          onToggle={() => setOpenSection((s) => (s === "Image & Files" ? null : "Image & Files"))}
          pathname={pathname}
        />
        <Section
          title="Developer"
          icon={FileCode}
          links={developerLinks}
          isOpen={openSection === "Developer"}
          onToggle={() => setOpenSection((s) => (s === "Developer" ? null : "Developer"))}
          pathname={pathname}
        />
      </div>
    </aside>
  )
}

export function SidebarSheet({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const pathname = usePathname()
  useEffect(() => {
    setOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  type SectionName = "General" | "Finance" | "Image & Files" | "Developer"
  const [openSection, setOpenSection] = useState<SectionName | null>("General")

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="p-4">
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <div className="space-y-6 p-4">
          {/* General category (was Core Tools) */}
          <Section
            title="General"
            links={coreLinks}
            isOpen={openSection === "General"}
            onToggle={() => setOpenSection((s) => (s === "General" ? null : "General"))}
            pathname={pathname}
          />
          {/* Finance, Image & Files, Developer categories */}
          <Section
            title="Finance"
            icon={Landmark}
            links={financeLinks}
            isOpen={openSection === "Finance"}
            onToggle={() => setOpenSection((s) => (s === "Finance" ? null : "Finance"))}
            pathname={pathname}
          />
          {/* Image & Files group in mobile sheet */}
          <Section
            title="Image & Files"
            icon={ImageIcon}
            links={imageFileLinks}
            isOpen={openSection === "Image & Files"}
            onToggle={() => setOpenSection((s) => (s === "Image & Files" ? null : "Image & Files"))}
            pathname={pathname}
          />
          <Section
            title="Developer"
            icon={FileCode}
            links={developerLinks}
            isOpen={openSection === "Developer"}
            onToggle={() => setOpenSection((s) => (s === "Developer" ? null : "Developer"))}
            pathname={pathname}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
