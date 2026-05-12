import { createContext, useContext, useState, useCallback } from 'react'

const CursorContext = createContext(null)

export function CursorProvider({ children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [variant, setVariant] = useState('default')

  const onMouseMove = useCallback((e) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }, [])

  const setHover = useCallback(() => setVariant('hover'), [])
  const setDefault = useCallback(() => setVariant('default'), [])

  return (
    <CursorContext.Provider value={{ position, variant, onMouseMove, setHover, setDefault }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  const ctx = useContext(CursorContext)
  if (!ctx) throw new Error('useCursor must be used inside CursorProvider')
  return ctx
}
