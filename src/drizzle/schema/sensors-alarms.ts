import { relations } from 'drizzle-orm'
import { boolean, pgEnum } from 'drizzle-orm/pg-core'
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { sensors } from './sensors'

export const conditionEnum = pgEnum('condition', ['Ativo', 'Inativo'])
export const recognitionEnum = pgEnum('recognition', [
  'Reconhecido',
  'NaoReconhecido',
])

export const sensorsAlarms = pgTable('sensors-alarms', {
  id: serial('id').primaryKey(),
  condition: conditionEnum('condition').notNull(),
  recognition: recognitionEnum('recognition').notNull(),
  muted: boolean('muted'),
  mutedAt: timestamp('muted-at'),
  sensorOwnerId: text('sensor_owner_id').references(() => sensors.id, {
    onDelete: 'set null',
  }),
})

export const sensorsAlarmsRelation = relations(sensorsAlarms, ({ one }) => ({
  sensor: one(sensors, {
    fields: [sensorsAlarms.sensorOwnerId],
    references: [sensors.id],
  }),
}))
