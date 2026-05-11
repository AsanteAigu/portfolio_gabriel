# Design System

> Visual language for the portfolio. Inspired by cow.com's playful-yet-precise interactivity.
> Every decision here is intentional — follow it consistently.

---

## 1. Aesthetic Direction

**Tone:** Editorial dark luxury — full black canvas, sharp typographic hierarchy, surprise moments of color.
**Feel:** Like walking through a physical installation. Sections snap into place. The cursor is alive.
**Reference:** cow.com — scroll-hijacking, large type, theatrical transitions, WebGL texture distortion.

---

## 2. Color Palette

```css
:root {
  /* Base */
  --color-bg:         #080808;   /* Near-black canvas */
  --color-surface:    #111111;   /* Elevated surfaces, cards */
  --color-border:     #1f1f1f;   /* Subtle borders */

  /* Text */
  --color-text-primary:   #f0ece4;  /* Warm off-white */
  --color-text-secondary: #888882;  /* Muted labels */
  --color-text-accent:    #c8ff00;  /* Electric lime — the signature pop */

  /* Accent */
  --color-accent:         #c8ff00;  /* Buttons, highlights, cursor ring */
  --color-accent-dim:     #8aad00;  /* Hover states */

  /* Gradients */
  --gradient-hero: radial-gradient(ellipse at 20% 50%, #1a2a00 0%, #080808 60%);
}
```

**Rule:** The lime accent (#c8ff00) is used sparingly. One element per viewport max.

---

## 3. Typography

```css
/* Import in index.html or via @font-face */
/* Display: "Editorial New" or "Playfair Display" — large, editorial, serif */
/* Body: "DM Mono" — techy, readable, monospace personality */

:root {
  --font-display: 'Editorial New', 'Playfair Display', Georgia, serif;
  --font-body:    'DM Mono', 'Courier New', monospace;

  /* Scale */
  --text-hero:   clamp(5rem, 12vw, 14rem);   /* H1 — massive */
  --text-h2:     clamp(2.5rem, 5vw, 6rem);
  --text-h3:     clamp(1.25rem, 2.5vw, 2rem);
  --text-body:   clamp(0.875rem, 1.2vw, 1rem);
  --text-label:  0.75rem;                     /* All-caps labels */

  /* Tracking */
  --tracking-tight:  -0.04em;
  --tracking-normal: 0em;
  --tracking-wide:   0.15em;   /* Used for uppercase labels */
}
```

**Rules:**
- Display font: headlines, section titles only
- DM Mono: nav, labels, body copy, code, meta info
- Never more than 2 font weights per section

---

## 4. Spacing System

```css
:root {
  --space-1:   0.25rem;    /* 4px */
  --space-2:   0.5rem;     /* 8px */
  --space-3:   1rem;       /* 16px */
  --space-4:   1.5rem;     /* 24px */
  --space-5:   2.5rem;     /* 40px */
  --space-6:   4rem;       /* 64px */
  --space-7:   7rem;       /* 112px */
  --space-8:   12rem;      /* 192px — section breathing room */
}
```

---

## 5. Motion & Animation

### Philosophy
> Animate meaning, not decoration. Every animation should communicate state change.

### Timing Tokens
```css
:root {
  --ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);   /* Page transitions */
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);   /* Hover states */
  --ease-in-expo:   cubic-bezier(0.7, 0, 0.84, 0);   /* Exit animations */

  --duration-fast:   180ms;
  --duration-base:   420ms;
  --duration-slow:   800ms;
  --duration-xslow: 1400ms;  /* Hero entrance */
}
```

### Key Interactions (cow.com-style)
| Interaction | Behavior |
|-------------|----------|
| **Custom cursor** | Large circle (40px), magnetic pull toward buttons, shrinks on click |
| **Scroll hijack (Hero)** | Pin the Hero section; progress drives GSAP timeline (text reveal + WebGL distortion) |
| **Section entrance** | Lines/words slide up with staggered delay (SplitText or manual span wrap) |
| **Project hover** | Image scales from 0 inside a clip-path mask, follows cursor |
| **Navbar** | Hidden by default; fades in on scroll > 100px; active section highlighted |
| **Page transition** | Curtain wipe (full-screen div) slides in/out between routes |

### GSAP ScrollTrigger Pattern (for reference when building)
```
Hero pin → 300vh scroll space
  0%  → 30%  : Title words stagger in
  30% → 60%  : Subtitle + CTA fade up, WebGL mesh distorts
  60% → 100% : Panel fades out, next section enters
```

---

## 6. Components Visual Rules

### Buttons
- Style: borderless, text + underline that draws from left on hover
- Accent variant: filled lime (#c8ff00), black text, no border-radius OR very slight (2px)
- Never use heavy drop shadows

### Cards (Project tiles)
- Dark surface (#111111), 1px border (#1f1f1f)
- On hover: image reveals via clip-path, title shifts up 4px
- No rounded corners (sharp = intentional)

### Cursor
- Custom cursor always on desktop (hide default)
- 40px ring, 6px lag (lerp), lime border
- On hoverable elements: ring expands to 80px, fills lime at 20% opacity

---

## 7. Responsive Breakpoints

```css
/* Mobile-first */
--bp-sm:  480px;
--bp-md:  768px;
--bp-lg:  1024px;
--bp-xl:  1440px;
--bp-2xl: 1920px;
```

**Mobile behavior:**
- Custom cursor disabled
- Scroll hijack disabled (normal scroll)
- Three.js scene replaced with static image fallback
- Font sizes use clamp() so they scale automatically
