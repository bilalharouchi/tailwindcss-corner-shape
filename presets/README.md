# Tailwind CSS v4 Presets

Pre-configured corner-shape plugins ready to use with Tailwind CSS v4's `@plugin` directive.

## Quick Start (Tailwind v4)

In your CSS file (e.g., `app/globals.css`):

```css
@import "tailwindcss";
@plugin "tailwindcss-corner-shape/presets/squircle";
```

That's it! All your `rounded-*` classes now have the squircle corner-shape.

## Available Presets

### `squircle` (Default - iOS-style)
Modern iOS-like squircle corners
```css
@plugin "tailwindcss-corner-shape/presets/squircle";
```

### `very-rounded`
Soft, highly rounded corners - `superellipse(1.5)`
```css
@plugin "tailwindcss-corner-shape/presets/very-rounded";
```

### `moderately-rounded`
Balanced modern corners - `superellipse(1.8)`
```css
@plugin "tailwindcss-corner-shape/presets/moderately-rounded";
```

### `slightly-rounded`
Subtle smooth corners - `superellipse(2.5)`
```css
@plugin "tailwindcss-corner-shape/presets/slightly-rounded";
```

### `round`
Perfect circles (standard border-radius)
```css
@plugin "tailwindcss-corner-shape/presets/round";
```

### `bevel`
Industrial straight chamfered edges
```css
@plugin "tailwindcss-corner-shape/presets/bevel";
```

## Custom Configuration (Tailwind v4)

For custom options, create a wrapper file:

```javascript
// corner-shape.config.js
import cornerShapePlugin from 'tailwindcss-corner-shape'

export default cornerShapePlugin({
  default: 'superellipse(1.7)',
  variants: {
    sm: 'bevel',
    lg: 'squircle',
  }
})
```

Then in your CSS:
```css
@import "tailwindcss";
@plugin "./corner-shape.config.js";
```

## Tailwind v3 Usage

For Tailwind v3, use the plugin in your `tailwind.config.js`:

```javascript
import cornerShapePlugin from 'tailwindcss-corner-shape'

export default {
  plugins: [
    cornerShapePlugin({ default: 'squircle' })
  ]
}
```

Or use named exports:
```javascript
import { squircle } from 'tailwindcss-corner-shape'

export default {
  plugins: [squircle]
}
```
