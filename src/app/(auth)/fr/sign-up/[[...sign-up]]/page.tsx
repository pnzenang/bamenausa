import type { Metadata } from 'next'

import LocalizedSignUpPage from '@/components/auth/sign-up-page'

export const metadata: Metadata = {
  title: 'Inscription',
  alternates: {
    canonical: '/fr/sign-up',
    languages: {
      'en-US': '/sign-up',
      'fr-FR': '/fr/sign-up'
    }
  }
}

const FrenchSignUpPage = () => {
  return <LocalizedSignUpPage locale='fr' />
}

export default FrenchSignUpPage
