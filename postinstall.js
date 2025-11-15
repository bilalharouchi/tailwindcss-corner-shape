#!/usr/bin/env node

/**
 * Postinstall script for tailwindcss-corner-shape
 * Supports both Tailwind CSS v3 (tailwind.config.ts/js) and v4 (@import in CSS)
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
 * Find CSS files that import Tailwind (v4 detection)
 */
function findTailwindV4CSS() {
  const projectRoot = path.resolve(__dirname, '../../')

  // Possible CSS file locations in v4 projects
  const possiblePaths = [
    'app/globals.css',
    'src/app/globals.css',
    'styles/globals.css',
    'src/styles/globals.css',
    'app/styles.css',
    'src/index.css',
    'styles/main.css',
  ]

  for (const cssPath of possiblePaths) {
    const fullPath = path.join(projectRoot, cssPath)
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8')
      // Check if it's a Tailwind v4 CSS file
      if (content.includes('@import "tailwindcss"') || content.includes("@import 'tailwindcss'")) {
        return { path: fullPath, name: cssPath, content }
      }
    }
  }

  return null
}

/**
 * Find the Tailwind config file (v3 detection)
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
 * Check if the plugin is already added in v4 CSS
 */
function isPluginAlreadyAddedV4(content) {
  return content.includes('@plugin "tailwindcss-corner-shape') ||
         content.includes("@plugin 'tailwindcss-corner-shape")
}

/**
 * Check if the plugin is already in the v3 config
 */
function isPluginAlreadyAddedV3(content) {
  return (
    content.includes('tailwindcss-corner-shape') ||
    content.includes('cornerShapePlugin') ||
    content.includes('corner-shape-plugin')
  )
}

/**
 * Corner shape presets for v4
 */
const V4_PRESETS = {
  '1': {
    name: 'iOS Squircle (Default)',
    description: 'Modern iOS-like corners - balanced and contemporary',
    directive: '@plugin "tailwindcss-corner-shape/presets/squircle";'
  },
  '2': {
    name: 'Very Rounded',
    description: 'Soft, highly rounded corners for a friendly look',
    directive: '@plugin "tailwindcss-corner-shape/presets/very-rounded";'
  },
  '3': {
    name: 'Moderately Rounded',
    description: 'Subtle modern corners - not too round',
    directive: '@plugin "tailwindcss-corner-shape/presets/moderately-rounded";'
  },
  '4': {
    name: 'Classic Round',
    description: 'Standard border-radius style',
    directive: '@plugin "tailwindcss-corner-shape/presets/round";'
  },
  '5': {
    name: 'Bevel (Industrial)',
    description: 'Straight chamfered edges for technical UI',
    directive: '@plugin "tailwindcss-corner-shape/presets/bevel";'
  },
}

/**
 * Corner shape presets for v3
 */
const V3_PRESETS = {
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
    name: 'Classic Round',
    description: 'Standard border-radius style',
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
function displayMenu(presets) {
  log('\n╔══════════════════════════════════════════════════════════╗', 'cyan')
  log('║          Choose Your Corner Shape Style 🎨              ║', 'bright')
  log('╚══════════════════════════════════════════════════════════╝', 'cyan')

  Object.entries(presets).forEach(([key, preset]) => {
    log(`\n  ${key}. ${preset.name}`, 'bright')
    log(`     ${preset.description}`, 'reset')
  })

  log('\n──────────────────────────────────────────────────────────', 'cyan')
}

/**
 * Ask user for their preference
 */
function askUserPreference(presets) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    displayMenu(presets)

    const maxChoice = Object.keys(presets).length
    rl.question(`\nChoose a style (1-${maxChoice}) or press Enter for default [1]: `, (answer) => {
      rl.close()
      const choice = answer.trim() || '1'
      const preset = presets[choice]

      if (!preset) {
        log('\n⚠ Invalid choice, using default (iOS Squircle)', 'yellow')
        resolve(presets['1'])
      } else {
        log(`\n✓ Selected: ${preset.name}`, 'green')
        resolve(preset)
      }
    })
  })
}

/**
 * Add @plugin directive to Tailwind v4 CSS file
 */
async function addPluginToV4CSS(cssFile) {
  try {
    let content = cssFile.content

    // Check if already added
    if (isPluginAlreadyAddedV4(content)) {
      log('\n✓ Plugin already configured in ' + cssFile.name, 'green')
      return true
    }

    // Ask user for preference (only if not in CI)
    let userPreset = V4_PRESETS['1'] // Default
    if (!process.env.CI && process.stdin.isTTY) {
      userPreset = await askUserPreference(V4_PRESETS)
    }

    // Find the line with @import "tailwindcss"
    const lines = content.split('\n')
    let importIndex = -1

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('@import "tailwindcss"') || lines[i].includes("@import 'tailwindcss'")) {
        importIndex = i
        break
      }
    }

    if (importIndex === -1) {
      log('\n⚠ Could not find @import "tailwindcss" in CSS file', 'yellow')
      return false
    }

    // Insert @plugin directive after @import "tailwindcss"
    lines.splice(importIndex + 1, 0, userPreset.directive)

    // Write back to file
    fs.writeFileSync(cssFile.path, lines.join('\n'), 'utf8')
    return true
  } catch (error) {
    log(`\n✗ Error updating CSS: ${error.message}`, 'red')
    return false
  }
}

/**
 * Add import/require statement for the plugin (v3)
 */
function addImportStatement(content, isESM) {
  if (isESM) {
    const lines = content.split('\n')
    let lastImportIndex = -1

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith('import ')) {
        lastImportIndex = i
      }
    }

    if (lastImportIndex !== -1) {
      lines.splice(lastImportIndex + 1, 0, "import cornerShapePlugin from 'tailwindcss-corner-shape'")
      return lines.join('\n')
    } else {
      return `import cornerShapePlugin from 'tailwindcss-corner-shape'\n\n${content}`
    }
  } else {
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
 * Add plugin to the plugins array with user's chosen configuration (v3)
 */
function addToPluginsArray(content, pluginConfig) {
  const lines = content.split('\n')
  let pluginsLineIndex = -1
  let pluginsIndent = ''

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.match(/plugins:\s*\[/)) {
      pluginsLineIndex = i
      const match = line.match(/^(\s*)plugins/)
      if (match) {
        pluginsIndent = match[1]
      }
      break
    }
  }

  if (pluginsLineIndex === -1) {
    return content
  }

  const pluginsLine = lines[pluginsLineIndex]

  if (pluginsLine.includes(']')) {
    if (pluginsLine.includes('[]')) {
      lines[pluginsLineIndex] = pluginsLine.replace('[]', `[${pluginConfig}]`)
    } else {
      lines[pluginsLineIndex] = pluginsLine.replace('[', '[\n' + pluginsIndent + '\t\t' + pluginConfig + ',\n' + pluginsIndent + '\t')
    }
  } else {
    lines.splice(pluginsLineIndex + 1, 0, pluginsIndent + '\t\t' + pluginConfig + ',')
  }

  return lines.join('\n')
}

/**
 * Add the plugin to the Tailwind v3 config
 */
async function addPluginToV3Config(configPath, configName) {
  try {
    let content = fs.readFileSync(configPath, 'utf8')

    if (isPluginAlreadyAddedV3(content)) {
      log('\n✓ Plugin already configured in ' + configName, 'green')
      return true
    }

    const isESM = configName.endsWith('.mjs') || configName.endsWith('.ts') || content.includes('export default')

    let userPreset = V3_PRESETS['1']
    if (!process.env.CI && process.stdin.isTTY) {
      userPreset = await askUserPreference(V3_PRESETS)
    }

    content = addImportStatement(content, isESM)
    content = addToPluginsArray(content, userPreset.config)

    fs.writeFileSync(configPath, content, 'utf8')
    return true
  } catch (error) {
    log(`\n✗ Error updating config: ${error.message}`, 'red')
    return false
  }
}

/**
 * Main function
 */
async function main() {
  // Skip if running in CI or if explicitly disabled
  if (process.env.CI || process.env.TAILWIND_CORNER_SHAPE_SKIP_SETUP) {
    log('\n⊘ Skipping auto-setup (CI or disabled)', 'yellow')
    return
  }

  log('\n' + '='.repeat(60), 'blue')
  log('  🚀 tailwindcss-corner-shape - Interactive Setup', 'bright')
  log('='.repeat(60), 'blue')

  // Try to detect Tailwind v4 first
  const v4CSS = findTailwindV4CSS()

  if (v4CSS) {
    log(`\n📝 Found Tailwind CSS v4: ${v4CSS.name}`, 'blue')

    const success = await addPluginToV4CSS(v4CSS)

    if (success) {
      log('\n✨ Success! Plugin automatically configured for Tailwind v4!', 'green')
      log('\n🎯 All your rounded-* classes now have modern corner-shape!', 'bright')
      log('   No code changes needed - it just works! ✨\n', 'reset')
    } else {
      log('\n⚠ Could not auto-configure. Please add manually to your CSS:', 'yellow')
      log('  @import "tailwindcss";', 'reset')
      log('  @plugin "tailwindcss-corner-shape/presets/squircle";', 'reset')
    }

    log('='.repeat(60) + '\n', 'blue')
    return
  }

  // Fallback to Tailwind v3 config
  const v3Config = findTailwindConfig()

  if (!v3Config) {
    log('\n⚠ No Tailwind CSS config or import found', 'yellow')
    log('  For Tailwind v4, add to your CSS file:', 'reset')
    log('    @import "tailwindcss";', 'reset')
    log('    @plugin "tailwindcss-corner-shape/presets/squircle";', 'reset')
    log('\n  For Tailwind v3, add to tailwind.config.ts/js:', 'reset')
    log('    import cornerShapePlugin from \'tailwindcss-corner-shape\'', 'reset')
    log('    export default { plugins: [cornerShapePlugin()] }', 'reset')
    return
  }

  log(`\n📝 Found Tailwind CSS v3: ${v3Config.name}`, 'blue')

  const success = await addPluginToV3Config(v3Config.path, v3Config.name)

  if (success) {
    log('\n✨ Success! Plugin automatically configured for Tailwind v3!', 'green')
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
