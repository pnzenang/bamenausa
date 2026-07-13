import type { Metadata } from 'next'

import LocalizedSignUpPage from '@/components/auth/sign-up-page'

export const metadata: Metadata = {
  title: 'Sign Up',
  robots: {
    index: false,
    follow: false
  },
  alternates: {
    canonical: '/sign-up',
    languages: {
      'en-US': '/sign-up',
      'fr-FR': '/fr/sign-up'
    }
  }
}

const SignUpPage = () => {
  return <LocalizedSignUpPage locale='en' />
}

export default SignUpPage
