"use client"

import { PageHeader } from "@/components/atoms/page-header"
import { StatCard } from "@/components/molecules/stat-card"
import { DashboardLayout } from "@/components/templates/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, CreditCard, ArrowUpRight, ArrowDownRight, Calendar, Download } from "lucide-react"
import { useState } from "react"
import { ContentContainer } from "@/components/templates/content-container"

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
    <DashboardLayout
      organizations={organizations}
      currentOrganizationId={currentOrganizationId}
      onOrganizationChange={setCurrentOrganizationId}
      onCreateOrganization={() => console.log("Create organization")}
      onSignOut={() => console.log("Sign out")}
    >
      <ContentContainer>
        <PageHeader title="Analytics" description="Overview of your business performance">
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Last 30 days
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </PageHeader>

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
          <StatCard
            title="Conversion Rate"
            value="3.2%"
            description="Last 30 days"
            icon={ArrowUpRight}
            trend={{ value: 1.1, isPositive: true }}
          />
          <StatCard
            title="Churn Rate"
            value="0.8%"
            description="Last 30 days"
            icon={ArrowDownRight}
            trend={{ value: 0.3, isPositive: false }}
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-4 mt-8">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Over Time</CardTitle>
                  <CardDescription>Monthly revenue for the past year</CardDescription>
                </CardHeader>
                <CardContent>
                  <LineChart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>User Acquisition</CardTitle>
                  <CardDescription>New users by source</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between">
                  <PieChart className="w-1/2" />
                  <div className="w-1/2 space-y-4 pl-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Organic</span>
                        <span className="font-medium">75%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-full w-[75%] rounded-full bg-primary" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Referral</span>
                        <span className="font-medium">15%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-full w-[15%] rounded-full bg-primary/70" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Social</span>
                        <span className="font-medium">10%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-full w-[10%] rounded-full bg-primary/40" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
                <CardDescription>Comparing current period to previous period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Average Order Value</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-bold">$45.82</p>
                      <p className="text-sm text-green-500">+5.2%</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Customer Lifetime Value</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-bold">$580.25</p>
                      <p className="text-sm text-green-500">+12.3%</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Monthly Active Users</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-bold">1,245</p>
                      <p className="text-sm text-green-500">+8.7%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Analytics</CardTitle>
                <CardDescription>Detailed user metrics and demographics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Select the "Users" tab to view detailed user analytics.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>Detailed revenue metrics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Select the "Revenue" tab to view detailed revenue analytics.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Analytics</CardTitle>
                <CardDescription>User engagement metrics and behavior</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Select the "Engagement" tab to view detailed engagement analytics.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </ContentContainer>
    </DashboardLayout>
  )
}
