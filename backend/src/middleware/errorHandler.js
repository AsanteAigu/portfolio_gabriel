export default function errorHandler(err, _req, res, _next) {
  console.error('[error]', err.message)

  const status = err.status || err.statusCode || 500
  const message = err.expose ? err.message : 'Internal server error'

  res.status(status).json({ error: message })
}
