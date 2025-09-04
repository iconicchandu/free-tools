import dynamic from "next/dynamic"

export const metadata = {
  title: "SIP / Investment Calculator | FreeTools",
  description: "Monthly investing maturity value with chart.",
}

const Client = dynamic(() => import("./client"), { ssr: false })

export default function Page() {
  return <Client />
}
