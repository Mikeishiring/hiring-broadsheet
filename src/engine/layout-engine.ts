import { layoutNextLine, type LayoutCursor, type PreparedTextWithSegments } from '@chenglou/pretext'
import { getPrepared } from './prepare-cache'
import {
  carveTextLineSlots,
  getPolygonIntervalForBand,
  getRectIntervalsForBand,
  getCircleIntervalForBand,
  type Interval,
} from './wrap-geometry'
import type { BandObstacle, ColumnRegion, PositionedLine, ColumnLayout, LayoutOutput } from './types'

// Layout a single column of text, respecting obstacles.
// Returns positioned lines and the cursor where text was exhausted.
function layoutColumn(
  prepared: PreparedTextWithSegments,
  startCursor: LayoutCursor,
  region: ColumnRegion,
  lineHeight: number,
  obstacles: readonly BandObstacle[],
  side: 'left' | 'right',
): { lines: PositionedLine[]; cursor: LayoutCursor } {
  let cursor: LayoutCursor = startCursor
  let lineTop = region.y
  const lines: PositionedLine[] = []
  let lineIndex = 0

  while (lineTop + lineHeight <= region.y + region.height) {
    const bandTop = lineTop
    const bandBottom = lineTop + lineHeight
    const blocked: Interval[] = []

    for (const obstacle of obstacles) {
      const intervals = getObstacleIntervals(obstacle, bandTop, bandBottom)
      for (const interval of intervals) {
        blocked.push(interval)
      }
    }

    const slots = carveTextLineSlots(
      { left: region.x, right: region.x + region.width },
      blocked,
    )

    if (slots.length === 0) {
      lineTop += lineHeight
      continue
    }

    // Pick the widest slot, preferring the side-appropriate one on ties
    let slot = slots[0]!
    for (let i = 1; i < slots.length; i++) {
      const candidate = slots[i]!
      const bestWidth = slot.right - slot.left
      const candidateWidth = candidate.right - candidate.left
      if (candidateWidth > bestWidth) {
        slot = candidate
      } else if (candidateWidth === bestWidth) {
        if (side === 'left' && candidate.left < slot.left) slot = candidate
        if (side === 'right' && candidate.left > slot.left) slot = candidate
      }
    }

    const width = slot.right - slot.left
    const line = layoutNextLine(prepared, cursor, width)
    if (line === null) break

    lines.push({
      x: Math.round(slot.left),
      y: Math.round(lineTop),
      width: line.width,
      text: line.text,
      lineIndex: lineIndex++,
    })

    cursor = line.end
    lineTop += lineHeight
  }

  return { lines, cursor }
}

function getObstacleIntervals(obstacle: BandObstacle, bandTop: number, bandBottom: number): Interval[] {
  switch (obstacle.kind) {
    case 'polygon': {
      const interval = getPolygonIntervalForBand(
        obstacle.points,
        bandTop,
        bandBottom,
        obstacle.horizontalPadding,
        obstacle.verticalPadding,
      )
      return interval === null ? [] : [interval]
    }
    case 'rects':
      return getRectIntervalsForBand(
        obstacle.rects,
        bandTop,
        bandBottom,
        obstacle.horizontalPadding,
        obstacle.verticalPadding,
      )
    case 'circle': {
      const interval = getCircleIntervalForBand(
        obstacle.cx,
        obstacle.cy,
        obstacle.radius,
        bandTop,
        bandBottom,
        obstacle.horizontalPadding,
        obstacle.verticalPadding,
      )
      return interval === null ? [] : [interval]
    }
  }
}

// Compute column regions from viewport dimensions
function computeColumnRegions(
  viewportWidth: number,
  viewportHeight: number,
  columnCount: number,
  margin: number,
  gutter: number,
  topOffset: number,
): ColumnRegion[] {
  const usableWidth = viewportWidth - margin * 2
  const totalGutters = (columnCount - 1) * gutter
  const columnWidth = Math.round((usableWidth - totalGutters) / columnCount)
  const regions: ColumnRegion[] = []

  for (let i = 0; i < columnCount; i++) {
    regions.push({
      x: margin + i * (columnWidth + gutter),
      y: topOffset,
      width: columnWidth,
      height: viewportHeight - topOffset - margin,
    })
  }

  return regions
}

export interface LayoutConfig {
  readonly text: string
  readonly font: string
  readonly lineHeight: number
  readonly columnCount: number
  readonly margin: number
  readonly gutter: number
  readonly topOffset: number
  readonly columnTopOffsets?: readonly number[] // per-column y overrides
  readonly obstacles: readonly BandObstacle[]
}

export function computeLayout(
  config: LayoutConfig,
  viewportWidth: number,
  viewportHeight: number,
): LayoutOutput {
  const prepared = getPrepared(config.text, config.font)
  const regions = computeColumnRegions(
    viewportWidth,
    viewportHeight,
    config.columnCount,
    config.margin,
    config.gutter,
    config.topOffset,
  )

  // Apply per-column top offset overrides
  if (config.columnTopOffsets) {
    for (let i = 0; i < regions.length && i < config.columnTopOffsets.length; i++) {
      const offset = config.columnTopOffsets[i]!
      const region = regions[i]!
      regions[i] = {
        ...region,
        y: offset,
        height: viewportHeight - offset - config.margin,
      }
    }
  }

  const columns: ColumnLayout[] = []
  let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 }

  for (let i = 0; i < regions.length; i++) {
    const region = regions[i]!
    const side = i === 0 ? 'left' as const : 'right' as const
    const result = layoutColumn(prepared, cursor, region, config.lineHeight, config.obstacles, side)
    columns.push({ region, lines: result.lines })
    cursor = result.cursor
  }

  return { columns, totalHeight: viewportHeight }
}
