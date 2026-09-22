import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Interests.css'

gsap.registerPlugin(ScrollTrigger)

const IconBarChart = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
    <line x1="2" y1="20" x2="22" y2="20" />
  </svg>
)

const IconDatabase = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
)

const IconRobot = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8" y2="16" strokeWidth="2.5" />
    <line x1="16" y1="16" x2="16" y2="16" strokeWidth="2.5" />
    <path d="M8 21v-1" />
    <path d="M16 21v-1" />
  </svg>
)

const IconTrendingUp = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
)

const IconBrain = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3 3 3 0 0 1-3 3h-.5a4.5 4.5 0 0 1-4.5 4.5A4.5 4.5 0 0 1 7.5 13H7a3 3 0 0 1-3-3 3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z" />
    <path d="M12 6v6" />
    <path d="M8 10h8" />
  </svg>
)

const IconCpu = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="14" x2="4" y2="14" />
  </svg>
)

const IconCode2 = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="12" y1="2" x2="12" y2="22" />
  </svg>
)

const IconNetwork = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="16" y="16" width="6" height="6" rx="1" />
    <rect x="2" y="16" width="6" height="6" rx="1" />
    <rect x="9" y="2" width="6" height="6" rx="1" />
    <path d="M5 16v-4h14v4" />
    <path d="M12 12V8" />
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
    id: 'data-science',
    label: 'Data Science',
    description: 'Extracting insight from complex datasets using statistical and computational methods.',
    icon: <IconBarChart />,
    color: '#3b82f6',
  },
  {
    id: 'database-design',
    label: 'Database Design',
    description: 'Structuring data efficiently for scale, integrity, and fast retrieval.',
    icon: <IconDatabase />,
    color: '#8b5cf6',
  },
  {
    id: 'robotics',
    label: 'Robotics',
    description: 'Building autonomous systems that perceive, reason, and act in the physical world.',
    icon: <IconRobot />,
    color: '#f97316',
  },
  {
    id: 'quant-finance',
    label: 'Quantitative Finance',
    description: 'Applying mathematical models to markets, pricing, and portfolio strategy.',
    icon: <IconTrendingUp />,
    color: '#10b981',
  },
  {
    id: 'machine-learning',
    label: 'Machine Learning',
    description: 'Training models that learn patterns and generalise across unseen data.',
    icon: <IconBrain />,
    color: '#ec4899',
  },
  {
    id: 'ai',
    label: 'Artificial Intelligence',
    description: 'Designing intelligent systems that reason, plan, and adapt autonomously.',
    icon: <IconCpu />,
    color: '#6366f1',
  },
  {
    id: 'agriculture',
    label: 'Agriculture',
    description: 'Applying technology and data-driven methods to improve food systems and crop yield.',
    icon: <IconSprout />,
    color: '#84cc16',
  },
  {
    id: 'computer-networks',
    label: 'Computer Networks',
    description: 'Understanding how data moves — protocols, routing, and the infrastructure behind connected systems.',
    icon: <IconNetwork />,
    color: '#06b6d4',
  },
  {
    id: 'software-engineering',
    label: 'Software Engineering',
    description: 'Building reliable, maintainable systems through clean architecture and thoughtful design.',
    icon: <IconCode2 />,
    color: '#ef4444',
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
              style={{ '--ic-color': item.color }}
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
