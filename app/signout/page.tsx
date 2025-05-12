import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default function SignOutPage() {
  // Clear the session cookie
  cookies().delete({
    name: "session-token",
    path: "/",
  })

  // Redirect to login page
  redirect("/login?signedOut=true")
}
