'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon, HeartHandshakeIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { MotionPreset } from '@/components/ui/motion-preset'

import type { SiteContent } from '@/assets/data/site-content'

import { scrollToSection } from '@/lib/utils'

const heroImageSrc = '/images/galery/hero1.jpg'

type VideoHeroSectionProps = {
  copy: SiteContent['hero']
}

const VideoHeroSection = ({ copy }: VideoHeroSectionProps) => {
  return (
    <section className='bg-foreground relative mb-8 min-h-[760px] overflow-hidden sm:mb-10 sm:min-h-[700px] lg:mb-14 lg:min-h-[720px]'>
      <Image
        src={heroImageSrc}
        alt='Bamena-USA community gathering'
        fill
        priority
        sizes='100vw'
        className='absolute inset-0 object-cover object-[center_52%]'
      />
      <div className='absolute inset-0 bg-white/15' />
      <div className='absolute inset-0 bg-linear-to-r from-black/45 via-black/15 to-transparent' />
      <div className='absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-white/10' />

      <div className='max-w-9xl relative z-10 mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex min-h-[760px] flex-col justify-between gap-10 py-5 text-white sm:min-h-[700px] sm:py-8 lg:min-h-[720px] lg:py-12'>
          <div className='grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end'>
            <div className='max-w-9xl'>
              <MotionPreset fade slide={{ offset: 50 }} blur transition={{ duration: 0.5 }} delay={0.2}>
                <p className='mb-4 text-sm font-semibold tracking-normal text-white/75 uppercase'>{copy.eyebrow}</p>
                <h1 className='text-4xl leading-tight font-bold text-balance sm:text-5xl lg:text-6xl'>{copy.title}</h1>
              </MotionPreset>
              <MotionPreset fade slide={{ offset: 50 }} blur transition={{ duration: 0.5 }} delay={0.35}>
                <p className='mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg'>{copy.description}</p>
              </MotionPreset>
              <MotionPreset fade slide={{ offset: 50 }} blur transition={{ duration: 0.5 }} delay={0.5}>
                <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
                  <Button
                    size='lg'
                    asChild
                    className='group relative w-fit overflow-hidden rounded-full text-base before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] has-[>svg]:px-6'
                  >
                    <Link
                      href='#offers'
                      onClick={e => {
                        e.preventDefault()
                        scrollToSection('offers')
                      }}
                    >
                      {copy.donateCta}
                      <HeartHandshakeIcon />
                    </Link>
                  </Button>
                  <Button
                    size='lg'
                    variant='secondary'
                    asChild
                    className='group w-fit rounded-full bg-white/90 text-base text-slate-950 hover:bg-white has-[>svg]:px-6'
                  >
                    <Link
                      href='#programs'
                      onClick={e => {
                        e.preventDefault()
                        scrollToSection('programs')
                      }}
                    >
                      {copy.programsCta}
                      <ArrowRightIcon className='transition-transform duration-200 group-hover:translate-x-0.5' />
                    </Link>
                  </Button>
                </div>
              </MotionPreset>
            </div>

            <MotionPreset fade slide={{ offset: 50 }} blur transition={{ duration: 0.5 }} delay={0.65}>
              <div className='max-w-md space-y-4 rounded-md border border-white/20 bg-black/25 p-5 text-white shadow-2xl backdrop-blur-sm'>
                <p className='text-sm font-semibold tracking-normal text-white/70 uppercase'>{copy.missionEyebrow}</p>
                <div className='grid gap-4 sm:grid-cols-3 lg:grid-cols-1'>
                  {copy.missionItems.map(({ title, description }) => (
                    <div key={title}>
                      <h2 className='text-lg font-semibold'>{title}</h2>
                      <p className='mt-1 text-sm leading-6 text-white/75'>{description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </MotionPreset>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoHeroSection
