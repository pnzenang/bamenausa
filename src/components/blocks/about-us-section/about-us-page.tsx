import Link from 'next/link'
import { ArrowRightIcon, type LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import type { SiteContent } from '@/assets/data/site-content'

type Stat = {
  icon: LucideIcon
  value: string
  description: [string, string]
}

type AboutUsProps = {
  stats: Stat[]
  copy: Pick<SiteContent['about'], 'eyebrow' | 'title' | 'description' | 'cta' | 'imageAlt'>
}

const AboutUs = ({ stats, copy }: AboutUsProps) => {
  return (
    <section
      id='about-us'
      className='before:bg-muted relative py-8 before:absolute before:inset-0 before:-z-10 before:skew-y-3 sm:py-16 lg:py-24'
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mx-auto mb-12 flex max-w-6xl flex-col items-center justify-center space-y-4 text-center md:mb-16 lg:mb-24'>
          <Badge variant='outline' className='text-sm font-normal'>
            {copy.eyebrow}
          </Badge>
          <h2 className='text-3xl leading-tight font-semibold text-balance tracking-tight md:text-4xl lg:text-5xl xl:whitespace-nowrap'>
            {copy.title}
          </h2>
          <p className='text-muted-foreground max-w-3xl text-xl'>{copy.description}</p>
          <Button
            size='lg'
            asChild
            className='group relative w-fit overflow-hidden rounded-full text-base before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] has-[>svg]:px-6 dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)]'
          >
            <Link href='#offers'>
              {copy.cta}
              <ArrowRightIcon className='transition-transform duration-200 group-hover:translate-x-0.5' />
            </Link>
          </Button>
        </div>

        {/* Video player and stats */}
        <div className='relative mb-8 h-full w-full sm:mb-16 lg:mb-24'>
          <img
            src='/images/galery/galery17.jpg'
            alt={copy.imageAlt}
            loading='lazy'
            decoding='async'
            className='aspect-[16/9] w-full object-cover object-[center_36%]'
          />

          {/* Stats card overlapping the video section */}
          <div className='bg-background grid gap-10 border p-8 sm:max-lg:grid-cols-2 lg:absolute lg:-bottom-25 lg:left-1/2 lg:w-3/4 lg:-translate-x-1/2 lg:grid-cols-4 lg:px-10'>
            {stats.map((stat, index) => (
              <div key={index} className='flex flex-col items-center justify-center gap-2.5 text-center'>
                <div className='flex size-7 items-center justify-center [&>svg]:size-7'>
                  <stat.icon />
                </div>
                <span className='text-2xl font-semibold'>{stat.value}</span>
                <p className='text-muted-foreground text-lg'>
                  {stat.description[0]} <br /> {stat.description[1]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
