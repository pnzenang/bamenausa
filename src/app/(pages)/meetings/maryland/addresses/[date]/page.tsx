import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import MarylandMeetingAddressPage from '@/components/pages/maryland-meeting-address-page'

import {
  getMarylandMeetingDateBySlug,
  getMarylandMeetingDateSlug,
  marylandMeetingAddress,
  marylandMeetingDates
} from '@/lib/maryland-meetings'

type MarylandMeetingAddressRoutePageProps = {
  params: Promise<{
    date: string
  }>
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  timeZone: 'UTC',
  year: 'numeric'
})

export const dynamicParams = false

export const generateStaticParams = () => {
  return marylandMeetingDates.map(date => ({
    date: getMarylandMeetingDateSlug(date)
  }))
}

export const generateMetadata = async ({ params }: MarylandMeetingAddressRoutePageProps): Promise<Metadata> => {
  const { date } = await params
  const meetingDate = getMarylandMeetingDateBySlug(date)

  if (!meetingDate) {
    return {
      title: 'Maryland Meeting Address | Bamena-USA'
    }
  }

  const formattedDate = dateFormatter.format(meetingDate)
  const title = `Maryland Meeting Address - ${formattedDate} | Bamena-USA`
  const description = `Address for the Bamena-USA Maryland meeting on ${formattedDate}: ${marylandMeetingAddress}.`

  return {
    title,
    description,
    alternates: {
      canonical: `/meetings/maryland/addresses/${date}`,
      languages: {
        'en-US': `/meetings/maryland/addresses/${date}`,
        'fr-FR': `/fr/meetings/maryland/addresses/${date}`
      }
    },
    openGraph: {
      title,
      description,
      locale: 'en_US'
    },
    twitter: {
      title,
      description
    }
  }
}

const MarylandMeetingAddressRoutePage = async ({ params }: MarylandMeetingAddressRoutePageProps) => {
  const { date } = await params
  const meetingDate = getMarylandMeetingDateBySlug(date)

  if (!meetingDate) {
    notFound()
  }

  return <MarylandMeetingAddressPage locale='en' meetingDate={meetingDate} />
}

export default MarylandMeetingAddressRoutePage
