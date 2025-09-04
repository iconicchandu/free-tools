"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts"

type Slab = { upTo: number | null; rate: number } // upTo null = no upper cap

const SAMPLE_SLABS: Slab[] = [
  { upTo: 300000, rate: 0 },
  { upTo: 700000, rate: 5 },
  { upTo: 1000000, rate: 10 },
  { upTo: 1200000, rate: 15 },
  { upTo: 1500000, rate: 20 },
  { upTo: null, rate: 30 },
]

function computeTax(income: number, slabs: Slab[]) {
  let remaining = income
  let tax = 0
  let lower = 0
  for (const s of slabs) {
    const cap = s.upTo ?? Number.POSITIVE_INFINITY
    const band = Math.max(0, Math.min(remaining, cap - lower))
    tax += (band * s.rate) / 100
    remaining -= band
    lower = cap
    if (remaining <= 0) break
  }
  return Math.max(0, tax)
}

export default function IncomeTaxCalculator() {
  const [income, setIncome] = useState(1200000)
  const [slabs, setSlabs] = useState<Slab[]>(SAMPLE_SLABS)

  const tax = useMemo(() => computeTax(income, slabs), [income, slabs])
  const net = Math.max(0, income - tax)

  const data = [
    { name: "Gross", amount: income },
    { name: "Tax", amount: tax },
    { name: "Net", amount: net },
  ]

  function updateSlab(idx: number, key: "upTo" | "rate", val: number | null) {
    setSlabs((prev) => {
      const next = [...prev]
      next[idx] = { ...next[idx], [key]: val }
      return next
    })
  }

  function addSlab() {
    setSlabs((s) => [...s, { upTo: null, rate: 0 }])
  }

  function removeSlab(i: number) {
    setSlabs((s) => s.filter((_, idx) => idx !== i))
  }

  return (
    <main className="mx-auto max-w-5xl p-6 md:p-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-balance">Income Tax Calculator</h1>
        <p className="text-muted-foreground">Customize slabs and estimate net income</p>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
            <CardDescription>Income and slabs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="income">Annual Income</Label>
              <Input id="income" type="number" value={income} onChange={(e) => setIncome(+e.target.value)} />
            </div>

            <div className="space-y-3">
              <div className="text-sm font-medium">Slabs</div>
              {slabs.map((s, i) => (
                <div key={i} className="grid grid-cols-5 items-end gap-2">
                  <div className="col-span-2">
                    <Label>Up to</Label>
                    <Input
                      type="number"
                      value={s.upTo ?? ""}
                      placeholder="No cap"
                      onChange={(e) => updateSlab(i, "upTo", e.target.value === "" ? null : +e.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Rate %</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={s.rate}
                      onChange={(e) => updateSlab(i, "rate", +e.target.value)}
                    />
                  </div>
                  <div className="col-span-1">
                    <Button variant="secondary" className="w-full" onClick={() => removeSlab(i)}>
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              <Button onClick={addSlab} className="w-full">
                Add Slab
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>Tax breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              <SummaryItem label="Gross" value={income} />
              <SummaryItem label="Tax" value={tax} />
              <SummaryItem label="Net" value={net} />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" name="Amount" fill="#0ea5e9" />
                </BarChart>
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
