CREATE TABLE "companies" (
	"id" text PRIMARY KEY NOT NULL,
	"company_name" text NOT NULL,
	"company_slug" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "regionals" (
	"id" text PRIMARY KEY NOT NULL,
	"company_owner_id" text,
	"regional_name" text NOT NULL,
	"regional_slug" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "regionals" ADD CONSTRAINT "regionals_company_owner_id_companies_id_fk" FOREIGN KEY ("company_owner_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;