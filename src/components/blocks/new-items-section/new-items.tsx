import { ArrowRightIcon } from 'lucide-react'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardTitle, CardDescription, CardHeader, CardFooter } from '@/components/ui/card'

import type { SiteContent } from '@/assets/data/site-content'

type Initiative = {
  img: string
  alt: string
  title: string
  description: string
  blogLink: string
}[]

type InitiativesProps = {
  initiatives: Initiative
  copy: Pick<SiteContent['initiatives'], 'eyebrow' | 'title' | 'description' | 'learnMore'>
}

const Initiatives = ({ initiatives, copy }: InitiativesProps) => {
  return (
    <section id='initiatives' className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mx-auto mb-12 flex max-w-6xl flex-col items-center justify-center space-y-4 text-center sm:mb-16 lg:mb-24'>
          <Badge variant='outline' className='text-sm font-normal'>
            {copy.eyebrow}
          </Badge>
          <h2 className='text-3xl leading-tight font-semibold text-balance md:text-4xl lg:text-5xl xl:whitespace-nowrap'>
            {copy.title}
          </h2>
          <p className='text-muted-foreground max-w-2xl text-xl'>{copy.description}</p>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {initiatives.map((item, index) => (
            <Card
              className='hover:border-primary rounded-none pt-0 shadow-none transition-colors duration-300 max-lg:last:col-span-full'
              key={index}
            >
              <CardContent className='px-0'>
                <img
                  src={item.img}
                  alt={item.alt}
                  loading='lazy'
                  decoding='async'
                  className='aspect-video h-60 w-full object-cover object-[center_40%]'
                />
              </CardContent>
              <CardHeader className='mb-2 gap-3'>
                <CardTitle className='text-xl'>
                  <Link href='#'>{item.title}</Link>
                </CardTitle>
                <CardDescription className='text-base'>{item.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  className='group bg-primary/10 hover:bg-primary/20 text-primary rounded-full text-sm has-[>svg]:px-6'
                  size='lg'
                  asChild
                >
                  <Link href={item.blogLink}>
                    {copy.learnMore}
                    <ArrowRightIcon className='transition-transform duration-200 group-hover:translate-x-0.5' />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Initiatives
