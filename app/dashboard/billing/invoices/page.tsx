"use client"

import { PageHeader } from "@/components/atoms/page-header"
import { DataTable } from "@/components/organisms/data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ColumnDef } from "@tanstack/react-table"
import { Download, FileText } from "lucide-react"

interface Invoice {
  id: string
  amount: number
  status: "paid" | "pending" | "failed"
  date: string
  dueDate: string
}

const invoices: Invoice[] = [
  {
    id: "INV-001",
    amount: 100,
    status: "paid",
    date: "2023-01-01",
    dueDate: "2023-01-15",
  },
  {
    id: "INV-002",
    amount: 200,
    status: "paid",
    date: "2023-02-01",
    dueDate: "2023-02-15",
  },
  {
    id: "INV-003",
    amount: 300,
    status: "pending",
    date: "2023-03-01",
    dueDate: "2023-03-15",
  },
  {
    id: "INV-004",
    amount: 150,
    status: "paid",
    date: "2023-04-01",
    dueDate: "2023-04-15",
  },
  {
    id: "INV-005",
    amount: 250,
    status: "failed",
    date: "2023-05-01",
    dueDate: "2023-05-15",
  },
  {
    id: "INV-006",
    amount: 350,
    status: "pending",
    date: "2023-06-01",
    dueDate: "2023-06-15",
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
      return (
        <div className="capitalize">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              status === "paid"
                ? "bg-green-100 text-green-800"
                : status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
            }`}
          >
            {status}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
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

export default function InvoicesPage() {
  return (
    <div className="container space-y-8 py-8">
      <PageHeader title="Invoices" description="View and download your invoices">
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Export All
        </Button>
      </PageHeader>

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
