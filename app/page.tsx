import { redirect } from "next/navigation"

export default function HomePage() {
  // Redirect from root to dashboard
  redirect("/dashboard")
}
