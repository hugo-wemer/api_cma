CREATE TABLE "sensors-registries" (
	"id" text PRIMARY KEY NOT NULL,
	"sensor_name" text NOT NULL,
	"sensor_slug" text NOT NULL,
	"sensor_show_name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sensors" ADD COLUMN "sensor_registry_id" text;--> statement-breakpoint
ALTER TABLE "sensors" ADD CONSTRAINT "sensors_sensor_registry_id_sensors-registries_id_fk" FOREIGN KEY ("sensor_registry_id") REFERENCES "public"."sensors-registries"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sensors" DROP COLUMN "sensor_name";--> statement-breakpoint
ALTER TABLE "sensors" DROP COLUMN "sensor_slug";