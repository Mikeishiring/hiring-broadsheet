import { useMemo, useState, useCallback } from 'react'
import type { BandObstacle, Point } from '../engine/types.ts'
import type { EditorialPageLayout, RelativeAnchor } from '../model/page.ts'

interface LayoutGeometry {
  readonly pageWidth: number
  readonly margin: number
  readonly columnWidth: number
  readonly gutter: number
  readonly headlineTop: number
  readonly headlineWidth: number
  readonly headlineHeight: number
  readonly creditGap: number
  readonly creditHeight: number
  readonly bodyTopLeft: number
  readonly bodyLineHeight: number
  readonly vh: number
}

interface ObstacleState {
  readonly obstacles: readonly BandObstacle[]
  readonly obstaclePos: { x: number; y: number }
  readonly obstacleWidth: number
  readonly obstacleHeight: number
  readonly obstacleLabel?: string
  readonly handleObstacleMove: (x: number, y: number) => void
  readonly circlePos: { cx: number; cy: number }
  readonly circleRadius: number
  readonly circleLabel?: string
  readonly handleCircleMove: (cx: number, cy: number) => void
  readonly imagePos: { x: number; y: number }
  readonly imageW: number
  readonly imageH: number
  readonly imageSrc: string
  readonly handleImageMove: (x: number, y: number) => void
  readonly handleImageHullReady: (points: Point[]) => void
  readonly dropCapWidth: number
  readonly dropCapHeight: number
  readonly handleDropCapMeasured: (width: number, height: number) => void
  readonly pullQuoteX: number
  readonly pullQuoteY: number
  readonly pullQuoteWidth: number
  readonly pullQuoteHeight: number
}

interface PageBounds {
  readonly width: number
  readonly height: number
}

interface RelativePosition {
  readonly xRatio: number
  readonly yRatio: number
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function toRatio(value: number, min: number, max: number): number {
  if (max <= min) return 0
  return clamp((value - min) / (max - min), 0, 1)
}

function fromRatio(ratio: number, min: number, max: number): number {
  if (max <= min) return min
  return min + clamp(ratio, 0, 1) * (max - min)
}

function toRelativePosition(anchor: RelativeAnchor): RelativePosition {
  return {
    xRatio: anchor.xRatio,
    yRatio: anchor.yRatio,
  }
}

function captureTopLeftPosition(
  x: number,
  y: number,
  bounds: PageBounds,
  width: number,
  height: number,
): RelativePosition {
  const maxX = Math.max(0, bounds.width - width)
  const maxY = Math.max(0, bounds.height - height)
  return {
    xRatio: toRatio(x, 0, maxX),
    yRatio: toRatio(y, 0, maxY),
  }
}

function resolveTopLeftPosition(
  position: RelativePosition,
  bounds: PageBounds,
  width: number,
  height: number,
): { x: number; y: number } {
  const maxX = Math.max(0, bounds.width - width)
  const maxY = Math.max(0, bounds.height - height)
  return {
    x: Math.round(fromRatio(position.xRatio, 0, maxX)),
    y: Math.round(fromRatio(position.yRatio, 0, maxY)),
  }
}

function captureCenterPosition(
  x: number,
  y: number,
  bounds: PageBounds,
  radius: number,
): RelativePosition {
  const minX = radius
  const maxX = Math.max(radius, bounds.width - radius)
  const minY = radius
  const maxY = Math.max(radius, bounds.height - radius)
  return {
    xRatio: toRatio(x, minX, maxX),
    yRatio: toRatio(y, minY, maxY),
  }
}

function resolveCenterPosition(
  position: RelativePosition,
  bounds: PageBounds,
  radius: number,
): { cx: number; cy: number } {
  const minX = radius
  const maxX = Math.max(radius, bounds.width - radius)
  const minY = radius
  const maxY = Math.max(radius, bounds.height - radius)
  return {
    cx: Math.round(fromRatio(position.xRatio, minX, maxX)),
    cy: Math.round(fromRatio(position.yRatio, minY, maxY)),
  }
}

export function useObstacles(
  geo: LayoutGeometry,
  pageLayout: EditorialPageLayout,
  pullQuoteText: string,
): ObstacleState {
  const {
    pageWidth,
    margin,
    columnWidth,
    gutter,
    headlineTop,
    headlineWidth,
    headlineHeight,
    creditGap,
    creditHeight,
    bodyTopLeft,
    bodyLineHeight,
    vh,
  } = geo
  const pageBounds = useMemo<PageBounds>(() => ({
    width: pageWidth,
    height: vh,
  }), [pageWidth, vh])

  // Drop cap
  const [dropCapWidth, setDropCapWidth] = useState(0)
  const dropCapHeight = pageLayout.dropCapLines * bodyLineHeight
  const handleDropCapMeasured = useCallback((width: number, height: number) => {
    void height
    setDropCapWidth(width)
  }, [])

  // Draggable rect
  const [obstacleRelativePos, setObstacleRelativePos] = useState(() =>
    toRelativePosition(pageLayout.draggableRect.anchor),
  )
  const obstaclePos = useMemo(
    () => resolveTopLeftPosition(
      obstacleRelativePos,
      pageBounds,
      pageLayout.draggableRect.width,
      pageLayout.draggableRect.height,
    ),
    [obstacleRelativePos, pageBounds, pageLayout.draggableRect.width, pageLayout.draggableRect.height],
  )
  const handleObstacleMove = useCallback((x: number, y: number) => {
    setObstacleRelativePos(
      captureTopLeftPosition(
        x,
        y,
        pageBounds,
        pageLayout.draggableRect.width,
        pageLayout.draggableRect.height,
      ),
    )
  }, [pageBounds, pageLayout.draggableRect.width, pageLayout.draggableRect.height])

  // Circle
  const [circleRelativePos, setCircleRelativePos] = useState(() =>
    toRelativePosition(pageLayout.circle.anchor),
  )
  const circlePos = useMemo(
    () => resolveCenterPosition(circleRelativePos, pageBounds, pageLayout.circle.radius),
    [circleRelativePos, pageBounds, pageLayout.circle.radius],
  )
  const handleCircleMove = useCallback((cx: number, cy: number) => {
    setCircleRelativePos(captureCenterPosition(cx, cy, pageBounds, pageLayout.circle.radius))
  }, [pageBounds, pageLayout.circle.radius])

  // Image + hull
  const [imageRelativePos, setImageRelativePos] = useState(() =>
    toRelativePosition(pageLayout.image.anchor),
  )
  const imagePos = useMemo(
    () => resolveTopLeftPosition(
      imageRelativePos,
      pageBounds,
      pageLayout.image.width,
      pageLayout.image.height,
    ),
    [imageRelativePos, pageBounds, pageLayout.image.width, pageLayout.image.height],
  )
  const [imageHull, setImageHull] = useState<Point[] | null>(null)
  const handleImageMove = useCallback((x: number, y: number) => {
    setImageRelativePos(
      captureTopLeftPosition(
        x,
        y,
        pageBounds,
        pageLayout.image.width,
        pageLayout.image.height,
      ),
    )
  }, [pageBounds, pageLayout.image.width, pageLayout.image.height])
  const handleImageHullReady = useCallback((points: Point[]) => {
    setImageHull(points)
  }, [])

  // Pull quote geometry
  const col1X = margin + columnWidth + gutter
  const pullQuoteWidth = Math.round(columnWidth * pageLayout.pullQuote.widthRatio)
  const pullQuoteX = col1X + columnWidth - pullQuoteWidth
  const estimatedLines = Math.ceil((pullQuoteText.length * 9) / pullQuoteWidth)
  const pullQuoteHeight = estimatedLines * pageLayout.pullQuote.lineHeight + pageLayout.pullQuote.paddingV * 2
  const pullQuoteY = Math.round(
    headlineTop + (vh - headlineTop - margin) * pageLayout.pullQuote.yRatio,
  )

  // Build obstacle array
  const headlineObstacle: BandObstacle = useMemo(() => ({
    kind: 'rects' as const,
    rects: [{ x: margin, y: headlineTop, width: headlineWidth, height: headlineHeight + creditGap + creditHeight }],
    horizontalPadding: Math.round(bodyLineHeight * 0.95),
    verticalPadding: Math.round(bodyLineHeight * 0.3),
  }), [margin, headlineTop, headlineWidth, headlineHeight, creditGap, creditHeight, bodyLineHeight])

  const dropCapObstacle: BandObstacle | null = useMemo(() =>
    dropCapWidth > 0
      ? {
          kind: 'rects' as const,
          rects: [{
            x: margin,
            y: bodyTopLeft,
            width: dropCapWidth + pageLayout.dropCapPadding,
            height: dropCapHeight,
          }],
          horizontalPadding: 0,
          verticalPadding: 0,
        }
      : null,
    [margin, bodyTopLeft, dropCapWidth, dropCapHeight, pageLayout.dropCapPadding])

  const draggableObstacle: BandObstacle = useMemo(() => ({
    kind: 'rects' as const,
    rects: [{
      x: obstaclePos.x,
      y: obstaclePos.y,
      width: pageLayout.draggableRect.width,
      height: pageLayout.draggableRect.height,
    }],
    horizontalPadding: pageLayout.draggableRect.horizontalPadding,
    verticalPadding: pageLayout.draggableRect.verticalPadding,
  }), [
    obstaclePos.x,
    obstaclePos.y,
    pageLayout.draggableRect.width,
    pageLayout.draggableRect.height,
    pageLayout.draggableRect.horizontalPadding,
    pageLayout.draggableRect.verticalPadding,
  ])

  const pullQuoteObstacle: BandObstacle = useMemo(() => ({
    kind: 'rects' as const,
    rects: [{ x: pullQuoteX, y: pullQuoteY, width: pullQuoteWidth, height: pullQuoteHeight }],
    horizontalPadding: pageLayout.pullQuote.paddingH,
    verticalPadding: pageLayout.pullQuote.paddingV,
  }), [
    pullQuoteX,
    pullQuoteY,
    pullQuoteWidth,
    pullQuoteHeight,
    pageLayout.pullQuote.paddingH,
    pageLayout.pullQuote.paddingV,
  ])

  const circleObstacle: BandObstacle = useMemo(() => ({
    kind: 'circle' as const,
    cx: circlePos.cx,
    cy: circlePos.cy,
    radius: pageLayout.circle.radius,
    horizontalPadding: pageLayout.circle.horizontalPadding,
    verticalPadding: pageLayout.circle.verticalPadding,
  }), [
    circlePos.cx,
    circlePos.cy,
    pageLayout.circle.radius,
    pageLayout.circle.horizontalPadding,
    pageLayout.circle.verticalPadding,
  ])

  const imageObstacle: BandObstacle | null = useMemo(() =>
    imageHull
      ? {
          kind: 'polygon' as const,
          points: imageHull,
          horizontalPadding: pageLayout.image.horizontalPadding,
          verticalPadding: pageLayout.image.verticalPadding,
        }
      : null,
    [imageHull, pageLayout.image.horizontalPadding, pageLayout.image.verticalPadding])

  const obstacles = useMemo(() => {
    const list: BandObstacle[] = [headlineObstacle, draggableObstacle, pullQuoteObstacle, circleObstacle]
    if (dropCapObstacle) list.push(dropCapObstacle)
    if (imageObstacle) list.push(imageObstacle)
    return list
  }, [headlineObstacle, draggableObstacle, pullQuoteObstacle, circleObstacle, dropCapObstacle, imageObstacle])

  return {
    obstacles,
    obstaclePos,
    obstacleWidth: pageLayout.draggableRect.width,
    obstacleHeight: pageLayout.draggableRect.height,
    obstacleLabel: pageLayout.draggableRect.label,
    handleObstacleMove,
    circlePos,
    circleRadius: pageLayout.circle.radius,
    circleLabel: pageLayout.circle.label,
    handleCircleMove,
    imagePos,
    imageW: pageLayout.image.width,
    imageH: pageLayout.image.height,
    imageSrc: pageLayout.image.src,
    handleImageMove,
    handleImageHullReady,
    dropCapWidth,
    dropCapHeight,
    handleDropCapMeasured,
    pullQuoteX,
    pullQuoteY,
    pullQuoteWidth,
    pullQuoteHeight,
  }
}
