import Link from 'next/link'

import { ArrowLeftIcon, CalendarDaysIcon, FileTextIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import type { Locale } from '@/lib/i18n'
import {
  getMarylandMeetingDateSlug,
  marylandMeetingAddress,
  marylandMeetingDates,
  marylandMeetingStartYear
} from '@/lib/maryland-meetings'

type MarylandMeetingsPageProps = {
  locale: Locale
}

const marylandMeetingsContent = {
  en: {
    backHref: '/meetings',
    backLabel: 'Back to meetings',
    badge: 'Maryland',
    title: 'Maryland Meetings',
    description: 'Meeting information for the Maryland Bamena-USA community.',
    scheduleTitle: 'Schedule',
    scheduleRule:
      'The Maryland meeting year goes from October to September of the subsequent year, with meetings scheduled for the third Saturday of every month.',
    scheduleYearLabel: 'Meeting year',
    meetingTimeLabel: 'Time',
    meetingTime: '7:00 PM - 9:00 PM',
    scheduleNote: 'All Maryland meetings are held at 5020 Sunnyside Ave, Beltsville, MD 20705.',
    scheduleClickNote: "Click any meeting line to open that day's page.",
    minutesHrefBase: '/meetings/maryland/minutes',
    minutesLinkLabel: 'Open'
  },
  fr: {
    backHref: '/fr/meetings',
    backLabel: 'Retour aux réunions',
    badge: 'Maryland',
    title: 'Réunions du Maryland',
    description: 'Informations de réunion pour la communauté Bamena-USA du Maryland.',
    scheduleTitle: 'Horaire',
    scheduleRule:
      'L’année de réunion du Maryland va d’octobre à septembre de l’année suivante, avec des réunions prévues le troisième samedi de chaque mois.',
    scheduleYearLabel: 'Année de réunion',
    meetingTimeLabel: 'Heure',
    meetingTime: '19 h - 21 h',
    scheduleNote: 'Toutes les réunions du Maryland ont lieu au 5020 Sunnyside Ave, Beltsville, MD 20705.',
    scheduleClickNote: 'Cliquez sur une ligne de réunion pour ouvrir la page correspondante.',
    minutesHrefBase: '/fr/meetings/maryland/minutes',
    minutesLinkLabel: 'Ouvrir'
  }
} as const

const MarylandMeetingsPage = ({ locale }: MarylandMeetingsPageProps) => {
  const content = marylandMeetingsContent[locale]
  const scheduleStartYear = marylandMeetingStartYear
  const scheduleEndYear = scheduleStartYear + 1
  const scheduleDates = marylandMeetingDates

  const scheduleDateFormatter = new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
    weekday: 'long',
    year: 'numeric'
  })

  return (
    <section className='bg-muted/30 min-h-screen px-4 pb-16 pt-32 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-6xl space-y-10'>
        <div className='space-y-5'>
          <Button variant='outline' className='rounded-full' asChild>
            <Link href={content.backHref}>
              <ArrowLeftIcon />
              {content.backLabel}
            </Link>
          </Button>

          <div className='space-y-4'>
            <Badge variant='outline'>{content.badge}</Badge>
            <h1 className='text-4xl leading-tight font-bold text-balance sm:text-5xl lg:text-6xl'>
              {content.title}
            </h1>
            <p className='text-muted-foreground max-w-3xl text-lg leading-8 text-balance sm:text-xl'>
              {content.description}
            </p>
          </div>
        </div>

        <Card id='schedule' className='rounded-md scroll-mt-32'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <CalendarDaysIcon className='text-primary size-5' />
              {content.scheduleTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <p className='text-muted-foreground leading-7'>{content.scheduleRule}</p>
              <div className='space-y-2'>
                <p className='text-sm font-semibold'>
                  {content.scheduleYearLabel} {scheduleStartYear}-{scheduleEndYear}
                </p>
                <p className='text-muted-foreground text-sm leading-6'>{content.scheduleClickNote}</p>
                <ul className='grid gap-2 text-sm'>
                  {scheduleDates.map(date => {
                    const dateSlug = getMarylandMeetingDateSlug(date)

                    return (
                      <li key={dateSlug}>
                        <Link
                          href={`${content.minutesHrefBase}/${dateSlug}`}
                          className='border-border hover:bg-primary/5 focus-visible:ring-ring flex w-full flex-wrap items-center justify-between gap-3 rounded-md border px-3 py-3 transition-colors focus-visible:ring-[3px] focus-visible:outline-none'
                        >
                          <span className='min-w-0 flex-1 leading-6'>
                            <span className='font-medium'>{scheduleDateFormatter.format(date)}</span>
                            <span className='text-muted-foreground'> - {marylandMeetingAddress}</span>
                          </span>
                          <span className='text-muted-foreground inline-flex items-center gap-1 text-xs font-medium'>
                            <FileTextIcon className='size-4' />
                            {content.minutesLinkLabel}
                          </span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <p className='text-muted-foreground text-sm leading-6'>
                {content.meetingTimeLabel}: {content.meetingTime}. {content.scheduleNote}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default MarylandMeetingsPage
