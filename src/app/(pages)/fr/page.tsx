import type { Metadata } from 'next'

import { getSiteContent } from '@/assets/data/site-content'

import HomePage from '../home-page'

const content = getSiteContent('fr')

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
  alternates: {
    canonical: '/fr',
    languages: {
      'en-US': '/',
      'fr-FR': '/fr'
    }
  },
  openGraph: {
    description: content.metadata.openGraphDescription,
    locale: 'fr_FR',
    images: [
      {
        url: '/images/culture/gala-2026/bamena-gala-home.jpg',
        type: 'image/jpeg',
        width: 1200,
        height: 1600,
        alt: content.metadata.imageAlt
      }
    ]
  },
  twitter: {
    description: content.metadata.twitterDescription
  }
}

const FrenchHome = () => {
  return <HomePage locale='fr' />
}

export default FrenchHome
