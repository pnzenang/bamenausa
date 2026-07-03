import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

import { signInPath } from './lib/auth'

const isProtectedRoute = createRouteMatcher(['/profile(.*)', '/account(.*)', '/members/full(.*)', '/backend(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect({
      unauthenticatedUrl: new URL(signInPath, req.url).toString()
    })
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/__clerk/(.*)'
  ]
}
