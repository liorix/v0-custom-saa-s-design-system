"use client"

import { PageHeader } from "@/components/atoms/page-header"
import { DashboardLayout } from "@/components/templates/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Building2, MoreHorizontal, Plus, Users } from "lucide-react"
import { useState } from "react"
import { ContentContainer } from "@/components/templates/content-container"

interface Organization {
  id: string
  name: string
  members: number
  role: string
  createdAt: Date
}

export default function OrganizationsPage() {
  const [currentOrganizationId, setCurrentOrganizationId] = useState("1")
  const [organizations, setOrganizations] = useState<Organization[]>([
    {
      id: "1",
      name: "Acme Inc",
      members: 12,
      role: "Owner",
      createdAt: new Date(2023, 0, 15),
    },
    {
      id: "2",
      name: "Globex Corporation",
      members: 8,
      role: "Admin",
      createdAt: new Date(2023, 2, 22),
    },
    {
      id: "3",
      name: "Initech",
      members: 5,
      role: "Owner",
      createdAt: new Date(2023, 5, 10),
    },
  ])
  const [newOrgName, setNewOrgName] = useState("")
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [deleteOrgId, setDeleteOrgId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleAddOrganization = () => {
    if (!newOrgName.trim()) return

    const newOrg: Organization = {
      id: `org-${Date.now()}`,
      name: newOrgName,
      members: 1,
      role: "Owner",
      createdAt: new Date(),
    }

    setOrganizations([...organizations, newOrg])
    setNewOrgName("")
    setIsAddDialogOpen(false)
  }

  const handleEditOrganization = () => {
    if (!editingOrg || !editingOrg.name.trim()) return

    setOrganizations(organizations.map((org) => (org.id === editingOrg.id ? editingOrg : org)))
    setEditingOrg(null)
    setIsEditDialogOpen(false)
  }

  const handleDeleteOrganization = () => {
    if (!deleteOrgId) return

    setOrganizations(organizations.filter((org) => org.id !== deleteOrgId))
    setDeleteOrgId(null)
    setIsDeleteDialogOpen(false)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <DashboardLayout
      organizations={organizations}
      currentOrganizationId={currentOrganizationId}
      onOrganizationChange={setCurrentOrganizationId}
      onCreateOrganization={() => setIsAddDialogOpen(true)}
      onSignOut={() => console.log("Sign out")}
    >
      <ContentContainer>
        <PageHeader title="Organizations" description="Manage your organizations">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Organization
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Organization</DialogTitle>
                <DialogDescription>Add a new organization to manage products and teams.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Organization Name</Label>
                  <Input
                    id="name"
                    value={newOrgName}
                    onChange={(e) => setNewOrgName(e.target.value)}
                    placeholder="Enter organization name"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddOrganization}>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </PageHeader>

        <div className="grid gap-4">
          {organizations.map((org) => (
            <Card key={org.id} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{org.name}</CardTitle>
                    <CardDescription>Created on {formatDate(org.createdAt)}</CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        setEditingOrg(org)
                        setIsEditDialogOpen(true)
                      }}
                    >
                      Edit Organization
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setDeleteOrgId(org.id)
                        setIsDeleteDialogOpen(true)
                      }}
                      className="text-destructive focus:text-destructive"
                    >
                      Delete Organization
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{org.members} members</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Your role: <span className="font-medium">{org.role}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-3">
                <div className="flex justify-between w-full">
                  <Button variant="ghost" size="sm" asChild>
                    <a href={`/dashboard/team?org=${org.id}`}>Manage Team</a>
                  </Button>
                  <Button size="sm" asChild>
                    <a href={`/dashboard?org=${org.id}`}>View Dashboard</a>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Edit Organization Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Organization</DialogTitle>
              <DialogDescription>Update your organization details.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Organization Name</Label>
                <Input
                  id="edit-name"
                  value={editingOrg?.name || ""}
                  onChange={(e) => setEditingOrg(editingOrg ? { ...editingOrg, name: e.target.value } : null)}
                  placeholder="Enter organization name"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditOrganization}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Organization Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the organization and remove all associated
                data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteOrganization}
                className="bg-destructive text-destructive-foreground"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </ContentContainer>
    </DashboardLayout>
  )
}
