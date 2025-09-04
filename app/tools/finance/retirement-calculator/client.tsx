"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts"

// We estimate required monthly savings to reach a target corpus computed as 300x desired monthly income
// (≈ 25 years of expenses). This is a simplification; users can adjust the income target.
function requiredMonthlyToReachTarget(currentSavings: number, years: number, annualReturnPct: number, target: number) {
  const r = annualReturnPct / 100 / 12
  const n = years * 12
  // FV = P*(1+r)^n + PMT * [((1+r)^n - 1)/r]
  // Solve for PMT
  const fvFromCurrent = currentSavings * Math.pow(1 + r, n)
  const need = Math.max(0, target - fvFromCurrent)
  if (r === 0) return need / n
  return need / (((Math.pow(1 + r, n) - 1) / r) * (1 + r))
}

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30)
  const [retireAge, setRetireAge] = useState(60)
  const [currentSavings, setCurrentSavings] = useState(20000)
  const [expectedReturn, setExpectedReturn] = useState(8)
  const [inflation, setInflation] = useState(3)
  const [desiredMonthlyIncome, setDesiredMonthlyIncome] = useState(2000)

  const years = Math.max(0, retireAge - currentAge)
  const targetCorpusToday = desiredMonthlyIncome * 300 // 25 years rule of thumb
  const targetCorpusAtRetirement = targetCorpusToday * Math.pow(1 + inflation / 100, years)

  const requiredMonthly = requiredMonthlyToReachTarget(currentSavings, years, expectedReturn, targetCorpusAtRetirement)

  const data = useMemo(() => {
    const r = expectedReturn / 100 / 12
    let bal = currentSavings
    const rows: { month: number; balance: number }[] = []
    for (let m = 0; m <= years * 12; m++) {
      if (m > 0) {
        bal = bal * (1 + r) + requiredMonthly
      }
      rows.push({ month: m, balance: bal })
    }
    return rows
  }, [currentSavings, years, expectedReturn, requiredMonthly])

  return (
    <main className="mx-auto max-w-5xl p-6 md:p-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-balance">Retirement Calculator</h1>
        <p className="text-muted-foreground">
          Estimate the monthly savings needed to reach an inflation-adjusted target
        </p>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
            <CardDescription>Adjust assumptions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currentAge">Current Age</Label>
                <Input
                  id="currentAge"
                  type="number"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(+e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="retireAge">Retirement Age</Label>
                <Input id="retireAge" type="number" value={retireAge} onChange={(e) => setRetireAge(+e.target.value)} />
              </div>
            </div>
            <div>
              <Label htmlFor="currentSavings">Current Savings</Label>
              <Input
                id="currentSavings"
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(+e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expectedReturn">Expected Return %</Label>
                <Input
                  id="expectedReturn"
                  type="number"
                  step="0.01"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(+e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="inflation">Inflation %</Label>
                <Input
                  id="inflation"
                  type="number"
                  step="0.01"
                  value={inflation}
                  onChange={(e) => setInflation(+e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="desiredIncome">Desired Monthly Income at Retirement</Label>
              <Input
                id="desiredIncome"
                type="number"
                value={desiredMonthlyIncome}
                onChange={(e) => setDesiredMonthlyIncome(+e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>Required savings and projected growth</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              <SummaryItem label="Target Corpus (today)" value={targetCorpusToday} />
              <SummaryItem label="Target Corpus (retirement)" value={targetCorpusAtRetirement} />
              <SummaryItem label="Required Monthly Savings" value={requiredMonthly} />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <XAxis dataKey="month" hide />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="balance"
                    name="Projected Balance"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    dot={false}
                  />
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
