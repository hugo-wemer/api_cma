import { db } from '../drizzle/client'

export async function getRegistries() {
  const companyWithRelations = await db.query.companies.findMany({
    with: {
      installations: {
        columns: {
          // regionalOwnerId: false,
        },
        with: {
          assets: {
            columns: {
              installationOwnerId: false,
            },
            with: {
              sensors: {
                with: {
                  sensorsRegistry: {
                    columns: {
                      id: false,
                    },
                  },
                },
                columns: {
                  id: true,
                },
              },
            },
          },
        },
      },
    },
  })
  return { companyWithRelations }
}
