import type React from "react"
import { StorybookNav } from "@/components/storybook-nav"
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <StorybookNav />
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
