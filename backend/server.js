import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import corsMiddleware from './src/middleware/cors.js'
import routes from './src/routes/index.js'
import errorHandler from './src/middleware/errorHandler.js'

const app = express()
const PORT = process.env.PORT || 4000

app.use(helmet())
app.use(corsMiddleware)
app.use(morgan('dev'))
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() })
})

app.use('/api', routes)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`API running on :${PORT}`)
})
