import { db } from '../drizzle/client'

export async function getRegistries() {
  const companyWithRelations = await db.query.companies.findMany({
    with: {
      regionals: {
        with: {
          installations: true,
        },
      },
    },
  })
  return { companyWithRelations }
}
