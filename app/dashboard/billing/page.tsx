"use client"

import { PageHeader } from "@/components/atoms/page-header"
import { BillingPlanCard } from "@/components/organisms/billing-plan-card"
import { DashboardLayout } from "@/components/templates/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export default function BillingPage() {
  const [currentOrganizationId, setCurrentOrganizationId] = useState("1")

  const organizations = [
    { id: "1", name: "Acme Inc" },
    { id: "2", name: "Globex Corporation" },
    { id: "3", name: "Initech" },
  ]

  const plans = [
    {
      name: "Starter",
      description: "For individuals and small teams",
      price: {
        monthly: 9,
        annually: true,
      },
      features: [
        { name: "5 team members", included: true },
        { name: "20GB storage", included: true },
        { name: "Basic analytics", included: true },
        { name: "Priority support", included: false },
        { name: "Custom branding", included: false },
      ],
      current: false,
    },
    {
      name: "Pro",
      description: "For growing teams and businesses",
      price: {
        monthly: 29,
        annually: true,
      },
      features: [
        { name: "10 team members", included: true },
        { name: "50GB storage", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Priority support", included: true },
        { name: "Custom branding", included: false },
      ],
      popular: true,
      current: true,
    },
    {
      name: "Enterprise",
      description: "For large organizations",
      price: {
        monthly: 99,
        annually: true,
      },
      features: [
        { name: "Unlimited team members", included: true },
        { name: "250GB storage", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Priority support", included: true },
        { name: "Custom branding", included: true },
      ],
      current: false,
    },
  ]

  return (
    <DashboardLayout
      organizations={organizations}
      currentOrganizationId={currentOrganizationId}
      onOrganizationChange={setCurrentOrganizationId}
      onCreateOrganization={() => console.log("Create organization")}
      onSignOut={() => console.log("Sign out")}
    >
      <PageHeader title="Billing" description="Manage your subscription and billing information" />

      <Tabs defaultValue="plans" className="space-y-4">
        <TabsList>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <BillingPlanCard
                key={plan.name}
                name={plan.name}
                description={plan.description}
                price={plan.price}
                features={plan.features}
                popular={plan.popular}
                current={plan.current}
                onSelect={() => console.log(`Selected plan: ${plan.name}`)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>View and download your invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">No invoices found.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">No payment methods found.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
