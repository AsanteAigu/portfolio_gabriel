# Portfolio Website — Project Blueprint

> Inspired by the scroll-driven, heavily interactive aesthetic of **cow.com**.
> Built with **React (Vite)** on the frontend and **Node.js + Express** on the backend.
> Deployed on a **VPS** (e.g. Ubuntu + Nginx) with Git-based CI/CD.

---

## Tech Stack

| Layer      | Technology                                      |
|------------|-------------------------------------------------|
| Frontend   | React 18, Vite, GSAP, Three.js, Framer Motion  |
| Backend    | Node.js, Express, Nodemailer, rate-limit        |
| Styling    | CSS Modules + custom CSS variables (no Tailwind)|
| Deployment | VPS (Nginx reverse proxy), PM2, GitHub Actions  |
| Version Control | Git + GitHub                               |

---

## Folder Structure

```
portfolio-project/
├── frontend/              # React + Vite app
│   ├── public/
│   │   └── assets/        # Static fonts, images, icons, videos
│   └── src/
│       ├── components/
│       │   ├── sections/  # Hero, About, Work, Contact page sections
│       │   ├── ui/        # Reusable UI (Cursor, Loader, Navbar, etc.)
│       │   └── three/     # Three.js canvas components
│       ├── hooks/         # Custom React hooks
│       ├── utils/         # Helper functions
│       ├── styles/        # Global CSS, variables, resets
│       └── context/       # React context providers
│
├── backend/               # Node.js + Express API
│   ├── src/
│   │   ├── routes/        # API route definitions
│   │   ├── controllers/   # Route handler logic
│   │   ├── middleware/     # Auth, rate-limit, CORS, error handling
│   │   ├── utils/         # Mailer, logger
│   │   └── config/        # Environment config loader
│   └── data/              # Static JSON (projects, experience, skills)
│
├── docs/                  # All blueprint .md planning files
├── .github/workflows/     # CI/CD GitHub Actions
└── README.md              # This file
```

---

## Quick Start (Local Dev)

```bash
# 1. Clone
git clone https://github.com/yourusername/portfolio.git
cd portfolio-project

# 2. Frontend
cd frontend
npm install
npm run dev         # http://localhost:5173

# 3. Backend (new terminal)
cd ../backend
npm install
cp .env.example .env   # fill in your values
npm run dev         # http://localhost:4000
```

---

## Deployment Overview

See [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md) for full VPS setup.

High-level:
1. Push to `main` → GitHub Actions runs → SSH into VPS → pull & rebuild
2. Nginx serves the React build as static files on port 80/443
3. Nginx reverse-proxies `/api/*` to the Node.js server on port 4000
4. PM2 keeps the Node.js process alive

---

## Docs Index

| File | Purpose |
|------|---------|
| [`docs/DESIGN_SYSTEM.md`](./docs/DESIGN_SYSTEM.md) | Colors, typography, motion, design tokens |
| [`docs/FRONTEND.md`](./docs/FRONTEND.md) | Component map, scroll logic, Three.js plan |
| [`docs/BACKEND.md`](./docs/BACKEND.md) | API routes, contact form, data structure |
| [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md) | VPS, Nginx, PM2, SSL, CI/CD |
| [`docs/CONTENT.md`](./docs/CONTENT.md) | What copy/media to prepare before building |
