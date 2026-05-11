# Backend Blueprint

> Node.js + Express. Minimal API — contact form, project data, health check.
> No database needed. Data lives in JSON files.

---

## Prerequisites

```bash
cd backend
npm init -y

# Core
npm install express cors dotenv nodemailer express-rate-limit helmet morgan

# Dev
npm install -D nodemon
```

**Node version:** 18+

---

## File Map

```
backend/
├── .env.example              # Copy to .env — never commit .env
├── package.json
├── server.js                 # Entry point — starts Express
│
├── data/
│   ├── projects.json         # Your project list (slug, title, description, etc.)
│   ├── experience.json       # Work history (company, role, dates, bullets)
│   └── skills.json           # Skill categories + items
│
└── src/
    ├── config/
    │   └── env.js            # Validates + exports process.env values
    │
    ├── middleware/
    │   ├── cors.js           # CORS config (allow only your domain in prod)
    │   ├── rateLimit.js      # express-rate-limit: 10 req/15min on /api/contact
    │   └── errorHandler.js   # Global error handler (catches thrown errors)
    │
    ├── routes/
    │   ├── index.js          # Mounts all routers
    │   ├── contact.js        # POST /api/contact
    │   └── portfolio.js      # GET /api/projects, GET /api/projects/:slug, etc.
    │
    ├── controllers/
    │   ├── contactController.js    # Validates body, sends email via Nodemailer
    │   └── portfolioController.js  # Reads JSON files, returns data
    │
    └── utils/
        ├── mailer.js         # Nodemailer transporter setup
        └── logger.js         # Morgan or simple console wrapper
```

---

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/health` | Returns `{ status: 'ok', uptime }` |
| `GET` | `/api/projects` | Returns all projects array |
| `GET` | `/api/projects/:slug` | Returns single project by slug |
| `GET` | `/api/experience` | Returns work experience array |
| `GET` | `/api/skills` | Returns skills list |
| `POST` | `/api/contact` | Sends contact email, returns `{ success: true }` |

---

## Data Shapes

### `data/projects.json`
```json
[
  {
    "slug": "project-name",
    "title": "Project Name",
    "tagline": "One sentence hook",
    "description": "Longer paragraph",
    "tags": ["React", "Node.js", "PostgreSQL"],
    "year": 2024,
    "url": "https://livesite.com",
    "github": "https://github.com/you/repo",
    "images": {
      "thumbnail": "/assets/images/project-name-thumb.webp",
      "hero": "/assets/images/project-name-hero.webp",
      "gallery": ["/assets/images/project-name-1.webp"]
    },
    "featured": true
  }
]
```

### `data/experience.json`
```json
[
  {
    "company": "Company Name",
    "role": "Your Title",
    "start": "Jan 2023",
    "end": "Present",
    "description": "What you did and built.",
    "highlights": ["Thing 1", "Thing 2"]
  }
]
```

### `data/skills.json`
```json
[
  {
    "category": "Frontend",
    "items": ["React", "Three.js", "GSAP", "CSS", "TypeScript"]
  },
  {
    "category": "Backend",
    "items": ["Node.js", "Express", "PostgreSQL", "REST APIs"]
  }
]
```

---

## Contact Controller Logic

```
POST /api/contact
  Body: { name, email, message }

1. Validate: name (non-empty), email (format check), message (10+ chars)
2. Sanitize: strip HTML tags from all fields
3. Send email via Nodemailer (SMTP or Gmail OAuth2)
4. Respond: { success: true, message: "Email sent" }
5. On error: pass to errorHandler → respond 500
```

---

## `.env.example`

```env
# Server
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Email (use Gmail App Password or SMTP relay)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=you@gmail.com
SMTP_PASS=your_app_password
CONTACT_TO=you@gmail.com
```

---

## `server.js` Structure

```js
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from './src/middleware/cors.js'
import routes from './src/routes/index.js'
import errorHandler from './src/middleware/errorHandler.js'

const app = express()

app.use(helmet())
app.use(cors)
app.use(morgan('dev'))
app.use(express.json())

app.use('/api', routes)
app.use(errorHandler)

app.listen(process.env.PORT || 4000, () => {
  console.log(`API running on :${process.env.PORT}`)
})
```

---

## `package.json` Scripts

```json
{
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```
