import { revalidateTag, unstable_cache } from 'next/cache'

import { getSql } from '@/lib/neon'
import {
  bamenaCompoundOptions,
  eulogyOptions,
  usStateOptions,
  type BamenaCompoundOptionValue,
  type UsStateOptionValue
} from '@/lib/auth'

type MemberProfileRow = {
  clerk_user_id: string
  first_name: string
  last_name: string
  email: string
  phone_number: string
  image_url: string | null
  eulogy_preference: string
  us_state: string
  cameroon_origin_city: string
  bamena_compound: string
  profile_complete: boolean
  created_at: Date | string
  updated_at: Date | string
}

type OptionalUsState = UsStateOptionValue | ''
type OptionalBamenaCompound = BamenaCompoundOptionValue | ''

const memberProfilesCacheTag = 'member-profiles'
const defaultMemberProfilesTimeoutMs = 8000

export type MemberProfile = {
  clerkUserId: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  imageUrl: string | null
  eulogyPreference: string
  usState: OptionalUsState
  cameroonOriginCity: string
  bamenaCompound: OptionalBamenaCompound
  profileComplete: boolean
  createdAt: Date
  updatedAt: Date
}

export type SaveMemberProfileInput = {
  clerkUserId: string
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  imageUrl?: string | null
  eulogyPreference: string
  usState?: OptionalUsState
  cameroonOriginCity?: string
  bamenaCompound?: OptionalBamenaCompound
  profileComplete?: boolean
}

let memberProfilesTablePromise: Promise<void> | null = null

const getEulogyPreference = (value: string) => {
  if (value === 'Tah Nji Nana') {
    return 'Tah Nji'
  }

  return value.trim() || eulogyOptions[0].value
}

const getUsState = (value: string): OptionalUsState => {
  return usStateOptions.some(option => option.value === value) ? (value as UsStateOptionValue) : ''
}

const getBamenaCompound = (value: string): OptionalBamenaCompound => {
  if (value === 'Bangweu (also known as Bangoue or Bangweuh)') {
    return 'Bangweu'
  }

  return bamenaCompoundOptions.some(option => option.value === value) ? (value as BamenaCompoundOptionValue) : ''
}

const mapMemberProfile = (row: MemberProfileRow): MemberProfile => ({
  clerkUserId: row.clerk_user_id,
  firstName: row.first_name,
  lastName: row.last_name,
  email: row.email,
  phoneNumber: row.phone_number,
  imageUrl: row.image_url,
  eulogyPreference: getEulogyPreference(row.eulogy_preference),
  usState: getUsState(row.us_state),
  cameroonOriginCity: row.cameroon_origin_city,
  bamenaCompound: getBamenaCompound(row.bamena_compound),
  profileComplete: row.profile_complete,
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at)
})

const ensureMemberProfilesTable = async () => {
  if (!memberProfilesTablePromise) {
    memberProfilesTablePromise = (async () => {
      await getSql()`
        CREATE TABLE IF NOT EXISTS member_profiles (
          clerk_user_id TEXT PRIMARY KEY,
          first_name TEXT NOT NULL DEFAULT '',
          last_name TEXT NOT NULL DEFAULT '',
          email TEXT NOT NULL,
          phone_number TEXT NOT NULL DEFAULT '',
          image_url TEXT,
          eulogy_preference TEXT NOT NULL DEFAULT 'Tâagi',
          us_state TEXT NOT NULL DEFAULT '',
          cameroon_origin_city TEXT NOT NULL DEFAULT '',
          bamena_compound TEXT NOT NULL DEFAULT '',
          profile_complete BOOLEAN NOT NULL DEFAULT FALSE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `

      await getSql()`
        ALTER TABLE member_profiles
        ALTER COLUMN eulogy_preference SET DEFAULT 'Tâagi'
      `

      await getSql()`
        ALTER TABLE member_profiles
        ADD COLUMN IF NOT EXISTS us_state TEXT NOT NULL DEFAULT ''
      `

      await getSql()`
        ALTER TABLE member_profiles
        ADD COLUMN IF NOT EXISTS phone_number TEXT NOT NULL DEFAULT ''
      `

      await getSql()`
        ALTER TABLE member_profiles
        ADD COLUMN IF NOT EXISTS cameroon_origin_city TEXT NOT NULL DEFAULT ''
      `

      await getSql()`
        ALTER TABLE member_profiles
        ADD COLUMN IF NOT EXISTS bamena_compound TEXT NOT NULL DEFAULT ''
      `
    })()

    memberProfilesTablePromise = memberProfilesTablePromise.catch(error => {
      memberProfilesTablePromise = null
      throw error
    })
  }

  return memberProfilesTablePromise
}

export const getMemberProfile = async (clerkUserId: string) => {
  await ensureMemberProfilesTable()

  const rows = (await getSql()`
    SELECT
      clerk_user_id,
      first_name,
      last_name,
      email,
      phone_number,
      image_url,
      eulogy_preference,
      us_state,
      cameroon_origin_city,
      bamena_compound,
      profile_complete,
      created_at,
      updated_at
    FROM member_profiles
    WHERE clerk_user_id = ${clerkUserId}
    LIMIT 1
  `) as MemberProfileRow[]

  return rows[0] ? mapMemberProfile(rows[0]) : null
}

const listMemberProfileRows = unstable_cache(
  async () => {
    await ensureMemberProfilesTable()

    return (await getSql()`
      SELECT
        clerk_user_id,
        first_name,
        last_name,
        email,
        phone_number,
        image_url,
        eulogy_preference,
        us_state,
        cameroon_origin_city,
        bamena_compound,
        profile_complete,
        created_at,
        updated_at
      FROM member_profiles
      ORDER BY
        NULLIF(last_name, '') ASC NULLS LAST,
        NULLIF(first_name, '') ASC NULLS LAST,
        updated_at DESC
    `) as MemberProfileRow[]
  },
  [memberProfilesCacheTag],
  {
    revalidate: 60,
    tags: [memberProfilesCacheTag]
  }
)

export const listMemberProfiles = async () => {
  const rows = await listMemberProfileRows()

  return rows.map(mapMemberProfile)
}

export const listMemberProfilesWithTimeout = async (timeoutMs = defaultMemberProfilesTimeoutMs) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  try {
    return await Promise.race([
      listMemberProfiles(),
      new Promise<never>((_, reject) => {
        timeoutId = setTimeout(() => {
          reject(new Error(`Member directory lookup timed out after ${timeoutMs}ms.`))
        }, timeoutMs)
      })
    ])
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  }
}

export const deleteMemberProfile = async (clerkUserId: string) => {
  const memberId = clerkUserId.trim()

  if (!memberId) return

  await ensureMemberProfilesTable()

  await getSql()`
    DELETE FROM member_profiles
    WHERE clerk_user_id = ${memberId}
  `

  revalidateTag(memberProfilesCacheTag, { expire: 0 })
}

export const saveMemberProfile = async ({
  clerkUserId,
  firstName,
  lastName,
  email,
  phoneNumber = '',
  imageUrl,
  eulogyPreference,
  usState = '',
  cameroonOriginCity = '',
  bamenaCompound = '',
  profileComplete = true
}: SaveMemberProfileInput) => {
  await ensureMemberProfilesTable()

  const rows = (await getSql()`
    INSERT INTO member_profiles (
      clerk_user_id,
      first_name,
      last_name,
      email,
      phone_number,
      image_url,
      eulogy_preference,
      us_state,
      cameroon_origin_city,
      bamena_compound,
      profile_complete
    )
    VALUES (
      ${clerkUserId},
      ${firstName},
      ${lastName},
      ${email},
      ${phoneNumber},
      ${imageUrl ?? null},
      ${eulogyPreference},
      ${usState},
      ${cameroonOriginCity},
      ${bamenaCompound},
      ${profileComplete}
    )
    ON CONFLICT (clerk_user_id)
    DO UPDATE SET
      first_name = EXCLUDED.first_name,
      last_name = EXCLUDED.last_name,
      email = EXCLUDED.email,
      phone_number = EXCLUDED.phone_number,
      image_url = EXCLUDED.image_url,
      eulogy_preference = EXCLUDED.eulogy_preference,
      us_state = EXCLUDED.us_state,
      cameroon_origin_city = EXCLUDED.cameroon_origin_city,
      bamena_compound = EXCLUDED.bamena_compound,
      profile_complete = EXCLUDED.profile_complete,
      updated_at = NOW()
    RETURNING
      clerk_user_id,
      first_name,
      last_name,
      email,
      phone_number,
      image_url,
      eulogy_preference,
      us_state,
      cameroon_origin_city,
      bamena_compound,
      profile_complete,
      created_at,
      updated_at
  `) as MemberProfileRow[]

  revalidateTag(memberProfilesCacheTag, { expire: 0 })

  return mapMemberProfile(rows[0])
}
