import { transporter } from '../utils/mailer.js'
import { config } from '../config/env.js'

function sanitize(str) {
  return String(str).replace(/<[^>]*>/g, '').trim()
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function sendContact(req, res, next) {
  try {
    const { name, email, message } = req.body

    if (!name || sanitize(name).length < 2) {
      return res.status(400).json({ error: 'Name must be at least 2 characters.' })
    }
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ error: 'A valid email address is required.' })
    }
    if (!message || sanitize(message).length < 10) {
      return res.status(400).json({ error: 'Message must be at least 10 characters.' })
    }

    const safeName = sanitize(name)
    const safeEmail = sanitize(email)
    const safeMessage = sanitize(message)

    await transporter.sendMail({
      from: `"Portfolio Contact" <${config.smtp.user}>`,
      to: config.contactTo,
      replyTo: safeEmail,
      subject: `New message from ${safeName}`,
      text: `Name: ${safeName}\nEmail: ${safeEmail}\n\n${safeMessage}`,
      html: `
        <h2>New portfolio contact</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        <hr />
        <p>${safeMessage.replace(/\n/g, '<br>')}</p>
      `,
    })

    res.json({ success: true, message: 'Message sent successfully.' })
  } catch (err) {
    next(err)
  }
}
