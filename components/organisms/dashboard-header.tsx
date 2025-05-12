"use client"

import { Button } from "@/components/ui/button"
import { LogoutButton } from "@/components/atoms/logout-button"
import { Bell, Menu } from "lucide-react"
import { ThemeSwitcher } from "@/components/atoms/theme-switcher"

interface DashboardHeaderProps {
  onMenuClick?: () => void
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b px-4">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>

      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

        {/* Add a fallback logout button in the header */}
        <LogoutButton variant="outline" size="sm">
          Sign out
        </LogoutButton>
      </div>
    </header>
  )
}
