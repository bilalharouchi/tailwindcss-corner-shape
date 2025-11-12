# Changelog

All notable changes to the Tailwind CSS Corner Shape Plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
