import { revalidatePath } from 'next/cache'
import { currentUser } from '@clerk/nextjs/server'
import { UsersRoundIcon } from 'lucide-react'

import { MemberDirectoryList, type MemberDirectoryListMember } from '@/components/members/member-directory-list'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { isAdminUser } from '@/lib/auth'
import { deleteMemberProfile, listMemberProfiles } from '@/lib/member-profiles'

const deleteMemberAction = async (formData: FormData) => {
  'use server'

  const user = await currentUser()

  if (!isAdminUser(user)) {
    throw new Error('Unauthorized')
  }

  const clerkUserId = formData.get('clerkUserId')

  if (typeof clerkUserId !== 'string') return

  await deleteMemberProfile(clerkUserId)

  revalidatePath('/backend/members')
  revalidatePath('/members')
  revalidatePath('/fr/members')
  revalidatePath('/members/full')
}

const MembersPage = async () => {
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
    email: member.email,
    phoneNumber: member.phoneNumber,
    imageUrl: member.imageUrl,
    eulogyPreference: member.eulogyPreference,
    usState: member.usState,
    cameroonOriginCity: member.cameroonOriginCity,
    bamenaCompound: member.bamenaCompound
  }))

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <Badge variant='outline'>Members</Badge>
          <h2 className='mt-2 text-3xl font-semibold tracking-normal'>Member directory</h2>
          <p className='text-muted-foreground mt-2'>Live Bamena-USA member profiles from the saved directory.</p>
        </div>
        <Button disabled>
          <UsersRoundIcon />
          Add member
        </Button>
      </div>

      {membersError && (
        <p className='border-destructive/30 bg-destructive/10 text-destructive rounded-md border px-4 py-3 text-sm'>
          The member directory is temporarily unavailable.
        </p>
      )}

      <MemberDirectoryList members={directoryMembers} variant='full' deleteMemberAction={deleteMemberAction} />
    </div>
  )
}

export default MembersPage
