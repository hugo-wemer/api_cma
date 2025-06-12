import { eq } from 'drizzle-orm'
import _ from 'lodash'
import { db } from '../drizzle/client'
import {
  assets,
  companies,
  installations,
  sensors,
  sensorsAlarms,
  sensorsCommunication,
  sensorsRegistries,
} from '../drizzle/schema'

export async function getStatus(companySlug: string) {
  const status = await db
    .select({
      installationName: installations.installationName,
      installationSlug: installations.installationSlug,
      assetName: assets.assetName,
      assetSlug: assets.assetSlug,
      sensorShowName: sensorsRegistries.sensorShowName,
      sensorSlug: sensorsRegistries.sensorSlug,
      sensorAlarmCondition: sensorsAlarms.condition,
      sensorAlarmRecognition: sensorsAlarms.recognition,
      sensorMuted: sensorsAlarms.muted,
      sensorMutedAt: sensorsAlarms.mutedAt,
      sensorCommunicationStatus: sensorsCommunication.status,
      sensorCommunicationUpdatedAt: sensorsCommunication.updatedAt,
    })
    .from(companies)
    .leftJoin(installations, eq(companies.id, installations.companyOwnerId))
    .leftJoin(assets, eq(installations.id, assets.installationOwnerId))
    .leftJoin(sensors, eq(assets.id, sensors.assetOwnerId))
    .leftJoin(
      sensorsRegistries,
      eq(sensors.sensorRegistryId, sensorsRegistries.id)
    )
    .leftJoin(sensorsAlarms, eq(sensors.id, sensorsAlarms.sensorOwnerId))
    .leftJoin(
      sensorsCommunication,
      eq(sensors.id, sensorsCommunication.sensorOwnerId)
    )
    .where(eq(companies.companySlug, companySlug))

  const grouped = _(status)
    .groupBy(r => r.installationSlug)
    .map((installationRows, installationId) => ({
      installationName: installationRows[0].installationName,
      installationSlug: installationRows[0].installationSlug,
      assets: _(installationRows)
        .groupBy(r => r.assetSlug)
        .map((assetRows, assetId) => ({
          assetName: assetRows[0].assetName,
          assetSlug: assetRows[0].assetSlug,
          sensors: _(assetRows)
            .groupBy(r => r.sensorSlug)
            .map((sensorRows, sensorId) => ({
              sensorShowName: sensorRows[0].sensorShowName,
              sensorAlarmCondition: sensorRows[0].sensorAlarmCondition,
              sensorAlarmRecognition: sensorRows[0].sensorAlarmRecognition,
              sensorCommunicationStatus:
                sensorRows[0].sensorCommunicationStatus,
              sensorMuted: sensorRows[0].sensorMuted,
            }))
            .value(),
        }))
        .value(),
    }))
    .value()

  return { status: grouped }
}
