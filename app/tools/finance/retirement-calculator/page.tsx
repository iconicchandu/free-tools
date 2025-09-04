import dynamic from "next/dynamic"

export const metadata = {
  title: "Retirement Calculator | FreeTools",
  description: "Estimate required monthly savings until retirement.",
}

const Client = dynamic(() => import("./client"), { ssr: false })

export default function Page() {
  return <Client />
}
