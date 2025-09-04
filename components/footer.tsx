export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-8 text-sm text-foreground/60">
        {/* Left: logo */}
        <div className="flex items-center gap-2">
          <img src="/logo-freetools.png" alt="FreeTools" className="h-6 w-auto" />
        </div>
        {/* Right: copyright */}
        <p className="text-pretty">© {new Date().getFullYear()} FreeTools. All rights reserved.</p>
      </div>
    </footer>
  )
}
