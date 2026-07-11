import type { Metadata } from 'next'

import MeetingsPage from '@/components/pages/meetings-page'

import { publicPageContent } from '@/assets/data/public-pages'

const content = publicPageContent.fr.meetings

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
  alternates: {
    canonical: '/fr/meetings',
    languages: {
      'en-US': '/meetings',
      'fr-FR': '/fr/meetings'
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

const FrenchMeetingsPage = () => {
  return <MeetingsPage locale='fr' />
}

export default FrenchMeetingsPage
