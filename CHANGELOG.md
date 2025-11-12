# Changelog

All notable changes to the Tailwind CSS Corner Shape Plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.1] - 2025-01-12

### 🐛 Bug Fixes

- **Fixed postinstall script path resolution** - Now correctly finds `tailwind.config` file by using `__dirname` instead of `process.cwd()`
- **Improved reliability** - Script now works regardless of how npm executes it

## [1.2.0] - 2025-01-12

### ✨ New Features

- **Interactive Setup** - Plugin now asks users to choose their preferred corner-shape style during installation
- **6 Corner Shape Presets** - Choose from iOS Squircle, Very Rounded, Moderately Rounded, Slightly Rounded, Bevel, or Zero Config
- **Smart Defaults** - Press Enter to accept the default (iOS Squircle) or choose a number (1-6)
- **User-Friendly Menu** - Beautiful CLI interface with descriptions for each preset option
- **Automatic Configuration** - Your choice is automatically applied to the tailwind.config file

### 🎨 Available Presets

1. **iOS Squircle (Default)** - Modern iOS-like corners - balanced and contemporary
2. **Very Rounded** - Soft, highly rounded corners for a friendly look (`superellipse(1.5)`)
3. **Moderately Rounded** - Subtle modern corners - not too round (`superellipse(1.7)`)
4. **Slightly Rounded** - Minimal rounding - close to standard border-radius (`round`)
5. **Bevel (Industrial)** - Straight chamfered edges for technical UI (`bevel`)
6. **Zero Config** - No options - just use defaults (`squircle`)

### 🔧 Technical Improvements

- Interactive readline interface for user preferences
- CI/non-TTY environments automatically use defaults
- Skip setup with `TAILWIND_CORNER_SHAPE_SKIP_SETUP` environment variable

## [1.1.1] - 2025-01-12

### 🐛 Bug Fixes

- **Fixed postinstall script** - Completely rewrote the auto-setup logic for better reliability
- **Import detection** - Now correctly finds and inserts import after the last existing import statement
- **Plugin insertion** - Properly handles indentation and formatting when adding to plugins array
- **Multi-line arrays** - Correctly handles both single-line and multi-line plugin arrays
- **No more formatting issues** - Plugin is now inserted with proper commas and line breaks

### 🔧 Technical Improvements

- Replaced fragile regex patterns with line-by-line parsing
- Better indentation capture and preservation
- More robust file modification logic

## [1.1.0] - 2025-01-12

### ✨ New Features

- **Auto-setup on install** - Plugin now automatically configures itself in `tailwind.config.ts/js` after `npm install`
- **Zero manual configuration** - Just run `npm install tailwindcss-corner-shape` and you're done!
- **Intelligent detection** - Automatically finds and updates your Tailwind config file
- **Safe updates** - Detects if plugin is already configured to avoid duplicates

### 🔧 Technical

- Added `postinstall.js` script that runs after package installation
- Supports both ESM and CommonJS config formats
- Supports `.ts`, `.js`, `.mjs`, `.cjs` config files
- Can be disabled with `TAILWIND_CORNER_SHAPE_SKIP_SETUP` env variable

## [1.0.0] - 2025-01-12

### 🎉 Initial Release

#### ✨ Features

- **Auto-override** all `rounded-*` utilities with `corner-shape`
- **Configurable** default superellipse value via Tailwind theme
- **Theme integration** with `cornerShape` configuration object
- **Arbitrary values** support (e.g., `rounded-[20px]`)
- **Utility generation** for `.corner-*` classes
- **TypeScript** support with full type definitions
- **Progressive enhancement** - graceful fallback for unsupported browsers

#### 📚 Documentation

- Comprehensive README with usage examples
- Inline JSDoc documentation
- Real-world examples file (EXAMPLES.md)
- Superellipse value reference guide

#### 🎨 Default Values

- `DEFAULT: 1.4` - Balanced modern look
- `none: 'square'` - For `rounded-none`
- Built-in keywords: `round`, `squircle`, `bevel`, `scoop`, `notch`, `square`

#### ⚙️ Configuration Options

- `override: boolean` - Toggle automatic override (default: `true`)
- `generateUtilities: boolean` - Toggle utility generation (default: `true`)

#### 🔧 Technical

- Uses `plugin.withOptions` API for configuration
- Leverages `matchUtilities` for arbitrary value support
- Clean, maintainable TypeScript codebase
- Zero runtime dependencies

### 🌐 Browser Support

- Chrome 139+
- Edge 139+
- Opera 123+
- Firefox: Coming soon
- Safari: Coming soon

---

## [Unreleased]

### 🚧 Planned Features

#### v1.1.0
- [ ] Individual corner control utilities (e.g., `corner-tl-squircle`)
- [ ] Side shortcuts (e.g., `corner-t-scoop` for top corners)
- [ ] Responsive utilities (e.g., `lg:corner-squircle`)
- [ ] Dark mode variants
- [ ] Animation/transition utilities

#### v1.2.0
- [ ] CSS variable integration for dynamic values
- [ ] Preset configurations (iOS, Android, Material, Fluent)
- [ ] Performance optimizations
- [ ] Bundle size improvements

#### v2.0.0
- [ ] Full CSS Borders and Box Decorations Level 4 support
- [ ] Additional corner properties (corner-radius-adjust)
- [ ] Advanced shape combinations
- [ ] Visual regression testing

### 🐛 Known Issues

- Firefox support pending (browser implementation)
- Safari support pending (browser implementation)
- No support for individual corner shapes yet (planned for v1.1.0)

---

## Version History

### Semantic Versioning Guide

**MAJOR** (1.x.0): Breaking changes, new major features
**MINOR** (x.1.0): New features, backward compatible
**PATCH** (x.x.1): Bug fixes, backward compatible

### Release Schedule

- **Patch releases**: As needed for bug fixes
- **Minor releases**: Monthly for new features
- **Major releases**: Annually or when breaking changes needed

---

## Migration Guides

### Migrating to v1.0.0

This is the initial release - no migration needed! Just install and configure.

#### From Custom Implementation

If you were using a custom corner-shape implementation:

**Before:**
```js
// Custom plugin code
function({ addUtilities }) {
  addUtilities({
    '.rounded-lg': {
      borderRadius: '12px',
      'corner-shape': 'superellipse(1.5)',
    }
  })
}
```

**After:**
```js
import cornerShapePlugin from 'tailwindcss-corner-shape'

export default {
  theme: {
    extend: {
      cornerShape: {
        DEFAULT: 1.5,  // Your previous value
      }
    }
  },
  plugins: [
    cornerShapePlugin(),
  ]
}
```

---

## Contributing

Want to contribute? Check out:
- [GitHub Issues](https://github.com/yourusername/tailwindcss-corner-shape/issues)
- [Pull Requests](https://github.com/yourusername/tailwindcss-corner-shape/pulls)

---

**Maintainer:** Bellamy Design System Team
**License:** MIT
**Last Updated:** 2025-01-12
