"use client"

import { Logo } from "@/components/atoms/logo"
import { OrganizationSwitcher } from "@/components/organisms/organization-switcher"
import { SidebarThemeSwitcher } from "@/components/atoms/sidebar-theme-switcher"
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
  Menu,
  Settings,
  Users,
  User,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { type ReactNode, useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from "@/hooks/use-toast"
import { LogoutForm } from "@/components/atoms/logout-form"

interface DashboardLayoutProps {
  children: ReactNode
  organizations: { id: string; name: string }[]
  currentOrganizationId: string
  onOrganizationChange: (organizationId: string) => void
  onCreateOrganization: () => void
  className?: string
}

export function DashboardLayout({
  children,
  organizations,
  currentOrganizationId,
  onOrganizationChange,
  onCreateOrganization,
  className,
}: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

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

  const handleLogout = async () => {
    if (isLoggingOut) return

    try {
      setIsLoggingOut(true)
      console.log("Logout initiated")

      toast({
        title: "Signing out...",
        description: "Please wait while we sign you out.",
      })

      // Make a request to the logout API endpoint
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to logout")
      }

      console.log("API logout successful")

      // Clear cookies on the client side as well for redundancy
      document.cookie = "session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=lax"
      document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=lax"

      console.log("Cookies cleared")

      // Force a hard navigation to the login page
      console.log("Redirecting to login page")
      window.location.href = "/login?signedOut=true"
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        title: "Error signing out",
        description: "There was an issue signing you out. Please try again.",
        variant: "destructive",
      })
      setIsLoggingOut(false)
    }
  }

  // Sidebar content component to reuse in both desktop and mobile
  const SidebarContent = () => (
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
                onClick={() => setIsMobileMenuOpen(false)}
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
                onClick={() => setIsMobileMenuOpen(false)}
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
                onClick={() => setIsMobileMenuOpen(false)}
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
            href="/dashboard/profile"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
              pathname === "/dashboard/profile" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <User className="h-4 w-4" />
            <span>Profile</span>
          </Link>
          <Link
            href="/dashboard/settings"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
              pathname === "/dashboard/settings" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
            )}
            onClick={() => setIsMobileMenuOpen(false)}
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
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </Link>

          {/* Add the SidebarThemeSwitcher here */}
          <SidebarThemeSwitcher />

          {/* Multiple logout options for redundancy */}
          <div className="space-y-1">
            {/* Primary logout button */}
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleLogout}
              disabled={isLoggingOut}
              data-testid="logout-button"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>{isLoggingOut ? "Signing out..." : "Sign out"}</span>
            </Button>

            {/* Fallback form-based logout (hidden but functional) */}
            <div className="hidden">
              <LogoutForm className="w-full justify-start" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 border-r shrink-0">
        <SidebarContent />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header with Sheet for mobile sidebar */}
        <header className="border-b h-16 flex items-center px-4 md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SidebarContent />
            </SheetContent>
          </Sheet>
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
