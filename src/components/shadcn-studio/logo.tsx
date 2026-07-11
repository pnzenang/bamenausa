import BamenaLogo from '@/assets/svg/bamena-logo'

// Util Imports
import { cn } from '@/lib/utils'

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <BamenaLogo className='size-8.5 object-contain' />
      <span className='text-xl font-semibold'>Bamena-USA</span>
    </div>
  )
}

export default Logo
