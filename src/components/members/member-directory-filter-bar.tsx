'use client'

import { useId } from 'react'

import { SearchIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import type { MemberDirectoryFilters } from '@/lib/member-directory'

type MemberDirectoryFilterOption = {
  value: string
  label: string
}

type MemberDirectoryFilterBarProps = {
  filters: MemberDirectoryFilters
  quartierOptions: MemberDirectoryFilterOption[]
  stateOptions: MemberDirectoryFilterOption[]
  onFiltersChange: (filters: MemberDirectoryFilters) => void
}

const selectClassName =
  'border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full rounded-md border px-3 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:ring-[3px]'

export const MemberDirectoryFilterBar = ({
  filters,
  quartierOptions,
  stateOptions,
  onFiltersChange
}: MemberDirectoryFilterBarProps) => {
  const nameId = useId()
  const quartierId = useId()
  const stateId = useId()

  const updateFilters = (nextFilters: Partial<MemberDirectoryFilters>) => {
    onFiltersChange({
      ...filters,
      ...nextFilters
    })
  }

  return (
    <div className='bg-background grid gap-3 rounded-md border p-4 md:grid-cols-[minmax(0,1fr)_220px_220px] md:items-end'>
      <div className='space-y-2'>
        <label htmlFor={nameId} className='block text-sm font-medium'>
          Name
        </label>
        <div className='relative'>
          <SearchIcon className='text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2' />
          <Input
            id={nameId}
            name='name'
            value={filters.name}
            onChange={event => updateFilters({ name: event.target.value })}
            placeholder='Search name'
            className='pr-10 pl-9'
          />
          {filters.name && (
            <Button
              type='button'
              variant='ghost'
              size='icon-sm'
              className='absolute top-1/2 right-1 size-7 -translate-y-1/2 rounded-full'
              aria-label='Clear name search'
              onClick={() => updateFilters({ name: '' })}
            >
              <XIcon />
            </Button>
          )}
        </div>
      </div>

      <div className='space-y-2'>
        <label htmlFor={quartierId} className='block text-sm font-medium'>
          Quartier
        </label>
        <select
          id={quartierId}
          name='quartier'
          value={filters.quartier}
          className={selectClassName}
          onChange={event => updateFilters({ quartier: event.target.value })}
        >
          <option value=''>All quartiers</option>
          {quartierOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className='space-y-2'>
        <label htmlFor={stateId} className='block text-sm font-medium'>
          State
        </label>
        <select
          id={stateId}
          name='state'
          value={filters.state}
          className={selectClassName}
          onChange={event => updateFilters({ state: event.target.value })}
        >
          <option value=''>All states</option>
          {stateOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
