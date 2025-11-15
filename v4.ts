/**
 * Tailwind CSS v4 Compatible Corner Shape Plugin
 *
 * This version doesn't use plugin.withOptions which is incompatible with v4.
 * Instead, it directly exports the plugin function.
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
  default?: CornerShapeValue
  variants?: Record<string, CornerShapeValue>
  exclude?: string[]
  important?: boolean
  enabled?: boolean
}

/**
 * Create a v4-compatible corner shape plugin
 */
function createCornerShapePlugin(options: CornerShapePluginOptions = {}) {
  const {
    default: defaultShape = DEFAULT_CORNER_SHAPE,
    variants = {},
    exclude = [],
    important = false,
    enabled = true,
  } = options

  // Return the plugin function directly (v4 compatible)
  return function({ addUtilities, matchUtilities, theme }: any) {
    // If plugin is disabled, don't do anything
    if (!enabled) {
      return
    }

    // Get the user's existing borderRadius values from their config
    const borderRadius = theme('borderRadius')
    const overrideUtilities: Record<string, any> = {}

    /**
     * Helper to get the corner-shape value for a specific variant
     */
    const getCornerShapeValue = (key: string): string => {
      const variantValue = variants[key]
      if (variantValue !== undefined) {
        return variantValue
      }
      return defaultShape
    }

    /**
     * Helper to check if a class should be excluded
     */
    const isExcluded = (className: string): boolean => {
      return exclude.includes(className) || exclude.includes(`rounded-${className}`)
    }

    // Override ALL rounded-* size variants (lg, xl, 2xl, etc.)
    if (borderRadius) {
      Object.entries(borderRadius).forEach(([key, value]) => {
        if (key === 'DEFAULT') return
        if (isExcluded(key) || isExcluded(`rounded-${key}`)) return

        const cornerShape = getCornerShapeValue(key)
        overrideUtilities[`.rounded-${key}`] = {
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
        rounded: (value: any) => {
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

// Export pre-configured presets for v4
export const squircle = createCornerShapePlugin({ default: 'squircle' })
export const round = createCornerShapePlugin({ default: 'round' })
export const bevel = createCornerShapePlugin({ default: 'bevel' })
export const veryRounded = createCornerShapePlugin({ default: 'superellipse(1.5)' })
export const moderatelyRounded = createCornerShapePlugin({ default: 'superellipse(1.8)' })
export const slightlyRounded = createCornerShapePlugin({ default: 'superellipse(2.5)' })

// Default export
export default createCornerShapePlugin

// Also export the factory function
export { createCornerShapePlugin }
export type { CornerShapePluginOptions }
