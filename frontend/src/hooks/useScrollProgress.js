import { useState, useEffect, useRef } from 'react'

export function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref?.current
    if (!el) return

    const observer = new IntersectionObserver(() => {}, { threshold: 0 })

    function onScroll() {
      const rect = el.getBoundingClientRect()
      const total = rect.height + window.innerHeight
      const scrolled = window.innerHeight - rect.top
      const p = Math.max(0, Math.min(1, scrolled / total))
      setProgress(p)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [ref])

  return progress
}
