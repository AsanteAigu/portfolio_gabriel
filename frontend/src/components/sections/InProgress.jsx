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
