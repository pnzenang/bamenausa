import type { Metadata } from 'next'

import DonatePage, { getDonatePageMetadata } from '@/components/pages/donate-page'

const content = getDonatePageMetadata('en')

export const metadata: Metadata = {
  title: content.title,
  description: content.description,
  alternates: {
    canonical: '/donate',
    languages: {
      'en-US': '/donate',
      'fr-FR': '/fr/donate'
    }
  },
  openGraph: {
    title: content.title,
    description: content.description,
    locale: 'en_US'
  },
  twitter: {
    title: content.title,
    description: content.description
  }
}

type DonateRouteProps = {
  searchParams?: Promise<{
    error?: string | string[]
    status?: string | string[]
  }>
}

const getSearchValue = (value: string | string[] | undefined) => {
  return Array.isArray(value) ? value[0] : value
}

const DonateRoutePage = async ({ searchParams }: DonateRouteProps) => {
  const params = await searchParams

  return <DonatePage locale='en' error={getSearchValue(params?.error)} status={getSearchValue(params?.status)} />
}

export default DonateRoutePage
