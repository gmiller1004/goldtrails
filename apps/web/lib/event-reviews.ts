import { getDb } from "@/lib/db";

export async function insertPendingEventReview(input: {
  id: string;
  reviewerName: string;
  reviewerEmail: string;
  rating: number;
  title: string | null;
  body: string;
  eventKey: string;
  eventLabel: string;
  venueSlug: string | null;
  photoUrls: string[];
  photoConsentText: string | null;
  approvalToken: string;
}): Promise<void> {
  const sql = getDb();
  const consent = Boolean(input.photoConsentText);
  await sql`
    INSERT INTO event_reviews (
      id,
      reviewer_name,
      reviewer_email,
      rating,
      title,
      body,
      event_key,
      event_label,
      venue_slug,
      photo_urls,
      photo_consent,
      photo_consent_text,
      photo_consent_at,
      status,
      approval_token
    )
    VALUES (
      ${input.id},
      ${input.reviewerName},
      ${input.reviewerEmail},
      ${input.rating},
      ${input.title},
      ${input.body},
      ${input.eventKey},
      ${input.eventLabel},
      ${input.venueSlug},
      ${input.photoUrls},
      ${consent},
      ${input.photoConsentText},
      ${consent ? new Date().toISOString() : null},
      'pending',
      ${input.approvalToken}
    )
  `;
}

export async function approveEventReviewByToken(token: string): Promise<boolean> {
  const sql = getDb();
  const rows = (await sql`
    UPDATE event_reviews
    SET
      status = 'approved',
      approval_token = NULL,
      approved_at = now()
    WHERE approval_token = ${token}
      AND status = 'pending'
    RETURNING id
  `) as unknown as Array<{ id: string }>;
  return rows.length > 0;
}

export type ApprovedEventReview = {
  id: string;
  reviewerName: string;
  rating: number;
  title: string | null;
  body: string;
  eventLabel: string;
  venueSlug: string | null;
  photoUrls: string[];
  approvedAt: string | null;
};

export async function getApprovedEventReviews(limit = 40): Promise<ApprovedEventReview[]> {
  try {
    if (!process.env.DATABASE_URL?.trim()) return [];
    const sql = getDb();
    const rows = (await sql`
      SELECT
        id::text AS id,
        reviewer_name,
        rating,
        title,
        body,
        event_label,
        venue_slug,
        photo_urls,
        approved_at::text AS approved_at
      FROM event_reviews
      WHERE status = 'approved'
      ORDER BY approved_at DESC NULLS LAST, created_at DESC
      LIMIT ${limit}
    `) as unknown as Array<{
      id: string;
      reviewer_name: string;
      rating: number;
      title: string | null;
      body: string;
      event_label: string;
      venue_slug: string | null;
      photo_urls: string[] | null;
      approved_at: string | null;
    }>;

    return rows.map((row) => ({
      id: row.id,
      reviewerName: row.reviewer_name,
      rating: row.rating,
      title: row.title,
      body: row.body,
      eventLabel: row.event_label,
      venueSlug: row.venue_slug,
      photoUrls: row.photo_urls ?? [],
      approvedAt: row.approved_at,
    }));
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Could not load event reviews:", error);
    }
    return [];
  }
}
