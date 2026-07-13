import type { MetadataRoute } from 'next'

import { getMarylandMeetingDateSlug, marylandMeetingDates } from '@/lib/maryland-meetings'
import { getAbsoluteUrl } from '@/lib/site-url'

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
    '/donate',
    '/fr/donate',
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
    url: getAbsoluteUrl(route || '/')
  }))
}
