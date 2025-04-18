"use client"

import { PageHeader } from "@/components/atoms/page-header"
import { BillingPlanCard } from "@/components/organisms/billing-plan-card"
import { DataTable } from "@/components/organisms/data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ColumnDef } from "@tanstack/react-table"
import { Download } from "lucide-react"

interface Invoice {
  id: string
  amount: number
  status: "paid" | "pending" | "failed"
  date: string
}

const invoices: Invoice[] = [
  {
    id: "INV-001",
    amount: 100,
    status: "paid",
    date: "2023-01-01",
  },
  {
    id: "INV-002",
    amount: 200,
    status: "paid",
    date: "2023-02-01",
  },
  {
    id: "INV-003",
    amount: 300,
    status: "pending",
    date: "2023-03-01",
  },
]

const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "id",
    header: "Invoice",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      return <div>${row.getValue("amount")}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return <div className="capitalize">{status}</div>
    },
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Button variant="ghost" size="icon">
          <Download className="h-4 w-4" />
          <span className="sr-only">Download</span>
        </Button>
      )
    },
  },
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
    popular: false,
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
    popular: false,
    current: false,
  },
]

export default function BillingPage() {
  const handleSelectPlan = (planName: string) => {
    console.log(`Selected plan: ${planName}`)
  }

  return (
    <div className="container space-y-8 py-8">
      <PageHeader title="Billing" description="Manage your subscription and billing information" />

      <Card>
        <CardHeader>
          <CardTitle>Subscription Plans</CardTitle>
          <CardDescription>Choose the plan that best fits your needs</CardDescription>
        </CardHeader>
        <CardContent>
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
                onSelect={() => handleSelectPlan(plan.name)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View and download your past invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={invoices} />
        </CardContent>
      </Card>
    </div>
  )
}
