"use client"

import { PageHeader } from "@/components/atoms/page-header"
import { NotificationItem } from "@/components/molecules/notification-item"
import { DashboardLayout } from "@/components/templates/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Check } from "lucide-react"
import { useState } from "react"

interface Notification {
  id: string
  title: string
  description?: string
  time: Date
  read: boolean
  user?: {
    name: string
    avatarUrl?: string
  }
}

export default function NotificationsPage() {
  const [currentOrganizationId, setCurrentOrganizationId] = useState("1")
  const [activeTab, setActiveTab] = useState("all")

  const organizations = [
    { id: "1", name: "Acme Inc" },
    { id: "2", name: "Globex Corporation" },
    { id: "3", name: "Initech" },
  ]

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New team member joined",
      description: "Jane Smith has joined your team",
      time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      user: {
        name: "Jane Smith",
        avatarUrl: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "2",
      title: "Your subscription has been renewed",
      description: "Your Pro plan has been renewed for another month",
      time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
    },
    {
      id: "3",
      title: "System maintenance scheduled",
      description: "Our system will be undergoing maintenance on Saturday at 2 AM UTC",
      time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
    },
    {
      id: "4",
      title: "New feature available",
      description: "Check out our new analytics dashboard",
      time: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      read: true,
    },
    {
      id: "5",
      title: "Security alert",
      description: "We detected a login from a new device",
      time: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
      read: true,
    },
  ])

  const handleDismiss = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    if (activeTab === "read") return notification.read
    return true
  })

  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <DashboardLayout
      organizations={organizations}
      currentOrganizationId={currentOrganizationId}
      onOrganizationChange={setCurrentOrganizationId}
      onCreateOrganization={() => console.log("Create organization")}
      onSignOut={() => console.log("Sign out")}
    >
      <PageHeader title="Notifications" description="Manage your notifications">
        {unreadCount > 0 && (
          <Button variant="outline" onClick={handleMarkAllAsRead}>
            <Check className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        )}
      </PageHeader>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            {unreadCount > 0 && (
              <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                {unreadCount}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="read">Read</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredNotifications.length > 0 ? (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  id={notification.id}
                  title={notification.title}
                  description={notification.description}
                  time={notification.time}
                  read={notification.read}
                  user={notification.user}
                  onDismiss={handleDismiss}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <Bell className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No notifications</h3>
              <p className="mt-2 text-sm text-muted-foreground">You're all caught up!</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          {filteredNotifications.length > 0 ? (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  id={notification.id}
                  title={notification.title}
                  description={notification.description}
                  time={notification.time}
                  read={notification.read}
                  user={notification.user}
                  onDismiss={handleDismiss}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <Bell className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No unread notifications</h3>
              <p className="mt-2 text-sm text-muted-foreground">You're all caught up!</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="read" className="space-y-4">
          {filteredNotifications.length > 0 ? (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  id={notification.id}
                  title={notification.title}
                  description={notification.description}
                  time={notification.time}
                  read={notification.read}
                  user={notification.user}
                  onDismiss={handleDismiss}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <Bell className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No read notifications</h3>
              <p className="mt-2 text-sm text-muted-foreground">You haven't read any notifications yet</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
