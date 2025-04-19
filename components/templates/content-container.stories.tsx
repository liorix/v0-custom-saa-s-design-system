import type { Meta, StoryObj } from "@storybook/react"
import { ContentContainer } from "./content-container"

const meta: Meta<typeof ContentContainer> = {
  title: "Templates/ContentContainer",
  component: ContentContainer,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof ContentContainer>

export const Default: Story = {
  render: () => (
    <ContentContainer>
      <div className="p-6 border rounded-lg">
        <h2 className="text-xl font-bold mb-4">Content Container</h2>
        <p>This is a flexible container for page content.</p>
      </div>
    </ContentContainer>
  ),
}

export const WithNestedContent: Story = {
  render: () => (
    <ContentContainer>
      <div className="grid gap-4">
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-bold mb-4">Section One</h2>
          <p>This is the first section of content.</p>
        </div>
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-bold mb-4">Section Two</h2>
          <p>This is the second section of content.</p>
        </div>
      </div>
    </ContentContainer>
  ),
}

export const WithCustomClassName: Story = {
  render: () => (
    <ContentContainer className="bg-muted p-4 rounded-lg">
      <div className="p-6 border rounded-lg bg-background">
        <h2 className="text-xl font-bold mb-4">Custom Container</h2>
        <p>This container has custom styling applied.</p>
      </div>
    </ContentContainer>
  ),
}
