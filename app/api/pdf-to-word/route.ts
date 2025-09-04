// In this preview/runtime, conversion is now fully client-side.
import type { NextRequest } from "next/server"

export async function POST(_req: NextRequest) {
  return new Response(
    "This endpoint is not used. The PDF→Word conversion runs fully in the browser for compatibility.",
    { status: 410 },
  )
}
