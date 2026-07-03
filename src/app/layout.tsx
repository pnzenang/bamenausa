import type { ReactNode } from 'react'

import { ClerkProvider } from '@clerk/nextjs'
import { Geist_Mono, Merriweather, Outfit, Kaushan_Script } from 'next/font/google'
import type { Metadata } from 'next'

import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import LanguageDocumentSync from '@/components/language-document-sync'

import { profilePath, signInPath, signUpPath } from '@/lib/auth'
import { cn } from '@/lib/utils'

import './globals.css'

const outfitSans = Outfit({
  variable: '--font-outfit-sans',
  subsets: ['latin']
})

const merriweatherSerif = Merriweather({
  variable: '--font-merriweather-serif',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

const kaushanScript = Kaushan_Script({
  weight: '400',
  variable: '--font-kaushan-script',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: {
    template: '%s - Bamena-USA',
    default: 'Bamena-USA | Cultural Nonprofit Organization'
  },
  description:
    'Bamena-USA is a nonprofit cultural organization preserving heritage, connecting families, mentoring youth, and mobilizing community support across the diaspora.',
  robots: 'index,follow',
  keywords: ['Bamena-USA', 'Cultural nonprofit', 'Cameroonian diaspora', 'Community', 'Heritage'],
  icons: {
    icon: [
      {
        url: '/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png'
      },
      {
        url: '/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png'
      },
      {
        url: '/favicon/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon'
      }
    ],
    apple: [
      {
        url: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ],
    other: [
      {
        url: '/favicon/android-chrome-192x192.png',
        rel: 'icon',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        url: '/favicon/android-chrome-512x512.png',
        rel: 'icon',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  },
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}`),
  openGraph: {
    title: {
      template: '%s - Bamena-USA',
      default: 'Bamena-USA | Cultural Nonprofit Organization'
    },
    description:
      'Preserving Bamena heritage, strengthening families, mentoring youth, and celebrating culture through nonprofit community programs.',
    type: 'website',
    siteName: 'Bamena-USA',
    url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}`,
    images: [
      {
        url: '/images/culture/gala-2026/bamena-gala-home.jpg',
        type: 'image/jpeg',
        width: 1200,
        height: 1600,
        alt: 'Bamena-USA cultural community gathering'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      template: '%s - Bamena-USA',
      default: 'Bamena-USA | Cultural Nonprofit Organization'
    },
    description:
      'A nonprofit cultural organization preserving heritage, connecting families, mentoring youth, and mobilizing community support.'
  }
}

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html
      lang='en'
      className={cn(
        outfitSans.variable,
        merriweatherSerif.variable,
        geistMono.variable,
        kaushanScript.variable,
        'flex min-h-full w-full scroll-smooth antialiased'
      )}
      suppressHydrationWarning
    >
      <body className='flex min-h-full w-full flex-auto flex-col'>
        <ClerkProvider
          signInUrl={signInPath}
          signUpUrl={signUpPath}
          signInFallbackRedirectUrl={profilePath}
          signUpFallbackRedirectUrl={profilePath}
        >
          <ThemeProvider attribute='class' enableSystem={false} disableTransitionOnChange>
            <TooltipProvider>
              <LanguageDocumentSync />
              {children}
            </TooltipProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}

export default RootLayout
