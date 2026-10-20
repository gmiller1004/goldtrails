-- Run once in Neon SQL Editor (or psql). Gold Trails event reviews with optional photos.

CREATE TABLE IF NOT EXISTS event_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_name TEXT NOT NULL,
  reviewer_email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  body TEXT NOT NULL,
  event_key TEXT NOT NULL,
  event_label TEXT NOT NULL,
  venue_slug TEXT,
  photo_urls TEXT[] NOT NULL DEFAULT '{}',
  photo_consent BOOLEAN NOT NULL DEFAULT false,
  photo_consent_text TEXT,
  photo_consent_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  approval_token TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  approved_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_event_reviews_status ON event_reviews (status);
CREATE INDEX IF NOT EXISTS idx_event_reviews_created_at ON event_reviews (created_at DESC);
