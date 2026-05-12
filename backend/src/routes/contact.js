import { Router } from 'express'
import { contactLimiter } from '../middleware/rateLimit.js'
import { sendContact } from '../controllers/contactController.js'

const router = Router()

router.post('/', contactLimiter, sendContact)

export default router
