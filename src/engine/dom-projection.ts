import type { PositionedLine } from './types'

// Imperative pooled-div renderer — bypasses React reconciliation entirely.
// Same pattern as pretext's syncPool: grow/shrink a pool of absolutely-positioned
// divs to match the current line count, reusing DOM nodes to minimize GC.

export interface LinePool {
  mount(container: HTMLElement): void
  project(
    lines: readonly PositionedLine[],
    font: string,
    lineHeight: number,
    color: string,
    hoverColor?: string,
  ): void
  unmount(): void
}

export function createLinePool(): LinePool {
  const pool: HTMLDivElement[] = []
  let container: HTMLElement | null = null
  let styleInjected = false

  function injectHoverStyle(): void {
    if (styleInjected) return
    styleInjected = true
    const style = document.createElement('style')
    style.textContent = `
      .broadsheet-line {
        transition: color 120ms ease-out;
      }
    `
    document.head.appendChild(style)
  }

  function syncPool(length: number): void {
    if (!container) return

    while (pool.length < length) {
      const el = document.createElement('div')
      el.className = 'broadsheet-line'
      el.style.position = 'absolute'
      el.style.whiteSpace = 'pre'
      el.style.margin = '0'
      el.style.padding = '0'
      el.style.userSelect = 'text'
      el.style.cursor = 'text'
      pool.push(el)
      container.appendChild(el)
    }

    while (pool.length > length) {
      const el = pool.pop()!
      el.remove()
    }
  }

  return {
    mount(el: HTMLElement) {
      container = el
      injectHoverStyle()
    },

    project(
      lines: readonly PositionedLine[],
      font: string,
      lineHeight: number,
      color: string,
      hoverColor?: string,
    ) {
      syncPool(lines.length)

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]!
        const el = pool[i]!
        el.textContent = line.text
        el.style.left = `${line.x}px`
        el.style.top = `${line.y}px`
        el.style.font = font
        el.style.lineHeight = `${lineHeight}px`
        el.style.color = color

        if (hoverColor) {
          el.onmouseenter = () => { el.style.color = hoverColor }
          el.onmouseleave = () => { el.style.color = color }
        }
      }
    },

    unmount() {
      for (const el of pool) {
        el.onmouseenter = null
        el.onmouseleave = null
        el.remove()
      }
      pool.length = 0
      container = null
    },
  }
}
