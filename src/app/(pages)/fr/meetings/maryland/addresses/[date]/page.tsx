import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import MarylandMeetingAddressPage from '@/components/pages/maryland-meeting-address-page'

import {
  getMarylandMeetingDateBySlug,
  getMarylandMeetingDateSlug,
  marylandMeetingAddress,
  marylandMeetingDates
} from '@/lib/maryland-meetings'

type FrenchMarylandMeetingAddressPageProps = {
  params: Promise<{
    date: string
  }>
}

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
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

export const generateMetadata = async ({ params }: FrenchMarylandMeetingAddressPageProps): Promise<Metadata> => {
  const { date } = await params
  const meetingDate = getMarylandMeetingDateBySlug(date)

  if (!meetingDate) {
    return {
      title: 'Adresse de la réunion du Maryland | Bamena-USA'
    }
  }

  const formattedDate = dateFormatter.format(meetingDate)
  const title = `Adresse de la réunion du Maryland - ${formattedDate} | Bamena-USA`
  const description = `Adresse de la réunion Bamena-USA du Maryland du ${formattedDate} : ${marylandMeetingAddress}.`

  return {
    title,
    description,
    alternates: {
      canonical: `/fr/meetings/maryland/addresses/${date}`,
      languages: {
        'en-US': `/meetings/maryland/addresses/${date}`,
        'fr-FR': `/fr/meetings/maryland/addresses/${date}`
      }
    },
    openGraph: {
      title,
      description,
      locale: 'fr_FR'
    },
    twitter: {
      title,
      description
    }
  }
}

const FrenchMarylandMeetingAddressPage = async ({ params }: FrenchMarylandMeetingAddressPageProps) => {
  const { date } = await params
  const meetingDate = getMarylandMeetingDateBySlug(date)

  if (!meetingDate) {
    notFound()
  }

  return <MarylandMeetingAddressPage locale='fr' meetingDate={meetingDate} />
}

export default FrenchMarylandMeetingAddressPage
