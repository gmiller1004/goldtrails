-- Run once in Neon SQL Editor after 002_certification_enrollments.sql.

CREATE TABLE IF NOT EXISTS certification_quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID NOT NULL REFERENCES certification_enrollments (id) ON DELETE CASCADE,
  quiz_slug TEXT NOT NULL,
  correct_count INTEGER NOT NULL,
  total_count INTEGER NOT NULL,
  percent NUMERIC(6, 4) NOT NULL,
  passed BOOLEAN NOT NULL,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  results JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_certification_quiz_attempts_enrollment_slug
  ON certification_quiz_attempts (enrollment_id, quiz_slug, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_certification_quiz_attempts_created_at
  ON certification_quiz_attempts (created_at DESC);
