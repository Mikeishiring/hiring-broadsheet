import { useRef, useCallback } from 'react'

interface CircleObstacleProps {
  readonly cx: number
  readonly cy: number
  readonly radius: number
  readonly onMove: (cx: number, cy: number) => void
  readonly strokeColor?: string
  readonly fillColor?: string
  readonly label?: string
  readonly interactive?: boolean
}

// A visible decorative circle obstacle that can be dragged.
// Reports center position via onMove for the parent to update
// the circle BandObstacle and trigger live layout reflow.
export function CircleObstacle({
  cx,
  cy,
  radius,
  onMove,
  strokeColor = 'rgba(201, 168, 76, 0.5)',
  fillColor = 'rgba(201, 168, 76, 0.06)',
  label,
  interactive = true,
}: CircleObstacleProps) {
  const dragRef = useRef<{
    startX: number
    startY: number
    originCX: number
    originCY: number
  } | null>(null)

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const el = e.currentTarget as HTMLElement
      el.setPointerCapture(e.pointerId)
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        originCX: cx,
        originCY: cy,
      }
    },
    [cx, cy],
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const drag = dragRef.current
      if (!drag) return
      e.preventDefault()
      const dx = e.clientX - drag.startX
      const dy = e.clientY - drag.startY
      onMove(drag.originCX + dx, drag.originCY + dy)
    },
    [onMove],
  )

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current) return
    const el = e.currentTarget as HTMLElement
    el.releasePointerCapture(e.pointerId)
    dragRef.current = null
  }, [])

  const size = radius * 2

  return (
    <div
      onPointerDown={interactive ? handlePointerDown : undefined}
      onPointerMove={interactive ? handlePointerMove : undefined}
      onPointerUp={interactive ? handlePointerUp : undefined}
      onPointerCancel={interactive ? handlePointerUp : undefined}
      style={{
        position: 'absolute',
        left: `${cx - radius}px`,
        top: `${cy - radius}px`,
        width: `${size}px`,
        height: `${size}px`,
        cursor: interactive ? 'grab' : 'default',
        userSelect: 'none',
        touchAction: 'none',
        zIndex: 10,
        opacity: interactive ? 1 : 0.42,
        pointerEvents: interactive ? 'auto' : 'none',
        transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
        transform: interactive ? 'scale(1)' : 'scale(0.98)',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ display: 'block' }}
      >
        <circle
          cx={radius}
          cy={radius}
          r={radius - 1}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={2}
          strokeDasharray="6 4"
        />
      </svg>
      {label && (
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '10px',
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            color: strokeColor,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>
      )}
    </div>
  )
}
