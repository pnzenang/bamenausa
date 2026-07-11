import type { Metadata } from 'next'

import MarylandMeetingsPage from '@/components/pages/maryland-meetings-page'

export const metadata: Metadata = {
  title: 'Maryland Meetings | Bamena-USA',
  description: 'Schedule and address links for Bamena-USA Maryland meetings.',
  alternates: {
    canonical: '/meetings/maryland',
    languages: {
      'en-US': '/meetings/maryland',
      'fr-FR': '/fr/meetings/maryland'
    }
  },
  openGraph: {
    title: 'Maryland Meetings | Bamena-USA',
    description: 'Schedule and address links for Bamena-USA Maryland meetings.',
    locale: 'en_US'
  },
  twitter: {
    title: 'Maryland Meetings | Bamena-USA',
    description: 'Schedule and address links for Bamena-USA Maryland meetings.'
  }
}

const MarylandMeetingsRoutePage = () => {
  return <MarylandMeetingsPage locale='en' />
}

export default MarylandMeetingsRoutePage
