import { db } from '../drizzle/client'
import { sensors } from '../drizzle/schema'
import type { postSensorRequestType } from '../types'

export async function postSensor({
  id,
  assetOwnerId,
  sensorRegistryId,
}: postSensorRequestType) {
  await db.insert(sensors).values({
    id,
    assetOwnerId,
    sensorRegistryId,
  })
}
