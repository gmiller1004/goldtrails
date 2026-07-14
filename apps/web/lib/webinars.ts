/** Canonical webinar waitlist topics on `/new-home`. */
export const WEBINAR_WAITLIST_TOPICS = {
  "metal-detecting-101": "Metal Detecting 101",
  "gold-panning-101": "Gold Panning 101",
  "where-to-find-gold": "Where to Find the Gold?",
  "prospecting-gear-101": "Prospecting Gear 101",
} as const;

export type WebinarWaitlistTopic = keyof typeof WEBINAR_WAITLIST_TOPICS;

export function isWebinarWaitlistTopic(value: string): value is WebinarWaitlistTopic {
  return Object.prototype.hasOwnProperty.call(WEBINAR_WAITLIST_TOPICS, value);
}
