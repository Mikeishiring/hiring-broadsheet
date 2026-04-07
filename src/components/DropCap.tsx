import { useCallback, useState } from 'react'
import type { ThemeDropCapStyle } from '../themes/types.ts'

interface DropCapProps {
  readonly char: string
  readonly lineHeight: number
  readonly lineCount: number
  readonly fontFamily: string
  readonly color: string
  readonly x: number
  readonly y: number
  readonly onMeasured: (width: number, height: number) => void
  readonly dropCapStyle?: ThemeDropCapStyle
}

// Ornamental box padding (space between letter and border)
const ORNAMENTAL_PAD = 8
// Border width for ornamental style
const ORNAMENTAL_BORDER = 3

// Large initial character spanning N body lines.
// Measures itself on mount and reports its rect so the parent
// can create a BandObstacle for the layout engine to wrap around.
//
// When `dropCapStyle.ornamental` is true, renders the letter inside
// a decorated border box — like a rubricated initial in a printed book.
export function DropCap({
  char,
  lineHeight,
  lineCount,
  fontFamily,
  color,
  x,
  y,
  onMeasured,
  dropCapStyle,
}: DropCapProps) {
  const targetHeight = lineHeight * lineCount
  const [fontSize, setFontSize] = useState(targetHeight)
  const isOrnamental = dropCapStyle?.ornamental ?? false

  // For ornamental style, the letter is smaller to fit inside the border box
  const ornamentalInset = isOrnamental ? (ORNAMENTAL_PAD + ORNAMENTAL_BORDER) * 2 : 0
  const letterTargetHeight = targetHeight - ornamentalInset

  const measureDropCap = useCallback((span: HTMLSpanElement | null) => {
    if (!span) return

    span.textContent = char
    span.style.fontFamily = fontFamily

    const effectiveTargetHeight = isOrnamental ? letterTargetHeight : targetHeight

    // Binary search for the font size that makes the character
    // match exactly `lineCount` lines of body text height
    let low = 10
    let high = effectiveTargetHeight * 2
    let bestSize = low

    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      span.style.fontSize = `${mid}px`
      span.style.lineHeight = `${effectiveTargetHeight}px`
      const measured = span.getBoundingClientRect()
      if (measured.height <= effectiveTargetHeight) {
        bestSize = mid
        low = mid + 1
      } else {
        high = mid - 1
      }
    }

    setFontSize((prev) => (prev === bestSize ? prev : bestSize))
    span.style.fontSize = `${bestSize}px`
    span.style.lineHeight = `${effectiveTargetHeight}px`

    // Measure final width to report as obstacle
    const rect = span.getBoundingClientRect()
    const totalWidth = isOrnamental
      ? Math.ceil(rect.width) + ornamentalInset
      : Math.ceil(rect.width)
    onMeasured(totalWidth, targetHeight)
  }, [char, targetHeight, letterTargetHeight, fontFamily, onMeasured, isOrnamental, ornamentalInset])

  if (isOrnamental) {
    return (
      <div
        style={{
          position: 'absolute',
          left: `${x}px`,
          top: `${y}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: `${targetHeight}px`,
          background: dropCapStyle?.background ?? 'transparent',
          border: `${ORNAMENTAL_BORDER}px solid ${dropCapStyle?.borderColor ?? color}`,
          // Double border effect — outer solid, inner ridge via box-shadow
          boxShadow: `inset 0 0 0 2px ${dropCapStyle?.background ?? 'transparent'}, inset 0 0 0 3px ${dropCapStyle?.borderColor ?? color}40`,
          padding: `0 ${ORNAMENTAL_PAD}px`,
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      >
        <span
          ref={measureDropCap}
          style={{
            fontFamily,
            fontWeight: 700,
            fontSize: `${fontSize}px`,
            lineHeight: `${letterTargetHeight}px`,
            color,
          }}
        >
          {char}
        </span>
      </div>
    )
  }

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
