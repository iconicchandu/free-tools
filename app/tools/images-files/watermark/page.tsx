import dynamic from "next/dynamic"
import { ToolPageHeader } from "@/components/tool-page-header"
const Client = dynamic(() => import("./client"), { ssr: false })

export const metadata = {
  title: "Add Watermark",
  description: "Overlay text or a logo onto your image, positioned as you like.",
}

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8">
      <ToolPageHeader
        title="Add Watermark"
        description="Add a text or logo watermark to your image at common positions."
      />
      <Client />
    </main>
  )
}
