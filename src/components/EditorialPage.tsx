import { useMemo, useEffect, useCallback } from 'react'
import { PageCanvas } from './PageCanvas.tsx'
import { HeadlineFitter } from './HeadlineFitter.tsx'
import { DraggableObstacle } from './DraggableObstacle.tsx'
import { DropCap } from './DropCap.tsx'
import { PullQuote } from './PullQuote.tsx'
import { CircleObstacle } from './CircleObstacle.tsx'
import { ImageObstacle } from './ImageObstacle.tsx'
import { TextBlockEditor } from '../editor/TextBlockEditor.tsx'
import { useEditSession } from '../editor/useEditSession.ts'
import { useObstacles } from '../hooks/useObstacles.ts'
import type { BroadsheetTheme } from '../themes/types.ts'
import type { LayoutConfig } from '../engine/layout-engine.ts'
import type { EditorialPageDefinition, InteractionMode } from '../model/page.ts'

interface EditorialPageProps {
  readonly page: EditorialPageDefinition
  readonly bodyText: string
  readonly interactionMode: InteractionMode
  readonly onBodyTextChange: (text: string) => void
  readonly onInteractionModeChange: (mode: InteractionMode) => void
  readonly theme: BroadsheetTheme
  readonly viewportWidth: number
  readonly viewportHeight: number
}

const MAX_PAGE_WIDTH = 1400

export function EditorialPage({
  page,
  bodyText,
  interactionMode,
  onBodyTextChange,
  onInteractionModeChange,
  theme,
  viewportWidth: rawVw,
  viewportHeight: vh,
}: EditorialPageProps) {
  const dropCapChar = page.content.bodyText[0] ?? ''
  const editSession = useEditSession(bodyText)

  const vw = Math.min(rawVw, MAX_PAGE_WIDTH)
  const pageOffsetX = rawVw > MAX_PAGE_WIDTH ? Math.round((rawVw - MAX_PAGE_WIDTH) / 2) : 0
  const margin = Math.round(Math.max(52, vw * 0.048))
  const gutter = Math.round(Math.max(28, vw * 0.025))
  const headlineTop = Math.round(Math.max(42, vw * 0.04, 72))
  const columnWidth = Math.round((vw - margin * 2 - gutter) / 2)
  const headlineWidth = Math.round(Math.min(vw - margin * 2, Math.max(columnWidth, vw * 0.5)))
  const headlineFontSize = Math.min(94, Math.max(55, Math.round(vw * 0.055)))
  const headlineLineHeight = Math.round(headlineFontSize * 0.92)
  const headlineHeight = 3 * headlineLineHeight
  const creditGap = Math.round(Math.max(14, theme.typography.bodyLineHeight * 0.6))
  const creditHeight = 16
  const copyGap = Math.round(Math.max(20, theme.typography.bodyLineHeight * 0.9))
  const bodyTopLeft = headlineTop + headlineHeight + creditGap + creditHeight + copyGap

  const obs = useObstacles(
    {
      pageWidth: vw,
      margin,
      columnWidth,
      gutter,
      headlineTop,
      headlineWidth,
      headlineHeight,
      creditGap,
      creditHeight,
      bodyTopLeft,
      bodyLineHeight: theme.typography.bodyLineHeight,
      vh,
    },
    page.layout,
    page.content.pullQuote,
  )

  useEffect(() => {
    if (interactionMode === 'edit') {
      if (editSession.state !== 'editing') {
        editSession.startEditing(bodyText)
      }
      return
    }

    if (editSession.state === 'editing') {
      const committedText = editSession.commitEdit()
      if (committedText !== bodyText) {
        onBodyTextChange(committedText)
      }
    }
  }, [interactionMode, editSession, bodyText, onBodyTextChange])

  const handleEditExit = useCallback(() => {
    onInteractionModeChange('read')
  }, [onInteractionModeChange])

  const handleTextChange = useCallback((text: string) => {
    editSession.updateText(text)
    onBodyTextChange(text)
  }, [editSession, onBodyTextChange])

  const isEditing = interactionMode === 'edit'
  const isArranging = interactionMode === 'arrange'
  const activeText = isEditing ? editSession.currentText : bodyText
  const config: LayoutConfig = useMemo(() => ({
    text: activeText,
    font: theme.typography.bodyFont,
    lineHeight: theme.typography.bodyLineHeight,
    columnCount: 2,
    margin,
    gutter,
    topOffset: headlineTop,
    columnTopOffsets: [bodyTopLeft, headlineTop],
    obstacles: obs.obstacles,
  }), [activeText, theme, margin, gutter, headlineTop, bodyTopLeft, obs.obstacles])

  return (
    <>
      <div style={{ position: 'absolute', left: `${pageOffsetX}px`, top: 0, width: `${vw}px`, height: '100%' }}>
        <HeadlineFitter
          text={page.content.headline}
          fontFamily={theme.typography.headlineFamily}
          maxWidth={headlineWidth}
          maxFontSize={headlineFontSize}
          minFontSize={Math.max(22, Math.round(vw * 0.026))}
          color={theme.colors.ink}
          x={margin}
          y={headlineTop}
        />

        <div style={{ position: 'absolute', left: `${margin + 4}px`, top: `${headlineTop + headlineHeight + creditGap}px`, font: theme.typography.creditFont, color: theme.colors.muted, textTransform: 'uppercase', letterSpacing: '1.5px', userSelect: 'text', transition: 'color 0.5s ease-out' }}>
          {page.content.credit}
        </div>

        {dropCapChar && (
          <DropCap
            char={dropCapChar}
            lineHeight={theme.typography.bodyLineHeight}
            lineCount={page.layout.dropCapLines}
            fontFamily={theme.typography.headlineFamily}
            color={theme.colors.accent}
            x={margin}
            y={bodyTopLeft}
            onMeasured={obs.handleDropCapMeasured}
            dropCapStyle={theme.dropCapStyle}
          />
        )}

        <PullQuote
          text={page.content.pullQuote}
          x={obs.pullQuoteX}
          y={obs.pullQuoteY}
          width={obs.pullQuoteWidth}
          fontFamily={theme.typography.headlineFamily}
          accentColor={theme.colors.accent}
          inkColor={theme.colors.muted}
        />

        <PageCanvas
          config={config}
          inkColor={theme.colors.ink}
          hoverColor={interactionMode === 'read' ? theme.colors.accent : undefined}
        />

        {isEditing && (
          <TextBlockEditor
            initialText={bodyText}
            config={config}
            font={theme.typography.bodyFont}
            lineHeight={theme.typography.bodyLineHeight}
            cursorColor={theme.colors.accent}
            viewportWidth={vw}
            viewportHeight={vh}
            onTextChange={handleTextChange}
            onExit={handleEditExit}
          />
        )}

        <DraggableObstacle
          x={obs.obstaclePos.x}
          y={obs.obstaclePos.y}
          width={obs.obstacleWidth}
          height={obs.obstacleHeight}
          onMove={obs.handleObstacleMove}
          label={obs.obstacleLabel}
          color={`${theme.colors.accent}26`}
          interactive={isArranging}
        />

        <CircleObstacle
          cx={obs.circlePos.cx}
          cy={obs.circlePos.cy}
          radius={obs.circleRadius}
          onMove={obs.handleCircleMove}
          strokeColor={`${theme.colors.accent}80`}
          fillColor={`${theme.colors.accent}0f`}
          label={obs.circleLabel}
          interactive={isArranging}
        />

        <ImageObstacle
          src={theme.imageOverrides?.[page.id] ?? obs.imageSrc}
          x={obs.imagePos.x}
          y={obs.imagePos.y}
          width={obs.imageW}
          height={obs.imageH}
          onMove={obs.handleImageMove}
          onHullReady={obs.handleImageHullReady}
          interactive={isArranging}
        />
      </div>
    </>
  )
}
