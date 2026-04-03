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
