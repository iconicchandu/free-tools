"use client"

import * as React from "react"
import { Navbar } from "@/components/navbar"
import { SidebarSheet, SidebarStatic } from "@/components/sidebar"

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="flex flex-col">
      <Navbar onOpenSidebar={() => setOpen(true)} />
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-6 px-4">
        <SidebarStatic />
        <SidebarSheet open={open} setOpen={setOpen} />
        <main className="flex-1 py-6">{children}</main>
      </div>
    </div>
  )
}
