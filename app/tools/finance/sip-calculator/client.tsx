"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts"

function fvAnnuity(monthly: number, annualRatePct: number, years: number) {
  const r = annualRatePct / 100 / 12
  const n = years * 12
  if (r === 0) return monthly * n
  return monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
}

export default function SIPCalculator() {
  const [monthly, setMonthly] = useState(500)
  const [rate, setRate] = useState(10)
  const [years, setYears] = useState(20)

  const data = useMemo(() => {
    const rows: { year: number; balance: number }[] = []
    for (let y = 0; y <= years; y++) {
      rows.push({ year: y, balance: fvAnnuity(monthly, rate, y) })
    }
    return rows
  }, [monthly, rate, years])

  const maturity = data[data.length - 1]?.balance ?? 0
  const invested = monthly * years * 12
  const gain = Math.max(0, maturity - invested)

  return (
    <main className="mx-auto max-w-5xl p-6 md:p-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-balance">SIP / Investment</h1>
        <p className="text-muted-foreground">Monthly contributions growing over time</p>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
            <CardDescription>Adjust to update results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="monthly">Monthly Investment</Label>
              <Input id="monthly" type="number" value={monthly} onChange={(e) => setMonthly(+e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rate">Rate %</Label>
                <Input id="rate" type="number" step="0.01" value={rate} onChange={(e) => setRate(+e.target.value)} />
              </div>
              <div>
                <Label htmlFor="years">Years</Label>
                <Input id="years" type="number" value={years} onChange={(e) => setYears(+e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>Maturity and invested</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              <SummaryItem label="Maturity" value={maturity} />
              <SummaryItem label="Invested" value={invested} />
              <SummaryItem label="Gain" value={gain} />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="balance" name="Balance" stroke="#0ea5e9" strokeWidth={2} dot={false} />
                </LineChart>
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
