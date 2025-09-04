import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { ToolPageHeader } from "@/components/tool-page-header"

export const metadata: Metadata = {
  title: "Text ↔ ASCII Entities • FreeTools",
  description:
    "Convert text to HTML numeric entities like Hello → &#72;&#101;&#108;&#108;&#111; and decode entities back to text. Spaces and newlines supported.",
}

const Client = dynamic(() => import("./client"), { ssr: false })

export default function Page() {
  return (
    <div className="space-y-6">
      <ToolPageHeader
        title="Text ↔ ASCII Entities"
        description="Convert plain text to numeric HTML entities (e.g., Hello → &#72;&#101;&#108;&#108;&#111;) and decode back to text. Spaces are &#32; and newlines are &#10;."
      />
      <Client />
    </div>
  )
}
