// Parchment theme — warm, old English editorial aesthetic.
// Colors drawn from pretext's dynamic-layout demo, serif typography stack.

import type { BroadsheetTheme } from './types.ts'

export const parchment: BroadsheetTheme = {
  id: 'parchment',
  name: 'Parchment',

  colors: {
    paper: '#f6f0e6',
    ink: '#11100d',
    muted: '#4f463b',
    accent: '#d97757',
  },

  typography: {
    bodyFont: '20px "Iowan Old Style", "Palatino Linotype", "Book Antiqua", Palatino, "Noto Serif", Georgia, serif',
    bodyLineHeight: 32,
    headlineFamily: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Palatino, "Noto Serif", Georgia, serif',
    creditFont: '12px "Helvetica Neue", Helvetica, Arial, sans-serif',
  },

  atmosphere: {
    enabled: true,
    layers: [
      {
        gradient: 'radial-gradient(ellipse 80% 60% at 10% 90%, rgba(90, 120, 160, 0.08) 0%, transparent 70%)',
        opacity: 1,
      },
      {
        gradient: 'radial-gradient(ellipse 60% 50% at 85% 15%, rgba(200, 160, 100, 0.06) 0%, transparent 65%)',
        opacity: 1,
      },
    ],
  },

  layout: {
    columnCount: 2,
    margin: 52,
    gutter: 40,
    topOffset: 72,
  },
}
