import { PageHeader } from "@/components/atoms/page-header"
import { ThemeSettings } from "@/components/organisms/theme-settings"
import { ContentContainer } from "@/components/templates/content-container"
import { ContentWrapper } from "@/components/templates/content-wrapper"

export default function AppearanceSettingsPage() {
  return (
    <ContentWrapper>
      <ContentContainer>
        <PageHeader title="Appearance" description="Manage your theme preferences and visual settings." />
        <div className="grid gap-6">
          <ThemeSettings />
        </div>
      </ContentContainer>
    </ContentWrapper>
  )
}
