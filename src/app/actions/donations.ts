'use server'

import { redirect } from 'next/navigation'

import {
  getDonationAmountCents,
  getDonationCampaign,
  type DonationCampaignId
} from '@/lib/donations'
import { isLocale, type Locale } from '@/lib/i18n'
import { createDonationCheckoutSession, type DonationCheckoutFrequency } from '@/lib/stripe-checkout'

const getStringFormValue = (formData: FormData, key: string) => {
  const value = formData.get(key)

  return typeof value === 'string' ? value.trim() : ''
}

const getDonatePath = (locale: Locale) => {
  return locale === 'fr' ? '/fr/donate' : '/donate'
}

const getDonationErrorRedirect = (locale: Locale, error: string) => {
  return `${getDonatePath(locale)}?error=${encodeURIComponent(error)}`
}

export const startDonationCheckout = async (formData: FormData) => {
  const localeValue = getStringFormValue(formData, 'locale')
  const locale: Locale = isLocale(localeValue) ? localeValue : 'en'
  const frequencyValue = getStringFormValue(formData, 'frequency')
  const frequency: DonationCheckoutFrequency = frequencyValue === 'monthly' ? 'monthly' : 'one-time'
  const donorEmail = getStringFormValue(formData, 'donorEmail')
  const donorName = getStringFormValue(formData, 'donorName')

  let checkoutUrl = ''

  try {
    const campaign = getDonationCampaign(getStringFormValue(formData, 'campaign') as DonationCampaignId)

    const amountCents = getDonationAmountCents(
      getStringFormValue(formData, 'amount'),
      getStringFormValue(formData, 'customAmount')
    )

    checkoutUrl = await createDonationCheckoutSession({
      amountCents,
      campaignId: campaign.id,
      campaignName: campaign.name[locale],
      donorEmail,
      donorName,
      frequency,
      locale
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Donation checkout could not be started.'

    redirect(getDonationErrorRedirect(locale, message))
  }

  redirect(checkoutUrl)
}
