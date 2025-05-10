"use client"

import { Bell, Search } from "lucide-react"
import { OrganizationSwitcher } from "@/components/organisms/organization-switcher"
import { ThemeSwitcher } from "@/components/atoms/theme-switcher"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="hidden md:block">
        <OrganizationSwitcher />
      </div>
      <div className="relative flex-1 md:grow-0 md:basis-1/3">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Search..." className="w-full rounded-lg bg-background pl-8 md:w-auto" />
      </div>
      <div className="flex flex-1 items-center justify-end gap-2">
        <ThemeSwitcher />
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>
      </div>
    </header>
  )
}
