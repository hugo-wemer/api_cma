import { db } from '../drizzle/client'
import { token } from '../drizzle/schema/token'

interface UpdateTokenParams {
  accessToken: string
  refreshToken: string
}

export async function updateToken({ accessToken, refreshToken }: UpdateTokenParams) {
  await db.delete(token)
  await db.insert(token).values({
    accessToken,
    refreshToken
  })
}
