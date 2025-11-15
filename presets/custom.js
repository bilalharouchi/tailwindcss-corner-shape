/**
 * Custom preset for Tailwind CSS v4
 *
 * Exemple avec différentes corner-shapes pour chaque taille
 */
import { createCornerShapePlugin } from '../dist/v4.mjs'

export default createCornerShapePlugin({
  // Corner-shape par défaut
  default: 'squircle',

  // Variants différents par taille
  variants: {
    'sm': 'round',              // rounded-sm sera "round"
    'base': 'squircle',         // rounded (base) sera "squircle"
    'lg': 'squircle',           // rounded-lg sera "squircle"
    'xl': 'bevel',              // rounded-xl sera "bevel"
    '2xl': 'superellipse(1.5)', // rounded-2xl sera très arrondi
    '3xl': 'superellipse(2.5)', // rounded-3xl sera légèrement arrondi
    'full': 'round'             // rounded-full sera "round"
  },

  // Exclure certaines classes si besoin
  exclude: [],

  // Ajouter !important sur toutes les propriétés
  important: false,

  // Activer/désactiver le plugin
  enabled: true
})
