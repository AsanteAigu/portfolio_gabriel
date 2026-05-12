import { Router } from 'express'
import portfolioRoutes from './portfolio.js'
import contactRoutes from './contact.js'

const router = Router()

router.use('/', portfolioRoutes)
router.use('/contact', contactRoutes)

export default router
