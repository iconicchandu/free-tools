import type { NextRequest } from "next/server"
import { PDFDocument } from "pdf-lib"

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const files = form.getAll("images") as File[]
    if (!files || files.length === 0) {
      return new Response("No images received", { status: 400 })
    }

    const pdfDoc = await PDFDocument.create()

    for (const file of files) {
      const bytes = new Uint8Array(await file.arrayBuffer())
      const type = (file.type || "").toLowerCase()
      let embedded
      if (type.includes("png")) {
        embedded = await pdfDoc.embedPng(bytes)
      } else {
        // default to JPEG for jpg/jpeg and other image/* that pdf-lib supports
        embedded = await pdfDoc.embedJpg(bytes)
      }
      const { width, height } = embedded
      const page = pdfDoc.addPage([width, height])
      page.drawImage(embedded, { x: 0, y: 0, width, height })
    }

    const pdfBytes = await pdfDoc.save()
    return new Response(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="images-merged.pdf"',
        "Cache-Control": "no-store",
      },
    })
  } catch (err: any) {
    return new Response(`Failed to create PDF: ${err?.message ?? "Unknown error"}`, { status: 500 })
  }
}
