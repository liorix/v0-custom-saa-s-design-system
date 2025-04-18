"use client"

import { FormInputField } from "@/components/molecules/form-field"
import { PageHeader } from "@/components/atoms/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"

const productFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  price: z.coerce.number().min(0, { message: "Price must be a positive number" }),
  stock: z.coerce.number().int().min(0, { message: "Stock must be a positive integer" }),
  status: z.enum(["active", "draft", "archived"]),
})

type ProductFormValues = z.infer<typeof productFormSchema>

export default function NewProductPage() {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: 0,
      stock: 0,
      status: "draft",
    },
  })

  const onSubmit = (values: ProductFormValues) => {
    console.log("Product values:", values)
    // In a real app, you would save the product to your database
  }

  return (
    <div className="container space-y-8 py-8">
      <PageHeader title="Add Product" description="Create a new product or service" />

      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
          <CardDescription>Enter the details of your new product</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormInputField control={form.control} name="name" label="Name" placeholder="Enter product name" />

              <div className="space-y-1">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  placeholder="Enter product description"
                  {...form.register("description")}
                  className="min-h-[100px]"
                />
                {form.formState.errors.description && (
                  <p className="text-xs text-destructive">{form.formState.errors.description.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label htmlFor="category" className="text-sm font-medium">
                  Category
                </label>
                <Select
                  onValueChange={(value) => form.setValue("category", value)}
                  defaultValue={form.getValues("category")}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="subscription">Subscription</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                    <SelectItem value="add-on">Add-on</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.category && (
                  <p className="text-xs text-destructive">{form.formState.errors.category.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormInputField
                  control={form.control}
                  name="price"
                  label="Price"
                  placeholder="0.00"
                  type="number"
                  description="Enter the price in USD"
                />

                <FormInputField
                  control={form.control}
                  name="stock"
                  label="Stock"
                  placeholder="0"
                  type="number"
                  description="Enter available quantity"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="status" className="text-sm font-medium">
                  Status
                </label>
                <Select
                  onValueChange={(value: "active" | "draft" | "archived") => form.setValue("status", value)}
                  defaultValue={form.getValues("status")}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.status && (
                  <p className="text-xs text-destructive">{form.formState.errors.status.message}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/dashboard/products">Cancel</Link>
              </Button>
              <Button type="submit">Create Product</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
