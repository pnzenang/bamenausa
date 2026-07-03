import type { Metadata } from 'next'

import PublicMembersPage from '@/components/pages/public-members-page'

import { publicPageContent } from '@/assets/data/public-pages'

const content = publicPageContent.en.members

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
  alternates: {
    canonical: '/members',
    languages: {
      'en-US': '/members',
      'fr-FR': '/fr/members'
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

const MembersPage = () => {
  return <PublicMembersPage locale='en' />
}

export default MembersPage
