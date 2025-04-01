CREATE TABLE "variables" (
	"id" text PRIMARY KEY NOT NULL,
	"sigma_function" text NOT NULL,
	"sensor_registries_id" text NOT NULL,
	"variable_name" text NOT NULL,
	"unit" text,
	"type" text NOT NULL,
	"function" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "online_values" (
	"id" text,
	"asset_owner_id" text NOT NULL,
	"variable_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "variables" ADD CONSTRAINT "variables_sensor_registries_id_sensors-registries_id_fk" FOREIGN KEY ("sensor_registries_id") REFERENCES "public"."sensors-registries"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "online_values" ADD CONSTRAINT "online_values_asset_owner_id_assets_id_fk" FOREIGN KEY ("asset_owner_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "online_values" ADD CONSTRAINT "online_values_variable_id_variables_id_fk" FOREIGN KEY ("variable_id") REFERENCES "public"."variables"("id") ON DELETE set null ON UPDATE no action;