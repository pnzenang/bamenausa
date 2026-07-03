import { Badge } from '@/components/ui/badge'

import { publicPageContent } from '@/assets/data/public-pages'

import type { Locale } from '@/lib/i18n'

type NecrologyPageProps = {
  locale: Locale
}

const NecrologyPage = ({ locale }: NecrologyPageProps) => {
  const content = publicPageContent[locale].necrology

  return (
    <section className='bg-muted/30 min-h-screen px-4 pb-16 pt-32 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-5xl space-y-10'>
        <div className='mx-auto max-w-3xl space-y-4 text-center'>
          <Badge variant='outline'>{content.badge}</Badge>
          <h1 className='text-3xl font-bold text-balance sm:text-4xl'>{content.title}</h1>
          <p className='text-muted-foreground text-lg text-balance'>{content.description}</p>
        </div>

        <div className='bg-background mx-auto max-w-3xl rounded-md border p-6 shadow-sm sm:p-8'>
          <div className='space-y-3'>
            <p className='text-primary text-sm font-semibold'>{content.placeholderEyebrow}</p>
            <h2 className='text-2xl font-semibold text-balance'>{content.placeholderTitle}</h2>
            <p className='text-muted-foreground text-base leading-7'>{content.placeholderDescription}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NecrologyPage
