import { randomBytes } from "crypto";
import { getDb } from "@/lib/db";

export function createApprovalToken(): string {
  return randomBytes(32).toString("hex");
}

export async function insertPendingMasterclassReview(input: {
  reviewerName: string;
  reviewerEmail: string | null;
  rating: number;
  body: string;
  approvalToken: string;
}): Promise<{ id: string }> {
  const sql = getDb();
  const rows = (await sql`
    INSERT INTO masterclass_reviews (
      reviewer_name,
      reviewer_email,
      rating,
      body,
      status,
      approval_token
    )
    VALUES (
      ${input.reviewerName},
      ${input.reviewerEmail},
      ${input.rating},
      ${input.body},
      'pending',
      ${input.approvalToken}
    )
    RETURNING id::text AS id
  `) as unknown as Array<{ id: string }>;
  const row = rows[0];
  if (!row?.id) {
    throw new Error("Failed to insert review.");
  }
  return { id: row.id };
}

export async function approveMasterclassReviewByToken(token: string): Promise<boolean> {
  const sql = getDb();
  const rows = (await sql`
    UPDATE masterclass_reviews
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

export type MasterclassReview = {
  id: string;
  reviewerName: string;
  rating: number;
  body: string;
  approvedAt: string | null;
};

export async function getApprovedMasterclassReviews(limit = 24): Promise<MasterclassReview[]> {
  try {
    if (!process.env.DATABASE_URL?.trim()) {
      return [];
    }

    const sql = getDb();
    const rows = (await sql`
      SELECT
        id::text AS id,
        reviewer_name,
        rating,
        body,
        approved_at::text AS approved_at
      FROM masterclass_reviews
      WHERE status = 'approved'
      ORDER BY approved_at DESC NULLS LAST, created_at DESC
      LIMIT ${limit}
    `) as unknown as Array<{
      id: string;
      reviewer_name: string;
      rating: number;
      body: string;
      approved_at: string | null;
    }>;

    return rows.map((row) => ({
      id: row.id,
      reviewerName: row.reviewer_name,
      rating: row.rating,
      body: row.body,
      approvedAt: row.approved_at,
    }));
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Could not load masterclass reviews:", error);
    }
    return [];
  }
}
