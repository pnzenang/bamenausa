export const locales = ['en', 'fr'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'
export const localePreferenceCookieName = 'bamena-locale'
export const localePreferenceCookieMaxAge = 60 * 60 * 24 * 365

const localizablePagePaths = new Set([
  '/',
  '/members',
  '/galery',
  '/necrology',
  '/meetings',
  '/meetings/maryland',
  '/donate',
  '/donate/thank-you',
  '/login',
  '/signup',
  '/sign-in',
  '/sign-up'
])

const localizablePagePathPrefixes = ['/meetings/maryland/minutes/', '/meetings/maryland/addresses/']

const isLocalizablePagePath = (pathname: string) => {
  return localizablePagePaths.has(pathname) || localizablePagePathPrefixes.some(prefix => pathname.startsWith(prefix))
}

const splitHref = (href: string) => {
  const match = href.match(/^([^?#]*)(.*)$/)

  return {
    pathname: match?.[1] || '/',
    suffix: match?.[2] || ''
  }
}

export const getLocaleFromPathname = (pathname: string | null | undefined): Locale => {
  const firstSegment = pathname?.split('/').filter(Boolean)[0]

  return firstSegment === 'fr' ? 'fr' : defaultLocale
}

export const isLocale = (value: string | null | undefined): value is Locale => {
  return locales.includes(value as Locale)
}

export const getLocalePreferenceFromCookieValue = (value: string | null | undefined) => {
  return isLocale(value) ? value : null
}

export const getLocalePreferenceFromCookieHeader = (cookieHeader: string | null | undefined) => {
  const cookieValue = cookieHeader
    ?.split(';')
    .map(cookie => cookie.trim())
    .find(cookie => cookie.startsWith(`${localePreferenceCookieName}=`))
    ?.split('=')
    .slice(1)
    .join('=')

  if (!cookieValue) return null

  return getLocalePreferenceFromCookieValue(decodeURIComponent(cookieValue))
}

export const getLocalePreferenceFromPathname = (pathname: string | null | undefined) => {
  const normalizedPathname = pathname || '/'

  if (normalizedPathname === '/fr') return 'fr'

  if (normalizedPathname.startsWith('/fr/')) {
    const unprefixedPathname = normalizedPathname.replace(/^\/fr/, '') || '/'

    return isLocalizablePagePath(unprefixedPathname) ? 'fr' : null
  }

  return isLocalizablePagePath(normalizedPathname) ? 'en' : null
}

export const getLocaleFromPathnameOrPreference = (
  pathname: string | null | undefined,
  preferredLocale: Locale | null | undefined
) => {
  return getLocalePreferenceFromPathname(pathname) ?? preferredLocale ?? defaultLocale
}

export const getLocalePreferenceCookie = (locale: Locale) => {
  return `${localePreferenceCookieName}=${locale}; path=/; max-age=${localePreferenceCookieMaxAge}; SameSite=Lax`
}

export const getLocaleHomeHref = (locale: Locale) => {
  return locale === 'fr' ? '/fr' : '/'
}

export const getLocalizedHref = (href: string, locale: Locale) => {
  if (href.startsWith('#')) return href

  const { pathname, suffix } = splitHref(href)

  if (pathname === '/' || pathname === '/fr') {
    return `${getLocaleHomeHref(locale)}${suffix}`
  }

  if (pathname.startsWith('/fr/')) {
    const unprefixedPathname = pathname.replace(/^\/fr/, '')

    if (locale === 'en' && isLocalizablePagePath(unprefixedPathname)) {
      return `${unprefixedPathname}${suffix}`
    }

    return `${pathname}${suffix}`
  }

  if (locale === 'fr' && isLocalizablePagePath(pathname)) {
    return `/fr${pathname}${suffix}`
  }

  return `${pathname}${suffix}`
}

export const getAlternateLocaleHref = (pathname: string | null | undefined) => {
  const locale = getLocaleFromPathname(pathname)
  const alternateLocale: Locale = locale === 'fr' ? 'en' : 'fr'

  return getLocalizedHref(pathname || getLocaleHomeHref(locale), alternateLocale)
}
