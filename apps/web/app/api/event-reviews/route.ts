import { randomUUID } from "crypto";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { z } from "zod";
import { sendEventReviewApprovalEmail } from "@/lib/event-review-approval-email";
import { insertPendingEventReview } from "@/lib/event-reviews";
import {
  getReviewableEvent,
  MAX_REVIEW_PHOTOS,
  OTHER_EVENT_KEY,
  PHOTO_CONSENT_TEXT,
  PHOTO_CONSENT_VERSION,
} from "@/lib/events/review-events";
import { createApprovalToken } from "@/lib/masterclass-reviews";
import { absoluteUrl } from "@/lib/site";

export const runtime = "nodejs";

const ALLOWED_PHOTO_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
// Photos are resized in the browser before upload; Vercel caps request bodies at ~4.5 MB.
const MAX_PHOTO_BYTES = 1.5 * 1024 * 1024;
const MAX_TOTAL_PHOTO_BYTES = 4 * 1024 * 1024;

const fieldsSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(254),
  eventKey: z.string().trim().min(1, "Please choose the event you attended."),
  eventOther: z.string().trim().max(160).optional(),
  rating: z.coerce.number().int().min(1).max(5),
  title: z.string().trim().max(120).optional(),
  body: z.string().trim().min(20, "Please write at least a few sentences.").max(4000),
  photoConsent: z.enum(["true", "false"]).optional(),
  /** Honeypot — bots often fill hidden fields. */
  website: z.string().optional(),
});

function text(form: FormData, key: string): string | undefined {
  const value = form.get(key);
  return typeof value === "string" ? value : undefined;
}

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const parsed = fieldsSchema.safeParse({
    name: text(form, "name"),
    email: text(form, "email"),
    eventKey: text(form, "eventKey"),
    eventOther: text(form, "eventOther"),
    rating: text(form, "rating"),
    title: text(form, "title"),
    body: text(form, "body"),
    photoConsent: text(form, "photoConsent"),
    website: text(form, "website"),
  });
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Please check your form." }, { status: 400 });
  }
  const data = parsed.data;

  if (data.website?.trim()) {
    return NextResponse.json({ success: true });
  }

  const event = getReviewableEvent(data.eventKey);
  if (!event) {
    return NextResponse.json({ error: "Please choose the event you attended." }, { status: 400 });
  }
  const isOther = event.key === OTHER_EVENT_KEY;
  if (isOther && (data.eventOther?.length ?? 0) < 3) {
    return NextResponse.json({ error: "Please tell us which event you attended." }, { status: 400 });
  }
  const eventLabel = isOther ? `Other: ${data.eventOther}` : event.label;

  const photos = form.getAll("photos").filter((value): value is File => value instanceof File && value.size > 0);
  if (photos.length > MAX_REVIEW_PHOTOS) {
    return NextResponse.json({ error: `Please attach up to ${MAX_REVIEW_PHOTOS} photos.` }, { status: 400 });
  }
  const totalBytes = photos.reduce((sum, photo) => sum + photo.size, 0);
  for (const photo of photos) {
    if (!ALLOWED_PHOTO_TYPES.has(photo.type)) {
      return NextResponse.json({ error: "Photos must be JPG, PNG, or WebP images." }, { status: 400 });
    }
    if (photo.size > MAX_PHOTO_BYTES) {
      return NextResponse.json({ error: "One of your photos is too large. Please try a smaller image." }, { status: 400 });
    }
  }
  if (totalBytes > MAX_TOTAL_PHOTO_BYTES) {
    return NextResponse.json({ error: "Your photos are too large together. Please attach fewer photos." }, { status: 400 });
  }
  if (photos.length && data.photoConsent !== "true") {
    return NextResponse.json({ error: "Please confirm the photo permission checkbox to include photos." }, { status: 400 });
  }

  if (!process.env.DATABASE_URL?.trim()) {
    console.error("[event-reviews] DATABASE_URL is not set.");
    return NextResponse.json({ error: "Reviews are not configured yet." }, { status: 503 });
  }
  if (photos.length && !process.env.BLOB_READ_WRITE_TOKEN?.trim()) {
    console.error("[event-reviews] BLOB_READ_WRITE_TOKEN is not set.");
    return NextResponse.json(
      { error: "Photo uploads aren't available right now. Remove your photos to submit your review." },
      { status: 503 },
    );
  }

  const reviewId = randomUUID();
  let photoUrls: string[] = [];
  try {
    photoUrls = await Promise.all(
      photos.map(async (photo, index) => {
        const extension = photo.type === "image/png" ? "png" : photo.type === "image/webp" ? "webp" : "jpg";
        const blob = await put(`event-reviews/${reviewId}/photo-${index + 1}.${extension}`, photo, {
          access: "public",
          contentType: photo.type,
          addRandomSuffix: true,
        });
        return blob.url;
      }),
    );
  } catch (error) {
    console.error("[event-reviews] photo upload failed:", error);
    return NextResponse.json({ error: "We couldn't upload your photos. Please try again." }, { status: 502 });
  }

  const token = createApprovalToken();
  const photoConsentText = photos.length ? `[${PHOTO_CONSENT_VERSION}] ${PHOTO_CONSENT_TEXT}` : null;

  try {
    await insertPendingEventReview({
      id: reviewId,
      reviewerName: data.name,
      reviewerEmail: data.email.toLowerCase(),
      rating: data.rating,
      title: data.title || null,
      body: data.body,
      eventKey: event.key,
      eventLabel,
      venueSlug: event.venueSlug,
      photoUrls,
      photoConsentText,
      approvalToken: token,
    });
  } catch (error) {
    console.error("[event-reviews] insert failed:", error);
    return NextResponse.json({ error: "Could not save your review. Please try again." }, { status: 500 });
  }

  const preview = data.body.length > 400 ? `${data.body.slice(0, 400).trim()}…` : data.body;

  try {
    await sendEventReviewApprovalEmail({
      reviewerName: data.name,
      reviewerEmail: data.email,
      rating: data.rating,
      eventLabel,
      title: data.title || null,
      bodyPreview: preview,
      photoUrls,
      photoConsent: Boolean(photoConsentText),
      approveUrl: absoluteUrl(`/api/event-reviews/approve?token=${encodeURIComponent(token)}`),
    });
  } catch (error) {
    console.error("[event-reviews] approval email failed:", error);
    return NextResponse.json(
      { error: "Your review was saved, but we could not send the approval email. Please contact us." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
