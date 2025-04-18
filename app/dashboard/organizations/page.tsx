"use client"

import { EmptyState } from "@/components/atoms/empty-state"
import { PageHeader } from "@/components/atoms/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Plus } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface Organization {
  id: string
  name: string
  members: number
  role: string
  createdAt: string
}

const initialOrganizations: Organization[] = [
  {
    id: "1",
    name: "Acme Inc",
    members: 12,
    role: "Owner",
    createdAt: "2023-01-01",
  },
  {
    id: "2",
    name: "Globex Corporation",
    members: 8,
    role: "Admin",
    createdAt: "2023-02-15",
  },
  {
    id: "3",
    name: "Initech",
    members: 5,
    role: "Member",
    createdAt: "2023-03-20",
  },
]

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>(initialOrganizations)

  return (
    <div className="container space-y-8 py-8">
      <PageHeader title="Organizations" description="Manage your organizations">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Organization
        </Button>
      </PageHeader>

      {organizations.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="No organizations"
          description="You don't have any organizations yet. Create your first organization to get started."
        >
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Organization
          </Button>
        </EmptyState>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {organizations.map((org) => (
            <Card key={org.id}>
              <CardHeader>
                <CardTitle>{org.name}</CardTitle>
                <CardDescription>
                  {org.members} member{org.members !== 1 ? "s" : ""} • {org.role}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Created on {new Date(org.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href={`/dashboard/organizations/${org.id}/settings`}>Settings</Link>
                </Button>
                <Button asChild>
                  <Link href={`/dashboard/organizations/${org.id}`}>View</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
