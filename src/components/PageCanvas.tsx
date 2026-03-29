import { useRef, useEffect, useCallback } from 'react'
import { createLinePool, type LinePool } from '../engine/dom-projection'
import { computeLayout, type LayoutConfig } from '../engine/layout-engine'

interface PageCanvasProps {
  readonly config: LayoutConfig
  readonly inkColor: string
  readonly hoverColor?: string
}

// PageCanvas renders text lines using an imperative DOM pool — no React
// reconciliation on the 200+ text divs. React only manages the container
// lifecycle; the pool handles all line create/update/remove imperatively.
export function PageCanvas({ config, inkColor, hoverColor }: PageCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const poolRef = useRef<LinePool | null>(null)
  const rafRef = useRef<number>(0)
  const scheduledRef = useRef(false)

  const commitFrame = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight

    const { columns } = computeLayout(config, width, height)
    const allLines = columns.flatMap(col => col.lines)

    let pool = poolRef.current
    if (!pool) {
      pool = createLinePool()
      pool.mount(container)
      poolRef.current = pool
    }

    pool.project(allLines, config.font, config.lineHeight, inkColor, hoverColor)
  }, [config, inkColor, hoverColor])

  const scheduleRender = useCallback(() => {
    if (scheduledRef.current) return
    scheduledRef.current = true
    rafRef.current = requestAnimationFrame(() => {
      scheduledRef.current = false
      commitFrame()
    })
  }, [commitFrame])

  // Mount pool and do initial render
  useEffect(() => {
    commitFrame()

    const observer = new ResizeObserver(() => {
      scheduleRender()
    })

    const container = containerRef.current
    if (container) {
      observer.observe(container)
    }

    return () => {
      observer.disconnect()
      cancelAnimationFrame(rafRef.current)
      poolRef.current?.unmount()
      poolRef.current = null
    }
  }, [commitFrame, scheduleRender])

  // Re-render when config changes
  useEffect(() => {
    commitFrame()
  }, [commitFrame])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    />
  )
}
