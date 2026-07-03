import type { Metadata } from 'next'

import { getSiteContent } from '@/assets/data/site-content'

import HomePage from './home-page'

const content = getSiteContent('en')

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'fr-FR': '/fr'
    }
  },
  openGraph: {
    description: content.metadata.openGraphDescription,
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

const Home = () => {
  return <HomePage locale='en' />
}

export default Home
