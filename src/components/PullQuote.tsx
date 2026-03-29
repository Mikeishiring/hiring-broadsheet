interface PullQuoteProps {
  readonly text: string
  readonly x: number
  readonly y: number
  readonly width: number
  readonly fontFamily: string
  readonly accentColor: string
  readonly inkColor: string
  readonly onMeasured?: (height: number) => void
}

// A styled pull quote block that acts as an obstacle.
// The parent places it and creates a matching BandObstacle
// so the body text wraps around it.
export function PullQuote({
  text,
  x,
  y,
  width,
  fontFamily,
  accentColor,
  inkColor,
}: PullQuoteProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        paddingLeft: '16px',
        borderLeft: `3px solid ${accentColor}`,
        fontFamily,
        fontStyle: 'italic',
        fontSize: '17px',
        lineHeight: '26px',
        color: inkColor,
        userSelect: 'text',
        zIndex: 5,
        pointerEvents: 'none',
      }}
    >
      {text}
    </div>
  )
}
