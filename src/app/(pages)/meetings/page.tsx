import type { Metadata } from 'next'

import MeetingsPage from '@/components/pages/meetings-page'

import { publicPageContent } from '@/assets/data/public-pages'

const content = publicPageContent.en.meetings

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
  alternates: {
    canonical: '/meetings',
    languages: {
      'en-US': '/meetings',
      'fr-FR': '/fr/meetings'
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

const MeetingsRoutePage = () => {
  return <MeetingsPage locale='en' />
}

export default MeetingsRoutePage
