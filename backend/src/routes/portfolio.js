import { Router } from 'express'
import {
  getProjects,
  getProject,
  getExperience,
  getSkills,
} from '../controllers/portfolioController.js'

const router = Router()

router.get('/projects', getProjects)
router.get('/projects/:slug', getProject)
router.get('/experience', getExperience)
router.get('/skills', getSkills)

export default router
