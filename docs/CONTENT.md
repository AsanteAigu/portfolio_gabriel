# Content Preparation Guide

> Prepare all this BEFORE writing a single line of code.
> Missing content = placeholder hell = never finishing the site.

---

## 1. Copy (Text)

### Hero Section
- [ ] **Headline** — 2–4 words max. What you do, dramatically stated.
  - Example: "I build things." / "Designing the future." / "Full-stack, fully focused."
- [ ] **Subheadline** — 1 sentence. Role + context.
  - Example: "Full-stack developer crafting fast, intentional digital products."
- [ ] **CTA label** — 2–3 words. e.g. "See my work" or "Let's talk"

### About Section
- [ ] **Short bio** — 3–4 sentences. Who you are, what drives you, what you value in work.
- [ ] **Location** — City, Country
- [ ] **Current status** — "Open to opportunities" / "Freelance available" / "Employed"
- [ ] **1–2 personal details** — Something human (not just skills). e.g. hobby, obsession, fun fact.

### Work Section
For **each project** (aim for 3–6):
- [ ] Project title
- [ ] 1-line tagline
- [ ] 2–3 sentence description (what it is, what you built, what it does)
- [ ] Tech tags (3–5 items)
- [ ] Year
- [ ] Live URL (if public)
- [ ] GitHub URL (if public)

### Contact Section
- [ ] **Headline** — Inviting, low-pressure. e.g. "Let's build something." / "Say hello."
- [ ] **Subtext** — When/why to reach out.
- [ ] **Your email** (displayed as link + used as form destination)

### Footer
- [ ] Social links: GitHub, LinkedIn, Twitter/X (whichever apply)
- [ ] Copyright line

---

## 2. Media

### Profile Photo
- [ ] 1 high-quality photo of yourself (or illustrated avatar)
- Format: square or portrait, min 800×800px
- Export as: `profile.webp` (< 150KB)

### Project Images (per project)
- [ ] **Thumbnail** — 16:9, shown in grid. Min 800×450px → `project-slug-thumb.webp`
- [ ] **Hero image** — Wide banner for detail page. Min 1600×900px → `project-slug-hero.webp`
- [ ] **Gallery** — 2–4 screenshots → `project-slug-1.webp`, etc.

### Optional
- [ ] Background video loop (Hero section ambient) — `.webm`, max 5MB, no audio
- [ ] Logo / wordmark SVG — `logo.svg`

---

## 3. Fonts

Self-host for performance (Google Fonts = extra DNS lookup):
- [ ] **Editorial New** — download from fontsource or pangrampangram.com (paid) OR use Playfair Display (free)
- [ ] **DM Mono** — download from [fontsource.org](https://fontsource.org/fonts/dm-mono) (free)

Place `.woff2` files in: `frontend/public/assets/fonts/`

---

## 4. Icons (SVG)

Prepare as inline SVGs or files in `frontend/public/assets/icons/`:
- [ ] Logo / monogram
- [ ] Arrow (→ or ↗) — for links and CTAs
- [ ] GitHub icon
- [ ] LinkedIn icon
- [ ] Twitter/X icon
- [ ] External link icon

Source: [Lucide icons](https://lucide.dev/) (MIT licensed, clean SVGs)

---

## 5. Data Files to Fill

Once you have your content, populate these files:

- `backend/data/projects.json` — One object per project (see BACKEND.md for schema)
- `backend/data/experience.json` — One object per job/role
- `backend/data/skills.json` — Categories + items

---

## 6. Pre-launch SEO Basics

In `frontend/index.html`:
- [ ] `<title>Your Name — Full-Stack Developer</title>`
- [ ] `<meta name="description" content="...">`
- [ ] Open Graph tags (for link previews):
  ```html
  <meta property="og:title" content="Your Name — Developer">
  <meta property="og:description" content="...">
  <meta property="og:image" content="https://yourdomain.com/assets/images/og-image.webp">
  <meta property="og:url" content="https://yourdomain.com">
  ```
- [ ] OG image: 1200×630px → `og-image.webp`
- [ ] Favicon: 32×32 ICO + 180×180 Apple touch icon
