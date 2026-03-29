import { useState, useRef, useCallback } from 'react'

interface HistoryState {
  readonly entries: readonly string[]
  readonly index: number
}

interface HistoryActions {
  readonly canUndo: boolean
  readonly canRedo: boolean
  readonly currentText: string
  readonly push: (text: string) => void
  readonly undo: () => string | null
  readonly redo: () => string | null
}

const MAX_ENTRIES = 50

function createInitialState(text: string): HistoryState {
  return { entries: [text], index: 0 }
}

export function useHistory(initialText: string): HistoryActions {
  const initialState = createInitialState(initialText)
  const [state, setState] = useState<HistoryState>(initialState)
  const stateRef = useRef<HistoryState>(initialState)

  const commitState = useCallback((nextState: HistoryState) => {
    stateRef.current = nextState
    setState(nextState)
  }, [])

  const push = useCallback((text: string) => {
    const prev = stateRef.current
    if (prev.entries[prev.index] === text) return

    // Truncate any redo entries after current index
    const truncated = prev.entries.slice(0, prev.index + 1)
    const newEntries = [...truncated, text]

    // Enforce max entries limit
    const nextState = newEntries.length > MAX_ENTRIES
      ? {
          entries: newEntries.slice(newEntries.length - MAX_ENTRIES),
          index: MAX_ENTRIES - 1,
        }
      : { entries: newEntries, index: newEntries.length - 1 }

    commitState(nextState)
  }, [commitState])

  const undo = useCallback((): string | null => {
    const prev = stateRef.current
    if (prev.index <= 0) return null

    const newIndex = prev.index - 1
    const nextState = { ...prev, index: newIndex }
    commitState(nextState)
    return nextState.entries[newIndex]!
  }, [commitState])

  const redo = useCallback((): string | null => {
    const prev = stateRef.current
    if (prev.index >= prev.entries.length - 1) return null

    const newIndex = prev.index + 1
    const nextState = { ...prev, index: newIndex }
    commitState(nextState)
    return nextState.entries[newIndex]!
  }, [commitState])

  const canUndo = state.index > 0
  const canRedo = state.index < state.entries.length - 1
  const currentText = state.entries[state.index]!

  return { canUndo, canRedo, currentText, push, undo, redo }
}
