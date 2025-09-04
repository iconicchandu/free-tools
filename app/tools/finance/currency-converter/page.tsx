import CurrencyConverterClient from "./client"

export const metadata = {
  title: "Currency Converter – SaaS Tools",
  description: "Convert between currencies using live exchange rates.",
}

export default function Page() {
  return <CurrencyConverterClient />
}
