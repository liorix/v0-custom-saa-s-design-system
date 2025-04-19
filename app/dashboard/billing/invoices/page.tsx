"use client"

import { PageHeader } from "@/components/atoms/page-header"
import { DashboardLayout } from "@/components/templates/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download } from "lucide-react"
import { useState } from "react"
import { ContentContainer } from "@/components/templates/content-container"

export default function InvoicesPage() {
  const [currentOrganizationId, setCurrentOrganizationId] = useState("1")

  const organizations = [
    { id: "1", name: "Acme Inc" },
    { id: "2", name: "Globex Corporation" },
    { id: "3", name: "Initech" },
  ]

  const invoices = [
    {
      id: "INV-001",
      date: "Jan 1, 2023",
      amount: "$29.00",
      status: "Paid",
    },
    {
      id: "INV-002",
      date: "Feb 1, 2023",
      amount: "$29.00",
      status: "Paid",
    },
    {
      id: "INV-003",
      date: "Mar 1, 2023",
      amount: "$29.00",
      status: "Paid",
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
      <ContentContainer>
        <PageHeader title="Invoices" description="View and download your invoices" />

        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>View all your past invoices</CardDescription>
          </CardHeader>
          <CardContent>
            {invoices.length > 0 ? (
              <div className="rounded-md border">
                <div className="grid grid-cols-4 p-4 font-medium border-b">
                  <div>Invoice</div>
                  <div>Date</div>
                  <div>Amount</div>
                  <div>Status</div>
                </div>
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="grid grid-cols-4 p-4 border-b last:border-0 items-center">
                    <div className="flex items-center gap-2">
                      {invoice.id}
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                    <div>{invoice.date}</div>
                    <div>{invoice.amount}</div>
                    <div>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                        {invoice.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-md border">
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">No invoices found.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </ContentContainer>
    </DashboardLayout>
  )
}
