"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { DataTable } from "@/components/organisms/data-table"
import { Button } from "@/components/ui/button"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

const meta: Meta<typeof DataTable> = {
  title: "Organisms/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof DataTable>

interface User {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive"
}

const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "active",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "User",
    status: "inactive",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@example.com",
    role: "Manager",
    status: "active",
  },
  {
    id: "5",
    name: "Charlie Davis",
    email: "charlie@example.com",
    role: "User",
    status: "inactive",
  },
  {
    id: "6",
    name: "Eva Wilson",
    email: "eva@example.com",
    role: "Manager",
    status: "active",
  },
]

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
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
              status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
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
      const user = row.original
      return (
        <Button variant="ghost" size="sm" onClick={() => console.log(`Action for user ${user.id}`)}>
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Actions</span>
        </Button>
      )
    },
  },
]

export const Default = {
  render: () => <DataTable columns={columns} data={users} className="w-full" />,
}

export const Empty = {
  render: () => <DataTable columns={columns} data={[]} className="w-full" />,
}

export const WithPageSize = {
  render: () => <DataTable columns={columns} data={users} pageSize={3} className="w-full" />,
}
