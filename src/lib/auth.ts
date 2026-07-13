export const signInPath = '/sign-in'
export const signUpPath = '/sign-up'
export const profilePath = '/profile'
export const accountPath = '/account'
export const membersPath = '/members'
export const fullMembersPath = '/members/full'
export const adminPath = '/backend'
export const bamenaLogoUrl = '/images/logo/bamenausa.svg'

type UserMetadata = Record<string, unknown>

type UserEmailAddress = {
  emailAddress?: string | null
}

type AdminCheckUser = {
  publicMetadata?: UserMetadata
  privateMetadata?: UserMetadata
  primaryEmailAddress?: UserEmailAddress | null
  emailAddresses?: UserEmailAddress[]
}

const adminEmailAddresses = new Set(['pnzenang@gmail.com', 'hnnjakou2011@gmail.com'])

const normalizeEmailAddress = (emailAddress?: string | null) => {
  return emailAddress?.trim().toLowerCase() ?? ''
}

const hasAdminRole = (metadata: UserMetadata | undefined) => {
  if (!metadata) return false

  const roles = metadata.roles
  const permissions = metadata.permissions

  return (
    metadata.role === 'admin' ||
    metadata.bamenaRole === 'admin' ||
    metadata.isAdmin === true ||
    (Array.isArray(roles) && roles.includes('admin')) ||
    (Array.isArray(permissions) && permissions.includes('admin'))
  )
}

const hasAdminEmailAddress = (user: AdminCheckUser | null | undefined) => {
  const primaryEmailAddress = normalizeEmailAddress(user?.primaryEmailAddress?.emailAddress)

  if (adminEmailAddresses.has(primaryEmailAddress)) {
    return true
  }

  return (
    user?.emailAddresses?.some(emailAddress =>
      adminEmailAddresses.has(normalizeEmailAddress(emailAddress.emailAddress))
    ) ?? false
  )
}

export const isAdminUser = (user?: AdminCheckUser | null) => {
  return hasAdminRole(user?.publicMetadata) || hasAdminRole(user?.privateMetadata) || hasAdminEmailAddress(user)
}

export const eulogyOptions = [
  {
    value: 'Tâagi',
    label: 'Tâagi'
  },
  {
    value: 'Tâfop',
    label: 'Tâfop'
  },
  {
    value: 'Tâkoua',
    label: 'Tâkoua'
  },
  {
    value: 'Tâquouais',
    label: 'Tâquouais'
  },
  {
    value: 'Tah Nji',
    label: 'Tah Nji'
  },
  {
    value: 'Tah Gni',
    label: 'Tah Gni'
  },
  {
    value: 'Tah Mbouh',
    label: 'Tah Mbouh'
  },
  {
    value: 'Tah Nkwa',
    label: 'Tah Nkwa'
  },
  {
    value: 'Tah Waah',
    label: 'Tah Waah'
  },
  {
    value: 'Tadieuh',
    label: 'Tadieuh'
  },
  {
    value: 'Tanzi Ndam',
    label: 'Tanzi Ndam'
  },
  {
    value: 'Mêrchas',
    label: 'Mêrchas'
  },
  {
    value: 'Mertouk',
    label: 'Mertouk'
  },
  {
    value: 'Ngôsso',
    label: 'Ngôsso'
  },
  {
    value: 'Ngouachais',
    label: 'Ngouachais'
  },
  {
    value: 'Pâagais',
    label: 'Pâagais'
  },
  {
    value: 'Metsa',
    label: 'Metsa'
  },
  {
    value: 'Mewa',
    label: 'Mewa'
  },
  {
    value: 'Matsuva',
    label: 'Matsuva'
  }
] as const

export type EulogyOptionValue = (typeof eulogyOptions)[number]['value']

export const usStateOptions = [
  {
    value: 'AL',
    label: 'Alabama'
  },
  {
    value: 'AK',
    label: 'Alaska'
  },
  {
    value: 'AZ',
    label: 'Arizona'
  },
  {
    value: 'AR',
    label: 'Arkansas'
  },
  {
    value: 'CA',
    label: 'California'
  },
  {
    value: 'CO',
    label: 'Colorado'
  },
  {
    value: 'CT',
    label: 'Connecticut'
  },
  {
    value: 'DE',
    label: 'Delaware'
  },
  {
    value: 'DC',
    label: 'District of Columbia'
  },
  {
    value: 'FL',
    label: 'Florida'
  },
  {
    value: 'GA',
    label: 'Georgia'
  },
  {
    value: 'HI',
    label: 'Hawaii'
  },
  {
    value: 'ID',
    label: 'Idaho'
  },
  {
    value: 'IL',
    label: 'Illinois'
  },
  {
    value: 'IN',
    label: 'Indiana'
  },
  {
    value: 'IA',
    label: 'Iowa'
  },
  {
    value: 'KS',
    label: 'Kansas'
  },
  {
    value: 'KY',
    label: 'Kentucky'
  },
  {
    value: 'LA',
    label: 'Louisiana'
  },
  {
    value: 'ME',
    label: 'Maine'
  },
  {
    value: 'MD',
    label: 'Maryland'
  },
  {
    value: 'MA',
    label: 'Massachusetts'
  },
  {
    value: 'MI',
    label: 'Michigan'
  },
  {
    value: 'MN',
    label: 'Minnesota'
  },
  {
    value: 'MS',
    label: 'Mississippi'
  },
  {
    value: 'MO',
    label: 'Missouri'
  },
  {
    value: 'MT',
    label: 'Montana'
  },
  {
    value: 'NE',
    label: 'Nebraska'
  },
  {
    value: 'NV',
    label: 'Nevada'
  },
  {
    value: 'NH',
    label: 'New Hampshire'
  },
  {
    value: 'NJ',
    label: 'New Jersey'
  },
  {
    value: 'NM',
    label: 'New Mexico'
  },
  {
    value: 'NY',
    label: 'New York'
  },
  {
    value: 'NC',
    label: 'North Carolina'
  },
  {
    value: 'ND',
    label: 'North Dakota'
  },
  {
    value: 'OH',
    label: 'Ohio'
  },
  {
    value: 'OK',
    label: 'Oklahoma'
  },
  {
    value: 'OR',
    label: 'Oregon'
  },
  {
    value: 'PA',
    label: 'Pennsylvania'
  },
  {
    value: 'RI',
    label: 'Rhode Island'
  },
  {
    value: 'SC',
    label: 'South Carolina'
  },
  {
    value: 'SD',
    label: 'South Dakota'
  },
  {
    value: 'TN',
    label: 'Tennessee'
  },
  {
    value: 'TX',
    label: 'Texas'
  },
  {
    value: 'UT',
    label: 'Utah'
  },
  {
    value: 'VT',
    label: 'Vermont'
  },
  {
    value: 'VA',
    label: 'Virginia'
  },
  {
    value: 'WA',
    label: 'Washington'
  },
  {
    value: 'WV',
    label: 'West Virginia'
  },
  {
    value: 'WI',
    label: 'Wisconsin'
  },
  {
    value: 'WY',
    label: 'Wyoming'
  }
] as const

export type UsStateOptionValue = (typeof usStateOptions)[number]['value']

export const bamenaCompoundOptions = [
  {
    value: 'Louh',
    label: 'Louh'
  },
  {
    value: 'Faplouh',
    label: 'Faplouh'
  },
  {
    value: 'Poozou',
    label: 'Poozou'
  },
  {
    value: 'Bangweu',
    label: 'Bangweu'
  },
  {
    value: 'Tchouplang',
    label: 'Tchouplang'
  },
  {
    value: 'Langweu',
    label: 'Langweu'
  }
] as const

export type BamenaCompoundOptionValue = (typeof bamenaCompoundOptions)[number]['value']
