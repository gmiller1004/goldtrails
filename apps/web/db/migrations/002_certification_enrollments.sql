-- Run once in Neon SQL Editor (or psql) after creating the database.

CREATE TABLE IF NOT EXISTS certification_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  -- Opaque token used in Klaviyo quiz magic links (?token=...)
  access_token TEXT NOT NULL,
  klaviyo_profile_id TEXT,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT certification_enrollments_email_unique UNIQUE (email),
  CONSTRAINT certification_enrollments_token_unique UNIQUE (access_token)
);

CREATE INDEX IF NOT EXISTS idx_certification_enrollments_token
  ON certification_enrollments (access_token);

CREATE INDEX IF NOT EXISTS idx_certification_enrollments_enrolled_at
  ON certification_enrollments (enrolled_at DESC);
