# SaaS Design System Storybook

This Storybook contains all the components used in our SaaS Design System, organized according to atomic design principles.

## Component Categories

- **UI Components**: Base components from shadcn/ui
- **Atoms**: Small, basic components like Logo, EmptyState, etc.
- **Molecules**: Combinations of atoms like FormField, StatCard, etc.
- **Organisms**: Complex components composed of molecules and atoms
- **Templates**: Page layouts that define content structure
- **Pages**: Specific implementations of templates

## Running Storybook

To run Storybook locally:

\`\`\`bash
npm run storybook
\`\`\`

This will start Storybook on port 6006. You can access it at http://localhost:6006.

## Building Storybook

To build a static version of Storybook:

\`\`\`bash
npm run build-storybook
\`\`\`

This will create a static build in the `storybook-static` directory.

## Adding New Components

When adding new components to the design system, please follow these guidelines:

1. Create the component in the appropriate directory based on its complexity
2. Add a story file in the corresponding stories directory
3. Include examples of all variants and states
4. Add proper documentation and controls
5. Ensure the component is accessible and responsive
