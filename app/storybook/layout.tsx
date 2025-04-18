import type React from "react"
import "../globals.css"
import "./storybook.css"

export default function StorybookLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-background">{children}</div>
}
