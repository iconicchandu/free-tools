import dynamic from "next/dynamic"

export const metadata = {
  title: "Income Tax Calculator | FreeTools",
  description: "Estimate taxes with configurable slabs.",
}

const Client = dynamic(() => import("./client"), { ssr: false })

export default function Page() {
  return <Client />
}
