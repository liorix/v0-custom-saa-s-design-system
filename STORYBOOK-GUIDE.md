# Accessing Storybook in v0

This guide explains how to build and access Storybook through the `/storybook` route.

## Building Storybook for the `/storybook` Route

1. Install the required dependencies:
   \`\`\`bash
   npm install --save-dev fs-extra
   \`\`\`

2. Run the build script:
   \`\`\`bash
   npm run build-storybook-static
   \`\`\`

3. Start your Next.js development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Access Storybook at: http://localhost:3000/storybook

## How It Works

The build script:
1. Builds Storybook using `storybook build`
2. Creates a `storybook` directory in the `public` folder
3. Copies the built Storybook files to `public/storybook`

The Next.js app then serves these static files through the `/storybook` route.

## Updating Storybook

When you make changes to your components or stories, you'll need to rebuild the static Storybook:

\`\`\`bash
npm run build-storybook-static
\`\`\`

Then refresh your browser to see the changes.
