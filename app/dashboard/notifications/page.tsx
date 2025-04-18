"use client"

import { PageHeader } from "@/components/atoms/page-header"
import { NotificationItem } from "@/components/molecules/notification-item"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "New team member joined",
    description: "Jane Smith has joined your team",
    time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    user: {
      name: "Jane Smith",
    },
  },
  {
    id: "2",
    title: "New comment on your post",
    description: "John Doe commented on your post",
    time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    user: {
      name: "John Doe",
    },
  },
  {
    id: "3",
    title: "Your subscription has been renewed",
    description: "Your Pro plan has been renewed for another month",
    time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
  },
  {
    id: "4",
    title: "New feature available",
    description: "Check out our new analytics dashboard",
    time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    read: true,
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)

  const unreadNotifications = notifications.filter((notification) => !notification.read)
  const readNotifications = notifications.filter((notification) => notification.read)

  const handleDismiss = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  return (
    <div className="container space-y-8 py-8">
      <PageHeader title="Notifications" description="Manage your notifications">
        {unreadNotifications.length > 0 && (
          <Button variant="outline" onClick={handleMarkAllAsRead}>
            <Check className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        )}
      </PageHeader>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            {unreadNotifications.length > 0 && (
              <span className="ml-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                {unreadNotifications.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Notifications</CardTitle>
              <CardDescription>View all your notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Bell className="mb-2 h-10 w-10 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">No notifications</h3>
                  <p className="text-sm text-muted-foreground">You don't have any notifications yet</p>
                </div>
              ) : (
                notifications.map((notification) => (
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
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="unread">
          <Card>
            <CardHeader>
              <CardTitle>Unread Notifications</CardTitle>
              <CardDescription>View your unread notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {unreadNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Check className="mb-2 h-10 w-10 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">All caught up!</h3>
                  <p className="text-sm text-muted-foreground">You've read all your notifications</p>
                </div>
              ) : (
                unreadNotifications.map((notification) => (
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
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
