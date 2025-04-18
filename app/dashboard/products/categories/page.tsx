"use client"

import { PageHeader } from "@/components/atoms/page-header"
import { DataTable } from "@/components/organisms/data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ColumnDef } from "@tanstack/react-table"
import { Edit, Plus, Trash } from "lucide-react"
import { useState } from "react"

interface Category {
  id: string
  name: string
  slug: string
  productsCount: number
}

const initialCategories: Category[] = [
  {
    id: "1",
    name: "Subscription",
    slug: "subscription",
    productsCount: 3,
  },
  {
    id: "2",
    name: "Service",
    slug: "service",
    productsCount: 2,
  },
  {
    id: "3",
    name: "Add-on",
    slug: "add-on",
    productsCount: 1,
  },
]

const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "productsCount",
    header: "Products",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original
      return (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
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

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [newCategory, setNewCategory] = useState({ name: "", slug: "" })
  const [open, setOpen] = useState(false)

  const handleAddCategory = () => {
    const id = (categories.length + 1).toString()
    setCategories([...categories, { ...newCategory, id, productsCount: 0 }])
    setNewCategory({ name: "", slug: "" })
    setOpen(false)
  }

  return (
    <div className="container space-y-8 py-8">
      <PageHeader title="Product Categories" description="Manage your product categories">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
              <DialogDescription>Create a new product category</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="Enter category name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={newCategory.slug}
                  onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                  placeholder="enter-slug"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddCategory}>Add Category</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Manage your product categories</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={categories} />
        </CardContent>
      </Card>
    </div>
  )
}
