import type { Meta, StoryObj } from "@storybook/react"
import { DashboardLayout } from "@/components/templates/dashboard-layout"
import { PageHeader } from "@/components/atoms/page-header"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const meta: Meta<typeof DashboardLayout> = {
  title: "Templates/DashboardLayout",
  component: DashboardLayout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof DashboardLayout>

const organizations = [
  { id: "1", name: "Acme Inc" },
  { id: "2", name: "Globex Corporation" },
  { id: "3", name: "Initech" },
]

export const Default = {
  render: () => (
    <DashboardLayout
      organizations={organizations}
      currentOrganizationId="1"
      onOrganizationChange={(organizationId) => console.log(`Selected organization: ${organizationId}`)}
      onCreateOrganization={() => console.log("Create organization clicked")}
      onSignOut={() => console.log("Sign out clicked")}
      children={
        <div className="container space-y-8 py-8">
          <PageHeader title="Dashboard" description="Welcome to your dashboard">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </PageHeader>
          <div className="rounded-lg border p-8">
            <p>Dashboard content goes here</p>
          </div>
        </div>
      }
    />
  ),
}
