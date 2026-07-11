import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import MarylandMeetingMinutesPage from '@/components/pages/maryland-meeting-minutes-page'

import {
  getMarylandMeetingDateBySlug,
  getMarylandMeetingDateSlug,
  marylandMeetingDates
} from '@/lib/maryland-meetings'
import { getMarylandMeetingMinutes } from '@/lib/maryland-meeting-minutes'

type FrenchMarylandMeetingMinutesPageProps = {
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
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

export const generateStaticParams = () => {
  return marylandMeetingDates.map(date => ({
    date: getMarylandMeetingDateSlug(date)
  }))
}

export const generateMetadata = async ({ params }: FrenchMarylandMeetingMinutesPageProps): Promise<Metadata> => {
  const { date } = await params
  const meetingDate = getMarylandMeetingDateBySlug(date)

  if (!meetingDate) {
    return {
      title: 'Réunion du Maryland | Bamena-USA'
    }
  }

  const formattedDate = dateFormatter.format(meetingDate)
  const title = `Réunion du Maryland - ${formattedDate} | Bamena-USA`
  const description = `Réunion Bamena-USA du Maryland du ${formattedDate}.`

  return {
    title,
    description,
    alternates: {
      canonical: `/fr/meetings/maryland/minutes/${date}`,
      languages: {
        'en-US': `/meetings/maryland/minutes/${date}`,
        'fr-FR': `/fr/meetings/maryland/minutes/${date}`
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

const FrenchMarylandMeetingMinutesPage = async ({ params }: FrenchMarylandMeetingMinutesPageProps) => {
  const { date } = await params
  const meetingDate = getMarylandMeetingDateBySlug(date)

  if (!meetingDate) {
    notFound()
  }

  let publishedMinutes: Awaited<ReturnType<typeof getMarylandMeetingMinutes>> = null

  try {
    publishedMinutes = await getMarylandMeetingMinutes(date)
  } catch {
    publishedMinutes = null
  }

  return (
    <MarylandMeetingMinutesPage
      locale='fr'
      meetingDate={meetingDate}
      publishedAgendaTitles={publishedMinutes?.agendaTitles}
      publishedAgendaDetails={publishedMinutes?.agendaDetails}
      publishedAt={publishedMinutes?.updatedAt}
    />
  )
}

export default FrenchMarylandMeetingMinutesPage
