import type { ReactNode } from 'react'

import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import PageTransition from '@/components/layout/page-transition'

const PagesLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div className='flex flex-col'>
      {/* Header Section */}
      <Header />

      {/* Main Content */}
      <PageTransition>{children}</PageTransition>

      {/* Footer Section */}
      <Footer />
    </div>
  )
}

export default PagesLayout
