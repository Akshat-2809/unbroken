CREATE TABLE "talk_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"area" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"ip_hash" text NOT NULL,
	"user_agent" text,
	CONSTRAINT "talk_requests_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX "talk_requests_ip_created_idx" ON "talk_requests" USING btree ("ip_hash","created_at");