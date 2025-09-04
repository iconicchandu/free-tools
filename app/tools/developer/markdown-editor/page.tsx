import MarkdownEditorClient from "./client"
import { ToolPageHeader } from "@/components/tool-page-header"

export const metadata = {
  title: "Markdown Editor • FreeTools",
  description: "Live Markdown editor with preview.",
}

export default function Page() {
  return (
    <div className="space-y-6">
      <ToolPageHeader title="Markdown Editor" description="Live Markdown editor with preview." />
      <MarkdownEditorClient />
    </div>
  )
}
