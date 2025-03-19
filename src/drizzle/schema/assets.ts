import { relations } from 'drizzle-orm'
import { pgTable, text } from 'drizzle-orm/pg-core'
import { installations } from './installations'
import { sensors } from './sensors'

export const assets = pgTable('assets', {
  id: text('id').primaryKey(),
  assetName: text('asset_name').notNull(),
  assetSlug: text('asset_slug').notNull(),
  installationOwnerId: text('installation_owner_id').references(
    () => installations.id,
    {
      onDelete: 'set null',
    }
  ),
})

export const assetRelations = relations(assets, ({ one, many }) => ({
  installation: one(installations, {
    fields: [assets.installationOwnerId],
    references: [installations.id],
  }),
  sensors: many(sensors),
}))
