import { useState, useCallback } from 'react'

type EditState = 'idle' | 'editing'

interface EditSession {
  readonly state: EditState
  readonly currentText: string
  readonly startEditing: (text: string) => void
  readonly commitEdit: (text?: string) => string
  readonly cancelEdit: () => void
  readonly updateText: (text: string) => void
}

export function useEditSession(initialText: string): EditSession {
  const [state, setState] = useState<EditState>('idle')
  const [currentText, setCurrentText] = useState(initialText)
  const [preEditText, setPreEditText] = useState(initialText)

  const startEditing = useCallback((text: string) => {
    setPreEditText(text)
    setCurrentText(text)
    setState('editing')
  }, [])

  const commitEdit = useCallback((text = currentText): string => {
    setCurrentText(text)
    setState('idle')
    return text
  }, [currentText])

  const cancelEdit = useCallback(() => {
    setCurrentText(preEditText)
    setState('idle')
  }, [preEditText])

  const updateText = useCallback((text: string) => {
    setCurrentText(text)
  }, [])

  return { state, currentText, startEditing, commitEdit, cancelEdit, updateText }
}
