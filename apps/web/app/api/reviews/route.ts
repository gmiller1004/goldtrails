import { NextResponse } from "next/server";
import { z } from "zod";
import { createApprovalToken, insertPendingMasterclassReview } from "@/lib/masterclass-reviews";
import { sendReviewApprovalEmail } from "@/lib/review-approval-email";
import { absoluteUrl } from "@/lib/site";

const reviewSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(120),
  email: z.string().trim().max(254).optional(),
  rating: z.coerce.number().int().min(1).max(5),
  body: z.string().trim().min(20, "Please write at least a few sentences.").max(4000),
  /** Honeypot — bots often fill hidden fields. */
  website: z.string().optional(),
});

function normalizeEmail(value: string | undefined): string | null {
  if (!value?.trim()) return null;
  const parsed = z.string().email().safeParse(value.trim());
  return parsed.success ? parsed.data : null;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? "Please check your form.";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  if (parsed.data.website?.trim()) {
    return NextResponse.json({ success: true, message: "Thanks for your review." });
  }

  const emailNormalized = normalizeEmail(parsed.data.email);
  if (parsed.data.email?.trim() && !emailNormalized) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!process.env.DATABASE_URL?.trim()) {
    console.error("[reviews] DATABASE_URL is not set.");
    return NextResponse.json({ error: "Reviews are not configured yet." }, { status: 503 });
  }

  const token = createApprovalToken();

  try {
    await insertPendingMasterclassReview({
      reviewerName: parsed.data.name,
      reviewerEmail: emailNormalized,
      rating: parsed.data.rating,
      body: parsed.data.body,
      approvalToken: token,
    });
  } catch (error) {
    console.error("[reviews] insert failed:", error);
    return NextResponse.json({ error: "Could not save your review. Please try again." }, { status: 500 });
  }

  const approvePath = `/api/reviews/approve?token=${encodeURIComponent(token)}`;
  const approveUrl = absoluteUrl(approvePath);

  const preview =
    parsed.data.body.length > 400 ? `${parsed.data.body.slice(0, 400).trim()}…` : parsed.data.body;

  try {
    await sendReviewApprovalEmail({
      reviewerName: parsed.data.name,
      reviewerEmail: emailNormalized,
      rating: parsed.data.rating,
      bodyPreview: preview,
      approveUrl,
    });
  } catch (error) {
    console.error("[reviews] approval email failed:", error);
    return NextResponse.json(
      { error: "Your review was saved, but we could not send the approval email. Please contact us." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true, message: "Thanks! Your review was submitted." });
}
