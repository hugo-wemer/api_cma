import { eq } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { companies } from '../drizzle/schema'

export async function getStatus(companySlug: string) {
  const companyStatus = await db.query.companies.findMany({
    where: eq(companies.companySlug, companySlug),
    with: {
      regionals: {
        columns: {
          companyOwnerId: false,
        },
        with: {
          installations: {
            columns: {
              regionalOwnerId: false,
            },
            with: {
              assets: {
                columns: {
                  installationOwnerId: false,
                },
                with: {
                  sensors: {
                    columns: {
                      assetOwnerId: false,
                    },
                    with: {
                      sensorCommunication: {
                        columns: {
                          sensorOwnerId: false,
                        },
                      },
                      sensorAlarm: {
                        columns: {
                          sensorOwnerId: false,
                        },
                      },
                      sensorsRegistries: {
                        columns: {
                          id: false,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })

  return { companyStatus }
}
