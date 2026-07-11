'use client'

import { useEffect } from 'react'

import { usePathname } from 'next/navigation'

import {
  getLocaleFromPathnameOrPreference,
  getLocalePreferenceCookie,
  getLocalePreferenceFromCookieHeader,
  getLocalePreferenceFromPathname
} from '@/lib/i18n'

const LanguageDocumentSync = () => {
  const pathname = usePathname()

  useEffect(() => {
    const pathLocalePreference = getLocalePreferenceFromPathname(pathname)
    const savedLocalePreference = getLocalePreferenceFromCookieHeader(document.cookie)
    const locale = getLocaleFromPathnameOrPreference(pathname, savedLocalePreference)

    document.documentElement.lang = locale

    if (pathLocalePreference) {
      document.cookie = getLocalePreferenceCookie(pathLocalePreference)
    }
  }, [pathname])

  return null
}

export default LanguageDocumentSync
