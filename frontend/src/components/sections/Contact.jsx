import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

const initialForm = { name: '', email: '', message: '' }

export default function Contact() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const formRef = useRef(null)

  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setTimeout(() => formRef.current?.querySelector('input, textarea')?.focus(), 600)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
      })

      gsap.from(formRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 85%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong.')
        setStatus('error')
        return
      }

      setStatus('success')
      setForm(initialForm)
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="contact section" ref={sectionRef}>
      <div className="contact__inner container">
        <header className="contact__header" ref={headerRef}>
          <div className="section-label">
            <span className="text-upper">Get in touch</span>
          </div>
          <h2 className="h2 contact__headline">Let's build something.</h2>
          <p className="contact__sub body-lg">
            Open to internship opportunities, research collaborations, and projects
            at the intersection of data, AI, and engineering. Don't hesitate to reach out.
          </p>

          <button
            type="button"
            className="contact__email"
            onClick={scrollToForm}
            title="Send me a message"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            asantegabrielkwaku@gmail.com
          </button>
        </header>

        <form
          className="contact__form"
          onSubmit={handleSubmit}
          ref={formRef}
          noValidate
        >
          {status === 'success' && (
            <div className="contact__success">
              <span>✓</span>
              Message sent! I'll get back to you soon.
            </div>
          )}

          {status === 'error' && (
            <div className="contact__error-msg">{errorMsg}</div>
          )}

          <div className="contact__row">
            <div className="contact__field">
              <label htmlFor="name" className="contact__label">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                className="contact__input"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
                disabled={status === 'loading'}
              />
            </div>

            <div className="contact__field">
              <label htmlFor="email" className="contact__label">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="contact__input"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                disabled={status === 'loading'}
              />
            </div>
          </div>

          <div className="contact__field">
            <label htmlFor="message" className="contact__label">Message</label>
            <textarea
              id="message"
              name="message"
              className="contact__input contact__textarea"
              placeholder="Tell me about your project, opportunity, or just say hello..."
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              disabled={status === 'loading'}
            />
          </div>

          <button
            type="submit"
            className="contact__submit"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <>
                <span className="contact__spinner" />
                Sending...
              </>
            ) : (
              <>
                Send message
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  )
}
