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
}[]

type CulturalProgramsProps = {
  programs: CulturalProgram
  copy: Pick<SiteContent['programs'], 'eyebrow' | 'title' | 'description'>
}

const CulturalPrograms = ({ programs, copy }: CulturalProgramsProps) => {
  return (
    <section id='programs' className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto mb-12 flex max-w-2xl flex-col items-center justify-center space-y-4 text-center sm:mb-16 lg:mb-24'>
          <Badge variant='outline' className='text-sm font-normal'>
            {copy.eyebrow}
          </Badge>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>{copy.title}</h2>
          <p className='text-muted-foreground text-xl'>{copy.description}</p>
        </div>

        <div className='grid gap-6 md:grid-cols-2 lg:gap-y-10 xl:grid-cols-4'>
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
                    className='aspect-video w-full object-cover object-[center_40%]'
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
