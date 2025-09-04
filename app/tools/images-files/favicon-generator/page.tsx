import dynamic from "next/dynamic"
import { ToolPageHeader } from "@/components/tool-page-header"

const Client = dynamic(() => import("./client"), { ssr: false })

export const metadata = {
  title: "Favicon Generator",
  description: "Generate a favicon package in multiple sizes and download as a zip.",
}

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8">
      <ToolPageHeader
        title="Favicon Generator"
        description="Upload a square logo/image and generate standard favicon sizes."
      />
      <Client />
    </main>
  )
}
