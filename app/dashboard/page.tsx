"use client"

import { PageHeader } from "@/components/atoms/page-header"
import { StatCard } from "@/components/molecules/stat-card"
import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/components/templates/dashboard-layout"
import { ContentWrapper } from "@/components/templates/content-wrapper"
import { Plus, Users, CreditCard, TrendingUp, BarChart } from "lucide-react"
import { useState } from "react"

export default function DashboardPage() {
  const [currentOrganizationId, setCurrentOrganizationId] = useState("1")

  const organizations = [
    { id: "1", name: "Acme Inc" },
    { id: "2", name: "Globex Corporation" },
    { id: "3", name: "Initech" },
  ]

  return (
    <DashboardLayout
      organizations={organizations}
      currentOrganizationId={currentOrganizationId}
      onOrganizationChange={setCurrentOrganizationId}
      onCreateOrganization={() => console.log("Create organization")}
      onSignOut={() => console.log("Sign out")}
    >
      <PageHeader title="Dashboard" description="Overview of your account">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </PageHeader>

      <ContentWrapper>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value="2,543"
            description="Last 30 days"
            icon={Users}
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatCard
            title="Revenue"
            value="$45,231.89"
            description="Last 30 days"
            icon={CreditCard}
            trend={{ value: 8.2, isPositive: true }}
          />
          <StatCard title="Active Projects" value="12" description="Current period" icon={TrendingUp} />
          <StatCard
            title="Conversion Rate"
            value="3.2%"
            description="Last 30 days"
            icon={BarChart}
            trend={{ value: 1.1, isPositive: false }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 mt-8">
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">No recent activity to display.</p>
            </div>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Invite Team Members
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="mr-2 h-4 w-4" />
                Manage Subscription
              </Button>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </DashboardLayout>
  )
}
