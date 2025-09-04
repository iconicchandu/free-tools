import EmiCalculatorClient from "./client"

export const metadata = {
  title: "Loan / EMI Calculator – SaaS Tools",
  description: "Calculate monthly EMI and visualize the amortization schedule.",
}

export default function Page() {
  return <EmiCalculatorClient />
}
