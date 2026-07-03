import { Suspense } from 'react'

import { MemberDirectoryList, type MemberDirectoryListMember } from '@/components/members/member-directory-list'
import { MemberDirectorySkeleton } from '@/components/members/member-directory-skeleton'
import { Badge } from '@/components/ui/badge'

import { publicPageContent } from '@/assets/data/public-pages'

import type { Locale } from '@/lib/i18n'
import { listMemberProfiles } from '@/lib/member-profiles'

type PublicMembersDirectoryProps = {
  locale: Locale
}

type PublicMembersPageProps = {
  locale: Locale
}

const PublicMembersDirectory = async ({ locale }: PublicMembersDirectoryProps) => {
  const content = publicPageContent[locale].members
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
          {content.unavailableMessage}
        </p>
      )}

      <MemberDirectoryList members={directoryMembers} variant='public' labels={content.directoryLabels} />
    </>
  )
}

const PublicMembersPage = ({ locale }: PublicMembersPageProps) => {
  const content = publicPageContent[locale].members

  return (
    <section className='bg-muted/30 min-h-screen px-4 py-10 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-6xl space-y-8'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
          <div className='space-y-3'>
            <Badge variant='outline'>{content.badge}</Badge>
            <h1 className='text-3xl font-bold text-balance sm:text-4xl'>{content.title}</h1>
          </div>
        </div>

        <Suspense fallback={<MemberDirectorySkeleton variant='public' loadingLabel={content.loadingLabel} />}>
          <PublicMembersDirectory locale={locale} />
        </Suspense>
      </div>
    </section>
  )
}

export default PublicMembersPage
