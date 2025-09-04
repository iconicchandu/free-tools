"use client"

import * as React from "react"
import { differenceInYears, addYears, differenceInMonths, addMonths, differenceInDays } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function calcAge(dobStr: string) {
  if (!dobStr) return { years: 0, months: 0, days: 0 }
  const dob = new Date(dobStr)
  const now = new Date()
  const years = differenceInYears(now, dob)
  const afterYears = addYears(dob, years)
  const months = differenceInMonths(now, afterYears)
  const afterMonths = addMonths(afterYears, months)
  const days = differenceInDays(now, afterMonths)
  return { years, months, days }
}

export default function AgeCalculatorClientPage() {
  const [dob, setDob] = React.useState("")

  const { years, months, days } = calcAge(dob)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Age Calculator</h1>
      <Card>
        <CardHeader>
          <CardTitle>Enter your date of birth</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid max-w-md gap-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-md border p-4 text-center">
              <div className="text-sm text-foreground/70">Years</div>
              <div className="text-3xl font-semibold">{years}</div>
            </div>
            <div className="rounded-md border p-4 text-center">
              <div className="text-sm text-foreground/70">Months</div>
              <div className="text-3xl font-semibold">{months}</div>
            </div>
            <div className="rounded-md border p-4 text-center">
              <div className="text-sm text-foreground/70">Days</div>
              <div className="text-3xl font-semibold">{days}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
