"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

// Define the user type
type User = {
  id: string
  name: string | null
  email: string
  image: string | null
}

// Define the auth context type
type AuthContextType = {
  user: User | null
  isLoading: boolean
}

// Create the auth context
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
})

// Create a hook to use the auth context
export const useAuth = () => useContext(AuthContext)

// Create the auth provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch the user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/session", {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        })

        if (response.ok) {
          const data = await response.json()
          setUser(data.user || null) // Ensure null if no user
        } else {
          // If response is not OK, clear user
          setUser(null)
        }
      } catch (error) {
        console.error("Error fetching user:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  return <AuthContext.Provider value={{ user, isLoading }}>{children}</AuthContext.Provider>
}
