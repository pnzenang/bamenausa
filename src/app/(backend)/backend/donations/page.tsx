import { CreditCardIcon, DownloadIcon, HeartHandshakeIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const donations = [
  {
    donor: 'M. Fotso',
    campaign: 'Culture preservation',
    amount: '$250',
    status: 'Recorded'
  },
  {
    donor: 'A. Kamga',
    campaign: 'Youth mentorship',
    amount: '$100',
    status: 'Recorded'
  },
  {
    donor: 'Community table',
    campaign: 'Annual gala',
    amount: '$1,200',
    status: 'Pending'
  }
]

const DonationsPage = () => {
  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <Badge variant='outline'>Donations</Badge>
          <h2 className='mt-2 text-3xl font-semibold tracking-normal'>Giving ledger</h2>
          <p className='text-muted-foreground mt-2'>Placeholder donation records for campaigns and reporting.</p>
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
            <CardDescription>Preview data</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-4xl font-semibold'>$18,400</p>
            <p className='text-muted-foreground mt-2 flex items-center gap-2 text-sm'>
              <HeartHandshakeIcon className='size-4' />
              Connect payment provider later
            </p>
          </CardContent>
        </Card>

        <Card className='rounded-md'>
          <CardHeader>
            <CardTitle>Recent gifts</CardTitle>
            <CardDescription>Sample rows for future donation imports.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='divide-y rounded-md border'>
              {donations.map(donation => (
                <div
                  key={`${donation.donor}-${donation.campaign}`}
                  className='grid gap-3 p-4 md:grid-cols-[minmax(0,1fr)_180px_90px_110px] md:items-center'
                >
                  <p className='font-medium'>{donation.donor}</p>
                  <p className='text-muted-foreground flex items-center gap-2 text-sm'>
                    <CreditCardIcon className='size-4' />
                    {donation.campaign}
                  </p>
                  <p className='font-medium'>{donation.amount}</p>
                  <Badge variant={donation.status === 'Recorded' ? 'default' : 'outline'}>{donation.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DonationsPage
