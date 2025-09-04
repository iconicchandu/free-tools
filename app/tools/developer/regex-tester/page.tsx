import RegexTesterClient from "./client"
import { ToolPageHeader } from "@/components/tool-page-header"

export const metadata = {
  title: "Regex Tester • FreeTools",
  description: "Test regex patterns and highlight matches in real-time.",
}

export default function Page() {
  return (
    <div className="space-y-6">
      <ToolPageHeader title="Regex Tester" description="Test regex patterns and highlight matches in real-time." />
      <RegexTesterClient />
    </div>
  )
}
