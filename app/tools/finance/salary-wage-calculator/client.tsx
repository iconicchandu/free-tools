"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"

type Mode = "annual" | "hourly"

export default function SalaryWageCalculator() {
  const [mode, setMode] = useState<Mode>("annual")
  const [annual, setAnnual] = useState(60000)
  const [hourly, setHourly] = useState(30)
  const [hoursPerWeek, setHoursPerWeek] = useState(40)

  const baseAnnual = useMemo(() => {
    if (mode === "annual") return annual
    // hourly to annual (52 weeks)
    return hourly * hoursPerWeek * 52
  }, [mode, annual, hourly, hoursPerWeek])

  const hourlyOut = baseAnnual / (hoursPerWeek * 52)
  const daily = hourlyOut * 8
  const weekly = hourlyOut * hoursPerWeek
  const monthly = baseAnnual / 12

  const data = [
    { name: "Hourly", value: hourlyOut },
    { name: "Daily", value: daily },
    { name: "Weekly", value: weekly },
    { name: "Monthly", value: monthly },
    { name: "Annual", value: baseAnnual },
  ]

  return (
    <main className="mx-auto max-w-5xl p-6 md:p-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-balance">Salary / Hourly Wage</h1>
        <p className="text-muted-foreground">Convert between hourly and salary with a quick breakdown</p>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
            <CardDescription>Choose input mode</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Mode</Label>
              <Select value={mode} onValueChange={(v) => setMode(v as Mode)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual">Annual → breakdown</SelectItem>
                  <SelectItem value="hourly">Hourly → breakdown</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {mode === "annual" ? (
              <div>
                <Label htmlFor="annual">Annual Salary</Label>
                <Input id="annual" type="number" value={annual} onChange={(e) => setAnnual(+e.target.value)} />
              </div>
            ) : (
              <div>
                <Label htmlFor="hourly">Hourly Rate</Label>
                <Input id="hourly" type="number" value={hourly} onChange={(e) => setHourly(+e.target.value)} />
              </div>
            )}
            <div>
              <Label htmlFor="hpw">Hours per week</Label>
              <Input id="hpw" type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(+e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>Cross-period earnings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              <SummaryItem label="Hourly" value={hourlyOut} />
              <SummaryItem label="Daily" value={daily} />
              <SummaryItem label="Weekly" value={weekly} />
              <SummaryItem label="Monthly" value={monthly} />
              <SummaryItem label="Annual" value={baseAnnual} />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" name="Amount" fill="#0ea5e9" />
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
