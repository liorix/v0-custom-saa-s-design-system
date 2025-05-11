"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"

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
  logout: () => Promise<void>
}

// Create the auth context
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  logout: async () => {},
})

// Create a hook to use the auth context
export const useAuth = () => useContext(AuthContext)

// Create the auth provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Fetch the user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/session")

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

  // Logout function
  const logout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Logout failed")
      }

      // Clear user state
      setUser(null)

      // Force a hard navigation to clear any client-side state
      window.location.href = "/login"

      // Return a resolved promise
      return Promise.resolve()
    } catch (error) {
      console.error("Error logging out:", error)
      return Promise.reject(error)
    }
  }

  return <AuthContext.Provider value={{ user, isLoading, logout }}>{children}</AuthContext.Provider>
}
