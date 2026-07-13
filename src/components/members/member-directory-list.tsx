'use client'

import { useId, useMemo, useState } from 'react'

import Image from 'next/image'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  Trash2Icon,
  UsersRoundIcon
} from 'lucide-react'

import {
  MemberDirectoryFilterBar,
  type MemberDirectoryFilterBarLabels
} from '@/components/members/member-directory-filter-bar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { bamenaCompoundOptions, eulogyOptions, usStateOptions } from '@/lib/auth'
import {
  filterMemberProfiles,
  getMemberFullName,
  type MemberDirectoryFilters,
  type MemberDirectoryMember
} from '@/lib/member-directory'

export type MemberDirectoryListMember = MemberDirectoryMember & {
  clerkUserId: string
  imageUrl: string | null
  eulogyPreference: string
  cameroonOriginCity: string
  email?: string
  phoneNumber?: string
}

type MemberDirectoryListProps = {
  members: MemberDirectoryListMember[]
  variant: 'public' | 'full'
  labels?: MemberDirectoryListLabels
  deleteMemberAction?: (formData: FormData) => Promise<void>
}

export type MemberDirectoryListLabels = {
  filterBar: MemberDirectoryFilterBarLabels
  directoryTitle: string
  memberSingularFound: string
  memberPluralFound: string
  noProfiles: string
  noMatches: string
  membersPerPage: string
  showing: string
  of: string
  previous: string
  next: string
  goToPage: string
  from: string
  livesIn: string
  noEmail: string
  noTelephone: string
  noQuarter: string
  noState: string
  noLocation: string
}

export const defaultMemberDirectoryLabels: MemberDirectoryListLabels = {
  filterBar: {
    nameLabel: 'Name',
    searchNamePlaceholder: 'Search name',
    clearNameSearch: 'Clear name search',
    quartierLabel: 'Quartier',
    allQuartiers: 'All quartiers',
    stateLabel: 'State',
    allStates: 'All states'
  },
  directoryTitle: 'Directory',
  memberSingularFound: 'member found',
  memberPluralFound: 'members found',
  noProfiles: 'No member profiles saved yet.',
  noMatches: 'No members match those filters.',
  membersPerPage: 'Members per page',
  showing: 'Showing',
  of: 'of',
  previous: 'Previous',
  next: 'Next',
  goToPage: 'Go to page',
  from: 'From',
  livesIn: 'Lives in',
  noEmail: 'No email on file',
  noTelephone: 'No telephone on file',
  noQuarter: 'No quarter on file',
  noState: 'No state on file',
  noLocation: 'No city/state on file'
}

const defaultFilters: MemberDirectoryFilters = {
  name: '',
  quartier: '',
  state: ''
}

const pageSizeOptions = [6, 9, 12, 24] as const

const selectClassName =
  'border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-9 rounded-md border px-3 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:ring-[3px]'

const getEulogyLabel = (value?: string) => {
  const customLabel = value?.trim()

  return eulogyOptions.find(option => option.value === value)?.label ?? (customLabel || eulogyOptions[0].label)
}

const getUsStateLabel = (value?: string) => {
  return usStateOptions.find(option => option.value === value)?.label ?? ''
}

const getBamenaCompoundLabel = (value?: string) => {
  return bamenaCompoundOptions.find(option => option.value === value)?.label ?? ''
}

const MemberLocation = ({ city, state }: { city: string; state: string }) => {
  if (!city && !state) return null

  return (
    <>
      {city}
      {city && state ? ', ' : ''}
      {state && <span className='font-semibold'>{state}</span>}
    </>
  )
}

export const MemberDirectoryList = ({
  members,
  variant,
  labels = defaultMemberDirectoryLabels,
  deleteMemberAction
}: MemberDirectoryListProps) => {
  const pageSizeId = useId()
  const [filters, setFilters] = useState<MemberDirectoryFilters>(defaultFilters)
  const [pageSize, setPageSize] = useState<number>(pageSizeOptions[1])
  const [currentPage, setCurrentPage] = useState(1)

  const quartierOptions = useMemo(() => {
    const presentQuartiers = new Set(members.map(member => member.bamenaCompound).filter(Boolean))

    return bamenaCompoundOptions.filter(option => presentQuartiers.has(option.value))
  }, [members])

  const stateOptions = useMemo(() => {
    const presentStates = new Set(members.map(member => member.usState).filter(Boolean))

    return usStateOptions.filter(option => presentStates.has(option.value))
  }, [members])

  const filteredMembers = useMemo(() => filterMemberProfiles(members, filters), [members, filters])

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / pageSize))
  const activePage = Math.min(currentPage, totalPages)

  const paginatedMembers = useMemo(() => {
    const startIndex = (activePage - 1) * pageSize

    return filteredMembers.slice(startIndex, startIndex + pageSize)
  }, [activePage, filteredMembers, pageSize])

  const memberCountLabel = `${filteredMembers.length} ${
    filteredMembers.length === 1 ? labels.memberSingularFound : labels.memberPluralFound
  }`

  const firstMemberIndex = filteredMembers.length === 0 ? 0 : (activePage - 1) * pageSize + 1
  const lastMemberIndex = Math.min(activePage * pageSize, filteredMembers.length)
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)

  const handleFiltersChange = (nextFilters: MemberDirectoryFilters) => {
    setFilters(nextFilters)
    setCurrentPage(1)
  }

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value))
    setCurrentPage(1)
  }

  return (
    <div className='space-y-4'>
      <MemberDirectoryFilterBar
        filters={filters}
        quartierOptions={quartierOptions}
        stateOptions={stateOptions}
        labels={labels.filterBar}
        onFiltersChange={handleFiltersChange}
      />

      <Card className='rounded-md'>
        <CardHeader className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <CardTitle className='flex items-center gap-2'>
            <UsersRoundIcon className='text-primary size-5' />
            {labels.directoryTitle}
          </CardTitle>
          <Badge variant='outline'>{memberCountLabel}</Badge>
        </CardHeader>
        <CardContent>
          {filteredMembers.length === 0 ? (
            <div className='bg-muted/60 rounded-md border px-4 py-10 text-center'>
              <p className='font-medium'>{members.length === 0 ? labels.noProfiles : labels.noMatches}</p>
            </div>
          ) : variant === 'public' ? (
            <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
              {paginatedMembers.map(member => (
                <PublicMemberCard key={member.clerkUserId} member={member} labels={labels} />
              ))}
            </div>
          ) : deleteMemberAction ? (
            <AdminMemberTable members={paginatedMembers} labels={labels} deleteMemberAction={deleteMemberAction} />
          ) : (
            <div className='space-y-4'>
              {paginatedMembers.map(member => (
                <FullMemberCard key={member.clerkUserId} member={member} labels={labels} />
              ))}
            </div>
          )}

          {filteredMembers.length > 0 && (
            <div className='mt-6 flex flex-col gap-4 border-t pt-4 sm:flex-row sm:items-center sm:justify-between'>
              <div className='flex flex-wrap items-center gap-3'>
                <label htmlFor={pageSizeId} className='text-muted-foreground text-sm'>
                  {labels.membersPerPage}
                </label>
                <select
                  id={pageSizeId}
                  value={pageSize}
                  className={selectClassName}
                  onChange={event => handlePageSizeChange(event.target.value)}
                >
                  {pageSizeOptions.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <p className='text-muted-foreground text-sm'>
                  {labels.showing} {firstMemberIndex}-{lastMemberIndex} {labels.of} {filteredMembers.length}
                </p>
              </div>

              <div className='flex flex-wrap items-center gap-2'>
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  className='rounded-full'
                  disabled={activePage === 1}
                  onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                >
                  <ChevronLeftIcon />
                  {labels.previous}
                </Button>

                {pageNumbers.map(page => (
                  <Button
                    key={page}
                    type='button'
                    variant={page === activePage ? 'default' : 'outline'}
                    size='icon-sm'
                    className='rounded-full'
                    aria-label={`${labels.goToPage} ${page}`}
                    aria-current={page === activePage ? 'page' : undefined}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  className='rounded-full'
                  disabled={activePage === totalPages}
                  onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                >
                  {labels.next}
                  <ChevronRightIcon />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

const PublicMemberCard = ({
  member,
  labels
}: {
  member: MemberDirectoryListMember
  labels: MemberDirectoryListLabels
}) => {
  const fullName = getMemberFullName(member)
  const imageUrl = member.imageUrl ?? '/favicon/bamenausa-android-chrome-192.png'
  const eulogies = getEulogyLabel(member.eulogyPreference)
  const quarter = getBamenaCompoundLabel(member.bamenaCompound)
  const state = getUsStateLabel(member.usState)
  const hasLocation = Boolean(member.cameroonOriginCity || state)

  return (
    <article className='bg-background rounded-md border p-4 shadow-xs'>
      <div className='flex items-start gap-4'>
        <div className='bg-muted relative size-20 shrink-0 overflow-hidden rounded-full border'>
          <Image src={imageUrl} alt={fullName} fill className='object-cover' />
        </div>
        <div className='min-w-0 flex-1'>
          <h2 className='text-lg leading-snug font-semibold break-words'>
            <span className='text-primary font-script mr-2 inline text-xl leading-none font-normal sm:text-2xl'>
              {eulogies}
            </span>
            <span className='inline'>{fullName}</span>
          </h2>
          {quarter && (
            <p className='text-muted-foreground mt-2 text-sm'>
              {labels.from} {quarter}
            </p>
          )}
          {hasLocation && (
            <p className='text-muted-foreground mt-1 text-sm'>
              {labels.livesIn} <MemberLocation city={member.cameroonOriginCity} state={state} />
            </p>
          )}
        </div>
      </div>
    </article>
  )
}

const FullMemberCard = ({
  member,
  labels
}: {
  member: MemberDirectoryListMember
  labels: MemberDirectoryListLabels
}) => {
  const fullName = getMemberFullName(member)
  const imageUrl = member.imageUrl ?? '/favicon/bamenausa-android-chrome-192.png'
  const eulogies = getEulogyLabel(member.eulogyPreference)
  const quarter = getBamenaCompoundLabel(member.bamenaCompound)
  const state = getUsStateLabel(member.usState)
  const hasLocation = Boolean(member.cameroonOriginCity || state)

  return (
    <article className='bg-background rounded-md border p-4 shadow-xs'>
      <div className='grid gap-4 md:grid-cols-[88px_minmax(0,1fr)_minmax(220px,280px)] md:items-center'>
        <div className='bg-muted relative size-20 overflow-hidden rounded-full border'>
          <Image src={imageUrl} alt={fullName} fill className='object-cover' />
        </div>

        <div className='min-w-0 space-y-2'>
          <h2 className='text-lg leading-snug font-semibold break-words'>
            <span className='text-primary font-script mr-2 inline text-xl leading-none font-normal sm:text-2xl'>
              {eulogies}
            </span>
            <span className='inline'>{fullName}</span>
          </h2>
          <div className='grid gap-2 text-sm sm:grid-cols-2'>
            <p className='text-muted-foreground flex items-center gap-2 break-words'>
              <MailIcon className='size-3.5 shrink-0' />
              {member.email || labels.noEmail}
            </p>
            <p className='text-muted-foreground flex items-center gap-2 break-words'>
              <PhoneIcon className='size-3.5 shrink-0' />
              {member.phoneNumber || labels.noTelephone}
            </p>
          </div>
        </div>

        <div className='space-y-2 text-sm'>
          <p className='font-medium break-words'>{quarter ? `${labels.from} ${quarter}` : labels.noQuarter}</p>
          <p className='text-muted-foreground flex items-center gap-2 break-words'>
            <MapPinIcon className='size-3.5 shrink-0' />
            {hasLocation ? (
              <>
                {labels.livesIn} <MemberLocation city={member.cameroonOriginCity} state={state} />
              </>
            ) : (
              labels.noLocation
            )}
          </p>
        </div>
      </div>
    </article>
  )
}

const AdminMemberTable = ({
  members,
  labels,
  deleteMemberAction
}: {
  members: MemberDirectoryListMember[]
  labels: MemberDirectoryListLabels
  deleteMemberAction: (formData: FormData) => Promise<void>
}) => {
  return (
    <div className='overflow-x-auto rounded-md border'>
      <table className='w-full min-w-[760px] table-fixed text-sm'>
        <colgroup>
          <col className='w-[48%]' />
          <col className='w-[22%]' />
          <col className='w-[18%]' />
          <col className='w-[12%]' />
        </colgroup>
        <thead className='bg-muted/60 text-muted-foreground'>
          <tr className='border-b text-left'>
            <th scope='col' className='px-4 py-3 font-medium'>
              Member
            </th>
            <th scope='col' className='px-4 py-3 font-medium'>
              Quartier
            </th>
            <th scope='col' className='px-4 py-3 font-medium'>
              State
            </th>
            <th scope='col' className='px-4 py-3 text-right font-medium'>
              Action
            </th>
          </tr>
        </thead>
        <tbody className='divide-y'>
          {members.map(member => (
            <AdminMemberTableRow
              key={member.clerkUserId}
              member={member}
              labels={labels}
              deleteMemberAction={deleteMemberAction}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

const AdminMemberTableRow = ({
  member,
  labels,
  deleteMemberAction
}: {
  member: MemberDirectoryListMember
  labels: MemberDirectoryListLabels
  deleteMemberAction: (formData: FormData) => Promise<void>
}) => {
  const fullName = getMemberFullName(member)
  const imageUrl = member.imageUrl ?? '/favicon/bamenausa-android-chrome-192.png'
  const eulogies = getEulogyLabel(member.eulogyPreference)
  const quarter = getBamenaCompoundLabel(member.bamenaCompound) || labels.noQuarter
  const state = getUsStateLabel(member.usState) || labels.noState

  return (
    <tr className='align-middle'>
      <td className='px-4 py-3'>
        <div className='flex min-w-0 items-center gap-3'>
          <div className='bg-muted relative size-12 shrink-0 overflow-hidden rounded-full border'>
            <Image src={imageUrl} alt={fullName} fill className='object-cover' />
          </div>
          <div className='min-w-0'>
            <p className='font-medium break-words'>{fullName}</p>
            <p className='text-primary font-script text-lg leading-none'>{eulogies}</p>
            <div className='text-muted-foreground mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs'>
              <span className='inline-flex min-w-0 items-center gap-1 break-all'>
                <MailIcon className='size-3 shrink-0' />
                {member.email || labels.noEmail}
              </span>
              <span className='inline-flex min-w-0 items-center gap-1 break-words'>
                <PhoneIcon className='size-3 shrink-0' />
                {member.phoneNumber || labels.noTelephone}
              </span>
            </div>
          </div>
        </div>
      </td>
      <td className='px-4 py-3 font-medium break-words'>{quarter}</td>
      <td className='text-muted-foreground px-4 py-3 break-words'>{state}</td>
      <td className='px-4 py-3 text-right'>
        <form
          action={deleteMemberAction}
          className='inline-flex justify-end'
          onSubmit={event => {
            if (!window.confirm(`Delete ${fullName} from the member directory? This cannot be undone.`)) {
              event.preventDefault()
            }
          }}
        >
          <input type='hidden' name='clerkUserId' value={member.clerkUserId} />
          <Button type='submit' variant='destructive' size='sm' className='rounded-full'>
            <Trash2Icon />
            Delete
          </Button>
        </form>
      </td>
    </tr>
  )
}
