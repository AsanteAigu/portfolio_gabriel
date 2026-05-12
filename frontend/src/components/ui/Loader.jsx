import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Loader.css'

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null)
  const countRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete,
        })
      },
    })

    tl.to(countRef.current, {
      innerHTML: 100,
      duration: 1.4,
      ease: 'power2.inOut',
      snap: { innerHTML: 1 },
    })
      .to(barRef.current, { scaleX: 1, duration: 1.4, ease: 'power2.inOut' }, '<')
      .to({}, { duration: 0.2 })

    return () => tl.kill()
  }, [onComplete])

  return (
    <div className="loader" ref={loaderRef}>
      <div className="loader__inner">
        <div className="loader__bar-track">
          <div className="loader__bar" ref={barRef} />
        </div>
        <div className="loader__count">
          <span ref={countRef}>0</span>
          <span>%</span>
        </div>
      </div>
    </div>
  )
}
