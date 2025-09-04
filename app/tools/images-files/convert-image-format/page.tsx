import dynamic from "next/dynamic"
import { ToolPageHeader } from "@/components/tool-page-header"

const Client = dynamic(() => import("./client"), { ssr: false })

export const metadata = {
  title: "Convert Image Format",
  description: "Convert images between JPG, PNG, and WebP formats.",
}

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8">
      <ToolPageHeader title="Convert Image Format" description="Upload an image and convert to JPG, PNG, or WebP." />
      <Client />
    </main>
  )
}
