import { publicPageContent } from '@/assets/data/public-pages'

import type { Locale } from '@/lib/i18n'

type GaleryImage = {
  src: string
  width: number
  height: number
}

type DisplayGaleryImage = GaleryImage & {
  displayIndex: number
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

const mixGaleryImages = (images: GaleryImage[]): GaleryImage[] => {
  const verticalImages = images.filter(image => image.height > image.width)
  const horizontalImages = images.filter(image => image.height <= image.width)
  const mixedImages: GaleryImage[] = []
  let verticalIndex = 0
  let horizontalIndex = 0

  while (verticalIndex < verticalImages.length || horizontalIndex < horizontalImages.length) {
    if (horizontalIndex < horizontalImages.length) {
      mixedImages.push(horizontalImages[horizontalIndex])
      horizontalIndex += 1
    }

    for (let count = 0; count < 2 && verticalIndex < verticalImages.length; count += 1) {
      mixedImages.push(verticalImages[verticalIndex])
      verticalIndex += 1
    }
  }

  return mixedImages
}

const galeryImages = mixGaleryImages(galeryImageGroups.flat()).map((image, displayIndex) => ({
  ...image,
  displayIndex
}))

const justifiedRowTargetAspectRatio = 5

const createJustifiedGaleryRows = (images: DisplayGaleryImage[]): DisplayGaleryImage[][] => {
  const rows: DisplayGaleryImage[][] = []
  let currentRow: DisplayGaleryImage[] = []
  let currentAspectRatio = 0

  images.forEach(image => {
    const imageAspectRatio = image.width / image.height
    const nextAspectRatio = currentAspectRatio + imageAspectRatio

    if (currentRow.length > 0 && nextAspectRatio > justifiedRowTargetAspectRatio) {
      const currentDifference = Math.abs(justifiedRowTargetAspectRatio - currentAspectRatio)
      const nextDifference = Math.abs(justifiedRowTargetAspectRatio - nextAspectRatio)

      if (nextDifference < currentDifference) {
        rows.push([...currentRow, image])
        currentRow = []
        currentAspectRatio = 0
      } else {
        rows.push(currentRow)
        currentRow = [image]
        currentAspectRatio = imageAspectRatio
      }

      return
    }

    currentRow.push(image)
    currentAspectRatio = nextAspectRatio
  })

  if (currentRow.length > 0) {
    rows.push(currentRow)
  }

  return rows
}

const galeryImageRows = createJustifiedGaleryRows(galeryImages)

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

      <div className='flex w-full flex-col gap-1'>
        {galeryImageRows.map(row => (
          <div key={row.map(image => image.src).join('-')} className='flex w-full items-stretch gap-1'>
            {row.map(image => {
              const imageAspectRatio = image.width / image.height

              return (
                <div
                  key={image.src}
                  className='min-w-0 overflow-hidden'
                  style={{
                    aspectRatio: `${image.width} / ${image.height}`,
                    flex: `${imageAspectRatio} 1 0`
                  }}
                >
                  <img
                    src={image.src}
                    alt={`${content.imageAltPrefix} ${image.displayIndex + 1}`}
                    width={image.width}
                    height={image.height}
                    loading={getImageLoading(image.displayIndex)}
                    decoding='async'
                    className='block size-full object-contain'
                  />
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}

export default GaleryPage
