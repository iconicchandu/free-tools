import dynamic from "next/dynamic"
import { ToolPageHeader } from "@/components/tool-page-header"

const Client = dynamic(() => import("./client"), { ssr: false })

export const metadata = {
  title: "Color Picker",
  description: "Click anywhere on an image to get its color in HEX/RGB and copy to clipboard.",
}

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8">
      <ToolPageHeader title="Color Picker" description="Upload an image or paste a URL, then click to pick colors." />
      <Client />
    </main>
  )
}
