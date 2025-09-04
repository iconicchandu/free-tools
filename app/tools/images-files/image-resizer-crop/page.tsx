import dynamic from "next/dynamic"
import { ToolPageHeader } from "@/components/tool-page-header"

const Client = dynamic(() => import("./client"), { ssr: false })

export const metadata = {
  title: "Image Resizer / Crop",
  description: "Resize an image and crop via a simple selection, then download.",
}

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8">
      <ToolPageHeader
        title="Image Resizer / Crop"
        description="Upload, drag a selection to crop, or enter exact dimensions."
      />
      <Client />
    </main>
  )
}
