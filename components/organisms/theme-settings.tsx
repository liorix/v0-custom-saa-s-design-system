"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeSwitcher } from "@/components/atoms/theme-switcher"

export function ThemeSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme</CardTitle>
        <CardDescription>
          Customize the appearance of the application. Choose between light and dark mode and select your preferred
          color theme.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Appearance</h3>
              <p className="text-sm text-muted-foreground">Change the theme and color scheme</p>
            </div>
            <ThemeSwitcher />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
