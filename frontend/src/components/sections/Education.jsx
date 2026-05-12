import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Education.css'

gsap.registerPlugin(ScrollTrigger)

const IconGradCap = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
)

const IconCalendar = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const education = [
  {
    degree: 'BSc Computer Engineering',
    school: 'University of Ghana',
    period: '2025 – 2028 (Expected)',
    level: 'Level 200 · Sophomore',
    details: ['First Class Standing'],
    current: true,
  },
  {
    degree: 'West African Senior School Certificate (WASSCE)',
    school: "Presbyterian Boys' Secondary School",
    location: 'Legon, Ghana',
    period: '2019 – 2022',
    level: 'Senior High School',
    details: ['7 A\'s · 1 B', 'Final GPA: 3.95 / 4.00'],
    current: false,
  },
]

export default function Education() {
  const sectionRef = useRef(null)
  const headerRef  = useRef(null)
  const cardsRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        opacity: 0, y: 30, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 95%', once: true },
      })
      gsap.from(cardsRef.current.children, {
        opacity: 0, y: 40, duration: 0.65, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 95%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="education" className="education section" ref={sectionRef}>
      <div className="container">
        <header className="education__header" ref={headerRef}>
          <div className="section-label">
            <span className="text-upper">Education</span>
          </div>
          <h2 className="h2 education__headline">Academic background</h2>
        </header>

        <div className="education__cards" ref={cardsRef}>
          {education.map((edu) => (
            <div key={edu.school} className={`edu-card ${edu.current ? 'edu-card--current' : ''}`}>
              <div className="edu-card__icon-wrap">
                <IconGradCap />
              </div>

              <div className="edu-card__body">
                <div className="edu-card__top">
                  <div>
                    <h3 className="edu-card__degree">{edu.degree}</h3>
                    <p className="edu-card__school">{edu.school}</p>
                    {edu.location && <p className="edu-card__location small">{edu.location}</p>}
                  </div>
                  {edu.current && <span className="edu-card__badge">Current</span>}
                </div>

                <div className="edu-card__meta">
                  <span className="edu-card__period small">
                    <IconCalendar />
                    {edu.period}
                  </span>
                  <span className="edu-card__level small">{edu.level}</span>
                </div>

                <ul className="edu-card__details">
                  {edu.details.map(d => (
                    <li key={d} className="edu-card__detail small">
                      <span className="edu-card__dot" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
