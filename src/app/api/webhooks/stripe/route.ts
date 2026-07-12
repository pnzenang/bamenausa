import { NextResponse } from 'next/server'

import { recordDonationFromStripeCheckoutSession } from '@/lib/donations'
import type { StripeCheckoutSessionDetails } from '@/lib/stripe-checkout'
import { verifyStripeWebhookSignature } from '@/lib/stripe-webhooks'

export const runtime = 'nodejs'

export const POST = async (request: Request) => {
  const payload = await request.text()
  const signatureHeader = request.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    return NextResponse.json({ error: 'Stripe webhook secret is not configured.' }, { status: 500 })
  }

  if (
    !signatureHeader ||
    !verifyStripeWebhookSignature({
      payload,
      signatureHeader,
      webhookSecret
    })
  ) {
    return NextResponse.json({ error: 'Invalid Stripe signature.' }, { status: 400 })
  }

  const event = JSON.parse(payload) as {
    type?: string
    data?: {
      object?: unknown
    }
  }

  if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
    const session = event.data?.object as StripeCheckoutSessionDetails | undefined

    if (session?.id) {
      await recordDonationFromStripeCheckoutSession(session)
    }
  }

  return NextResponse.json({ received: true })
}
