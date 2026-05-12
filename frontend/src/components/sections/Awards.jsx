import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Awards.css'

gsap.registerPlugin(ScrollTrigger)

const IconAward = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </svg>
)

const IconCertificate = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8" />
    <path d="M12 17v4" />
    <path d="M7 8h10" />
    <path d="M7 12h6" />
  </svg>
)

const awards = [
  {
    title: 'Certificate of Distinction',
    subtitle: 'MISE Problem Solving Tournament',
    org: 'Mathematically Inspired Science & Engineering Foundation',
    date: 'Feb 2023',
  },
  {
    title: 'Silver Medalist',
    subtitle: 'Eskom Science Expo',
    org: 'National science & engineering competition, South Africa',
    date: 'Aug 2023',
  },
]

const certifications = [
  {
    title: 'Research Project in Machine Intelligence',
    org: 'Harvard University · MISE Summer Program',
    date: 'Aug 2023',
  },
]

export default function Awards() {
  const sectionRef = useRef(null)
  const leftRef   = useRef(null)
  const rightRef  = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: leftRef.current, start: 'top 95%', once: true },
      })
      gsap.from(rightRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: rightRef.current, start: 'top 95%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="awards" className="awards section" ref={sectionRef}>
      <div className="awards__inner container">

        {/* Awards column */}
        <div className="awards__col" ref={leftRef}>
          <div className="awards__col-header">
            <span className="awards__col-icon"><IconAward /></span>
            <span className="text-upper awards__col-label">Awards &amp; Honors</span>
          </div>

          {awards.map((item) => (
            <div key={item.title + item.date} className="award-card">
              <div className="award-card__top">
                <div>
                  <p className="award-card__title">{item.title}</p>
                  <p className="award-card__subtitle">{item.subtitle}</p>
                </div>
                <span className="award-card__date small">{item.date}</span>
              </div>
              <p className="award-card__org small">{item.org}</p>
            </div>
          ))}
        </div>

        {/* Certifications column */}
        <div className="awards__col" ref={rightRef}>
          <div className="awards__col-header">
            <span className="awards__col-icon awards__col-icon--cert"><IconCertificate /></span>
            <span className="text-upper awards__col-label">Certifications</span>
          </div>

          {certifications.map((item) => (
            <div key={item.title} className="cert-card">
              <div className="cert-card__dot" />
              <div>
                <p className="cert-card__title">{item.title}</p>
                <p className="cert-card__meta small">
                  {item.org}
                  <span className="cert-card__date">{item.date}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
