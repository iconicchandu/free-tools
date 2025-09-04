import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export const metadata = {
  title: "Finance Tools | FreeTools",
  description: "Quick calculators for loans, mortgages, investments, taxes, and retirement.",
}

const financeLinks = [
  {
    href: "/tools/finance/emi-calculator",
    title: "Loan / EMI Calculator",
    desc: "Monthly EMI and total interest with chart",
  },
  {
    href: "/tools/finance/mortgage-calculator",
    title: "Mortgage Calculator",
    desc: "Monthly payment + amortization chart",
  },
  { href: "/tools/finance/currency-converter", title: "Currency Converter", desc: "Convert between currencies" },
  { href: "/tools/finance/income-tax-calculator", title: "Income Tax Calculator", desc: "Country slabs & net income" },
  {
    href: "/tools/finance/compound-interest-calculator",
    title: "Compound Interest",
    desc: "Growth over time with compounding",
  },
  { href: "/tools/finance/sip-calculator", title: "SIP / Investment", desc: "Maturity value with monthly investing" },
  {
    href: "/tools/finance/salary-wage-calculator",
    title: "Salary / Hourly Wage",
    desc: "Hourly, daily, weekly, monthly",
  },
  {
    href: "/tools/finance/retirement-calculator",
    title: "Retirement Calculator",
    desc: "Required monthly savings estimate",
  },
]

export default function FinanceIndexPage() {
  return (
    <main className="mx-auto max-w-5xl p-6 md:p-10">
      <header className="mb-8">
        <h1 className="text-balance text-3xl font-semibold">Finance Tools</h1>
        <p className="text-muted-foreground mt-2">
          Calculate payments, plan investments, estimate taxes, and prepare for retirement.
        </p>
      </header>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {financeLinks.map((l) => (
          <Link key={l.href} href={l.href}>
            <Card className="h-full transition hover:shadow">
              <CardHeader>
                <CardTitle className="text-lg">{l.title}</CardTitle>
                <CardDescription>{l.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Open tool →</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </main>
  )
}
