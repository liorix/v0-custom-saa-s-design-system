"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import { useState } from "react"

// Import UI components
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/card"

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

// Import icons
import { Home, FileText, AlertCircle, Users, DollarSign, Zap, Shield } from "lucide-react"
import { useForm } from "react-hook-form"

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

  // Example component props for different components
  const componentProps = {
    // UI Components
    button: {
      default: { children: "Button" },
      destructive: { variant: "destructive", children: "Delete" },
      outline: { variant: "outline", children: "Outline" },
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
        className: "w-[300px]",
      },
    },
    tabs: {
      default: {
        children: (
          <>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="p-4 border rounded-md mt-2">
              Tab 1 Content
            </TabsContent>
            <TabsContent value="tab2" className="p-4 border rounded-md mt-2">
              Tab 2 Content
            </TabsContent>
          </>
        ),
        defaultValue: "tab1",
        className: "w-[300px]",
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
      case "button":
        return <Button {...props} />
      case "card":
        return <Card {...props} />
      case "tabs":
        return <Tabs {...props} />

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
