import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import careersHandler from './api/careers.js'
import contactHandler from './api/contact.js'
import { isAllowedRequestOrigin } from './api/request-security.js'

const app = express()
const port = Number(process.env.PORT) || 3000
const currentDirectory = path.dirname(fileURLToPath(import.meta.url))
const distDirectory = path.join(currentDirectory, 'dist')

app.disable('x-powered-by')
app.set('trust proxy', 1)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'SAMEORIGIN')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  next()
})

app.use('/api', (req, res, next) => {
  if (!isAllowedRequestOrigin(req)) return res.status(403).json({ success: false, message: 'This form origin is not allowed.' })
  const origin = req.headers.origin
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Vary', 'Origin')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept')
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

const rateBuckets = new Map()
const RATE_WINDOW_MS = 15 * 60 * 1000
const RATE_LIMIT = 10
app.use('/api/careers', (req, res, next) => {
  if (req.method !== 'POST') return next()
  const now = Date.now()
  const key = req.ip || req.socket.remoteAddress || 'unknown'
  let bucket = rateBuckets.get(key)
  if (!bucket || now - bucket.startedAt >= RATE_WINDOW_MS) {
    bucket = { startedAt: now, count: 0 }
    rateBuckets.set(key, bucket)
  }
  bucket.count += 1
  if (rateBuckets.size > 1000) {
    for (const [ip, entry] of rateBuckets) if (now - entry.startedAt >= RATE_WINDOW_MS) rateBuckets.delete(ip)
  }
  if (bucket.count > RATE_LIMIT) return res.status(429).json({ success: false, message: 'Too many applications were submitted from this connection. Please try again later.' })
  next()
})

app.use(express.json({ limit: '32kb' }))
app.all('/api/careers', careersHandler)
app.all('/api/contact', contactHandler)
app.get('/health', (_req, res) => res.status(200).json({ status: 'ok' }))

app.use(express.static(distDirectory, { index: false, maxAge: process.env.NODE_ENV === 'production' ? '1y' : 0 }))
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return res.status(404).json({ success: false, message: 'API route not found.' })
  res.sendFile(path.join(distDirectory, 'index.html'), (error) => { if (error) next(error) })
})

app.use((error, _req, res, _next) => {
  console.error('[server] Unhandled request error:', error.message)
  if (res.headersSent) return
  res.status(500).json({ success: false, message: 'The server could not complete this request.' })
})

app.listen(port, '0.0.0.0', () => console.log(`Sage GFX app listening on port ${port}`))
