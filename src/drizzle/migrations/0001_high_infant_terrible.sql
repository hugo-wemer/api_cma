ALTER TABLE "installations" RENAME COLUMN "regional_owner_id" TO "company_owner_id";--> statement-breakpoint
ALTER TABLE "installations" DROP CONSTRAINT "installations_regional_owner_id_regionals_id_fk";
--> statement-breakpoint
ALTER TABLE "installations" ADD CONSTRAINT "installations_company_owner_id_companies_id_fk" FOREIGN KEY ("company_owner_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;