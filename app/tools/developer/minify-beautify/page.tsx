import MinifyBeautifyClient from "./client"
import { ToolPageHeader } from "@/components/tool-page-header"

export const metadata = {
  title: "Minify / Beautify • FreeTools",
  description: "Minify or beautify JS, CSS, or HTML.",
}

export default function Page() {
  return (
    <div className="space-y-6">
      <ToolPageHeader title="Minify / Beautify" description="Minify or beautify JS, CSS, or HTML." />
      <MinifyBeautifyClient />
    </div>
  )
}
