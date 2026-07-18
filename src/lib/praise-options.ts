import { revalidateTag, unstable_cache } from 'next/cache'

import { eulogyOptions } from '@/lib/auth'
import { getSql } from '@/lib/neon'

export type PraiseOption = {
  value: string
  label: string
}

type PraiseOptionRow = {
  value: string
  label: string
  sort_order: number
}

const praiseOptionsCacheTag = 'praise-options'

export const defaultPraiseOptions: PraiseOption[] = eulogyOptions.map(option => ({
  value: option.value,
  label: option.label
}))

let praiseOptionsTablePromise: Promise<void> | null = null

const getSeedPraiseOptionsJson = () => {
  return JSON.stringify(
    defaultPraiseOptions.map((option, index) => ({
      value: option.value,
      label: option.label,
      sort_order: index
    }))
  )
}

const ensurePraiseOptionsTable = async () => {
  if (!praiseOptionsTablePromise) {
    praiseOptionsTablePromise = (async () => {
      await getSql()`
        CREATE TABLE IF NOT EXISTS praise_options (
          value TEXT PRIMARY KEY,
          label TEXT NOT NULL,
          sort_order INTEGER NOT NULL DEFAULT 0,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `

      await getSql()`
        WITH existing AS (
          SELECT EXISTS(SELECT 1 FROM praise_options) AS has_rows
        ),
        seed_options AS (
          SELECT
            value,
            label,
            sort_order
          FROM jsonb_to_recordset(${getSeedPraiseOptionsJson()}::jsonb) AS seed(
            value TEXT,
            label TEXT,
            sort_order INTEGER
          )
          WHERE NOT (SELECT has_rows FROM existing)
        )
        INSERT INTO praise_options (
          value,
          label,
          sort_order
        )
        SELECT
          value,
          label,
          sort_order
        FROM seed_options
        ON CONFLICT (value) DO NOTHING
      `
    })()

    praiseOptionsTablePromise = praiseOptionsTablePromise.catch(error => {
      praiseOptionsTablePromise = null
      throw error
    })
  }

  return praiseOptionsTablePromise
}

const normalizePraiseOptionLabel = (label: string) => label.trim().replace(/\s+/g, ' ')

const normalizePraiseOptionLabels = (labels: string[]) => {
  const seenLabels = new Set<string>()
  const normalizedLabels: string[] = []

  labels.forEach(label => {
    const normalizedLabel = normalizePraiseOptionLabel(label)
    const normalizedKey = normalizedLabel.toLocaleLowerCase('en-US')

    if (!normalizedLabel || seenLabels.has(normalizedKey)) return

    seenLabels.add(normalizedKey)
    normalizedLabels.push(normalizedLabel)
  })

  return normalizedLabels
}

const mapPraiseOption = (row: PraiseOptionRow): PraiseOption => ({
  value: row.value,
  label: row.label
})

const listPraiseOptionRows = unstable_cache(
  async () => {
    await ensurePraiseOptionsTable()

    return (await getSql()`
      SELECT
        value,
        label,
        sort_order
      FROM praise_options
      ORDER BY sort_order ASC, label ASC
    `) as PraiseOptionRow[]
  },
  [praiseOptionsCacheTag],
  {
    revalidate: 60,
    tags: [praiseOptionsCacheTag]
  }
)

export const listPraiseOptions = async () => {
  const rows = await listPraiseOptionRows()
  const options = rows.map(mapPraiseOption)

  return options.length > 0 ? options : defaultPraiseOptions
}

export const listPraiseOptionsWithFallback = async () => {
  try {
    return await listPraiseOptions()
  } catch {
    return defaultPraiseOptions
  }
}

export const isKnownPraiseOption = (value: string, options: readonly PraiseOption[]) => {
  return options.some(option => option.value === value)
}

export const savePraiseOptions = async (labels: string[]) => {
  const normalizedLabels = normalizePraiseOptionLabels(labels)

  if (normalizedLabels.length === 0) {
    throw new Error('At least one praise preference is required.')
  }

  await ensurePraiseOptionsTable()

  await getSql()`
    WITH input_options AS (
      SELECT
        value AS label,
        (ordinality - 1)::INTEGER AS sort_order
      FROM jsonb_array_elements_text(${JSON.stringify(normalizedLabels)}::jsonb)
      WITH ORDINALITY AS items(value, ordinality)
    )
    INSERT INTO praise_options (
      value,
      label,
      sort_order
    )
    SELECT
      label,
      label,
      sort_order
    FROM input_options
    ON CONFLICT (value)
    DO UPDATE SET
      label = EXCLUDED.label,
      sort_order = EXCLUDED.sort_order,
      updated_at = NOW()
  `

  await getSql()`
    DELETE FROM praise_options
    WHERE value NOT IN (
      SELECT value
      FROM jsonb_array_elements_text(${JSON.stringify(normalizedLabels)}::jsonb) AS options(value)
    )
  `

  const rows = (await getSql()`
    SELECT
      value,
      label,
      sort_order
    FROM praise_options
    ORDER BY sort_order ASC, label ASC
  `) as PraiseOptionRow[]

  revalidateTag(praiseOptionsCacheTag, { expire: 0 })

  return rows.map(mapPraiseOption)
}
