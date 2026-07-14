import { NextResponse } from "next/server";
import { z } from "zod";
import { upsertCertificationEnrollment } from "@/lib/certification/enrollments";
import {
  getKlaviyoCertificationConfig,
  subscribeCertificationToKlaviyo,
} from "@/lib/klaviyo";

const certificationSubscribeSchema = z.object({
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

  const parsed = certificationSubscribeSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid request payload.";
    return NextResponse.json({ success: false, error: firstError }, { status: 400 });
  }

  if (!getKlaviyoCertificationConfig()) {
    return NextResponse.json(
      { success: false, error: "Certification signup is not configured yet." },
      { status: 500 },
    );
  }

  if (!process.env.DATABASE_URL?.trim()) {
    return NextResponse.json(
      { success: false, error: "Certification signup is not configured yet." },
      { status: 500 },
    );
  }

  const email = parsed.data.email.trim().toLowerCase();
  const name = parsed.data.name?.trim() ?? "";
  const attribution = parsed.data.attribution;
  const [firstName, ...rest] = name.split(/\s+/).filter(Boolean);
  const lastName = rest.join(" ");
  const resolvedFirstName = firstName || "Friend";

  let enrollment;
  try {
    enrollment = await upsertCertificationEnrollment({
      email,
      firstName: resolvedFirstName,
      lastName,
    });
  } catch (error) {
    console.error("[subscribe/certification] Neon enrollment failed:", error);
    return NextResponse.json(
      { success: false, error: "Could not start certification right now. Please try again." },
      { status: 502 },
    );
  }

  const result = await subscribeCertificationToKlaviyo({
    email,
    firstName: resolvedFirstName,
    lastName,
    certificationToken: enrollment.access_token,
    attribution,
  });

  if (!result.ok) {
    console.error("[subscribe/certification] Klaviyo failed:", result.status, result.message);
    return NextResponse.json(
      {
        success: false,
        error:
          result.status >= 500
            ? "Could not start certification right now. Please try again."
            : result.message,
      },
      { status: result.status >= 400 && result.status < 600 ? result.status : 502 },
    );
  }

  if (attribution) {
    console.log("Certification signup attribution captured:", {
      email,
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign,
      landing_path: attribution.landing_path,
      referrer: attribution.referrer,
      enrollment_created: enrollment.created,
    });
  }

  return NextResponse.json(
    {
      success: true,
      message:
        "You're enrolled — check your inbox for lesson 1. We'll email your quiz links as you go.",
    },
    { status: 200 },
  );
}
