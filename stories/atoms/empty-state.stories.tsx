import type { Meta, StoryObj } from "@storybook/react"
import { EmptyState } from "@/components/atoms/empty-state"
import { Button } from "@/components/ui/button"
import { FileQuestion, Inbox, Search, AlertCircle } from "lucide-react"

const meta: Meta<typeof EmptyState> = {
  title: "Atoms/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof EmptyState>

export const Default: Story = {
  args: {
    icon: FileQuestion,
    title: "No results found",
    description: "Try adjusting your search or filters to find what you're looking for.",
  },
}

export const WithAction: Story = {
  args: {
    icon: Inbox,
    title: "Your inbox is empty",
    description: "You have no new messages at this time.",
    children: <Button>Check again</Button>,
  },
}

export const SearchResults: Story = {
  args: {
    icon: Search,
    title: "No search results",
    description: "We couldn't find any results for your search term.",
    className: "max-w-md",
  },
}

export const Error: Story = {
  args: {
    icon: AlertCircle,
    title: "Something went wrong",
    description: "We encountered an error while loading your data.",
    children: <Button variant="destructive">Try again</Button>,
    className: "border-destructive/20",
  },
}
