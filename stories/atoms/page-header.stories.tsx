import type { Meta, StoryObj } from "@storybook/react"
import { PageHeader } from "@/components/atoms/page-header"
import { Button } from "@/components/ui/button"
import { Plus, Download } from "lucide-react"

const meta: Meta<typeof PageHeader> = {
  title: "Atoms/PageHeader",
  component: PageHeader,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof PageHeader>

export const Default: Story = {
  args: {
    title: "Page Title",
    description: "This is a description of the page and its contents.",
  },
}

export const WithSingleAction: Story = {
  args: {
    title: "Team Members",
    description: "Manage your team members and their account permissions.",
    children: (
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Add Member
      </Button>
    ),
  },
}

export const WithMultipleActions: Story = {
  args: {
    title: "Analytics",
    description: "View detailed analytics about your application.",
    children: (
      <>
        <Button variant="outline" className="mr-2">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Report
        </Button>
      </>
    ),
  },
}

export const TitleOnly: Story = {
  args: {
    title: "Settings",
  },
}
