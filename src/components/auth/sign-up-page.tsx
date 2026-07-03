import { SignUp } from '@clerk/nextjs'

import { bamenaLogoUrl, profilePath, signInPath, signUpPath } from '@/lib/auth'
import { getLocaleHomeHref, getLocalizedHref, type Locale } from '@/lib/i18n'

type LocalizedSignUpPageProps = {
  locale: Locale
}

const LocalizedSignUpPage = ({ locale }: LocalizedSignUpPageProps) => {
  const localizedSignInPath = getLocalizedHref(signInPath, locale)
  const localizedSignUpPath = getLocalizedHref(signUpPath, locale)

  return (
    <section className='bg-muted/30 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
      <SignUp
        routing='path'
        path={localizedSignUpPath}
        signInUrl={localizedSignInPath}
        forceRedirectUrl={profilePath}
        fallbackRedirectUrl={profilePath}
        appearance={{
          options: {
            logoImageUrl: bamenaLogoUrl,
            logoLinkUrl: getLocaleHomeHref(locale),
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

export default LocalizedSignUpPage
