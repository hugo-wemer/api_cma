import { eq } from 'drizzle-orm'
import _ from 'lodash'
import { db } from '../drizzle/client'
import {
  assets,
  companies,
  installations,
  regionals,
  sensors,
  sensorsAlarms,
  sensorsCommunication,
  sensorsRegistries,
} from '../drizzle/schema'

export async function getStatus(companySlug: string) {
  // const companyStatus = await db.query.companies.findMany({
  //   where: eq(companies.companySlug, companySlug),
  //   columns: {
  //     id: false,
  //   },
  //   with: {
  //     regionals: {
  //       columns: {
  //         id: false,
  //         companyOwnerId: false,
  //       },
  //       with: {
  //         installations: {
  //           columns: {
  //             id: false,
  //             regionalOwnerId: false,
  //           },
  //           with: {
  //             assets: {
  //               columns: {
  //                 id: false,
  //                 installationOwnerId: false,
  //               },
  //               with: {
  //                 sensors: {
  //                   columns: {
  //                     id: false,
  //                     assetOwnerId: false,
  //                     sensorRegistryId: false,
  //                   },
  //                   with: {
  //                     sensorsRegistry: {
  //                       columns: {
  //                         id: false,
  //                       },
  //                     },
  //                     sensorCommunication: {
  //                       columns: {
  //                         id: false,
  //                         sensorOwnerId: false,
  //                       },
  //                     },
  //                     sensorAlarm: {
  //                       columns: {
  //                         id: false,
  //                         sensorOwnerId: false,
  //                       },
  //                     },
  //                   },
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // })
  const status = await db
    .select({
      regionalName: regionals.regionalName,
      regionalSlug: regionals.regionalSlug,
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
    .from(regionals)
    .leftJoin(installations, eq(regionals.id, installations.regionalOwnerId))
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

  const grouped = _(status)
    .groupBy(r => r.regionalSlug)
    .map((regionalRows, regionalId) => ({
      regionalName: regionalRows[0].regionalName,
      regionalSlug: regionalRows[0].regionalSlug,
      installations: _(regionalRows)
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
        .value(),
    }))
    .value()

  return { status: grouped }
}
