import Link from 'next/link'

import { Edit3Icon, ExternalLinkIcon, FileTextIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { listMarylandMeetingMinutes } from '@/lib/maryland-meeting-minutes'
import { getMarylandMeetingDateSlug, marylandMeetingDates } from '@/lib/maryland-meetings'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  timeZone: 'UTC',
  weekday: 'long',
  year: 'numeric'
})

const BackendMeetingsPage = async () => {
  let savedMinutes: Awaited<ReturnType<typeof listMarylandMeetingMinutes>> = []
  let minutesError = false

  try {
    savedMinutes = await listMarylandMeetingMinutes()
  } catch {
    minutesError = true
  }

  const savedMinutesByDate = new Map(savedMinutes.map(minutes => [minutes.dateSlug, minutes]))

  return (
    <div className='space-y-6'>
      <div>
        <Badge variant='outline'>Meetings</Badge>
        <h2 className='mt-2 text-3xl font-semibold tracking-normal'>Meetings</h2>
        <p className='text-muted-foreground mt-2 max-w-3xl'>
          Edit Maryland meetings here. Saved changes are published on the public pages.
        </p>
      </div>

      {minutesError && (
        <p className='border-destructive/30 bg-destructive/10 text-destructive rounded-md border px-4 py-3 text-sm'>
          The meeting editor is temporarily unavailable.
        </p>
      )}

      <Card className='rounded-md'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <FileTextIcon className='text-primary size-5' />
            Maryland meetings
          </CardTitle>
          <CardDescription>Select a meeting date to edit the public page.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='divide-y rounded-md border'>
            {marylandMeetingDates.map(date => {
              const dateSlug = getMarylandMeetingDateSlug(date)
              const saved = savedMinutesByDate.get(dateSlug)

              return (
                <div
                  key={dateSlug}
                  className='grid gap-3 p-4 md:grid-cols-[minmax(0,1fr)_150px_220px] md:items-center'
                >
                  <div>
                    <p className='font-medium'>{dateFormatter.format(date)}</p>
                    <p className='text-muted-foreground mt-1 text-sm'>Maryland meeting</p>
                  </div>
                  <Badge variant={saved ? 'default' : 'outline'}>{saved ? 'Published' : 'Not edited'}</Badge>
                  <div className='flex flex-wrap gap-2 md:justify-end'>
                    <Button variant='outline' size='sm' className='rounded-full' asChild>
                      <Link
                        href={`/meetings/maryland/minutes/${dateSlug}${saved ? `?published=${saved.updatedAt.getTime()}` : ''}`}
                        prefetch={false}
                      >
                        <ExternalLinkIcon />
                        View
                      </Link>
                    </Button>
                    <Button size='sm' className='rounded-full' asChild>
                      <Link href={`/backend/meetings/maryland/minutes/${dateSlug}`}>
                        <Edit3Icon />
                        Edit
                      </Link>
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BackendMeetingsPage
