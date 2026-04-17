import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
const subscribeSchema = z.object({
  name: z.string().trim().optional(),
  email: z.string().email("A valid email is required."),
  attribution: z
    .object({
      utm_source: z.string().optional(),
      utm_medium: z.string().optional(),
      utm_campaign: z.string().optional(),
      utm_term: z.string().optional(),
      utm_content: z.string().optional(),
      landing_path: z.string().optional(),
      referrer: z.string().optional(),
      captured_at: z.string().optional(),
    })
    .optional(),
});

function toBasicAuth(apiKey: string) {
  return Buffer.from(`apikey:${apiKey}`).toString("base64");
}

function toSubscriberHash(email: string) {
  return createHash("md5").update(email.toLowerCase()).digest("hex");
}

async function readMailchimpError(response: Response) {
  try {
    const data = (await response.json()) as { detail?: string; title?: string };
    return data.detail ?? data.title ?? "Mailchimp request failed.";
  } catch {
    return "Mailchimp request failed.";
  }
}

function makeAttributionTag(prefix: string, value?: string) {
  if (!value) return null;
  const cleaned = value
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  if (!cleaned) return null;
  return `${prefix}-${cleaned}`.slice(0, 64);
}

export async function POST(request: Request) {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const server = process.env.MAILCHIMP_SERVER;

  if (!apiKey || !audienceId || !server) {
    return NextResponse.json(
      { success: false, error: "Mailchimp environment variables are not configured." },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = subscribeSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid request payload.";
    return NextResponse.json({ success: false, error: firstError }, { status: 400 });
  }

  const email = parsed.data.email.trim().toLowerCase();
  const name = parsed.data.name?.trim() ?? "";
  const attribution = parsed.data.attribution;
  const [firstName, ...rest] = name.split(/\s+/).filter(Boolean);
  const lastName = rest.join(" ");

  const subscriberHash = toSubscriberHash(email);
  const authHeader = `Basic ${toBasicAuth(apiKey)}`;
  const baseUrl = `https://${server}.api.mailchimp.com/3.0`;

  let upsertResponse: Response;
  try {
    upsertResponse = await fetch(`${baseUrl}/lists/${audienceId}/members/${subscriberHash}`, {
      method: "PUT",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status_if_new: "subscribed",
        merge_fields: {
          // Keep merge fields stable even when a name is omitted.
          FNAME: firstName || "Friend",
          LNAME: lastName,
        },
      }),
    });
  } catch (error) {
    console.error("Mailchimp upsert request failed:", error);
    return NextResponse.json(
      { success: false, error: "Could not subscribe right now. Please try again." },
      { status: 502 },
    );
  }

  if (!upsertResponse.ok) {
    const message = await readMailchimpError(upsertResponse);
    return NextResponse.json({ success: false, error: message }, { status: upsertResponse.status });
  }

  let tagResponse: Response;
  const tags = [
    "ebook-masterclass",
    makeAttributionTag("src", attribution?.utm_source),
    makeAttributionTag("med", attribution?.utm_medium),
    makeAttributionTag("cmp", attribution?.utm_campaign),
  ].filter(Boolean) as string[];

  try {
    tagResponse = await fetch(`${baseUrl}/lists/${audienceId}/members/${subscriberHash}/tags`, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tags: tags.map((tag) => ({ name: tag, status: "active" })),
      }),
    });
  } catch (error) {
    console.error("Mailchimp tag request failed:", error);
    return NextResponse.json(
      { success: false, error: "Could not subscribe right now. Please try again." },
      { status: 502 },
    );
  }

  if (!tagResponse.ok) {
    const message = await readMailchimpError(tagResponse);
    return NextResponse.json({ success: false, error: message }, { status: tagResponse.status });
  }

  if (attribution) {
    console.log("Lead attribution captured:", {
      email,
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign,
      landing_path: attribution.landing_path,
      referrer: attribution.referrer,
    });
  }

  // SendGrid lead notifications disabled (volume). Re-enable via sendMasterclassLeadNotification in @/lib/masterclass-lead-email if needed.

  return NextResponse.json(
    { success: true, message: "Thanks! Check your email for the PDF" },
    { status: 200 },
  );
}
