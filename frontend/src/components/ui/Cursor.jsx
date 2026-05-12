import { useEffect, useRef } from 'react'
import { useIsMobile } from '@/hooks/useMediaQuery'
import './Cursor.css'

export default function Cursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isMobile) return

    const cursor = cursorRef.current
    const dot = dotRef.current
    let mouseX = 0
    let mouseY = 0
    let curX = 0
    let curY = 0
    let rafId

    function onMove(e) {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
    }

    function loop() {
      curX += (mouseX - curX) * 0.22
      curY += (mouseY - curY) * 0.22
      cursor.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`
      rafId = requestAnimationFrame(loop)
    }

    function onHoverIn() {
      cursor.classList.add('cursor--hover')
    }

    function onHoverOut() {
      cursor.classList.remove('cursor--hover')
    }

    const hoverEls = document.querySelectorAll('a, button, [data-cursor="hover"]')
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', onHoverIn)
      el.addEventListener('mouseleave', onHoverOut)
    })

    document.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(loop)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      hoverEls.forEach(el => {
        el.removeEventListener('mouseenter', onHoverIn)
        el.removeEventListener('mouseleave', onHoverOut)
      })
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-dot" ref={dotRef} />
    </>
  )
}
