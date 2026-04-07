import { useState, useEffect, useCallback, useRef } from 'react'
import { Atmosphere } from './components/Atmosphere.tsx'
import { EditorialPage } from './components/EditorialPage.tsx'
import { hiringPages } from './content/hiring-pages.ts'
import { synthesisPages } from './content/synthesis-pages.ts'
import { parchment } from './themes/parchment.ts'
import { darkEditorial } from './themes/dark-editorial.ts'
import { oldEnglish } from './themes/old-english.ts'
import type { BroadsheetTheme } from './themes/types.ts'
import type { EditorialPageDefinition, InteractionMode } from './model/page.ts'

function useViewport() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })

  useEffect(() => {
    const onResize = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return size
}

const THEMES: readonly BroadsheetTheme[] = [parchment, darkEditorial, oldEnglish]
const ALL_PAGES: readonly EditorialPageDefinition[] = [...hiringPages, ...synthesisPages]

function getEditableBodyText(page: EditorialPageDefinition): string {
  const dropCapChar = page.content.bodyText[0] ?? ''
  return page.content.bodyText.slice(dropCapChar.length)
}

function getToolbarMessage(
  mode: InteractionMode,
  page: EditorialPageDefinition,
  compact: boolean,
): string {
  if (mode === 'edit') {
    return compact
      ? 'Editing copy. Press Esc to stop.'
      : 'Editing copy directly in the layout. Press Esc to return to reading.'
  }

  if (mode === 'arrange') {
    return compact
      ? 'Arrange mode. Drag obstacles.'
      : 'Arrange mode. Drag obstacles and use the image turn control to reshape the composition.'
  }

  return compact
    ? 'Read mode. Choose Edit or Arrange above.'
    : page.instructions
}

function App() {
  const [themeIndex, setThemeIndex] = useState(0)
  const [pageIndex, setPageIndex] = useState(0)
  const [mode, setMode] = useState<InteractionMode>('read')
  const [draftBodies, setDraftBodies] = useState<Record<string, string>>({})
  const theme = THEMES[themeIndex]!
  const selectedPage = ALL_PAGES[pageIndex]!
  const { width, height } = useViewport()
  const compactToolbar = width < 760

  const rootRef = useRef<HTMLDivElement>(null)

  const toggleTheme = useCallback(() => {
    const el = rootRef.current
    if (el) {
      el.classList.add('bs-theme-switching')
    }
    setThemeIndex((prev) => (prev + 1) % THEMES.length)
  }, [])

  useEffect(() => {
    const el = rootRef.current
    if (!el || !el.classList.contains('bs-theme-switching')) return
    const id = requestAnimationFrame(() => el.classList.remove('bs-theme-switching'))
    return () => cancelAnimationFrame(id)
  }, [themeIndex])

  const selectPage = useCallback((index: number) => {
    setPageIndex(index)
    setMode('read')
  }, [])

  const updateSelectedBodyText = useCallback((text: string) => {
    setDraftBodies((prev) => {
      if (prev[selectedPage.id] === text) return prev
      return { ...prev, [selectedPage.id]: text }
    })
  }, [selectedPage.id])

  const selectedBodyText = draftBodies[selectedPage.id] ?? getEditableBodyText(selectedPage)
  const isPageDirty = selectedBodyText !== getEditableBodyText(selectedPage)
  const toolbarMessage = getToolbarMessage(mode, selectedPage, compactToolbar)

  return (
    <div ref={rootRef} className="bs-root-bg" style={{ position: 'fixed', inset: 0, backgroundColor: theme.colors.paper, overflow: 'hidden' }}>
      {theme.atmosphere.enabled && <Atmosphere layers={theme.atmosphere.layers} />}

      <EditorialPage
        key={selectedPage.id}
        page={selectedPage}
        bodyText={selectedBodyText}
        interactionMode={mode}
        onBodyTextChange={updateSelectedBodyText}
        onInteractionModeChange={setMode}
        theme={theme}
        viewportWidth={width}
        viewportHeight={height}
      />

      <Toolbar
        theme={theme}
        compactToolbar={compactToolbar}
        pageIndex={pageIndex}
        mode={mode}
        isPageDirty={isPageDirty}
        toolbarMessage={toolbarMessage}
        draftBodies={draftBodies}
        onSelectPage={selectPage}
        onSetMode={setMode}
        onToggleTheme={toggleTheme}
      />

      <PageTurnArrows
        theme={theme}
        pageIndex={pageIndex}
        pageCount={ALL_PAGES.length}
        onSelectPage={selectPage}
      />

      <Footer theme={theme} />
    </div>
  )
}

interface ToolbarProps {
  readonly theme: BroadsheetTheme
  readonly compactToolbar: boolean
  readonly pageIndex: number
  readonly mode: InteractionMode
  readonly isPageDirty: boolean
  readonly toolbarMessage: string
  readonly draftBodies: Record<string, string>
  readonly onSelectPage: (index: number) => void
  readonly onSetMode: (mode: InteractionMode) => void
  readonly onToggleTheme: () => void
}

function Toolbar({
  theme,
  compactToolbar,
  pageIndex,
  mode,
  isPageDirty,
  toolbarMessage,
  draftBodies,
  onSelectPage,
  onSetMode,
  onToggleTheme,
}: ToolbarProps) {
  return (
    <div style={{ position: 'fixed', top: '12px', left: '16px', right: '16px', display: 'flex', justifyContent: 'center', pointerEvents: 'none', zIndex: 30 }}>
      <div
        className="bs-toolbar"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          maxWidth: 'min(1120px, 100%)',
          padding: compactToolbar ? '10px 12px' : '12px 14px',
          borderRadius: '24px',
          background: theme.id === 'dark-editorial' ? 'rgba(22, 25, 28, 0.72)' : theme.id === 'old-english' ? 'rgba(210, 190, 150, 0.82)' : 'rgba(246, 240, 230, 0.78)',
          boxShadow: theme.id === 'dark-editorial'
            ? '0 18px 40px rgba(0, 0, 0, 0.24), 0 0 0 1px rgba(232, 224, 208, 0.12)'
            : theme.id === 'old-english'
              ? '0 18px 40px rgba(35, 30, 22, 0.1), 0 0 0 1px rgba(60, 40, 15, 0.18)'
              : '0 18px 40px rgba(35, 30, 22, 0.1), 0 0 0 1px rgba(35, 30, 22, 0.12)',
          backdropFilter: 'blur(14px)',
          pointerEvents: 'auto',
        }}
      >
        <PageTabs
          theme={theme}
          pageIndex={pageIndex}
          draftBodies={draftBodies}
          onSelectPage={onSelectPage}
        />

        {!compactToolbar && (
          <div style={{ width: '1px', alignSelf: 'stretch', background: `${theme.colors.ink}14`, margin: '0 4px' }} />
        )}

        <ModeButtons theme={theme} mode={mode} onSetMode={onSetMode} />

        <button
          type="button"
          className="bs-btn bs-btn-tab"
          onClick={onToggleTheme}
          style={{
            background: `${theme.colors.ink}12`,
            border: `1px solid ${theme.colors.ink}22`,
            borderRadius: '16px',
            padding: '6px 14px',
            fontSize: '11px',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            color: theme.colors.muted,
            cursor: 'pointer',
            letterSpacing: '0.5px',
            textTransform: 'uppercase' as const,
            ['--bs-hover-bg' as string]: `${theme.colors.ink}18`,
            ['--bs-focus-ring' as string]: `${theme.colors.accent}80`,
          }}
        >
          {theme.id === 'parchment' ? 'dark' : theme.id === 'dark-editorial' ? 'old english' : 'light'}
        </button>

        <StatusBar
          theme={theme}
          toolbarMessage={toolbarMessage}
          isPageDirty={isPageDirty}
        />
      </div>
    </div>
  )
}

interface PageTabsProps {
  readonly theme: BroadsheetTheme
  readonly pageIndex: number
  readonly draftBodies: Record<string, string>
  readonly onSelectPage: (index: number) => void
}

function PageTabs({ theme, pageIndex, draftBodies, onSelectPage }: PageTabsProps) {
  const editorialCount = hiringPages.length
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
      {ALL_PAGES.map((page, index) => {
        const isActive = index === pageIndex
        const pageBodyText = draftBodies[page.id] ?? getEditableBodyText(page)
        const pageIsDirty = pageBodyText !== getEditableBodyText(page)
        const isSynthesis = index >= editorialCount
        return (
          <span key={page.id} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            {index === editorialCount && (
              <span
                style={{
                  width: '1px',
                  alignSelf: 'stretch',
                  minHeight: '18px',
                  background: `${theme.colors.ink}18`,
                  margin: '0 2px',
                }}
              />
            )}
            <button
              type="button"
              className="bs-btn bs-btn-tab"
              aria-pressed={isActive}
              onClick={() => onSelectPage(index)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: isActive ? `${theme.colors.accent}2b` : `${theme.colors.ink}${isSynthesis ? '0a' : '12'}`,
                border: `1px solid ${isActive ? `${theme.colors.accent}72` : `${theme.colors.ink}${isSynthesis ? '18' : '22'}`}`,
                borderRadius: '16px',
                padding: '5px 11px',
                fontSize: '10px',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                color: isActive ? theme.colors.ink : theme.colors.muted,
                cursor: 'pointer',
                letterSpacing: '0.5px',
                textTransform: 'uppercase' as const,
                ['--bs-hover-bg' as string]: isActive ? `${theme.colors.accent}35` : `${theme.colors.ink}18`,
                ['--bs-focus-ring' as string]: `${theme.colors.accent}80`,
              }}
            >
              <span>{page.name}</span>
              {pageIsDirty && (
                <span
                  style={{
                    padding: '2px 6px',
                    borderRadius: '999px',
                    background: `${theme.colors.accent}22`,
                    color: theme.colors.accent,
                    fontSize: '9px',
                    letterSpacing: '0.4px',
                  }}
                >
                  draft
                </span>
              )}
            </button>
          </span>
        )
      })}
    </div>
  )
}

interface ModeButtonsProps {
  readonly theme: BroadsheetTheme
  readonly mode: InteractionMode
  readonly onSetMode: (mode: InteractionMode) => void
}

function ModeButtons({ theme, mode, onSetMode }: ModeButtonsProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
      {(['read', 'edit', 'arrange'] as const).map((nextMode) => {
        const isActive = nextMode === mode
        return (
          <button
            key={nextMode}
            type="button"
            className="bs-btn bs-btn-tab"
            aria-pressed={isActive}
            onClick={() => onSetMode(nextMode)}
            style={{
              background: isActive ? `${theme.colors.accent}30` : 'transparent',
              border: `1px solid ${isActive ? `${theme.colors.accent}60` : `${theme.colors.ink}1a`}`,
              borderRadius: '16px',
              padding: '6px 12px',
              fontSize: '11px',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              color: isActive ? theme.colors.accent : theme.colors.muted,
              cursor: 'pointer',
              letterSpacing: '0.5px',
              textTransform: 'uppercase' as const,
              ['--bs-hover-bg' as string]: isActive ? `${theme.colors.accent}3a` : `${theme.colors.ink}12`,
              ['--bs-focus-ring' as string]: `${theme.colors.accent}80`,
            }}
          >
            {nextMode}
          </button>
        )
      })}
    </div>
  )
}

interface StatusBarProps {
  readonly theme: BroadsheetTheme
  readonly toolbarMessage: string
  readonly isPageDirty: boolean
}

function StatusBar({ theme, toolbarMessage, isPageDirty }: StatusBarProps) {
  return (
    <div
      style={{
        flexBasis: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        minHeight: '20px',
      }}
    >
      <span
        className="bs-status-text"
        style={{
          fontSize: '12px',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          color: theme.colors.muted,
          letterSpacing: '0.2px',
          textAlign: 'center' as const,
        }}
      >
        {toolbarMessage}
      </span>
      {isPageDirty && (
        <span
          style={{
            padding: '2px 8px',
            borderRadius: '999px',
            background: `${theme.colors.accent}20`,
            color: theme.colors.accent,
            fontSize: '10px',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            letterSpacing: '0.4px',
            textTransform: 'uppercase' as const,
          }}
        >
          draft kept while switching
        </span>
      )}
    </div>
  )
}

interface FooterProps {
  readonly theme: BroadsheetTheme
}

function Footer({ theme }: FooterProps) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '12px',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 30,
      }}
    >
      <span
        className="bs-footer"
        style={{
          fontSize: '10px',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          color: `${theme.colors.muted}80`,
          letterSpacing: '0.8px',
          textTransform: 'uppercase' as const,
        }}
      >
        Built with Broadsheet
      </span>
    </div>
  )
}

interface PageTurnArrowsProps {
  readonly theme: BroadsheetTheme
  readonly pageIndex: number
  readonly pageCount: number
  readonly onSelectPage: (index: number) => void
}

function PageTurnArrows({ theme, pageIndex, pageCount, onSelectPage }: PageTurnArrowsProps) {
  const hasPrev = pageIndex > 0
  const hasNext = pageIndex < pageCount - 1
  const prevPage = hasPrev ? ALL_PAGES[pageIndex - 1] : null
  const nextPage = hasNext ? ALL_PAGES[pageIndex + 1] : null

  const arrowStyle = (enabled: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'transparent',
    border: 'none',
    cursor: enabled ? 'pointer' : 'default',
    opacity: enabled ? 0.6 : 0.15,
    color: theme.colors.muted,
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    fontSize: '11px',
    letterSpacing: '0.3px',
    padding: '12px 16px',
    pointerEvents: enabled ? 'auto' : 'none',
  })

  return (
    <>
      <button
        type="button"
        className="bs-btn bs-btn-sm bs-btn-arrow"
        onClick={() => hasPrev && onSelectPage(pageIndex - 1)}
        style={{
          ...arrowStyle(hasPrev),
          position: 'fixed',
          left: '8px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 25,
        }}
        aria-label={prevPage ? `Previous: ${prevPage.name}` : 'No previous page'}
        title={prevPage ? `Previous: ${prevPage.name}` : undefined}
      >
        <span style={{ fontSize: '20px', lineHeight: 1 }}>&lsaquo;</span>
      </button>
      <button
        type="button"
        className="bs-btn bs-btn-sm bs-btn-arrow"
        onClick={() => hasNext && onSelectPage(pageIndex + 1)}
        style={{
          ...arrowStyle(hasNext),
          position: 'fixed',
          right: '8px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 25,
        }}
        aria-label={nextPage ? `Next: ${nextPage.name}` : 'No next page'}
        title={nextPage ? `Next: ${nextPage.name}` : undefined}
      >
        <span style={{ fontSize: '20px', lineHeight: 1 }}>&rsaquo;</span>
      </button>
    </>
  )
}

export default App
