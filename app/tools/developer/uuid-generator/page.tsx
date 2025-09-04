import UuidClient from "./client"
import { ToolPageHeader } from "@/components/tool-page-header"

export const metadata = {
  title: "UUID Generator • FreeTools",
  description: "Generate UUIDv4 values.",
}

export default function Page() {
  return (
    <div className="space-y-6">
      <ToolPageHeader title="UUID Generator" description="Generate UUIDv4 values." />
      <UuidClient />
    </div>
  )
}
