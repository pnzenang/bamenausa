import type { Metadata } from 'next'

import LocalizedSignInPage from '@/components/auth/sign-in-page'

export const metadata: Metadata = {
  title: 'Sign In',
  robots: {
    index: false,
    follow: false
  },
  alternates: {
    canonical: '/sign-in',
    languages: {
      'en-US': '/sign-in',
      'fr-FR': '/fr/sign-in'
    }
  }
}

const SignInPage = () => {
  return <LocalizedSignInPage locale='en' />
}

export default SignInPage
