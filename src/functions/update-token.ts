import { db } from '../drizzle/client'
import { token } from '../drizzle/schema/token'
import type { subscribeNewTokenRequestType } from '../types'

export async function updateToken({
  accessToken,
  refreshToken,
}: subscribeNewTokenRequestType) {
  await db.delete(token)
  await db.insert(token).values({
    accessToken,
    refreshToken,
  })
}
