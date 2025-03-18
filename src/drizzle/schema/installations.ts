import { relations } from 'drizzle-orm'
import { pgTable, text } from 'drizzle-orm/pg-core'
import { regionals } from './regionals'

export const installations = pgTable('installations', {
  id: text('id').primaryKey(),
  regionalOwnerId: text('regional_owner_id').references(() => regionals.id, {
    onDelete: 'set null',
  }),
  installationName: text('installation_name').notNull(),
  installationSlug: text('installation_slug').notNull(),
})

export const installationRelations = relations(installations, ({ one }) => ({
  regional: one(regionals, {
    fields: [installations.regionalOwnerId],
    references: [regionals.id],
  }),
}))
