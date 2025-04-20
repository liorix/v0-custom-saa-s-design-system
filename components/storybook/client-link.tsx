"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import type { ReactNode } from "react"

interface ClientLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function ClientLink({ href, children, className, onClick }: ClientLinkProps) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()

    if (onClick) {
      onClick()
    }

    // Use router.push for client-side navigation
    router.push(href, { scroll: false })
  }

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  )
}
