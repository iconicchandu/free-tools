import Base64Client from "./client"
import { ToolPageHeader } from "@/components/tool-page-header"

export const metadata = {
  title: "Base64 Encode / Decode • FreeTools",
  description: "Convert text to/from Base64.",
}

export default function Page() {
  return (
    <div className="space-y-6">
      <ToolPageHeader title="Base64 Encode / Decode" description="Convert text to/from Base64." />
      <Base64Client />
    </div>
  )
}
