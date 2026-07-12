import { CreditCardIcon, DatabaseIcon, DownloadIcon, HeartHandshakeIcon, RepeatIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import {
  formatDonationAmount,
  getDonationSummary,
  listDonationRecordsWithTimeout,
  type DonationRecord
} from '@/lib/donations'
import { isStripeDonationConfigured } from '@/lib/stripe-checkout'

const formatDonationDate = (date: Date | null) => {
  if (!date) return 'Stripe date pending'

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date)
}

const getDonorLabel = (donation: DonationRecord) => {
  return donation.donorName || donation.donorEmail || 'Anonymous donor'
}

const DonationsPage = async () => {
  let donations: DonationRecord[] = []
  let donationLoadError = ''

  try {
    donations = await listDonationRecordsWithTimeout()
  } catch (error) {
    donationLoadError = error instanceof Error ? error.message : 'Donation records could not be loaded.'
  }

  const summary = getDonationSummary(donations)
  const isStripeConfigured = isStripeDonationConfigured()

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <Badge variant='outline'>Donations</Badge>
          <h2 className='mt-2 text-3xl font-semibold tracking-normal'>Giving ledger</h2>
          <p className='text-muted-foreground mt-2'>Stripe donation records for campaigns and reporting.</p>
        </div>
        <Button disabled>
          <DownloadIcon />
          Export
        </Button>
      </div>

      <div className='grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]'>
        <Card className='rounded-md'>
          <CardHeader>
            <CardTitle>Total recorded</CardTitle>
            <CardDescription>Paid Stripe donations</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-4xl font-semibold'>{formatDonationAmount(summary.totalCents)}</p>
            <p className='text-muted-foreground mt-2 flex items-center gap-2 text-sm'>
              <HeartHandshakeIcon className='size-4' />
              {summary.paidCount} confirmed gift{summary.paidCount === 1 ? '' : 's'}
            </p>
            <p className='text-muted-foreground mt-2 flex items-center gap-2 text-sm'>
              <RepeatIcon className='size-4' />
              {summary.monthlyCount} monthly donor{summary.monthlyCount === 1 ? '' : 's'}
            </p>
          </CardContent>
        </Card>

        <Card className='rounded-md'>
          <CardHeader>
            <CardTitle>Recent gifts</CardTitle>
            <CardDescription>
              {isStripeConfigured ? 'Confirmed payments from Stripe webhooks.' : 'Stripe keys still need configuration.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {donationLoadError ? (
              <div className='text-muted-foreground flex gap-3 rounded-md border p-4 text-sm'>
                <DatabaseIcon className='mt-0.5 size-4 shrink-0' />
                <div>
                  <p className='font-medium text-foreground'>Donation ledger is not available yet.</p>
                  <p className='mt-1'>{donationLoadError}</p>
                </div>
              </div>
            ) : donations.length > 0 ? (
              <div className='divide-y rounded-md border'>
                {donations.map(donation => (
                  <div
                    key={donation.stripeCheckoutSessionId}
                    className='grid gap-3 p-4 md:grid-cols-[minmax(0,1fr)_180px_110px_130px_150px] md:items-center'
                  >
                    <div>
                      <p className='font-medium'>{getDonorLabel(donation)}</p>
                      {donation.donorEmail && donation.donorName && (
                        <p className='text-muted-foreground text-sm'>{donation.donorEmail}</p>
                      )}
                    </div>
                    <p className='text-muted-foreground flex items-center gap-2 text-sm'>
                      <CreditCardIcon className='size-4' />
                      {donation.campaignName}
                    </p>
                    <p className='font-medium'>{formatDonationAmount(donation.amountTotal, donation.currency)}</p>
                    <Badge variant={donation.paymentStatus === 'paid' ? 'default' : 'outline'}>
                      {donation.frequency === 'monthly' ? 'Monthly' : 'One-time'} · {donation.paymentStatus || 'Pending'}
                    </Badge>
                    <p className='text-muted-foreground text-sm'>{formatDonationDate(donation.stripeCreatedAt)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-muted-foreground rounded-md border p-4 text-sm'>
                No Stripe donations have been recorded yet. Confirmed payments will appear here after the webhook
                receives `checkout.session.completed`.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DonationsPage
