# 🚀 Tailwind CSS Corner Shape Plugin

[![npm version](https://img.shields.io/npm/v/tailwindcss-corner-shape.svg)](https://www.npmjs.com/package/tailwindcss-corner-shape)
[![npm downloads](https://img.shields.io/npm/dm/tailwindcss-corner-shape.svg)](https://www.npmjs.com/package/tailwindcss-corner-shape)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern Tailwind CSS plugin that automatically applies the new CSS `corner-shape` property to all rounded utilities, giving your app a contemporary iOS-like aesthetic.

## ✨ Features

- 🎨 **Auto-applies** `corner-shape` to all `rounded-*` utilities
- 🔧 **Fully configurable** via Tailwind theme
- 📦 **Zero config** by default - works out of the box
- 🎯 **Arbitrary values** support (e.g., `rounded-[20px]`)
- 🌐 **Progressive enhancement** - graceful fallback for unsupported browsers
- 🏷️ **TypeScript** support with full type definitions
- ⚡ **Lightweight** - no runtime dependencies

## 🌐 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 139+    | ✅ Supported |
| Edge    | 139+    | ✅ Supported |
| Opera   | 123+    | ✅ Supported |
| Firefox | -       | ⏳ Coming soon |
| Safari  | -       | ⏳ Coming soon |

**Note:** Browsers that don't support `corner-shape` will gracefully fall back to standard `border-radius`.

## 📦 Installation

```bash
npm install tailwindcss-corner-shape
# or
yarn add tailwindcss-corner-shape
# or
pnpm add tailwindcss-corner-shape
```

## 🎯 Tailwind CSS v3 & v4 Support

This plugin works with **both Tailwind CSS v3 and v4**. Choose the setup that matches your Tailwind version:

### Tailwind v4 (CSS-first)

Use the `@plugin` directive in your CSS file:

```css
/* app/globals.css or styles/app.css */
@import "tailwindcss";
@plugin "tailwindcss-corner-shape/presets/squircle";
```

**Available presets for v4:**
- `squircle` - iOS-style (default)
- `very-rounded` - Soft, highly rounded
- `moderately-rounded` - Balanced modern
- `slightly-rounded` - Subtle smooth
- `round` - Perfect circles
- `bevel` - Industrial chamfer

**Custom configuration for v4:**

Create a wrapper file for custom options:

```javascript
// corner-shape.config.js
import cornerShapePlugin from 'tailwindcss-corner-shape'

export default cornerShapePlugin({
  default: 'superellipse(1.7)',
  variants: { lg: 'squircle' }
})
```

Then load it:
```css
@import "tailwindcss";
@plugin "./corner-shape.config.js";
```

### Tailwind v3 (JavaScript config)

Add the plugin to your `tailwind.config.js`:

```js
import cornerShapePlugin from 'tailwindcss-corner-shape'

export default {
  plugins: [
    cornerShapePlugin(),  // That's it! 🎉
  ],
}
```

**Or use named preset exports:**

```js
import { squircle, round, bevel } from 'tailwindcss-corner-shape'

export default {
  plugins: [squircle]  // Use any preset
}
```

---

**That's it!** All your existing `rounded-*` classes now have modern corner shapes - **NO CODE CHANGES NEEDED**:

```tsx
<div className="rounded-lg">        {/* ✨ Auto has corner-shape! */}
<button className="rounded-full">   {/* ✨ Auto has corner-shape! */}
<div className="rounded-[20px]">   {/* ✨ Auto has corner-shape! */}
```

The plugin automatically reads your existing `borderRadius` theme values, so it works with **any custom radius** you've defined!

## ⚙️ Configuration (Optional)

### Basic Configuration

Want to use a different corner shape? Use any CSS corner-shape keyword:

```js
cornerShapePlugin({
  default: 'squircle',  // 'round', 'scoop', 'bevel', 'notch', 'square', 'squircle' (default)
})
```

Or use a custom superellipse value:

```js
cornerShapePlugin({
  default: 'superellipse(1.4)',  // Any numeric value
})
```

### Advanced Configuration

Need more control? All options available:

```js
cornerShapePlugin({
  // Default corner-shape for all rounded-* classes
  default: 'squircle',  // Keyword or superellipse function

  // Different shapes for specific sizes
  variants: {
    sm: 'bevel',                 // rounded-sm uses bevel
    lg: 'squircle',              // rounded-lg uses squircle
    xl: 'superellipse(1.6)',     // rounded-xl uses custom value
    full: 'superellipse(2)',     // rounded-full - iOS squircle!
  },

  // Exclude specific classes from getting corner-shape
  exclude: ['rounded-none'],  // Don't apply to these classes

  // Add !important to corner-shape declarations (for conflicting styles)
  important: false,

  // Disable the plugin entirely
  enabled: true,
})
```

### Configuration Options Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `default` | `string` | `'squircle'` | Default corner-shape for all rounded-* classes (keyword or superellipse) |
| `variants` | `object` | `{}` | Override corner-shape for specific sizes (e.g., `{ full: 'notch' }`) |
| `exclude` | `string[]` | `[]` | Exclude classes from corner-shape (e.g., `['rounded-full']`) |
| `important` | `boolean` | `false` | Add `!important` to all corner-shape declarations |
| `enabled` | `boolean` | `true` | Enable/disable the entire plugin |

### Corner Shape Value Guide

**CSS Keywords** (recommended for simplicity):

| Keyword | Equivalent | Look | Best For |
|---------|------------|------|----------|
| `'square'` | `superellipse(infinity)` | Square corners | Remove border-radius effect |
| `'squircle'` | `superellipse(2)` | iOS squircle (default) | Modern apps, iOS design |
| `'round'` | `superellipse(1)` | Perfect round | Standard border-radius look |
| `'bevel'` | `superellipse(0)` | Straight chamfer | Industrial, technical UI |
| `'scoop'` | `superellipse(-1)` | Concave corners | Depth effects, insets |
| `'notch'` | `superellipse(-infinity)` | Deep notch | Special effects |

**Custom Superellipse Values**:

| Value | Look | Best For |
|-------|------|----------|
| `superellipse(3)` | Almost square | High-tech UI |
| `superellipse(1.5)` | Balanced modern | Contemporary design |
| `superellipse(1.4)` | Slightly rounded | General purpose |
| `superellipse(0.5)` | Soft bevel | Subtle chamfer |
| `superellipse(-1.5)` | Deep scoop | Pronounced concave |

## 🎨 Usage Examples

### It Just Works™

**Write `rounded-*` like you always did** - corner-shape is applied automatically:

```tsx
{/* Modern cards - just use rounded-xl! */}
<div className="rounded-xl bg-white shadow-lg p-6">
  <h3>Beautiful Card</h3>
</div>

{/* Buttons - just use rounded-full! */}
<button className="rounded-full bg-blue-500 px-6 py-3">
  Click Me
</button>

{/* Avatars - just use rounded-full! */}
<img src="/avatar.jpg" className="rounded-full w-20 h-20" />

{/* Custom sizes - just use rounded-[20px]! */}
<div className="rounded-[30px] bg-gradient-to-r ...">
  Works with arbitrary values too!
</div>
```

**No `corner-*` utilities needed** - just your regular `rounded-*` classes with automatic modern styling! 🎯

## 🎯 Real-World Examples

### Modern Card

```tsx
<div className="rounded-xl shadow-lg bg-white">
  <!-- Automatically has modern corner-shape -->
</div>
```

### iOS-Style Squircle Button

Configure the plugin to use squircle for rounded-full:

```js
// tailwind.config.js
cornerShapePlugin({
  variants: {
    full: 'squircle',  // or 'superellipse(2)'
  }
})
```

Then just use regular rounded-full:

```tsx
<button className="rounded-full bg-blue-500">
  <!-- iOS squircle button -->
</button>
```

### Card with Depth Effect (Scoop)

Configure scoop as default or for specific sizes:

```js
cornerShapePlugin({
  default: 'scoop',  // All rounded-* use scoop
  // Or per-size: variants: { lg: 'scoop' }
})
```

```tsx
<div className="rounded-lg shadow-2xl">
  <!-- Concave corners add visual depth -->
</div>
```

### Industrial Look (Bevel)

```js
cornerShapePlugin({
  variants: {
    md: 'bevel',
  }
})
```

```tsx
<div className="rounded-md border-2">
  <!-- Chamfered edges for technical UI -->
</div>
```

## 🎭 Design Patterns

### Neumorphism

```tsx
<div className="rounded-xl shadow-[5px_5px_10px_#d1d1d1,-5px_-5px_10px_#ffffff]">
  <!-- Corner-shape automatically applied to rounded-xl -->
</div>
```

### Glass Morphism

Configure scoop for a specific size to add depth:

```js
cornerShapePlugin({
  variants: { '2xl': 'scoop' }
})
```

```tsx
<div className="rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20">
  <!-- Scoop adds depth to glass effect -->
</div>
```

### Material Design

```tsx
<div className="rounded-lg shadow-md">
  <!-- Soft corners with default corner-shape -->
</div>
```

## 🔍 How It Works

The plugin leverages Tailwind's `addUtilities` and `matchUtilities` APIs to:

1. **Override** all `rounded-*` classes to include `corner-shape`
2. **Support** arbitrary values like `rounded-[20px]`
3. **Read** your existing `borderRadius` theme configuration
4. **Provide** graceful fallback for unsupported browsers

Generated CSS example:

```css
.rounded-lg {
  border-radius: var(--radius);
  corner-shape: squircle;  /* or your configured value */
}

.rounded-[20px] {
  border-radius: 20px;
  corner-shape: squircle;
}
```

## 🚫 Disabling the Plugin

To disable corner-shape:

```js
cornerShapePlugin({
  enabled: false,  // Disable the plugin
})
```

Or remove the plugin entirely from your config.

## 📊 Performance

- ✅ **No runtime cost** - pure CSS
- ✅ **No JavaScript required** - static utility classes
- ✅ **Tree-shakeable** - unused utilities are purged
- ✅ **GPU-accelerated** - hardware accelerated like border-radius

## 🤝 Contributing

Contributions are welcome! This plugin is designed to be:

- **Type-safe** - Full TypeScript support
- **Well-documented** - Comprehensive inline docs
- **Tested** - Works with all Tailwind versions 3.x+
- **Maintainable** - Clean, readable code

## 📄 License

MIT © [Your Name/Organization]

## 🔗 Resources

- [MDN: corner-shape](https://developer.mozilla.org/en-US/docs/Web/CSS/corner-shape)
- [CSS Borders and Box Decorations Module Level 4](https://drafts.csswg.org/css-borders-4/#corner-shaping)
- [Tailwind CSS Plugin Documentation](https://tailwindcss.com/docs/plugins)

## 💡 Credits

Inspired by Apple's iOS design system and the modern web platform's evolving capabilities.

---

**Made with ❤️ by the community**
