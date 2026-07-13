import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

import { signInPath } from './lib/auth'
import {
  getLocaleFromPathnameOrPreference,
  getLocalePreferenceFromCookieHeader,
  getLocalePreferenceFromPathname,
  localePreferenceCookieMaxAge,
  localePreferenceCookieName
} from './lib/i18n'

const isProtectedRoute = createRouteMatcher(['/profile(.*)', '/account(.*)', '/members/full(.*)', '/backend(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect({
      unauthenticatedUrl: new URL(signInPath, req.url).toString()
    })
  }

  const pathname = req.nextUrl.pathname
  const cookieLocalePreference = getLocalePreferenceFromCookieHeader(req.headers.get('cookie'))
  const locale = getLocaleFromPathnameOrPreference(pathname, cookieLocalePreference)
  const requestHeaders = new Headers(req.headers)

  requestHeaders.set('x-bamena-locale', locale)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })

  const pathLocalePreference = getLocalePreferenceFromPathname(pathname)

  if (pathLocalePreference) {
    response.cookies.set(localePreferenceCookieName, pathLocalePreference, {
      maxAge: localePreferenceCookieMaxAge,
      path: '/',
      sameSite: 'lax'
    })
  }

  return response
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/__clerk/(.*)'
  ]
}
