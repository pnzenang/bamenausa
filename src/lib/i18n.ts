export const locales = ['en', 'fr'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const getLocaleFromPathname = (pathname: string | null | undefined): Locale => {
  const firstSegment = pathname?.split('/').filter(Boolean)[0]

  return firstSegment === 'fr' ? 'fr' : defaultLocale
}

export const getLocaleHomeHref = (locale: Locale) => {
  return locale === 'fr' ? '/fr' : '/'
}

export const getAlternateLocaleHref = (locale: Locale) => {
  return locale === 'fr' ? '/' : '/fr'
}
