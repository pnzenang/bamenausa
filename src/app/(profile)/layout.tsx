import type { ReactNode } from 'react'

import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'

import AccountShell from '@/components/account/account-shell'

import { isAdminUser, signInPath } from '@/lib/auth'

const ProfileLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  const user = await currentUser()

  if (!user) {
    redirect(signInPath)
  }

  const userName = (user.fullName ?? [user.firstName, user.lastName].filter(Boolean).join(' ')) || 'Bamena-USA member'
  const userEmail = user.primaryEmailAddress?.emailAddress ?? 'No email on file'

  return (
    <AccountShell isAdmin={isAdminUser(user)} userName={userName} userEmail={userEmail}>
      {children}
    </AccountShell>
  )
}

export default ProfileLayout
