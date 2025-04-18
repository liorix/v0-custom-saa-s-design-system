"use client"

import { PageHeader } from "@/components/atoms/page-header"
import { DataTable } from "@/components/organisms/data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ColumnDef } from "@tanstack/react-table"
import { Edit, Plus, Trash } from "lucide-react"
import Link from "next/link"

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: "active" | "draft" | "archived"
}

const products: Product[] = [
  {
    id: "PROD-001",
    name: "Basic Plan",
    category: "Subscription",
    price: 9.99,
    stock: 999,
    status: "active",
  },
  {
    id: "PROD-002",
    name: "Pro Plan",
    category: "Subscription",
    price: 19.99,
    stock: 999,
    status: "active",
  },
  {
    id: "PROD-003",
    name: "Enterprise Plan",
    category: "Subscription",
    price: 49.99,
    stock: 999,
    status: "active",
  },
  {
    id: "PROD-004",
    name: "Custom Integration",
    category: "Service",
    price: 299.99,
    stock: 10,
    status: "active",
  },
  {
    id: "PROD-005",
    name: "API Access",
    category: "Add-on",
    price: 29.99,
    stock: 999,
    status: "active",
  },
  {
    id: "PROD-006",
    name: "Premium Support",
    category: "Service",
    price: 99.99,
    stock: 50,
    status: "draft",
  },
]

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return <div>${row.getValue("price")}</div>
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
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
              status === "active"
                ? "bg-green-100 text-green-800"
                : status === "draft"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
            }`}
          >
            {status}
          </span>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original
      return (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/dashboard/products/${product.id}/edit`}>
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon">
            <Trash className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      )
    },
  },
]

export default function ProductsPage() {
  return (
    <div className="container space-y-8 py-8">
      <PageHeader title="Products" description="Manage your products and services">
        <Button asChild>
          <Link href="/dashboard/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
          <CardDescription>View and manage your products</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={products} />
        </CardContent>
      </Card>
    </div>
  )
}
