import Link from 'next/link'
import { CreditCardIcon, HeartHandshakeIcon, LockKeyholeIcon, RepeatIcon } from 'lucide-react'

import { startDonationCheckout } from '@/app/actions/donations'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { donationCampaigns, formatDonationAmount } from '@/lib/donations'
import type { Locale } from '@/lib/i18n'
import { isStripeDonationConfigured } from '@/lib/stripe-checkout'
import { cn } from '@/lib/utils'

const amountOptions = [25, 50, 100, 250]

const donatePageCopy = {
  en: {
    metadata: {
      title: 'Donate',
      description:
        'Make a secure one-time or monthly donation to support Bamena-USA cultural, family, and water projects.'
    },
    eyebrow: 'Secure giving',
    title: 'Support Bamena-USA with a financial donation.',
    description:
      'Choose an amount, select the campaign, and complete the payment through Stripe Checkout. Bamena-USA does not store card details.',
    amountLabel: 'Amount',
    customAmountLabel: 'Custom amount',
    frequencyLabel: 'Frequency',
    oneTime: 'One-time',
    monthly: 'Monthly',
    campaignLabel: 'Campaign',
    donorNameLabel: 'Name',
    donorEmailLabel: 'Email',
    donorNamePlaceholder: 'Your name',
    donorEmailPlaceholder: 'you@example.com',
    submit: 'Continue to secure checkout',
    configured: 'Stripe Checkout is connected for secure card processing.',
    notConfigured:
      'Online checkout needs Stripe keys before live donations can be processed. Add STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET.',
    cancelled: 'Donation checkout was cancelled. You can start again whenever you are ready.',
    errorTitle: 'Checkout needs attention',
    impactTitle: 'Where donations help',
    impactItems: [
      'Water projects and village infrastructure',
      'Youth mentorship and cultural education',
      'Member care, meetings, and family support'
    ],
    securityTitle: 'Payment security',
    securityDescription:
      'Payments are completed on Stripe Checkout. Card details stay with Stripe and confirmed payments are recorded for the admin ledger.'
  },
  fr: {
    metadata: {
      title: 'Faire un don',
      description:
        'Faire un don ponctuel ou mensuel securise pour soutenir les projets culturels, familiaux et eau de Bamena-USA.'
    },
    eyebrow: 'Don securise',
    title: 'Soutenir Bamena-USA par un don financier.',
    description:
      "Choisissez un montant, selectionnez le projet, puis terminez le paiement avec Stripe Checkout. Bamena-USA ne conserve pas les donnees de carte.",
    amountLabel: 'Montant',
    customAmountLabel: 'Montant personnalise',
    frequencyLabel: 'Frequence',
    oneTime: 'Ponctuel',
    monthly: 'Mensuel',
    campaignLabel: 'Projet',
    donorNameLabel: 'Nom',
    donorEmailLabel: 'Email',
    donorNamePlaceholder: 'Votre nom',
    donorEmailPlaceholder: 'vous@exemple.com',
    submit: 'Continuer vers le paiement securise',
    configured: 'Stripe Checkout est connecte pour le traitement securise des cartes.',
    notConfigured:
      'Le paiement en ligne a besoin des cles Stripe avant de traiter les dons. Ajoutez STRIPE_SECRET_KEY et STRIPE_WEBHOOK_SECRET.',
    cancelled: 'Le paiement du don a ete annule. Vous pouvez recommencer quand vous etes pret.',
    errorTitle: 'Le paiement demande une verification',
    impactTitle: 'A quoi servent les dons',
    impactItems: [
      "Projets d'eau et infrastructures au village",
      'Mentorat des jeunes et education culturelle',
      'Soutien aux membres, reunions et aide aux familles'
    ],
    securityTitle: 'Securite du paiement',
    securityDescription:
      'Les paiements sont finalises sur Stripe Checkout. Les donnees de carte restent chez Stripe et les paiements confirmes sont inscrits dans le registre admin.'
  }
} as const

export const getDonatePageMetadata = (locale: Locale) => {
  return donatePageCopy[locale].metadata
}

type DonatePageProps = {
  error?: string
  locale: Locale
  status?: string
}

const DonatePage = ({ error, locale, status }: DonatePageProps) => {
  const copy = donatePageCopy[locale]
  const isStripeConfigured = isStripeDonationConfigured()

  return (
    <main className='bg-background min-h-screen pt-28'>
      <section className='mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.75fr)] lg:px-8 lg:py-16'>
        <div className='space-y-6'>
          <div className='space-y-4'>
            <Badge variant='outline'>{copy.eyebrow}</Badge>
            <h1 className='max-w-4xl text-4xl leading-tight font-semibold text-balance md:text-5xl'>{copy.title}</h1>
            <p className='text-muted-foreground max-w-3xl text-lg leading-8'>{copy.description}</p>
          </div>

          {(error || status === 'cancelled' || !isStripeConfigured) && (
            <div
              className={cn(
                'rounded-md border p-4 text-sm',
                error || !isStripeConfigured
                  ? 'border-amber-500/40 bg-amber-500/10 text-amber-900 dark:text-amber-100'
                  : 'border-border text-muted-foreground'
              )}
            >
              <p className='font-medium'>{error ? copy.errorTitle : status === 'cancelled' ? copy.cancelled : copy.notConfigured}</p>
              {error && <p className='mt-1'>{error}</p>}
            </div>
          )}

          <form action={startDonationCheckout} className='rounded-md border bg-card p-4 shadow-sm sm:p-6'>
            <input type='hidden' name='locale' value={locale} />

            <div className='grid gap-6'>
              <fieldset className='space-y-3'>
                <legend className='text-sm font-semibold'>{copy.amountLabel}</legend>
                <div className='grid grid-cols-2 gap-3 sm:grid-cols-5'>
                  {amountOptions.map(amount => (
                    <label key={amount} className='has-[:checked]:border-primary rounded-md border p-3 text-center'>
                      <input className='sr-only' type='radio' name='amount' value={amount} defaultChecked={amount === 50} />
                      <span className='font-semibold'>{formatDonationAmount(amount * 100, 'usd', locale)}</span>
                    </label>
                  ))}
                  <label className='has-[:checked]:border-primary rounded-md border p-3 text-center'>
                    <input className='sr-only' type='radio' name='amount' value='custom' />
                    <span className='font-semibold'>{copy.customAmountLabel}</span>
                  </label>
                </div>
                <Input name='customAmount' inputMode='decimal' placeholder='$150' aria-label={copy.customAmountLabel} />
              </fieldset>

              <fieldset className='space-y-3'>
                <legend className='text-sm font-semibold'>{copy.frequencyLabel}</legend>
                <div className='grid gap-3 sm:grid-cols-2'>
                  <label className='has-[:checked]:border-primary flex items-center gap-3 rounded-md border p-3'>
                    <input type='radio' name='frequency' value='one-time' defaultChecked />
                    <CreditCardIcon className='size-4' />
                    <span>{copy.oneTime}</span>
                  </label>
                  <label className='has-[:checked]:border-primary flex items-center gap-3 rounded-md border p-3'>
                    <input type='radio' name='frequency' value='monthly' />
                    <RepeatIcon className='size-4' />
                    <span>{copy.monthly}</span>
                  </label>
                </div>
              </fieldset>

              <fieldset className='space-y-3'>
                <legend className='text-sm font-semibold'>{copy.campaignLabel}</legend>
                <div className='grid gap-3 sm:grid-cols-2'>
                  {donationCampaigns.map(campaign => (
                    <label key={campaign.id} className='has-[:checked]:border-primary rounded-md border p-3'>
                      <span className='flex items-start gap-3'>
                        <input type='radio' name='campaign' value={campaign.id} defaultChecked={campaign.id === 'general'} />
                        <span>
                          <span className='block font-medium'>{campaign.name[locale]}</span>
                          <span className='text-muted-foreground mt-1 block text-sm leading-6'>
                            {campaign.description[locale]}
                          </span>
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className='grid gap-4 sm:grid-cols-2'>
                <label className='space-y-2'>
                  <span className='text-sm font-medium'>{copy.donorNameLabel}</span>
                  <Input name='donorName' placeholder={copy.donorNamePlaceholder} autoComplete='name' />
                </label>
                <label className='space-y-2'>
                  <span className='text-sm font-medium'>{copy.donorEmailLabel}</span>
                  <Input name='donorEmail' type='email' placeholder={copy.donorEmailPlaceholder} autoComplete='email' />
                </label>
              </div>

              <Button type='submit' size='lg' disabled={!isStripeConfigured} className='w-fit rounded-full'>
                <HeartHandshakeIcon />
                {copy.submit}
              </Button>
            </div>
          </form>
        </div>

        <aside className='space-y-4'>
          <Card className='rounded-md'>
            <CardHeader>
              <CardTitle>{copy.impactTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className='space-y-3 text-sm leading-6'>
                {copy.impactItems.map(item => (
                  <li key={item} className='flex gap-2'>
                    <HeartHandshakeIcon className='text-primary mt-1 size-4 shrink-0' />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className='rounded-md'>
            <CardHeader>
              <CardTitle>{copy.securityTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground flex gap-2 text-sm leading-6'>
                <LockKeyholeIcon className='text-primary mt-1 size-4 shrink-0' />
                <span>{copy.securityDescription}</span>
              </p>
              <Button variant='link' className='mt-3 h-auto p-0' asChild>
                <Link href={locale === 'fr' ? '/fr' : '/'}>{locale === 'fr' ? "Retour a l'accueil" : 'Back home'}</Link>
              </Button>
            </CardContent>
          </Card>
        </aside>
      </section>
    </main>
  )
}

export default DonatePage
