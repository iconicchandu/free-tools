import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export function ToolCard(props: {
  title: string
  description: string
  href: string
  icon?: React.ReactNode
}) {
  const { title, description, href, icon } = props
  return (
    <Link href={href} className="block h-full">
      <Card className="h-full transition-all hover:shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm">{description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  )
}
