import { bamenaCompoundOptions, usStateOptions } from '@/lib/auth'

export type MemberDirectorySearchParams = {
  name?: string | string[]
  quartier?: string | string[]
  state?: string | string[]
}

export type MemberDirectoryFilters = {
  name: string
  quartier: string
  state: string
}

export type MemberDirectoryMember = {
  firstName: string
  lastName: string
  bamenaCompound?: string
  usState?: string
}

const getStringValue = (value: string | string[] | undefined) => {
  return Array.isArray(value) ? (value[0] ?? '') : (value ?? '')
}

const normalizeSearchValue = (value: string) => {
  return value.trim().toLowerCase()
}

export const getMemberFullName = (member: MemberDirectoryMember) => {
  return [member.firstName, member.lastName].filter(Boolean).join(' ') || 'Bamena-USA member'
}

export const getMemberDirectoryFilters = (searchParams?: MemberDirectorySearchParams): MemberDirectoryFilters => {
  const name = getStringValue(searchParams?.name).trim()
  const quartierValue = getStringValue(searchParams?.quartier)
  const stateValue = getStringValue(searchParams?.state)
  const quartier = bamenaCompoundOptions.some(option => option.value === quartierValue) ? quartierValue : ''
  const state = usStateOptions.some(option => option.value === stateValue) ? stateValue : ''

  return {
    name,
    quartier,
    state
  }
}

export const filterMemberProfiles = <Member extends MemberDirectoryMember>(
  members: Member[],
  filters: MemberDirectoryFilters
) => {
  const nameSearch = normalizeSearchValue(filters.name)

  return members.filter(member => {
    const fullName = getMemberFullName(member)
    const searchableName = normalizeSearchValue(`${member.firstName} ${member.lastName} ${fullName}`)
    const matchesName = !nameSearch || searchableName.includes(nameSearch)
    const matchesQuartier = !filters.quartier || member.bamenaCompound === filters.quartier
    const matchesState = !filters.state || member.usState === filters.state

    return matchesName && matchesQuartier && matchesState
  })
}
