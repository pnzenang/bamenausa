import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

import type { SiteContent } from '@/assets/data/site-content'

type CulturalProgram = {
  image: string
  alt: string
  name: string
  type: string
  description: string
  imageFit?: 'cover' | 'contain'
}[]

type CulturalProgramsProps = {
  programs: CulturalProgram
  copy: Pick<SiteContent['programs'], 'eyebrow' | 'title' | 'description'>
}

const CulturalPrograms = ({ programs, copy }: CulturalProgramsProps) => {
  return (
    <section id='programs' className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto mb-12 flex max-w-6xl flex-col items-center justify-center space-y-4 text-center sm:mb-16 lg:mb-24'>
          <Badge variant='outline' className='text-sm font-normal'>
            {copy.eyebrow}
          </Badge>
          <h2 className='text-3xl leading-tight font-semibold text-balance md:text-4xl lg:text-5xl xl:whitespace-nowrap'>
            {copy.title}
          </h2>
          <p className='text-muted-foreground max-w-2xl text-xl'>{copy.description}</p>
        </div>

        <div className='grid gap-6 md:grid-cols-3 lg:gap-y-10'>
          {programs.map((program, index) => (
            <Card
              key={index}
              className='hover:border-primary overflow-hidden rounded-none py-0 shadow-none transition-colors duration-300'
            >
              <CardContent className='px-0'>
                <div className='bg-muted'>
                  <img
                    src={program.image}
                    alt={program.alt}
                    loading='lazy'
                    decoding='async'
                    className={`aspect-[3/4] w-full object-center ${
                      program.imageFit === 'contain' ? 'object-contain' : 'object-cover'
                    }`}
                  />
                </div>
                <div className='space-y-3 px-6 py-5'>
                  <CardTitle className='text-lg'>{program.name}</CardTitle>
                  <Separator />
                  <div className='text-muted-foreground'>
                    <p className='text-primary mb-1 text-base font-medium'>{program.type}</p>
                    <p>{program.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CulturalPrograms
