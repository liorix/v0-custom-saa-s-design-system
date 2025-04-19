"use client"

import { Logo } from "@/components/atoms/logo"
import { OrganizationSwitcher } from "@/components/organisms/organization-switcher"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Bell,
  Building2,
  CreditCard,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

interface DashboardLayoutProps {
  children: ReactNode
  organizations: { id: string; name: string }[]
  currentOrganizationId: string
  onOrganizationChange: (organizationId: string) => void
  onCreateOrganization: () => void
  onSignOut: () => void
  className?: string
}

export function DashboardLayout({
  children,
  organizations,
  currentOrganizationId,
  onOrganizationChange,
  onCreateOrganization,
  onSignOut,
  className,
}: DashboardLayoutProps) {
  const pathname = usePathname()

  const mainNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
    },
  ]

  const teamNavItems = [
    {
      title: "Team Members",
      href: "/dashboard/team",
      icon: Users,
    },
    {
      title: "Organizations",
      href: "/dashboard/organizations",
      icon: Building2,
    },
  ]

  const billingNavItems = [
    {
      title: "Subscription",
      href: "/dashboard/billing",
      icon: CreditCard,
    },
    {
      title: "Invoices",
      href: "/dashboard/billing/invoices",
      icon: FileText,
    },
  ]

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:block w-64 border-r shrink-0">
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="border-b p-4">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/dashboard">
                <Logo icon={Home} size="sm" />
              </Link>
            </div>
            <OrganizationSwitcher
              organizations={organizations}
              currentOrganizationId={currentOrganizationId}
              onOrganizationChange={onOrganizationChange}
              onCreateOrganization={onCreateOrganization}
              className="w-full"
            />
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-auto py-2">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-xs font-semibold text-muted-foreground">Overview</h2>
              <div className="space-y-1">
                {mainNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                      pathname === item.href ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-xs font-semibold text-muted-foreground">Team</h2>
              <div className="space-y-1">
                {teamNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                      pathname === item.href ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-xs font-semibold text-muted-foreground">Billing</h2>
              <div className="space-y-1">
                {billingNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                      pathname === item.href ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="border-t p-4">
            <div className="space-y-1">
              <Link
                href="/dashboard/settings"
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                  pathname === "/dashboard/settings" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
                )}
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
              <Link
                href="/dashboard/notifications"
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                  pathname === "/dashboard/notifications" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
                )}
              >
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </Link>
              <button
                onClick={onSignOut}
                className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent/50"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="border-b h-16 flex items-center px-4 md:hidden">
          <button className="mr-2">
            <LayoutDashboard className="h-6 w-6" />
          </button>
          <div className="flex-1">
            <Logo icon={Home} size="sm" />
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          {/* Page header is rendered inside children */}
          {children}

          {/* Content wrapper with consistent padding */}
          <div className="content-wrapper">{/* Children content is rendered here */}</div>
        </main>
      </div>
    </div>
  )
}
