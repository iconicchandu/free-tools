import dynamic from "next/dynamic"

export const metadata = {
  title: "Salary / Hourly Wage Calculator | FreeTools",
  description: "Break down earnings across time periods.",
}

const Client = dynamic(() => import("./client"), { ssr: false })

export default function Page() {
  return <Client />
}
