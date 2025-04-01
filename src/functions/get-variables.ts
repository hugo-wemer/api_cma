import { db } from '../drizzle/client'

export async function getVariables() {
  const variables = await db.query.variables.findMany()
  return { variables }
}
