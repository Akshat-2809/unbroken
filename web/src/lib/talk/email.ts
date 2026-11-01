import "server-only";
import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/site";

type Request = { id: number; name: string; email: string; area: string };

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/**
 * Announces the request to NOTIFY_EMAIL and sends the sender a short acknowledgement.
 * Never throws: email problems are logged and must not fail the request.
 */
export async function sendTalkEmails(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const notify = process.env.NOTIFY_EMAIL;
  if (!apiKey || !from) {
    console.warn(`[talk] #${req.id}: RESEND_API_KEY or EMAIL_FROM not set, skipping emails`);
    return;
  }
  const resend = new Resend(apiKey);
  const jobs: Promise<unknown>[] = [];

  if (notify) {
    jobs.push(
      resend.emails.send(
        {
          from,
          to: notify,
          replyTo: req.email,
          subject: `Talk to Rajat: ${req.name} (${req.area})`,
          text: [`From: ${req.name} <${req.email}>`, `Works in: ${req.area}`].join("\n"),
          html: `<p><b>From:</b> ${escape(req.name)} &lt;${escape(req.email)}&gt;</p><p><b>Works in:</b> ${escape(req.area)}</p>`,
        },
        { idempotencyKey: `talk-notify/${req.id}` },
      ),
    );
  } else {
    console.warn(`[talk] #${req.id}: NOTIFY_EMAIL not set, skipping internal notification`);
  }

  jobs.push(
    resend.emails.send(
      {
        from,
        to: req.email,
        replyTo: CONTACT_EMAIL,
        subject: "Thanks. Rajat will be in touch.",
        text: [
          `Hi ${req.name},`,
          "",
          "Thanks for reaching out to Unbroken. Rajat would like to hear how you see fragmentation in your own operations, and he will be in touch.",
          "",
          "— Unbroken",
          CONTACT_EMAIL,
        ].join("\n"),
      },
      { idempotencyKey: `talk-ack/${req.id}` },
    ),
  );

  const results = await Promise.allSettled(jobs);
  for (const r of results) {
    if (r.status === "rejected") {
      console.error(`[talk] #${req.id}: email failed`, r.reason);
    } else {
      const { error } = r.value as { error: unknown };
      if (error) console.error(`[talk] #${req.id}: email rejected by Resend`, error);
    }
  }
}
