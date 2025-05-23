import type { Meta, StoryObj } from "@storybook/react"
import { OrganizationSwitcher } from "./organization-switcher"

const meta: Meta<typeof OrganizationSwitcher> = {
  title: "Organisms/OrganizationSwitcher",
  component: OrganizationSwitcher,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof OrganizationSwitcher>

const organizations = [
  { id: "1", name: "Acme Inc" },
  { id: "2", name: "Globex Corporation" },
  { id: "3", name: "Initech" },
  { id: "4", name: "Umbrella Corp" },
]

export const Default = {
  render: () => (
    <OrganizationSwitcher
      organizations={organizations}
      currentOrganizationId="1"
      onOrganizationChange={(organizationId) => console.log(`Selected organization: ${organizationId}`)}
      onCreateOrganization={() => console.log("Create organization clicked")}
      className="w-[250px]"
    />
  ),
}

export const NoCurrentOrganization = {
  render: () => (
    <OrganizationSwitcher
      organizations={organizations}
      currentOrganizationId=""
      onOrganizationChange={(organizationId) => console.log(`Selected organization: ${organizationId}`)}
      onCreateOrganization={() => console.log("Create organization clicked")}
      className="w-[250px]"
    />
  ),
}

export const SingleOrganization = {
  render: () => (
    <OrganizationSwitcher
      organizations={[organizations[0]]}
      currentOrganizationId="1"
      onOrganizationChange={(organizationId) => console.log(`Selected organization: ${organizationId}`)}
      onCreateOrganization={() => console.log("Create organization clicked")}
      className="w-[250px]"
    />
  ),
}
