import { useState, useEffect, useCallback } from 'react'
import { Atmosphere } from './components/Atmosphere.tsx'
import { EditorialPage } from './components/EditorialPage.tsx'
import { hiringPages } from './content/hiring-pages.ts'
import { parchment } from './themes/parchment.ts'
import { darkEditorial } from './themes/dark-editorial.ts'
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

const THEMES: readonly BroadsheetTheme[] = [parchment, darkEditorial]

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
  const selectedPage = hiringPages[pageIndex]!
  const { width, height } = useViewport()
  const compactToolbar = width < 760

  const toggleTheme = useCallback(() => {
    setThemeIndex((prev) => (prev + 1) % THEMES.length)
  }, [])

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
    <div style={{ position: 'fixed', inset: 0, backgroundColor: theme.colors.paper, overflow: 'hidden', transition: 'background-color 0.5s ease-out' }}>
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
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          maxWidth: 'min(1120px, 100%)',
          padding: compactToolbar ? '10px 12px' : '12px 14px',
          borderRadius: '24px',
          background: theme.id === 'parchment' ? 'rgba(246, 240, 230, 0.78)' : 'rgba(22, 25, 28, 0.72)',
          border: `1px solid ${theme.id === 'parchment' ? 'rgba(35, 30, 22, 0.12)' : 'rgba(232, 224, 208, 0.12)'}`,
          boxShadow: theme.id === 'parchment'
            ? '0 18px 40px rgba(35, 30, 22, 0.1)'
            : '0 18px 40px rgba(0, 0, 0, 0.24)',
          backdropFilter: 'blur(14px)',
          pointerEvents: 'auto',
          transition: 'all 0.5s ease-out',
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
          onClick={onToggleTheme}
          style={{
            background: `${theme.colors.ink}12`,
            border: `1px solid ${theme.colors.ink}22`,
            borderRadius: '16px',
            padding: '6px 14px',
            fontSize: '11px',
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            color: theme.colors.muted,
            cursor: 'pointer',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            transition: 'all 0.3s ease-out',
          }}
        >
          {theme.id === 'parchment' ? 'dark' : 'light'}
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
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
      {hiringPages.map((page, index) => {
        const isActive = index === pageIndex
        const pageBodyText = draftBodies[page.id] ?? getEditableBodyText(page)
        const pageIsDirty = pageBodyText !== getEditableBodyText(page)
        return (
          <button
            key={page.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelectPage(index)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: isActive ? `${theme.colors.accent}2b` : `${theme.colors.ink}12`,
              border: `1px solid ${isActive ? `${theme.colors.accent}72` : `${theme.colors.ink}22`}`,
              borderRadius: '16px',
              padding: '6px 14px',
              fontSize: '11px',
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              color: isActive ? theme.colors.ink : theme.colors.muted,
              cursor: 'pointer',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              transition: 'all 0.3s ease-out',
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
                  fontSize: '10px',
                  letterSpacing: '0.4px',
                }}
              >
                draft
              </span>
            )}
          </button>
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
            aria-pressed={isActive}
            onClick={() => onSetMode(nextMode)}
            style={{
              background: isActive ? `${theme.colors.accent}30` : 'transparent',
              border: `1px solid ${isActive ? `${theme.colors.accent}60` : `${theme.colors.ink}1a`}`,
              borderRadius: '16px',
              padding: '6px 12px',
              fontSize: '11px',
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              color: isActive ? theme.colors.accent : theme.colors.muted,
              cursor: 'pointer',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              transition: 'all 0.3s ease-out',
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
        style={{
          fontSize: '12px',
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          color: theme.colors.muted,
          letterSpacing: '0.2px',
          textAlign: 'center',
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
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            letterSpacing: '0.4px',
            textTransform: 'uppercase',
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
        style={{
          fontSize: '10px',
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          color: `${theme.colors.muted}80`,
          letterSpacing: '0.8px',
          textTransform: 'uppercase',
          transition: 'color 0.5s ease-out',
        }}
      >
        Built with Broadsheet
      </span>
    </div>
  )
}

export default App
