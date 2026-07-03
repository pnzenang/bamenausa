import { publicPageContent } from '@/assets/data/public-pages'

import type { Locale } from '@/lib/i18n'

type GaleryImage = {
  src: string
  width: number
  height: number
}

type GaleryPageProps = {
  locale: Locale
}

const createGaleryImages = (imageNumbers: number[], width: number, height: number): GaleryImage[] =>
  imageNumbers.map(imageNumber => ({
    src: `/images/galery/galery${imageNumber}.jpg`,
    width,
    height
  }))

const galeryImages = [
  ...createGaleryImages(
    [1, 2, 5, 6, 7, 9, 11, 12, 13, 15, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 34, 35, 36, 37],
    1066,
    1600
  ),
  ...createGaleryImages([43, 72, 73], 1530, 2040),
  ...createGaleryImages([17], 1325, 786),
  ...createGaleryImages([39, 40, 53, 52, 48, 49, 50, 51, 64, 65, 66, 67, 68, 69, 70, 74, 75], 2040, 1148),
  ...createGaleryImages([44, 71], 2040, 1530)
]

const eagerImageCount = 6

const GaleryPage = ({ locale }: GaleryPageProps) => {
  const content = publicPageContent[locale].galery

  return (
    <section className='bg-background min-h-screen'>
      <div className='px-4 py-10 text-center sm:px-6 lg:px-8'>
        <h1 className='text-3xl font-bold text-balance sm:text-4xl'>{content.title}</h1>
        <p className='text-muted-foreground mx-auto mt-3 max-w-2xl text-lg'>{content.description}</p>
      </div>

      <div className='w-full columns-1 gap-6 px-4 pb-10 md:columns-2 lg:columns-3'>
        {galeryImages.map((image, index) => (
          <div key={image.src} className='bg-muted mb-6 break-inside-avoid rounded-md p-2'>
            <img
              src={image.src}
              alt={`${content.imageAltPrefix} ${index + 1}`}
              width={image.width}
              height={image.height}
              loading={index < eagerImageCount ? 'eager' : 'lazy'}
              decoding='async'
              className='block h-auto w-full rounded-sm'
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default GaleryPage
