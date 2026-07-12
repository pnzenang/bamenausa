import type { Locale } from '@/lib/i18n'

export type DonationCheckoutFrequency = 'one-time' | 'monthly'

type CreateDonationCheckoutSessionInput = {
  amountCents: number
  campaignId: string
  campaignName: string
  donorEmail: string
  donorName: string
  frequency: DonationCheckoutFrequency
  locale: Locale
}

type StripeCheckoutSessionResponse = {
  id: string
  url?: string
  error?: {
    message?: string
  }
}

export type StripeCheckoutSessionDetails = {
  id: string
  amount_total?: number | null
  currency?: string | null
  customer_email?: string | null
  customer_details?: {
    email?: string | null
    name?: string | null
  } | null
  metadata?: Record<string, string> | null
  mode?: string | null
  payment_intent?: string | null
  payment_status?: string | null
  subscription?: string | null
  created?: number | null
  error?: {
    message?: string
  }
}

const stripeCheckoutSessionsUrl = 'https://api.stripe.com/v1/checkout/sessions'
const validStripeServerKeyPrefixes = ['sk_test_', 'sk_live_', 'rk_test_', 'rk_live_', 'rkcs_test_', 'sk_org_']

const getStripeSecretKey = () => {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY?.trim()

  if (!stripeSecretKey) return null

  return stripeSecretKey
}

const isStripeServerApiKey = (key: string) => {
  return validStripeServerKeyPrefixes.some(prefix => key.startsWith(prefix))
}

export const isStripeDonationConfigured = () => {
  const stripeSecretKey = getStripeSecretKey()

  return Boolean(stripeSecretKey && isStripeServerApiKey(stripeSecretKey))
}

const getValidatedStripeSecretKey = () => {
  const stripeSecretKey = getStripeSecretKey()

  if (!stripeSecretKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured.')
  }

  if (!isStripeServerApiKey(stripeSecretKey)) {
    throw new Error(
      'STRIPE_SECRET_KEY must be a Stripe server API key starting with sk_test_, sk_live_, rk_test_, rk_live_, or rkcs_test_. The current key looks like a managed or publishable key.'
    )
  }

  return stripeSecretKey
}

const getAppUrl = () => {
  return (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000').replace(/\/$/, '')
}

const getDonatePath = (locale: Locale) => {
  return locale === 'fr' ? '/fr/donate' : '/donate'
}

const getDonationThankYouPath = (locale: Locale) => {
  return locale === 'fr' ? '/fr/donate/thank-you' : '/donate/thank-you'
}

const appendMetadata = (params: URLSearchParams, path: string, metadata: Record<string, string>) => {
  Object.entries(metadata).forEach(([key, value]) => {
    params.append(`${path}[${key}]`, value)
  })
}

export const createDonationCheckoutSession = async ({
  amountCents,
  campaignId,
  campaignName,
  donorEmail,
  donorName,
  frequency,
  locale
}: CreateDonationCheckoutSessionInput) => {
  const stripeSecretKey = getValidatedStripeSecretKey()
  const appUrl = getAppUrl()
  const params = new URLSearchParams()
  const mode = frequency === 'monthly' ? 'subscription' : 'payment'

  const metadata = {
    donation_campaign_id: campaignId,
    donation_campaign_name: campaignName,
    donation_frequency: frequency,
    donor_name: donorName,
    donor_email: donorEmail
  }

  params.append('mode', mode)
  params.append('submit_type', 'donate')
  params.append('success_url', `${appUrl}${getDonationThankYouPath(locale)}?session_id={CHECKOUT_SESSION_ID}`)
  params.append('cancel_url', `${appUrl}${getDonatePath(locale)}?status=cancelled`)
  params.append('client_reference_id', `donation_${campaignId}_${Date.now()}`)
  params.append('line_items[0][quantity]', '1')
  params.append('line_items[0][price_data][currency]', 'usd')
  params.append('line_items[0][price_data][unit_amount]', String(amountCents))
  params.append('line_items[0][price_data][product_data][name]', campaignName)
  params.append('line_items[0][price_data][product_data][description]', 'Bamena-USA donation')
  appendMetadata(params, 'metadata', metadata)

  if (frequency === 'monthly') {
    params.append('line_items[0][price_data][recurring][interval]', 'month')
    appendMetadata(params, 'subscription_data[metadata]', metadata)
  } else {
    appendMetadata(params, 'payment_intent_data[metadata]', metadata)
  }

  if (donorEmail) {
    params.append('customer_email', donorEmail)
  }

  const response = await fetch(stripeCheckoutSessionsUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${stripeSecretKey}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params.toString()
  })

  const session = (await response.json()) as StripeCheckoutSessionResponse

  if (!response.ok || !session.url) {
    throw new Error(session.error?.message || 'Stripe checkout session could not be created.')
  }

  return session.url
}

export const retrieveDonationCheckoutSession = async (sessionId: string) => {
  const normalizedSessionId = sessionId.trim()

  if (!normalizedSessionId.startsWith('cs_')) {
    throw new Error('Invalid Stripe Checkout Session ID.')
  }

  const stripeSecretKey = getValidatedStripeSecretKey()

  const response = await fetch(`${stripeCheckoutSessionsUrl}/${encodeURIComponent(normalizedSessionId)}`, {
    headers: {
      Authorization: `Bearer ${stripeSecretKey}`
    }
  })

  const session = (await response.json()) as StripeCheckoutSessionDetails

  if (!response.ok || !session.id) {
    throw new Error(session.error?.message || 'Stripe checkout session could not be retrieved.')
  }

  return session
}
