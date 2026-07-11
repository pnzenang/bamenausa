import Image from 'next/image'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server'
import { BadgeCheckIcon, CameraIcon, SaveIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import {
  bamenaCompoundOptions,
  eulogyOptions,
  fullMembersPath,
  signInPath,
  usStateOptions,
  type BamenaCompoundOptionValue,
  type UsStateOptionValue
} from '@/lib/auth'
import { getMemberProfile, saveMemberProfile } from '@/lib/member-profiles'

export const metadata: Metadata = {
  title: 'Bamena-USA Profile'
}

type BamenaProfileMetadata = {
  bamenaProfile?: {
    eulogyPreference?: string
    phoneNumber?: string
    usState?: UsStateOptionValue | ''
    cameroonOriginCity?: string
    bamenaCompound?: BamenaCompoundOptionValue | ''
    profileComplete?: boolean
    updatedAt?: string
  }
}

type ProfilePageProps = {
  searchParams?: Promise<{
    error?: string
  }>
}

const selectClassName =
  'border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full rounded-md border px-3 text-sm shadow-xs outline-none focus-visible:ring-[3px]'

const isKnownEulogyPreference = (value: string) => {
  return eulogyOptions.some(option => option.value === value)
}

const getEulogyPreference = (value: FormDataEntryValue | null): string => {
  const preference = String(value ?? '').trim()

  return isKnownEulogyPreference(preference) ? preference : ''
}

const getUsState = (value: FormDataEntryValue | null): UsStateOptionValue | '' => {
  const state = String(value ?? '')

  return usStateOptions.some(option => option.value === state) ? (state as UsStateOptionValue) : ''
}

const getBamenaCompound = (value: FormDataEntryValue | null): BamenaCompoundOptionValue | '' => {
  const compound = String(value ?? '')

  return bamenaCompoundOptions.some(option => option.value === compound) ? (compound as BamenaCompoundOptionValue) : ''
}

const saveProfile = async (formData: FormData) => {
  'use server'

  const { userId } = await auth()
  const user = await currentUser()

  if (!userId || !user) {
    redirect(signInPath)
  }

  const firstName = String(formData.get('firstName') ?? '').trim()
  const lastName = String(formData.get('lastName') ?? '').trim()
  const eulogyPreferenceValue = formData.get('eulogyPreference')
  const eulogyPreference = getEulogyPreference(eulogyPreferenceValue)
  const phoneNumber = String(formData.get('phoneNumber') ?? '').trim()
  const usState = getUsState(formData.get('usState'))
  const cameroonOriginCity = String(formData.get('cameroonOriginCity') ?? '').trim()
  const bamenaCompound = getBamenaCompound(formData.get('bamenaCompound'))
  const profileImage = formData.get('profileImage')
  const email = user.primaryEmailAddress?.emailAddress ?? String(formData.get('email') ?? '').trim()
  let imageUrl = user.imageUrl
  const hasEulogyPreference = Boolean(eulogyPreference)

  if (!firstName || !lastName || !email || !hasEulogyPreference || !usState || !cameroonOriginCity || !bamenaCompound) {
    redirect('/profile?error=required')
  }

  const client = await clerkClient()

  const updatedUser = await client.users.updateUser(userId, {
    firstName: firstName || undefined,
    lastName: lastName || undefined
  })

  imageUrl = updatedUser.imageUrl ?? imageUrl

  if (profileImage instanceof File && profileImage.size > 0) {
    const updatedImageUser = await client.users.updateUserProfileImage(userId, {
      file: profileImage
    })

    imageUrl = updatedImageUser.imageUrl ?? imageUrl
  }

  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      bamenaProfile: {
        eulogyPreference,
        phoneNumber,
        usState,
        cameroonOriginCity,
        bamenaCompound,
        profileComplete: true,
        updatedAt: new Date().toISOString()
      }
    }
  })

  await saveMemberProfile({
    clerkUserId: userId,
    firstName,
    lastName,
    email,
    phoneNumber,
    imageUrl,
    eulogyPreference,
    usState,
    cameroonOriginCity,
    bamenaCompound,
    profileComplete: true
  })

  redirect(fullMembersPath)
}

const ProfilePage = async ({ searchParams }: ProfilePageProps) => {
  const user = await currentUser()

  if (!user) {
    redirect(signInPath)
  }

  const profileMetadata = user.publicMetadata as BamenaProfileMetadata
  const bamenaProfile = profileMetadata.bamenaProfile
  let storedProfile: Awaited<ReturnType<typeof getMemberProfile>> = null
  let storageError: string | null = null

  try {
    storedProfile = await getMemberProfile(user.id)
  } catch (error) {
    storageError = error instanceof Error ? error.message : 'Unable to load the Neon profile record.'
  }

  const firstName = storedProfile?.firstName ?? user.firstName ?? ''
  const lastName = storedProfile?.lastName ?? user.lastName ?? ''
  const email = user.primaryEmailAddress?.emailAddress ?? storedProfile?.email ?? ''
  const phoneNumber = storedProfile?.phoneNumber ?? bamenaProfile?.phoneNumber ?? ''
  const profileImageUrl = storedProfile?.imageUrl ?? user.imageUrl

  const selectedEulogyPreference =
    storedProfile?.eulogyPreference ?? bamenaProfile?.eulogyPreference ?? eulogyOptions[0].value

  const selectedEulogyOption = isKnownEulogyPreference(selectedEulogyPreference)
    ? selectedEulogyPreference
    : eulogyOptions[0].value

  const selectedUsState = storedProfile?.usState ?? bamenaProfile?.usState ?? ''
  const cameroonOriginCity = storedProfile?.cameroonOriginCity ?? bamenaProfile?.cameroonOriginCity ?? ''
  const selectedBamenaCompound = storedProfile?.bamenaCompound ?? bamenaProfile?.bamenaCompound ?? ''

  const profileUpdatedAt =
    storedProfile?.updatedAt ?? (bamenaProfile?.updatedAt ? new Date(bamenaProfile.updatedAt) : null)

  const resolvedSearchParams = await searchParams

  const updatedAt = profileUpdatedAt ? profileUpdatedAt.toLocaleDateString('en-US') : null
  const hasRequiredFieldsError = resolvedSearchParams?.error === 'required'
  const profileAltText = [firstName, lastName].filter(Boolean).join(' ') || user.fullName || 'Member profile picture'
  const hasCompletedProfile = storedProfile?.profileComplete ?? bamenaProfile?.profileComplete ?? false

  const profileHeading = hasCompletedProfile ? 'View or edit your Bamena-USA profile' : 'Create your Bamena-USA profile'

  const profileDescription = hasCompletedProfile
    ? 'Review your saved information and update your Bamena-USA member profile anytime.'
    : 'Add the information the community team needs before using the protected member tools.'

  return (
    <div className='mx-auto max-w-5xl space-y-8'>
      <div className='space-y-3'>
        <Badge variant='outline'>Member profile</Badge>
        <div>
          <h1 className='text-3xl font-bold text-balance sm:text-4xl'>{profileHeading}</h1>
          <p className='text-muted-foreground mt-2 max-w-2xl text-lg'>{profileDescription}</p>
        </div>
      </div>

      <div className='grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]'>
        <Card className='rounded-md'>
          <CardHeader>
            <CardTitle className='text-xl'>Profile picture</CardTitle>
            <CardDescription>Current account photo</CardDescription>
          </CardHeader>
          <CardContent className='space-y-5'>
            <div className='bg-muted relative mx-auto size-44 overflow-hidden rounded-full border'>
              <Image src={profileImageUrl} alt={profileAltText} fill className='object-cover' />
            </div>
            <div className='text-muted-foreground space-y-2 text-sm'>
              <p>Upload a new photo in the form. It will replace your Clerk profile picture.</p>
              {updatedAt && (
                <p className='text-primary flex items-center gap-2 font-medium'>
                  <BadgeCheckIcon className='size-4' />
                  Last saved {updatedAt}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className='rounded-md'>
          <CardHeader>
            <CardTitle className='text-xl'>Profile information</CardTitle>
            <CardDescription>Name, email, telephone, location, compound, and praise preference</CardDescription>
          </CardHeader>
          <CardContent>
            {storageError && (
              <p className='border-destructive/30 bg-destructive/10 text-destructive mb-5 rounded-md border px-4 py-3 text-sm'>
                Neon profile storage is not connected: {storageError}
              </p>
            )}
            {hasRequiredFieldsError && (
              <p className='border-destructive/30 bg-destructive/10 text-destructive mb-5 rounded-md border px-4 py-3 text-sm'>
                Please complete all required fields before saving.
              </p>
            )}
            <form action={saveProfile} className='grid gap-5 sm:grid-cols-2'>
              <label className='space-y-2'>
                <span className='text-sm font-medium'>First name</span>
                <Input name='firstName' defaultValue={firstName} placeholder='First name' required />
              </label>
              <label className='space-y-2'>
                <span className='text-sm font-medium'>Last name</span>
                <Input name='lastName' defaultValue={lastName} placeholder='Last name' required />
              </label>
              <label className='space-y-2'>
                <span className='text-sm font-medium'>Email</span>
                <Input name='email' type='email' value={email} readOnly required />
              </label>
              <label className='space-y-2'>
                <span className='text-sm font-medium'>Telephone</span>
                <Input name='phoneNumber' type='tel' defaultValue={phoneNumber} placeholder='Telephone number' />
              </label>
              <label className='space-y-2'>
                <span className='text-sm font-medium'>City of origin</span>
                <Input
                  name='cameroonOriginCity'
                  defaultValue={cameroonOriginCity}
                  placeholder='City of origin'
                  required
                />
              </label>
              <label className='space-y-2'>
                <span className='text-sm font-medium'>U.S. state</span>
                <select name='usState' defaultValue={selectedUsState} className={selectClassName} required>
                  <option value=''>Select a state</option>
                  {usStateOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className='space-y-2 sm:col-span-2'>
                <span className='text-sm font-medium'>Compound in Bamena</span>
                <select
                  name='bamenaCompound'
                  defaultValue={selectedBamenaCompound}
                  className={selectClassName}
                  required
                >
                  <option value=''>Select a compound</option>
                  {bamenaCompoundOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className='space-y-2 sm:col-span-2'>
                <span className='text-sm font-medium'>Praise preference</span>
                <select
                  name='eulogyPreference'
                  defaultValue={selectedEulogyOption}
                  className={selectClassName}
                  required
                >
                  {eulogyOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className='space-y-2 sm:col-span-2'>
                <span className='text-sm font-medium'>Profile picture</span>
                <div className='border-input bg-background flex items-center gap-3 rounded-md border px-3 py-2 shadow-xs'>
                  <CameraIcon className='text-muted-foreground size-4' />
                  <Input
                    name='profileImage'
                    type='file'
                    accept='image/png,image/jpeg,image/webp'
                    className='h-auto border-0 p-0 shadow-none focus-visible:ring-0'
                  />
                </div>
              </label>
              <div className='sm:col-span-2'>
                <Button type='submit' size='lg' className='rounded-full'>
                  <SaveIcon />
                  Save profile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProfilePage
