import { useRef, useCallback } from 'react'

interface DraggableObstacleProps {
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
  readonly onMove: (x: number, y: number) => void
  readonly color?: string
  readonly label?: string
  readonly interactive?: boolean
}

// A visible rect obstacle the user can drag with pointer events.
// On every pointer move, fires onMove so the parent can update
// the obstacle position and trigger live layout reflow.
export function DraggableObstacle({
  x,
  y,
  width,
  height,
  onMove,
  color = 'rgba(217, 119, 87, 0.15)',
  label,
  interactive = true,
}: DraggableObstacleProps) {
  const dragRef = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null)

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
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
  }, [x, y])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const drag = dragRef.current
    if (!drag) return
    e.preventDefault()
    const dx = e.clientX - drag.startX
    const dy = e.clientY - drag.startY
    onMove(drag.originX + dx, drag.originY + dy)
  }, [onMove])

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current) return
    const el = e.currentTarget as HTMLElement
    el.releasePointerCapture(e.pointerId)
    dragRef.current = null
  }, [])

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
        backgroundColor: color,
        border: '2px dashed rgba(217, 119, 87, 0.5)',
        borderRadius: '4px',
        cursor: interactive ? 'grab' : 'default',
        userSelect: 'none',
        touchAction: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        opacity: interactive ? 1 : 0.42,
        pointerEvents: interactive ? 'auto' : 'none',
        transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
        transform: interactive ? 'scale(1)' : 'scale(0.98)',
      }}
    >
      {label && (
        <span
          style={{
            fontSize: '11px',
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            color: 'rgba(217, 119, 87, 0.8)',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            pointerEvents: 'none',
          }}
        >
          {label}
        </span>
      )}
    </div>
  )
}
