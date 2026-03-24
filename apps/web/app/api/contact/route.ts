import { NextResponse } from "next/server";
import { z } from "zod";
import {
  buildContactNotificationHtml,
  buildContactNotificationText,
} from "@/lib/contact-email";

const contactSchema = z.object({
  name: z.string().trim().max(120).optional(),
  email: z.string().trim().email("Please enter a valid email address."),
  subject: z.string().trim().max(200).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please enter a message (at least 10 characters).")
    .max(5000, "Message is too long."),
  /** Honeypot — leave empty (bots often fill hidden fields). */
  company: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const first = parsed.error.flatten().fieldErrors;
      const msg =
        Object.values(first).flat()[0] ?? "Please check your form and try again.";
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const { name, email, subject, message, company } = parsed.data;

    // Silent success for bots that fill the honeypot
    if (company?.trim()) {
      return NextResponse.json({ success: true, message: "Thanks! Your message has been sent." });
    }

    const apiKey = process.env.SENDGRID_API_KEY;
    const from = process.env.SENDGRID_FROM_EMAIL;
    const to =
      process.env.SENDGRID_CONTACT_TO_EMAIL || process.env.CONTACT_TO_EMAIL;

    if (!apiKey || !from || !to) {
      console.error(
        "Missing SendGrid env: SENDGRID_API_KEY, SENDGRID_FROM_EMAIL, and SENDGRID_CONTACT_TO_EMAIL (or legacy CONTACT_TO_EMAIL).",
      );
      return NextResponse.json(
        { error: "Contact form is not configured. Please try again later." },
        { status: 500 },
      );
    }

    const subjectLine =
      subject?.trim() ||
      `Gold Trails website message${name ? ` from ${name}` : ""}`;

    const payload = { name, email, subject, message };
    const textBody = buildContactNotificationText(payload);
    const htmlBody = buildContactNotificationHtml(payload);

    const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: to }],
            subject: subjectLine,
          },
        ],
        from: { email: from },
        reply_to: { email },
        content: [
          { type: "text/plain", value: textBody },
          { type: "text/html", value: htmlBody },
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("SendGrid error:", res.status, errText);
      return NextResponse.json(
        { error: "Could not send your message right now. Please try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thanks! Your message has been sent.",
    });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json(
      { error: "Could not send your message right now. Please try again later." },
      { status: 500 },
    );
  }
}
