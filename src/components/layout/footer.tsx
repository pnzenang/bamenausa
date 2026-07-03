'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Separator } from '@/components/ui/separator'

import { siteContent } from '@/assets/data/site-content'
import BamenaLogo from '@/assets/svg/bamena-logo'

import { getLocaleFromPathname, getLocaleHomeHref } from '@/lib/i18n'
import { scrollToSection } from '@/lib/utils'

const Footer = () => {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const content = siteContent[locale]
  const homeHref = getLocaleHomeHref(locale)
  const isHomePage = pathname === homeHref

  const footerNavigation = content.footer.navigation.map(item => ({
    ...item,
    href: !isHomePage && item.href.startsWith('#') ? `${homeHref}${item.href}` : item.href
  }))

  return (
    <footer className='bg-muted' style={{ clipPath: 'polygon(0 16px, 100% 0, 100% 100%, 0 100%)' }}>
      <div className='mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 max-md:flex-col sm:px-6 sm:py-6 md:gap-6 md:py-8'>
        <Link href={`${homeHref}#home`}>
          <div className='flex items-center gap-3'>
            <BamenaLogo />
          </div>
        </Link>

        <div className='flex items-center gap-5 whitespace-nowrap'>
          {footerNavigation.map(item => {
            const isSectionLink = item.href.startsWith('#')

            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={e => {
                  if (!isSectionLink) return

                  e.preventDefault()
                  scrollToSection(item.href.replace('#', ''))
                }}
                className='text-foreground hover:text-primary text-base! hover:bg-transparent'
              >
                {item.title}
              </Link>
            )
          })}
        </div>

        <div className='flex items-center gap-4'>
          <h1>{content.footer.nonprofitLabel}</h1>
        </div>
      </div>

      <Separator />

      <div className='mx-auto flex max-w-7xl justify-center px-4 py-8 sm:px-6'>
        <p className='text-center text-balance'>
          {`©${new Date().getFullYear()}`}{' '}
          <Link href={`${homeHref}#home`} className='font-bold hover:underline'>
            Bamena-USA
          </Link>
          , {content.footer.copyrightTagline}
        </p>
      </div>
    </footer>
  )
}

export default Footer
