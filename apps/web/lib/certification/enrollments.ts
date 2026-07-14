import { randomBytes } from "crypto";
import { getDb } from "@/lib/db";

export type CertificationEnrollment = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  access_token: string;
  klaviyo_profile_id: string | null;
  enrolled_at: string;
  updated_at: string;
  created: boolean;
};

function generateAccessToken() {
  return randomBytes(32).toString("base64url");
}

/**
 * Create or reuse a certification enrollment.
 * Reuses the existing access_token on re-subscribe so previously emailed quiz links stay valid.
 */
export async function upsertCertificationEnrollment(input: {
  email: string;
  firstName: string;
  lastName: string;
}): Promise<CertificationEnrollment> {
  const sql = getDb();
  const email = input.email.trim().toLowerCase();

  const existing = (await sql`
    SELECT
      id,
      email,
      first_name,
      last_name,
      access_token,
      klaviyo_profile_id,
      enrolled_at::text,
      updated_at::text
    FROM certification_enrollments
    WHERE email = ${email}
    LIMIT 1
  `) as Array<{
    id: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    access_token: string;
    klaviyo_profile_id: string | null;
    enrolled_at: string;
    updated_at: string;
  }>;

  if (existing[0]) {
    const row = existing[0];
    const updated = (await sql`
      UPDATE certification_enrollments
      SET
        first_name = COALESCE(NULLIF(${input.firstName}, ''), first_name),
        last_name = COALESCE(NULLIF(${input.lastName}, ''), last_name),
        updated_at = now()
      WHERE id = ${row.id}
      RETURNING
        id,
        email,
        first_name,
        last_name,
        access_token,
        klaviyo_profile_id,
        enrolled_at::text,
        updated_at::text
    `) as typeof existing;

    const result = updated[0] ?? row;
    return { ...result, created: false };
  }

  const accessToken = generateAccessToken();
  const inserted = (await sql`
    INSERT INTO certification_enrollments (email, first_name, last_name, access_token)
    VALUES (
      ${email},
      ${input.firstName || null},
      ${input.lastName || null},
      ${accessToken}
    )
    RETURNING
      id,
      email,
      first_name,
      last_name,
      access_token,
      klaviyo_profile_id,
      enrolled_at::text,
      updated_at::text
  `) as typeof existing;

  const row = inserted[0];
  if (!row) {
    throw new Error("Failed to create certification enrollment.");
  }

  return { ...row, created: true };
}

export async function getEnrollmentByToken(
  token: string,
): Promise<Omit<CertificationEnrollment, "created"> | null> {
  const sql = getDb();
  const rows = (await sql`
    SELECT
      id,
      email,
      first_name,
      last_name,
      access_token,
      klaviyo_profile_id,
      enrolled_at::text,
      updated_at::text
    FROM certification_enrollments
    WHERE access_token = ${token}
    LIMIT 1
  `) as Array<Omit<CertificationEnrollment, "created">>;

  return rows[0] ?? null;
}
