-- Run once in Neon SQL Editor (or psql) after creating the database.

CREATE TABLE IF NOT EXISTS masterclass_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_name TEXT NOT NULL,
  reviewer_email TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  approval_token TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  approved_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_masterclass_reviews_status ON masterclass_reviews (status);
CREATE INDEX IF NOT EXISTS idx_masterclass_reviews_created_at ON masterclass_reviews (created_at DESC);
