const { execSync } = require("child_process")
const fs = require("fs-extra")
const path = require("path")

// Build Storybook
console.log("Building Storybook...")
execSync("npx storybook build", { stdio: "inherit" })

// Create storybook directory in public if it doesn't exist
const publicStorybookDir = path.join(process.cwd(), "public", "storybook")
fs.ensureDirSync(publicStorybookDir)

// Clean the directory
fs.emptyDirSync(publicStorybookDir)

// Copy the built Storybook to public/storybook
console.log("Copying Storybook build to public/storybook...")
fs.copySync(path.join(process.cwd(), "storybook-static"), publicStorybookDir)

console.log("Storybook successfully built and copied to public/storybook!")
