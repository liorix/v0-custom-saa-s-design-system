import type { Meta, StoryObj } from "@storybook/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="p-4 border rounded-md mt-2">
        <p>Make changes to your account here.</p>
      </TabsContent>
      <TabsContent value="password" className="p-4 border rounded-md mt-2">
        <p>Change your password here.</p>
      </TabsContent>
    </Tabs>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="music" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="music">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 mr-2"
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
          Music
        </TabsTrigger>
        <TabsTrigger value="photos">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 mr-2"
          >
            <path d="M15 8h.01" />
            <rect width="16" height="16" x="4" y="4" rx="3" />
            <path d="m4 15 4-4a3 5 0 0 1 3 0l5 5" />
            <path d="m14 14 1-1a3 5 0 0 1 3 0l2 2" />
          </svg>
          Photos
        </TabsTrigger>
        <TabsTrigger value="videos">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 mr-2"
          >
            <path d="m22 8-6 4 6 4V8Z" />
            <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
          </svg>
          Videos
        </TabsTrigger>
      </TabsList>
      <TabsContent value="music" className="p-4 border rounded-md mt-2">
        <p>Your music collection.</p>
      </TabsContent>
      <TabsContent value="photos" className="p-4 border rounded-md mt-2">
        <p>Your photo collection.</p>
      </TabsContent>
      <TabsContent value="videos" className="p-4 border rounded-md mt-2">
        <p>Your video collection.</p>
      </TabsContent>
    </Tabs>
  ),
}
