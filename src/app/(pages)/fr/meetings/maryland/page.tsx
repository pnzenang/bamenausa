import type { Metadata } from 'next'

import MarylandMeetingsPage from '@/components/pages/maryland-meetings-page'

export const metadata: Metadata = {
  title: 'Réunions du Maryland | Bamena-USA',
  description: 'Liens vers l’horaire et les adresses des réunions Bamena-USA du Maryland.',
  alternates: {
    canonical: '/fr/meetings/maryland',
    languages: {
      'en-US': '/meetings/maryland',
      'fr-FR': '/fr/meetings/maryland'
    }
  },
  openGraph: {
    title: 'Réunions du Maryland | Bamena-USA',
    description: 'Liens vers l’horaire et les adresses des réunions Bamena-USA du Maryland.',
    locale: 'fr_FR'
  },
  twitter: {
    title: 'Réunions du Maryland | Bamena-USA',
    description: 'Liens vers l’horaire et les adresses des réunions Bamena-USA du Maryland.'
  }
}

const FrenchMarylandMeetingsPage = () => {
  return <MarylandMeetingsPage locale='fr' />
}

export default FrenchMarylandMeetingsPage
