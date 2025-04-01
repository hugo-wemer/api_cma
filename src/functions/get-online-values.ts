import { db } from '../drizzle/client'

export async function getOnlineValues() {
  const onlineValues = await db.query.onlineValues.findMany({
    with: {
      variables: {
        columns: {
          id: false,
        },
      },
    },
  })
  return { onlineValues }
}
