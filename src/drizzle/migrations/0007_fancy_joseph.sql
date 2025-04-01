CREATE TYPE "public"."condition" AS ENUM('Ativo', 'Inativo');--> statement-breakpoint
CREATE TYPE "public"."recognition" AS ENUM('Reconhecido', 'NaoReconhecido');--> statement-breakpoint
CREATE TABLE "sensors-alarms" (
	"id" serial PRIMARY KEY NOT NULL,
	"condition" "condition" NOT NULL,
	"recognition" "recognition" NOT NULL,
	"muted" boolean,
	"muted-at" timestamp,
	"sensor_owner_id" text
);
--> statement-breakpoint
ALTER TABLE "sensors-alarms" ADD CONSTRAINT "sensors-alarms_sensor_owner_id_sensors_id_fk" FOREIGN KEY ("sensor_owner_id") REFERENCES "public"."sensors"("id") ON DELETE set null ON UPDATE no action;