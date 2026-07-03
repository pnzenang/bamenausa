'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { UserButton, useUser } from '@clerk/nextjs'
import { LogInIcon, MenuIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import MenuDropdown from '@/components/blocks/menu-dropdown'
import MenuNavigation from '@/components/blocks/menu-navigation'
import { ModeToggle } from '@/components/layout/mode-toggle'

import { siteContent } from '@/assets/data/site-content'

import { profilePath, signInPath } from '@/lib/auth'
import { getAlternateLocaleHref, getLocaleFromPathname, getLocaleHomeHref } from '@/lib/i18n'
import { cn } from '@/lib/utils'

import BamenaLogo from '@/assets/svg/bamena-logo'

// Active section hook based on which section is closest to the top of the
// viewport (accounts for header offset). This is more deterministic than
// an IntersectionObserver for this layout and avoids lingering active states.
const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    if (!sectionIds || sectionIds.length === 0) return

    const headerHeight = 80

    const update = () => {
      let closestId = ''
      let minDistance = Number.POSITIVE_INFINITY

      sectionIds.forEach(id => {
        const el = document.getElementById(id)

        if (!el) return

        const rectTop = el.getBoundingClientRect().top - headerHeight
        const distance = Math.abs(rectTop)

        if (distance < minDistance) {
          minDistance = distance
          closestId = id
        }
      })

      // Only set an active section when it's reasonably close to the
      // viewport top. This prevents a stale/incorrect active state when
      // the user has scrolled elsewhere on the page.
      const activationThreshold = 200 // px

      if (minDistance <= activationThreshold) {
        setActiveSection(closestId)
      } else {
        setActiveSection('')
      }
    }

    // Update on scroll and resize and run once to initialise
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [sectionIds])

  return activeSection
}

type HeaderProps = {
  className?: string
}

const Header = ({ className }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { isLoaded, isSignedIn } = useUser()
  const locale = getLocaleFromPathname(pathname)
  const content = siteContent[locale]
  const homeHref = getLocaleHomeHref(locale)
  const isHomePage = pathname === homeHref
  const alternateLocaleHref = getAlternateLocaleHref(locale)

  const navigationData = isHomePage
    ? content.navigation
    : content.navigation.map(item => (item.href?.startsWith('#') ? { ...item, href: `${homeHref}${item.href}` } : item))

  // Extract section IDs from navigation data - only include valid sections
  const sectionIds = isHomePage
    ? (navigationData.map(item => item.href?.replace('#', '')).filter(Boolean) as string[])
    : []

  // Only use active section if it's actually in our navigation list
  const detectedActiveSection = useActiveSection(sectionIds)
  const activeSection = sectionIds.includes(detectedActiveSection) ? detectedActiveSection : ''

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 z-50 h-24 w-full border-b transition-all duration-300',
        {
          'bg-background shadow-md': isScrolled
        },
        className
      )}
    >
      <div className='mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8'>
        {/* Logo */}
        <Link href={`${homeHref}#home`} className='flex items-center gap-2'>
          <BamenaLogo />
          <h1 className='text-primary hidden text-3xl font-extrabold sm:block'>
            <span>Bamena</span>
            <span className='px-1 text-white'>-</span>
            <span className='text-red-500'>USA</span>
          </h1>
        </Link>

        {/* Navigation */}
        <MenuNavigation
          navigationData={navigationData}
          activeSection={activeSection}
          className='**:data-[slot=navigation-menu-list]:gap-1 max-lg:hidden'
        />

        {/* Actions */}
        <div className='flex items-center'>
          <ModeToggle />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='outline' size='icon' className='ml-2 rounded-full text-xs font-semibold' asChild>
                <Link href={alternateLocaleHref} scroll={!isHomePage} aria-label={content.header.languageToggleLabel}>
                  {content.header.languageToggleText}
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{content.header.languageToggleLabel}</TooltipContent>
          </Tooltip>
          {isLoaded && !isSignedIn && (
            <>
              <Button
                className='group relative ml-4 w-fit overflow-hidden rounded-full text-base before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] has-[>svg]:px-6 max-sm:hidden dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)]'
                asChild
              >
                <Link href={signInPath}>
                  {content.header.loginCta}
                  <LogInIcon />
                </Link>
              </Button>

              {/* Mobile login button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className='ml-4 rounded-full sm:hidden' size='icon' asChild>
                    <Link href={signInPath}>
                      <LogInIcon />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{content.header.loginTooltip}</TooltipContent>
              </Tooltip>
            </>
          )}

          {isLoaded && isSignedIn && (
            <div className='ml-4 flex items-center'>
              <UserButton
                userProfileMode='navigation'
                userProfileUrl={profilePath}
                appearance={{
                  elements: {
                    userButtonAvatarBox: 'size-7',
                    userButtonTrigger:
                      'border-input bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 flex size-9 items-center justify-center rounded-full border shadow-xs'
                  }
                }}
              />
            </div>
          )}

          {/* Mobile menu button */}
          <MenuDropdown
            align='end'
            navigationData={navigationData}
            activeSection={activeSection}
            trigger={
              <Button variant='outline' size='icon' className='ml-3 rounded-full lg:hidden'>
                <MenuIcon />
                <span className='sr-only'>{content.header.menuLabel}</span>
              </Button>
            }
          />
        </div>
      </div>
    </header>
  )
}

export default Header
