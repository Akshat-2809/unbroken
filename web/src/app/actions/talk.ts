"use server";

import { and, count, eq, gt, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { after } from "next/server";
import { getDb } from "@/lib/db/client";
import { talkRequests } from "@/lib/db/schema";
import { clientIp, hashIp, userAgent } from "@/lib/request";
import { CONTACT_EMAIL } from "@/lib/site";
import { sendTalkEmails } from "@/lib/talk/email";
import { TALK_FIELDS, talkSchema, type TalkField, type TalkState } from "@/lib/talk/schema";

const RATE_LIMIT = 10;
const RATE_WINDOW = "1 hour";

export async function startTalk(_prev: TalkState, formData: FormData): Promise<TalkState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    area: String(formData.get("area") ?? ""),
    website: String(formData.get("website") ?? ""),
  };
  const values = { name: raw.name, email: raw.email, area: raw.area };

  // Honeypot filled: pretend it worked, store nothing.
  if (raw.website.trim() !== "") {
    console.info("[talk] honeypot triggered, dropping submission");
    return { status: "success" };
  }

  const parsed = talkSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<TalkField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as TalkField;
      if (TALK_FIELDS.includes(key) && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields and try again.", fieldErrors, values };
  }

  const db = getDb();
  if (!db) {
    console.error("[talk] DATABASE_URL is not set");
    return { status: "error", message: `We couldn't send this just now. Please try again, or email ${CONTACT_EMAIL}.`, values };
  }

  const h = await headers();
  const ipHash = hashIp(clientIp(h));
  const { name, email, area } = parsed.data;

  try {
    const [{ recent }] = await db
      .select({ recent: count() })
      .from(talkRequests)
      .where(and(eq(talkRequests.ipHash, ipHash), gt(talkRequests.createdAt, sql`now() - ${RATE_WINDOW}::interval`)));

    if (recent >= RATE_LIMIT) {
      return {
        status: "error",
        message: `We've had several requests from your network in the last hour. Please try again later, or email ${CONTACT_EMAIL}.`,
        values,
      };
    }

    const [row] = await db
      .insert(talkRequests)
      .values({ name, email, area, ipHash, userAgent: userAgent(h) })
      .onConflictDoNothing({ target: talkRequests.email })
      .returning({ id: talkRequests.id });

    // Already asked: treat as success, no error shown and no second email.
    if (!row) return { status: "success" };

    // Emails go out after the response is sent; failures are logged, never surfaced.
    after(() => sendTalkEmails({ id: row.id, name, email, area }));

    return { status: "success" };
  } catch (err) {
    console.error("[talk] failed to store request", err);
    return {
      status: "error",
      message: `Something went wrong on our side and this wasn't sent. Please try again, or email ${CONTACT_EMAIL}.`,
      values,
    };
  }
}
