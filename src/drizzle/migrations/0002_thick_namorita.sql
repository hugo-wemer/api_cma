CREATE TABLE "installations" (
	"id" text PRIMARY KEY NOT NULL,
	"regional_owner_id" text,
	"installation_name" text NOT NULL,
	"installation_slug" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "installations" ADD CONSTRAINT "installations_regional_owner_id_regionals_id_fk" FOREIGN KEY ("regional_owner_id") REFERENCES "public"."regionals"("id") ON DELETE set null ON UPDATE no action;