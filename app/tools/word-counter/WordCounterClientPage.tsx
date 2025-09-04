"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

function countMetrics(text: string) {
  const characters = text.length
  const words = (text.trim().match(/\S+/g) || []).length
  const sentences = (text.trim().match(/[^.!?]+[.!?]*/g) || []).filter(Boolean).length
  return { words, characters, sentences }
}

export default function WordCounterClientPage() {
  const [text, setText] = React.useState("")
  const { words, characters, sentences } = countMetrics(text)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Word Counter</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Words</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{words}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Characters</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{characters}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sentences</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{sentences}</CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Paste or type text</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing here..."
            rows={10}
          />
          <div className="flex items-center gap-2">
            <Input
              readOnly
              value={`${words} words, ${characters} characters, ${sentences} sentences`}
              aria-label="Summary"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
