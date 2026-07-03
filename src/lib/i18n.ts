export const locales = ['en', 'fr'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

const localizablePagePaths = new Set(['/members', '/galery', '/necrology', '/login', '/signup', '/sign-in', '/sign-up'])

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

    if (locale === 'en' && localizablePagePaths.has(unprefixedPathname)) {
      return `${unprefixedPathname}${suffix}`
    }

    return `${pathname}${suffix}`
  }

  if (locale === 'fr' && localizablePagePaths.has(pathname)) {
    return `/fr${pathname}${suffix}`
  }

  return `${pathname}${suffix}`
}

export const getAlternateLocaleHref = (pathname: string | null | undefined) => {
  const locale = getLocaleFromPathname(pathname)
  const alternateLocale: Locale = locale === 'fr' ? 'en' : 'fr'

  return getLocalizedHref(pathname || getLocaleHomeHref(locale), alternateLocale)
}
