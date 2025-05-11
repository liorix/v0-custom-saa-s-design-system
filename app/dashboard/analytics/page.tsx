"use client"

import { PageHeader } from "@/components/atoms/page-header"
import { useState } from "react"
import { DashboardShell } from "@/components/templates/dashboard-shell"

// Simple component for a line chart visualization
function LineChart({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="h-[200px] flex items-end gap-1">
        {[40, 30, 70, 50, 60, 35, 45, 65, 75, 50, 55, 80].map((height, i) => (
          <div key={i} className="relative flex-1 group">
            <div
              className="absolute bottom-0 w-full bg-primary/80 rounded-t-sm transition-all duration-300 group-hover:bg-primary"
              style={{ height: `${height}%` }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
        <div>Jan</div>
        <div>Feb</div>
        <div>Mar</div>
        <div>Apr</div>
        <div>May</div>
        <div>Jun</div>
        <div>Jul</div>
        <div>Aug</div>
        <div>Sep</div>
        <div>Oct</div>
        <div>Nov</div>
        <div>Dec</div>
      </div>
    </div>
  )
}

// Simple component for a pie chart visualization
function PieChart({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-[200px]">
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="hsl(var(--primary))"
          strokeWidth="20"
          strokeDasharray="75 25"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="hsl(var(--primary) / 0.3)"
          strokeWidth="20"
          strokeDasharray="25 75"
          strokeDashoffset="75"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="text-2xl font-bold">75%</span>
        <span className="text-xs text-muted-foreground">Conversion</span>
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  const [currentOrganizationId, setCurrentOrganizationId] = useState("1")

  const organizations = [
    { id: "1", name: "Acme Inc" },
    { id: "2", name: "Globex Corporation" },
    { id: "3", name: "Initech" },
  ]

  return (
    <DashboardShell>
      <div className="flex flex-col gap-8 p-8">
        <PageHeader title="Analytics" description="View your analytics data" />

        {/* Analytics content */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-6 shadow">
            <h3 className="text-lg font-medium">Visitors</h3>
            <div className="mt-4 h-48 w-full bg-muted/30"></div>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow">
            <h3 className="text-lg font-medium">Page Views</h3>
            <div className="mt-4 h-48 w-full bg-muted/30"></div>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
