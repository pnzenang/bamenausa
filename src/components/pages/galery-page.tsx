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

const galeryImageGroups = [
  createGaleryImages(
    [1, 2, 5, 6, 7, 9, 11, 12, 13, 15, 18, 19, 20, 21, 23, 24, 25, 26, 27, 29, 30, 31, 32, 34, 35, 36, 37, 76],
    1066,
    1600
  ),
  createGaleryImages([43, 72, 73], 1530, 2040),
  createGaleryImages([17], 1325, 786),
  createGaleryImages([39, 40, 53, 52, 48, 49, 50, 51, 64, 65, 66, 67, 68, 69, 70, 74, 75], 2040, 1148),
  createGaleryImages([44, 71], 2040, 1530)
]

const putVerticalGaleryImagesFirst = (images: GaleryImage[]): GaleryImage[] => [
  ...images.filter(image => image.height > image.width),
  ...images.filter(image => image.height <= image.width)
]

const galeryImages = putVerticalGaleryImagesFirst(galeryImageGroups.flat()).map((image, displayIndex) => ({
  ...image,
  displayIndex
}))

const eagerImageCount = 6

const GaleryPage = ({ locale }: GaleryPageProps) => {
  const content = publicPageContent[locale].galery

  return (
    <section className='bg-background min-h-screen'>
      <div className='px-4 pt-8 pb-5 text-center sm:px-6 lg:px-8'>
        <h1 className='text-3xl font-bold text-balance sm:text-4xl'>{content.title}</h1>
        <p className='text-muted-foreground mx-auto mt-2 max-w-2xl text-base sm:text-lg'>{content.description}</p>
      </div>

      <div className='w-full columns-1 gap-1 px-1 pb-6 sm:columns-2 sm:gap-1.5 sm:px-2 lg:columns-3 lg:gap-2 xl:columns-4'>
        {galeryImages.map(image => (
          <div key={image.src} className='bg-muted mb-1 break-inside-avoid overflow-hidden rounded-sm sm:mb-1.5 lg:mb-2'>
            <img
              src={image.src}
              alt={`${content.imageAltPrefix} ${image.displayIndex + 1}`}
              width={image.width}
              height={image.height}
              loading={image.displayIndex < eagerImageCount ? 'eager' : 'lazy'}
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
