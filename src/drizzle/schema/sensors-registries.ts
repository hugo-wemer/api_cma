import { relations } from 'drizzle-orm'
import { pgTable, text } from 'drizzle-orm/pg-core'
import { variables } from './variables'

export const sensorsRegistries = pgTable('sensors-registries', {
  id: text('id').primaryKey(),
  sensorName: text('sensor_name').notNull(),
  sensorSlug: text('sensor_slug').notNull(),
  sensorShowName: text('sensor_show_name').notNull(),
})

export const sensorRegistryRelations = relations(
  sensorsRegistries,
  ({ many }) => ({
    variables: many(variables),
  })
)
