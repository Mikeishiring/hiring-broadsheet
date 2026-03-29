import { useMemo } from 'react'
import type { PositionedLine } from '../engine/types.ts'
import { measureTextWidth } from './measureTextWidth.ts'

interface CursorOverlayProps {
  readonly cursorOffset: number
  readonly lines: readonly PositionedLine[]
  readonly font: string
  readonly lineHeight: number
  readonly color: string
}

// Inject blinking keyframes once
let styleInjected = false
function injectBlinkStyle(): void {
  if (styleInjected) return
  styleInjected = true
  const style = document.createElement('style')
  style.textContent = `
    @keyframes broadsheet-blink {
      0%, 49.9% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }
  `
  document.head.appendChild(style)
}

// Find pixel position for a character offset in the laid-out lines.
// Each line's text maps to a range in the original string.
function computeCursorPosition(
  cursorOffset: number,
  lines: readonly PositionedLine[],
  font: string,
): { x: number; y: number } | null {
  if (lines.length === 0) return null

  let charsSoFar = 0
  for (const line of lines) {
    const lineLen = line.text.length
    if (cursorOffset <= charsSoFar + lineLen) {
      const localOffset = cursorOffset - charsSoFar
      const substring = line.text.slice(0, localOffset)
      const width = measureTextWidth(substring, font)
      return { x: line.x + width, y: line.y }
    }
    charsSoFar += lineLen
  }

  // Cursor is past all text — place at end of last line
  const lastLine = lines[lines.length - 1]!
  return { x: lastLine.x + lastLine.width, y: lastLine.y }
}

export function CursorOverlay({
  cursorOffset,
  lines,
  font,
  lineHeight,
  color,
}: CursorOverlayProps) {
  injectBlinkStyle()

  const position = useMemo(
    () => computeCursorPosition(cursorOffset, lines, font),
    [cursorOffset, lines, font],
  )

  if (!position) return null

  return (
    <div
      style={{
        position: 'absolute',
        left: `${Math.round(position.x)}px`,
        top: `${Math.round(position.y)}px`,
        width: '2px',
        height: `${lineHeight}px`,
        backgroundColor: color,
        animation: 'broadsheet-blink 1s step-end infinite',
        pointerEvents: 'none',
        zIndex: 15,
      }}
    />
  )
}
