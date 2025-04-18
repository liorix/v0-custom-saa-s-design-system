"use client"

import { PageHeader } from "@/components/atoms/page-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { PaperclipIcon, SendIcon, SmileIcon } from "lucide-react"
import { useState } from "react"

interface Message {
  id: string
  content: string
  sender: "user" | "contact"
  timestamp: Date
}

interface Contact {
  id: string
  name: string
  avatarUrl?: string
  lastMessage?: string
  lastMessageTime?: Date
  unreadCount?: number
  online?: boolean
}

const initialContacts: Contact[] = [
  {
    id: "1",
    name: "Jane Smith",
    lastMessage: "Hey, how's it going?",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    unreadCount: 2,
    online: true,
  },
  {
    id: "2",
    name: "John Doe",
    lastMessage: "Can you send me the report?",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    unreadCount: 0,
    online: true,
  },
  {
    id: "3",
    name: "Alice Johnson",
    lastMessage: "Thanks for your help!",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    unreadCount: 0,
    online: false,
  },
  {
    id: "4",
    name: "Bob Brown",
    lastMessage: "Let's schedule a meeting",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    unreadCount: 0,
    online: false,
  },
]

const initialMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "1-1",
      content: "Hey there! How's it going?",
      sender: "contact",
      timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
    },
    {
      id: "1-2",
      content: "I'm doing well, thanks for asking! How about you?",
      sender: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 8), // 8 minutes ago
    },
    {
      id: "1-3",
      content: "Pretty good! Just working on some new features.",
      sender: "contact",
      timestamp: new Date(Date.now() - 1000 * 60 * 6), // 6 minutes ago
    },
    {
      id: "1-4",
      content: "That sounds interesting! What kind of features?",
      sender: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    },
  ],
  "2": [
    {
      id: "2-1",
      content: "Hi, can you send me the report we discussed yesterday?",
      sender: "contact",
      timestamp: new Date(Date.now() - 1000 * 60 * 35), // 35 minutes ago
    },
    {
      id: "2-2",
      content: "Sure, I'll send it over right away.",
      sender: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
  ],
}

export default function MessagesPage() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [selectedContactId, setSelectedContactId] = useState<string | null>("1")
  const [messages, setMessages] = useState<Record<string, Message[]>>(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const selectedContact = contacts.find((contact) => contact.id === selectedContactId)
  const currentMessages = selectedContactId ? messages[selectedContactId] || [] : []

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContactId) return

    const newMessageObj: Message = {
      id: `${selectedContactId}-${Date.now()}`,
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages({
      ...messages,
      [selectedContactId]: [...(messages[selectedContactId] || []), newMessageObj],
    })

    // Update the contact's last message
    setContacts(
      contacts.map((contact) =>
        contact.id === selectedContactId
          ? {
              ...contact,
              lastMessage: newMessage,
              lastMessageTime: new Date(),
              unreadCount: 0,
            }
          : contact,
      ),
    )

    setNewMessage("")
  }

  const handleSelectContact = (contactId: string) => {
    setSelectedContactId(contactId)

    // Mark messages as read
    setContacts(
      contacts.map((contact) =>
        contact.id === contactId
          ? {
              ...contact,
              unreadCount: 0,
            }
          : contact,
      ),
    )
  }

  return (
    <div className="container py-8">
      <PageHeader title="Messages" description="Chat with your team and clients" />

      <div className="grid h-[calc(100vh-250px)] grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {/* Contacts list */}
        <Card className="md:col-span-1">
          <CardContent className="p-0">
            <div className="p-4">
              <Input placeholder="Search contacts..." />
            </div>
            <ScrollArea className="h-[calc(100vh-350px)]">
              <div className="space-y-1 p-2">
                {contacts.map((contact) => (
                  <button
                    key={contact.id}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-muted",
                      selectedContactId === contact.id && "bg-muted",
                    )}
                    onClick={() => handleSelectContact(contact.id)}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={contact.avatarUrl || "/placeholder.svg"} alt={contact.name} />
                        <AvatarFallback>
                          {contact.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {contact.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
                      )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{contact.name}</p>
                        {contact.lastMessageTime && (
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(contact.lastMessageTime, { addSuffix: false })}
                          </p>
                        )}
                      </div>
                      {contact.lastMessage && (
                        <p className="truncate text-sm text-muted-foreground">{contact.lastMessage}</p>
                      )}
                    </div>
                    {contact.unreadCount ? (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                        {contact.unreadCount}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat area */}
        <Card className="flex flex-col md:col-span-2 lg:col-span-3">
          <CardContent className="flex h-full flex-col p-0">
            {selectedContact ? (
              <>
                {/* Chat header */}
                <div className="flex items-center gap-3 border-b p-4">
                  <Avatar>
                    <AvatarImage src={selectedContact.avatarUrl || "/placeholder.svg"} alt={selectedContact.name} />
                    <AvatarFallback>
                      {selectedContact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedContact.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedContact.online ? "Online" : "Offline"}</p>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {currentMessages.map((message) => (
                      <div
                        key={message.id}
                        className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}
                      >
                        <div
                          className={cn(
                            "max-w-[80%] rounded-lg px-4 py-2",
                            message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                          )}
                        >
                          <p>{message.content}</p>
                          <p className="mt-1 text-right text-xs opacity-70">
                            {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message input */}
                <div className="border-t p-4">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                      <PaperclipIcon className="h-4 w-4" />
                      <span className="sr-only">Attach file</span>
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage()
                        }
                      }}
                    />
                    <Button variant="outline" size="icon">
                      <SmileIcon className="h-4 w-4" />
                      <span className="sr-only">Add emoji</span>
                    </Button>
                    <Button size="icon" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <SendIcon className="h-4 w-4" />
                      <span className="sr-only">Send message</span>
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center p-4 text-center">
                <h3 className="text-lg font-semibold">No conversation selected</h3>
                <p className="text-sm text-muted-foreground">Select a contact to start chatting</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
