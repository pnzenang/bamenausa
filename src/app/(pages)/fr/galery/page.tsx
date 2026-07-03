import type { Metadata } from 'next'

import GaleryPage from '@/components/pages/galery-page'

import { publicPageContent } from '@/assets/data/public-pages'

const content = publicPageContent.fr.galery

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
  alternates: {
    canonical: '/fr/galery',
    languages: {
      'en-US': '/galery',
      'fr-FR': '/fr/galery'
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

const FrenchGaleryPage = () => {
  return <GaleryPage locale='fr' />
}

export default FrenchGaleryPage
