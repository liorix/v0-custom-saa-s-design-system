"use client"

import { PageHeader } from "@/components/atoms/page-header"
import { StatCard } from "@/components/molecules/stat-card"
import { DataTable } from "@/components/organisms/data-table"
import { Button } from "@/components/ui/button"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpRight, BarChart3, DollarSign, Users } from "lucide-react"

interface Transaction {
  id: string
  amount: number
  status: "completed" | "pending" | "failed"
  email: string
  date: string
}

const transactions: Transaction[] = [
  {
    id: "1",
    amount: 100,
    status: "completed",
    email: "user1@example.com",
    date: "2023-01-01",
  },
  {
    id: "2",
    amount: 200,
    status: "pending",
    email: "user2@example.com",
    date: "2023-01-02",
  },
  {
    id: "3",
    amount: 300,
    status: "failed",
    email: "user3@example.com",
    date: "2023-01-03",
  },
]

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "id",
    header: "ID",
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
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
]

export default function DashboardPage() {
  return (
    <div className="container space-y-8 py-8">
      <PageHeader title="Dashboard" description="Overview of your account">
        <Button>
          <ArrowUpRight className="mr-2 h-4 w-4" />
          Export
        </Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
          title="Active Subscriptions"
          value="1,200"
          description="-5% from last month"
          icon={BarChart3}
          trend={{ value: 5, isPositive: false }}
        />
      </div>

      <div className="rounded-lg border p-4">
        <h2 className="mb-4 text-lg font-medium">Recent Transactions</h2>
        <DataTable columns={columns} data={transactions} />
      </div>
    </div>
  )
}
