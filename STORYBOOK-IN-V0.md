# Storybook in v0

This project includes a custom Storybook-like interface that can be accessed directly through the Next.js application without requiring terminal access or build steps.

## Accessing the Design System

Simply navigate to the `/storybook` route in your application to view the design system components.

## Features

- Browse components by category (UI Components, Atoms, Molecules, Organisms)
- View individual components with their variants
- Navigate between the design system and the main application

## How It Works

Instead of using the traditional Storybook build process, this implementation:

1. Creates a custom Next.js route at `/storybook`
2. Renders components directly in the browser
3. Provides a simple navigation interface

## Adding New Components

When adding new components to the design system:

1. Add the component to the appropriate directory based on its complexity
2. Update the component maps in the Storybook pages to include your new component
3. Add example props for different variants of your component

This approach allows you to showcase your design system components without requiring terminal access or build steps.
