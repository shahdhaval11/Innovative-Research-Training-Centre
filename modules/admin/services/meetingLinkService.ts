import { getDb } from "@/lib/mongodb";
import { sendMail } from "@/lib/mailer";
import { EVENT_REGISTRATION_COLLECTION_NAME } from "@/modules/events/services/eventRegistrationService";
import type { ManagedEvent } from "./eventService";

export type MeetingRecipient = { email: string; fullName: string };

const IST_DATE_TIME = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "full",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
});

const SEND_CONCURRENCY = 5;

// Everyone registered for the event, one entry per email address.
export async function getEventRecipients(eventId: string): Promise<MeetingRecipient[]> {
  const docs = await (await getDb())
    .collection<{ email: string; fullName: string }>(EVENT_REGISTRATION_COLLECTION_NAME)
    .find({ eventId }, { projection: { email: 1, fullName: 1 } })
    .toArray();

  const unique = new Map<string, MeetingRecipient>();
  for (const { email, fullName } of docs) {
    const key = email?.trim().toLowerCase();
    if (key && !unique.has(key)) unique.set(key, { email: email.trim(), fullName });
  }
  return [...unique.values()];
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// Common template for every event / workshop meeting-link email.
export function buildMeetingLinkEmail(event: ManagedEvent, meetingUrl: string, fullName: string) {
  const type = event.type.toLowerCase();
  const startsAt = IST_DATE_TIME.format(new Date(event.startAt));
  const subject = `Joining link for ${event.title}`;

  const text = [
    `Dear ${fullName},`,
    "",
    `Thank you for registering for the ${type} "${event.title}". Here are the details to join:`,
    "",
    `${event.type}: ${event.title}`,
    `Starts: ${startsAt} (IST)`,
    `Join link: ${meetingUrl}`,
    "",
    "Please join a few minutes early so we can start on time.",
    "",
    "Regards,",
    "NanoNova Research and Training Centre",
  ].join("\n");

  const html = `<!doctype html>
<html><body style="margin:0;background:#f4f7f6;font-family:Arial,Helvetica,sans-serif;color:#1f2a37;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;">
        <tr><td style="background:#0e9d6e;padding:20px 28px;color:#ffffff;font-size:18px;font-weight:bold;">NanoNova Research and Training Centre</td></tr>
        <tr><td style="padding:28px;">
          <p style="margin:0 0 14px;font-size:15px;">Dear ${escapeHtml(fullName)},</p>
          <p style="margin:0 0 20px;font-size:15px;line-height:1.6;">Thank you for registering for the ${type} <strong>${escapeHtml(event.title)}</strong>. Here are the details to join:</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ecfdf5;border-radius:8px;margin-bottom:24px;">
            <tr><td style="padding:16px 18px;font-size:14px;line-height:1.7;">
              <strong>${event.type}:</strong> ${escapeHtml(event.title)}<br>
              <strong>Starts:</strong> ${startsAt} (IST)
            </td></tr>
          </table>
          <p style="margin:0 0 24px;text-align:center;">
            <a href="${escapeHtml(meetingUrl)}" style="display:inline-block;background:#0e9d6e;color:#ffffff;text-decoration:none;font-weight:bold;font-size:15px;padding:12px 28px;border-radius:8px;">Join ${event.type}</a>
          </p>
          <p style="margin:0 0 6px;font-size:13px;color:#6b7280;">If the button doesn't work, copy this link into your browser:</p>
          <p style="margin:0 0 24px;font-size:13px;word-break:break-all;"><a href="${escapeHtml(meetingUrl)}" style="color:#0a7d58;">${escapeHtml(meetingUrl)}</a></p>
          <p style="margin:0 0 20px;font-size:14px;line-height:1.6;">Please join a few minutes early so we can start on time.</p>
          <p style="margin:0;font-size:14px;">Regards,<br><strong>NanoNova Research and Training Centre</strong></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  return { subject, html, text };
}

// Runs in the background (see the route's `after`); one failed address never stops the rest.
export async function sendMeetingLinks(
  event: ManagedEvent,
  meetingUrl: string,
  recipients: MeetingRecipient[],
): Promise<void> {
  let sent = 0;
  const failed: string[] = [];
  const queue = [...recipients];

  async function worker() {
    for (let next = queue.shift(); next; next = queue.shift()) {
      try {
        await sendMail({ to: next.email, ...buildMeetingLinkEmail(event, meetingUrl, next.fullName) });
        sent++;
      } catch (err) {
        failed.push(next.email);
        console.error(`Meeting link email to ${next.email} failed:`, err);
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(SEND_CONCURRENCY, queue.length) }, worker));
  console.log(
    `Meeting link for "${event.title}": ${sent} sent, ${failed.length} failed${failed.length ? ` (${failed.join(", ")})` : ""}.`,
  );
}
