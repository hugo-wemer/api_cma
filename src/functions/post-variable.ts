import { db } from '../drizzle/client'
import { variables } from '../drizzle/schema'
import type { postVariableRequestType } from '../types'

export async function postVariable({
  id,
  sensorRegistryId,
  variableName,
  unit,
  fx,
  component,
}: postVariableRequestType) {
  await db.insert(variables).values({
    id,
    sensorRegistriesId: sensorRegistryId,
    variableName,
    unit,
    function: fx,
    component,
  })
}
