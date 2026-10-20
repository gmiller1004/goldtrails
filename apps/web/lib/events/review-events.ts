/**
 * Past sessions attendees can review at /review/events. Add new sessions here after they run;
 * link straight to one with /review/events?event=<key>.
 */
export type ReviewableEvent = {
  key: string;
  label: string;
  venueSlug: string | null;
};

export const OTHER_EVENT_KEY = "other";

export const reviewableEvents: ReviewableEvent[] = [
  { key: "italian-bar-2026-09-04", label: "Italian Bar — Sept 4–6, 2026", venueSlug: "italian-bar" },
  { key: "italian-bar-2026-09-08", label: "Italian Bar — Sept 8–10, 2026", venueSlug: "italian-bar" },
  { key: "italian-bar-2026-09-11", label: "Italian Bar — Sept 11–13, 2026", venueSlug: "italian-bar" },
  {
    key: "italian-bar-2026-09-16",
    label: "Founders Birthday Bash at Italian Bar — Sept 16–19, 2026",
    venueSlug: "italian-bar",
  },
  { key: OTHER_EVENT_KEY, label: "Another Gold Trails event", venueSlug: null },
];

export function getReviewableEvent(key: string | null | undefined): ReviewableEvent | null {
  if (!key) return null;
  return reviewableEvents.find((event) => event.key === key) ?? null;
}

export const MAX_REVIEW_PHOTOS = 5;

/** Stored verbatim with each review that includes photos — change the version if the wording changes. */
export const PHOTO_CONSENT_VERSION = "2026-10-20.2";
export const PHOTO_CONSENT_TEXT =
  "I took these photos or have permission to share them, and the people pictured are okay with being shown. I give Gold Trails, the Gold Prospectors Association of America (GPAA), and the Lost Dutchman's Mining Association (LDMA) permission to use, edit, and publish these photos, along with my review and name, in Gold Prospectors magazine, on their websites and social media, and in email, advertising, and other marketing materials, without payment or further approval.";

export const REVIEW_PUBLISH_NOTICE =
  "By submitting, you agree that Gold Trails may publish your review, rating, and first name with last initial on our website and in marketing materials. Reviews are checked before they're published.";

/** "Greg Miller" → "Greg M." for public display. */
export function formatReviewerName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "Gold Trails attendee";
  const [first, ...rest] = parts;
  const last = rest.at(-1);
  return last ? `${first} ${last[0]!.toUpperCase()}.` : first!;
}
