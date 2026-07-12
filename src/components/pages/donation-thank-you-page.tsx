import Link from 'next/link'
import { CheckCircle2Icon, HeartHandshakeIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import type { Locale } from '@/lib/i18n'

const thankYouCopy = {
  en: {
    title: 'Thank you for supporting Bamena-USA.',
    description:
      'Your donation checkout was completed securely. Stripe will send the receipt, and the confirmed payment will appear in the admin donation ledger.',
    recorded: 'Recorded in the donation ledger.',
    pending: 'The ledger is updating. If it does not appear soon, check the Stripe webhook listener.',
    donateAgain: 'Donate again',
    home: 'Home'
  },
  fr: {
    title: 'Merci de soutenir Bamena-USA.',
    description:
      "Votre paiement a ete finalise de facon securisee. Stripe enverra le recu et le paiement confirme apparaitra dans le registre admin des dons.",
    recorded: 'Inscrit dans le registre des dons.',
    pending:
      "Le registre est en cours de mise a jour. Si le don n'apparait pas bientot, verifiez l'ecouteur webhook Stripe.",
    donateAgain: 'Faire un autre don',
    home: 'Accueil'
  }
} as const

type DonationThankYouPageProps = {
  locale: Locale
  ledgerStatus?: 'pending' | 'recorded'
}

const DonationThankYouPage = ({ ledgerStatus = 'pending', locale }: DonationThankYouPageProps) => {
  const copy = thankYouCopy[locale]
  const homeHref = locale === 'fr' ? '/fr' : '/'
  const donateHref = locale === 'fr' ? '/fr/donate' : '/donate'

  return (
    <main className='bg-background flex min-h-screen items-center pt-24'>
      <section className='mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8'>
        <div className='mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600'>
          <CheckCircle2Icon className='size-9' />
        </div>
        <h1 className='mt-6 text-4xl font-semibold text-balance md:text-5xl'>{copy.title}</h1>
        <p className='text-muted-foreground mx-auto mt-4 max-w-2xl text-lg leading-8'>{copy.description}</p>
        <p className='text-muted-foreground mx-auto mt-3 max-w-xl text-sm'>
          {ledgerStatus === 'recorded' ? copy.recorded : copy.pending}
        </p>
        <div className='mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row'>
          <Button asChild className='rounded-full'>
            <Link href={donateHref}>
              <HeartHandshakeIcon />
              {copy.donateAgain}
            </Link>
          </Button>
          <Button variant='outline' asChild className='rounded-full'>
            <Link href={homeHref}>{copy.home}</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}

export default DonationThankYouPage
