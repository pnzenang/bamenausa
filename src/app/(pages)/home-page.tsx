import CulturalPrograms from '@/components/blocks/popular-dishes/popular-dishes'
import AboutUs from '@/components/blocks/about-us-section/about-us-page'
import Testimonials from '@/components/blocks/testimonials-section/testimonials-section'
import Initiatives from '@/components/blocks/new-items-section/new-items'
import ContactUs from '@/components/blocks/contact-us-section/contact-us-page'
import GivingSection from '@/components/blocks/offers-section/offers-section'
import VideoHeroSection from '@/components/blocks/video-hero-section/video-hero-section'

import { getSiteContent } from '@/assets/data/site-content'

import type { Locale } from '@/lib/i18n'
import { getSiteUrl } from '@/lib/site-url'

type HomePageProps = {
  locale: Locale
}

const siteUrl = getSiteUrl()

const buildJsonLd = (locale: Locale) => {
  const content = getSiteContent(locale)
  const pageUrl = `${siteUrl}${locale === 'fr' ? '/fr' : ''}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${pageUrl}#website`,
        name: 'Bamena-USA',
        description: content.jsonLd.websiteDescription,
        url: pageUrl,
        inLanguage: content.jsonLd.inLanguage
      },
      {
        '@type': 'NGO',
        '@id': `${pageUrl}#organization`,
        name: 'Bamena-USA',
        url: pageUrl,
        description: content.jsonLd.organizationDescription,
        nonprofitStatus: 'Nonprofit501c3',
        areaServed: 'United States',
        inLanguage: content.jsonLd.inLanguage
      }
    ]
  }
}

const HomePage = ({ locale }: HomePageProps) => {
  const content = getSiteContent(locale)

  return (
    <>
      <section id='home' className='flex min-h-[calc(100svh-4.375rem)] flex-col justify-center py-6 sm:py-8 lg:py-10'>
        <VideoHeroSection copy={content.hero} />
      </section>
      <CulturalPrograms programs={content.programs.items} copy={content.programs} />
      <AboutUs stats={content.about.stats} copy={content.about} />
      <Testimonials testimonials={content.testimonials.items} copy={content.testimonials} />
      <Initiatives initiatives={content.initiatives.items} copy={content.initiatives} />
      <ContactUs contactInfo={content.contact.items} copy={content.contact} />
      <GivingSection galleryImage={content.giving.images} copy={content.giving} />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildJsonLd(locale)).replace(/</g, '\\u003c')
        }}
      />
    </>
  )
}

export default HomePage
