import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataDir = join(__dirname, '../../data')

function readJSON(filename) {
  const raw = readFileSync(join(dataDir, filename), 'utf-8')
  return JSON.parse(raw)
}

export function getProjects(req, res) {
  const projects = readJSON('projects.json')
  res.json(projects)
}

export function getProject(req, res) {
  const projects = readJSON('projects.json')
  const project = projects.find(p => p.slug === req.params.slug)
  if (!project) {
    return res.status(404).json({ error: 'Project not found.' })
  }
  res.json(project)
}

export function getExperience(req, res) {
  const experience = readJSON('experience.json')
  res.json(experience)
}

export function getSkills(req, res) {
  const skills = readJSON('skills.json')
  res.json(skills)
}
