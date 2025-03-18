import { relations } from 'drizzle-orm'
import { pgTable, text } from 'drizzle-orm/pg-core'
import { regionals } from './regionals'
import { assets } from './assets'

export const installations = pgTable('installations', {
  id: text('id').primaryKey(),
  installationName: text('installation_name').notNull(),
  installationSlug: text('installation_slug').notNull(),
  regionalOwnerId: text('regional_owner_id').references(() => regionals.id, {
    onDelete: 'set null',
  }),
})

export const installationRelations = relations(installations, ({ one, many }) => ({
  regional: one(regionals, {
    fields: [installations.regionalOwnerId],
    references: [regionals.id],
  }),
  assets: many(assets),
}))
