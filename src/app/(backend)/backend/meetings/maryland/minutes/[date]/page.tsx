import Link from 'next/link'

import { revalidatePath } from 'next/cache'
import { notFound, redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'
import { ArrowLeftIcon, ExternalLinkIcon } from 'lucide-react'

import MarylandMeetingMinutesEditorForm from '@/components/backend/maryland-meeting-minutes-editor-form'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { isAdminUser } from '@/lib/auth'
import {
  getMarylandMeetingAgendaItems,
  getMarylandMeetingMinutes,
  saveMarylandMeetingMinutes
} from '@/lib/maryland-meeting-minutes'
import { getMarylandMeetingDateBySlug } from '@/lib/maryland-meetings'

type EditMarylandMeetingMinutesPageProps = {
  params: Promise<{
    date: string
  }>
  searchParams?: Promise<{
    published?: string
  }>
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  timeZone: 'UTC',
  weekday: 'long',
  year: 'numeric'
})

const saveMarylandMeetingMinutesAction = async (formData: FormData) => {
  'use server'

  const user = await currentUser()

  if (!isAdminUser(user)) {
    throw new Error('Unauthorized')
  }

  const dateSlug = formData.get('dateSlug')

  if (typeof dateSlug !== 'string' || !getMarylandMeetingDateBySlug(dateSlug)) {
    throw new Error('Invalid meeting date')
  }

  const agendaDetails = formData
    .getAll('agendaDetails')
    .map(detail => (typeof detail === 'string' ? detail : ''))

  const agendaTitles = formData
    .getAll('agendaTitles')
    .map(title => (typeof title === 'string' ? title : ''))

  await saveMarylandMeetingMinutes(dateSlug, {
    agendaTitles,
    agendaDetails
  })

  revalidatePath('/backend/meetings')
  revalidatePath(`/backend/meetings/maryland/minutes/${dateSlug}`)
  revalidatePath('/meetings/maryland')
  revalidatePath('/fr/meetings/maryland')
  revalidatePath(`/meetings/maryland/minutes/${dateSlug}`)
  revalidatePath(`/fr/meetings/maryland/minutes/${dateSlug}`)

  redirect(`/backend/meetings/maryland/minutes/${dateSlug}?published=1`)
}

const EditMarylandMeetingMinutesPage = async ({ params, searchParams }: EditMarylandMeetingMinutesPageProps) => {
  const { date } = await params
  const resolvedSearchParams = await searchParams
  const meetingDate = getMarylandMeetingDateBySlug(date)

  if (!meetingDate) {
    notFound()
  }

  let savedMinutes: Awaited<ReturnType<typeof getMarylandMeetingMinutes>> = null
  let minutesError = false

  try {
    savedMinutes = await getMarylandMeetingMinutes(date)
  } catch {
    minutesError = true
  }

  const agendaItems = savedMinutes
    ? getMarylandMeetingAgendaItems('en', savedMinutes.agendaTitles, savedMinutes.agendaDetails)
    : []

  const publicMinutesHref = `/meetings/maryland/minutes/${date}${
    savedMinutes ? `?published=${savedMinutes.updatedAt.getTime()}` : ''
  }`

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <Badge variant='outline'>Maryland</Badge>
          <h2 className='mt-2 text-3xl font-semibold tracking-normal'>Edit meeting</h2>
          <p className='text-muted-foreground mt-2'>{dateFormatter.format(meetingDate)}</p>
        </div>
        <div className='flex flex-wrap gap-2'>
          <Button variant='outline' className='rounded-full' asChild>
            <Link href='/backend/meetings'>
              <ArrowLeftIcon />
              Back
            </Link>
          </Button>
          <Button variant='outline' className='rounded-full' asChild>
            <Link href={publicMinutesHref} prefetch={false}>
              <ExternalLinkIcon />
              View public
            </Link>
          </Button>
        </div>
      </div>

      {minutesError && (
        <p className='border-destructive/30 bg-destructive/10 text-destructive rounded-md border px-4 py-3 text-sm'>
          Saved meeting information is temporarily unavailable.
        </p>
      )}

      {resolvedSearchParams?.published === '1' && savedMinutes && (
        <div className='border-primary/30 bg-primary/10 rounded-md border px-4 py-3 text-sm'>
          <p className='font-medium'>Meeting published.</p>
          <p className='text-muted-foreground mt-1'>
            The public Maryland meeting page now uses the saved agenda.
          </p>
        </div>
      )}

      <Card className='rounded-md'>
        <CardHeader>
          <CardTitle>Agenda</CardTitle>
          <CardDescription>
            Start with an empty list, add each agenda point, then fill in each section.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MarylandMeetingMinutesEditorForm
            dateSlug={date}
            agendaItems={agendaItems}
            disabled={minutesError}
            saveAction={saveMarylandMeetingMinutesAction}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default EditMarylandMeetingMinutesPage
