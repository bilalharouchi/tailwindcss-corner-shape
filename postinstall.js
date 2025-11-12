#!/usr/bin/env node

/**
 * Postinstall script for tailwindcss-corner-shape
 * Automatically adds the plugin to tailwind.config.ts/js
 */

const fs = require('fs')
const path = require('path')

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

/**
 * Find the Tailwind config file in the parent project
 */
function findTailwindConfig() {
  // Go up from node_modules to the project root
  const projectRoot = path.resolve(process.cwd(), '../../')

  const possibleFiles = [
    'tailwind.config.ts',
    'tailwind.config.js',
    'tailwind.config.mjs',
    'tailwind.config.cjs',
  ]

  for (const file of possibleFiles) {
    const filePath = path.join(projectRoot, file)
    if (fs.existsSync(filePath)) {
      return { path: filePath, name: file }
    }
  }

  return null
}

/**
 * Check if the plugin is already in the config
 */
function isPluginAlreadyAdded(content) {
  return (
    content.includes('tailwindcss-corner-shape') ||
    content.includes('cornerShapePlugin') ||
    content.includes('corner-shape-plugin')
  )
}

/**
 * Add the plugin to the Tailwind config
 */
function addPluginToConfig(configPath, configName) {
  try {
    let content = fs.readFileSync(configPath, 'utf8')

    // Check if already added
    if (isPluginAlreadyAdded(content)) {
      log('\n✓ Plugin already configured in ' + configName, 'green')
      return true
    }

    // Determine if it's ESM or CommonJS
    const isESM = configName.endsWith('.mjs') || configName.endsWith('.ts') || content.includes('export default')
    const isCommonJS = configName.endsWith('.cjs') || content.includes('module.exports')

    // Add import statement
    if (isESM) {
      // Check if there are already imports
      if (content.match(/^import /m)) {
        // Add after last import
        content = content.replace(
          /(import .+\n)((?!import).)/,
          `$1import cornerShapePlugin from 'tailwindcss-corner-shape'\n$2`
        )
      } else {
        // Add at the beginning
        content = `import cornerShapePlugin from 'tailwindcss-corner-shape'\n\n` + content
      }
    } else if (isCommonJS) {
      // CommonJS require
      if (content.match(/^const .+ = require\(/m)) {
        content = content.replace(
          /(const .+ = require\(.+\)\n)((?!const .+ = require).)/,
          `$1const cornerShapePlugin = require('tailwindcss-corner-shape')\n$2`
        )
      } else {
        content = `const cornerShapePlugin = require('tailwindcss-corner-shape')\n\n` + content
      }
    }

    // Add to plugins array
    if (content.includes('plugins: [')) {
      // Plugins array exists, add to it
      content = content.replace(
        /plugins:\s*\[/,
        `plugins: [\n    cornerShapePlugin(),`
      )
    } else if (content.includes('plugins: []')) {
      // Empty plugins array
      content = content.replace(
        /plugins:\s*\[\s*\]/,
        `plugins: [cornerShapePlugin()]`
      )
    } else {
      // No plugins key, add it
      // Find the config object and add plugins
      content = content.replace(
        /(export default|module\.exports\s*=)\s*{/,
        `$1 {\n  plugins: [cornerShapePlugin()],`
      )
    }

    // Write back to file
    fs.writeFileSync(configPath, content, 'utf8')
    return true
  } catch (error) {
    log(`✗ Error updating config: ${error.message}`, 'red')
    return false
  }
}

/**
 * Main function
 */
function main() {
  // Skip if running in CI or if explicitly disabled
  if (process.env.CI || process.env.TAILWIND_CORNER_SHAPE_SKIP_SETUP) {
    log('\n⊘ Skipping auto-setup (CI or disabled)', 'yellow')
    return
  }

  log('\n' + '='.repeat(60), 'blue')
  log('  🚀 tailwindcss-corner-shape - Auto Setup', 'bright')
  log('='.repeat(60), 'blue')

  // Find Tailwind config
  const config = findTailwindConfig()

  if (!config) {
    log('\n⚠ No tailwind.config file found', 'yellow')
    log('  Please add the plugin manually:\n', 'reset')
    log('  import cornerShapePlugin from \'tailwindcss-corner-shape\'', 'reset')
    log('  export default { plugins: [cornerShapePlugin()] }', 'reset')
    return
  }

  log(`\n📝 Found: ${config.name}`, 'blue')

  // Add plugin to config
  const success = addPluginToConfig(config.path, config.name)

  if (success) {
    log('\n✨ Success! Plugin automatically configured!', 'green')
    log('\n🎯 All your rounded-* classes now have modern corner-shape!', 'bright')
    log('   No code changes needed - it just works! ✨\n', 'reset')
  } else {
    log('\n⚠ Could not auto-configure. Please add manually:', 'yellow')
    log('  import cornerShapePlugin from \'tailwindcss-corner-shape\'', 'reset')
    log('  export default { plugins: [cornerShapePlugin()] }', 'reset')
  }

  log('='.repeat(60) + '\n', 'blue')
}

// Run the script
main()
