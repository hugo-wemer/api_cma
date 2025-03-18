CREATE TABLE "assets" (
	"id" text PRIMARY KEY NOT NULL,
	"asset_name" text NOT NULL,
	"asset_slug" text NOT NULL,
	"installation_owner_id" text
);
--> statement-breakpoint
ALTER TABLE "assets" ADD CONSTRAINT "assets_installation_owner_id_installations_id_fk" FOREIGN KEY ("installation_owner_id") REFERENCES "public"."installations"("id") ON DELETE set null ON UPDATE no action;