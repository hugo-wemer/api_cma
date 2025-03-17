import { relations } from 'drizzle-orm'
import { pgTable, text } from 'drizzle-orm/pg-core'
import { companies } from './companies'

export const regionals = pgTable('regionals', {
  id: text('id').primaryKey(),
  companyOwnerId: text('company_owner_id').references(() => companies.id, {
    onDelete: 'set null'
  }),
  regionalName: text('regional_name').notNull(),
  regionalSlug: text('regional_slug').notNull()
})

export const regionalsRelations = relations(regionals, ({one}) => ({
  company: one(companies, {
    fields: [regionals.companyOwnerId],
    references: [companies.id]
  })
}))