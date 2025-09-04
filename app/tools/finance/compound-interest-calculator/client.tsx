"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts"

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(10000)
  const [rate, setRate] = useState(8)
  const [years, setYears] = useState(10)
  const [freq, setFreq] = useState<"yearly" | "quarterly" | "monthly" | "daily">("monthly")

  const n = freq === "yearly" ? 1 : freq === "quarterly" ? 4 : freq === "monthly" ? 12 : 365
  const data = useMemo(() => {
    const rows: { year: number; balance: number }[] = []
    for (let y = 0; y <= years; y++) {
      const balance = principal * Math.pow(1 + rate / 100 / n, n * y)
      rows.push({ year: y, balance })
    }
    return rows
  }, [principal, rate, years, n])

  const maturity = data[data.length - 1]?.balance ?? 0
  const interest = Math.max(0, maturity - principal)

  return (
    <main className="mx-auto max-w-5xl p-6 md:p-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-balance">Compound Interest</h1>
        <p className="text-muted-foreground">Principal growth with compounding</p>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
            <CardDescription>Adjust to see results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="principal">Principal</Label>
              <Input id="principal" type="number" value={principal} onChange={(e) => setPrincipal(+e.target.value)} />
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
            <div>
              <Label>Frequency</Label>
              <Select value={freq} onValueChange={(v) => setFreq(v as any)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>Maturity and growth</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              <SummaryItem label="Maturity" value={maturity} />
              <SummaryItem label="Total Interest" value={interest} />
              <SummaryItem label="Principal" value={principal} />
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
