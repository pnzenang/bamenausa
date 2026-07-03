import type { Metadata } from 'next'

import PublicMembersPage from '@/components/pages/public-members-page'

import { publicPageContent } from '@/assets/data/public-pages'

const content = publicPageContent.fr.members

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
  alternates: {
    canonical: '/fr/members',
    languages: {
      'en-US': '/members',
      'fr-FR': '/fr/members'
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

const FrenchMembersPage = () => {
  return <PublicMembersPage locale='fr' />
}

export default FrenchMembersPage
