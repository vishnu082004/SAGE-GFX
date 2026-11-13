function normalizedOrigin(value) {
  try { return new URL(value).origin } catch { return null }
}

export function isAllowedRequestOrigin(req) {
  const origin = req.headers.origin
  if (!origin) return true

  const protocol = req.protocol || req.headers['x-forwarded-proto'] || (req.socket?.encrypted ? 'https' : 'http')
  const expectedOrigin = `${protocol}://${req.headers['x-forwarded-host'] || req.headers.host}`
  if (normalizedOrigin(origin) === normalizedOrigin(expectedOrigin)) return true

  const allowedOrigins = (process.env.FRONTEND_ORIGIN || '')
    .split(',')
    .map((value) => normalizedOrigin(value.trim()))
    .filter(Boolean)
  return allowedOrigins.includes(normalizedOrigin(origin))
}
