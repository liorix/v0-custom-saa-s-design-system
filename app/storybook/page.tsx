"use client"

import Link from "next/link"

// Separate the CategorySection component to make it clearer
function CategorySection({
  title,
  description,
  items,
}: {
  title: string
  description: string
  items: { name: string; path: string }[]
}) {
  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-4">{description}</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.path}>
            <Link href={item.path} className="text-blue-600 hover:underline">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Make sure this is exported as default
export default function StorybookPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Design System Components</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CategorySection
          title="UI Components"
          description="Basic UI components from shadcn/ui"
          items={[
            { name: "Accordion", path: "/storybook/ui/accordion" },
            { name: "Alert", path: "/storybook/ui/alert" },
            { name: "Alert Dialog", path: "/storybook/ui/alert-dialog" },
            { name: "Avatar", path: "/storybook/ui/avatar" },
            { name: "Badge", path: "/storybook/ui/badge" },
            { name: "Button", path: "/storybook/ui/button" },
            { name: "Calendar", path: "/storybook/ui/calendar" },
            { name: "Card", path: "/storybook/ui/card" },
            { name: "Checkbox", path: "/storybook/ui/checkbox" },
            { name: "Command", path: "/storybook/ui/command" },
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
            { name: "Collapsible", path: "/storybook/ui/collapsible" },
            { name: "Context Menu", path: "/storybook/ui/context-menu" },
          ]}
        />

        <CategorySection
          title="Atoms"
          description="Fundamental building blocks"
          items={[
            { name: "Logo", path: "/storybook/atoms/logo" },
            { name: "Empty State", path: "/storybook/atoms/empty-state" },
            { name: "Avatar Group", path: "/storybook/atoms/avatar-group" },
            { name: "Page Header", path: "/storybook/atoms/page-header" },
          ]}
        />

        <CategorySection
          title="Molecules"
          description="Combinations of atoms"
          items={[
            { name: "Stat Card", path: "/storybook/molecules/stat-card" },
            { name: "Notification Item", path: "/storybook/molecules/notification-item" },
            { name: "Feature Card", path: "/storybook/molecules/feature-card" },
            { name: "Form Field", path: "/storybook/molecules/form-field" },
          ]}
        />

        <CategorySection
          title="Organisms"
          description="Complex UI components"
          items={[
            { name: "Organization Switcher", path: "/storybook/organisms/organization-switcher" },
            { name: "Data Table", path: "/storybook/organisms/data-table" },
            { name: "Billing Plan Card", path: "/storybook/organisms/billing-plan-card" },
            { name: "Team Members List", path: "/storybook/organisms/team-members-list" },
            { name: "Auth Form", path: "/storybook/organisms/auth-form" },
          ]}
        />

        <CategorySection
          title="Templates"
          description="Page layouts"
          items={[
            { name: "Auth Layout", path: "/storybook/templates/auth-layout" },
            { name: "Dashboard Layout", path: "/storybook/templates/dashboard-layout" },
          ]}
        />
      </div>
    </div>
  )
}
