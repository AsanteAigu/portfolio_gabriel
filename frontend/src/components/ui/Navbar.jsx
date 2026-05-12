import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import './Navbar.css'

const navLinks = [
  { label: 'About',      href: '#about' },
  { label: 'Education',  href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Interests',  href: '#interests' },
  { label: 'Awards',     href: '#awards' },
  { label: 'Work',       href: '#work' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const navRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    gsap.set(navRef.current, { y: -120, opacity: 0 })
  }, [])

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 80)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    gsap.to(navRef.current, {
      y: visible ? 0 : -120,
      opacity: visible ? 1 : 0,
      duration: 0.4,
      ease: 'power2.out',
    })
  }, [visible])

  function handleNavClick(e, href) {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-name">Gabriel Kwaku</span>
          <span className="navbar__logo-dot" />
        </Link>

        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                className="navbar__link"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/assets/cv/gabriel_kwkau_asante_cv.pdf"
              className="navbar__cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </li>
        </ul>

        <button
          className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen(p => !p)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
        </button>
      </div>
    </nav>
  )
}
