import type { MetadataRoute } from 'next'

import { getMarylandMeetingDateSlug, marylandMeetingDates } from '@/lib/maryland-meetings'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const marylandMeetingDetailRoutes = marylandMeetingDates.flatMap(date => {
    const dateSlug = getMarylandMeetingDateSlug(date)

    return [
      `/meetings/maryland/minutes/${dateSlug}`,
      `/fr/meetings/maryland/minutes/${dateSlug}`,
      `/meetings/maryland/addresses/${dateSlug}`,
      `/fr/meetings/maryland/addresses/${dateSlug}`
    ]
  })

  const routes = [
    '' /* This is equivalent to / */,
    '/fr',
    '/members',
    '/fr/members',
    '/meetings',
    '/fr/meetings',
    '/meetings/maryland',
    '/fr/meetings/maryland',
    ...marylandMeetingDetailRoutes,
    '/galery',
    '/fr/galery',
    '/necrology',
    '/fr/necrology'
  ]

  return routes.map(route => ({
    url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}${route}`
  }))
}
