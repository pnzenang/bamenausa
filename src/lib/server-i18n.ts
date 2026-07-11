import { cookies } from 'next/headers'

import { defaultLocale, getLocalePreferenceFromCookieValue, localePreferenceCookieName } from '@/lib/i18n'

export const getRequestLocalePreference = async () => {
  const cookieStore = await cookies()

  return getLocalePreferenceFromCookieValue(cookieStore.get(localePreferenceCookieName)?.value) ?? defaultLocale
}
