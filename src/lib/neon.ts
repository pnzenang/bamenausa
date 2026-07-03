import { neon } from '@neondatabase/serverless'

let sqlClient: ReturnType<typeof neon> | null = null

export const getSql = () => {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not configured. Add your Neon connection string to .env.local.')
  }

  sqlClient ??= neon(databaseUrl)

  return sqlClient
}
