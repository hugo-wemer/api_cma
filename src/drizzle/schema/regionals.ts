import { relations } from 'drizzle-orm'
import { pgTable, text } from 'drizzle-orm/pg-core'
import { companies } from './companies'
import { installations } from './installations'

export const regionals = pgTable('regionals', {
  id: text('id').primaryKey(),
  regionalName: text('regional_name').notNull(),
  regionalSlug: text('regional_slug').notNull(),
  companyOwnerId: text('company_owner_id').references(() => companies.id, {
    onDelete: 'set null',
  }),
})

export const regionalsRelations = relations(regionals, ({ one, many }) => ({
  company: one(companies, {
    fields: [regionals.companyOwnerId],
    references: [companies.id],
  }),
  installations: many(installations),
}))
