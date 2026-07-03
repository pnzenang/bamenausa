import { ArrowRightIcon, CalendarDaysIcon, CreditCardIcon, UsersRoundIcon, WalletCardsIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const stats = [
  {
    title: 'Members',
    value: '128',
    detail: '24 pending profiles',
    icon: UsersRoundIcon
  },
  {
    title: 'Events',
    value: '6',
    detail: '2 need volunteers',
    icon: CalendarDaysIcon
  },
  {
    title: 'Donations',
    value: '$18.4k',
    detail: 'Placeholder total',
    icon: CreditCardIcon
  },
  {
    title: 'Campaigns',
    value: '3',
    detail: 'Culture, youth, families',
    icon: WalletCardsIcon
  }
]

const tasks = [
  {
    title: 'Review new member signups',
    owner: 'Secretary',
    status: 'Ready'
  },
  {
    title: 'Confirm gala volunteer schedule',
    owner: 'Events team',
    status: 'Draft'
  },
  {
    title: 'Publish youth workshop recap',
    owner: 'Communications',
    status: 'Queued'
  },
  {
    title: 'Reconcile donation imports',
    owner: 'Treasurer',
    status: 'Blocked'
  }
]

const BackendOverviewPage = () => {
  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-2'>
        <Badge variant='outline'>Overview</Badge>
        <h2 className='text-3xl font-semibold tracking-normal'>Backend dashboard</h2>
        <p className='text-muted-foreground max-w-3xl text-base'>
          Placeholder operating view for Bamena-USA member management, events, donations, and admin settings.
        </p>
      </div>

      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        {stats.map(item => {
          const Icon = item.icon

          return (
            <Card key={item.title} className='rounded-md'>
              <CardHeader className='flex-row items-center justify-between space-y-0'>
                <CardTitle className='text-sm font-medium'>{item.title}</CardTitle>
                <Icon className='text-muted-foreground size-4' />
              </CardHeader>
              <CardContent>
                <p className='text-3xl font-semibold'>{item.value}</p>
                <p className='text-muted-foreground mt-1 text-sm'>{item.detail}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className='rounded-md'>
        <CardHeader>
          <CardTitle>Operational queue</CardTitle>
          <CardDescription>Sample backend work items for the next admin pass.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='divide-y rounded-md border'>
            {tasks.map(task => (
              <div key={task.title} className='grid gap-3 p-4 sm:grid-cols-[minmax(0,1fr)_150px_110px] sm:items-center'>
                <div className='flex items-center gap-3'>
                  <ArrowRightIcon className='text-muted-foreground size-4' />
                  <span className='font-medium'>{task.title}</span>
                </div>
                <span className='text-muted-foreground text-sm'>{task.owner}</span>
                <Badge variant={task.status === 'Blocked' ? 'destructive' : 'outline'}>{task.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BackendOverviewPage
