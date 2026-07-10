import { NextResponse } from "next/server";
import { z } from "zod";
import { getKlaviyoEventsConfig, subscribeEventsNotifyToKlaviyo } from "@/lib/klaviyo";

const eventsSubscribeSchema = z.object({
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

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = eventsSubscribeSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid request payload.";
    return NextResponse.json({ success: false, error: firstError }, { status: 400 });
  }

  if (!getKlaviyoEventsConfig()) {
    return NextResponse.json(
      { success: false, error: "Event notifications are not configured yet." },
      { status: 500 },
    );
  }

  const email = parsed.data.email.trim().toLowerCase();
  const name = parsed.data.name?.trim() ?? "";
  const attribution = parsed.data.attribution;
  const [firstName, ...rest] = name.split(/\s+/).filter(Boolean);
  const lastName = rest.join(" ");
  const resolvedFirstName = firstName || "Friend";

  const result = await subscribeEventsNotifyToKlaviyo({
    email,
    firstName: resolvedFirstName,
    lastName,
    attribution,
  });

  if (!result.ok) {
    console.error("[subscribe/events] Klaviyo failed:", result.status, result.message);
    return NextResponse.json(
      {
        success: false,
        error:
          result.status >= 500
            ? "Could not subscribe right now. Please try again."
            : result.message,
      },
      { status: result.status >= 400 && result.status < 600 ? result.status : 502 },
    );
  }

  if (attribution) {
    console.log("Events notify attribution captured:", {
      email,
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign,
      landing_path: attribution.landing_path,
      referrer: attribution.referrer,
    });
  }

  return NextResponse.json(
    {
      success: true,
      message: "You're on the list — we'll email you when new Gold Trails sessions are announced.",
    },
    { status: 200 },
  );
}
