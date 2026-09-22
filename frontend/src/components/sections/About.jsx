import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const skills = [
  { category: 'Languages', items: ['Python', 'C++', 'SQL', 'JavaScript', 'MATLAB'] },
  { category: 'Data & ML', items: ['Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn', 'PCA', 't-SNE'] },
  { category: 'Web', items: ['HTML', 'CSS', 'Node.js', 'Express', 'React'] },
  { category: 'Tools', items: ['Git', 'GitHub', 'Excel'] },
]

const IconGradCap = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
)

const IconPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const IconStar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const IconCode = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)

const IconLanguage = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 8l6 6" />
    <path d="M4 14l6-6 2-3" />
    <path d="M2 5h12" />
    <path d="M7 2h1" />
    <path d="M22 22l-5-10-5 10" />
    <path d="M14 18h6" />
  </svg>
)

const highlights = [
  { icon: <IconGradCap />, label: 'Education', value: 'BSc Computer Engineering, UoG' },
  { icon: <IconPin />, label: 'Location', value: 'Accra, Ghana' },
  { icon: <IconStar />, label: 'Standing', value: 'First Class Honours' },
  { icon: <IconLanguage />, label: 'Languages', value: 'English · Twi' },
  { icon: <IconCode />, label: 'Currently', value: 'Learning OpenCV & Computer Vision' },
]

const fullBio = [
  `Nobody has a name for it yet. The American Dream is well-documented — a house, a car, a better life than your parents. But what do we call the African version? Financial freedom? Independence from systems built to keep us dependent? The best possible life carved out of circumstances that were never designed in our favour?`,
  `I don't have a clean answer. But I know what moves me.`,
  `I grew up watching Ghanaian children — brilliant, curious, capable — never quite believing they could be the ones to fix things. Not out of laziness, but out of a quiet resignation that the problems of this country belong to someone else to solve. That belief is the most dangerous thing I've ever encountered. My life's work, in whatever form it takes, is to dismantle it.`,
  `I am a Computer Engineering student who builds machine learning systems and robotics — with a foot in software engineering and a deep curiosity about the networks that hold it all together. But before the titles, I am someone shaped by three things: the smell of soil on my mother's trips to the village, the frustration of watching Ghana's economy bleed through preventable inefficiencies, and the stubborn conviction that technology — applied with intention — can change the trajectory of a nation.`,
  `In agriculture, I see robotics and machine learning not as replacements for the farmer, but as multipliers. Mechanised, intelligent, nature-friendly farming is not a fantasy. It is an engineering problem, and engineering problems have solutions.`,
  `In fintech and data, I see a different kind of battlefield — one fought with signals, noise, and the ability to tell them apart. Understanding markets, cleaning data, finding the patterns hidden inside the chaos of an economy: this is how you build stability that lasts beyond a single administration.`,
  `The networks that connect our systems, the software that powers them, the robots that extend human capability, the machine learning models that make sense of it all — these are not separate pursuits for me. They are four sides of the same mission.`,
  `And that mission is simple: to be one of the people who refuses to outsource Ghana's future.`,
]

export default function About() {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current.children, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })

      gsap.from(rightRef.current, {
        opacity: 0,
        x: 40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="about section" ref={sectionRef}>
      <div className="about__inner container">
        <div className="about__left" ref={leftRef}>
          <div className="section-label">
            <span className="text-upper">About me</span>
          </div>

          <h2 className="h2 about__headline">
            Engineer, researcher,<br />
            <span className="about__headline-accent">problem solver.</span>
          </h2>

          <div className={`about__full-bio ${expanded ? 'about__full-bio--open' : ''}`}>
            {fullBio.map((para, i) => (
              <p key={i} className="about__bio body-lg">{para}</p>
            ))}
          </div>

          <button
            className="about__read-more"
            onClick={() => setExpanded(p => !p)}
          >
            {expanded ? 'Read less' : 'Read more'}
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className={`about__read-more-icon ${expanded ? 'about__read-more-icon--up' : ''}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          <div className="about__highlights">
            {highlights.map(h => (
              <div key={h.label} className="about__highlight">
                <span className="about__highlight-icon">{h.icon}</span>
                <div>
                  <span className="about__highlight-label text-upper">{h.label}</span>
                  <span className="about__highlight-value">{h.value}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        <div className="about__right" ref={rightRef}>
          <div className="about__photo-wrap">
            <img
              src="/assets/images/gabriel_kwaku_profile_photo.jpg"
              alt="Gabriel Kwaku Asante"
              className="about__photo"
              loading="lazy"
            />
          </div>

          <div className="about__skills">
            {skills.map(group => (
              <div key={group.category} className="about__skill-group">
                <span className="text-upper about__skill-category">{group.category}</span>
                <div className="about__skill-tags">
                  {group.items.map(item => (
                    <span key={item} className="about__skill-tag">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
