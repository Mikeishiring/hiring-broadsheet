import { useRef, useCallback, useState, useEffect } from 'react'
import { getWrapHull, transformWrapPoints } from '../engine/wrap-geometry.ts'
import type { Point } from '../engine/types.ts'

interface ImageObstacleProps {
  readonly src: string
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
  readonly onMove: (x: number, y: number) => void
  readonly onHullReady: (points: Point[]) => void
  readonly interactive?: boolean
}

const ROTATION_STEP = Math.PI / 4 // 45 degrees
const HULL_OPTIONS = { smoothRadius: 4, mode: 'envelope' as const, convexify: true }

// An absolutely-positioned image with alpha hull extraction.
// Supports drag-to-move plus an explicit rotate control.
// Reports the transformed hull polygon via onHullReady.
export function ImageObstacle({
  src,
  x,
  y,
  width,
  height,
  onMove,
  onHullReady,
  interactive = true,
}: ImageObstacleProps) {
  const dragRef = useRef<{
    startX: number
    startY: number
    originX: number
    originY: number
  } | null>(null)

  const [rotation, setRotation] = useState(0)
  const [normalizedHull, setNormalizedHull] = useState<Point[] | null>(null)

  // Extract hull on mount
  useEffect(() => {
    let cancelled = false
    getWrapHull(src, HULL_OPTIONS).then((points) => {
      if (!cancelled) setNormalizedHull(points)
    })
    return () => { cancelled = true }
  }, [src])

  // Report transformed hull whenever position, size, rotation, or hull changes
  useEffect(() => {
    if (!normalizedHull) return
    const transformed = transformWrapPoints(
      normalizedHull,
      { x, y, width, height },
      rotation,
    )
    onHullReady(transformed)
  }, [normalizedHull, x, y, width, height, rotation, onHullReady])

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const el = e.currentTarget as HTMLElement
      el.setPointerCapture(e.pointerId)
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        originX: x,
        originY: y,
      }
    },
    [x, y],
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const drag = dragRef.current
      if (!drag) return
      e.preventDefault()
      const dx = e.clientX - drag.startX
      const dy = e.clientY - drag.startY
      onMove(drag.originX + dx, drag.originY + dy)
    },
    [onMove],
  )

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      const drag = dragRef.current
      if (!drag) return
      const el = e.currentTarget as HTMLElement
      el.releasePointerCapture(e.pointerId)
      dragRef.current = null
    },
    [],
  )

  const handleRotate = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setRotation((prev) => prev + ROTATION_STEP)
  }, [])

  const rotationDeg = (rotation * 180) / Math.PI

  return (
    <div
      onPointerDown={interactive ? handlePointerDown : undefined}
      onPointerMove={interactive ? handlePointerMove : undefined}
      onPointerUp={interactive ? handlePointerUp : undefined}
      onPointerCancel={interactive ? handlePointerUp : undefined}
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        cursor: interactive ? 'grab' : 'default',
        userSelect: 'none',
        touchAction: 'none',
        zIndex: 10,
        opacity: interactive ? 1 : 0.68,
        pointerEvents: interactive ? 'auto' : 'none',
        transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
        transform: interactive ? 'scale(1)' : 'scale(0.99)',
      }}
    >
      <img
        src={src}
        alt=""
        draggable={false}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          transform: `rotate(${rotationDeg}deg)`,
          transition: 'transform 0.3s ease-out',
          pointerEvents: 'none',
        }}
      />
      {interactive && (
        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={handleRotate}
          style={{
            position: 'absolute',
            right: '-8px',
            bottom: '-12px',
            padding: '4px 10px',
            border: '1px solid rgba(31, 41, 55, 0.2)',
            borderRadius: '999px',
            background: 'rgba(255, 248, 240, 0.88)',
            color: 'rgba(85, 64, 34, 0.9)',
            fontSize: '10px',
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            cursor: 'pointer',
            boxShadow: '0 8px 16px rgba(31, 41, 55, 0.12)',
          }}
        >
          turn
        </button>
      )}
    </div>
  )
}
