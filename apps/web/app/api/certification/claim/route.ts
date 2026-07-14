import { NextResponse } from "next/server";
import { z } from "zod";
import { hasPassedQuiz } from "@/lib/certification/attempts";
import { getEnrollmentByToken } from "@/lib/certification/enrollments";
import {
  CERTIFICATION_REWARD_VARIANT_ID,
  buildCertificationClaimCheckoutUrl,
} from "@/lib/certification/reward";

const claimSchema = z.object({
  token: z.string().min(1),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = claimSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "A valid certification token is required." },
      { status: 400 },
    );
  }

  if (!process.env.DATABASE_URL?.trim()) {
    return NextResponse.json(
      { success: false, error: "Claim is temporarily unavailable." },
      { status: 500 },
    );
  }

  const token = parsed.data.token.trim();
  let enrollment;
  try {
    enrollment = await getEnrollmentByToken(token);
  } catch (error) {
    console.error("[api/certification/claim] enrollment lookup failed:", error);
    return NextResponse.json(
      { success: false, error: "Could not verify enrollment right now." },
      { status: 502 },
    );
  }

  if (!enrollment) {
    return NextResponse.json(
      { success: false, error: "This claim link isn’t valid." },
      { status: 401 },
    );
  }

  let passedFinal = false;
  try {
    passedFinal = await hasPassedQuiz(enrollment.id, "final");
  } catch (error) {
    console.error("[api/certification/claim] pass check failed:", error);
    return NextResponse.json(
      { success: false, error: "Could not verify quiz results right now." },
      { status: 502 },
    );
  }

  if (!passedFinal) {
    return NextResponse.json(
      { success: false, error: "Final quiz not passed yet." },
      { status: 403 },
    );
  }

  if (!CERTIFICATION_REWARD_VARIANT_ID.replace(/\D/g, "")) {
    return NextResponse.json(
      { success: false, error: "Reward variant isn’t configured." },
      { status: 500 },
    );
  }

  // Online Store cart permalink (not Storefront cartCreate) — matches working GPAA promo links.
  const checkoutUrl = buildCertificationClaimCheckoutUrl(enrollment.email);

  return NextResponse.json({ success: true, checkoutUrl }, { status: 200 });
}
