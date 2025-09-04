"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getToolsByCategory } from "@/lib/tools-catalog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

const categories: Array<"Finance" | "Developer" | "General"> = ["Finance", "Developer", "General"]

export default function SidebarCategories() {
  const pathname = usePathname()
  return (
    <Accordion type="multiple" defaultValue={["Finance"]} className="space-y-1">
      {categories.map((cat) => {
        const tools = getToolsByCategory(cat as any)
        return (
          <AccordionItem key={cat} value={cat} className="border-none">
            <AccordionTrigger className="text-sm font-medium">{cat}</AccordionTrigger>
            <AccordionContent className="space-y-1">
              {tools.map((t) => {
                const active = pathname === t.href
                return (
                  <Link
                    key={t.slug}
                    href={t.href}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm",
                      active ? "bg-primary/10 text-primary" : "hover:bg-muted",
                    )}
                  >
                    {t.title}
                  </Link>
                )
              })}
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
