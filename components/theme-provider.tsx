"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"
type ThemeColor = "zinc" | "slate" | "rose" | "blue" | "green" | "orange"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  defaultColor?: ThemeColor
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  color: ThemeColor
  setTheme: (theme: Theme) => void
  setColor: (color: ThemeColor) => void
}

const initialState: ThemeProviderState = {
  theme: "light",
  color: "zinc",
  setTheme: () => null,
  setColor: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "light",
  defaultColor = "zinc",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [color, setColor] = useState<ThemeColor>(defaultColor)

  useEffect(() => {
    const savedTheme = localStorage.getItem(`${storageKey}-mode`) as Theme
    const savedColor = localStorage.getItem(`${storageKey}-color`) as ThemeColor

    if (savedTheme) {
      setTheme(savedTheme)
    }

    if (savedColor) {
      setColor(savedColor)
    }
  }, [storageKey])

  useEffect(() => {
    const root = window.document.documentElement

    // Remove previous theme and color classes
    root.classList.remove("light", "dark")
    root.classList.remove("theme-zinc", "theme-slate", "theme-rose", "theme-blue", "theme-green", "theme-orange")

    // Add current theme and color classes
    root.classList.add(theme)
    root.classList.add(`theme-${color}`)

    // Save to localStorage
    localStorage.setItem(`${storageKey}-mode`, theme)
    localStorage.setItem(`${storageKey}-color`, color)
  }, [theme, color, storageKey])

  const value = {
    theme,
    color,
    setTheme: (theme: Theme) => {
      setTheme(theme)
    },
    setColor: (color: ThemeColor) => {
      setColor(color)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
