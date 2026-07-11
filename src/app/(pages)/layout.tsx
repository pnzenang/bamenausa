import type { ReactNode } from 'react'

import { currentUser } from '@clerk/nextjs/server'

import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import PageTransition from '@/components/layout/page-transition'

import { isAdminUser } from '@/lib/auth'

const PagesLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  const user = await currentUser()

  return (
    <div className='flex flex-col'>
      {/* Header Section */}
      <Header isAdmin={isAdminUser(user)} />

      {/* Main Content */}
      <PageTransition>{children}</PageTransition>

      {/* Footer Section */}
      <Footer />
    </div>
  )
}

export default PagesLayout
