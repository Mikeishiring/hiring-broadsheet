import { useRef, useEffect, useCallback } from 'react'
import { prepareWithSegments, walkLineRanges, layoutWithLines } from '@chenglou/pretext'
import type { PositionedLine } from '../engine/types'

interface HeadlineFitterProps {
  readonly text: string
  readonly fontFamily: string
  readonly maxWidth: number
  readonly maxFontSize: number
  readonly minFontSize: number
  readonly color: string
  readonly x: number
  readonly y: number
  readonly letterSpacing?: string
}

// Binary-search the largest font size that doesn't break words mid-line.
// Same algorithm as pretext's fitHeadlineFontSize in dynamic-layout.ts.
function fitHeadline(
  text: string,
  fontFamily: string,
  maxWidth: number,
  minSize: number,
  maxSize: number,
): { fontSize: number; lines: PositionedLine[]; font: string; lineHeight: number } {
  let low = minSize
  let high = maxSize
  let bestSize = low

  while (low <= high) {
    const size = Math.floor((low + high) / 2)
    const font = `700 ${size}px ${fontFamily}`
    const prepared = prepareWithSegments(text, font)
    let breaksInsideWord = false
    walkLineRanges(prepared, maxWidth, line => {
      if (line.end.graphemeIndex !== 0) breaksInsideWord = true
    })
    if (!breaksInsideWord) {
      bestSize = size
      low = size + 1
    } else {
      high = size - 1
    }
  }

  const font = `700 ${bestSize}px ${fontFamily}`
  const lineHeight = Math.round(bestSize * 0.92)
  const prepared = prepareWithSegments(text, font)
  const { lines: rawLines } = layoutWithLines(prepared, maxWidth, lineHeight)

  const lines: PositionedLine[] = rawLines.map((line, i) => ({
    x: 0,
    y: i * lineHeight,
    width: line.width,
    text: line.text,
    lineIndex: i,
  }))

  return { fontSize: bestSize, lines, font, lineHeight }
}

export function HeadlineFitter({
  text,
  fontFamily,
  maxWidth,
  maxFontSize,
  minFontSize,
  color,
  x,
  y,
  letterSpacing,
}: HeadlineFitterProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const render = useCallback(() => {
    const container = containerRef.current
    if (!container || maxWidth <= 0) return

    const { lines, font, lineHeight } = fitHeadline(
      text, fontFamily, maxWidth, minFontSize, maxFontSize,
    )

    // Clear and re-render
    container.innerHTML = ''
    for (const line of lines) {
      const el = document.createElement('div')
      el.textContent = line.text
      el.style.position = 'absolute'
      el.style.left = '0'
      el.style.top = `${line.y}px`
      el.style.font = font
      el.style.lineHeight = `${lineHeight}px`
      el.style.color = color
      el.style.whiteSpace = 'pre'
      el.style.userSelect = 'text'
      if (letterSpacing) el.style.letterSpacing = letterSpacing
      container.appendChild(el)
    }
  }, [text, fontFamily, maxWidth, maxFontSize, minFontSize, color, letterSpacing])

  useEffect(() => {
    render()
  }, [render])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        width: `${maxWidth}px`,
        pointerEvents: 'none',
      }}
    />
  )
}
