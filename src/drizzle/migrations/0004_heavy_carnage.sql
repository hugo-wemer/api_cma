CREATE TYPE "public"."status" AS ENUM('Ativo', 'Inativo', 'Desabilitado', 'EstabelecendoComunicacao', 'Simulacao', 'EmManutencao', 'Indeterminado', 'ComunicacaoParcial');--> statement-breakpoint
CREATE TABLE "sensors" (
	"id" text PRIMARY KEY NOT NULL,
	"sensor_name" text NOT NULL,
	"sensor_slug" text NOT NULL,
	"asset_owner_id" text
);
--> statement-breakpoint
CREATE TABLE "sensors-communication" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" "status" NOT NULL,
	"updated-at" timestamp DEFAULT now() NOT NULL,
	"sensor_owner_id" text
);
--> statement-breakpoint
ALTER TABLE "sensors" ADD CONSTRAINT "sensors_asset_owner_id_assets_id_fk" FOREIGN KEY ("asset_owner_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sensors-communication" ADD CONSTRAINT "sensors-communication_sensor_owner_id_sensors_id_fk" FOREIGN KEY ("sensor_owner_id") REFERENCES "public"."sensors"("id") ON DELETE set null ON UPDATE no action;