import type { Metadata } from 'next'

import LocalizedSignInPage from '@/components/auth/sign-in-page'

export const metadata: Metadata = {
  title: 'Connexion',
  robots: {
    index: false,
    follow: false
  },
  alternates: {
    canonical: '/fr/sign-in',
    languages: {
      'en-US': '/sign-in',
      'fr-FR': '/fr/sign-in'
    }
  }
}

const FrenchSignInPage = () => {
  return <LocalizedSignInPage locale='fr' />
}

export default FrenchSignInPage
