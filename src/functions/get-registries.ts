import { db } from '../drizzle/client'

export async function getRegistries() {
  const companyWithRelations = await db.query.companies.findMany({
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
                //with: {
                // assets:{
                //   columns:{
                //     assetOwnerId: false
                //   }
              },
            },
          },
        },
      },
    },
  })
  return { companyWithRelations }
}
