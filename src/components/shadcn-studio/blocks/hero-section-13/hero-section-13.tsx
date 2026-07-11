'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { BounceButton } from '@/components/ui/bounce-button'
import { MotionPreset } from '@/components/ui/motion-preset'

const HeroSection = () => {
  const [, setPartyTime] = useState(false)
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const target = new Date('05/30/2026 09:00:00')

    const interval = setInterval(() => {
      const now = new Date()
      const difference = target.getTime() - now.getTime()

      const d = Math.floor(difference / (1000 * 60 * 60 * 24))

      setDays(d)

      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

      setHours(h)

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))

      setMinutes(m)

      const s = Math.floor((difference % (1000 * 60)) / 1000)

      setSeconds(s)

      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setPartyTime(true)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className='flex-1 overflow-hidden py-4 sm:py-6 lg:py-16'>
      <div className='mx-auto flex h-full max-w-7xl flex-col gap-12 px-4 sm:gap-16 sm:px-6 lg:gap-24 lg:px-8'>
        <div className='relative grid gap-12 lg:grid-cols-5'>
          <div className='flex flex-col justify-center gap-5 lg:col-span-3'>
            <MotionPreset fade slide={{ offset: 50 }} blur transition={{ duration: 0.5 }} delay={0.3}>
              <h1 className='max-w-3xl text-3xl leading-[1.29167] font-bold sm:text-4xl lg:text-5xl'>
                The Countdown to the Bamena FundRaising Gala is on!
              </h1>
            </MotionPreset>
            <MotionPreset fade slide={{ offset: 50 }} blur transition={{ duration: 0.5 }} delay={0.5}>
              <p className='text-muted-foreground text-lg'>
                With the presence of, and under the leadership of his Majesty Alexandre Nietcho, the King of Bamena, our
                fund raising Gala gains more legitimacy and prestige.
              </p>
            </MotionPreset>
            <MotionPreset
              component='div'
              fade
              slide={{ offset: 50 }}
              blur
              transition={{ duration: 0.5 }}
              delay={0.7}
              className='flex flex-wrap items-center gap-6'
            >
              <div className='flex items-center gap-5 sm:gap-10'>
                <BounceButton>
                  <Link href='#' className='font-extrabold'>
                    Get your ticket right now!
                  </Link>
                </BounceButton>
                <div className='flex gap-5'>
                  <div className='text-primary flex flex-col'>
                    <span className='text-xl font-bold'>$150</span>
                    <span className=''>1 Person</span>
                  </div>
                  <div className='text-primary flex flex-col'>
                    <span className='text-xl font-bold'>$1500</span>
                    <span className=''>Table of 10</span>
                  </div>
                </div>
              </div>
            </MotionPreset>
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-4 lg:max-w-184'>
              <MotionPreset
                component='div'
                fade
                slide={{ direction: 'down', offset: 50 }}
                blur
                transition={{ duration: 0.5 }}
                delay={0.9}
                className='bg-muted group relative overflow-hidden rounded-md p-3 text-center'
              >
                <div className='flex flex-col'>
                  <span className='text-primary text-8xl font-extrabold'>{days}</span>
                  <span className='text-4xl'>Days</span>
                </div>
              </MotionPreset>
              <MotionPreset
                component='div'
                fade
                slide={{ direction: 'down', offset: 50 }}
                blur
                transition={{ duration: 0.5 }}
                delay={0.9}
                className='bg-muted group relative overflow-hidden rounded-md p-3 text-center'
              >
                <div className='flex flex-col'>
                  <span className='text-primary text-8xl font-extrabold'>{hours}</span>
                  <span className='text-4xl'>Hours</span>
                </div>
              </MotionPreset>
              <MotionPreset
                component='div'
                fade
                slide={{ direction: 'down', offset: 50 }}
                blur
                transition={{ duration: 0.5 }}
                delay={0.9}
                className='bg-muted group relative overflow-hidden rounded-md p-3 text-center'
              >
                <div className='flex flex-col'>
                  <span className='text-primary text-8xl font-extrabold'>{minutes}</span>
                  <span className='text-4xl'>Min</span>
                </div>
              </MotionPreset>
              <MotionPreset
                component='div'
                fade
                slide={{ direction: 'down', offset: 50 }}
                blur
                transition={{ duration: 0.5 }}
                delay={0.9}
                className='bg-muted group relative overflow-hidden rounded-md p-3 text-center'
              >
                <div className='flex flex-col'>
                  <span className='text-primary text-8xl font-extrabold'>{seconds}</span>
                  <span className='text-4xl'>Seconds</span>
                </div>
              </MotionPreset>
            </div>
          </div>
          <MotionPreset
            component='div'
            fade
            slide={{ direction: 'right', offset: 50 }}
            blur
            transition={{ duration: 0.5 }}
            delay={0.5}
            className='rounded-1xl relative flex items-center justify-center lg:col-span-2'
          >
            <Image
              src='https://res.cloudinary.com/dp8tkb7hq/image/upload/v1777724914/chef2_jyhsek.svg'
              alt='roi'
              width={300}
              height={450}
              className='size-full rounded-3xl object-contain md:max-lg:size-4/5'
            />
          </MotionPreset>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
