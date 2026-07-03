'use client'

import type { ReactNode } from 'react'

import { usePathname } from 'next/navigation'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

type PageTransitionProps = {
  children: ReactNode
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion()

  return (
    <AnimatePresence mode='wait' initial={false}>
      <motion.main
        key={pathname}
        className='flex min-h-[calc(100vh-4.375rem)] flex-col pt-17.5 *:scroll-mt-16'
        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  )
}

export default PageTransition
