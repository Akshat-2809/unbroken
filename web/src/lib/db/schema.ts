import { index, pgTable, serial, text, timestamp, unique } from "drizzle-orm/pg-core";

export const talkRequests = pgTable(
  "talk_requests",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    // Stored trimmed and lowercased, so the unique constraint catches duplicates.
    email: text("email").notNull(),
    // "Logistics", "Supply chain", "Travel" or "Enterprise software".
    area: text("area").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    // Salted SHA-256 of the client IP, used only for rate limiting. Never the raw IP.
    ipHash: text("ip_hash").notNull(),
    userAgent: text("user_agent"),
  },
  (t) => [
    unique("talk_requests_email_unique").on(t.email),
    index("talk_requests_ip_created_idx").on(t.ipHash, t.createdAt),
  ],
);

export type TalkRequestRow = typeof talkRequests.$inferSelect;
