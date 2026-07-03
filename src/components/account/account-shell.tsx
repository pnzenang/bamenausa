'use client'

import type { ReactNode } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { HomeIcon, ShieldCheckIcon, UserCircleIcon, UsersRoundIcon, WalletCardsIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { accountPath, adminPath, fullMembersPath, profilePath } from '@/lib/auth'
import { cn } from '@/lib/utils'

import BamenaLogo from '@/assets/svg/bamena-logo'

type AccountShellProps = {
  children: ReactNode
  isAdmin: boolean
  userEmail: string
  userName: string
}

const memberNavigation = [
  {
    title: 'Profile',
    href: profilePath,
    icon: UserCircleIcon
  },
  {
    title: 'My Account',
    href: accountPath,
    icon: WalletCardsIcon
  },
  {
    title: 'All Members',
    href: fullMembersPath,
    icon: UsersRoundIcon
  }
]

const AccountShell = ({ children, isAdmin, userEmail, userName }: AccountShellProps) => {
  const pathname = usePathname()

  const navigation = isAdmin
    ? [
        ...memberNavigation,
        {
          title: 'Admin',
          href: adminPath,
          icon: ShieldCheckIcon
        }
      ]
    : memberNavigation

  return (
    <div className='bg-muted/30 min-h-screen'>
      <aside className='bg-background fixed inset-y-0 left-0 hidden w-64 border-r lg:flex lg:flex-col'>
        <div className='flex h-20 items-center gap-3 px-5'>
          <BamenaLogo className='h-13 w-13 object-contain sm:h-13 sm:w-13' />
          <div className='min-w-0'>
            <p className='truncate font-semibold'>Bamena-USA</p>
            <p className='text-muted-foreground truncate text-xs'>Member area</p>
          </div>
        </div>

        <Separator />

        <nav className='flex flex-1 flex-col gap-1 px-3 py-4'>
          {navigation.map(item => {
            const Icon = item.icon
            const isActive = pathname === item.href

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

        <div className='space-y-3 p-4'>
          <div className='min-w-0 rounded-md border p-3'>
            <p className='truncate text-sm font-medium'>{userName}</p>
            <p className='text-muted-foreground truncate text-xs'>{userEmail}</p>
          </div>
          <Button variant='outline' className='w-full justify-start' asChild>
            <Link href='/'>
              <HomeIcon />
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
                <p className='text-muted-foreground text-sm'>Bamena-USA</p>
                <h1 className='text-xl font-semibold'>Member area</h1>
              </div>
              <UserButton userProfileMode='navigation' userProfileUrl={accountPath} />
            </div>

            <nav className='flex gap-2 overflow-x-auto pb-1 lg:hidden'>
              {navigation.map(item => {
                const Icon = item.icon
                const isActive = pathname === item.href

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

        <main className='px-4 py-8 sm:px-6 lg:px-8'>{children}</main>
      </div>
    </div>
  )
}

export default AccountShell
