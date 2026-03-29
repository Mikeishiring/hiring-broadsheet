import { useRef, useEffect, useCallback, useState, useMemo } from 'react'
import { CursorOverlay } from './CursorOverlay.tsx'
import { measureTextWidth } from './measureTextWidth.ts'
import { useHistory } from './useHistory.ts'
import { computeLayout, type LayoutConfig } from '../engine/layout-engine.ts'

interface TextBlockEditorProps {
  readonly initialText: string
  readonly config: LayoutConfig
  readonly font: string
  readonly lineHeight: number
  readonly cursorColor: string
  readonly viewportWidth: number
  readonly viewportHeight: number
  readonly onTextChange: (text: string) => void
  readonly onExit: () => void
}

// Debounce delay for pushing history entries (ms)
const HISTORY_DEBOUNCE_MS = 500

interface LineCursorInfo {
  readonly line: ReturnType<typeof computeLayout>['columns'][number]['lines'][number]
  readonly startOffset: number
  readonly endOffset: number
}

export function TextBlockEditor({
  initialText,
  config,
  font,
  lineHeight,
  cursorColor,
  viewportWidth,
  viewportHeight,
  onTextChange,
  onExit,
}: TextBlockEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const historyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pendingHistoryRef = useRef<string | null>(null)

  const [text, setText] = useState(initialText)
  const [cursorOffset, setCursorOffset] = useState(initialText.length)
  const history = useHistory(initialText)

  const lines = useMemo(() => {
    const layoutConfig: LayoutConfig = { ...config, text }
    const { columns } = computeLayout(layoutConfig, viewportWidth, viewportHeight)
    return columns.flatMap((column) => column.lines)
  }, [config, text, viewportWidth, viewportHeight])

  const lineCursorInfo = useMemo<LineCursorInfo[]>(() => {
    let offset = 0
    return lines.map((line) => {
      const startOffset = offset
      offset += line.text.length
      return {
        line,
        startOffset,
        endOffset: offset,
      }
    })
  }, [lines])

  // Auto-focus on mount
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.focus()
      textarea.setSelectionRange(text.length, text.length)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const flushHistory = useCallback(() => {
    if (historyTimerRef.current !== null) {
      clearTimeout(historyTimerRef.current)
      historyTimerRef.current = null
    }

    const pendingText = pendingHistoryRef.current
    if (pendingText === null) return

    pendingHistoryRef.current = null
    history.push(pendingText)
  }, [history])

  const scheduleHistoryPush = useCallback((nextText: string) => {
    pendingHistoryRef.current = nextText

    if (historyTimerRef.current !== null) {
      clearTimeout(historyTimerRef.current)
    }

    historyTimerRef.current = setTimeout(() => {
      flushHistory()
    }, HISTORY_DEBOUNCE_MS)
  }, [flushHistory])

  const applyText = useCallback((nextText: string, nextCursorOffset = nextText.length) => {
    setText(nextText)
    onTextChange(nextText)
    setCursorOffset(nextCursorOffset)
  }, [onTextChange])

  // Cleanup history timer
  useEffect(() => {
    return () => {
      if (historyTimerRef.current !== null) {
        clearTimeout(historyTimerRef.current)
      }
    }
  }, [])

  const handleInput = useCallback(
    (e: React.FormEvent<HTMLTextAreaElement>) => {
      const nextText = e.currentTarget.value
      applyText(nextText, e.currentTarget.selectionStart ?? nextText.length)
      scheduleHistoryPush(nextText)
    },
    [applyText, scheduleHistoryPush],
  )

  const handleSelect = useCallback(
    (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
      setCursorOffset(e.currentTarget.selectionStart ?? 0)
    },
    [],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        flushHistory()
        onExit()
        return
      }

      const lowerKey = e.key.toLowerCase()
      const isUndo = (e.ctrlKey || e.metaKey) && !e.shiftKey && lowerKey === 'z'
      const isRedo = (e.ctrlKey || e.metaKey) && (lowerKey === 'y' || (e.shiftKey && lowerKey === 'z'))

      if (!isUndo && !isRedo) return

      e.preventDefault()
      flushHistory()

      const restored = isRedo ? history.redo() : history.undo()
      if (restored === null) return

      applyText(restored)

      // Sync the DOM selection immediately so the caret doesn't jump.
      const textarea = textareaRef.current
      if (textarea) {
        textarea.value = restored
        textarea.setSelectionRange(restored.length, restored.length)
      }
    },
    [applyText, flushHistory, history, onExit],
  )

  const setSelection = useCallback((offset: number) => {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.focus()
    textarea.setSelectionRange(offset, offset)
    setCursorOffset(offset)
  }, [])

  // Compute textarea bounds from column regions
  const textareaBounds = computeTextareaBounds(
    config,
    viewportWidth,
    viewportHeight,
  )

  const handleSurfacePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault()

    const offset = computeOffsetFromPoint(
      e,
      textareaBounds,
      lineCursorInfo,
      font,
      lineHeight,
    )

    setSelection(offset)
  }, [textareaBounds, lineCursorInfo, font, lineHeight, setSelection])

  return (
    <>
      <textarea
        ref={textareaRef}
        value={text}
        onInput={handleInput}
        onSelect={handleSelect}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        style={{
          position: 'absolute',
          left: `${textareaBounds.x}px`,
          top: `${textareaBounds.y}px`,
          width: `${textareaBounds.width}px`,
          height: `${textareaBounds.height}px`,
          font,
          lineHeight: `${lineHeight}px`,
          color: 'transparent',
          caretColor: 'transparent',
          background: 'transparent',
          border: 'none',
          outline: 'none',
          resize: 'none',
          overflow: 'hidden',
          padding: 0,
          margin: 0,
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />
      <div
        onPointerDown={handleSurfacePointerDown}
        style={{
          position: 'absolute',
          left: `${textareaBounds.x}px`,
          top: `${textareaBounds.y}px`,
          width: `${textareaBounds.width}px`,
          height: `${textareaBounds.height}px`,
          background: 'transparent',
          cursor: 'text',
          zIndex: 11,
        }}
      />
      <CursorOverlay
        cursorOffset={cursorOffset}
        lines={lines}
        font={font}
        lineHeight={lineHeight}
        color={cursorColor}
      />
    </>
  )
}

function computeOffsetFromPoint(
  event: React.PointerEvent<HTMLDivElement>,
  bounds: { x: number; y: number; width: number; height: number },
  lines: readonly LineCursorInfo[],
  font: string,
  lineHeight: number,
): number {
  if (lines.length === 0) return 0

  const rect = event.currentTarget.getBoundingClientRect()
  const x = event.clientX - rect.left + bounds.x
  const y = event.clientY - rect.top + bounds.y

  let bestLine = lines[0]!
  let bestScore = Number.POSITIVE_INFINITY

  for (const info of lines) {
    const lineLeft = info.line.x
    const lineRight = info.line.x + Math.max(info.line.width, 1)
    const lineTop = info.line.y
    const lineBottom = info.line.y + lineHeight

    const dx = x < lineLeft ? lineLeft - x : x > lineRight ? x - lineRight : 0
    const dy = y < lineTop ? lineTop - y : y > lineBottom ? y - lineBottom : 0
    const score = dy * dy * 4 + dx * dx

    if (score < bestScore) {
      bestScore = score
      bestLine = info
    }
  }

  return findLineOffsetForX(bestLine, x, font)
}

function findLineOffsetForX(
  info: LineCursorInfo,
  x: number,
  font: string,
): number {
  const relativeX = x - info.line.x
  if (relativeX <= 0) return info.startOffset
  if (relativeX >= info.line.width) return info.endOffset

  let previousWidth = 0
  for (let i = 1; i <= info.line.text.length; i++) {
    const nextWidth = measureTextWidth(info.line.text.slice(0, i), font)
    if (relativeX < (previousWidth + nextWidth) / 2) {
      return info.startOffset + i - 1
    }
    previousWidth = nextWidth
  }

  return info.endOffset
}

// Compute a bounding box that covers both columns
function computeTextareaBounds(
  config: LayoutConfig,
  viewportWidth: number,
  viewportHeight: number,
): { x: number; y: number; width: number; height: number } {
  const { margin, topOffset } = config
  const usableWidth = viewportWidth - margin * 2

  // Use the minimum topOffset from columnTopOffsets if available
  const minTop = config.columnTopOffsets
    ? Math.min(topOffset, ...config.columnTopOffsets)
    : topOffset

  return {
    x: margin,
    y: minTop,
    width: usableWidth,
    height: viewportHeight - minTop - margin,
  }
}
