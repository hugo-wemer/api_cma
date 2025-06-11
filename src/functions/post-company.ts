import { db } from '../drizzle/client'
import { companies } from '../drizzle/schema'
import type { postCompanyRequestType } from '../types'

export async function postCompany({
  id,
  companyName,
  companySlug,
}: postCompanyRequestType) {
  await db.insert(companies).values({
    id,
    companyName,
    companySlug,
  })
}
