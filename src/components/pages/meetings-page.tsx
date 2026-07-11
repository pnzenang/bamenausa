import Link from 'next/link'

import { CalendarDaysIcon, MapPinIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { publicPageContent } from '@/assets/data/public-pages'

import type { Locale } from '@/lib/i18n'

type MeetingsPageProps = {
  locale: Locale
}

const MeetingsPage = ({ locale }: MeetingsPageProps) => {
  const content = publicPageContent[locale].meetings

  return (
    <section className='bg-muted/30 min-h-screen px-4 pb-16 pt-32 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl space-y-10'>
        <div className='grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(320px,1fr)] lg:items-end'>
          <div className='space-y-4'>
            <Badge variant='outline'>{content.badge}</Badge>
            <h1 className='text-4xl leading-tight font-bold text-balance sm:text-5xl lg:text-6xl'>
              {content.title}
            </h1>
            <p className='text-muted-foreground max-w-3xl text-lg leading-8 text-balance sm:text-xl'>
              {content.description}
            </p>
          </div>

          <div className='bg-background rounded-md border p-5 shadow-sm'>
            <div className='flex items-start gap-3'>
              <CalendarDaysIcon className='text-primary mt-1 size-5 shrink-0' />
              <div className='space-y-2'>
                <h2 className='text-xl font-semibold'>{content.stateSectionTitle}</h2>
                <p className='text-muted-foreground leading-7'>{content.stateSectionDescription}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {content.states.map(state => {
            const card = (
              <Card className='h-full rounded-md transition-colors group-hover:border-primary/40 group-hover:bg-primary/5'>
                <CardHeader>
                  <div className='flex items-start justify-between gap-3'>
                    <div>
                      <CardTitle className='text-xl'>{state.name}</CardTitle>
                      <CardDescription>{state.region}</CardDescription>
                    </div>
                    <MapPinIcon className='text-primary size-5 shrink-0' />
                  </div>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <p className='text-muted-foreground text-sm leading-6'>{state.description}</p>
                  <div className='border-primary/20 bg-primary/5 rounded-md border px-3 py-2'>
                    <p className='text-primary text-sm font-medium'>{content.statusLabel}</p>
                    <p className='text-muted-foreground mt-1 text-xs leading-5'>{content.contactLabel}</p>
                  </div>
                </CardContent>
              </Card>
            )

            return state.href ? (
              <Link
                key={state.name}
                href={state.href}
                className='group block rounded-md focus-visible:ring-ring focus-visible:ring-[3px] focus-visible:outline-none'
              >
                {card}
              </Link>
            ) : (
              <div key={state.name}>{card}</div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default MeetingsPage
