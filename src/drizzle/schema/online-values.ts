import { relations } from 'drizzle-orm'
import { pgTable, text } from 'drizzle-orm/pg-core'
import { assets } from './assets'
import { variables } from './variables'

export const onlineValues = pgTable('online_values', {
  id: text('id').primaryKey(),
  assetOwnerId: text('asset_owner_id')
    .notNull()
    .references(() => assets.id, {
      onDelete: 'set null',
    }),
  variableId: text('variable_id')
    .notNull()
    .references(() => variables.id, {
      onDelete: 'set null',
    }),
  valueMax: text('value_max'),
  valueAverage: text('value_average'),
  valueMin: text('value_min'),
  valueRecent: text('value_recent'),
})

export const onlineValuesRelations = relations(onlineValues, ({ one }) => ({
  assets: one(assets, {
    fields: [onlineValues.assetOwnerId],
    references: [assets.id],
  }),
  variables: one(variables, {
    fields: [onlineValues.variableId],
    references: [variables.id],
  }),
}))
