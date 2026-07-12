import type { Metadata } from 'next'

import DonatePage, { getDonatePageMetadata } from '@/components/pages/donate-page'

const content = getDonatePageMetadata('fr')

export const metadata: Metadata = {
  title: content.title,
  description: content.description,
  alternates: {
    canonical: '/fr/donate',
    languages: {
      'en-US': '/donate',
      'fr-FR': '/fr/donate'
    }
  },
  openGraph: {
    title: content.title,
    description: content.description,
    locale: 'fr_FR'
  },
  twitter: {
    title: content.title,
    description: content.description
  }
}

type FrenchDonateRouteProps = {
  searchParams?: Promise<{
    error?: string | string[]
    status?: string | string[]
  }>
}

const getSearchValue = (value: string | string[] | undefined) => {
  return Array.isArray(value) ? value[0] : value
}

const FrenchDonateRoutePage = async ({ searchParams }: FrenchDonateRouteProps) => {
  const params = await searchParams

  return <DonatePage locale='fr' error={getSearchValue(params?.error)} status={getSearchValue(params?.status)} />
}

export default FrenchDonateRoutePage
