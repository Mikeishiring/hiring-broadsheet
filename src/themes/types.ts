// Theme type definitions for Broadsheet editorial themes

export interface ThemeColors {
  readonly paper: string
  readonly ink: string
  readonly muted: string
  readonly accent: string
}

export interface ThemeTypography {
  readonly bodyFont: string
  readonly bodyLineHeight: number
  readonly headlineFamily: string
  readonly creditFont: string
}

export interface AtmosphereLayer {
  readonly gradient: string
  readonly opacity: number
}

export interface ThemeAtmosphere {
  readonly enabled: boolean
  readonly layers: readonly AtmosphereLayer[]
}

export interface ThemeLayout {
  readonly columnCount: 2
  readonly margin: number
  readonly gutter: number
  readonly topOffset: number
}

export interface BroadsheetTheme {
  readonly id: string
  readonly name: string
  readonly colors: ThemeColors
  readonly typography: ThemeTypography
  readonly atmosphere: ThemeAtmosphere
  readonly layout: ThemeLayout
}
