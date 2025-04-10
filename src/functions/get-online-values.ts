import { and, eq } from 'drizzle-orm'
import { db } from '../drizzle/client'
import {
  companies,
  regionals,
  installations,
  assets,
  sensors,
  sensorsRegistries,
  onlineValues,
  variables,
} from '../drizzle/schema'


import _ from 'lodash'

export async function getOnlineValues(companySlug: string, regionalSlug: string, installationSlug: string, assetSlug: string) {
  const response = await db
    .select({
      companyName: companies.companyName,
      regionalName: regionals.regionalName,
      installationName: installations.installationName,
      assetName: assets.assetName,
      assetId: assets.id,
      sensorId: sensors.id,
      sensorName: sensorsRegistries.sensorName,
      variableId: variables.id,
      variableName: variables.variableName,
      unit: variables.unit,
      component: variables.component,
      func: variables.function,
      valueMax: onlineValues.valueMax,
      valueAverage: onlineValues.valueAverage,
      valueMin: onlineValues.valueMin,
      valueRecent: onlineValues.valueRecent
    })
    .from(companies)
    .leftJoin(regionals, eq(companies.id, regionals.companyOwnerId))
    .leftJoin(installations, eq(regionals.id, installations.regionalOwnerId))
    .leftJoin(assets, eq(installations.id, assets.installationOwnerId))
    .leftJoin(sensors, eq(assets.id, sensors.assetOwnerId))
    .leftJoin(sensorsRegistries, eq(sensors.sensorRegistryId, sensorsRegistries.id))
    .leftJoin(variables, eq(sensors.sensorRegistryId, variables.sensorRegistriesId))
    .leftJoin(onlineValues, eq(variables.id, onlineValues.variableId))
    .where(
      and(
        eq(companies.companySlug, companySlug),
        eq(regionals.regionalSlug, regionalSlug),
        eq(installations.installationSlug, installationSlug),
        eq(assets.assetSlug, assetSlug)
      )
    )
    .execute();

  const grouped = _(response)
    .groupBy(r => r.assetId)
    .map((assetRows, assetId) => ({
      assetName: assetRows[0].assetName,
      installationName: assetRows[0].installationName,
      regionalName: assetRows[0].regionalName,
      companyName: assetRows[0].companyName,
      sensors: _(assetRows)
        .groupBy(r => r.sensorId)
        .map((sensorRows, sensorId) => ({
          sensorName: sensorRows[0].sensorName,
          onlineValues: sensorRows.map(v => ({
            variableName: v.variableName,
            unit: v.unit,
            component: v.component,
            function: v.func,
            valueMax: v.valueMax,
            valueAverage: v.valueAverage,
            valueMin: v.valueMin,
            valueRecent: v.valueRecent
          }))
        }))
        .value()
    }))
    .value();

  return { onlineValues: grouped };
}