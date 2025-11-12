#!/usr/bin/env node

/**
 * CLI for tailwindcss-corner-shape
 * Usage: npx tailwindcss-corner-shape init
 */

const fs = require('fs')
const path = require('path')
const readline = require('readline')

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
 * Corner shape presets
 */
const CORNER_PRESETS = {
  '1': {
    name: 'iOS Squircle (Default)',
    description: 'Modern iOS-like corners - balanced and contemporary',
    config: "cornerShapePlugin({ default: 'squircle' })"
  },
  '2': {
    name: 'Very Rounded',
    description: 'Soft, highly rounded corners for a friendly look',
    config: "cornerShapePlugin({ default: 'superellipse(1.5)' })"
  },
  '3': {
    name: 'Moderately Rounded',
    description: 'Subtle modern corners - not too round',
    config: "cornerShapePlugin({ default: 'superellipse(1.7)' })"
  },
  '4': {
    name: 'Slightly Rounded',
    description: 'Minimal rounding - close to standard border-radius',
    config: "cornerShapePlugin({ default: 'round' })"
  },
  '5': {
    name: 'Bevel (Industrial)',
    description: 'Straight chamfered edges for technical UI',
    config: "cornerShapePlugin({ default: 'bevel' })"
  },
  '6': {
    name: 'Zero Config',
    description: 'No options - just use defaults (squircle)',
    config: 'cornerShapePlugin()'
  }
}

/**
 * Display corner shape options menu
 */
function displayMenu() {
  log('\n╔══════════════════════════════════════════════════════════╗', 'cyan')
  log('║          Choose Your Corner Shape Style 🎨              ║', 'bright')
  log('╚══════════════════════════════════════════════════════════╝', 'cyan')

  Object.entries(CORNER_PRESETS).forEach(([key, preset]) => {
    log(`\n  ${key}. ${preset.name}`, 'bright')
    log(`     ${preset.description}`, 'reset')
  })

  log('\n──────────────────────────────────────────────────────────', 'cyan')
}

/**
 * Ask user for their preference
 */
function askUserPreference() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    displayMenu()

    rl.question('\nChoose a style (1-6) or press Enter for default [1]: ', (answer) => {
      rl.close()
      const choice = answer.trim() || '1'
      const preset = CORNER_PRESETS[choice]

      if (!preset) {
        log('\n⚠ Invalid choice, using default (iOS Squircle)', 'yellow')
        resolve(CORNER_PRESETS['1'])
      } else {
        log(`\n✓ Selected: ${preset.name}`, 'green')
        resolve(preset)
      }
    })
  })
}

/**
 * Find the Tailwind config file in the current directory
 */
function findTailwindConfig() {
  const projectRoot = process.cwd()

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
 * Add import/require statement for the plugin
 */
function addImportStatement(content, isESM) {
  if (isESM) {
    // Find the last import statement
    const lines = content.split('\n')
    let lastImportIndex = -1

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith('import ')) {
        lastImportIndex = i
      }
    }

    if (lastImportIndex !== -1) {
      // Insert after the last import
      lines.splice(lastImportIndex + 1, 0, "import cornerShapePlugin from 'tailwindcss-corner-shape'")
      return lines.join('\n')
    } else {
      // No imports found, add at the beginning
      return `import cornerShapePlugin from 'tailwindcss-corner-shape'\n\n${content}`
    }
  } else {
    // CommonJS
    const lines = content.split('\n')
    let lastRequireIndex = -1

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('require(')) {
        lastRequireIndex = i
      }
    }

    if (lastRequireIndex !== -1) {
      lines.splice(lastRequireIndex + 1, 0, "const cornerShapePlugin = require('tailwindcss-corner-shape')")
      return lines.join('\n')
    } else {
      return `const cornerShapePlugin = require('tailwindcss-corner-shape')\n\n${content}`
    }
  }
}

/**
 * Add plugin to the plugins array with user's chosen configuration
 */
function addToPluginsArray(content, pluginConfig) {
  const lines = content.split('\n')

  // Find the plugins: [ line
  let pluginsLineIndex = -1
  let pluginsIndent = ''

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.match(/plugins:\s*\[/)) {
      pluginsLineIndex = i
      // Capture the indentation
      const match = line.match(/^(\s*)plugins/)
      if (match) {
        pluginsIndent = match[1]
      }
      break
    }
  }

  if (pluginsLineIndex === -1) {
    // No plugins array found, can't auto-add
    return content
  }

  // Check if plugins array is on one line or multiple lines
  const pluginsLine = lines[pluginsLineIndex]

  if (pluginsLine.includes(']')) {
    // Single line: plugins: []  or  plugins: [something]
    if (pluginsLine.includes('[]')) {
      // Empty array
      lines[pluginsLineIndex] = pluginsLine.replace('[]', `[${pluginConfig}]`)
    } else {
      // Has content - insert before the ]
      lines[pluginsLineIndex] = pluginsLine.replace('[', '[\n' + pluginsIndent + '\t\t' + pluginConfig + ',\n' + pluginsIndent + '\t')
    }
  } else {
    // Multi-line array - insert after plugins: [
    lines.splice(pluginsLineIndex + 1, 0, pluginsIndent + '\t\t' + pluginConfig + ',')
  }

  return lines.join('\n')
}

/**
 * Add the plugin to the Tailwind config
 */
async function addPluginToConfig(configPath, configName) {
  try {
    let content = fs.readFileSync(configPath, 'utf8')

    // Check if already added
    if (isPluginAlreadyAdded(content)) {
      log('\n✓ Plugin already configured in ' + configName, 'green')
      return true
    }

    // Determine if it's ESM or CommonJS
    const isESM = configName.endsWith('.mjs') || configName.endsWith('.ts') || content.includes('export default')

    // Ask user for preference
    const userPreset = await askUserPreference()

    // Step 1: Add import statement
    content = addImportStatement(content, isESM)

    // Step 2: Add to plugins array with user's chosen config
    content = addToPluginsArray(content, userPreset.config)

    // Write back to file
    fs.writeFileSync(configPath, content, 'utf8')
    return true
  } catch (error) {
    log(`\n✗ Error updating config: ${error.message}`, 'red')
    return false
  }
}

/**
 * Display help message
 */
function displayHelp() {
  log('\n' + '='.repeat(60), 'blue')
  log('  🚀 tailwindcss-corner-shape CLI', 'bright')
  log('='.repeat(60), 'blue')
  log('\nUsage:', 'bright')
  log('  npx tailwindcss-corner-shape init    Configure plugin in your project', 'reset')
  log('  npx tailwindcss-corner-shape help    Show this help message', 'reset')
  log('\nExamples:', 'bright')
  log('  npx tailwindcss-corner-shape init', 'cyan')
  log('\n' + '='.repeat(60) + '\n', 'blue')
}

/**
 * Main CLI function
 */
async function main() {
  const args = process.argv.slice(2)
  const command = args[0]

  // Show help
  if (!command || command === 'help' || command === '--help' || command === '-h') {
    displayHelp()
    return
  }

  // Init command
  if (command === 'init' || command === 'setup') {
    log('\n' + '='.repeat(60), 'blue')
    log('  🚀 tailwindcss-corner-shape - Interactive Setup', 'bright')
    log('='.repeat(60), 'blue')

    // Find Tailwind config
    const config = findTailwindConfig()

    if (!config) {
      log('\n⚠ No tailwind.config file found in current directory', 'yellow')
      log('  Please run this command from your project root.', 'reset')
      log('\n  Or add the plugin manually:\n', 'reset')
      log('  import cornerShapePlugin from \'tailwindcss-corner-shape\'', 'cyan')
      log('  export default { plugins: [cornerShapePlugin()] }', 'cyan')
      return
    }

    log(`\n📝 Found: ${config.name}`, 'blue')

    // Add plugin to config
    const success = await addPluginToConfig(config.path, config.name)

    if (success) {
      log('\n✨ Success! Plugin configured!', 'green')
      log('\n🎯 All your rounded-* classes now have modern corner-shape!', 'bright')
      log('   No code changes needed - it just works! ✨\n', 'reset')
    } else {
      log('\n⚠ Could not auto-configure. Please add manually:', 'yellow')
      log('  import cornerShapePlugin from \'tailwindcss-corner-shape\'', 'cyan')
      log('  export default { plugins: [cornerShapePlugin()] }', 'cyan')
    }

    log('='.repeat(60) + '\n', 'blue')
  } else {
    log(`\n✗ Unknown command: ${command}`, 'red')
    log('  Run "npx tailwindcss-corner-shape help" for usage information\n', 'reset')
  }
}

// Run the CLI
main().catch((error) => {
  log(`\n✗ Error: ${error.message}`, 'red')
  process.exit(1)
})
