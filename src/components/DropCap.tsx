import { useCallback, useState } from 'react'

interface DropCapProps {
  readonly char: string
  readonly lineHeight: number
  readonly lineCount: number
  readonly fontFamily: string
  readonly color: string
  readonly x: number
  readonly y: number
  readonly onMeasured: (width: number, height: number) => void
}

// Large initial character spanning N body lines.
// Measures itself on mount and reports its rect so the parent
// can create a BandObstacle for the layout engine to wrap around.
export function DropCap({
  char,
  lineHeight,
  lineCount,
  fontFamily,
  color,
  x,
  y,
  onMeasured,
}: DropCapProps) {
  const targetHeight = lineHeight * lineCount
  const [fontSize, setFontSize] = useState(targetHeight)

  const measureDropCap = useCallback((span: HTMLSpanElement | null) => {
    if (!span) return

    span.textContent = char
    span.style.fontFamily = fontFamily

    // Binary search for the font size that makes the character
    // match exactly `lineCount` lines of body text height
    let low = 10
    let high = targetHeight * 2
    let bestSize = low

    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      span.style.fontSize = `${mid}px`
      span.style.lineHeight = `${targetHeight}px`
      const measured = span.getBoundingClientRect()
      // We want the actual glyph height to be close to targetHeight
      // but font-size controls the em box, not the glyph.
      // Use the natural height of the character.
      if (measured.height <= targetHeight) {
        bestSize = mid
        low = mid + 1
      } else {
        high = mid - 1
      }
    }

    setFontSize((prev) => (prev === bestSize ? prev : bestSize))
    span.style.fontSize = `${bestSize}px`
    span.style.lineHeight = `${targetHeight}px`

    // Measure final width to report as obstacle
    const rect = span.getBoundingClientRect()
    onMeasured(Math.ceil(rect.width), targetHeight)
  }, [char, targetHeight, fontFamily, onMeasured])

  return (
    <span
      ref={measureDropCap}
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        fontFamily,
        fontWeight: 700,
        fontSize: `${fontSize}px`,
        lineHeight: `${targetHeight}px`,
        color,
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    >
      {char}
    </span>
  )
}
