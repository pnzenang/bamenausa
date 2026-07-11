import Link from 'next/link'

import { ArrowLeftIcon, CalendarDaysIcon, ClockIcon, ExternalLinkIcon, MapPinIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import type { Locale } from '@/lib/i18n'
import { marylandMeetingAddress, marylandMeetingAddressLines } from '@/lib/maryland-meetings'

type MarylandMeetingAddressPageProps = {
  locale: Locale
  meetingDate: Date
}

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(marylandMeetingAddress)}`

const marylandMeetingAddressContent = {
  en: {
    backHref: '/meetings/maryland#schedule',
    backLabel: 'Back to Maryland meetings',
    badge: 'Maryland',
    title: 'Maryland Meeting Address',
    descriptionPrefix: 'Meeting address for',
    detailsTitle: 'Meeting information',
    addressTitle: 'Address',
    dateLabel: 'Date',
    timeLabel: 'Time',
    time: '7:00 PM - 9:00 PM',
    mapsLabel: 'Open in Maps'
  },
  fr: {
    backHref: '/fr/meetings/maryland#schedule',
    backLabel: 'Retour aux réunions du Maryland',
    badge: 'Maryland',
    title: 'Adresse de la réunion du Maryland',
    descriptionPrefix: 'Adresse de la réunion du',
    detailsTitle: 'Informations de la réunion',
    addressTitle: 'Adresse',
    dateLabel: 'Date',
    timeLabel: 'Heure',
    time: '19 h - 21 h',
    mapsLabel: 'Ouvrir dans Maps'
  }
} as const

const MarylandMeetingAddressPage = ({ locale, meetingDate }: MarylandMeetingAddressPageProps) => {
  const content = marylandMeetingAddressContent[locale]

  const dateFormatter = new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
    year: 'numeric'
  })

  const formattedDate = dateFormatter.format(meetingDate)

  return (
    <section className='bg-muted/30 min-h-screen px-4 pb-16 pt-32 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-4xl space-y-8'>
        <div className='space-y-5'>
          <Button variant='outline' className='rounded-full' asChild>
            <Link href={content.backHref}>
              <ArrowLeftIcon />
              {content.backLabel}
            </Link>
          </Button>

          <div className='space-y-4'>
            <Badge variant='outline'>{content.badge}</Badge>
            <h1 className='text-4xl leading-tight font-bold text-balance sm:text-5xl'>{content.title}</h1>
            <p className='text-muted-foreground max-w-3xl text-lg leading-8 text-balance'>
              {content.descriptionPrefix} {formattedDate}.
            </p>
          </div>
        </div>

        <div className='grid gap-4 md:grid-cols-[0.85fr_1.15fr]'>
          <Card className='rounded-md'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <CalendarDaysIcon className='text-primary size-5' />
                {content.detailsTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4 text-sm'>
              <p className='flex items-start gap-2'>
                <CalendarDaysIcon className='text-muted-foreground mt-0.5 size-4' />
                <span>
                  <span className='font-medium'>{content.dateLabel}:</span> {formattedDate}
                </span>
              </p>
              <p className='flex items-start gap-2'>
                <ClockIcon className='text-muted-foreground mt-0.5 size-4' />
                <span>
                  <span className='font-medium'>{content.timeLabel}:</span> {content.time}
                </span>
              </p>
            </CardContent>
          </Card>

          <Card className='rounded-md'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <MapPinIcon className='text-primary size-5' />
                {content.addressTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <address className='text-foreground not-italic leading-7 font-medium'>
                {marylandMeetingAddressLines.map(line => (
                  <span key={line} className='block'>
                    {line}
                  </span>
                ))}
              </address>
              <Button variant='outline' asChild>
                <a href={mapsHref} target='_blank' rel='noreferrer'>
                  <ExternalLinkIcon />
                  {content.mapsLabel}
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default MarylandMeetingAddressPage
