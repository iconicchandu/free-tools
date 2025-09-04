"use client"

import * as React from "react"
import useSWR from "swr"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY", "AUD", "CAD", "CHF", "CNY"]

const fetcher = (url: string) =>
  fetch(url)
    .then(async (r) => {
      if (!r.ok) throw new Error(await r.text().catch(() => "Request failed"))
      return r.json()
    })
    .catch((e) => {
      throw e
    })

export default function CurrencyConverterClient() {
  const [from, setFrom] = React.useState("USD")
  const [to, setTo] = React.useState("EUR")
  const [amount, setAmount] = React.useState(100)

  const query = amount > 0 && from && to ? `/api/currency/convert?from=${from}&to=${to}&amount=${amount}` : null

  const { data, isLoading, error } = useSWR(query, fetcher)

  const result = data?.result ?? 0
  const rate = data?.rate ?? 0
  const provider = data?.provider ?? "exchangerate.host"

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Currency Converter</h1>
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Convert</CardTitle>
          <CardDescription>Live conversion via {provider}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              min={0}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
          <div className="grid gap-2">
            <Label>From</Label>
            <Select value={from} onValueChange={setFrom}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>To</Label>
            <Select value={to} onValueChange={setTo}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-3 mt-2">
            <div className="rounded-md border p-4">
              <div className="text-sm text-foreground/70">
                {error
                  ? `Error: ${error.message}`
                  : isLoading
                    ? "Loading..."
                    : rate
                      ? `Rate: 1 ${from} = ${rate.toFixed(4)} ${to}`
                      : "—"}
              </div>
              <div className="mt-1 text-2xl font-semibold">
                {error ? "—" : isLoading ? "..." : `${result.toFixed(2)} ${to}`}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
