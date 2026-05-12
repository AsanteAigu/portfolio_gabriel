import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Work.css'

gsap.registerPlugin(ScrollTrigger)

const IconGitHub = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const IconExternalLink = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)


const projects = [
  {
    slug: 'sars-cov2-dimensionality-reduction',
    title: 'Using Dimensionality Reduction Algorithms to Represent SARS-CoV-2',
    tagline: 'An alternative to traditional Phylogenetic trees using PCA & t-SNE',
    description:
      'Alongside 4 others, I engaged in cutting-edge research with Matthew Scicluna, PhD student at MILA, to develop an alternative to traditional Phylogenetic trees. We employed a Python implementation of Principal Component Analysis (PCA) and t-distributed Stochastic Neighbor Embedding (t-SNE) to produce accurate low-dimensional representations of SARS-CoV-2 sequence relationships across variants — Alpha, Beta, Delta, Gamma, Omicron, and Recombinant.',
    tags: ['Python', 'PCA', 't-SNE', 'Machine Learning', 'Bioinformatics'],
    year: 'Aug 2023',
    type: 'Research',
    github: 'https://github.com/AsanteAigu/USING-DIMENSIONALITY-REDUCTION-FOR-PHYLOGENIC-ANALYSIS-FOR-SARS-COV-2/tree/main',
    thumbnail: '/assets/images/DIMENSIONALITY.png',
  },
  {
    slug: 'nkwa-hia',
    title: 'Nkwa Hia',
    tagline: '"Life is Important" — real-time emergency health logistics for Greater Accra',
    description:
      'Built for the Claude Builders Club Hackathon. Ghana loses patients daily not because hospitals lack doctors, but because nobody knows which hospital has a bed right now — No-Bed Syndrome. Nkwa Hia is a real-time emergency health grid covering 59 hospitals across Greater Accra. A live heatmap shows every hospital\'s capacity (green / yellow / red), updated every 30 seconds. EMTs enter patient vitals on scene; Gemini AI scores every hospital by capability, distance, and available beds, and dispatches the ambulance in seconds. Ward nurses update individual bed statuses and an AI Transfer Advisor tells staff exactly where a patient should go.',
    tags: ['AI', 'Gemini', 'React', 'Node.js', 'Real-time', 'Health Tech'],
    year: 2026,
    type: 'Hackathon',
    github: 'https://github.com/AsanteAigu/Nkwa-Hia',
    thumbnail: '/assets/images/nkwahia.png',
  },
  {
    slug: 'nudge',
    title: 'Nudge',
    tagline: 'Never miss an important email again.',
    description:
      'AI monitors your Gmail and sends WhatsApp summaries — ranked by importance — with direct links to every email. Read-only Gmail access means we never send emails on your behalf, no emails are stored (only AI summaries), and it works 24/7 even when you\'re offline.',
    tags: ['AI', 'Gmail API', 'WhatsApp', 'Python', 'Automation'],
    year: 2026,
    type: 'Project',
    github: 'https://github.com/AsanteAigu/nudge-frontend',
    thumbnail: '/assets/images/nudge.png',
  },
]

function ProjectCard({ project, index }) {
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
      {project.thumbnail && (
        <div className="project-card__image">
          <img src={project.thumbnail} alt={project.title} loading="lazy" />
        </div>
      )}

      <div className="project-card__body">
        <div className="project-card__header">
          <div className="project-card__meta">
            <span className="project-card__type text-upper">{project.type}</span>
            <span className="project-card__year small">{project.year}</span>
          </div>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link"
              aria-label="View on GitHub"
            >
              <IconGitHub />
              GitHub
              <IconExternalLink />
            </a>
          )}
        </div>

        <h3 className="project-card__title h3">{project.title}</h3>
        <p className="project-card__tagline">{project.tagline}</p>
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

export default function Work() {
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
    <section id="work" className="work section" ref={sectionRef}>
      <div className="container">
        <header className="work__header" ref={headerRef}>
          <div className="section-label">
            <span className="text-upper">Selected work</span>
          </div>
          <h2 className="h2 work__headline">What I've built</h2>
          <p className="work__sub body-lg">
            Projects and research spanning machine learning, full-stack development,
            and network infrastructure.
          </p>
        </header>

        <div className="work__grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
