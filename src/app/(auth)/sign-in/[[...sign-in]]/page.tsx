import type { Metadata } from 'next'
import { SignIn } from '@clerk/nextjs'

import { bamenaLogoUrl, profilePath, signInPath, signUpPath } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Sign In'
}

const SignInPage = () => {
  return (
    <section className='bg-muted/30 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
      <SignIn
        routing='path'
        path={signInPath}
        signUpUrl={signUpPath}
        forceRedirectUrl={profilePath}
        fallbackRedirectUrl={profilePath}
        appearance={{
          options: {
            logoImageUrl: bamenaLogoUrl,
            logoLinkUrl: '/',
            logoPlacement: 'inside'
          },
          elements: {
            rootBox: 'w-full max-w-md',
            cardBox: 'w-full rounded-md shadow-sm',
            card: 'rounded-md border border-border shadow-none',
            logoBox: 'mb-4 flex justify-center',
            logoImage: 'h-20 w-auto object-contain'
          }
        }}
      />
    </section>
  )
}

export default SignInPage
