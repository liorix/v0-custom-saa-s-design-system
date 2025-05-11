import { DashboardShell } from "@/components/templates/dashboard-shell"
import { PageHeader } from "@/components/atoms/page-header"
import { StatCard } from "@/components/molecules/stat-card"
import { BarChart3, Users, CreditCard, Activity } from "lucide-react"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-8 p-8">
        <PageHeader title="Dashboard" description="Overview of your account" />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Users" value="10,482" description="+12.3% from last month" icon={Users} />
          <StatCard title="Active Now" value="2,845" description="+5.1% from last hour" icon={Activity} />
          <StatCard title="Total Revenue" value="$45,231.89" description="+2.5% from last month" icon={CreditCard} />
          <StatCard title="Active Projects" value="12" description="+3 from last week" icon={BarChart3} />
        </div>
      </div>
    </DashboardShell>
  )
}
