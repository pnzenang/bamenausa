import type { Metadata } from 'next'
import { UserProfile } from '@clerk/nextjs'

import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'My Account'
}

const AccountPage = () => {
  return (
    <div className='mx-auto max-w-5xl space-y-8'>
      <div className='space-y-3'>
        <Badge variant='outline'>My Account</Badge>
        <div>
          <h1 className='text-3xl font-bold text-balance sm:text-4xl'>Manage your account</h1>
          <p className='text-muted-foreground mt-2 max-w-2xl text-lg'>
            Update your sign-in methods, security settings, and account preferences.
          </p>
        </div>
      </div>

      <UserProfile
        routing='hash'
        appearance={{
          elements: {
            rootBox: 'w-full',
            cardBox: 'w-full rounded-md shadow-sm',
            card: 'rounded-md border border-border shadow-none'
          }
        }}
      />
    </div>
  )
}

export default AccountPage
