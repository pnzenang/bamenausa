import type { ReactNode } from 'react'

import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'

import BackendShell from '@/components/backend/backend-shell'

import { isAdminUser, profilePath, signInPath } from '@/lib/auth'
import { getRequestLocalePreference } from '@/lib/server-i18n'

export const metadata: Metadata = {
  title: 'Backend Preview',
  robots: {
    index: false,
    follow: false
  }
}

const BackendLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  const user = await currentUser()
  const localePreference = await getRequestLocalePreference()

  if (!user) {
    redirect(signInPath)
  }

  if (!isAdminUser(user)) {
    redirect(profilePath)
  }

  return <BackendShell localePreference={localePreference}>{children}</BackendShell>
}

export default BackendLayout
