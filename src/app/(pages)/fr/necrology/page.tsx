import type { Metadata } from 'next'

import NecrologyPage from '@/components/pages/necrology-page'

import { publicPageContent } from '@/assets/data/public-pages'

const content = publicPageContent.fr.necrology

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
  alternates: {
    canonical: '/fr/necrology',
    languages: {
      'en-US': '/necrology',
      'fr-FR': '/fr/necrology'
    }
  },
  openGraph: {
    title: content.metadata.title,
    description: content.metadata.description,
    locale: 'fr_FR'
  },
  twitter: {
    title: content.metadata.title,
    description: content.metadata.description
  }
}

const FrenchNecrologyPage = () => {
  return <NecrologyPage locale='fr' />
}

export default FrenchNecrologyPage
