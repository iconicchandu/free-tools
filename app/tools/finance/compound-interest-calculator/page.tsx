import dynamic from "next/dynamic"

export const metadata = {
  title: "Compound Interest Calculator | FreeTools",
  description: "See how your principal grows with compounding.",
}

const Client = dynamic(() => import("./client"), { ssr: false })

export default function Page() {
  return <Client />
}
