"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from "recharts"

function pmT(principal: number, annualRatePct: number, years: number) {
  const r = annualRatePct / 100 / 12
  const n = years * 12
  if (r === 0) return principal / n
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(500000)
  const [downPayment, setDownPayment] = useState(100000)
  const [rate, setRate] = useState(6.5)
  const [termYears, setTermYears] = useState(30)

  const loanAmount = Math.max(0, homePrice - downPayment)
  const monthly = pmT(loanAmount, rate, termYears)
  const totalPaid = monthly * termYears * 12
  const totalInterest = Math.max(0, totalPaid - loanAmount)

  const data = useMemo(() => {
    const rows: { month: number; principalPaid: number; interestPaid: number; balance: number }[] = []
    let balance = loanAmount
    const r = rate / 100 / 12
    for (let m = 1; m <= termYears * 12; m++) {
      const interest = balance * r
      const principalPaid = Math.max(0, monthly - interest)
      balance = Math.max(0, balance - principalPaid)
      rows.push({
        month: m,
        principalPaid,
        interestPaid: interest,
        balance,
      })
    }
    return rows
  }, [loanAmount, rate, termYears, monthly])

  return (
    <main className="mx-auto max-w-5xl p-6 md:p-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-balance">Mortgage Calculator</h1>
        <p className="text-muted-foreground">Monthly payment and amortization schedule.</p>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
            <CardDescription>Update values to see instant results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="homePrice">Home Price</Label>
              <Input id="homePrice" type="number" value={homePrice} onChange={(e) => setHomePrice(+e.target.value)} />
            </div>
            <div>
              <Label htmlFor="downPayment">Down Payment</Label>
              <Input
                id="downPayment"
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(+e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rate">Interest %</Label>
                <Input id="rate" type="number" step="0.01" value={rate} onChange={(e) => setRate(+e.target.value)} />
              </div>
              <div>
                <Label htmlFor="term">Term (years)</Label>
                <Input id="term" type="number" value={termYears} onChange={(e) => setTermYears(+e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>Monthly and lifetime costs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <SummaryItem label="Loan Amount" value={loanAmount} />
              <SummaryItem label="Monthly" value={monthly} />
              <SummaryItem label="Total Paid" value={totalPaid} />
              <SummaryItem label="Total Interest" value={totalInterest} />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <XAxis dataKey="month" hide />
                  <YAxis hide />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="principalPaid"
                    name="Principal"
                    stroke="#0ea5e9"
                    fill="#0ea5e9"
                    fillOpacity={0.25}
                  />
                  <Area
                    type="monotone"
                    dataKey="interestPaid"
                    name="Interest"
                    stroke="#16a34a"
                    fill="#16a34a"
                    fillOpacity={0.25}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}

function SummaryItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-lg font-medium">{value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
    </div>
  )
}
