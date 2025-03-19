import { db } from '../drizzle/client'
import { eq } from 'drizzle-orm'
import { companies } from '../drizzle/schema'


export async function getCommunicationStatus(companySlug: string) {
  const companyCommunicationStatus = await db.query.companies.findMany({
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
                      assetOwnerId: false
                    },
                    with: {
                        sensorsCommunication:{
                            columns:{
                                sensorOwnerId: false
                            }
                        }
                    }
                  }
                }
              },
            },
          },
        },
      },
    },
  })
  return { companyCommunicationStatus }
}
