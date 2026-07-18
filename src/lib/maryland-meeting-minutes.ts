import { getSql } from '@/lib/neon'
import { translateTextsToFrench, type AutomaticTranslationStatus } from '@/lib/automatic-translation'

import type { Locale } from '@/lib/i18n'

type MarylandMeetingMinutesRow = {
  date_slug: string
  agenda_titles: unknown
  agenda_details: unknown
  translated_agenda_titles: unknown
  translated_agenda_details: unknown
  created_at: Date | string
  updated_at: Date | string
}

type MarylandMeetingAgendaItem = {
  title: string
  defaultDetails: string
}

export type MarylandMeetingMinutes = {
  dateSlug: string
  agendaTitles: string[]
  agendaDetails: string[]
  translatedAgendaTitles: string[]
  translatedAgendaDetails: string[]
  createdAt: Date
  updatedAt: Date
}

export type SaveMarylandMeetingMinutesResult = {
  minutes: MarylandMeetingMinutes
  translationStatus: AutomaticTranslationStatus
}

export type MarylandMeetingAgendaDisplayItem = {
  title: string
  details: string
}

export const marylandMeetingAgendaByLocale: Record<Locale, MarylandMeetingAgendaItem[]> = {
  en: [
    {
      title: '(1) Family news - Village news.',
      defaultDetails: 'Family updates and news from Bamena village are recorded under this agenda point.'
    },
    {
      title: '(2) Prayer.',
      defaultDetails: 'Prayer intentions shared during the meeting are recorded here.'
    },
    {
      title: '(3) Report of the last meeting.',
      defaultDetails: 'Summary, follow-up items, and decisions from the previous meeting are recorded here.'
    },
    {
      title: '(4) Report of the last committee.',
      defaultDetails: 'Committee updates, decisions, and follow-up actions are recorded here.'
    },
    {
      title: '(5) Death of our mother and member Mamam Marie Toumi.',
      defaultDetails: 'Condolence information, support decisions, and related community actions are recorded here.'
    },
    {
      title: "(6) Self-review of May 2026's fundraising.",
      defaultDetails: 'Review, lessons learned, and next steps from the May 2026 fundraising are recorded here.'
    },
    {
      title: '(7) Finances.',
      defaultDetails: 'Treasury updates, contributions, expenses, balances, and financial decisions are recorded here.'
    },
    {
      title: '(8) Refreshments.',
      defaultDetails: 'Refreshment planning, assignments, and related items are recorded here.'
    }
  ],
  fr: [
    {
      title: '(1)-Nouvelles de Famille - Nouvelles du village.',
      defaultDetails: 'Les nouvelles des familles et les nouvelles du village Bamena sont notées sous ce point.'
    },
    {
      title: '(2)-Prière.',
      defaultDetails: 'Les intentions de prière partagées pendant la réunion sont notées ici.'
    },
    {
      title: '(3)-Compte rendu de la dernière séance.',
      defaultDetails: 'Le résumé, les suivis et les décisions de la dernière séance sont notés ici.'
    },
    {
      title: '(4)-Compte rendu du dernier comité.',
      defaultDetails: 'Les nouvelles du comité, les décisions et les actions de suivi sont notées ici.'
    },
    {
      title: '(5)-Décès de notre mère et membre Mamam Marie Toumi.',
      defaultDetails: 'Les condoléances, les décisions de soutien et les actions communautaires liées sont notées ici.'
    },
    {
      title: '(6)-Auto critique sur la collecte de fonds de mai 2026.',
      defaultDetails:
        'Les remarques, les leçons apprises et les prochaines étapes de la collecte de fonds de mai 2026 sont notées ici.'
    },
    {
      title: '(7)-Finances.',
      defaultDetails:
        'Les mises à jour de trésorerie, les contributions, les dépenses, les soldes et les décisions financières sont notés ici.'
    },
    {
      title: '(8)-Collation.',
      defaultDetails: 'La planification de la collation, les responsabilités et les éléments liés sont notés ici.'
    }
  ]
}

const defaultMarylandMeetingAgendaCount = marylandMeetingAgendaByLocale.en.length

let marylandMeetingMinutesTablePromise: Promise<void> | null = null

const ensureMarylandMeetingMinutesTable = async () => {
  if (!marylandMeetingMinutesTablePromise) {
    marylandMeetingMinutesTablePromise = (async () => {
      await getSql()`
        CREATE TABLE IF NOT EXISTS maryland_meeting_minutes (
          date_slug TEXT PRIMARY KEY,
          agenda_titles JSONB NOT NULL DEFAULT '[]'::jsonb,
          agenda_details JSONB NOT NULL DEFAULT '[]'::jsonb,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `

      await getSql()`
        ALTER TABLE maryland_meeting_minutes
        ADD COLUMN IF NOT EXISTS agenda_titles JSONB NOT NULL DEFAULT '[]'::jsonb
      `

      await getSql()`
        ALTER TABLE maryland_meeting_minutes
        ADD COLUMN IF NOT EXISTS agenda_details JSONB NOT NULL DEFAULT '[]'::jsonb
      `

      await getSql()`
        ALTER TABLE maryland_meeting_minutes
        ADD COLUMN IF NOT EXISTS translated_agenda_titles JSONB NOT NULL DEFAULT '[]'::jsonb
      `

      await getSql()`
        ALTER TABLE maryland_meeting_minutes
        ADD COLUMN IF NOT EXISTS translated_agenda_details JSONB NOT NULL DEFAULT '[]'::jsonb
      `
    })()

    marylandMeetingMinutesTablePromise = marylandMeetingMinutesTablePromise.catch(error => {
      marylandMeetingMinutesTablePromise = null
      throw error
    })
  }

  return marylandMeetingMinutesTablePromise
}

const getStringArrayFromValue = (value: unknown) => {
  const rawValue =
    typeof value === 'string'
      ? (() => {
          try {
            return JSON.parse(value) as unknown
          } catch {
            return []
          }
        })()
      : value

  if (!Array.isArray(rawValue)) return []

  return rawValue.map(item => (typeof item === 'string' ? item : ''))
}

const getFallbackAgendaTitle = (index: number, locale: Locale) => {
  return marylandMeetingAgendaByLocale[locale][index]?.title ?? `(${index + 1}) Agenda point.`
}

const getGenericAgendaTitle = (index: number) => `(${index + 1}) Agenda point.`

const getLocalizedGenericAgendaTitle = (index: number, locale: Locale) => {
  return locale === 'fr' ? `(${index + 1})-Point de l'ordre du jour.` : getGenericAgendaTitle(index)
}

const normalizeAgendaTextForComparison = (value: string) => {
  return value
    .trim()
    .toLocaleLowerCase('en-US')
    .replace(/[’]/g, "'")
    .replace(/^\(\d+\)\s*-?\s*/, '')
    .replace(/\s+/g, ' ')
    .replace(/\.$/, '')
}

const getEnglishAgendaIndexByTitle = (title: string) => {
  const normalizedTitle = normalizeAgendaTextForComparison(title)

  return marylandMeetingAgendaByLocale.en.findIndex(
    agendaItem => normalizeAgendaTextForComparison(agendaItem.title) === normalizedTitle
  )
}

const getEnglishAgendaIndexByDetails = (details: string) => {
  const normalizedDetails = normalizeAgendaTextForComparison(details)

  return marylandMeetingAgendaByLocale.en.findIndex(
    agendaItem => normalizeAgendaTextForComparison(agendaItem.defaultDetails) === normalizedDetails
  )
}

const translateCustomPublishedAgendaDetailsToFrench = (details: string) => {
  const prayerGivenMatch = details.match(/^Prayer was given by\s+(.+?)[.]?$/i)

  if (prayerGivenMatch?.[1]) {
    return `La prière a été faite par ${prayerGivenMatch[1].trim()}.`
  }

  return details
}

const localizePublishedAgendaTitle = (title: string, index: number, locale: Locale) => {
  const trimmedTitle = title.trim()

  if (!trimmedTitle) return getFallbackAgendaTitle(index, locale)
  if (locale === 'en') return trimmedTitle

  const englishAgendaIndex = getEnglishAgendaIndexByTitle(trimmedTitle)

  if (englishAgendaIndex >= 0) {
    return marylandMeetingAgendaByLocale[locale][englishAgendaIndex]?.title ?? trimmedTitle
  }

  if (/^\(\d+\)\s*agenda point\.$/i.test(trimmedTitle)) {
    return getLocalizedGenericAgendaTitle(index, locale)
  }

  return trimmedTitle
}

const localizePublishedAgendaDetails = (details: string, index: number, locale: Locale) => {
  const trimmedDetails = details.trim()

  if (!trimmedDetails || locale === 'en') return trimmedDetails

  const englishAgendaIndex = getEnglishAgendaIndexByDetails(trimmedDetails)

  if (englishAgendaIndex >= 0) {
    return marylandMeetingAgendaByLocale[locale][englishAgendaIndex]?.defaultDetails ?? trimmedDetails
  }

  return locale === 'fr' ? translateCustomPublishedAgendaDetailsToFrench(trimmedDetails) : trimmedDetails
}

const getStaticFrenchAgendaTitle = (title: string, index: number) => {
  const trimmedTitle = title.trim()
  const localizedTitle = localizePublishedAgendaTitle(trimmedTitle, index, 'fr')

  return localizedTitle !== trimmedTitle ? localizedTitle : ''
}

const getStaticFrenchAgendaDetails = (details: string, index: number) => {
  const trimmedDetails = details.trim()
  const localizedDetails = localizePublishedAgendaDetails(trimmedDetails, index, 'fr')

  return localizedDetails !== trimmedDetails ? localizedDetails : ''
}

const getAgendaItemCount = (
  agendaTitles: string[],
  agendaDetails: string[],
  minimumCount = 0
) => {
  return Math.max(minimumCount, agendaTitles.length, agendaDetails.length)
}

export const normalizeMarylandMeetingAgendaTitles = (
  agendaTitles: string[],
  locale: Locale = 'en',
  count = Math.max(defaultMarylandMeetingAgendaCount, agendaTitles.length)
) => {
  return Array.from({ length: count }, (_, index) => agendaTitles[index]?.trim() || getFallbackAgendaTitle(index, locale))
}

export const normalizeMarylandMeetingAgendaDetails = (agendaDetails: string[], count = agendaDetails.length) => {
  return Array.from({ length: count }, (_, index) => agendaDetails[index]?.trim() ?? '')
}

const normalizeTranslatedAgendaItems = (agendaItems: string[], count: number) => {
  return Array.from({ length: count }, (_, index) => agendaItems[index]?.trim() ?? '')
}

const mapMarylandMeetingMinutes = (row: MarylandMeetingMinutesRow): MarylandMeetingMinutes => {
  const agendaTitles = getStringArrayFromValue(row.agenda_titles)
  const agendaDetails = getStringArrayFromValue(row.agenda_details)
  const translatedAgendaTitles = getStringArrayFromValue(row.translated_agenda_titles)
  const translatedAgendaDetails = getStringArrayFromValue(row.translated_agenda_details)

  const agendaItemCount = getAgendaItemCount(agendaTitles, agendaDetails)

  return {
    dateSlug: row.date_slug,
    agendaTitles: normalizeMarylandMeetingAgendaTitles(agendaTitles, 'en', agendaItemCount),
    agendaDetails: normalizeMarylandMeetingAgendaDetails(agendaDetails, agendaItemCount),
    translatedAgendaTitles: normalizeTranslatedAgendaItems(translatedAgendaTitles, agendaItemCount),
    translatedAgendaDetails: normalizeTranslatedAgendaItems(translatedAgendaDetails, agendaItemCount),
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at)
  }
}

export const getMarylandMeetingAgendaItems = (
  locale: Locale,
  publishedAgendaTitles?: string[],
  publishedAgendaDetails?: string[],
  translatedAgendaTitles?: string[],
  translatedAgendaDetails?: string[]
): MarylandMeetingAgendaDisplayItem[] => {
  const agendaItemCount =
    publishedAgendaTitles || publishedAgendaDetails
      ? getAgendaItemCount(publishedAgendaTitles ?? [], publishedAgendaDetails ?? [])
      : 0

  const normalizedTitles = publishedAgendaTitles
    ? normalizeMarylandMeetingAgendaTitles(publishedAgendaTitles, 'en', agendaItemCount)
    : null

  const normalizedDetails = publishedAgendaDetails
    ? normalizeMarylandMeetingAgendaDetails(publishedAgendaDetails, agendaItemCount)
    : null

  const normalizedTranslatedTitles =
    locale === 'fr' && translatedAgendaTitles
      ? normalizeTranslatedAgendaItems(translatedAgendaTitles, agendaItemCount)
      : null

  const normalizedTranslatedDetails =
    locale === 'fr' && translatedAgendaDetails
      ? normalizeTranslatedAgendaItems(translatedAgendaDetails, agendaItemCount)
      : null

  return Array.from({ length: agendaItemCount }, (_, index) => {
    const translatedTitle = normalizedTranslatedTitles?.[index]?.trim()
    const translatedDetails = normalizedTranslatedDetails?.[index]?.trim()

    return {
      title:
        translatedTitle ||
        (normalizedTitles?.[index]
          ? localizePublishedAgendaTitle(normalizedTitles[index], index, locale)
          : getFallbackAgendaTitle(index, locale)),
      details:
        translatedDetails ||
        (normalizedDetails ? localizePublishedAgendaDetails(normalizedDetails[index] ?? '', index, locale) : '')
    }
  })
}

export const getMarylandMeetingAgendaItemsWithAutomaticTranslations = async (
  locale: Locale,
  publishedAgendaTitles?: string[],
  publishedAgendaDetails?: string[],
  translatedAgendaTitles?: string[],
  translatedAgendaDetails?: string[]
): Promise<MarylandMeetingAgendaDisplayItem[]> => {
  const agendaItems = getMarylandMeetingAgendaItems(
    locale,
    publishedAgendaTitles,
    publishedAgendaDetails,
    translatedAgendaTitles,
    translatedAgendaDetails
  )

  if (locale !== 'fr' || agendaItems.length === 0) return agendaItems

  const agendaItemCount = getAgendaItemCount(publishedAgendaTitles ?? [], publishedAgendaDetails ?? [])
  const normalizedTitles = normalizeMarylandMeetingAgendaTitles(publishedAgendaTitles ?? [], 'en', agendaItemCount)
  const normalizedDetails = normalizeMarylandMeetingAgendaDetails(publishedAgendaDetails ?? [], agendaItemCount)
  const normalizedTranslatedTitles = normalizeTranslatedAgendaItems(translatedAgendaTitles ?? [], agendaItemCount)
  const normalizedTranslatedDetails = normalizeTranslatedAgendaItems(translatedAgendaDetails ?? [], agendaItemCount)

  const missingTranslations: {
    field: keyof MarylandMeetingAgendaDisplayItem
    index: number
    text: string
  }[] = []

  normalizedTitles.forEach((title, index) => {
    if (normalizedTranslatedTitles[index]?.trim()) return

    const trimmedTitle = title.trim()

    if (trimmedTitle && !getStaticFrenchAgendaTitle(trimmedTitle, index)) {
      missingTranslations.push({
        field: 'title',
        index,
        text: trimmedTitle
      })
    }
  })

  normalizedDetails.forEach((details, index) => {
    if (normalizedTranslatedDetails[index]?.trim()) return

    const trimmedDetails = details.trim()

    if (trimmedDetails && !getStaticFrenchAgendaDetails(trimmedDetails, index)) {
      missingTranslations.push({
        field: 'details',
        index,
        text: trimmedDetails
      })
    }
  })

  if (missingTranslations.length === 0) return agendaItems

  const translationResult = await translateTextsToFrench(missingTranslations.map(item => item.text))

  return missingTranslations.reduce(
    (items, item, translationIndex) => {
      const translation = translationResult.translations[translationIndex]?.trim()

      if (!translation) return items

      return items.map((agendaItem, agendaIndex) =>
        agendaIndex === item.index
          ? {
              ...agendaItem,
              [item.field]: translation
            }
          : agendaItem
      )
    },
    agendaItems
  )
}

export const listMarylandMeetingMinutes = async () => {
  await ensureMarylandMeetingMinutesTable()

  const rows = (await getSql()`
    SELECT
      date_slug,
      agenda_titles,
      agenda_details,
      translated_agenda_titles,
      translated_agenda_details,
      created_at,
      updated_at
    FROM maryland_meeting_minutes
    ORDER BY date_slug ASC
  `) as MarylandMeetingMinutesRow[]

  return rows.map(mapMarylandMeetingMinutes)
}

export const getMarylandMeetingMinutes = async (dateSlug: string) => {
  await ensureMarylandMeetingMinutesTable()

  const rows = (await getSql()`
    SELECT
      date_slug,
      agenda_titles,
      agenda_details,
      translated_agenda_titles,
      translated_agenda_details,
      created_at,
      updated_at
    FROM maryland_meeting_minutes
    WHERE date_slug = ${dateSlug}
    LIMIT 1
  `) as MarylandMeetingMinutesRow[]

  return rows[0] ? mapMarylandMeetingMinutes(rows[0]) : null
}

export const saveMarylandMeetingMinutes = async (
  dateSlug: string,
  {
    agendaTitles,
    agendaDetails
  }: {
    agendaTitles: string[]
    agendaDetails: string[]
  }
) => {
  await ensureMarylandMeetingMinutesTable()

  const agendaItemCount = getAgendaItemCount(agendaTitles, agendaDetails)

  const normalizedAgendaItems = Array.from({ length: agendaItemCount }, (_, index) => ({
    title: agendaTitles[index]?.trim() ?? '',
    details: agendaDetails[index]?.trim() ?? ''
  })).filter(item => item.title || item.details)

  const normalizedTitles = normalizedAgendaItems.map((item, index) => item.title || getGenericAgendaTitle(index))
  const normalizedDetails = normalizedAgendaItems.map(item => item.details)
  const translationResult = await translateTextsToFrench([...normalizedTitles, ...normalizedDetails])
  const automaticTranslatedTitles = translationResult.translations.slice(0, normalizedTitles.length)
  const automaticTranslatedDetails = translationResult.translations.slice(normalizedTitles.length)

  const translatedTitles = normalizedTitles.map(
    (title, index) => automaticTranslatedTitles[index]?.trim() || getStaticFrenchAgendaTitle(title, index)
  )

  const translatedDetails = normalizedDetails.map(
    (details, index) => automaticTranslatedDetails[index]?.trim() || getStaticFrenchAgendaDetails(details, index)
  )

  const rows = (await getSql()`
    INSERT INTO maryland_meeting_minutes (
      date_slug,
      agenda_titles,
      agenda_details,
      translated_agenda_titles,
      translated_agenda_details
    )
    VALUES (
      ${dateSlug},
      ${JSON.stringify(normalizedTitles)}::jsonb,
      ${JSON.stringify(normalizedDetails)}::jsonb,
      ${JSON.stringify(translatedTitles)}::jsonb,
      ${JSON.stringify(translatedDetails)}::jsonb
    )
    ON CONFLICT (date_slug)
    DO UPDATE SET
      agenda_titles = EXCLUDED.agenda_titles,
      agenda_details = EXCLUDED.agenda_details,
      translated_agenda_titles = EXCLUDED.translated_agenda_titles,
      translated_agenda_details = EXCLUDED.translated_agenda_details,
      updated_at = NOW()
    RETURNING
      date_slug,
      agenda_titles,
      agenda_details,
      translated_agenda_titles,
      translated_agenda_details,
      created_at,
      updated_at
  `) as MarylandMeetingMinutesRow[]

  return {
    minutes: mapMarylandMeetingMinutes(rows[0]),
    translationStatus: translationResult.status
  } satisfies SaveMarylandMeetingMinutesResult
}
