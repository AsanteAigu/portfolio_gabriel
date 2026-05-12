import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Experience.css'

gsap.registerPlugin(ScrollTrigger)

const IconBriefcase = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
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

const IconPin = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const experiences = [
  {
    company: 'National Information Technology Agency (NITA)',
    role: 'Software & IT Intern',
    start: 'Nov 2025',
    end: 'Dec 2025',
    location: 'Accra, Ghana',
    description: 'Developed a full-stack client booking system handling appointment scheduling and management. Built with a Node.js backend and clean HTML/CSS/JS frontend.',
    tags: ['Node.js', 'HTML', 'CSS', 'JavaScript', 'Full-Stack'],
    current: false,
  },
  {
    company: 'Brif Africa',
    role: 'Content & Storytelling Intern',
    start: 'Jan 2025',
    end: 'Jun 2025',
    location: 'Ghana',
    description: 'Crafted compelling narratives and content strategies that communicate complex ideas clearly across digital platforms for African audiences.',
    tags: ['Content Strategy', 'Storytelling', 'Digital Media'],
    current: false,
  },
]

export default function Experience() {
  const sectionRef = useRef(null)
  const headerRef  = useRef(null)
  const listRef    = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        opacity: 0, y: 30, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 95%', once: true },
      })
      gsap.from(listRef.current.children, {
        opacity: 0, y: 40, duration: 0.65, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: listRef.current, start: 'top 95%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" className="experience section" ref={sectionRef}>
      <div className="container">
        <header className="experience__header" ref={headerRef}>
          <div className="section-label">
            <span className="text-upper">Work experience</span>
          </div>
          <h2 className="h2 experience__headline">Where I've worked</h2>
        </header>

        <div className="experience__list" ref={listRef}>
          {experiences.map((exp) => (
            <div key={exp.company} className={`exp-card ${exp.current ? 'exp-card--current' : ''}`}>
              <div className="exp-card__aside">
                <div className="exp-card__icon-wrap">
                  <IconBriefcase />
                </div>
                <div className="exp-card__line" />
              </div>

              <div className="exp-card__body">
                <div className="exp-card__top">
                  <div>
                    <h3 className="exp-card__company">{exp.company}</h3>
                    <p className="exp-card__role">{exp.role}</p>
                  </div>
                  <div className="exp-card__right">
                    <span className="exp-card__date small">
                      <IconCalendar />
                      {exp.start} – {exp.end}
                    </span>
                    <span className="exp-card__location small">
                      <IconPin />
                      {exp.location}
                    </span>
                    {exp.current && <span className="exp-card__badge">Current</span>}
                  </div>
                </div>

                <p className="exp-card__desc">{exp.description}</p>

                <div className="exp-card__tags">
                  {exp.tags.map(tag => (
                    <span key={tag} className="exp-card__tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
