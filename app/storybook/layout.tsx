"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, ArrowLeft, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import "../globals.css"
import "./storybook.css"

// Component categories and their items
const categories = {
  ui: {
    label: "UI Components",
    items: [
      { name: "Accordion", path: "/storybook/ui/accordion" },
      { name: "Alert", path: "/storybook/ui/alert" },
      { name: "Alert Dialog", path: "/storybook/ui/alert-dialog" },
      { name: "Avatar", path: "/storybook/ui/avatar" },
      { name: "Badge", path: "/storybook/ui/badge" },
      { name: "Button", path: "/storybook/ui/button" },
      { name: "Calendar", path: "/storybook/ui/calendar" },
      { name: "Card", path: "/storybook/ui/card" },
      { name: "Checkbox", path: "/storybook/ui/checkbox" },
      { name: "Collapsible", path: "/storybook/ui/collapsible" },
      { name: "Command", path: "/storybook/ui/command" },
      { name: "Context Menu", path: "/storybook/ui/context-menu" },
      { name: "Dialog", path: "/storybook/ui/dialog" },
      { name: "Dropdown Menu", path: "/storybook/ui/dropdown-menu" },
      { name: "Hover Card", path: "/storybook/ui/hover-card" },
      { name: "Input", path: "/storybook/ui/input" },
      { name: "Label", path: "/storybook/ui/label" },
      { name: "Popover", path: "/storybook/ui/popover" },
      { name: "Select", path: "/storybook/ui/select" },
      { name: "Separator", path: "/storybook/ui/separator" },
      { name: "Sheet", path: "/storybook/ui/sheet" },
      { name: "Skeleton", path: "/storybook/ui/skeleton" },
      { name: "Slider", path: "/storybook/ui/slider" },
      { name: "Switch", path: "/storybook/ui/switch" },
      { name: "Tabs", path: "/storybook/ui/tabs" },
      { name: "Textarea", path: "/storybook/ui/textarea" },
      { name: "Toast", path: "/storybook/ui/toast" },
    ],
  },
  atoms: {
    label: "Atoms",
    items: [
      { name: "Logo", path: "/storybook/atoms/logo" },
      { name: "Empty State", path: "/storybook/atoms/empty-state" },
      { name: "Avatar Group", path: "/storybook/atoms/avatar-group" },
      { name: "Page Header", path: "/storybook/atoms/page-header" },
    ],
  },
  molecules: {
    label: "Molecules",
    items: [
      { name: "Stat Card", path: "/storybook/molecules/stat-card" },
      { name: "Notification Item", path: "/storybook/molecules/notification-item" },
      { name: "Feature Card", path: "/storybook/molecules/feature-card" },
      { name: "Form Field", path: "/storybook/molecules/form-field" },
    ],
  },
  organisms: {
    label: "Organisms",
    items: [
      { name: "Organization Switcher", path: "/storybook/organisms/organization-switcher" },
      { name: "Data Table", path: "/storybook/organisms/data-table" },
      { name: "Billing Plan Card", path: "/storybook/organisms/billing-plan-card" },
      { name: "Team Members List", path: "/storybook/organisms/team-members-list" },
      { name: "Auth Form", path: "/storybook/organisms/auth-form" },
    ],
  },
  templates: {
    label: "Templates",
    items: [
      { name: "Auth Layout", path: "/storybook/templates/auth-layout" },
      { name: "Dashboard Layout", path: "/storybook/templates/dashboard-layout" },
    ],
  },
}

export default function StorybookLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Sidebar content component to reuse in both desktop and mobile
  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-4 py-4 border-b">
        <Link href="/storybook" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Home className="h-4 w-4" />
          </div>
          <span className="font-bold">Design System</span>
        </Link>
      </div>
      <div className="px-4 py-2">
        <Button variant="outline" size="sm" className="w-full" asChild onClick={() => setIsMobileMenuOpen(false)}>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to App
          </Link>
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-4">
        {Object.entries(categories).map(([key, category]) => (
          <div key={key} className="mb-6">
            <h2 className="px-4 mb-2 text-xs font-semibold text-muted-foreground">{category.label}</h2>
            <div className="space-y-1">
              {category.items.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "flex items-center px-4 py-2 text-sm font-medium rounded-md",
                    pathname === item.path || pathname.startsWith(`${item.path}/`)
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent/50",
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 border-r shrink-0 overflow-auto">
          <SidebarContent />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {/* Mobile Header */}
          <div className="p-4 border-b md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SidebarContent />
              </SheetContent>
            </Sheet>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}

// Helper function for class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
