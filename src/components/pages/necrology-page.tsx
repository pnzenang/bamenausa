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
      <div className='mx-auto flex min-h-[calc(100vh-12rem)] w-full max-w-7xl flex-col gap-10'>
        <div className='mx-auto w-full max-w-5xl space-y-4 text-center'>
          <Badge variant='outline'>{content.badge}</Badge>
          <h1 className='text-4xl leading-tight font-bold text-balance sm:text-5xl lg:text-6xl'>{content.title}</h1>
          <p className='text-muted-foreground mx-auto max-w-3xl text-lg text-balance sm:text-xl'>
            {content.description}
          </p>
        </div>

        <div className='bg-background flex flex-1 items-center justify-center rounded-md border p-6 shadow-sm sm:p-10 lg:p-14'>
          <div className='mx-auto max-w-4xl space-y-4 text-center'>
            <p className='text-primary text-sm font-semibold'>{content.placeholderEyebrow}</p>
            <h2 className='text-3xl font-semibold text-balance sm:text-4xl'>{content.placeholderTitle}</h2>
            <p className='text-muted-foreground text-lg leading-8'>{content.placeholderDescription}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NecrologyPage
