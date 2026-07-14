import { NextResponse } from "next/server";
import { z } from "zod";
import { getKlaviyoWebinarConfig, subscribeWebinarWaitlistToKlaviyo } from "@/lib/klaviyo";
import { isWebinarWaitlistTopic, WEBINAR_WAITLIST_TOPICS } from "@/lib/webinars";

const webinarSubscribeSchema = z.object({
  email: z.string().email("A valid email is required."),
  topic: z.string().min(1),
  topicLabel: z.string().trim().optional(),
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

  const parsed = webinarSubscribeSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid request payload.";
    return NextResponse.json({ success: false, error: firstError }, { status: 400 });
  }

  const topic = parsed.data.topic.trim();
  if (!isWebinarWaitlistTopic(topic)) {
    return NextResponse.json({ success: false, error: "Unknown webinar topic." }, { status: 400 });
  }

  if (!getKlaviyoWebinarConfig()) {
    return NextResponse.json(
      { success: false, error: "Webinar waitlist is not configured yet." },
      { status: 500 },
    );
  }

  const email = parsed.data.email.trim().toLowerCase();
  const topicLabel = WEBINAR_WAITLIST_TOPICS[topic];
  const attribution = parsed.data.attribution;

  const result = await subscribeWebinarWaitlistToKlaviyo({
    email,
    firstName: "Friend",
    lastName: "",
    topic,
    topicLabel,
    attribution,
  });

  if (!result.ok) {
    console.error("[subscribe/webinar] Klaviyo failed:", result.status, result.message);
    return NextResponse.json(
      {
        success: false,
        error:
          result.status >= 500
            ? "Could not join the waitlist right now. Please try again."
            : result.message,
      },
      { status: result.status >= 400 && result.status < 600 ? result.status : 502 },
    );
  }

  if (attribution) {
    console.log("Webinar waitlist attribution captured:", {
      email,
      topic,
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign,
      landing_path: attribution.landing_path,
    });
  }

  return NextResponse.json(
    {
      success: true,
      message: `You're on the waitlist for ${topicLabel}. We'll email you when seats open.`,
    },
    { status: 200 },
  );
}
