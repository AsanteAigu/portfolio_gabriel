import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

const IconAward = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </svg>
)

const IconMapPin = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const IconStar = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const skills = ['Python', 'Machine Learning', 'C++', 'Data Science', 'SQL']

export default function Hero() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const scrollRef = useRef(null)
  const mainCardRef = useRef(null)
  const stackCardRef = useRef(null)
  const badgeRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 })

      // Text entrance
      tl.from(headlineRef.current.querySelectorAll('.hero__word'), {
        opacity: 0, y: 64, duration: 0.85, stagger: 0.08, ease: 'power3.out',
      })
        .from(subRef.current,
          { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.35')
        .from(ctaRef.current.children,
          { opacity: 0, y: 16, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, '-=0.25')
        .from(scrollRef.current,
          { opacity: 0, duration: 0.4, ease: 'power2.out' }, '-=0.1')

      // Cards entrance (staggered from right)
      tl.from(badgeRef.current,
        { opacity: 0, x: 30, y: -10, duration: 0.6, ease: 'power2.out' }, '-=0.6')
        .from(mainCardRef.current,
          { opacity: 0, x: 40, duration: 0.7, ease: 'power2.out' }, '-=0.5')
        .from(stackCardRef.current,
          { opacity: 0, x: 30, duration: 0.6, ease: 'power2.out' }, '-=0.4')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollTo = (id) => (e) => {
    e.preventDefault()
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" ref={sectionRef}>
      <div className="hero__inner container">

        {/* ── Left: text ─────────────────────────────── */}
        <div className="hero__content">
          <h1 className="hero__headline" ref={headlineRef}>
            {['Building', 'intelligent', 'systems.'].map((word, i) => (
              <span key={i} className="hero__word-wrap">
                <span className="hero__word">{word}</span>
              </span>
            ))}
          </h1>

          <p className="hero__sub" ref={subRef}>
            Machine Learning Engineer and Robotics enthusiast at the University of Ghana —
            building technology at the intersection of AI, software, and systems,
            with a stubborn conviction that it can change the trajectory of a nation.
          </p>

          <div className="hero__cta" ref={ctaRef}>
            <a href="#work" className="hero__btn hero__btn--primary" onClick={scrollTo('#work')}>
              <span>See my work</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a href="#contact" className="hero__btn hero__btn--ghost" onClick={scrollTo('#contact')}>
              Let's talk
            </a>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-value">1st</span>
              <span className="hero__stat-label">Honours</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-value">2+</span>
              <span className="hero__stat-label">Projects</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-value">2</span>
              <span className="hero__stat-label">Awards</span>
            </div>
          </div>
        </div>

        {/* ── Right: floating cards ──────────────────── */}
        <div className="hero__visual" aria-hidden="true">

          {/* Award badge — top floating pill */}
          <div className="hero__vc-badge" ref={badgeRef}>
            <span className="hero__vc-badge-icon"><IconAward /></span>
            <span>MISE Research Scholar · 2023</span>
          </div>

          {/* Main profile card */}
          <div className="hero__vc-main" ref={mainCardRef}>
            <div className="hero__vc-header">
              <div className="hero__vc-photo-wrap">
                <img
                  src="/assets/images/gabriel_kwaku_profile_photo.jpg"
                  alt="Gabriel Kwaku Asante"
                  className="hero__vc-photo"
                />
                <span className="hero__vc-online" />
              </div>
              <div>
                <p className="hero__vc-name">Gabriel Kwaku Asante</p>
                <p className="hero__vc-role">
                  <IconMapPin />
                  Computer Engineering · UoG
                </p>
              </div>
            </div>

            <div className="hero__vc-divider" />

            <div className="hero__vc-stats">
              <div className="hero__vc-stat">
                <span className="hero__vc-stat-value">2028</span>
                <span className="hero__vc-stat-label">Grad Year</span>
              </div>
              <div className="hero__vc-stat-sep" />
              <div className="hero__vc-stat">
                <span className="hero__vc-stat-value">2+</span>
                <span className="hero__vc-stat-label">Projects</span>
              </div>
              <div className="hero__vc-stat-sep" />
              <div className="hero__vc-stat">
                <div className="hero__vc-stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="hero__vc-star"><IconStar /></span>
                  ))}
                </div>
                <span className="hero__vc-stat-label">First Class</span>
              </div>
            </div>
          </div>

          {/* Skills card */}
          <div className="hero__vc-stack" ref={stackCardRef}>
            <p className="hero__vc-stack-label text-upper">Tech stack</p>
            <div className="hero__vc-tags">
              {skills.map(s => (
                <span key={s} className="hero__vc-tag">{s}</span>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="hero__scroll-indicator" ref={scrollRef}>
        <div className="hero__scroll-line" />
        <span className="text-upper">Scroll</span>
      </div>

      <div className="hero__bg-grid" aria-hidden="true" />
    </section>
  )
}
