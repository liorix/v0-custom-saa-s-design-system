import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function StorybookPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">SaaS Design System</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Welcome to the design system documentation. Browse components using the sidebar navigation.
      </p>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Component Structure</CardTitle>
            <CardDescription>This design system follows atomic design principles</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>UI Components:</strong> Base components from shadcn/ui
              </li>
              <li>
                <strong>Atoms:</strong> Small, basic components like Logo, EmptyState, etc.
              </li>
              <li>
                <strong>Molecules:</strong> Combinations of atoms like FormField, StatCard, etc.
              </li>
              <li>
                <strong>Organisms:</strong> Complex components composed of molecules and atoms
              </li>
              <li>
                <strong>Templates:</strong> Page layouts that define content structure
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage Guidelines</CardTitle>
            <CardDescription>How to use this design system in your project</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Each component in the sidebar can be viewed with its variants and usage examples. Components are designed
              to be composable and customizable through props and Tailwind classes.
            </p>
            <p>
              To use a component in your project, simply import it from its respective path and provide the necessary
              props as shown in the examples.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
