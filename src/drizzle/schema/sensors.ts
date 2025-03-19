import { relations } from 'drizzle-orm'
import { pgTable, text } from 'drizzle-orm/pg-core'
import { assets } from './assets'
import { sensorsCommunication } from './sensors-communication'

export const sensors = pgTable('sensors', {
  id: text('id').primaryKey(), // Preenchido por nós com o dado do SIGMA
  sensorName: text('sensor_name').notNull(),
  sensorSlug: text('sensor_slug').notNull(),
  assetOwnerId: text('asset_owner_id').references(
    () => assets.id,
    {
      onDelete: 'set null',
    }
  ),
})

export const sensorRelations = relations(sensors, ({ one }) => ({
  assets: one(assets, {
    fields: [sensors.assetOwnerId],
    references: [assets.id],
  }),
  sensorsCommunication: one(sensorsCommunication),

}))
