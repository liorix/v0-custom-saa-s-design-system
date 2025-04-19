import type { Meta, StoryObj } from "@storybook/react"
import { PageHeader } from "./page-header"
import { Button } from "../ui/button"
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

export const Default = {
  render: () => <PageHeader title="Page Title" description="This is a description of the page and its contents." />,
}

export const WithSingleAction = {
  render: () => (
    <PageHeader
      title="Team Members"
      description="Manage your team members and their account permissions."
      children={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      }
    />
  ),
}

export const WithMultipleActions = {
  render: () => (
    <PageHeader
      title="Analytics"
      description="View detailed analytics about your application."
      children={
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
      }
    />
  ),
}

export const TitleOnly = {
  render: () => <PageHeader title="Settings" />,
}
