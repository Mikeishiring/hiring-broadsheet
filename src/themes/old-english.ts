// Old English theme — blackletter typography on aged parchment.
// Inspired by 16th-century printed books: heavy gothic typefaces,
// warm yellowed paper, deep brown ink, and ornamental accents.
//
// Uses UnifrakturMaguntia for headlines (Google Font, loaded in index.html)
// and IM Fell English for body text (Google Font, excellent period feel).

import { createTheme } from './create-theme.ts'
import { medievalImageOverrides } from '../content/medieval-svgs.ts'
import type { BroadsheetTheme } from './types.ts'

export const oldEnglish: BroadsheetTheme = createTheme({
  id: 'old-english',
  name: 'Old English',

  colors: {
    // Aged parchment — warmer and darker than the modern parchment theme
    paper: '#e8d5b0',
    // Deep brown-black ink, like iron gall ink on vellum
    ink: '#1a1008',
    // Faded brown for secondary text
    muted: '#5c4a32',
    // Deep crimson — the color of rubricated initials and chapter marks
    accent: '#8b1a1a',
  },

  typography: {
    // IM Fell English — period-appropriate serif with authentic irregularity
    // Falls back to Georgia which has similar thick/thin contrast
    bodyFont: '19px "IM Fell English", "Palatino Linotype", "Book Antiqua", Georgia, serif',
    bodyLineHeight: 34,
    // UnifrakturMaguntia — authentic blackletter/Fraktur for headlines
    // Falls back to serif if font hasn't loaded yet
    headlineFamily: '"UnifrakturMaguntia", "Old English Text MT", "Luminari", "Book Antiqua", serif',
    creditFont: '11px "IM Fell English SC", "Palatino Linotype", Georgia, serif',
  },

  atmosphere: {
    enabled: true,
    layers: [
      // Warm aging stain from bottom-left corner (like water damage on old paper)
      {
        gradient: 'radial-gradient(ellipse 90% 70% at 15% 85%, rgba(120, 80, 30, 0.12) 0%, transparent 70%)',
        opacity: 1,
      },
      // Subtle darkening at edges (vignette, like aging at page margins)
      {
        gradient: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, rgba(60, 40, 15, 0.08) 100%)',
        opacity: 1,
      },
      // Warm light from top-right (as if illuminated by candle or window)
      {
        gradient: 'radial-gradient(ellipse 50% 40% at 80% 10%, rgba(220, 180, 100, 0.08) 0%, transparent 65%)',
        opacity: 1,
      },
    ],
  },

  layout: {
    columnCount: 2,
    // Wider margins — period printing used generous margins for marginalia
    margin: 64,
    // Wider gutter — old books had visible column separation
    gutter: 48,
    // Lower top offset to give the headline more presence
    topOffset: 80,
  },

  dropCapStyle: {
    ornamental: true,
    // Deep parchment behind the letter
    background: '#d4bb8a',
    // Dark brown ornamental border
    borderColor: '#5c4a32',
  },

  imageOverrides: medievalImageOverrides,
})
