import { createHmac, timingSafeEqual } from 'node:crypto'

const stripeWebhookToleranceSeconds = 300

const getStripeSignatureParts = (signatureHeader: string) => {
  return signatureHeader.split(',').reduce<Record<string, string[]>>((acc, part) => {
    const [key, value] = part.split('=')

    if (!key || !value) return acc

    acc[key] = [...(acc[key] ?? []), value]

    return acc
  }, {})
}

const timingSafeCompare = (actual: string, expected: string) => {
  const actualBuffer = Buffer.from(actual, 'utf8')
  const expectedBuffer = Buffer.from(expected, 'utf8')

  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer)
}

export const verifyStripeWebhookSignature = ({
  payload,
  signatureHeader,
  webhookSecret
}: {
  payload: string
  signatureHeader: string
  webhookSecret: string
}) => {
  const signatureParts = getStripeSignatureParts(signatureHeader)
  const timestamp = signatureParts.t?.[0]
  const signatures = signatureParts.v1 ?? []

  if (!timestamp || signatures.length === 0) return false

  const timestampNumber = Number(timestamp)
  const currentTimestamp = Math.floor(Date.now() / 1000)

  if (!Number.isFinite(timestampNumber) || Math.abs(currentTimestamp - timestampNumber) > stripeWebhookToleranceSeconds) {
    return false
  }

  const signedPayload = `${timestamp}.${payload}`
  const expectedSignature = createHmac('sha256', webhookSecret).update(signedPayload, 'utf8').digest('hex')

  return signatures.some(signature => timingSafeCompare(signature, expectedSignature))
}
