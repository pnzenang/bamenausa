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

const createImageNumberRange = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, index) => start + index)

const galeryImageGroups = [
  createGaleryImages(
    [1, 2, 5, 6, 7, 9, 11, 12, 13, 15, 18, 19, 20, 21, 23, 24, 25, 26, 27, 29, 30, 31, 32, 34, 35, 36, 37, 76],
    1066,
    1600
  ),
  createGaleryImages([43, 72, 73], 1530, 2040),
  createGaleryImages([17], 1325, 786),
  createGaleryImages([39, 40, 53, 52, 48, 49, 50, 51, 64, 65, 66, 67, 68, 69, 70, 74, 75], 2040, 1148),
  createGaleryImages([44, 71], 2040, 1530),
  createGaleryImages([80, 87, 88], 1600, 1066),
  createGaleryImages([78, 82, 83, 89, 90], 1066, 1600),
  createGaleryImages([81], 1028, 1353),
  createGaleryImages([86, ...createImageNumberRange(92, 99), 128], 2400, 3600),
  createGaleryImages(
    [
      ...createImageNumberRange(100, 110),
      ...createImageNumberRange(120, 127),
      ...createImageNumberRange(129, 139),
      141
    ],
    3600,
    2400
  ),
  createGaleryImages([111], 954, 1353),
  createGaleryImages([112, 118, 119, 142, 143, 144, 145, 146, 148, 150], 2000, 1333),
  createGaleryImages([113], 964, 1353),
  createGaleryImages([114], 936, 1353),
  createGaleryImages([115], 902, 1353),
  createGaleryImages([116], 1147, 1353),
  createGaleryImages([117], 1283, 1353),
  createGaleryImages([147], 2000, 1285),
  createGaleryImages([149], 1181, 1353),
  createGaleryImages([151], 2000, 1329),
  createGaleryImages([152], 1536, 1353)
]

const getStableImageSortValue = (src: string) => {
  let hash = 0

  for (const character of src) {
    hash = (hash * 31 + character.charCodeAt(0)) % 1000000007
  }

  return hash
}

const randomizeGaleryImages = (images: GaleryImage[]) =>
  [...images].sort((imageA, imageB) => getStableImageSortValue(imageA.src) - getStableImageSortValue(imageB.src))

const galeryImages = randomizeGaleryImages(galeryImageGroups.flat()).map((image, displayIndex) => ({
  ...image,
  displayIndex
}))

const eagerImageCount = 6

const getImageLoading = (displayIndex: number) => (displayIndex < eagerImageCount ? 'eager' : 'lazy')

const GaleryPage = ({ locale }: GaleryPageProps) => {
  const content = publicPageContent[locale].galery

  return (
    <section className='bg-background min-h-screen'>
      <div className='px-4 pt-8 pb-5 text-center sm:px-6 lg:px-8'>
        <h1 className='text-3xl font-bold text-balance sm:text-4xl'>{content.title}</h1>
        <p className='text-muted-foreground mx-auto mt-2 max-w-2xl text-base sm:text-lg'>{content.description}</p>
      </div>

      <div className='columns-2 gap-2 sm:columns-3 lg:columns-4 xl:columns-5'>
        {galeryImages.map(image => (
          <img
            key={image.src}
            src={image.src}
            alt={`${content.imageAltPrefix} ${image.displayIndex + 1}`}
            width={image.width}
            height={image.height}
            loading={getImageLoading(image.displayIndex)}
            decoding='async'
            className='mb-2 block h-auto w-full break-inside-avoid'
          />
        ))}
      </div>
    </section>
  )
}

export default GaleryPage
