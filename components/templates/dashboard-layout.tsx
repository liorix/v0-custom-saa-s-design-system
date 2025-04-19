"use client"

import { Logo } from "@/components/atoms/logo"
import { OrganizationSwitcher } from "@/components/organisms/organization-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
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
  Mail,
  MessageSquare,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"

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

  const communicationNavItems = [
    {
      title: "Messages",
      href: "/dashboard/messages",
      icon: MessageSquare,
      badge: 5,
    },
    {
      title: "Email",
      href: "/dashboard/email",
      icon: Mail,
    },
  ]

  const productNavItems = [
    {
      title: "Products",
      href: "/dashboard/products",
      icon: ShoppingCart,
      subItems: [
        {
          title: "All Products",
          href: "/dashboard/products",
        },
        {
          title: "Add Product",
          href: "/dashboard/products/new",
        },
        {
          title: "Categories",
          href: "/dashboard/products/categories",
        },
      ],
    },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <Link href="/dashboard">
                <Logo icon={Home} size="sm" />
              </Link>
            </div>
            <div className="px-2 py-2">
              <OrganizationSwitcher
                organizations={organizations}
                currentOrganizationId={currentOrganizationId}
                onOrganizationChange={onOrganizationChange}
                onCreateOrganization={onCreateOrganization}
                className="w-full"
              />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Overview</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {mainNavItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                        <Link href={item.href}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator />

            <SidebarGroup>
              <SidebarGroupLabel>Team</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {teamNavItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                        <Link href={item.href}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator />

            <SidebarGroup>
              <SidebarGroupLabel>Billing</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {billingNavItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                        <Link href={item.href}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator />

            <SidebarGroup>
              <SidebarGroupLabel>Communication</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {communicationNavItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                        <Link href={item.href}>
                          <item.icon />
                          <span>{item.title}</span>
                          {item.badge && (
                            <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator />

            <SidebarGroup>
              <SidebarGroupLabel>Products</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {productNavItems.map((item) => (
                    <Collapsible key={item.href} className="w-full">
                      <SidebarMenuItem>
                        <CollapsibleTrigger className="w-full" asChild>
                          <SidebarMenuButton tooltip={item.title}>
                            <item.icon />
                            <span>{item.title}</span>
                            <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        {item.subItems && (
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.subItems.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.href}>
                                  <SidebarMenuSubButton asChild isActive={pathname === subItem.href}>
                                    <Link href={subItem.href}>{subItem.title}</Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        )}
                      </SidebarMenuItem>
                    </Collapsible>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/settings"} tooltip="Settings">
                  <Link href="/dashboard/settings">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Notifications">
                  <Link href="/dashboard/notifications">
                    <Bell />
                    <span>Notifications</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={onSignOut} tooltip="Sign out">
                  <LogOut />
                  <span>Sign out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1" />
          </header>
          <main className={cn("flex-1 overflow-auto", className)}>{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
