const normalizeSiteUrl = (url: string) => url.replace(/\/$/, '')

const getVercelUrl = () => {
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL

  if (!vercelUrl) return null

  return vercelUrl.startsWith('http') ? vercelUrl : `https://${vercelUrl}`
}

export const getSiteUrl = () => {
  return normalizeSiteUrl(process.env.NEXT_PUBLIC_APP_URL ?? getVercelUrl() ?? 'http://localhost:3000')
}

export const getAbsoluteUrl = (path = '/') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  return `${getSiteUrl()}${normalizedPath}`
}
