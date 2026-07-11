'use client'

import type { ReactNode } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import {
  CalendarDaysIcon,
  ChevronRightIcon,
  CreditCardIcon,
  FileTextIcon,
  HomeIcon,
  LogOutIcon,
  SettingsIcon,
  UserCircleIcon,
  UsersRoundIcon
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { profilePath } from '@/lib/auth'
import { getLocaleHomeHref, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

import BamenaLogo from '@/assets/svg/bamena-logo'

type BackendShellProps = {
  children: ReactNode
  localePreference: Locale
}

const backendNavigation = [
  {
    title: 'Overview',
    href: '/backend',
    icon: HomeIcon
  },
  {
    title: 'Members',
    href: '/backend/members',
    icon: UsersRoundIcon
  },
  {
    title: 'Events',
    href: '/backend/events',
    icon: CalendarDaysIcon
  },
  {
    title: 'Meetings',
    href: '/backend/meetings',
    icon: FileTextIcon
  },
  {
    title: 'Donations',
    href: '/backend/donations',
    icon: CreditCardIcon
  },
  {
    title: 'Settings',
    href: '/backend/settings',
    icon: SettingsIcon
  }
]

const BackendShell = ({ children, localePreference }: BackendShellProps) => {
  const pathname = usePathname()
  const publicSiteHref = getLocaleHomeHref(localePreference)

  return (
    <div className='bg-muted/30 text-foreground min-h-screen'>
      <aside className='bg-background fixed inset-y-0 left-0 hidden w-64 border-r lg:flex lg:flex-col'>
        <div className='flex h-16 items-center gap-3 px-5'>
          <BamenaLogo className='h-12 w-12 object-contain sm:h-12 sm:w-12' />
          <div>
            <p className='font-semibold'>Bamena-USA</p>
            <p className='text-muted-foreground text-xs'>Protected backend</p>
          </div>
        </div>
        <Separator />
        <nav className='flex flex-1 flex-col gap-1 px-3 py-4'>
          {backendNavigation.map(item => {
            const Icon = item.icon
            const isActive = item.href === '/backend' ? pathname === item.href : pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive && 'bg-primary/10 text-primary'
                )}
              >
                <Icon className='size-4' />
                {item.title}
              </Link>
            )
          })}
        </nav>
        <div className='p-3'>
          <Button variant='outline' className='mb-2 w-full justify-start' asChild>
            <Link href={profilePath}>
              <UserCircleIcon />
              Profile
            </Link>
          </Button>
          <Button variant='outline' className='w-full justify-start' asChild>
            <Link href={publicSiteHref}>
              <LogOutIcon />
              Public site
            </Link>
          </Button>
        </div>
      </aside>

      <div className='lg:pl-64'>
        <header className='bg-background/95 sticky top-0 z-40 border-b backdrop-blur'>
          <div className='flex min-h-16 flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8'>
            <div className='flex flex-wrap items-center justify-between gap-3'>
              <div>
                <p className='text-muted-foreground flex items-center gap-1 text-sm'>
                  Backend
                  <ChevronRightIcon className='size-3' />
                  Placeholder
                </p>
                <h1 className='text-xl font-semibold'>Community management</h1>
              </div>
              <div className='flex items-center gap-3'>
                <Badge variant='outline'>Clerk protected</Badge>
                <UserButton userProfileMode='navigation' userProfileUrl={profilePath} />
              </div>
            </div>
            <nav className='flex gap-2 overflow-x-auto pb-1 lg:hidden'>
              {backendNavigation.map(item => {
                const Icon = item.icon
                const isActive = item.href === '/backend' ? pathname === item.href : pathname.startsWith(item.href)

                return (
                  <Button key={item.href} variant={isActive ? 'default' : 'outline'} size='sm' asChild>
                    <Link href={item.href}>
                      <Icon />
                      {item.title}
                    </Link>
                  </Button>
                )
              })}
            </nav>
          </div>
        </header>

        <main className='px-4 py-6 sm:px-6 lg:px-8'>{children}</main>
      </div>
    </div>
  )
}

export default BackendShell
