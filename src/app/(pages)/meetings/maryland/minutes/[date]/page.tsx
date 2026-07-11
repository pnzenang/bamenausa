import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import MarylandMeetingMinutesPage from '@/components/pages/maryland-meeting-minutes-page'

import {
  getMarylandMeetingDateBySlug,
  getMarylandMeetingDateSlug,
  marylandMeetingDates
} from '@/lib/maryland-meetings'
import { getMarylandMeetingMinutes } from '@/lib/maryland-meeting-minutes'

type MarylandMeetingMinutesRoutePageProps = {
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
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

export const generateStaticParams = () => {
  return marylandMeetingDates.map(date => ({
    date: getMarylandMeetingDateSlug(date)
  }))
}

export const generateMetadata = async ({ params }: MarylandMeetingMinutesRoutePageProps): Promise<Metadata> => {
  const { date } = await params
  const meetingDate = getMarylandMeetingDateBySlug(date)

  if (!meetingDate) {
    return {
      title: 'Maryland Meeting | Bamena-USA'
    }
  }

  const formattedDate = dateFormatter.format(meetingDate)
  const title = `Maryland Meeting - ${formattedDate} | Bamena-USA`
  const description = `Bamena-USA Maryland meeting on ${formattedDate}.`

  return {
    title,
    description,
    alternates: {
      canonical: `/meetings/maryland/minutes/${date}`,
      languages: {
        'en-US': `/meetings/maryland/minutes/${date}`,
        'fr-FR': `/fr/meetings/maryland/minutes/${date}`
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

const MarylandMeetingMinutesRoutePage = async ({ params }: MarylandMeetingMinutesRoutePageProps) => {
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
      locale='en'
      meetingDate={meetingDate}
      publishedAgendaTitles={publishedMinutes?.agendaTitles}
      publishedAgendaDetails={publishedMinutes?.agendaDetails}
      translatedAgendaTitles={publishedMinutes?.translatedAgendaTitles}
      translatedAgendaDetails={publishedMinutes?.translatedAgendaDetails}
      publishedAt={publishedMinutes?.updatedAt}
    />
  )
}

export default MarylandMeetingMinutesRoutePage
