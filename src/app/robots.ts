import type { MetadataRoute } from 'next'

import { getAbsoluteUrl } from '@/lib/site-url'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/private/',
          '/backend/',
          '/profile/',
          '/account/',
          '/members/full/',
          '/sign-in/',
          '/sign-up/',
          '/fr/sign-in/',
          '/fr/sign-up/',
          '/*?*'
        ]
      }
    ],
    sitemap: getAbsoluteUrl('/sitemap.xml')
  }
}
