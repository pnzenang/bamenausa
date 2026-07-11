import { CalendarDaysIcon, MapPinIcon, PlusIcon, SendIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const events = [
  {
    title: 'Annual cultural gala',
    date: 'Aug 22, 2026',
    place: 'Silver Spring, MD',
    status: 'Planning'
  },
  {
    title: 'Youth heritage workshop',
    date: 'Sep 12, 2026',
    place: 'Community center',
    status: 'Draft'
  },
  {
    title: 'Family support drive',
    date: 'Oct 3, 2026',
    place: 'DMV area',
    status: 'Open'
  }
]

const getWhatsAppAlertHref = (event: (typeof events)[number]) => {
  const alertMessage = [
    'Bamena-USA Alert',
    '',
    event.title,
    `Date: ${event.date}`,
    `Location: ${event.place}`,
    `Status: ${event.status}`
  ].join('\n')

  return `https://wa.me/?text=${encodeURIComponent(alertMessage)}`
}

const EventsPage = () => {
  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <Badge variant='outline'>Events</Badge>
          <h2 className='mt-2 text-3xl font-semibold tracking-normal'>Event planning</h2>
          <p className='text-muted-foreground mt-2'>
            Placeholder schedule for the gala, workshops, and community events.
          </p>
        </div>
        <Button disabled>
          <PlusIcon />
          New event
        </Button>
      </div>

      <div className='grid gap-4 lg:grid-cols-3'>
        {events.map(event => (
          <Card key={event.title} className='rounded-md'>
            <CardHeader>
              <CardTitle className='text-xl'>{event.title}</CardTitle>
              <CardDescription>{event.status}</CardDescription>
            </CardHeader>
            <CardContent className='space-y-3 text-sm'>
              <p className='flex items-center gap-2'>
                <CalendarDaysIcon className='text-muted-foreground size-4' />
                {event.date}
              </p>
              <p className='flex items-center gap-2'>
                <MapPinIcon className='text-muted-foreground size-4' />
                {event.place}
              </p>
              <Button variant='outline' className='w-full' asChild>
                <a
                  href={getWhatsAppAlertHref(event)}
                  target='_blank'
                  rel='noreferrer'
                  aria-label={`Share ${event.title} alert to WhatsApp`}
                >
                  <SendIcon />
                  Share to WhatsApp
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default EventsPage
