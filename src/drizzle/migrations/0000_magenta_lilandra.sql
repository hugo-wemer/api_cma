CREATE TYPE "public"."status" AS ENUM('Ativo', 'Inativo', 'Desabilitado', 'EstabelecendoComunicacao', 'Simulacao', 'EmManutencao', 'Indeterminado', 'ComunicacaoParcial');--> statement-breakpoint
CREATE TYPE "public"."condition" AS ENUM('Ativo', 'Inativo');--> statement-breakpoint
CREATE TYPE "public"."recognition" AS ENUM('Reconhecido', 'NaoReconhecido');--> statement-breakpoint
CREATE TABLE "assets" (
	"id" text PRIMARY KEY NOT NULL,
	"asset_name" text NOT NULL,
	"asset_slug" text NOT NULL,
	"installation_owner_id" text
);
--> statement-breakpoint
CREATE TABLE "companies" (
	"id" text PRIMARY KEY NOT NULL,
	"company_name" text NOT NULL,
	"company_slug" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "token" (
	"access_token" text NOT NULL,
	"refresh_token" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "regionals" (
	"id" text PRIMARY KEY NOT NULL,
	"regional_name" text NOT NULL,
	"regional_slug" text NOT NULL,
	"company_owner_id" text
);
--> statement-breakpoint
CREATE TABLE "installations" (
	"id" text PRIMARY KEY NOT NULL,
	"installation_name" text NOT NULL,
	"installation_slug" text NOT NULL,
	"regional_owner_id" text
);
--> statement-breakpoint
CREATE TABLE "sensors-registries" (
	"id" text PRIMARY KEY NOT NULL,
	"sensor_name" text NOT NULL,
	"sensor_slug" text NOT NULL,
	"sensor_show_name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sensors" (
	"id" text PRIMARY KEY NOT NULL,
	"asset_owner_id" text,
	"sensor_registry_id" text
);
--> statement-breakpoint
CREATE TABLE "sensors-communication" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" "status" NOT NULL,
	"updated-at" timestamp DEFAULT now() NOT NULL,
	"sensor_owner_id" text
);
--> statement-breakpoint
CREATE TABLE "sensors-alarms" (
	"id" serial PRIMARY KEY NOT NULL,
	"condition" "condition" NOT NULL,
	"recognition" "recognition" NOT NULL,
	"muted" boolean,
	"muted-at" timestamp,
	"sensor_owner_id" text
);
--> statement-breakpoint
CREATE TABLE "variables" (
	"id" text PRIMARY KEY NOT NULL,
	"sensor_registries_id" text NOT NULL,
	"variable_name" text NOT NULL,
	"unit" text,
	"component" text NOT NULL,
	"function" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "online_values" (
	"id" text PRIMARY KEY NOT NULL,
	"asset_owner_id" text NOT NULL,
	"variable_id" text NOT NULL,
	"value_max" text,
	"value_average" text,
	"value_min" text,
	"value_recent" text
);
--> statement-breakpoint
ALTER TABLE "assets" ADD CONSTRAINT "assets_installation_owner_id_installations_id_fk" FOREIGN KEY ("installation_owner_id") REFERENCES "public"."installations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "regionals" ADD CONSTRAINT "regionals_company_owner_id_companies_id_fk" FOREIGN KEY ("company_owner_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "installations" ADD CONSTRAINT "installations_regional_owner_id_regionals_id_fk" FOREIGN KEY ("regional_owner_id") REFERENCES "public"."regionals"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sensors" ADD CONSTRAINT "sensors_asset_owner_id_assets_id_fk" FOREIGN KEY ("asset_owner_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sensors" ADD CONSTRAINT "sensors_sensor_registry_id_sensors-registries_id_fk" FOREIGN KEY ("sensor_registry_id") REFERENCES "public"."sensors-registries"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sensors-communication" ADD CONSTRAINT "sensors-communication_sensor_owner_id_sensors_id_fk" FOREIGN KEY ("sensor_owner_id") REFERENCES "public"."sensors"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sensors-alarms" ADD CONSTRAINT "sensors-alarms_sensor_owner_id_sensors_id_fk" FOREIGN KEY ("sensor_owner_id") REFERENCES "public"."sensors"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "variables" ADD CONSTRAINT "variables_sensor_registries_id_sensors-registries_id_fk" FOREIGN KEY ("sensor_registries_id") REFERENCES "public"."sensors-registries"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "online_values" ADD CONSTRAINT "online_values_asset_owner_id_assets_id_fk" FOREIGN KEY ("asset_owner_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "online_values" ADD CONSTRAINT "online_values_variable_id_variables_id_fk" FOREIGN KEY ("variable_id") REFERENCES "public"."variables"("id") ON DELETE set null ON UPDATE no action;