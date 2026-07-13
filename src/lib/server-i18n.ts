import { cookies, headers } from 'next/headers'

import { defaultLocale, getLocalePreferenceFromCookieValue, isLocale, localePreferenceCookieName } from '@/lib/i18n'

export const getRequestLocalePreference = async () => {
  const headerStore = await headers()
  const requestLocale = headerStore.get('x-bamena-locale')

  if (isLocale(requestLocale)) return requestLocale

  const cookieStore = await cookies()

  return getLocalePreferenceFromCookieValue(cookieStore.get(localePreferenceCookieName)?.value) ?? defaultLocale
}
