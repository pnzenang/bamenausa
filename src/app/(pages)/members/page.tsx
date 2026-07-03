import { Suspense } from 'react'

import type { Metadata } from 'next'

import { MemberDirectoryList, type MemberDirectoryListMember } from '@/components/members/member-directory-list'
import { MemberDirectorySkeleton } from '@/components/members/member-directory-skeleton'
import { Badge } from '@/components/ui/badge'

import { listMemberProfiles } from '@/lib/member-profiles'

export const metadata: Metadata = {
  title: 'Bamena-USA Members'
}

const PublicMembersDirectory = async () => {
  let members: Awaited<ReturnType<typeof listMemberProfiles>> = []
  let membersError = false

  try {
    members = await listMemberProfiles()
  } catch {
    membersError = true
  }

  const directoryMembers: MemberDirectoryListMember[] = members.map(member => ({
    clerkUserId: member.clerkUserId,
    firstName: member.firstName,
    lastName: member.lastName,
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
          The member directory is temporarily unavailable.
        </p>
      )}

      <MemberDirectoryList members={directoryMembers} variant='public' />
    </>
  )
}

const MembersPage = () => {
  return (
    <section className='bg-muted/30 min-h-screen px-4 py-10 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-6xl space-y-8'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
          <div className='space-y-3'>
            <Badge variant='outline'>Members</Badge>
            <h1 className='text-3xl font-bold text-balance sm:text-4xl'>Bamena-USA Members</h1>
          </div>
        </div>

        <Suspense fallback={<MemberDirectorySkeleton variant='public' />}>
          <PublicMembersDirectory />
        </Suspense>
      </div>
    </section>
  )
}

export default MembersPage
