"use client"

import { PageHeader } from "@/components/atoms/page-header"
import { StatCard } from "@/components/molecules/stat-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, BarChart3, DollarSign, TrendingUp, Users } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="container space-y-8 py-8">
      <PageHeader title="Analytics" description="Track your business performance">
        <Button>
          <ArrowUpRight className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </PageHeader>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Revenue"
              value="$45,231.89"
              description="+20.1% from last month"
              icon={DollarSign}
              trend={{ value: 20.1, isPositive: true }}
            />
            <StatCard
              title="Active Users"
              value="2,350"
              description="+180.1% from last month"
              icon={Users}
              trend={{ value: 180.1, isPositive: true }}
            />
            <StatCard
              title="Conversion Rate"
              value="3.2%"
              description="+0.2% from last month"
              icon={TrendingUp}
              trend={{ value: 0.2, isPositive: true }}
            />
            <StatCard
              title="Active Subscriptions"
              value="1,200"
              description="-5% from last month"
              icon={BarChart3}
              trend={{ value: 5, isPositive: false }}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Over Time</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px] w-full">
                <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed">
                  <p className="text-sm text-muted-foreground">Revenue chart would go here</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px] w-full">
                <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed">
                  <p className="text-sm text-muted-foreground">User growth chart would go here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed">
                  <p className="text-sm text-muted-foreground">Detailed revenue analytics would go here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed">
                  <p className="text-sm text-muted-foreground">Detailed user analytics would go here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Product Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed">
                  <p className="text-sm text-muted-foreground">Detailed product analytics would go here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
