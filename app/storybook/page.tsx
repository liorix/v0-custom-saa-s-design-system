"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/card"
import Link from "next/link"

export default function StorybookPage() {
  const [activeTab, setActiveTab] = useState<string>("components")

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">SaaS Design System</h1>

      <Tabs defaultValue="components" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="components">UI Components</TabsTrigger>
          <TabsTrigger value="atoms">Atoms</TabsTrigger>
          <TabsTrigger value="molecules">Molecules</TabsTrigger>
          <TabsTrigger value="organisms">Organisms</TabsTrigger>
        </TabsList>

        <TabsContent value="components" className="space-y-6">
          <ComponentsGrid type="ui" />
        </TabsContent>

        <TabsContent value="atoms" className="space-y-6">
          <ComponentsGrid type="atoms" />
        </TabsContent>

        <TabsContent value="molecules" className="space-y-6">
          <ComponentsGrid type="molecules" />
        </TabsContent>

        <TabsContent value="organisms" className="space-y-6">
          <ComponentsGrid type="organisms" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ComponentsGrid({ type }: { type: string }) {
  // Map of component types to their components
  const componentMap: Record<string, { name: string; description: string; path: string }[]> = {
    ui: [
      { name: "Accordion", description: "A vertically stacked set of interactive headings", path: "accordion" },
      { name: "Alert", description: "Displays a callout for user attention", path: "alert" },
      { name: "Alert Dialog", description: "A modal dialog that interrupts the user", path: "alert-dialog" },
      { name: "Avatar", description: "An image element with a fallback", path: "avatar" },
      { name: "Badge", description: "Small status descriptor for UI elements", path: "badge" },
      { name: "Button", description: "Triggers an action or event", path: "button" },
      { name: "Calendar", description: "A date field component with a popover calendar", path: "calendar" },
      { name: "Card", description: "Container for content with header, body, and footer", path: "card" },
      { name: "Checkbox", description: "A control that allows selection of multiple options", path: "checkbox" },
      {
        name: "Collapsible",
        description: "An interactive component that expands/collapses content",
        path: "collapsible",
      },
      { name: "Command", description: "Command menu for keyboard-first interactions", path: "command" },
      { name: "Context Menu", description: "Displays a menu on right-click", path: "context-menu" },
      { name: "Dialog", description: "A window overlaid on the primary window", path: "dialog" },
      { name: "Dropdown Menu", description: "Displays a menu when triggered", path: "dropdown-menu" },
      { name: "Hover Card", description: "Card that appears when hovering over an element", path: "hover-card" },
      { name: "Input", description: "Form control for text input", path: "input" },
      { name: "Label", description: "Accessible label for form controls", path: "label" },
      { name: "Popover", description: "Displays floating content when triggered", path: "popover" },
      { name: "Select", description: "Displays a list of options for selection", path: "select" },
      { name: "Separator", description: "Visual divider between content", path: "separator" },
      { name: "Sheet", description: "Side-anchored dialog component", path: "sheet" },
      { name: "Skeleton", description: "Placeholder for loading content", path: "skeleton" },
      { name: "Slider", description: "Select a value from a range", path: "slider" },
      { name: "Switch", description: "Toggle between checked and unchecked states", path: "switch" },
      { name: "Tabs", description: "Switch between different content views", path: "tabs" },
      { name: "Textarea", description: "Multi-line text input control", path: "textarea" },
      { name: "Toast", description: "Brief message that appears temporarily", path: "toast" },
    ],
    atoms: [
      { name: "Logo", description: "Brand logo with customizable size and text", path: "logo" },
      { name: "EmptyState", description: "Empty state placeholder with icon and message", path: "empty-state" },
      { name: "AvatarGroup", description: "Group of avatars with overflow indicator", path: "avatar-group" },
      { name: "PageHeader", description: "Page header with title, description, and actions", path: "page-header" },
    ],
    molecules: [
      { name: "StatCard", description: "Card displaying a statistic with optional trend", path: "stat-card" },
      {
        name: "NotificationItem",
        description: "Notification item with title, description, and actions",
        path: "notification-item",
      },
      {
        name: "FeatureCard",
        description: "Card highlighting a feature with icon and description",
        path: "feature-card",
      },
      { name: "FormField", description: "Form field with label, input, and validation", path: "form-field" },
    ],
    organisms: [
      {
        name: "OrganizationSwitcher",
        description: "Dropdown for switching between organizations",
        path: "organization-switcher",
      },
      {
        name: "BillingPlanCard",
        description: "Card displaying a billing plan with features",
        path: "billing-plan-card",
      },
      { name: "AuthForm", description: "Authentication form for login or signup", path: "auth-form" },
      { name: "DataTable", description: "Interactive table for displaying and managing data", path: "data-table" },
      { name: "TeamMembersList", description: "List of team members with actions", path: "team-members-list" },
    ],
  }

  const components = componentMap[type] || []

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">
        {type === "ui" ? "UI Components" : `${type.charAt(0).toUpperCase() + type.slice(1)}`}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {components.map((component) => (
          <ComponentCard
            key={component.name}
            name={component.name}
            description={component.description}
            type={type}
            path={component.path}
          />
        ))}
      </div>
    </>
  )
}

function ComponentCard({
  name,
  description,
  type,
  path,
}: { name: string; description: string; type: string; path: string }) {
  return (
    <Link href={`/storybook/${type}/${path}`}>
      <Card className="h-full transition-all hover:shadow-md">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-blue-600">View component →</div>
        </CardContent>
      </Card>
    </Link>
  )
}
