'use client'

import { useState } from 'react'

import { ChevronDownIcon, FileTextIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import type { MarylandMeetingAgendaDisplayItem } from '@/lib/maryland-meeting-minutes'

type MeetingMinutesViewMode = 'accordion' | 'page'

type MarylandMeetingMinutesViewerProps = {
  agendaItems: MarylandMeetingAgendaDisplayItem[]
  agendaDetailsLabel: string
  accordionViewLabel: string
  emptyMinutesLabel: string
  isPublished: boolean
  minutesTitle: string
  onePageViewLabel: string
  publishedLabel: string
  viewModeLabel: string
}

const MarylandMeetingMinutesViewer = ({
  agendaItems,
  agendaDetailsLabel,
  accordionViewLabel,
  emptyMinutesLabel,
  isPublished,
  minutesTitle,
  onePageViewLabel,
  publishedLabel,
  viewModeLabel
}: MarylandMeetingMinutesViewerProps) => {
  const [viewMode, setViewMode] = useState<MeetingMinutesViewMode>('accordion')
  const hasAgendaDetailsLabel = agendaDetailsLabel.trim().length > 0

  return (
    <Card className='rounded-md'>
      <CardHeader>
        <div className='flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between'>
          <div className='flex flex-wrap items-center gap-2'>
            <CardTitle className='flex items-center gap-2' aria-label={minutesTitle || viewModeLabel}>
              <FileTextIcon className='text-primary size-5' />
              {minutesTitle && <span>{minutesTitle}</span>}
            </CardTitle>
            {isPublished && <Badge variant='outline'>{publishedLabel}</Badge>}
          </div>
          <div className='flex w-full flex-wrap gap-2 sm:w-auto' role='group' aria-label={viewModeLabel}>
            <Button
              type='button'
              size='sm'
              variant={viewMode === 'page' ? 'default' : 'outline'}
              className='rounded-full'
              aria-pressed={viewMode === 'page'}
              onClick={() => setViewMode('page')}
            >
              <FileTextIcon />
              {onePageViewLabel}
            </Button>
            <Button
              type='button'
              size='sm'
              variant={viewMode === 'accordion' ? 'default' : 'outline'}
              className='rounded-full'
              aria-pressed={viewMode === 'accordion'}
              onClick={() => setViewMode('accordion')}
            >
              <ChevronDownIcon />
              {accordionViewLabel}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {agendaItems.length > 0 ? (
          viewMode === 'page' ? (
            <div className='divide-y rounded-md border'>
              {agendaItems.map((item, index) => (
                <section key={`${item.title}-${index}`} className='space-y-2 px-4 py-4'>
                  <h3 className='font-medium leading-7'>{item.title}</h3>
                  <p className='text-muted-foreground text-sm leading-6'>
                    {hasAgendaDetailsLabel && (
                      <>
                        <span className='text-foreground font-medium'>{agendaDetailsLabel}:</span>{' '}
                      </>
                    )}
                    {item.details}
                  </p>
                </section>
              ))}
            </div>
          ) : (
            <div className='space-y-3'>
              {agendaItems.map((item, index) => (
                <details key={`${item.title}-${index}`} className='bg-muted/40 group rounded-md border'>
                  <summary className='flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 focus-visible:ring-[3px] focus-visible:outline-none [&::-webkit-details-marker]:hidden'>
                    <span className='font-medium leading-7'>{item.title}</span>
                    <ChevronDownIcon className='text-muted-foreground size-4 shrink-0 transition-transform group-open:rotate-180' />
                  </summary>
                  <div className='border-t px-4 py-3'>
                    <p className='text-muted-foreground text-sm leading-6'>
                      {hasAgendaDetailsLabel && (
                        <>
                          <span className='text-foreground font-medium'>{agendaDetailsLabel}:</span>{' '}
                        </>
                      )}
                      {item.details}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          )
        ) : (
          <p className='bg-muted/40 rounded-md border border-dashed px-4 py-6 text-sm text-muted-foreground'>
            {emptyMinutesLabel}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export default MarylandMeetingMinutesViewer
