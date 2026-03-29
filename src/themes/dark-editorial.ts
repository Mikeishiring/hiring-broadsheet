// Dark Editorial theme — inverted warm editorial aesthetic.
// Dark background with gold accents, same serif typography.

import { createTheme } from './create-theme.ts'
import type { BroadsheetTheme } from './types.ts'

export const darkEditorial: BroadsheetTheme = createTheme({
  id: 'dark-editorial',
  name: 'Dark Editorial',

  colors: {
    paper: '#0a0a08',
    ink: '#e8e0d0',
    muted: '#9a8e7a',
    accent: '#c9a84c',
  },

  atmosphere: {
    enabled: true,
    layers: [
      {
        gradient:
          'radial-gradient(ellipse 80% 60% at 10% 90%, rgba(201, 168, 76, 0.06) 0%, transparent 70%)',
        opacity: 1,
      },
      {
        gradient:
          'radial-gradient(ellipse 60% 50% at 85% 15%, rgba(180, 140, 60, 0.04) 0%, transparent 65%)',
        opacity: 1,
      },
      {
        gradient:
          'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(201, 168, 76, 0.02) 0%, transparent 60%)',
        opacity: 1,
      },
    ],
  },
})
