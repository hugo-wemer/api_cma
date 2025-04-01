import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const token = pgTable('token', {
  accessToken: text('access_token').notNull(),
  refreshToken: text('refresh_token').notNull(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})
