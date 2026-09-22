import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Work.css' // reuses .project-card family so cards match "Selected work" exactly
import './InProgress.css'

gsap.registerPlugin(ScrollTrigger)

const IconExternalLink = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

// Leaf under a CV scan — for the maize disease classifier
const MaizeScanIllustration = () => (
  <svg viewBox="0 0 400 225" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration of a maize leaf under computer-vision scan">
    <defs>
      <linearGradient id="mz-sky" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fef9c3" />
        <stop offset="100%" stopColor="#ecfccb" />
      </linearGradient>
      <linearGradient id="mz-leaf" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#a3e635" />
        <stop offset="100%" stopColor="#4d7c0f" />
      </linearGradient>
      <radialGradient id="mz-spot" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#92400e" />
        <stop offset="100%" stopColor="#b45309" />
      </radialGradient>
    </defs>

    <rect width="400" height="225" fill="url(#mz-sky)" />

    {/* soft field texture */}
    {[...Array(6)].map((_, i) => (
      <path key={i} d={`M ${-20 + i * 70} 225 Q ${20 + i * 70} 150 ${60 + i * 70} 225`} stroke="#d9f99d" strokeWidth="10" fill="none" opacity="0.5" />
    ))}

    {/* maize leaf */}
    <path
      d="M120 200 C 60 150 70 70 150 30 C 190 10 260 15 300 35 C 250 55 220 90 200 130 C 180 170 155 195 120 200 Z"
      fill="url(#mz-leaf)"
      stroke="#365314"
      strokeWidth="2"
    />
    <path d="M150 30 C 170 80 175 150 120 200" stroke="#365314" strokeWidth="2.5" fill="none" opacity="0.6" />
    <path d="M160 55 L 190 75 M 155 95 L 190 105 M 148 130 L 178 132" stroke="#365314" strokeWidth="1.5" opacity="0.5" />

    {/* disease spots */}
    <ellipse cx="210" cy="70" rx="9" ry="6" fill="url(#mz-spot)" />
    <ellipse cx="180" cy="120" rx="7" ry="5" fill="url(#mz-spot)" />
    <ellipse cx="155" cy="160" rx="6" ry="4" fill="url(#mz-spot)" opacity="0.85" />

    {/* CV scan box + crosshair over the primary spot */}
    <rect x="182" y="48" width="56" height="44" rx="4" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 4" />
    <line x1="182" y1="34" x2="182" y2="48" stroke="#f59e0b" strokeWidth="2" />
    <line x1="238" y1="34" x2="238" y2="48" stroke="#f59e0b" strokeWidth="2" />
    <line x1="176" y1="42" x2="192" y2="42" stroke="#f59e0b" strokeWidth="2" />
    <line x1="228" y1="42" x2="244" y2="42" stroke="#f59e0b" strokeWidth="2" />

    <rect x="182" y="94" width="82" height="20" rx="10" fill="#78350f" />
    <text x="223" y="108" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#fef3c7">blight 94%</text>

    {/* scan sweep */}
    <rect x="250" y="20" width="3" height="185" fill="#f59e0b" opacity="0.55" />
  </svg>
)

// Rover scouting a field — for the autonomous agricultural rover
const RoverFieldIllustration = () => (
  <svg viewBox="0 0 400 225" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration of an autonomous rover scanning a farm field">
    <defs>
      <linearGradient id="rv-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#bae6fd" />
        <stop offset="100%" stopColor="#e0f2fe" />
      </linearGradient>
      <linearGradient id="rv-field" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#84cc16" />
        <stop offset="100%" stopColor="#4d7c0f" />
      </linearGradient>
      <linearGradient id="rv-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#94a3b8" />
      </linearGradient>
    </defs>

    <rect width="400" height="225" fill="url(#rv-sky)" />
    <circle cx="340" cy="45" r="26" fill="#fde047" opacity="0.9" />
    <rect x="0" y="140" width="400" height="85" fill="url(#rv-field)" />

    {/* crop rows, perspective */}
    {[...Array(7)].map((_, i) => (
      <path key={i} d={`M ${-40 + i * 65} 225 L ${170 + i * 22} 140`} stroke="#365314" strokeWidth="2" opacity="0.35" />
    ))}

    {/* sensor arcs from rover */}
    <path d="M 210 150 A 60 60 0 0 1 270 180" stroke="#f59e0b" strokeWidth="2" fill="none" strokeDasharray="4 5" opacity="0.8" />
    <path d="M 195 155 A 85 85 0 0 1 285 195" stroke="#f59e0b" strokeWidth="2" fill="none" strokeDasharray="4 5" opacity="0.5" />

    {/* rover chassis */}
    <rect x="150" y="140" width="110" height="42" rx="10" fill="url(#rv-body)" stroke="#475569" strokeWidth="2" />
    <rect x="162" y="118" width="86" height="16" rx="3" fill="#0ea5e9" stroke="#0369a1" strokeWidth="1.5" />
    <line x1="176" y1="118" x2="176" y2="134" stroke="#0369a1" strokeWidth="1" opacity="0.6" />
    <line x1="204" y1="118" x2="204" y2="134" stroke="#0369a1" strokeWidth="1" opacity="0.6" />
    <line x1="232" y1="118" x2="232" y2="134" stroke="#0369a1" strokeWidth="1" opacity="0.6" />

    {/* camera mast */}
    <line x1="255" y1="140" x2="270" y2="105" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
    <circle cx="272" cy="100" r="9" fill="#1e293b" />
    <circle cx="272" cy="100" r="4" fill="#f59e0b" />

    {/* status LED */}
    <circle cx="238" cy="160" r="4" fill="#f59e0b" />

    {/* wheels */}
    <circle cx="172" cy="188" r="16" fill="#334155" />
    <circle cx="172" cy="188" r="6" fill="#94a3b8" />
    <circle cx="236" cy="188" r="16" fill="#334155" />
    <circle cx="236" cy="188" r="6" fill="#94a3b8" />
  </svg>
)

// ── In-progress projects ──────────────────────────────────────────
// `status` is the line that changes as work moves forward — update it
// every 2-3 weeks. `description` stays fixed (what the project is).
// `github` is null until a real repo/demo link exists — the card
// hides its link button while it's null.
const inProgressProjects = [
  {
    slug: 'maize-leaf-classifier',
    title: 'Maize Leaf Disease Classifier',
    badge: 'In Progress',
    status: 'Training a CNN on the PlantVillage maize dataset — targeting deployment mid-October 2026.',
    description:
      'A computer vision model that identifies common maize leaf diseases from a photo, aimed at giving smallholder farmers a fast, low-cost first diagnosis. Built with PyTorch and transfer learning on a pretrained CNN backbone. First step toward the larger agricultural rover project below.',
    tags: ['Python', 'PyTorch', 'Computer Vision', 'Transfer Learning', 'Agriculture'],
    github: null,
    illustration: <MaizeScanIllustration />,
  },
  {
    slug: 'autonomous-agricultural-rover',
    title: 'Autonomous Agricultural Rover',
    badge: 'Research / Scoping',
    status: 'Scoping sensor and mobility requirements — targeting final-year project status in 2027/28.',
    description:
      'An autonomous rover for maize and cocoa farms that reads soil health (NPK, moisture, pH) and detects plant disease from onboard cameras, feeding data to farmers through a simple dashboard. Planned in three stages: a vision model, bench-tested sensors, then an integrated mobile unit. Aiming for a 2028 IEEE Access or AfricaNLP submission based on field results.',
    tags: ['Robotics', 'Machine Learning', 'Networking', 'Agriculture', 'ESP32', 'Computer Vision'],
    github: null,
    illustration: <RoverFieldIllustration />,
  },
]

function InProgressCard({ project, index }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.7,
        ease: 'power2.out',
        delay: index * 0.15,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 95%',
          once: true,
        },
      })
    }, cardRef)
    return () => ctx.revert()
  }, [index])

  return (
    <article className="project-card" ref={cardRef}>
      <div className="project-card__image">
        {project.illustration}
      </div>

      <div className="project-card__body">
        <div className="project-card__header">
          <div className="project-card__meta">
            <span className="status-badge status-badge--amber text-upper">{project.badge}</span>
          </div>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link"
              aria-label="View on GitHub"
            >
              <IconExternalLink />
              View
            </a>
          )}
        </div>

        <h3 className="project-card__title h3">{project.title}</h3>

        <p className="project-card__status">{project.status}</p>

        <p className="project-card__desc">{project.description}</p>

        <div className="project-card__tags">
          {project.tags.map(tag => (
            <span key={tag} className="project-card__tag">{tag}</span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function InProgress() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 95%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="in-progress" className="in-progress section" ref={sectionRef}>
      <div className="container">
        <header className="in-progress__header" ref={headerRef}>
          <div className="section-label">
            <span className="text-upper">In progress</span>
          </div>
          <h2 className="h2 in-progress__headline">Currently building</h2>
          <p className="in-progress__sub body-lg">
            Work moving from idea to shipped — status updated as it progresses.
          </p>
        </header>

        <div className="in-progress__grid">
          {inProgressProjects.map((project, i) => (
            <InProgressCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
