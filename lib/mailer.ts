import nodemailer, { type Transporter } from "nodemailer";

let transporter: Transporter | null = null;

// Pooled so a batch of emails reuses a few SMTP connections instead of reconnecting for each one.
function getTransporter(): Transporter {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error("SMTP is not configured (SMTP_HOST, SMTP_USER, SMTP_PASS).");
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: SMTP_SECURE === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    pool: true,
    maxConnections: 3,
  });
  return transporter;
}

export type MailMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

export async function sendMail({ to, subject, html, text }: MailMessage): Promise<void> {
  await getTransporter().sendMail({
    from: `"NanoNova Research and Training Centre" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
    text,
  });
}
