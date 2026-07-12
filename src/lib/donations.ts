import { revalidateTag, unstable_cache } from 'next/cache'

import { getSql } from '@/lib/neon'
import type { Locale } from '@/lib/i18n'
import type { DonationCheckoutFrequency, StripeCheckoutSessionDetails } from '@/lib/stripe-checkout'

export const donationCampaigns = [
  {
    id: 'general',
    name: {
      en: 'General Fund',
      fr: 'Fonds general'
    },
    description: {
      en: 'Supports Bamena-USA programs, operations, and community care.',
      fr: "Soutient les programmes, le fonctionnement et l'entraide de Bamena-USA."
    }
  },
  {
    id: 'water-project',
    name: {
      en: 'Water Project',
      fr: "Projet d'eau"
    },
    description: {
      en: 'Helps fund water access projects and maintenance in the village.',
      fr: "Aide a financer les projets d'acces a l'eau et leur entretien au village."
    }
  },
  {
    id: 'culture',
    name: {
      en: 'Culture and Youth',
      fr: 'Culture et jeunesse'
    },
    description: {
      en: 'Funds cultural education, youth mentorship, and community gatherings.',
      fr: "Finance l'education culturelle, le mentorat des jeunes et les rassemblements."
    }
  },
  {
    id: 'meetings',
    name: {
      en: 'Meetings and Member Care',
      fr: 'Reunions et soutien aux membres'
    },
    description: {
      en: 'Supports meeting logistics, family support, and member services.',
      fr: 'Soutient la logistique des reunions, les familles et les services aux membres.'
    }
  }
] as const

export type DonationCampaignId = (typeof donationCampaigns)[number]['id']

export type DonationRecord = {
  stripeCheckoutSessionId: string
  donorName: string
  donorEmail: string
  campaignId: string
  campaignName: string
  amountTotal: number
  currency: string
  frequency: DonationCheckoutFrequency
  paymentStatus: string
  stripePaymentIntentId: string | null
  stripeSubscriptionId: string | null
  stripeCreatedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

type DonationRecordRow = {
  stripe_checkout_session_id: string
  donor_name: string
  donor_email: string
  campaign_id: string
  campaign_name: string
  amount_total: number | string
  currency: string
  frequency: string
  payment_status: string
  stripe_payment_intent_id: string | null
  stripe_subscription_id: string | null
  stripe_created_at: Date | string | null
  created_at: Date | string
  updated_at: Date | string
}

export const donationRecordsCacheTag = 'donation-records'

const defaultDonationRecordsTimeoutMs = 8000
const minimumDonationAmountCents = 500
const maximumDonationAmountCents = 1000000

let donationsTablePromise: Promise<void> | null = null

const mapDonationRecord = (row: DonationRecordRow): DonationRecord => ({
  stripeCheckoutSessionId: row.stripe_checkout_session_id,
  donorName: row.donor_name,
  donorEmail: row.donor_email,
  campaignId: row.campaign_id,
  campaignName: row.campaign_name,
  amountTotal: Number(row.amount_total) || 0,
  currency: row.currency,
  frequency: row.frequency === 'monthly' ? 'monthly' : 'one-time',
  paymentStatus: row.payment_status,
  stripePaymentIntentId: row.stripe_payment_intent_id,
  stripeSubscriptionId: row.stripe_subscription_id,
  stripeCreatedAt: row.stripe_created_at ? new Date(row.stripe_created_at) : null,
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at)
})

const ensureDonationsTable = async () => {
  if (!donationsTablePromise) {
    donationsTablePromise = (async () => {
      await getSql()`
        CREATE TABLE IF NOT EXISTS donation_payments (
          stripe_checkout_session_id TEXT PRIMARY KEY,
          donor_name TEXT NOT NULL DEFAULT '',
          donor_email TEXT NOT NULL DEFAULT '',
          campaign_id TEXT NOT NULL DEFAULT 'general',
          campaign_name TEXT NOT NULL DEFAULT '',
          amount_total INTEGER NOT NULL DEFAULT 0,
          currency TEXT NOT NULL DEFAULT 'usd',
          frequency TEXT NOT NULL DEFAULT 'one-time',
          payment_status TEXT NOT NULL DEFAULT '',
          stripe_payment_intent_id TEXT,
          stripe_subscription_id TEXT,
          stripe_created_at TIMESTAMPTZ,
          raw_payload JSONB,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `
    })()

    donationsTablePromise = donationsTablePromise.catch(error => {
      donationsTablePromise = null
      throw error
    })
  }

  return donationsTablePromise
}

export const getDonationCampaign = (campaignId: string | null | undefined) => {
  return donationCampaigns.find(campaign => campaign.id === campaignId) ?? donationCampaigns[0]
}

export const getDonationCampaignName = (campaignId: string, locale: Locale) => {
  return getDonationCampaign(campaignId).name[locale]
}

export const getDonationAmountCents = (amountValue: string, customAmountValue: string) => {
  const rawAmount = amountValue === 'custom' ? customAmountValue : amountValue
  const normalizedAmount = rawAmount.replace(/[$,\s]/g, '')
  const amount = Number(normalizedAmount)
  const amountCents = Math.round(amount * 100)

  if (!Number.isFinite(amount) || amountCents < minimumDonationAmountCents) {
    throw new Error('Donation amount must be at least $5.')
  }

  if (amountCents > maximumDonationAmountCents) {
    throw new Error('Donation amount must be $10,000 or less.')
  }

  return amountCents
}

export const formatDonationAmount = (amountCents: number, currency = 'usd', locale: Locale = 'en') => {
  return new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    style: 'currency',
    currency: currency.toUpperCase()
  }).format(amountCents / 100)
}

const listDonationRecordRows = unstable_cache(
  async () => {
    await ensureDonationsTable()

    return (await getSql()`
      SELECT
        stripe_checkout_session_id,
        donor_name,
        donor_email,
        campaign_id,
        campaign_name,
        amount_total,
        currency,
        frequency,
        payment_status,
        stripe_payment_intent_id,
        stripe_subscription_id,
        stripe_created_at,
        created_at,
        updated_at
      FROM donation_payments
      ORDER BY COALESCE(stripe_created_at, created_at) DESC
    `) as DonationRecordRow[]
  },
  [donationRecordsCacheTag],
  {
    revalidate: 60,
    tags: [donationRecordsCacheTag]
  }
)

export const listDonationRecords = async () => {
  const rows = await listDonationRecordRows()

  return rows.map(mapDonationRecord)
}

export const listDonationRecordsWithTimeout = async (timeoutMs = defaultDonationRecordsTimeoutMs) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  try {
    return await Promise.race([
      listDonationRecords(),
      new Promise<never>((_, reject) => {
        timeoutId = setTimeout(() => {
          reject(new Error(`Donation lookup timed out after ${timeoutMs}ms.`))
        }, timeoutMs)
      })
    ])
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  }
}

export const getDonationSummary = (records: DonationRecord[]) => {
  const paidRecords = records.filter(record => record.paymentStatus === 'paid')
  const totalCents = paidRecords.reduce((sum, record) => sum + record.amountTotal, 0)
  const monthlyCount = paidRecords.filter(record => record.frequency === 'monthly').length

  return {
    totalCents,
    paidCount: paidRecords.length,
    monthlyCount
  }
}

export const recordDonationFromStripeCheckoutSession = async (session: StripeCheckoutSessionDetails) => {
  const metadata = session.metadata ?? {}
  const campaign = getDonationCampaign(metadata.donation_campaign_id)
  const donorName = session.customer_details?.name || metadata.donor_name || ''
  const donorEmail = session.customer_details?.email || session.customer_email || metadata.donor_email || ''

  const frequency: DonationCheckoutFrequency =
    metadata.donation_frequency === 'monthly' || session.mode === 'subscription' ? 'monthly' : 'one-time'

  const campaignName = metadata.donation_campaign_name || campaign.name.en

  await ensureDonationsTable()

  await getSql()`
    INSERT INTO donation_payments (
      stripe_checkout_session_id,
      donor_name,
      donor_email,
      campaign_id,
      campaign_name,
      amount_total,
      currency,
      frequency,
      payment_status,
      stripe_payment_intent_id,
      stripe_subscription_id,
      stripe_created_at,
      raw_payload
    )
    VALUES (
      ${session.id},
      ${donorName},
      ${donorEmail},
      ${campaign.id},
      ${campaignName},
      ${session.amount_total ?? 0},
      ${(session.currency ?? 'usd').toLowerCase()},
      ${frequency},
      ${session.payment_status ?? ''},
      ${session.payment_intent ?? null},
      ${session.subscription ?? null},
      ${session.created ? new Date(session.created * 1000).toISOString() : null},
      ${JSON.stringify(session)}::jsonb
    )
    ON CONFLICT (stripe_checkout_session_id)
    DO UPDATE SET
      donor_name = EXCLUDED.donor_name,
      donor_email = EXCLUDED.donor_email,
      campaign_id = EXCLUDED.campaign_id,
      campaign_name = EXCLUDED.campaign_name,
      amount_total = EXCLUDED.amount_total,
      currency = EXCLUDED.currency,
      frequency = EXCLUDED.frequency,
      payment_status = EXCLUDED.payment_status,
      stripe_payment_intent_id = EXCLUDED.stripe_payment_intent_id,
      stripe_subscription_id = EXCLUDED.stripe_subscription_id,
      stripe_created_at = EXCLUDED.stripe_created_at,
      raw_payload = EXCLUDED.raw_payload,
      updated_at = NOW()
  `

  revalidateTag(donationRecordsCacheTag, { expire: 0 })
}
