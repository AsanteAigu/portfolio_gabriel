const required = ['PORT', 'NODE_ENV', 'FRONTEND_URL']

for (const key of required) {
  if (!process.env[key]) {
    console.warn(`[env] Warning: ${key} is not set`)
  }
}

export const config = {
  port: parseInt(process.env.PORT || '4000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
  contactTo: process.env.CONTACT_TO || '',
}
