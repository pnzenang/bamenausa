import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { cn } from '@/lib/utils'

type MemberDirectorySkeletonProps = {
  variant?: 'public' | 'full'
  loadingLabel?: string
}

const skeletonItems = Array.from({ length: 6 }, (_, index) => index)

const SkeletonBlock = ({ className }: { className: string }) => {
  return <div className={cn('bg-muted animate-pulse rounded-md', className)} />
}

const PublicMemberSkeletonCard = () => {
  return (
    <article className='bg-background rounded-md border p-4 shadow-xs'>
      <div className='flex items-start gap-4'>
        <SkeletonBlock className='size-20 shrink-0 rounded-full' />
        <div className='min-w-0 flex-1 space-y-3'>
          <div className='flex flex-wrap items-baseline gap-3'>
            <SkeletonBlock className='h-7 w-20' />
            <SkeletonBlock className='h-5 w-32' />
          </div>
          <SkeletonBlock className='h-4 w-28' />
          <SkeletonBlock className='h-4 w-36' />
        </div>
      </div>
    </article>
  )
}

const FullMemberSkeletonCard = () => {
  return (
    <article className='bg-background rounded-md border p-4 shadow-xs'>
      <div className='grid gap-4 md:grid-cols-[88px_minmax(0,1fr)_minmax(220px,280px)] md:items-center'>
        <SkeletonBlock className='size-20 rounded-full' />
        <div className='min-w-0 space-y-3'>
          <div className='flex flex-wrap items-baseline gap-3'>
            <SkeletonBlock className='h-7 w-20' />
            <SkeletonBlock className='h-5 w-36' />
          </div>
          <div className='grid gap-2 sm:grid-cols-2'>
            <SkeletonBlock className='h-4 w-full' />
            <SkeletonBlock className='h-4 w-full' />
          </div>
        </div>
        <div className='space-y-3'>
          <SkeletonBlock className='h-4 w-32' />
          <SkeletonBlock className='h-4 w-40' />
        </div>
      </div>
    </article>
  )
}

export const MemberDirectorySkeleton = ({ variant = 'public', loadingLabel = 'Loading members' }: MemberDirectorySkeletonProps) => {
  return (
    <div className='space-y-4' aria-label={loadingLabel}>
      <div className='bg-background rounded-md border p-4'>
        <div className='grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_180px]'>
          <SkeletonBlock className='h-10 w-full' />
          <SkeletonBlock className='h-10 w-full' />
          <SkeletonBlock className='h-10 w-full' />
        </div>
      </div>

      <Card className='rounded-md'>
        <CardHeader className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <CardTitle className='flex items-center gap-2'>
            <SkeletonBlock className='size-5 rounded-full' />
            <SkeletonBlock className='h-5 w-24' />
          </CardTitle>
          <Badge variant='outline' className='w-fit'>
            <SkeletonBlock className='h-4 w-24' />
          </Badge>
        </CardHeader>
        <CardContent>
          {variant === 'public' ? (
            <div className='grid gap-4 md:grid-cols-3'>
              {skeletonItems.map(item => (
                <PublicMemberSkeletonCard key={item} />
              ))}
            </div>
          ) : (
            <div className='space-y-4'>
              {skeletonItems.map(item => (
                <FullMemberSkeletonCard key={item} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
