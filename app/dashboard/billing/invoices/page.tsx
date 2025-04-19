import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const invoices = [
  {
    id: "invoice_1",
    date: "2023-01-01",
    amount: "$100.00",
    status: "Paid",
  },
  {
    id: "invoice_2",
    date: "2023-02-01",
    amount: "$200.00",
    status: "Paid",
  },
  {
    id: "invoice_3",
    date: "2023-03-01",
    amount: "$300.00",
    status: "Unpaid",
  },
]

export default function BillingInvoicesPage() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Billing History</CardTitle>
        <CardDescription>View all your past invoices</CardDescription>
      </CardHeader>
      <CardContent>
        {invoices.length > 0 ? (
          <div className="rounded-md border w-full">
            <div className="grid grid-cols-4 p-4 font-medium border-b w-full">
              <div>Invoice</div>
              <div>Date</div>
              <div>Amount</div>
              <div>Status</div>
            </div>
            {invoices.map((invoice) => (
              <div key={invoice.id} className="grid grid-cols-4 p-4 border-b last:border-0 items-center w-full">
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
          <div className="rounded-md border w-full">
            <div className="p-4">
              <p className="text-sm text-muted-foreground">No invoices found.</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
