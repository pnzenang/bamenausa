import type { Metadata } from 'next'

import { MemberDirectoryList, type MemberDirectoryListMember } from '@/components/members/member-directory-list'
import { Badge } from '@/components/ui/badge'

import { listMemberProfilesWithTimeout } from '@/lib/member-profiles'

export const metadata: Metadata = {
  title: 'Full Members List'
}

const FullMembersDirectory = async () => {
  let members: Awaited<ReturnType<typeof listMemberProfilesWithTimeout>> = []
  let membersError = false

  try {
    members = await listMemberProfilesWithTimeout()
  } catch {
    membersError = true
  }

  const directoryMembers: MemberDirectoryListMember[] = members.map(member => ({
    clerkUserId: member.clerkUserId,
    firstName: member.firstName,
    lastName: member.lastName,
    email: member.email,
    phoneNumber: member.phoneNumber,
    imageUrl: member.imageUrl,
    eulogyPreference: member.eulogyPreference,
    usState: member.usState,
    cameroonOriginCity: member.cameroonOriginCity,
    bamenaCompound: member.bamenaCompound
  }))

  return (
    <>
      {membersError && (
        <p className='border-destructive/30 bg-destructive/10 text-destructive rounded-md border px-4 py-3 text-sm'>
          The full member list is temporarily unavailable.
        </p>
      )}

      <MemberDirectoryList members={directoryMembers} variant='full' />
    </>
  )
}

const FullMembersPage = () => {
  return (
    <div className='mx-auto max-w-7xl space-y-8'>
      <div className='space-y-3'>
        <Badge variant='outline'>Members</Badge>
        <h1 className='text-3xl font-bold text-balance sm:text-4xl'>Full Members List</h1>
      </div>

      <FullMembersDirectory />
    </div>
  )
}

export default FullMembersPage
