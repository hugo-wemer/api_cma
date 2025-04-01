ALTER TABLE "online_values" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "online_values" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "online_values" ADD COLUMN "value_max" text;--> statement-breakpoint
ALTER TABLE "online_values" ADD COLUMN "value_average" text;--> statement-breakpoint
ALTER TABLE "online_values" ADD COLUMN "value_min" text;--> statement-breakpoint
ALTER TABLE "online_values" ADD COLUMN "value_recent" text;