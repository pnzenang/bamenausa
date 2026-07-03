import Image from 'next/image'

import { cn } from '@/lib/utils'

type BamenaLogoProps = {
  className?: string
}

const BamenaLogo = ({ className }: BamenaLogoProps) => {
  return (
    <Image
      src='https://res.cloudinary.com/dp8tkb7hq/image/upload/v1769013009/bamenaLogo_mqio2l.svg'
      alt='Bamena-USA logo'
      width={100}
      height={100}
      className={cn('w-20 sm:w-25', className)}
    />
  )
}

export default BamenaLogo
