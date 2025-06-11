import { db } from '../drizzle/client'
import { assets } from '../drizzle/schema'
import type { postAssetRequestType } from '../types'

export async function postAsset({
  id,
  assetName,
  assetSlug,
  installationOwnerId,
}: postAssetRequestType) {
  await db.insert(assets).values({
    id,
    assetName,
    assetSlug,
    installationOwnerId,
  })
}
