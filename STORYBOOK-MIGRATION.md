# Migrating to Co-located Storybook Stories

This guide explains how to migrate your Storybook stories from a centralized `/stories` directory to be co-located with their respective components.

## Benefits of Co-location

- **Improved discoverability**: Stories are located right next to their components
- **Better maintenance**: When you update a component, you're reminded to update its stories
- **Easier navigation**: Quickly switch between component and story files in your IDE
- **Simplified imports**: Use relative imports instead of path aliases
- **Better developer experience**: New team members can more easily understand the relationship between components and stories

## Migration Process

### 1. Update Storybook Configuration

First, update your `.storybook/main.ts` file to include stories from both locations:

\`\`\`typescript
import type { StorybookConfig } from "@storybook/nextjs"

const config: StorybookConfig = {
  stories: [
    "../components/**/*.mdx", 
    "../components/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  // rest of your config...
}
\`\`\`

### 2. Run the Migration Script

We've provided a script to help migrate your stories:

\`\`\`bash
# Install required dependencies
npm install --save-dev fs-extra glob chalk

# Run a dry run first (doesn't make any changes)
npm run migrate-stories:dry

# Run the actual migration
npm run migrate-stories
\`\`\`

### 3. Review and Test

After running the migration:

1. Check the console output for any warnings or errors
2. Run Storybook to verify all stories still work correctly
3. Review the migrated story files to ensure imports are correct

### 4. Manual Adjustments

You may need to make some manual adjustments:

- Fix any imports that weren't correctly updated
- Update any paths to assets or resources
- Adjust story titles if needed

### 5. Clean Up

Once you're satisfied with the migration:

1. Remove the original story files (if you didn't use the `--remove-originals` option)
2. Update your Storybook configuration to only look for stories in the components directory

## Script Options

The migration script supports several options that can be configured in the script file:

- `dryRun`: Test the migration without making changes
- `createBackups`: Create backups of original files
- `removeOriginals`: Remove original story files after migration
- `verbose`: Show detailed logs

## Troubleshooting

If you encounter issues during migration:

1. Check the backup files (`.bak` extension) to compare with the migrated versions
2. Look for import path issues, especially for shared utilities or components
3. Verify that component paths are correctly resolved

For any persistent issues, you may need to manually migrate specific stories.
