"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

function calcEmi(p: number, annualRate: number, months: number) {
  if (p <= 0 || annualRate < 0 || months <= 0) return { emi: 0, schedule: [] as any[] }
  const r = annualRate / 12 / 100
  const emi = r === 0 ? p / months : (p * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)

  let balance = p
  const schedule: { month: number; principal: number; interest: number; balance: number }[] = []
  for (let m = 1; m <= months; m++) {
    const interest = balance * r
    const principal = emi - interest
    balance = Math.max(0, balance - principal)
    if (m % 3 === 0 || m === months) {
      schedule.push({ month: m, principal: Math.max(0, principal), interest: Math.max(0, interest), balance })
    }
  }
  return { emi, schedule }
}

export default function EmiCalculatorClient() {
  const [amount, setAmount] = React.useState(500000)
  const [rate, setRate] = React.useState(9.5)
  const [tenureType, setTenureType] = React.useState<"months" | "years">("years")
  const [tenureValue, setTenureValue] = React.useState(5)

  const months = tenureType === "years" ? tenureValue * 12 : tenureValue
  const { emi, schedule } = calcEmi(amount, rate, months)
  const totalPayable = emi * months
  const totalInterest = totalPayable - amount

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Loan / EMI Calculator</h1>
      <Card>
        <CardHeader>
          <CardTitle>Inputs</CardTitle>
          <CardDescription>Enter loan details to compute monthly EMI.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="amount">Loan Amount</Label>
            <Input
              id="amount"
              type="number"
              min={0}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="rate">Interest Rate (Annual %)</Label>
            <Input
              id="rate"
              type="number"
              step="0.1"
              min={0}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tenure">Tenure</Label>
            <Input
              id="tenure"
              type="number"
              min={1}
              value={tenureValue}
              onChange={(e) => setTenureValue(Number(e.target.value))}
            />
          </div>
          <div className="grid gap-2">
            <Label>Tenure Unit</Label>
            <Select value={tenureType} onValueChange={(v: "months" | "years") => setTenureType(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="years">Years</SelectItem>
                <SelectItem value="months">Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Monthly EMI</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">₹ {emi.toFixed(2)}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Interest</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">₹ {totalInterest.toFixed(2)}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Payable</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">₹ {totalPayable.toFixed(2)}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Balance Over Time</CardTitle>
          <CardDescription>Amortization snapshot by month.</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={schedule}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="balance" stroke="#2563eb" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
