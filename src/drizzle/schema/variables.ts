import { relations } from 'drizzle-orm'
import { text } from 'drizzle-orm/pg-core'
import { pgTable } from 'drizzle-orm/pg-core'
import { onlineValues } from './online-values'
import { sensorsRegistries } from './sensors-registries'

export const variables = pgTable('variables', {
  id: text('id').primaryKey(),
  sensorRegistriesId: text('sensor_registries_id')
    .notNull()
    .references(() => sensorsRegistries.id, {
      onDelete: 'set null',
    }),
  variableName: text('variable_name').notNull(),
  unit: text('unit'),
  type: text('type').notNull(),
  function: text('function').notNull(),
})

export const variableRelations = relations(variables, ({ one, many }) => ({
  sensorRegistry: one(sensorsRegistries, {
    fields: [variables.sensorRegistriesId],
    references: [sensorsRegistries.id],
  }),
  onlineValues: many(onlineValues),
}))
