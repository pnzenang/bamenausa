import Link from 'next/link'

import { ArrowLeftIcon, CalendarDaysIcon, ClockIcon, FileTextIcon, MapPinIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import MarylandMeetingMinutesViewer from '@/components/pages/maryland-meeting-minutes-viewer'

import type { Locale } from '@/lib/i18n'
import { getMarylandMeetingAgendaItemsWithAutomaticTranslations } from '@/lib/maryland-meeting-minutes'
import { marylandMeetingAddress } from '@/lib/maryland-meetings'

type MarylandMeetingMinutesPageProps = {
  locale: Locale
  meetingDate: Date
  publishedAgendaTitles?: string[]
  publishedAgendaDetails?: string[]
  translatedAgendaTitles?: string[]
  translatedAgendaDetails?: string[]
  publishedAt?: Date
}

const marylandMeetingMinutesContent = {
  en: {
    backHref: '/meetings/maryland#schedule',
    backLabel: 'Back to Maryland meetings',
    badge: 'DC/MD/VA',
    title: 'Maryland Meeting',
    descriptionPrefix: 'Meeting for',
    detailsTitle: 'Meeting information',
    minutesTitle: '',
    dateLabel: 'Date',
    timeLabel: 'Time',
    time: '7:00 PM - 9:00 PM',
    agendaLabel: 'Agenda',
    agendaDetailsLabel: '',
    publishedLabel: 'Published',
    addressLabel: 'Address',
    emptyAgendaLabel: 'No agenda points have been published yet.',
    emptyMinutesLabel: 'Nothing has been published yet.',
    viewModeLabel: 'View mode',
    onePageViewLabel: 'One page',
    accordionViewLabel: 'Accordion',
    printPdfLabel: 'Print PDF',
    printPdfAriaLabel: 'Print or save these meeting minutes as a PDF'
  },
  fr: {
    backHref: '/fr/meetings/maryland#schedule',
    backLabel: 'Retour aux réunions du Maryland',
    badge: 'DC/MD/VA',
    title: 'Réunion du Maryland',
    descriptionPrefix: 'Réunion du',
    detailsTitle: 'Informations de la réunion',
    minutesTitle: '',
    dateLabel: 'Date',
    timeLabel: 'Heure',
    time: '19 h - 21 h',
    agendaLabel: 'Ordre du jour',
    agendaDetailsLabel: '',
    publishedLabel: 'Publié',
    addressLabel: 'Adresse',
    emptyAgendaLabel: "Aucun point d'ordre du jour n'a encore été publié.",
    emptyMinutesLabel: "Rien n'a encore été publié.",
    viewModeLabel: 'Affichage',
    onePageViewLabel: 'Une page',
    accordionViewLabel: 'Accordéon',
    printPdfLabel: 'Imprimer en PDF',
    printPdfAriaLabel: 'Imprimer ou enregistrer ce compte rendu en PDF'
  }
} as const

const MarylandMeetingMinutesPage = async ({
  locale,
  meetingDate,
  publishedAgendaTitles,
  publishedAgendaDetails,
  translatedAgendaTitles,
  translatedAgendaDetails,
  publishedAt
}: MarylandMeetingMinutesPageProps) => {
  const content = marylandMeetingMinutesContent[locale]

  const agendaItems = await getMarylandMeetingAgendaItemsWithAutomaticTranslations(
    locale,
    publishedAgendaTitles,
    publishedAgendaDetails,
    translatedAgendaTitles,
    translatedAgendaDetails
  )

  const dateFormatter = new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
    year: 'numeric'
  })

  const formattedDate = dateFormatter.format(meetingDate)

  return (
    <section className='print-page bg-muted/30 min-h-screen px-4 pb-16 pt-32 sm:px-6 lg:px-8'>
      <div className='print-document mx-auto max-w-6xl space-y-8'>
        <div className='space-y-5'>
          <Button variant='outline' className='print-hide rounded-full' asChild>
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

        <div className='print-meeting-grid grid gap-4 md:grid-cols-[0.85fr_1.15fr]'>
          <Card className='print-card rounded-md'>
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
              <p className='flex items-start gap-2'>
                <MapPinIcon className='text-muted-foreground mt-0.5 size-4' />
                <span>
                  <span className='font-medium'>{content.addressLabel}:</span> {marylandMeetingAddress}
                </span>
              </p>
              <p className='flex items-start gap-2'>
                <FileTextIcon className='text-muted-foreground mt-0.5 size-4' />
                <span>
                  <span className='font-medium'>{content.agendaLabel}:</span>
                  <span className='mt-1 block space-y-1'>
                    {agendaItems.length > 0 ? (
                      agendaItems.map((item, index) => (
                        <span key={`${item.title}-${index}`} className='block'>
                          {item.title}
                        </span>
                      ))
                    ) : (
                      <span className='text-muted-foreground block'>
                        {content.emptyAgendaLabel}
                      </span>
                    )}
                  </span>
                </span>
              </p>
            </CardContent>
          </Card>

          <MarylandMeetingMinutesViewer
            agendaItems={agendaItems}
            agendaDetailsLabel={content.agendaDetailsLabel}
            accordionViewLabel={content.accordionViewLabel}
            emptyMinutesLabel={content.emptyMinutesLabel}
            isPublished={Boolean(publishedAt)}
            minutesTitle={content.minutesTitle}
            onePageViewLabel={content.onePageViewLabel}
            printPdfAriaLabel={content.printPdfAriaLabel}
            printPdfLabel={content.printPdfLabel}
            publishedLabel={content.publishedLabel}
            viewModeLabel={content.viewModeLabel}
          />
        </div>
      </div>
    </section>
  )
}

export default MarylandMeetingMinutesPage
