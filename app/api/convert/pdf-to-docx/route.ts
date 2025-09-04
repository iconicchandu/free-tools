export const runtime = "nodejs" // ensure server runtime

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const file = form.get("file") as File | null
    if (!file) {
      return new Response("Missing file", { status: 400 })
    }

    // Allow an override via header for debugging, but prefer env vars.
    const headerOverride = req.headers.get("x-convertapi-secret")?.trim()

    // Support multiple env var names to reduce configuration friction.
    const secret = headerOverride || process.env.CONVERTAPI_SECRET || process.env.CONVERT_API_SECRET

    if (!secret) {
      console.log("[v0] Missing ConvertAPI secret. Checked: CONVERTAPI_SECRET, CONVERT_API_SECRET")
      return new Response(
        "Server not configured: please add CONVERTAPI_SECRET or CONVERT_API_SECRET in Project Settings → Environment Variables",
        { status: 500 },
      )
    }

    // Helpful masked log to verify it's being read without leaking full key
    console.log("[v0] ConvertAPI secret detected:", `${secret.slice(0, 4)}***${secret.slice(-2)}`)

    const upstream = new FormData()
    // Some providers accept "File" while others accept "file". Send both to be robust.
    upstream.append("File", file, file.name)
    upstream.append("file", file, file.name)

    // Call ConvertAPI: https://v2.convertapi.com/convert/pdf/to/docx
    const res = await fetch(`https://v2.convertapi.com/convert/pdf/to/docx?Secret=${encodeURIComponent(secret)}`, {
      method: "POST",
      body: upstream,
    })

    if (!res.ok) {
      const text = await res.text().catch(() => "")
      console.log("[v0] ConvertAPI upstream error:", res.status, text)
      return new Response(`Conversion failed: ${res.status} ${text}`, { status: 502 })
    }

    let data: any = null
    try {
      data = await res.json()
    } catch (e) {
      const text = await res.text().catch(() => "")
      console.log("[v0] Unexpected non-JSON response from ConvertAPI:", text.slice(0, 200))
      return new Response("Conversion provider returned an unexpected response.", { status: 502 })
    }

    const fileUrl: string | undefined = data?.Files?.[0]?.Url || data?.files?.[0]?.Url || data?.Files?.[0]?.UrlFile
    if (!fileUrl) {
      console.log("[v0] ConvertAPI response missing Files[0].Url. Response keys:", Object.keys(data || {}))
      return new Response("Conversion provider returned no file URL", { status: 502 })
    }

    const dl = await fetch(fileUrl)
    if (!dl.ok) {
      console.log("[v0] Failed to download converted DOCX:", dl.status)
      return new Response("Failed to download converted DOCX", { status: 502 })
    }

    const ab = await dl.arrayBuffer()
    const originalName = file.name?.replace(/\.pdf$/i, "") || "converted"
    return new Response(ab, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${originalName}.docx"`,
        "Cache-Control": "no-store",
      },
    })
  } catch (err: any) {
    console.log("[v0] Server error in /api/convert/pdf-to-docx:", err?.message || err)
    return new Response(`Server error: ${err?.message || "unknown error"}`, { status: 500 })
  }
}
