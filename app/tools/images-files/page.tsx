import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImageIcon, Crop, FileImage, Type, Palette, Square } from "lucide-react"

export const metadata = {
  title: "Image & Files Tools",
  description: "Compress, resize/crop, convert, watermark, pick colors, and generate favicons.",
}

const tools = [
  {
    href: "/tools/images-files/image-compressor",
    title: "Image Compressor",
    icon: ImageIcon,
    desc: "Compress JPG/PNG with quality control",
  },
  {
    href: "/tools/images-files/image-resizer-crop",
    title: "Image Resizer / Crop",
    icon: Crop,
    desc: "Resize and crop using a selection",
  },
  {
    href: "/tools/images-files/convert-image-format",
    title: "Convert Image Format",
    icon: FileImage,
    desc: "JPG, PNG, WebP conversions",
  },
  {
    href: "/tools/images-files/watermark",
    title: "Add Watermark",
    icon: Type,
    desc: "Text or logo watermark with positioning",
  },
  {
    href: "/tools/images-files/color-picker",
    title: "Color Picker",
    icon: Palette,
    desc: "Click image to get HEX/RGB",
  },
  {
    href: "/tools/images-files/favicon-generator",
    title: "Favicon Generator",
    icon: Square,
    desc: "Generate a favicon package",
  },
]

export default function ImagesFilesIndexPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-balance">Image & Files</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl text-pretty">
          A collection of quick utilities for images: compression, resizing/cropping, format conversion, watermarking,
          color picking, and favicon generation.
        </p>
      </header>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map(({ href, title, icon: Icon, desc }) => (
          <Card key={href} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{title}</CardTitle>
              <Icon className="h-5 w-5 text-muted-foreground" aria-hidden />
            </CardHeader>
            <CardContent className="flex items-end justify-between gap-4">
              <p className="text-sm text-muted-foreground">{desc}</p>
              <Button asChild size="sm">
                <Link href={href}>Open</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  )
}
