"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import { useState } from "react"

// Import UI components
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toast, ToastAction, ToastProvider, ToastTitle, ToastDescription } from "@/components/ui/toast"

// Import atoms
import { Logo } from "@/components/atoms/logo"
import { EmptyState } from "@/components/atoms/empty-state"
import { AvatarGroup } from "@/components/atoms/avatar-group"
import { PageHeader } from "@/components/atoms/page-header"

// Import molecules
import { StatCard } from "@/components/molecules/stat-card"
import { NotificationItem } from "@/components/molecules/notification-item"
import { FeatureCard } from "@/components/molecules/feature-card"
import { FormInputField } from "@/components/molecules/form-field"

// Import organisms
import { OrganizationSwitcher } from "@/components/organisms/organization-switcher"
import { BillingPlanCard } from "@/components/organisms/billing-plan-card"
import { AuthForm } from "@/components/organisms/auth-form"
import { DataTable } from "@/components/organisms/data-table"
import { TeamMembersList } from "@/components/organisms/team-members-list"

// Import icons
import { Home, FileText, AlertCircle, Users, DollarSign, Zap, Shield } from "lucide-react"
import { useForm } from "react-hook-form"
import type { ColumnDef } from "@tanstack/react-table"

export default function ComponentPage() {
  const router = useRouter()
  const params = useParams()
  const path = Array.isArray(params.path) ? params.path : [params.path || ""]

  // Extract component type and name from path
  const [type, componentName] = path

  const [activeVariant, setActiveVariant] = useState("default")

  const goBack = () => {
    router.push("/storybook")
  }

  // Mock data for components
  const mockUsers = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
    { id: "3", name: "Bob Johnson" },
  ]

  const mockOrganizations = [
    { id: "1", name: "Acme Inc" },
    { id: "2", name: "Globex Corporation" },
    { id: "3", name: "Initech" },
  ]

  const formDefault = useForm({
    defaultValues: {
      username: "",
    },
  })

  const formWithDescription = useForm({
    defaultValues: {
      email: "",
    },
  })

  // Mock data for DataTable
  const mockColumns: ColumnDef<any>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
  ]

  const mockData = [
    { id: "1", name: "John Doe", email: "john@example.com" },
    { id: "2", name: "Jane Smith", email: "jane@example.com" },
  ]

  // Mock data for TeamMembersList
  const mockMembers = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Owner",
      status: "active" as const,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Admin",
      status: "active" as const,
    },
  ]

  // Example component props for different components
  const componentProps = {
    // UI Components
    accordion: {
      default: {
        children: (
          <>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that match the other components' aesthetic.
              </AccordionContent>
            </AccordionItem>
          </>
        ),
        type: "single",
        collapsible: true,
        className: "w-[400px]",
      },
    },
    alert: {
      default: {
        children: (
          <>
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>You can add components to your app using the cli.</AlertDescription>
          </>
        ),
        className: "w-[400px]",
      },
      destructive: {
        variant: "destructive",
        children: (
          <>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
          </>
        ),
        className: "w-[400px]",
      },
    },
    "alert-dialog": {
      default: {
        children: (
          <>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data from our
                  servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </>
        ),
      },
    },
    avatar: {
      default: {
        children: (
          <>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </>
        ),
      },
      withFallback: {
        children: (
          <>
            <AvatarImage src="/nonexistent-image.jpg" alt="Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </>
        ),
      },
    },
    badge: {
      default: {
        children: "Badge",
      },
      secondary: {
        variant: "secondary",
        children: "Secondary",
      },
      destructive: {
        variant: "destructive",
        children: "Destructive",
      },
    },
    button: {
      default: {
        children: "Button",
      },
      destructive: {
        variant: "destructive",
        children: "Delete",
      },
      outline: {
        variant: "outline",
        children: "Outline",
      },
    },
    calendar: {
      default: {
        className: "rounded-md border",
      },
    },
    card: {
      default: {
        children: (
          <>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
          </>
        ),
        className: "w-[350px]",
      },
    },
    checkbox: {
      default: {},
      checked: {
        defaultChecked: true,
      },
    },
    collapsible: {
      default: {
        children: (
          <>
            <CollapsibleTrigger asChild>
              <Button variant="outline">Toggle</Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 mt-2 border rounded-md">
              <p>Content that can be collapsed</p>
            </CollapsibleContent>
          </>
        ),
      },
    },
    command: {
      default: {
        children: (
          <>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>Calendar</CommandItem>
                <CommandItem>Search</CommandItem>
                <CommandItem>Settings</CommandItem>
              </CommandGroup>
            </CommandList>
          </>
        ),
        className: "rounded-lg border shadow-md w-[400px]",
      },
    },
    "context-menu": {
      default: {
        children: (
          <>
            <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
              Right click here
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
              <ContextMenuItem>Profile</ContextMenuItem>
              <ContextMenuItem>Settings</ContextMenuItem>
              <ContextMenuItem>Help</ContextMenuItem>
            </ContextMenuContent>
          </>
        ),
      },
    },
    dialog: {
      default: {
        children: (
          <>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>Make changes to your profile here.</DialogDescription>
              </DialogHeader>
              <div className="py-4">Content goes here</div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </>
        ),
      },
    },
    "dropdown-menu": {
      default: {
        children: (
          <>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Help</DropdownMenuItem>
            </DropdownMenuContent>
          </>
        ),
      },
    },
    "hover-card": {
      default: {
        children: (
          <>
            <HoverCardTrigger asChild>
              <Button variant="link">Hover me</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">@nextjs</h4>
                  <p className="text-sm">The React Framework for the Web</p>
                </div>
              </div>
            </HoverCardContent>
          </>
        ),
      },
    },
    input: {
      default: {
        placeholder: "Email",
        className: "w-[300px]",
      },
    },
    label: {
      default: {
        children: "Label",
      },
    },
    popover: {
      default: {
        children: (
          <>
            <PopoverTrigger asChild>
              <Button variant="outline">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Dimensions</h4>
                  <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
                </div>
              </div>
            </PopoverContent>
          </>
        ),
      },
    },
    select: {
      default: {
        children: (
          <>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
            </SelectContent>
          </>
        ),
      },
    },
    separator: {
      default: {
        className: "my-4",
      },
      vertical: {
        orientation: "vertical",
        className: "h-4",
      },
    },
    sheet: {
      default: {
        children: (
          <>
            <SheetTrigger asChild>
              <Button variant="outline">Open Sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>Make changes to your profile here.</SheetDescription>
              </SheetHeader>
              <div className="py-4">Content goes here</div>
            </SheetContent>
          </>
        ),
      },
    },
    skeleton: {
      default: {
        className: "h-4 w-[250px]",
      },
      circle: {
        className: "h-12 w-12 rounded-full",
      },
    },
    slider: {
      default: {
        defaultValue: [33],
        max: 100,
        step: 1,
        className: "w-[300px]",
      },
      range: {
        defaultValue: [25, 75],
        max: 100,
        step: 1,
        className: "w-[300px]",
      },
    },
    switch: {
      default: {},
      checked: {
        defaultChecked: true,
      },
    },
    tabs: {
      default: {
        children: (
          <>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="p-4 border rounded-md mt-2">
              <p>Make changes to your account here.</p>
            </TabsContent>
            <TabsContent value="password" className="p-4 border rounded-md mt-2">
              <p>Change your password here.</p>
            </TabsContent>
          </>
        ),
        defaultValue: "account",
        className: "w-[400px]",
      },
    },
    textarea: {
      default: {
        placeholder: "Type your message here.",
        className: "w-[300px]",
      },
    },
    toast: {
      default: {
        children: (
          <ToastProvider>
            <Toast>
              <div className="grid gap-1">
                <ToastTitle>Scheduled: Catch up</ToastTitle>
                <ToastDescription>Friday, February 10, 2023 at 5:57 PM</ToastDescription>
              </div>
            </Toast>
          </ToastProvider>
        ),
      },
      withAction: {
        children: (
          <ToastProvider>
            <Toast>
              <div className="grid gap-1">
                <ToastTitle>Action Required</ToastTitle>
                <ToastDescription>Please confirm your email address.</ToastDescription>
              </div>
              <ToastAction altText="Confirm">Confirm</ToastAction>
            </Toast>
          </ToastProvider>
        ),
      },
    },

    // Atoms
    logo: {
      default: { icon: Home, text: "Acme SaaS" },
      small: { icon: Home, size: "sm", text: "Acme SaaS" },
      iconOnly: { icon: Home, showText: false },
    },
    "empty-state": {
      default: {
        icon: FileText,
        title: "No results found",
        description: "Try adjusting your search or filters to find what you're looking for.",
      },
      withAction: {
        icon: AlertCircle,
        title: "Something went wrong",
        description: "We encountered an error while loading your data.",
        children: <Button>Try again</Button>,
      },
    },
    "avatar-group": {
      default: {
        users: mockUsers,
      },
      withOverflow: {
        users: [...mockUsers, { id: "4", name: "Alice Brown" }, { id: "5", name: "Charlie Davis" }],
        max: 3,
      },
    },
    "page-header": {
      default: {
        title: "Page Title",
        description: "This is a description of the page and its contents.",
      },
      withAction: {
        title: "Team Members",
        description: "Manage your team members and their account permissions.",
        children: (
          <Button>
            <Users className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        ),
      },
    },

    // Molecules
    "stat-card": {
      default: {
        title: "Total Revenue",
        value: "$45,231.89",
        className: "w-[300px]",
      },
      withIcon: {
        title: "Total Revenue",
        value: "$45,231.89",
        icon: DollarSign,
        className: "w-[300px]",
      },
      withTrend: {
        title: "Active Users",
        value: "2,350",
        description: "+180.1% from last month",
        icon: Users,
        trend: { value: 180.1, isPositive: true },
        className: "w-[300px]",
      },
    },
    "notification-item": {
      default: {
        id: "1",
        title: "New feature available",
        description: "Check out our new analytics dashboard",
        time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        read: false,
        className: "w-[400px]",
        onDismiss: () => {},
      },
      read: {
        id: "2",
        title: "Your subscription has been renewed",
        description: "Your Pro plan has been renewed for another month",
        time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        read: true,
        className: "w-[400px]",
        onDismiss: () => {},
      },
    },
    "feature-card": {
      default: {
        title: "Lightning Fast",
        description: "Our platform is optimized for speed and performance.",
        icon: Zap,
        className: "w-[300px]",
      },
      security: {
        title: "Enterprise Security",
        description: "Bank-level security with end-to-end encryption and two-factor authentication.",
        icon: Shield,
        className: "w-[300px]",
      },
    },
    "form-field": {
      default: {
        control: formDefault.control,
        name: "username",
        label: "Username",
        placeholder: "Enter your username",
      },
      withDescription: {
        control: formWithDescription.control,
        name: "email",
        label: "Email",
        placeholder: "Enter your email",
        description: "We'll never share your email with anyone else.",
      },
    },

    // Organisms
    "organization-switcher": {
      default: {
        organizations: mockOrganizations,
        currentOrganizationId: "1",
        onOrganizationChange: () => {},
        onCreateOrganization: () => {},
        className: "w-[250px]",
      },
    },
    "billing-plan-card": {
      default: {
        name: "Starter",
        description: "For individuals and small teams",
        price: {
          monthly: 9,
          annually: true,
        },
        features: [
          { name: "5 team members", included: true },
          { name: "20GB storage", included: true },
          { name: "Basic analytics", included: true },
          { name: "Priority support", included: false },
          { name: "Custom branding", included: false },
        ],
        onSelect: () => {},
        className: "w-[300px]",
      },
      popular: {
        name: "Pro",
        description: "For growing teams and businesses",
        price: {
          monthly: 29,
          annually: true,
        },
        features: [
          { name: "10 team members", included: true },
          { name: "50GB storage", included: true },
          { name: "Advanced analytics", included: true },
          { name: "Priority support", included: true },
          { name: "Custom branding", included: false },
        ],
        features: [
          { name: "10 team members", included: true },
          { name: "50GB storage", included: true },
          { name: "Advanced analytics", included: true },
          { name: "Priority support", included: true },
          { name: "Custom branding", included: false },
        ],
        popular: true,
        onSelect: () => {},
        className: "w-[300px]",
      },
    },
    "auth-form": {
      login: {
        type: "login",
        onSubmit: async () => {},
        className: "w-[350px]",
      },
      signup: {
        type: "signup",
        onSubmit: async () => {},
        className: "w-[350px]",
      },
    },
    "data-table": {
      default: {
        columns: mockColumns,
        data: mockData,
        className: "w-full",
      },
      empty: {
        columns: mockColumns,
        data: [],
        className: "w-full",
      },
    },
    "team-members-list": {
      default: {
        members: mockMembers,
        onRemoveMember: () => {},
        onChangeMemberRole: () => {},
        onResendInvite: () => {},
        className: "w-full max-w-3xl",
      },
    },
  }

  // Render the selected component based on type and name
  const renderComponent = () => {
    // Get props for the current component and variant
    let props = componentProps[componentName]?.[activeVariant]

    // Handle function props (for form components)
    if (typeof props === "function") {
      props = props()
    }

    // If no props found, show error
    if (!props) {
      return (
        <div className="text-red-500">
          No props found for {componentName} ({activeVariant})
        </div>
      )
    }

    // Render the appropriate component based on the path
    switch (componentName) {
      // UI Components
      case "accordion":
        return <Accordion {...props} />
      case "alert":
        return <Alert {...props} />
      case "alert-dialog":
        return <AlertDialog {...props} />
      case "avatar":
        return <Avatar {...props} />
      case "badge":
        return <Badge {...props} />
      case "button":
        return <Button {...props} />
      case "calendar":
        return <Calendar {...props} />
      case "card":
        return <Card {...props} />
      case "checkbox":
        return <Checkbox {...props} />
      case "collapsible":
        return <Collapsible {...props} />
      case "command":
        return <Command {...props} />
      case "context-menu":
        return <ContextMenu {...props} />
      case "dialog":
        return <Dialog {...props} />
      case "dropdown-menu":
        return <DropdownMenu {...props} />
      case "hover-card":
        return <HoverCard {...props} />
      case "input":
        return <Input {...props} />
      case "label":
        return <Label {...props} />
      case "popover":
        return <Popover {...props} />
      case "select":
        return <Select {...props} />
      case "separator":
        return <Separator {...props} />
      case "sheet":
        return <Sheet {...props} />
      case "skeleton":
        return <Skeleton {...props} />
      case "slider":
        return <Slider {...props} />
      case "switch":
        return <Switch {...props} />
      case "tabs":
        return <Tabs {...props} />
      case "textarea":
        return <Textarea {...props} />
      case "toast":
        return <div {...props} />

      // Atoms
      case "logo":
        return <Logo {...props} />
      case "empty-state":
        return <EmptyState {...props} />
      case "avatar-group":
        return <AvatarGroup {...props} />
      case "page-header":
        return <PageHeader {...props} />

      // Molecules
      case "stat-card":
        return <StatCard {...props} />
      case "notification-item":
        return <NotificationItem {...props} />
      case "feature-card":
        return <FeatureCard {...props} />
      case "form-field":
        return <FormInputField {...props} />

      // Organisms
      case "organization-switcher":
        return <OrganizationSwitcher {...props} />
      case "billing-plan-card":
        return <BillingPlanCard {...props} />
      case "auth-form":
        return <AuthForm {...props} />
      case "data-table":
        return <DataTable {...props} />
      case "team-members-list":
        return <TeamMembersList {...props} />

      default:
        return (
          <div className="p-4 border border-red-300 bg-red-50 text-red-800 rounded-md">
            Component not found: {componentName}
          </div>
        )
    }
  }

  // Get available variants for the current component
  const getVariants = () => {
    const componentVariants = componentProps[componentName]
    return componentVariants ? Object.keys(componentVariants) : ["default"]
  }

  // If component not found, show error
  if (!componentProps[componentName]) {
    return (
      <div className="container py-10">
        <Button variant="ghost" onClick={goBack} className="mb-6">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Components
        </Button>

        <Card className="border-red-300 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">Component Not Found</CardTitle>
            <CardDescription className="text-red-700">Could not find component: {componentName}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Please check the component name and try again.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <Button variant="ghost" onClick={goBack} className="mb-6">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Components
      </Button>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="capitalize">{componentName.replace(/-/g, " ")}</CardTitle>
          <CardDescription>
            {type}/{componentName} component from the SaaS Design System
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Variants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              {getVariants().map((variant) => (
                <Button
                  key={variant}
                  variant={activeVariant === variant ? "default" : "outline"}
                  onClick={() => setActiveVariant(variant)}
                  className="justify-start"
                >
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>{activeVariant.charAt(0).toUpperCase() + activeVariant.slice(1)} variant</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-10 border-t">
            <div className="preview-container">{renderComponent()}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
