import { db } from '../drizzle/client'
import { installations } from '../drizzle/schema'
import { token } from '../drizzle/schema/token'

export async function getToken() {
  const result = await db.select().from(token)
  const { accessToken, updatedAt } = result[0]

  return { accessToken, updatedAt }
}
