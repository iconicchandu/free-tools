import dynamic from "next/dynamic"

export const metadata = {
  title: "Mortgage Calculator | FreeTools",
  description: "Estimate your monthly mortgage and see amortization.",
}

const Client = dynamic(() => import("./client"), { ssr: false })

export default function Page() {
  return <Client />
}
