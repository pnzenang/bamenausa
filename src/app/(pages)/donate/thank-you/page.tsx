import type { Metadata } from 'next'

import DonationThankYouPage from '@/components/pages/donation-thank-you-page'

import { recordDonationFromStripeCheckoutSession } from '@/lib/donations'
import { retrieveDonationCheckoutSession } from '@/lib/stripe-checkout'

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Thank you for supporting Bamena-USA.',
  robots: {
    index: false,
    follow: false
  }
}

type DonateThankYouRoutePageProps = {
  searchParams?: Promise<{
    session_id?: string | string[]
  }>
}

const getSearchValue = (value: string | string[] | undefined) => {
  return Array.isArray(value) ? value[0] : value
}

const recordCheckoutSession = async (sessionId: string | undefined) => {
  if (!sessionId) return 'pending'

  try {
    const session = await retrieveDonationCheckoutSession(sessionId)

    await recordDonationFromStripeCheckoutSession(session)

    return 'recorded'
  } catch {
    return 'pending'
  }
}

const DonateThankYouRoutePage = async ({ searchParams }: DonateThankYouRoutePageProps) => {
  const params = await searchParams
  const ledgerStatus = await recordCheckoutSession(getSearchValue(params?.session_id))

  return <DonationThankYouPage ledgerStatus={ledgerStatus} locale='en' />
}

export default DonateThankYouRoutePage
