import JsonFormatterClient from "./client"
import { ToolPageHeader } from "@/components/tool-page-header"

export const metadata = {
  title: "JSON Formatter / Validator • FreeTools",
  description: "Format and validate JSON instantly.",
}

export default function Page() {
  return (
    <div className="space-y-6">
      <ToolPageHeader title="JSON Formatter / Validator" description="Format and validate JSON instantly." />
      <JsonFormatterClient />
    </div>
  )
}
