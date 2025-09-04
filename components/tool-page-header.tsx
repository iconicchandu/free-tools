export function ToolPageHeader({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <header className="mb-6">
      <h1 className="text-2xl font-semibold tracking-tight text-pretty">{title}</h1>
      {description ? <p className="mt-1 text-sm text-muted-foreground text-pretty">{description}</p> : null}
    </header>
  )
}
