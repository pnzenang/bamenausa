import { QuoteIcon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

import type { SiteContent } from '@/assets/data/site-content'

export type TestimonialItem = {
  name: string
  avatar: string
  content: string
}

type TestimonialsComponentProps = {
  testimonials: TestimonialItem[]
  copy: Pick<SiteContent['testimonials'], 'eyebrow' | 'titleLines' | 'description'>
}

const TestimonialsComponent = ({ testimonials, copy }: TestimonialsComponentProps) => {
  return (
    <section
      id='testimonials'
      className='before:border-primary/20 relative py-14 before:absolute before:inset-0 before:-z-10 before:-skew-y-3 before:border-b sm:py-28 lg:py-36'
    >
      <Carousel
        className='mx-auto flex max-w-7xl gap-12 px-4 max-sm:flex-col sm:items-center sm:gap-16 sm:px-6 lg:gap-24 lg:px-8'
        opts={{
          align: 'start',
          slidesToScroll: 1
        }}
      >
        {/* Left Content */}
        <div className='space-y-4 sm:w-1/2 lg:w-1/3'>
          <Badge variant='outline' className='text-sm font-normal'>
            {copy.eyebrow}
          </Badge>

          <h2 className='text-2xl font-semibold sm:text-3xl lg:text-4xl'>
            {copy.titleLines[0]} <br />
            {copy.titleLines[1]}
          </h2>

          <p className='text-muted-foreground text-xl'>{copy.description}</p>

          <div className='flex items-center gap-4'>
            <CarouselPrevious
              variant='default'
              className='disabled:bg-primary/10 disabled:text-primary static size-9 translate-y-0 rounded-full disabled:opacity-100'
            />
            <CarouselNext
              variant='default'
              className='disabled:bg-primary/10 disabled:text-primary static size-9 translate-y-0 rounded-full disabled:opacity-100'
            />
          </div>
        </div>

        {/* Right Testimonial Carousel */}
        <div className='relative max-w-196 sm:w-1/2 lg:w-2/3'>
          <CarouselContent className='sm:-ml-6'>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className='sm:pl-6 lg:basis-1/2'>
                <Card className='hover:border-primary h-full rounded-none transition-colors duration-300'>
                  <CardContent className='space-y-5'>
                    <div className='flex items-center gap-3'>
                      <Avatar className='size-10 rounded-full'>
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className='object-cover object-[center_38%]'
                        />
                        <AvatarFallback className='rounded-full text-sm'>
                          {testimonial.name
                            .split(' ', 2)
                            .map(n => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>

                      <div className='flex-1'>
                        <h4 className='font-medium'>{testimonial.name}</h4>
                      </div>
                    </div>

                    <div className='bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full'>
                      <QuoteIcon className='size-5' />
                    </div>
                    <p>{testimonial.content}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>
    </section>
  )
}

export default TestimonialsComponent
