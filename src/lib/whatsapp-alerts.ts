import { getMarylandMeetingDateSlug, marylandMeetingAddress } from '@/lib/maryland-meetings'

export type MarylandMeetingWhatsAppAlertType = 'reminder' | 'agenda' | 'change' | 'report'

export type MarylandMeetingWhatsAppAlertLink = {
  type: MarylandMeetingWhatsAppAlertType
  label: string
  href: string
}

const siteUrl = (process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000').replace(/\/$/, '')

const marylandMeetingTime = '7:00 PM - 9:00 PM'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  timeZone: 'UTC',
  weekday: 'long',
  year: 'numeric'
})

const alertLabels: Record<MarylandMeetingWhatsAppAlertType, string> = {
  reminder: 'Meeting reminder',
  agenda: 'Agenda published',
  change: 'Meeting update',
  report: 'Report published'
}

const alertTypes: MarylandMeetingWhatsAppAlertType[] = ['reminder', 'agenda', 'change', 'report']

const getMarylandMeetingPublicUrl = (dateSlug: string) => `${siteUrl}/meetings/maryland/minutes/${dateSlug}`

const getMarylandMeetingWhatsAppAlertMessage = (type: MarylandMeetingWhatsAppAlertType, meetingDate: Date) => {
  const formattedDate = dateFormatter.format(meetingDate)
  const dateSlug = getMarylandMeetingDateSlug(meetingDate)
  const publicUrl = getMarylandMeetingPublicUrl(dateSlug)

  if (type === 'agenda') {
    return [
      'Bamena-USA Maryland Meeting Agenda',
      '',
      `The agenda for ${formattedDate} has been published.`,
      `Time: ${marylandMeetingTime}`,
      `Address: ${marylandMeetingAddress}`,
      '',
      `Open the meeting page: ${publicUrl}`
    ].join('\n')
  }

  if (type === 'change') {
    return [
      'Bamena-USA Maryland Meeting Update',
      '',
      `There is an update for the Maryland meeting on ${formattedDate}.`,
      `Time: ${marylandMeetingTime}`,
      `Address: ${marylandMeetingAddress}`,
      '',
      `Open the meeting page for the latest information: ${publicUrl}`
    ].join('\n')
  }

  if (type === 'report') {
    return [
      'Bamena-USA Maryland Meeting Report',
      '',
      `The meeting report for ${formattedDate} has been published.`,
      '',
      `Open it here: ${publicUrl}`
    ].join('\n')
  }

  return [
    'Bamena-USA Maryland Meeting Reminder',
    '',
    `Date: ${formattedDate}`,
    `Time: ${marylandMeetingTime}`,
    `Address: ${marylandMeetingAddress}`,
    '',
    `Open the meeting page: ${publicUrl}`
  ].join('\n')
}

export const getMarylandMeetingWhatsAppAlertHref = (type: MarylandMeetingWhatsAppAlertType, meetingDate: Date) => {
  return `https://wa.me/?text=${encodeURIComponent(getMarylandMeetingWhatsAppAlertMessage(type, meetingDate))}`
}

export const getMarylandMeetingWhatsAppAlertLinks = (meetingDate: Date): MarylandMeetingWhatsAppAlertLink[] => {
  return alertTypes.map(type => ({
    type,
    label: alertLabels[type],
    href: getMarylandMeetingWhatsAppAlertHref(type, meetingDate)
  }))
}
