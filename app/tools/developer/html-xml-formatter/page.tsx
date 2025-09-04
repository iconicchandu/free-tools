import HtmlXmlFormatterClient from "./client"
import { ToolPageHeader } from "@/components/tool-page-header"

export const metadata = {
  title: "HTML / XML Formatter • FreeTools",
  description: "Pretty-print your HTML or XML.",
}

export default function Page() {
  return (
    <div className="space-y-6">
      <ToolPageHeader title="HTML / XML Formatter" description="Pretty-print your HTML or XML." />
      <HtmlXmlFormatterClient />
    </div>
  )
}
