import { relations } from 'drizzle-orm'
import { pgTable, text } from 'drizzle-orm/pg-core'
import { assets } from './assets'
import { companies } from './companies'

export const installations = pgTable('installations', {
  id: text('id').primaryKey(),
  installationName: text('installation_name').notNull(),
  installationSlug: text('installation_slug').notNull(),
  companyOwnerId: text('company_owner_id').references(() => companies.id, {
    onDelete: 'set null',
  }),
})

export const installationRelations = relations(
  installations,
  ({ one, many }) => ({
    company: one(companies, {
      fields: [installations.companyOwnerId],
      references: [companies.id],
    }),
    assets: many(assets),
  })
)
