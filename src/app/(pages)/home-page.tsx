import CulturalPrograms from '@/components/blocks/popular-dishes/popular-dishes'
import AboutUs from '@/components/blocks/about-us-section/about-us-page'
import Testimonials from '@/components/blocks/testimonials-section/testimonials-section'
import Initiatives from '@/components/blocks/new-items-section/new-items'
import ContactUs from '@/components/blocks/contact-us-section/contact-us-page'
import GivingSection from '@/components/blocks/offers-section/offers-section'
import VideoHeroSection from '@/components/blocks/video-hero-section/video-hero-section'

import { getSiteContent } from '@/assets/data/site-content'

import type { Locale } from '@/lib/i18n'

type HomePageProps = {
  locale: Locale
}

const siteUrl = (process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000').replace(/\/$/, '')

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
      <section id='home' className='mt-10 flex flex-col sm:mt-36'>
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
