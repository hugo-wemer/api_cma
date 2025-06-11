import { db } from '../drizzle/client'
import { sensorsRegistries } from '../drizzle/schema'
import type { postSensorRegistryRequestType } from '../types'

export async function postSensorRegistry({
  id,
  sensorName,
  sensorShowName,
  sensorSlug,
}: postSensorRegistryRequestType) {
  await db.insert(sensorsRegistries).values({
    id,
    sensorName,
    sensorShowName,
    sensorSlug,
  })
}
