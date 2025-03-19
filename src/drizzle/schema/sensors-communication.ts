import { relations } from 'drizzle-orm'
import { pgEnum } from 'drizzle-orm/pg-core'
import { pgTable, serial, timestamp, text } from 'drizzle-orm/pg-core'
import { sensors } from './sensors'

export const statusEnum = pgEnum('status', ['Ativo', 'Inativo', 'Desabilitado', 'EstabelecendoComunicacao', 'Simulacao', 'EmManutencao', 'Indeterminado', 'ComunicacaoParcial'])

export const sensorsCommunication = pgTable('sensors-communication', {
  id: serial('id').primaryKey(),
  status: statusEnum('status').notNull(),
  updatedAt: timestamp('updated-at').notNull().defaultNow(),
  sensorOwnerId: text('sensor_owner_id').references(
      () => sensors.id,
      {
        onDelete: 'set null',
      }
    ),
})

export const sensorsCommunicationRelation = relations(sensorsCommunication, ({ one }) => ({
  sensor: one(sensors, {
    fields: [sensorsCommunication.sensorOwnerId],
    references: [sensors.id],
  }),
}))
