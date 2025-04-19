import type { Meta, StoryObj } from "@storybook/react"
import { ContentWrapper } from "./content-wrapper"

const meta: Meta<typeof ContentWrapper> = {
  title: "Templates/ContentWrapper",
  component: ContentWrapper,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof ContentWrapper>

export const Default: Story = {
  render: () => (
    <ContentWrapper>
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Content Wrapper</h2>
        <p>This wrapper provides consistent padding and container width for page content.</p>
      </div>
    </ContentWrapper>
  ),
}

export const WithMultipleSections: Story = {
  render: () => (
    <ContentWrapper>
      <div className="space-y-6">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Section One</h2>
          <p>This is the first section of content.</p>
        </div>
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Section Two</h2>
          <p>This is the second section of content.</p>
        </div>
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Section Three</h2>
          <p>This is the third section of content.</p>
        </div>
      </div>
    </ContentWrapper>
  ),
}

export const WithCustomClassName: Story = {
  render: () => (
    <ContentWrapper className="bg-muted py-8">
      <div className="border rounded-lg p-6 bg-background">
        <h2 className="text-xl font-bold mb-4">Custom Wrapper</h2>
        <p>This wrapper has custom styling applied.</p>
      </div>
    </ContentWrapper>
  ),
}
