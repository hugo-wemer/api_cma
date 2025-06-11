import { db } from '../drizzle/client'
import { installations } from '../drizzle/schema'
import type { postInstallationRequestType } from '../types'

export async function postInstallation({
  id,
  installationName,
  installationSlug,
  companyOwnerId,
}: postInstallationRequestType) {
  await db.insert(installations).values({
    id,
    installationName,
    installationSlug,
    companyOwnerId,
  })
}
