# Claude Code Prompts — Ethan Nartey Portfolio
# Aesthetic Inspiration: Cal.com (light, card-based, clean product UI)

> Paste each prompt into Claude Code ONE AT A TIME. Wait for it to finish before the next.

---

# ✅ BEFORE YOU START — DO THESE FIRST

Things to have ready BEFORE running any Claude Code prompt.
Missing these mid-build will interrupt your flow.

## 1. Software
```bash
node --version     # Must be 18 or higher → nodejs.org if not
npm --version      # Ships with Node
git --version      # Any recent version

# Install Claude Code
npm install -g @anthropic-ai/claude-code

# Open your project folder and run
cd portfolio-project
claude
```

## 2. GitHub repo
```bash
git init
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
# Create the repo on GitHub FIRST (no README, no .gitignore)
```

## 3. Your CV as a PDF
- Export your CV → name it exactly `ethan-nartey-cv.pdf`
- Place at: `frontend/public/assets/cv/ethan-nartey-cv.pdf`
- Do this BEFORE Phase 4 (sections) or the download button will 404

## 4. Your profile photo
- Good quality portrait photo
- Export as `profile.webp`, compress to under 150KB (use squoosh.app)
- Place at: `frontend/public/assets/images/profile.webp`

## 5. Project screenshots (for your top 3 projects)
- Thumbnail: 800×450px → `project-slug-thumb.webp`
- Hero image: 1600×900px → `project-slug-hero.webp`
- Place all in: `frontend/public/assets/images/`

## 6. Content text file
Write this in a plain .txt BEFORE building so you can paste into JSON files:
- **Each project:** title, tagline, 2-sentence description, tech tags, GitHub URL, live URL, year
- **Each experience role:** company, title, start date, end date, 2–3 bullet points
- **Bio:** 3–4 sentences about yourself
- **Contact email:** the one you want people to use

## 7. Gmail App Password (for contact form emails)
1. myaccount.google.com → Security → 2-Step Verification → ON
2. Security → App Passwords → create "Portfolio" → copy 16-char password
3. You'll need this for `backend/.env` (SMTP_PASS)

## 8. VPS (for deployment — do last)
- Ubuntu 22.04 VPS (DigitalOcean / Hetzner / Contabo)
- SSH access: `ssh root@YOUR_VPS_IP`
- Domain pointed at VPS IP (A record: @ and www → VPS IP)
- DNS propagation: set this up early, can take up to 24h

---

---

# PHASE 0 — FOUNDATION

---

## Prompt 0.1 — Initialize the Project Scaffold

```
I'm building a personal portfolio website for Ethan Nartey, Data Scientist & Robotics Engineer.

Design inspiration: Cal.com — light gray background, white cards, big bold black typography, subtle card hover effects, professional and clean. NOT a dark portfolio.

Tech stack:
- Frontend: React 18 + Vite
- Backend: Node.js + Express
- Styling: Pure CSS custom properties (no Tailwind, no CSS-in-JS)
- Animation: GSAP + ScrollTrigger
- Routing: React Router v6
- No Three.js

Create ALL of the following files manually (do NOT run interactive CLI tools):

FRONTEND (in the `frontend/` folder):
1. `package.json` — name: portfolio-frontend, scripts: dev/build/preview, dependencies: react, react-dom, react-router-dom, gsap, @gsap/react, framer-motion
2. `vite.config.js` — React plugin, alias @ → ./src, dev proxy /api → http://localhost:4000
3. `index.html` — proper meta tags, title "Ethan Nartey — Data Scientist & Robotics Engineer", <div id="root">
4. `src/main.jsx` — renders <App /> into #root

BACKEND (in the `backend/` folder):
1. `package.json` — type: module, scripts: dev (nodemon server.js), start (node server.js), dependencies: express, cors, dotenv, nodemailer, express-rate-limit, helmet, morgan, devDeps: nodemon
2. `server.js` — Express entry point with helmet, cors, morgan('dev'), express.json(), GET /api/health returning { status: 'ok', uptime: process.uptime() }, global error handler
3. `.env.example` with: PORT=4000, NODE_ENV=development, FRONTEND_URL=http://localhost:5173, SMTP_HOST=smtp.gmail.com, SMTP_PORT=587, SMTP_USER, SMTP_PASS, CONTACT_TO

After creating all files, run `npm install` in both frontend/ and backend/.
```

---

---

# PHASE 1 — DESIGN SYSTEM

---

## Prompt 1.1 — CSS Design System

```
Build the CSS design system for Ethan Nartey's portfolio.
Aesthetic: Cal.com — light, clean, spacious, card-based. Light warm-gray background, white card surfaces, heavy black type, lime accent for personality.

Create these 3 files in `frontend/src/styles/`:

### global.css
Complete CSS reset + :root variables:

:root {
  /* Colors */
  --color-bg: #f5f5f4;
  --color-surface: #ffffff;
  --color-surface-hover: #fafaf9;
  --color-border: #e5e5e4;
  --color-border-strong: #d4d4d3;
  --color-text-primary: #1a1a1a;
  --color-text-secondary: #78716c;
  --color-text-tertiary: #a8a29e;
  --color-accent: #84cc16;
  --color-accent-light: #ecfccb;
  --color-accent-dark: #4d7c0f;
  --color-success: #22c55e;
  --color-error: #ef4444;

  /* Typography */
  --font-display: 'Syne', 'Georgia', serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;

  /* Type scale */
  --text-display: clamp(3rem, 7vw, 7rem);
  --text-h1: clamp(2.5rem, 5vw, 5rem);
  --text-h2: clamp(1.75rem, 3vw, 2.75rem);
  --text-h3: clamp(1.25rem, 2vw, 1.5rem);
  --text-body-lg: 1.125rem;
  --text-body: 1rem;
  --text-sm: 0.875rem;
  --text-xs: 0.75rem;

  /* Spacing */
  --space-1: 0.25rem;  --space-2: 0.5rem;   --space-3: 0.75rem;
  --space-4: 1rem;     --space-5: 1.5rem;   --space-6: 2rem;
  --space-7: 3rem;     --space-8: 4rem;     --space-9: 6rem;
  --space-10: 8rem;

  /* Border radius */
  --radius-sm: 8px;    --radius-md: 12px;   --radius-lg: 16px;
  --radius-xl: 24px;   --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04);
  --shadow-lg: 0 16px 40px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.04);
  --shadow-card: 0 0 0 1px var(--color-border), var(--shadow-sm);

  /* Transitions */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.45, 0, 0.55, 1);
  --dur-fast: 150ms;
  --dur-base: 250ms;
  --dur-slow: 450ms;
  --dur-enter: 600ms;
}

Also include: box-sizing reset, margin/padding 0 reset, body defaults (bg, color, font, line-height 1.6, antialiased), img display block max-width 100%, selection highlight with accent colors, smooth scrollbar styling, scroll-behavior smooth.

### typography.css
- @import from Google Fonts: Syne (400,600,700,800) + Inter (400,500,600) + JetBrains Mono (400)
- Utility classes: .display .h1 .h2 .h3 .body-lg .body .small .mono
- .text-accent .text-secondary .text-upper (uppercase + letter-spacing 0.08em + text-xs)

### animations.css
Keyframes only:
- fadeUp: opacity 0 + translateY(32px) → 1 + translateY(0)
- fadeIn: opacity 0 → 1
- scaleIn: opacity 0 + scale(0.95) → 1 + scale(1)
- slideRight: translateX(-20px) + opacity 0 → 0 + 1
- shimmer: background-position -200% 0 → 200% 0
- spin: 0deg → 360deg
- float: translateY(0) → translateY(-8px) → translateY(0) (3s ease-in-out infinite)
- blink: opacity 1 → 0 → 1 (1s step-end infinite)

Import all 3 in frontend/src/main.jsx.
```

---

---

# PHASE 2 — HOOKS & UTILS

---

## Prompt 2.1 — Custom Hooks and Utilities

```
Create React hooks and utility functions for Ethan Nartey's portfolio.

### frontend/src/hooks/useInView.js
IntersectionObserver hook.
Signature: useInView(ref, { threshold = 0.15, triggerOnce = true } = {})
Returns: isInView (boolean)
Disconnects observer after trigger if triggerOnce. Cleanup on unmount.

### frontend/src/hooks/useScrollY.js
Returns window.scrollY as number. Updates via requestAnimationFrame on scroll. Cleanup on unmount.

### frontend/src/hooks/useMediaQuery.js
Accepts query string. Returns boolean. Updates on resize. Named export.

### frontend/src/hooks/useApi.js
Generic fetch hook.
Signature: useApi(url)
Returns: { data, loading, error }
Fetches on mount. Handles AbortController for cleanup.

### frontend/src/utils/cn.js
export const cn = (...classes) => classes.filter(Boolean).join(' ');

### frontend/src/utils/formatDate.js
export const formatDate = (str) => {
  if (!str || str === 'Present') return 'Present';
  return new Date(str).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};
```

---

---

# PHASE 3 — UI COMPONENTS

---

## Prompt 3.1 — Loader

```
Build the page Loader for Ethan Nartey's portfolio.
Files: frontend/src/components/ui/Loader.jsx + Loader.module.css

Design: Light — white background (var(--color-surface)), centered content.

Behavior (2.2 seconds total):
- Fixed fullscreen, z-index 9999
- Content: 
  1. "EN" monogram — var(--font-display), 4rem, bold, color text-primary — scales in 0.8→1 on mount
  2. Thin progress bar below (2px height, full container width) — fills 0%→100% over 2 seconds, color var(--color-accent)
  3. "Loading portfolio..." — text-xs, text-secondary, below bar

Exit: after 2.2s, add class that triggers opacity 0 + scale 1.03, transition 400ms. Call onComplete prop after transition.

Wire in App.jsx:
- isLoading state (starts true)
- Render <Loader onComplete={() => setIsLoading(false)} /> when true
- All other content: opacity 0 while loading, transitions to 1 when done (0.5s)
```

## Prompt 3.2 — Navbar

```
Build the Navbar for Ethan Nartey's portfolio.
Files: frontend/src/components/ui/Navbar.jsx + Navbar.module.css

Design: Cal.com-style — floating white pill with shadow at top of page.

Desktop:
- Fixed top, z-index 100, full width
- Inner pill: max-width 1100px, centered, background white, border-radius var(--radius-full), border 1px var(--color-border), box-shadow var(--shadow-md), padding 0.6rem 1.5rem, flex row space-between
- Left: "EN" in var(--font-display), 1.5rem, weight 800
- Center: links — Work, About, Skills, Experience, Contact — text-sm, weight 500, color text-secondary, hover: text-primary, transition var(--dur-fast)
- Active section: 4px lime dot below the link (use IntersectionObserver on section ids)
- Right: "Download CV" — small pill button, dark bg (#1a1a1a), white text, radius-full, weight 600, href to /assets/cv/ethan-nartey-cv.pdf, download attribute

Behavior:
- Starts opacity 0, translateY(-10px) — fades in after 2.5s (after loader finishes)
- On scroll > 60px: stronger shadow

Mobile (< 768px):
- Pill shows only "EN" + hamburger icon (3 horizontal lines → X on open)
- On open: full-screen white overlay, nav links stacked vertically, large text (var(--text-h2)), staggered fade-in (80ms each)
- Close on link click or ESC
- Lock body scroll when open

All links: anchor scrolls (#work, #about, etc.)
```

## Prompt 3.3 — Button Component

```
Build a Button component for Ethan Nartey's portfolio.
Files: frontend/src/components/ui/Button.jsx + Button.module.css

Variants (prop: variant):
- primary: dark bg (#1a1a1a), white text, hover: #333
- accent: lime bg (--color-accent), dark text, hover: --color-accent-dark
- outline: white bg, border 1px --color-border, dark text, hover: bg --color-bg
- ghost: no bg, no border, dark text, hover: bg --color-bg

All: border-radius var(--radius-full), padding 0.625rem 1.25rem, font-size var(--text-sm), weight 600, transition all var(--dur-fast) var(--ease-out)
Hover: translateY(-1px) + stronger shadow. Active: translateY(0).
Disabled: opacity 0.5, cursor not-allowed.

Sizes: sm (0.5rem 1rem, text-xs), md (default), lg (0.75rem 1.75rem, text-body)

Props: variant, size, icon (left JSX), iconRight, loading (shows spinner, disables), href (renders as <a>), download, className, onClick, children
```

## Prompt 3.4 — Card Component

```
Build a Card component for Ethan Nartey's portfolio.
Files: frontend/src/components/ui/Card.jsx + Card.module.css

Base: background var(--color-surface), border 1px var(--color-border), border-radius var(--radius-lg), box-shadow var(--shadow-sm), padding var(--space-6)

Variants:
- default: base style
- hover: on hover — box-shadow var(--shadow-md), translateY(-2px), border-color var(--color-border-strong), transition var(--dur-base)
- featured: left border 3px solid var(--color-accent)
- ghost: no border, no shadow, background transparent

Props: variant, padding (override), className, children, onClick, href

Sub-components (named exports):
- CardHeader: flex row space-between, margin-bottom var(--space-4)
- CardBody: flex-1
- CardFooter: border-top 1px var(--color-border), padding-top var(--space-4), margin-top var(--space-4)

Entrance animation: when scrolled into view (useInView hook), apply scaleIn keyframe via class toggle.
```

## Prompt 3.5 — Tag, Badge, Skeleton

```
Build three small utility components.

### Tag.jsx + Tag.module.css
Pill label for tech stack items.
Base: 1px border var(--color-border), radius-full, padding 0.25rem 0.75rem, text-xs, weight 500, color text-secondary, bg surface
Variant "accent": bg --color-accent-light, color --color-accent-dark, border transparent
Hover (if onClick): border-color --color-accent

### Badge.jsx + Badge.module.css
Status/number labels.
Variants: lime (bg accent-light, color accent-dark), dark (bg #1a1a1a, color white), neutral (bg border, color text-secondary)
Small rounded pill, text-xs, weight 600, padding 0.25rem 0.625rem

### Skeleton.jsx + Skeleton.module.css
Loading placeholder.
Background: linear-gradient(90deg, --color-border 0%, --color-surface 50%, --color-border 100%)
Background-size: 200% 100%, animation: shimmer 1.5s infinite
Props: width, height (default 1rem), borderRadius (default radius-sm), className
Named exports: SkeletonText (full width, 1rem), SkeletonCard (full width, 200px)
```

## Prompt 3.6 — RevealSection

```
Build a scroll-reveal wrapper component.
Files: frontend/src/components/ui/RevealSection.jsx + RevealSection.module.css

Props: children, delay (ms, default 0), direction ('up'|'left'|'right'|'none', default 'up'), as (tag, default 'div'), className, threshold (default 0.1)

Before in view:
- opacity: 0
- transform: up → translateY(32px), left → translateX(-24px), right → translateX(24px), none → none

When in view (useInView hook):
- opacity: 1, transform: none
- Transition: opacity var(--dur-enter) var(--ease-out), transform var(--dur-enter) var(--ease-out)
- Delay via style transitionDelay

Also export RevealList:
Props: children (array), staggerDelay (ms, default 80), direction, as
Wraps each child in <RevealSection> with incrementing delay (index × staggerDelay).
```

## Prompt 3.7 — Footer

```
Build the Footer.
Files: frontend/src/components/ui/Footer.jsx + Footer.module.css

Top accent line: 3px solid var(--color-accent), full width
Background: var(--color-surface), border-top 1px var(--color-border)
Padding: var(--space-9) top, var(--space-7) bottom
Max-width: 1200px, centered

Top section — two columns:
Left:
- "EN" in font-display, 2rem, bold
- "Data Scientist & Robotics Engineer" — text-sm, text-secondary
- "📍 Ghana" — text-sm, text-secondary, margin-top space-2

Right — three link columns:
- Navigation: Work, About, Skills, Experience
- Connect: Email (mailto), GitHub, LinkedIn  
- Download: CV/Resume (PDF), GitHub Profile

Divider: 1px var(--color-border)

Bottom row:
- Left: "© 2025 Ethan Nartey. All rights reserved." — text-sm, text-secondary
- Right: "Built with React & Node.js" — text-xs, text-secondary

Link hover: color text-primary, transition dur-fast
Mobile: stack columns, 2-column link grid
```

---

---

# PHASE 4 — PAGE SECTIONS

---

## Prompt 4.1 — Hero Section

```
Build the Hero section for Ethan Nartey's portfolio.
Files: frontend/src/components/sections/Hero.jsx + Hero.module.css
Section id: "hero"

Background: var(--color-surface) with a subtle dot-grid pattern (CSS: radial-gradient on color-border, 1px dot, 24px 24px repeat)
Padding: var(--space-10) top, var(--space-9) bottom

TWO COLUMNS on desktop (stacked on mobile):

LEFT (55%):
- <Badge variant="lime"> with blinking green dot (CSS blink animation) + "Available for work"
- Headline (font-display, weight 800, line-height 1.0):
  "Data Science." — color text-primary, text-display
  "Robotics." — color text-primary
  "Reality." — color var(--color-accent)
  Each line wrapped in RevealSection with delays 0, 100, 200ms
- Subtext (text-body-lg, text-secondary, max-width 480px, margin-top space-5):
  "Ethan Nartey — building intelligent systems at the intersection of machine learning, computer vision, and autonomous robotics. Based in Ghana."
- CTA row (flex gap space-3, margin-top space-7):
  <Button variant="primary" size="lg">See My Work →</Button> (scrolls to #work)
  <Button variant="outline" size="lg" href="/assets/cv/ethan-nartey-cv.pdf" download>Download CV</Button>
- Tech strip (margin-top space-9, text-xs, text-secondary):
  "Skilled in: " followed by Python · TensorFlow · ROS · PyTorch · OpenCV
  Separators " · " in var(--color-accent)

RIGHT (45%):
Two stacked cards with float animation (CSS float keyframe):
Card 1 (dark — bg #1a1a1a, radius-lg, padding space-5):
- Window dots row: three 8px circles (red #ff5f57, yellow #febc2e, green #28c840)
- Code block (font-mono, text-xs, line-height 1.8, color #e5e5e4):
  model = RandomForestClassifier(
    n_estimators=100,
    max_depth=5
  )
  accuracy = model.score(X_test, y_test)
  print(f"Accuracy: {accuracy:.2%}")
  # → Accuracy: 94.7%
  Highlight "94.7%" in var(--color-accent)

Card 2 (white Card variant="default", below and slightly offset right, smaller):
- "🤖 ROS Node Active" — weight 600, text-sm, with blinking green dot
- "/camera/rgb · /lidar/scan · /cmd_vel" — font-mono, text-xs, text-secondary, margin-top space-2

Cards wrapped in a div with radial gradient bg: var(--color-accent-light) at center

GSAP: On scroll, hero content fades and translateY up slightly (parallax ×0.25).
Use useGSAP from @gsap/react. Register ScrollTrigger.
```

## Prompt 4.2 — About Section

```
Build the About section.
Files: frontend/src/components/sections/About.jsx + About.module.css
Section id: "about", background: var(--color-bg), padding: var(--space-10) top/bottom

TWO COLUMNS desktop, stacked mobile:

LEFT (42%):
- Profile image: src="/assets/images/profile.webp"
- border-radius: var(--radius-xl), box-shadow: var(--shadow-lg), width 100%, aspect-ratio 4/5, object-fit cover
- Lime accent square behind: position absolute, 16px right and bottom offset, z-index -1, background var(--color-accent-light), same border-radius, width 90%, height 90%
- Hover: image scale 1.02, 400ms transition

RIGHT (58%):
- <Badge variant="neutral">About Me</Badge>
- Heading via RevealSection: "Who is Ethan Nartey?" — text-h1, font-display, bold
- Bio (text-body-lg, text-secondary, line-height 1.8, margin-top space-5):
  {/* TODO: Replace with your real bio */}
  "I'm a Data Scientist and Robotics Engineer from Ghana with a deep passion for building systems that think, learn, and act. My work lives at the intersection of machine learning, computer vision, and autonomous systems — always driven by real-world impact."

- Info row (3 items, flex wrap, gap space-3, margin-top space-5):
  Each: small Card variant="ghost" with emoji + label
  "📍 Ghana"  |  "🎓 Computer Engineering"  |  "💼 Open to opportunities"

- Stats row (4 stats, grid 2×2 on mobile / 4 cols desktop, margin-top space-7):
  Each stat: large number (text-h2, font-display, weight 800, color-accent) + label below (text-xs, text-upper, text-secondary)
  "3+" / "YEARS EXP"  |  "12+" / "PROJECTS"  |  "2" / "PAPERS"  |  "∞" / "CURIOSITY"
  Numbers count up from 0 when scrolled into view (vanilla JS setInterval, 1.5s duration)
```

## Prompt 4.3 — Work Section

```
Build the Work (projects) section.
Files: frontend/src/components/sections/Work.jsx + Work.module.css
Section id: "work", background: var(--color-surface), padding: var(--space-10) top/bottom

Data: useApi('/api/projects')
Loading: 2-column grid of 3 SkeletonCard
Error: "Failed to load projects." centered text

Section header (flex, space-between, align items end, margin-bottom space-8):
- Left: <Badge variant="neutral">Selected Work</Badge> above heading "Things I've built." (text-h1, font-display)
- Right: "View all on GitHub ↗" — text-sm, text-secondary, hover: text-primary, text-accent (link to GitHub)

Project grid — CSS Grid:
- Desktop: 2 columns, gap var(--space-6)
- Featured project (featured:true): grid-column 1 / -1 (full width)
- Mobile: 1 column

Featured card layout (inside a Card variant="hover"):
- Two columns inside: left content (50%), right image (50%)
- Left: Badge "Featured" (lime), project number "01", title (text-h2, font-display), tagline (text-body, text-secondary), tech tags row (<Tag> components), link row
- Right: project image (width 100%, height 100%, object-fit cover, border-radius var(--radius-md))

Regular card layout (Card variant="hover"):
- Top: project number Badge + tech tags row
- Title: text-h3, font-display, bold, margin-top space-3
- Tagline: text-sm, text-secondary
- Image: full width, aspect-ratio 16/9, object-fit cover, border-radius var(--radius-md), margin-top space-4
  On card hover: image gets border-left: 3px solid var(--color-accent), transition
- Footer row: "Live ↗" + "GitHub ↗" — text-sm, text-secondary, hover: text-accent

RevealList stagger 120ms on cards.
Non-featured projects: hide behind "Show More Projects" toggle button.
```

## Prompt 4.4 — Skills Section

```
Build the Skills section.
Files: frontend/src/components/sections/Skills.jsx + Skills.module.css
Section id: "skills", background: var(--color-bg), padding: var(--space-10) top/bottom

Data: useApi('/api/skills')

Header:
- <Badge variant="neutral">Expertise</Badge>
- "What I work with." — text-h1, font-display, bold
- Subtext: "The tools and technologies I use to turn ideas into working systems." — text-body-lg, text-secondary, max-width 600px

Marquee area (margin-top space-8, background var(--color-surface), border-radius var(--radius-lg), padding space-5, overflow hidden):
Two rows of infinite scrolling text:
Row 1 (left): Python · TensorFlow · PyTorch · ROS · OpenCV · Scikit-learn · Pandas · NumPy · MATLAB
Row 2 (right, 35s instead of 25s): Docker · React · Node.js · SQL · Arduino · Raspberry Pi · Linux · Git · FastAPI
- Each: text-sm, weight 500, color text-secondary
- Separator: 6px lime circle
- CSS: animation marquee (translateX -50%, 25s linear infinite) on a doubled list (clone items)
- Row 2: animation-direction reverse
- Hover: animation-play-state paused
- Fade edges: mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)
- gap between rows: space-3

Category cards grid (margin-top space-8):
CSS Grid, 4 columns desktop → 2 tablet → 1 mobile, gap space-5

Each Card variant="hover":
- Icon square: 48×48, background var(--color-accent-light), border-radius var(--radius-md), flex center — emoji inside (📊 🤖 👁️ 🛠️)
- Category name: text-h3, font-display, bold, margin-top space-4
- Skills: flex-wrap row of <Tag> components, gap space-2, margin-top space-3

RevealList stagger 100ms on cards.
```

## Prompt 4.5 — Experience Section

```
Build the Experience section.
Files: frontend/src/components/sections/Experience.jsx + Experience.module.css
Section id: "experience", background: var(--color-surface), padding: var(--space-10) top/bottom

Data: useApi('/api/experience')
Loading: 2 SkeletonCard components

Header:
- <Badge variant="neutral">Experience</Badge>
- "Where I've been." — text-h1, font-display, bold

Timeline layout — Cal.com numbered steps style:
Alternating desktop layout (odd: number left + card right, even: card left + number right):
- Number: large Badge variant="dark" ("01", "02" etc), size 3rem text, font-display
- Card variant="default":
  - Header row (flex, space-between): company name (text-h3, font-display, bold) + date range (text-sm, text-secondary)
  - Role title: text-body-lg, weight 600, color text-primary, margin-top space-2
  - Description: text-body, text-secondary, margin-top space-3
  - Bullet list: each item with "→" prefix, text-sm, text-secondary
  - Tags: <Tag> row at bottom, margin-top space-4

Mobile: stacked list, badge above card, no alternating.
RevealList stagger 150ms.
```

## Prompt 4.6 — CV Section

```
Build the CV section.
Files: frontend/src/components/sections/CV.jsx + CV.module.css
Section id: "cv", background: var(--color-bg), padding: var(--space-10) top/bottom

Header:
- <Badge variant="neutral">Résumé</Badge>
- "My Résumé." — text-h1, font-display, bold
- "A snapshot of my background. Download the full version below." — text-body-lg, text-secondary

CV preview card (max-width 780px, centered, Card variant="default", extra padding space-7):
- Top lime accent strip: height 4px, background var(--color-accent), border-radius top, margin -space-7 -space-7 space-6 (full width of card)
- Header block:
  "Ethan Nartey" — text-h2, font-display, bold
  "Data Scientist & Robotics Engineer" — text-body-lg, text-secondary
  Contact row (flex, gap space-5): 📧 email · GitHub username · 📍 Ghana
  {/* TODO: Replace with real contact details */}
- Divider: 1px var(--color-border), margin space-5 0
- Two columns inside (35% / 65%):
  Left:
    "EDUCATION" label (text-xs, text-upper, text-secondary, margin-bottom space-3)
    University name, degree, year — {/* TODO */}
    "SKILLS" label (margin-top space-5)
    Flex-wrap of 6-8 <Tag> components
  Right:
    "EXPERIENCE" label
    2 experience entries: role at company, date — {/* TODO */}
    "KEY PROJECTS" label (margin-top space-5)
    2 projects: name + 1 line — {/* TODO */}

Below card (center aligned, margin-top space-8):
<Button variant="accent" size="lg" href="/assets/cv/ethan-nartey-cv.pdf" download>
  ↓ Download Full CV (PDF)
</Button>
Small note: "Last updated: [Month Year]  ·  {/* TODO: file size */}" — text-xs, text-secondary, margin-top space-3

Note at top of file: // Place your CV PDF at: frontend/public/assets/cv/ethan-nartey-cv.pdf
```

## Prompt 4.7 — Contact Section

```
Build the Contact section.
Files: frontend/src/components/sections/Contact.jsx + Contact.module.css
Section id: "contact", background: var(--color-surface), padding: var(--space-10) top/bottom

Header:
- <Badge variant="neutral">Get In Touch</Badge>
- Two-line heading: "Let's build" (text-primary) / "something." (color-accent) — text-h1, font-display
- Subtext: "Have a project in mind? A research collab? My inbox is always open." — text-body-lg, text-secondary

TWO COLUMNS desktop, stacked mobile:

LEFT (58%) — Form inside Card variant="default":
Three fields (Name, Email, Message textarea):
Field wrapper: position relative, padding-top space-4, margin-bottom space-6
- Label: position absolute top-0 left-0, text-xs, text-upper, text-secondary, weight 600
- Input/Textarea: width 100%, padding space-3 0, border none, border-bottom 1px solid --color-border, bg transparent, font-body, text-body, color text-primary, outline none
- Focus: border-bottom-color var(--color-accent), transition var(--dur-base)
- Error state: border-bottom-color --color-error, small error text below (text-xs, color-error)
Textarea: min-height 120px, resize vertical

Submit: <Button variant="accent" size="lg" loading={isSubmitting}>Send Message →</Button>
Full width.

States:
- Idle: form visible
- Submitting: loading=true on button, fields disabled
- Success: replace form with Card showing: ✅ (large, lime), "Message sent!", "I'll reply within 24 hours.", ghost Button "Send another" that resets state
- Error: red inline message below button

Validation before submit:
- name: required, min 2 chars
- email: required, valid format
- message: required, min 10 chars
Show field-level errors.

POST to /api/contact: { name, email, message }. Use fetch + try/catch.

RIGHT (42%) — Info panel:
"Or reach out directly" — text-xs, text-upper, text-secondary
Ethan's email as large link (text-h3, font-display) — {/* TODO */}
Hover: color var(--color-accent), underline from left (CSS transform scaleX)

Divider
"⚡ Usually responds within 24 hours" — text-sm, text-secondary
Divider

"Connect:" — text-xs, text-upper, text-secondary
3 social link cards (Card variant="hover", small, flex row, gap space-3):
GitHub / LinkedIn / Twitter — each shows icon emoji + platform + handle — {/* TODO: real handles */}

Mobile: hide info panel. Form full width.
```

---

---

# PHASE 5 — PAGES & ROUTING

---

## Prompt 5.1 — Pages and App Router

```
Wire everything together for Ethan Nartey's portfolio.

### frontend/src/pages/Home.jsx
Import and render in this order:
1. <Hero />
2. <About />
3. <Work />
4. <Skills />
5. <Experience />
6. <CV />
7. <Contact />
8. <Footer />
Add id="main" to the main wrapper div.

### frontend/src/pages/ProjectDetail.jsx
Route: /work/:slug
Data: useApi(`/api/projects/${slug}`) using useParams()

Layout (max-width 1000px, centered, padding space-9 top):
- "← All Projects" — text-sm, Button variant="ghost", onClick: navigate(-1) or navigate('/#work')
- Hero image: full width, aspect-ratio 16/9, object-fit cover, border-radius var(--radius-xl), margin-top space-6, box-shadow var(--shadow-lg)
- Content below image, two columns:
  Left (65%): title (text-h1, font-display), tagline (text-body-lg, text-secondary, margin-top space-3), description (text-body, line-height 1.8, margin-top space-5)
  Right (35%): Card variant="default" with Year, Tech stack (<Tag> list), <Button variant="primary">Live Site ↗</Button>, <Button variant="outline">GitHub ↗</Button>
- Gallery (if images array): horizontal scroll row, each 400×250px, object-fit cover, border-radius var(--radius-md)
- Loading: SkeletonCard placeholder
- 404: centered "Project not found." + back button

### frontend/src/App.jsx
- State: isLoading (starts true)
- Render <Loader onComplete={() => setIsLoading(false)} /> when isLoading
- Always render <Navbar />
- Main content: className toggles opacity 0→1 when isLoading becomes false
- <BrowserRouter> wrapping <AnimatePresence mode="wait">
- Routes: / → Home, /work/:slug → ProjectDetail (lazy loaded with React.lazy)
- Each page wrapped in <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-16 }} transition={{ duration:0.3 }}>
- Skip link: <a href="#main" className="sr-only focus-visible:not-sr-only">Skip to content</a>

### frontend/src/main.jsx
Import order: CSS files → react/react-dom → gsap + ScrollTrigger registration → App
gsap.registerPlugin(ScrollTrigger);
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

---

---

# PHASE 6 — BACKEND API

---

## Prompt 6.1 — Full Backend Implementation

```
Implement the complete Node.js + Express backend for Ethan Nartey's portfolio.

### backend/src/config/env.js
dotenv.config(). Export object with PORT, NODE_ENV, FRONTEND_URL, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO.
Throw Error listing any missing required vars.

### backend/src/middleware/cors.js
Dev: allow all origins. Production: allow only FRONTEND_URL.
Allow: GET, POST, OPTIONS. Headers: Content-Type. Credentials: true.

### backend/src/middleware/rateLimit.js
contactLimiter: 15min window, max 10, JSON error message.
generalLimiter: 15min window, max 100.

### backend/src/middleware/errorHandler.js
4-arg Express error handler. console.error in dev. res.status(err.status || 500).json({ error: err.message || 'Internal server error' })

### backend/src/utils/mailer.js
Nodemailer SMTP transporter from env.js.
Export async sendContactEmail({ name, email, message }):
- TO: env.CONTACT_TO, FROM: "Portfolio <env.SMTP_USER>", Reply-To: sender email
- Subject: "New message from {name} — Ethan Nartey Portfolio"
- HTML: styled email with name, email, message, ISO timestamp
- Text: plain text fallback

### backend/src/controllers/portfolioController.js
Helper readData(filename): fs.readFileSync + JSON.parse on backend/data/{filename}.json
getProjects: read projects.json, sort featured:true first, res.json(data)
getProjectBySlug: find by slug, res.status(404).json({ error:'Project not found' }) if missing
getExperience: read experience.json, res.json(data)
getSkills: read skills.json, res.json(data)

### backend/src/controllers/contactController.js
sendContact(req, res, next):
1. Destructure { name, email, message } from req.body
2. Validate all fields (name min 2, email regex, message min 10). Return 400 with per-field errors if invalid.
3. Await sendContactEmail(...)
4. Success: res.json({ success: true, message: "Your message has been sent!" })
5. Error: next(error)

### backend/src/routes/portfolio.js
GET /projects → getProjects
GET /projects/:slug → getProjectBySlug
GET /experience → getExperience
GET /skills → getSkills

### backend/src/routes/contact.js
POST / → contactLimiter → sendContact

### backend/src/routes/index.js
GET /health → { status: 'ok', uptime: process.uptime(), timestamp }
Mount /projects, /experience, /skills → portfolio router
Mount /contact → contact router

### Update backend/server.js
Order: helmet → cors → morgan → express.json → generalLimiter on /api → routes → errorHandler

### backend/data/projects.json
3 projects relevant to Data Science & Robotics:
[
  { "slug": "crop-disease-detector", "title": "Crop Disease Detector", "tagline": "CV model detecting early-stage crop disease in smallholder farms", "description": "...", "tags": ["Python","TensorFlow","OpenCV","FastAPI","React"], "year": 2024, "featured": true, "url": "", "github": "", "images": { "thumbnail": "/assets/images/crop-disease-detector-thumb.webp", "hero": "/assets/images/crop-disease-detector-hero.webp" } },
  { "slug": "autonomous-rover", "title": "Autonomous Campus Rover", "tagline": "ROS-based robot for indoor autonomous navigation", "tags": ["ROS","Python","SLAM","LiDAR","Raspberry Pi"], "year": 2023, "featured": true, ... },
  { "slug": "energy-forecasting", "title": "Energy Demand Forecasting", "tagline": "LSTM predicting hourly electricity demand for Ghana grid", "tags": ["PyTorch","Pandas","Time Series","Streamlit"], "year": 2024, "featured": false, ... }
]

### backend/data/experience.json
2 placeholder entries with {/* TODO: replace */} in a "note" field.

### backend/data/skills.json
[
  { "category": "Data Science", "icon": "📊", "items": ["Python","TensorFlow","PyTorch","Scikit-learn","Pandas","NumPy","SQL","Jupyter","Streamlit"] },
  { "category": "Robotics", "icon": "🤖", "items": ["ROS/ROS2","SLAM","Computer Vision","OpenCV","Arduino","Raspberry Pi","MATLAB","Simulink"] },
  { "category": "Frontend", "icon": "💻", "items": ["React","JavaScript","HTML/CSS","GSAP","Vite","Figma"] },
  { "category": "Tools & Infra", "icon": "🛠️", "items": ["Docker","Git","Linux","FastAPI","Node.js","PostgreSQL","VS Code"] }
]
```

---

---

# PHASE 7 — DEPLOYMENT

---

## Prompt 7.1 — Deployment Configuration Files

```
Create all deployment config for Ethan Nartey's portfolio.
Stack: Ubuntu 22.04, Nginx, PM2, GitHub Actions.

### .github/workflows/deploy.yml
Trigger: push to main
Uses: appleboy/ssh-action@v1.0.0
Secrets: VPS_HOST, VPS_USER, VPS_SSH_KEY
Remote script:
  cd ~/portfolio-project && git pull origin main
  cd frontend && npm ci && npm run build
  cd ../backend && npm ci --omit=dev
  pm2 restart portfolio-api --update-env || pm2 start ecosystem.config.cjs --env production
  pm2 save
  echo "✅ Deployed at $(date)"

### backend/ecosystem.config.cjs
module.exports = {
  apps: [{
    name: 'portfolio-api',
    script: 'server.js',
    cwd: '/home/deploy/portfolio-project/backend',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '200M',
    env: { NODE_ENV: 'development', PORT: 4000 },
    env_production: { NODE_ENV: 'production', PORT: 4000 }
  }]
}

### nginx.conf (project root, reference — apply manually on VPS):
Complete Nginx server block for yourdomain.com:
- listen 80 (Certbot adds 443)
- root: /home/deploy/portfolio-project/frontend/dist
- SPA fallback: try_files $uri $uri/ /index.html
- location /api/ proxy_pass to http://localhost:4000 with all proxy headers
- Static asset cache: 1 year for .js .css .webp .woff2 .ico .svg
- Gzip on for text/html text/css application/json application/javascript
- Security headers: X-Content-Type-Options nosniff, X-Frame-Options SAMEORIGIN, Referrer-Policy strict-origin-when-cross-origin

### scripts/setup-vps.sh
#!/bin/bash — run once on fresh Ubuntu 22.04 VPS:
1. apt update && apt upgrade -y
2. Install nvm + Node 18
3. apt install nginx certbot python3-certbot-nginx -y
4. npm install -g pm2
5. adduser deploy (no password, gecos "")
6. usermod -aG sudo deploy
7. Print: "Next: ssh-copy-id deploy@IP, then su - deploy and repeat nvm setup"

### scripts/first-deploy.sh
#!/bin/bash — run on VPS after first git clone:
1. cd backend && npm ci --omit=dev
2. cp .env.example .env && echo "⚠️ Fill in .env before continuing!"
3. cd ../frontend && npm ci && npm run build
4. Print: "Now run: pm2 start ecosystem.config.cjs --env production"
5. Print: "Then: pm2 save && pm2 startup"
6. Print: "Then: configure Nginx using nginx.conf in project root"
7. Print: "Then: sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com"
```

---

---

# PHASE 8 — POLISH & QA

---

## Prompt 8.1 — Mobile Responsiveness

```
Audit and fix all mobile responsive behavior in Ethan Nartey's portfolio.
Breakpoints: mobile < 768px, tablet 768–1024px.

Fix all of the following:

NAVBAR: Hamburger works. Overlay closes on link click and ESC. Body scroll locked when open.

HERO: Stack to single column (content top, cards bottom). Cards: reduce padding, smaller font. Heading: min size 2.5rem. CTA buttons: full width (flex-direction column on mobile).

ABOUT: Stack (image first, max 300px centered, then text). Stats: 2×2 grid.

WORK: Featured card stacks (image top, content bottom). Grid: 1 column mobile, 2 tablet.

SKILLS: 1 marquee row mobile. Cards: 2 cols mobile → 1 very small.

EXPERIENCE: No alternating — single stacked column.

CV: Card single column inside, padding space-5. Download button full width.

CONTACT: Hide right info panel mobile. Form full width. Input min-height 44px.

GLOBAL:
- Wrap all hover transforms in @media (hover: hover)
- No horizontal overflow (overflow-x: hidden on body)
- All tap targets min 44×44px
- Body font min 16px on mobile
- <meta name="viewport" content="width=device-width, initial-scale=1.0"> in index.html
- <meta name="theme-color" content="#f5f5f4"> in index.html
```

## Prompt 8.2 — SEO and Accessibility

```
Apply SEO and accessibility to Ethan Nartey's portfolio.

### index.html <head> additions:
<title>Ethan Nartey — Data Scientist & Robotics Engineer</title>
<meta name="description" content="Portfolio of Ethan Nartey — Data Scientist and Robotics Engineer from Ghana. Building intelligent systems in ML, robotics, and computer vision.">
OG tags: og:title, og:description, og:image (https://yourdomain.com/assets/images/og-image.webp), og:url, og:type website
Twitter: twitter:card summary_large_image, twitter:title, twitter:image
Google Fonts preconnect links
<link rel="icon" href="/assets/icons/favicon.ico">
<link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png">
lang="en" on <html>

### React:
- Lazy load ProjectDetail: React.lazy() + Suspense with SkeletonCard fallback
- loading="lazy" on all project images
- width + height on all <img> tags
- useMemo on featured/non-featured project filtering
- key props on all .map() calls

### vite.config.js build optimization:
manualChunks: { 'react-vendor': ['react','react-dom','react-router-dom'], 'animation-vendor': ['gsap','framer-motion'] }

### Accessibility:
- Focus styles: all interactive elements get outline: 2px solid var(--color-accent), outline-offset: 2px on :focus-visible
- All images: descriptive alt attributes (decorative images: alt="")
- Form inputs: proper label association (htmlFor/id)
- Navbar: aria-current="page" on active link, aria-label on hamburger
- Skip link: <a href="#main" class="sr-only"> in App.jsx (CSS: position absolute, width/height 1px, overflow hidden, clip)
- Sufficient color contrast (the palette passes WCAG AA — verify with browser DevTools)

### public/robots.txt:
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

## Prompt 8.3 — Final Integration Test

```
Run a complete integration test of Ethan Nartey's portfolio. Fix every issue found.

Start both servers:
  cd frontend && npm run dev    (port 5173)
  cd backend && npm run dev     (port 4000)

Test and fix ALL of these:

FRONTEND:
[ ] npm run dev: zero errors in terminal
[ ] Loader: progress bar fills, fades out, page fades in
[ ] Navbar: floating pill visible after load, disappears/reappears on scroll correctly
[ ] Hamburger menu: works on mobile viewport, closes on link click and ESC
[ ] Hero: two columns render, code card has float animation, badge blinks
[ ] Hero GSAP: console shows no ScrollTrigger errors
[ ] About: profile image placeholder shows, stats count up on scroll
[ ] Work: project cards fetch from API, featured card is full width
[ ] Work: project card links to /work/crop-disease-detector
[ ] ProjectDetail: loads at /work/crop-disease-detector, back button works
[ ] ProjectDetail: /work/fake-slug shows 404 message
[ ] Skills: both marquee rows scroll, pause on hover
[ ] Experience: cards render from API
[ ] CV: preview card renders, download button present
[ ] Contact: validation errors show on empty submit
[ ] Contact: successful POST shows success state
[ ] Footer: all link columns visible
[ ] Page transitions: animate between / and /work/:slug
[ ] No horizontal scroll on mobile viewport
[ ] No console errors or warnings (zero tolerance)

BACKEND (test with curl or browser):
[ ] GET /api/health → { status:'ok' }
[ ] GET /api/projects → array of 3, featured items first
[ ] GET /api/projects/crop-disease-detector → single object
[ ] GET /api/projects/nonexistent → { error:'Project not found' } with 404
[ ] GET /api/experience → array
[ ] GET /api/skills → array of 4 categories
[ ] POST /api/contact { name:'Test', email:'test@test.com', message:'Hello testing' } → { success:true }
[ ] POST /api/contact {} → 400 with validation error details
[ ] POST /api/contact (11 times fast) → 429 on 11th

INTEGRATION:
[ ] No CORS errors in browser console
[ ] /api/* calls proxied correctly from 5173 to 4000
[ ] Images in /assets/images/ accessible (add 1x1 placeholder.webp if needed)

List every bug found and every fix applied.
```

---

---

# QUICK REFERENCE

```bash
# Local dev
cd frontend && npm run dev     # http://localhost:5173
cd backend && npm run dev      # http://localhost:4000

# Test API
curl http://localhost:4000/api/health
curl http://localhost:4000/api/projects
curl -X POST http://localhost:4000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"t@t.com","message":"Hello world test"}'

# Production build
cd frontend && npm run build   # → frontend/dist/

# Deploy
git add . && git commit -m "deploy" && git push origin main

# VPS
ssh deploy@YOUR_VPS_IP
pm2 status
pm2 logs portfolio-api
pm2 restart portfolio-api
sudo nginx -t && sudo systemctl reload nginx
```

---

# CONTENT REPLACEMENT CHECKLIST (before going live)

| What | Where |
|------|-------|
| Your real bio | `About.jsx` TODO comment |
| Real projects data | `backend/data/projects.json` |
| Real experience | `backend/data/experience.json` |
| CV PDF | `frontend/public/assets/cv/ethan-nartey-cv.pdf` |
| Profile photo | `frontend/public/assets/images/profile.webp` |
| Project screenshots | `frontend/public/assets/images/*.webp` |
| OG image (1200×630) | `frontend/public/assets/images/og-image.webp` |
| Favicon + apple icon | `frontend/public/assets/icons/` |
| Email + social handles | `Footer.jsx`, `Contact.jsx` TODO comments |
| Real SMTP creds | `backend/.env` |
| Real domain | `nginx.conf`, OG meta tags |
