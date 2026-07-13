import Image from 'next/image'

import { cn } from '@/lib/utils'

type BamenaLogoProps = {
  className?: string
}

const BamenaLogo = ({ className }: BamenaLogoProps) => {
  return (
    <Image
      src='/images/logo/bamenausa.svg'
      alt='Bamena-USA logo'
      width={500}
      height={500}
      className={cn('w-20 sm:w-25', className)}
    />
  )
}

export default BamenaLogo
