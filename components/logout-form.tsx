"use client"

import type React from "react"

import { useTransition } from "react"
import { logout } from "@/app/actions/auth"
import { toast } from "@/hooks/use-toast"

export function LogoutForm({ children }: { children: React.ReactNode }) {
  const [isPending, startTransition] = useTransition()

  const handleLogout = () => {
    toast({
      title: "Signing out...",
      description: "You will be redirected to the login page.",
    })

    startTransition(() => {
      logout()
    })
  }

  return (
    <button onClick={handleLogout} disabled={isPending} className="w-full text-left">
      {children}
    </button>
  )
}
