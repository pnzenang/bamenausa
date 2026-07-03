import type { Metadata } from 'next'

import NecrologyPage from '@/components/pages/necrology-page'

import { publicPageContent } from '@/assets/data/public-pages'

const content = publicPageContent.en.necrology

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
  alternates: {
    canonical: '/necrology',
    languages: {
      'en-US': '/necrology',
      'fr-FR': '/fr/necrology'
    }
  },
  openGraph: {
    title: content.metadata.title,
    description: content.metadata.description,
    locale: 'en_US'
  },
  twitter: {
    title: content.metadata.title,
    description: content.metadata.description
  }
}

const NecrologyRoutePage = () => {
  return <NecrologyPage locale='en' />
}

export default NecrologyRoutePage
