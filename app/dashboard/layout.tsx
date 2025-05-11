import type React from "react"

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  // We're just returning children directly now
  // The actual sidebar will be in the DashboardShell component
  return children
}
