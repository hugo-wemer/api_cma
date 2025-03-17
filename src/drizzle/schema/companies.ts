import { relations } from 'drizzle-orm'
import { pgTable, text } from 'drizzle-orm/pg-core'
import { regionals } from './regionals'

export const companies = pgTable('companies', {
  id: text('id').primaryKey(),
  companyName: text('company_name').notNull(),
  companySlug: text('company_slug').notNull()
})

export const companiesRelations = relations(companies, ({many}) => ({
  regionals: many(regionals)
}))