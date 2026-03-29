import type { Rect, Interval, Point } from './wrap-geometry'

export type { Rect, Interval, Point }

export interface PositionedLine {
  readonly x: number
  readonly y: number
  readonly width: number
  readonly text: string
  readonly lineIndex: number
}

export interface ColumnRegion {
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
}

export interface ColumnLayout {
  readonly region: ColumnRegion
  readonly lines: readonly PositionedLine[]
}

export type BandObstacle =
  | {
      readonly kind: 'polygon'
      readonly points: readonly Point[]
      readonly horizontalPadding: number
      readonly verticalPadding: number
    }
  | {
      readonly kind: 'rects'
      readonly rects: readonly Rect[]
      readonly horizontalPadding: number
      readonly verticalPadding: number
    }
  | {
      readonly kind: 'circle'
      readonly cx: number
      readonly cy: number
      readonly radius: number
      readonly horizontalPadding: number
      readonly verticalPadding: number
    }

export interface LayoutOutput {
  readonly columns: readonly ColumnLayout[]
  readonly totalHeight: number
}
