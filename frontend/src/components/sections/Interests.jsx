import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Interests.css'

gsap.registerPlugin(ScrollTrigger)

const IconBrain = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3 3 3 0 0 1-3 3h-.5a4.5 4.5 0 0 1-4.5 4.5A4.5 4.5 0 0 1 7.5 13H7a3 3 0 0 1-3-3 3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z" />
    <path d="M12 6v6" />
    <path d="M8 10h8" />
  </svg>
)

const IconSprout = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 20h10" />
    <path d="M10 20c5.5-2.5.8-6.4 3-10" />
    <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
    <path d="M14.1 6a7 7 0 0 1 1.4 7 4.9 4.9 0 0 1-5.5-4.8A4.9 4.9 0 0 1 14.1 6z" />
  </svg>
)

const interests = [
  {
    id: 'machine-learning',
    label: 'Machine Learning',
    description: 'Training models that learn patterns and generalise across unseen data.',
    icon: <IconBrain />,
  },
  {
    id: 'agriculture',
    label: 'Agriculture',
    description: 'Applying technology and data-driven methods to improve food systems and crop yield.',
    icon: <IconSprout />,
  },
]

export default function Interests() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)
  const [active, setActive] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 95%', once: true },
      })

      gsap.from(gridRef.current.children, {
        opacity: 0,
        y: 40,
        scale: 0.97,
        duration: 0.55,
        stagger: 0.07,
        ease: 'power2.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 95%', once: true },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  function handleSelect(id) {
    setActive(prev => (prev === id ? null : id))
  }

  return (
    <section id="interests" className="interests section" ref={sectionRef}>
      <div className="container">
        <header className="interests__header" ref={headerRef}>
          <div className="section-label">
            <span className="text-upper">Areas of interest</span>
          </div>
          <h2 className="h2 interests__headline">What drives me</h2>
          <p className="interests__sub body-lg">
            Areas I'm passionate about and continuously exploring.
          </p>
        </header>

        <div className="interests__grid" ref={gridRef}>
          {interests.map(item => (
            <button
              key={item.id}
              className={`interest-card ${active === item.id ? 'interest-card--active' : ''}`}
              onClick={() => handleSelect(item.id)}
              aria-pressed={active === item.id}
            >
              <div className="interest-card__icon-wrap">
                {item.icon}
              </div>
              <span className="interest-card__label text-upper">{item.label}</span>
              <div className="interest-card__desc-wrap">
                <p className="interest-card__desc">{item.description}</p>
              </div>

              <div className="interest-card__corner interest-card__corner--tl" />
              <div className="interest-card__corner interest-card__corner--tr" />
              <div className="interest-card__corner interest-card__corner--bl" />
              <div className="interest-card__corner interest-card__corner--br" />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
