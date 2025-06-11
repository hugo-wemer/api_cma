import { db } from '../drizzle/client'
import { regionals } from '../drizzle/schema'
import type { postRegionalRequestType } from '../types'

export async function postRegional({
  id,
  regionalName,
  regionalSlug,
  companyOwnerId,
}: postRegionalRequestType) {
  await db.insert(regionals).values({
    id,
    regionalName,
    regionalSlug,
    companyOwnerId,
  })
}
