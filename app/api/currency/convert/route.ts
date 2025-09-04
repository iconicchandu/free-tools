import type { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const rawFrom = searchParams.get("from") || ""
  const rawTo = searchParams.get("to") || ""
  const from = rawFrom.toUpperCase()
  const to = rawTo.toUpperCase()
  const amountStr = searchParams.get("amount") || "1"
  const amount = Number.parseFloat(amountStr)

  if (!from || !to) return new Response("Missing from/to", { status: 400 })
  if (!Number.isFinite(amount) || amount < 0) return new Response("Invalid amount", { status: 400 })

  // Provider 1: exchangerate.host
  const tryExchangerateHost = async () => {
    const r = await fetch(
      `https://api.exchangerate.host/convert?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&amount=1`,
      { cache: "no-store" },
    )
    if (!r.ok) throw new Error(`exchangerate.host failed: ${r.status}`)
    const j = await r.json()
    const rate = Number(j?.info?.rate)
    if (!Number.isFinite(rate) || rate <= 0) throw new Error("exchangerate.host missing rate")
    return { provider: "exchangerate.host", rate, date: j?.date as string | undefined }
  }

  // Provider 2: open.er-api.com
  const tryOpenErApi = async () => {
    const r = await fetch(`https://open.er-api.com/v6/latest/${encodeURIComponent(from)}`, { cache: "no-store" })
    if (!r.ok) throw new Error(`open.er-api.com failed: ${r.status}`)
    const j = await r.json()
    if ((j?.result || j?.result) === "error") throw new Error(`open.er-api.com error: ${j?.error_type || "unknown"}`)
    const rate = Number(j?.rates?.[to])
    if (!Number.isFinite(rate) || rate <= 0) throw new Error("open.er-api.com missing rate")
    return { provider: "open.er-api.com", rate, date: j?.time_last_update_utc as string | undefined }
  }

  // Provider 3: fawazahmed0 via jsdelivr CDN
  const tryFawazAhmed = async () => {
    const r = await fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from.toLowerCase()}/${to.toLowerCase()}.json`,
      { cache: "no-store" },
    )
    if (!r.ok) throw new Error(`fawazahmed0 currency API failed: ${r.status}`)
    const j = await r.json()
    const key = to.toLowerCase()
    const rate = Number(j?.[key])
    if (!Number.isFinite(rate) || rate <= 0) throw new Error("fawazahmed0 missing rate")
    return { provider: "fawazahmed0/currency-api", rate, date: j?.date as string | undefined }
  }

  const providers = [tryExchangerateHost, tryOpenErApi, tryFawazAhmed]

  let lastError: unknown = null
  for (const p of providers) {
    try {
      const { provider, rate, date } = await p()
      const result = amount * rate
      return Response.json(
        { provider, rate, result, date },
        {
          headers: { "Cache-Control": "no-store" },
        },
      )
    } catch (e) {
      lastError = e
      // try next provider
    }
  }

  const message =
    lastError instanceof Error
      ? `All providers failed: ${lastError.message}`
      : "All providers failed for unknown reasons"
  return new Response(message, { status: 502 })
}
