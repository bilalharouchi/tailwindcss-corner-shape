import plugin from 'tailwindcss/plugin'

/**
 * 🚀 Tailwind CSS Corner Shape Plugin
 *
 * **Zero-config plugin** that automatically applies modern CSS `corner-shape` to ALL `rounded-*` utilities.
 * Just install, add to plugins, and you're done - no configuration needed!
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/corner-shape
 *
 * ## Installation
 *
 * ```bash
 * npm install tailwindcss-corner-shape
 * ```
 *
 * ## Usage (Zero Config!)
 *
 * ```js
 * // tailwind.config.js
 * import cornerShapePlugin from 'tailwindcss-corner-shape'
 *
 * export default {
 *   plugins: [
 *     cornerShapePlugin(),  // That's it! 🎉
 *   ]
 * }
 * ```
 *
 * Now ALL your `rounded-*` classes automatically have modern corner shapes:
 *
 * ```tsx
 * <div className="rounded-lg">        // ✨ Auto corner-shape!
 * <div className="rounded-xl">        // ✨ Auto corner-shape!
 * <div className="rounded-[20px]">   // ✨ Auto corner-shape!
 * ```
 *
 * ## Advanced Configuration (Optional)
 *
 * You can use any CSS corner-shape value - keywords or superellipse():
 *
 * ```js
 * cornerShapePlugin({
 *   default: 'squircle',  // Use keywords (DEFAULT)
 *   // Or use superellipse: default: 'superellipse(1.4)'
 *
 *   // Different shapes for different sizes
 *   variants: {
 *     sm: 'bevel',
 *     lg: 'squircle',
 *     full: 'superellipse(2)',
 *   }
 * })
 * ```
 *
 * ## Corner Shape Reference
 * - `'square'` / `superellipse(infinity)` : Square corners
 * - `'squircle'` / `superellipse(2)` : iOS-style squircle (DEFAULT)
 * - `'round'` / `superellipse(1)` : Perfect round (standard border-radius)
 * - `'bevel'` / `superellipse(0)` : Straight line chamfer
 * - `'scoop'` / `superellipse(-1)` : Concave corners
 * - `'notch'` / `superellipse(-infinity)` : Deep notch
 *
 * ## Browser Support
 * - ✅ Chrome 139+, Edge 139+, Opera 123+
 * - ⏳ Firefox, Safari (coming soon)
 * - 🌐 Graceful fallback for unsupported browsers
 */

// Default corner shape value
const DEFAULT_CORNER_SHAPE = 'squircle'

/**
 * Valid corner shape keywords from the CSS spec
 */
type CornerShapeKeyword = 'round' | 'scoop' | 'bevel' | 'notch' | 'square' | 'squircle'

/**
 * A corner shape value can be:
 * - A keyword: 'round', 'scoop', 'bevel', 'notch', 'square', 'squircle'
 * - A superellipse function: 'superellipse(1.4)', 'superellipse(-1)', etc.
 */
type CornerShapeValue = CornerShapeKeyword | `superellipse(${number})` | string

interface CornerShapePluginOptions {
  /**
   * Default corner-shape value to apply to all rounded-* classes
   * @default 'squircle'
   *
   * Can be any valid CSS corner-shape value:
   * - Keywords: 'round', 'scoop', 'bevel', 'notch', 'square', 'squircle'
   * - Superellipse: 'superellipse(1.4)', 'superellipse(-1)', etc.
   *
   * Reference:
   * - 'square' / superellipse(infinity)  : Square corners
   * - 'squircle' / superellipse(2)       : iOS-style squircle
   * - 'round' / superellipse(1)          : Perfect round (default border-radius)
   * - 'bevel' / superellipse(0)          : Straight line chamfer
   * - 'scoop' / superellipse(-1)         : Concave corners
   * - 'notch' / superellipse(-infinity)  : Deep notch
   */
  default?: CornerShapeValue

  /**
   * Override corner-shape values for specific border-radius sizes
   * @example { sm: 'bevel', lg: 'squircle', full: 'superellipse(2)' }
   */
  variants?: Record<string, CornerShapeValue>

  /**
   * Exclude specific rounded-* classes from having corner-shape applied
   * @example ['rounded-full', 'rounded-none']
   */
  exclude?: string[]

  /**
   * Add !important to all corner-shape declarations
   * Useful if you have conflicting styles
   * @default false
   */
  important?: boolean

  /**
   * Disable automatic override of rounded-* classes
   * If false, you'll need to manually add corner-shape utilities
   * @default true
   */
  enabled?: boolean
}

/**
 * Tailwind CSS Corner Shape Plugin
 *
 * Zero-config plugin that automatically applies corner-shape to all rounded-* utilities.
 * Uses the user's existing borderRadius theme values - no additional configuration needed!
 */
const cornerShapePlugin = plugin.withOptions<CornerShapePluginOptions>(
  (options = {}) => {
    const {
      default: defaultShape = DEFAULT_CORNER_SHAPE,
      variants = {},
      exclude = [],
      important = false,
      enabled = true,
    } = options

    // If plugin is disabled, don't do anything
    if (!enabled) {
      return function() {}
    }

    return function({ addUtilities, matchUtilities, theme, e }) {
      // Get the user's existing borderRadius values from their config
      const borderRadius = theme('borderRadius')
      const overrideUtilities: Record<string, any> = {}

      /**
       * Helper to get the corner-shape value for a specific variant
       */
      const getCornerShapeValue = (key: string): string => {
        // Check if this variant has a specific corner-shape value
        const variantValue = variants[key]
        if (variantValue !== undefined) {
          return variantValue
        }
        // Otherwise use the default
        return defaultShape
      }

      /**
       * Helper to check if a class should be excluded
       */
      const isExcluded = (className: string): boolean => {
        return exclude.includes(className) || exclude.includes(`rounded-${className}`)
      }

      // Override ALL rounded-* size variants (lg, xl, 2xl, etc.)
      // This automatically picks up custom borderRadius from the user's config!
      if (borderRadius) {
        Object.entries(borderRadius).forEach(([key, value]) => {
          if (key === 'DEFAULT') return
          if (isExcluded(key) || isExcluded(`rounded-${key}`)) return

          const cornerShape = getCornerShapeValue(key)
          overrideUtilities[`.${e(`rounded-${key}`)}`] = {
            borderRadius: value,
            'corner-shape': important ? `${cornerShape} !important` : cornerShape,
          }
        })
      }

      // Override rounded-full (unless excluded)
      if (!isExcluded('full') && !isExcluded('rounded-full')) {
        const cornerShape = getCornerShapeValue('full')
        overrideUtilities['.rounded-full'] = {
          borderRadius: '9999px',
          'corner-shape': important ? `${cornerShape} !important` : cornerShape,
        }
      }

      // Override rounded (base) (unless excluded)
      if (!isExcluded('rounded')) {
        const cornerShape = getCornerShapeValue('base')
        overrideUtilities['.rounded'] = {
          borderRadius: '0.25rem',
          'corner-shape': important ? `${cornerShape} !important` : cornerShape,
        }
      }

      // Override rounded-none (keep it square) (unless excluded)
      if (!isExcluded('none') && !isExcluded('rounded-none')) {
        overrideUtilities['.rounded-none'] = {
          borderRadius: '0',
          'corner-shape': important ? 'square !important' : 'square',
        }
      }

      addUtilities(overrideUtilities, { respectPrefix: false, respectImportant: true })

      // Handle arbitrary values like rounded-[20px], rounded-[1.5rem], etc.
      matchUtilities(
        {
          rounded: (value) => {
            return {
              borderRadius: value,
              'corner-shape': important ? `${defaultShape} !important` : defaultShape,
            }
          },
        },
        { type: ['length', 'percentage'] }
      )
    }
  }
)

// Default export (configurable)
export default cornerShapePlugin

// Named export for backwards compatibility
export { cornerShapePlugin }

// Export types
export type { CornerShapePluginOptions }

// Preconfigured presets for easy use (especially useful for Tailwind v4)
export const squircle = cornerShapePlugin({ default: 'squircle' })
export const round = cornerShapePlugin({ default: 'round' })
export const bevel = cornerShapePlugin({ default: 'bevel' })
export const veryRounded = cornerShapePlugin({ default: 'superellipse(1.5)' })
export const moderatelyRounded = cornerShapePlugin({ default: 'superellipse(1.8)' })
export const slightlyRounded = cornerShapePlugin({ default: 'superellipse(2.5)' })
