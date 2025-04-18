"use client"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react"
import { useState } from "react"

interface Organization {
  id: string
  name: string
}

interface OrganizationSwitcherProps {
  organizations: Organization[]
  currentOrganizationId: string
  onOrganizationChange: (organizationId: string) => void
  onCreateOrganization: () => void
  className?: string
}

export function OrganizationSwitcher({
  organizations,
  currentOrganizationId,
  onOrganizationChange,
  onCreateOrganization,
  className,
}: OrganizationSwitcherProps) {
  const [open, setOpen] = useState(false)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  const currentOrganization = organizations.find((org) => org.id === currentOrganizationId)

  return (
    <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select organization"
            className={cn("w-[200px] justify-between", className)}
          >
            {currentOrganization?.name || "Select organization"}
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search organization..." />
              <CommandEmpty>No organization found.</CommandEmpty>
              <CommandGroup heading="Organizations">
                {organizations.map((org) => (
                  <CommandItem
                    key={org.id}
                    onSelect={() => {
                      onOrganizationChange(org.id)
                      setOpen(false)
                    }}
                    className="text-sm"
                  >
                    <span>{org.name}</span>
                    {org.id === currentOrganizationId && <Check className="ml-auto h-4 w-4" />}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false)
                      setCreateDialogOpen(true)
                    }}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Organization
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Organization</DialogTitle>
          <DialogDescription>Add a new organization to manage products and teams.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{/* Organization creation form would go here */}</div>
        <DialogFooter>
          <Button
            onClick={() => {
              onCreateOrganization()
              setCreateDialogOpen(false)
            }}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
