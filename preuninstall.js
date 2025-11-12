#!/usr/bin/env node

/**
 * Preuninstall script for tailwindcss-corner-shape
 * Removes the plugin from tailwind.config.ts/js before uninstalling
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
  cyan: '\x1b[36m',
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

/**
 * Find the Tailwind config file in the parent project
 */
function findTailwindConfig() {
  const projectRoot = path.resolve(__dirname, '../../')

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
 * Check if the plugin is in the config
 */
function isPluginPresent(content) {
  return (
    content.includes('tailwindcss-corner-shape') ||
    content.includes('cornerShapePlugin') ||
    content.includes('corner-shape-plugin')
  )
}

/**
 * Remove import statement
 */
function removeImportStatement(content) {
  const lines = content.split('\n')
  const filteredLines = lines.filter(line => {
    return !line.includes('tailwindcss-corner-shape') || !line.trim().startsWith('import ') && !line.includes('require(')
  })
  return filteredLines.join('\n')
}

/**
 * Remove plugin from plugins array
 */
function removeFromPluginsArray(content) {
  const lines = content.split('\n')
  const result = []
  let skipNext = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Skip if this is a continuation from previous cornerShapePlugin line
    if (skipNext) {
      // Check if this line closes the plugin call
      if (line.includes(')')) {
        skipNext = false
      }
      continue
    }

    // Check if line contains cornerShapePlugin
    if (line.includes('cornerShapePlugin(')) {
      // Check if plugin call is complete on this line
      if (!line.includes(')')) {
        // Multi-line plugin call - skip until we find closing )
        skipNext = true
      }
      // Skip this line (single or start of multi-line)
      continue
    }

    result.push(line)
  }

  return result.join('\n')
}

/**
 * Clean up empty lines in plugins array
 */
function cleanupPluginsArray(content) {
  // Remove trailing commas before ] in plugins array
  content = content.replace(/,(\s*)\]/g, '$1]')

  // Remove double commas
  content = content.replace(/,,/g, ',')

  return content
}

/**
 * Remove the plugin from config
 */
function removePluginFromConfig(configPath, configName) {
  try {
    let content = fs.readFileSync(configPath, 'utf8')

    // Check if plugin is present
    if (!isPluginPresent(content)) {
      log('\n⊘ Plugin not found in ' + configName, 'yellow')
      return false
    }

    // Step 1: Remove import statement
    content = removeImportStatement(content)

    // Step 2: Remove from plugins array
    content = removeFromPluginsArray(content)

    // Step 3: Cleanup
    content = cleanupPluginsArray(content)

    // Write back to file
    fs.writeFileSync(configPath, content, 'utf8')
    return true
  } catch (error) {
    log(`\n✗ Error cleaning config: ${error.message}`, 'red')
    return false
  }
}

/**
 * Main function
 */
function main() {
  log('\n' + '='.repeat(60), 'blue')
  log('  🧹 tailwindcss-corner-shape - Cleanup', 'bright')
  log('='.repeat(60), 'blue')

  // Find Tailwind config
  const config = findTailwindConfig()

  if (!config) {
    log('\n⊘ No tailwind.config file found', 'yellow')
    log('  Nothing to clean up\n', 'reset')
    return
  }

  log(`\n📝 Found: ${config.name}`, 'blue')

  // Remove plugin from config
  const success = removePluginFromConfig(config.path, config.name)

  if (success) {
    log('\n✨ Plugin removed from config!', 'green')
    log('   Thanks for using tailwindcss-corner-shape! 👋\n', 'reset')
  }

  log('='.repeat(60) + '\n', 'blue')
}

// Run the script
main()
