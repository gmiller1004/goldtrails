import { NextResponse } from "next/server";
import { z } from "zod";
import { hasPassedQuiz } from "@/lib/certification/attempts";
import { getEnrollmentByToken } from "@/lib/certification/enrollments";
import {
  CERTIFICATION_REWARD_DISCOUNT_CODE,
  CERTIFICATION_REWARD_PRODUCT_ID,
} from "@/lib/certification/reward";
import { createCheckoutUrl, getProductDefaultVariantId } from "@/lib/shopify";

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

  const variantId = await getProductDefaultVariantId(CERTIFICATION_REWARD_PRODUCT_ID);
  if (!variantId) {
    console.error(
      "[api/certification/claim] Could not resolve reward variant",
      CERTIFICATION_REWARD_PRODUCT_ID,
    );
    return NextResponse.json(
      { success: false, error: "Reward product isn’t available in Shopify yet." },
      { status: 502 },
    );
  }

  const checkoutUrl = await createCheckoutUrl([{ variantId, quantity: 1 }], {
    discountCodes: [CERTIFICATION_REWARD_DISCOUNT_CODE],
    email: enrollment.email,
  });

  if (!checkoutUrl) {
    return NextResponse.json(
      { success: false, error: "Could not start Shopify checkout." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true, checkoutUrl }, { status: 200 });
}
