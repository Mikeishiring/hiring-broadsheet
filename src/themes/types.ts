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

export interface ThemeDropCapStyle {
  // When true, the drop cap renders inside an ornamental border box
  // (illuminated initial style, like 16th-century printed books)
  readonly ornamental: boolean
  // Background color behind the drop cap letter
  readonly background?: string
  // Border color for the ornamental box
  readonly borderColor?: string
}

export interface BroadsheetTheme {
  readonly id: string
  readonly name: string
  readonly colors: ThemeColors
  readonly typography: ThemeTypography
  readonly atmosphere: ThemeAtmosphere
  readonly layout: ThemeLayout
  readonly dropCapStyle?: ThemeDropCapStyle
  // Map of page ID → SVG data URL to replace the default obstacle image
  readonly imageOverrides?: Readonly<Record<string, string>>
}
