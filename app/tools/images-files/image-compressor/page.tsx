import dynamic from "next/dynamic"
import { ToolPageHeader } from "@/components/tool-page-header"

const Client = dynamic(() => import("./client"), { ssr: false })

export const metadata = {
  title: "Image Compressor",
  description: "Compress JPG/PNG images with adjustable quality and download the result.",
}

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8">
      <ToolPageHeader
        title="Image Compressor"
        description="Upload one or more images, tune quality, and download optimized files."
      />
      <Client />
    </main>
  )
}
