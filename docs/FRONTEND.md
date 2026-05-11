# Frontend Blueprint

> React 18 + Vite. Every file listed here is a placeholder to create.
> Do NOT write logic yet — this doc is your map.

---

## Prerequisites

```bash
# Node version: 18+
node -v

# Create the app
npm create vite@latest frontend -- --template react
cd frontend
npm install

# Core deps
npm install gsap @gsap/react three @react-three/fiber @react-three/drei
npm install framer-motion
npm install react-router-dom

# Dev deps
npm install -D sass
```

---

## File Map

```
frontend/
├── index.html                    # Entry HTML — load custom fonts here
├── vite.config.js                # Vite config (aliases, proxy to :4000)
├── public/
│   └── assets/
│       ├── fonts/                # Self-hosted: Editorial New + DM Mono (.woff2)
│       ├── images/               # Project screenshots, profile photo
│       ├── icons/                # SVGs (logo, social icons)
│       └── videos/               # Optional background loops (< 5MB, .webm)
│
└── src/
    ├── main.jsx                  # React DOM root, global styles import
    ├── App.jsx                   # Router setup + page transition wrapper
    │
    ├── styles/
    │   ├── global.css            # CSS reset, :root variables (from DESIGN_SYSTEM.md)
    │   ├── typography.css        # Font-face declarations, text utility classes
    │   └── animations.css        # Reusable keyframe animations
    │
    ├── context/
    │   └── CursorContext.jsx     # Global cursor state (position, isHovering, variant)
    │
    ├── hooks/
    │   ├── useScrollProgress.js  # Returns 0–1 scroll progress for a ref element
    │   ├── useMousePosition.js   # Returns {x, y} mouse coords (normalised -1 to 1)
    │   ├── useSplitText.js       # Wraps text nodes in <span> for per-word animation
    │   └── useMediaQuery.js      # Checks breakpoint (disables effects on mobile)
    │
    ├── utils/
    │   ├── lerp.js               # Linear interpolation helper
    │   ├── mapRange.js           # Maps a value from one range to another
    │   └── cn.js                 # classNames helper (tiny, no library needed)
    │
    ├── components/
    │   │
    │   ├── ui/                   # Reusable across sections
    │   │   ├── Cursor.jsx        # Custom cursor component (reads CursorContext)
    │   │   ├── Navbar.jsx        # Fixed top nav, hides/shows on scroll
    │   │   ├── Loader.jsx        # Full-screen preloader (counts to 100, then exits)
    │   │   ├── PageTransition.jsx# Curtain wipe between routes (Framer Motion)
    │   │   ├── MagneticButton.jsx# Wrapper: mouse proximity warps child element
    │   │   ├── RevealText.jsx    # Animates words/lines in on mount (GSAP)
    │   │   └── Footer.jsx        # Email, socials, copyright
    │   │
    │   ├── three/                # WebGL / Three.js
    │   │   ├── Scene.jsx         # R3F Canvas wrapper, camera, lights
    │   │   ├── FluidMesh.jsx     # Plane with shader — distorts on scroll/mouse
    │   │   └── shaders/
    │   │       ├── fluid.vert    # Vertex shader (wave displacement)
    │   │       └── fluid.frag    # Fragment shader (texture + distortion)
    │   │
    │   └── sections/             # Full-page sections (used in Home.jsx)
    │       ├── Hero.jsx          # Pinned scroll section — big title + Three.js bg
    │       ├── About.jsx         # Two-column: bio left, photo/skills right
    │       ├── Work.jsx          # Project grid — hover reveals image
    │       ├── Process.jsx       # Optional: numbered steps / philosophy
    │       └── Contact.jsx       # Contact form (posts to /api/contact)
    │
    └── pages/
        ├── Home.jsx              # Assembles all sections in order
        └── ProjectDetail.jsx     # Individual project case study page
```

---

## Routing (App.jsx)

```jsx
// Two routes only — keep it simple
<Routes>
  <Route path="/"           element={<Home />} />
  <Route path="/work/:slug" element={<ProjectDetail />} />
</Routes>
```

Page transitions: wrap each route in `<PageTransition>` using Framer Motion's `AnimatePresence`.

---

## Section Build Order (recommended)

1. `global.css` + `typography.css` — get variables in first
2. `Loader.jsx` — first thing user sees, sets the tone
3. `Cursor.jsx` + `CursorContext.jsx` — wire up globally in `main.jsx`
4. `Navbar.jsx`
5. `Hero.jsx` (static first, add Three.js after)
6. `About.jsx`
7. `Work.jsx`
8. `Contact.jsx` (wire to backend last)
9. `Footer.jsx`
10. Add GSAP scroll animations to each section
11. Add Three.js `FluidMesh.jsx` to Hero
12. Add `PageTransition.jsx` + `ProjectDetail.jsx`

---

## Hero Section — Scroll Logic

The Hero is **pinned** for a 300vh scroll distance using GSAP ScrollTrigger:

```
ScrollTrigger.create({
  trigger: heroRef,
  start: "top top",
  end: "+=300%",
  pin: true,
  scrub: 1,
  onUpdate: (self) => {
    // self.progress = 0 to 1
    // Drive: title opacity, FluidMesh distortion uniform, subtitle position
  }
})
```

**Timeline breakdown:**
| Progress | What happens |
|----------|-------------|
| 0 → 0.2  | Title words stagger in (Y: 80px → 0, opacity 0 → 1) |
| 0.2 → 0.5| Subtitle fades in, WebGL mesh begins warping |
| 0.5 → 0.8| CTA button appears with magnetic hover |
| 0.8 → 1.0| Entire hero fades/slides out, next section enters |

---

## Three.js Fluid Mesh

File: `src/components/three/FluidMesh.jsx`

- A `PlaneGeometry(2, 2, 64, 64)` with a custom GLSL shader
- Uniforms driven by:
  - `uProgress` — scroll progress (0–1) from Hero's ScrollTrigger
  - `uMouse` — normalised mouse position from `useMousePosition` hook
  - `uTime` — `clock.elapsedTime` from `useFrame`
- On mobile: render nothing (`useMediaQuery` hook checks `--bp-md`)

---

## Vite Config (vite.config.js)

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  },
  server: {
    proxy: {
      '/api': 'http://localhost:4000'   // Dev: forward API calls to Express
    }
  }
})
```

---

## Performance Notes

- Lazy-load `ProjectDetail.jsx` with `React.lazy()`
- Use `loading="lazy"` on all `<img>` tags
- Compress all images to WebP, max 200KB each
- Three.js canvas: limit pixel ratio to `Math.min(window.devicePixelRatio, 2)`
- GSAP: register only the plugins you use (`ScrollTrigger`, `SplitText`)
