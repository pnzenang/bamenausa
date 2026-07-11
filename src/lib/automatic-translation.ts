export type AutomaticTranslationStatus = 'saved' | 'skipped' | 'failed'

export type AutomaticTranslationResult = {
  status: AutomaticTranslationStatus
  translations: string[]
}

const defaultTranslationModel = 'gpt-4o-mini'

const getOpenAiTranslationConfig = () => {
  const apiKey = process.env.OPENAI_API_KEY?.trim()

  if (!apiKey) return null

  return {
    apiKey,
    model: process.env.OPENAI_TRANSLATION_MODEL?.trim() || defaultTranslationModel
  }
}

const getStringArray = (value: unknown) => {
  if (!Array.isArray(value)) return null

  return value.map(item => (typeof item === 'string' ? item : ''))
}

const parseTranslations = (content: string, expectedCount: number) => {
  try {
    const parsed = JSON.parse(content) as { translations?: unknown }
    const translations = getStringArray(parsed.translations)

    if (!translations || translations.length !== expectedCount) return null

    return translations
  } catch {
    return null
  }
}

export const translateTextsToFrench = async (texts: string[]): Promise<AutomaticTranslationResult> => {
  const config = getOpenAiTranslationConfig()
  const translations = Array.from({ length: texts.length }, () => '')

  if (!config) {
    return {
      status: 'skipped',
      translations
    }
  }

  const entries = texts
    .map((text, index) => ({
      index,
      text: text.trim()
    }))
    .filter(entry => entry.text)

  if (entries.length === 0) {
    return {
      status: 'saved',
      translations
    }
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: config.model,
        temperature: 0,
        response_format: {
          type: 'json_object'
        },
        messages: [
          {
            role: 'system',
            content:
              'Translate Bamena-USA Maryland meeting minutes from English to French. Keep names, addresses, dates, organization names, and agenda numbering. Do not add explanations. Return JSON only as {"translations":["..."]} with the same order and count as the input texts.'
          },
          {
            role: 'user',
            content: JSON.stringify({
              texts: entries.map(entry => entry.text)
            })
          }
        ]
      })
    })

    if (!response.ok) {
      return {
        status: 'failed',
        translations
      }
    }

    const data = (await response.json()) as {
      choices?: {
        message?: {
          content?: string | null
        }
      }[]
    }

    const content = data.choices?.[0]?.message?.content
    const translatedEntries = content ? parseTranslations(content, entries.length) : null

    if (!translatedEntries) {
      return {
        status: 'failed',
        translations
      }
    }

    translatedEntries.forEach((translation, index) => {
      translations[entries[index].index] = translation.trim()
    })

    return {
      status: 'saved',
      translations
    }
  } catch {
    return {
      status: 'failed',
      translations
    }
  }
}
