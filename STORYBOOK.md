# Storybook Integration

This project includes a static Storybook build that can be accessed directly through the Next.js application.

## Viewing Storybook

There are two ways to access Storybook:

### 1. Development Mode

Run the Storybook development server:

\`\`\`bash
npm run storybook
\`\`\`

This will start Storybook on port 6006 and automatically open it in your browser.

### 2. Static Build (for v0 and production)

To build a static version of Storybook and make it available through the Next.js app:

\`\`\`bash
npm run build-storybook-static
\`\`\`

This will:
1. Build Storybook
2. Copy the build to `public/storybook`
3. Make it accessible at `/storybook` in your Next.js app

After running this command, you can access Storybook at:
- Development: http://localhost:3000/storybook
- Production: https://your-domain.com/storybook

## Adding New Stories

When adding new components to the design system:

1. Create a story file in the `stories/` directory
2. Follow the existing pattern for story organization
3. Rebuild the static Storybook when you want to update the embedded version

## Troubleshooting

If the iframe doesn't load properly:
- Make sure you've run `npm run build-storybook-static`
- Check that the files exist in `public/storybook`
- Try clearing your browser cache
