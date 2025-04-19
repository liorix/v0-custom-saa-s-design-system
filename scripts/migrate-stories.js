const fs = require("fs-extra")
const path = require("path")
const glob = require("glob")
const chalk = require("chalk")

// Configuration
const config = {
  dryRun: false, // Set to true to test without making changes
  createBackups: true, // Create backups of original files
  removeOriginals: true, // Remove original story files after migration
  verbose: true, // Show detailed logs
  storiesDir: "stories",
  componentsDir: "components",
  storyExtensions: [".stories.tsx", ".stories.jsx", ".stories.ts", ".stories.js"],
  mdxExtensions: [".mdx"],
}

// Statistics
const stats = {
  processed: 0,
  migrated: 0,
  skipped: 0,
  errors: 0,
}

// Helper functions
function log(message, type = "info") {
  const prefix = {
    info: chalk.blue("INFO"),
    success: chalk.green("SUCCESS"),
    warning: chalk.yellow("WARNING"),
    error: chalk.red("ERROR"),
  }[type]

  console.log(`${prefix}: ${message}`)
}

function findComponentPath(componentType, componentName) {
  // Try different possible file extensions
  const extensions = [".tsx", ".jsx", ".ts", ".js"]

  for (const ext of extensions) {
    const componentPath = path.join(config.componentsDir, componentType, `${componentName}${ext}`)
    if (fs.existsSync(componentPath)) {
      return componentPath
    }
  }

  // Try index files
  for (const ext of extensions) {
    const indexPath = path.join(config.componentsDir, componentType, componentName, `index${ext}`)
    if (fs.existsSync(indexPath)) {
      return indexPath
    }
  }

  return null
}

function updateImports(content, componentType, componentName) {
  // Handle different import patterns
  const importPatterns = [
    // Named import with path alias
    {
      regex: new RegExp(
        `import\\s+{\\s*${componentName}[^}]*}\\s+from\\s+["']@/components/${componentType}/${componentName}["']`,
        "g",
      ),
      replacement: `import { ${componentName} } from "./${componentName}"`,
    },
    // Named import with relative path
    {
      regex: new RegExp(
        `import\\s+{\\s*${componentName}[^}]*}\\s+from\\s+["']\\.\\./.+/${componentType}/${componentName}["']`,
        "g",
      ),
      replacement: `import { ${componentName} } from "./${componentName}"`,
    },
    // Default import with path alias
    {
      regex: new RegExp(
        `import\\s+${componentName}\\s+from\\s+["']@/components/${componentType}/${componentName}["']`,
        "g",
      ),
      replacement: `import ${componentName} from "./${componentName}"`,
    },
    // Default import with relative path
    {
      regex: new RegExp(
        `import\\s+${componentName}\\s+from\\s+["']\\.\\./.+/${componentType}/${componentName}["']`,
        "g",
      ),
      replacement: `import ${componentName} from "./${componentName}"`,
    },
  ]

  let updatedContent = content

  // Apply all import patterns
  importPatterns.forEach((pattern) => {
    updatedContent = updatedContent.replace(pattern.regex, pattern.replacement)
  })

  // Handle other component imports
  // This is a more general approach to catch imports that don't match the patterns above
  const otherComponentImports = /from\s+["']@\/components\/([^"']+)["']/g
  updatedContent = updatedContent.replace(otherComponentImports, (match, importPath) => {
    // Calculate the relative path from the new story location to the imported component
    const relativePath = path
      .relative(path.join(config.componentsDir, componentType), path.join(config.componentsDir, importPath))
      .replace(/\\/g, "/") // Normalize path separators

    return `from "${relativePath.startsWith(".") ? relativePath : "./" + relativePath}"`
  })

  return updatedContent
}

function migrateStoryFile(storyFile) {
  try {
    // Extract component type and name from the story file path
    const pathParts = storyFile.split(path.sep)
    const componentType = pathParts[pathParts.indexOf(config.storiesDir) + 1]
    const componentFileName = path.basename(storyFile, path.extname(storyFile))
    const componentName = componentFileName.replace(/\.stories$/, "")

    // Find the component file
    const componentPath = findComponentPath(componentType, componentName)

    if (!componentPath) {
      log(`Component not found for story: ${storyFile}`, "warning")
      stats.skipped++
      return
    }

    // Create the new story file path
    const componentDir = path.dirname(componentPath)
    const newStoryPath = path.join(componentDir, `${componentName}.stories${path.extname(storyFile)}`)

    // Read the story file
    const content = fs.readFileSync(storyFile, "utf8")

    // Update imports
    const updatedContent = updateImports(content, componentType, componentName)

    if (config.dryRun) {
      log(`Would migrate: ${storyFile} -> ${newStoryPath}`, "info")
      stats.processed++
      return
    }

    // Create backup if needed
    if (config.createBackups) {
      const backupPath = `${storyFile}.bak`
      fs.copyFileSync(storyFile, backupPath)
      log(`Created backup: ${backupPath}`, "info")
    }

    // Create directory if it doesn't exist
    fs.ensureDirSync(path.dirname(newStoryPath))

    // Write the new story file
    fs.writeFileSync(newStoryPath, updatedContent)

    log(`Migrated: ${storyFile} -> ${newStoryPath}`, "success")

    // Remove original if configured
    if (config.removeOriginals) {
      fs.unlinkSync(storyFile)
      log(`Removed original: ${storyFile}`, "info")
    }

    stats.migrated++
    stats.processed++
  } catch (error) {
    log(`Error processing ${storyFile}: ${error.message}`, "error")
    stats.errors++
  }
}

function migrateMdxFile(mdxFile) {
  try {
    // For MDX files, we'll just copy them to a docs folder in the components directory
    const pathParts = mdxFile.split(path.sep)
    const componentType = pathParts[pathParts.indexOf(config.storiesDir) + 1]
    const fileName = path.basename(mdxFile)

    // Create the new MDX file path
    const newMdxPath = path.join(config.componentsDir, componentType, "docs", fileName)

    if (config.dryRun) {
      log(`Would copy MDX: ${mdxFile} -> ${newMdxPath}`, "info")
      stats.processed++
      return
    }

    // Create directory if it doesn't exist
    fs.ensureDirSync(path.dirname(newMdxPath))

    // Copy the MDX file
    fs.copyFileSync(mdxFile, newMdxPath)

    log(`Copied MDX: ${mdxFile} -> ${newMdxPath}`, "success")

    // Remove original if configured
    if (config.removeOriginals) {
      fs.unlinkSync(mdxFile)
      log(`Removed original: ${mdxFile}`, "info")
    }

    stats.migrated++
    stats.processed++
  } catch (error) {
    log(`Error processing ${mdxFile}: ${error.message}`, "error")
    stats.errors++
  }
}

// Main execution
function main() {
  log("Starting story migration...", "info")

  // Find all story files
  const storyPatterns = config.storyExtensions.map((ext) => `${config.storiesDir}/**/*${ext}`)
  const mdxPatterns = config.mdxExtensions.map((ext) => `${config.storiesDir}/**/*${ext}`)

  const storyFiles = storyPatterns.flatMap((pattern) => glob.sync(pattern))
  const mdxFiles = mdxPatterns.flatMap((pattern) => glob.sync(pattern))

  log(`Found ${storyFiles.length} story files and ${mdxFiles.length} MDX files`, "info")

  // Process story files
  storyFiles.forEach(migrateStoryFile)

  // Process MDX files
  mdxFiles.forEach(migrateMdxFile)

  // Print summary
  log("\nMigration Summary:", "info")
  log(`Processed: ${stats.processed}`, "info")
  log(`Migrated: ${stats.migrated}`, "success")
  log(`Skipped: ${stats.skipped}`, "warning")
  log(`Errors: ${stats.errors}`, "error")

  if (config.dryRun) {
    log("\nThis was a dry run. No files were actually modified.", "info")
  }
}

// Run the script
main()
