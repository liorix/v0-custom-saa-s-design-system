"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
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

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex min-h-screen">
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center gap-2 px-4 py-2">
                <Link href="/storybook" className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <Home className="h-4 w-4" />
                  </div>
                  <span className="font-bold">Design System</span>
                </Link>
              </div>
              <div className="px-2 py-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to App
                  </Link>
                </Button>
              </div>
            </SidebarHeader>
            <SidebarContent>
              {Object.entries(categories).map(([key, category]) => (
                <SidebarGroup key={key}>
                  <SidebarGroupLabel>{category.label}</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {category.items.map((item) => (
                        <SidebarMenuItem key={item.path}>
                          <SidebarMenuButton
                            asChild
                            isActive={pathname === item.path || pathname.startsWith(`${item.path}/`)}
                          >
                            <Link href={item.path}>{item.name}</Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>
          </Sidebar>
          <div className="flex-1 overflow-auto">
            <div className="p-4 md:hidden">
              <SidebarTrigger />
            </div>
            {children}
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}
