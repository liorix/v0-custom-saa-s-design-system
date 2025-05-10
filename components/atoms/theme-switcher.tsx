"use client"

import { Moon, Sun, Palette } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"

type ThemeOption = {
  value: string
  label: string
}

const themes: ThemeOption[] = [
  { value: "zinc", label: "Zinc (Default)" },
  { value: "slate", label: "Slate" },
  { value: "rose", label: "Rose" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "orange", label: "Orange" },
]

export function ThemeSwitcher() {
  const { theme, setTheme, color, setColor } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          {theme === "light" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="hidden md:inline">Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">Mode</DropdownMenuLabel>
        <div className="grid grid-cols-2 gap-2 p-2">
          <Button
            variant={theme === "light" ? "default" : "outline"}
            size="sm"
            onClick={() => setTheme("light")}
            className="justify-start"
          >
            <Sun className="mr-2 h-4 w-4" />
            Light
          </Button>
          <Button
            variant={theme === "dark" ? "default" : "outline"}
            size="sm"
            onClick={() => setTheme("dark")}
            className="justify-start"
          >
            <Moon className="mr-2 h-4 w-4" />
            Dark
          </Button>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">Color Theme</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={color} onValueChange={(value) => setColor(value as any)}>
          {themes.map((themeOption) => (
            <DropdownMenuRadioItem key={themeOption.value} value={themeOption.value}>
              <div className="flex items-center gap-2">
                <div className={`h-4 w-4 rounded-full bg-primary`} />
                {themeOption.label}
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
