import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { BetterAuthProvider } from "@/components/better-auth-provider"
import { StorybookNav } from "@/components/storybook-nav"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <BetterAuthProvider>
          <ThemeProvider>
            {children}
            <StorybookNav />
            <Toaster />
          </ThemeProvider>
        </BetterAuthProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
