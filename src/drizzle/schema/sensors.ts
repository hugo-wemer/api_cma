import { relations } from 'drizzle-orm'
import { pgTable, text } from 'drizzle-orm/pg-core'
import { assets } from './assets'
import { sensorsAlarms } from './sensors-alarms'
import { sensorsCommunication } from './sensors-communication'
import { sensorsRegistries } from './sensors-registries'

export const sensors = pgTable('sensors', {
  id: text('id').primaryKey(), // Preenchido por nós com o dado do SIGMA
  assetOwnerId: text('asset_owner_id').references(() => assets.id, {
    onDelete: 'set null',
  }),
  sensorRegistryId: text('sensor_registry_id').references(
    () => sensorsRegistries.id,
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
  sensorsRegistry: one(sensorsRegistries, {
    fields: [sensors.sensorRegistryId],
    references: [sensorsRegistries.id],
  }),
  sensorAlarm: one(sensorsAlarms, {
    fields: [sensors.id],
    references: [sensorsAlarms.sensorOwnerId],
  }),
  sensorCommunication: one(sensorsCommunication, {
    fields: [sensors.id],
    references: [sensorsCommunication.sensorOwnerId],
  }),
}))
