import { eq } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { assets, companies, installations, regionals, sensors, sensorsRegistries } from '../drizzle/schema'

export async function getStatus(companySlug: string) {
  const companyStatus = await db.query.companies.findMany({
    where: eq(companies.companySlug, companySlug),
    columns: {
      id: false,
    },
    with: {
      regionals: {
        columns: {
          id: false,
          companyOwnerId: false,
        },
        with: {
          installations: {
            columns: {
              id: false,
              regionalOwnerId: false,
            },
            with: {
              assets: {
                columns: {
                  id: false,
                  installationOwnerId: false,
                },
                with: {
                  sensors: {
                    columns: {
                      id: false,
                      assetOwnerId: false,
                      sensorRegistryId: false
                    },
                    with: {
                     sensorsRegistry: {
                      columns: {
                        id: false
                      }
                     },
                      sensorCommunication: {
                        columns: {
                          id: false,
                          sensorOwnerId: false,
                        },
                      },
                      sensorAlarm: {
                        columns: {
                          id: false,
                          sensorOwnerId: false,
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
