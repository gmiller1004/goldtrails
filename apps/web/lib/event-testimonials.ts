import { getApprovedEventReviews } from "@/lib/event-reviews";
import { formatReviewerName } from "@/lib/events/review-events";
import { getGoldTrailsTestimonials, type EventTestimonial } from "@/lib/judgeme";

/** Approved on-site event reviews (with photos) plus Judge.me event reviews, newest first. */
export async function getEventTestimonials(): Promise<EventTestimonial[]> {
  const [siteReviews, judgeMe] = await Promise.all([getApprovedEventReviews(), getGoldTrailsTestimonials()]);

  const fromSite: EventTestimonial[] = siteReviews.map((review) => ({
    id: `site-${review.id}`,
    rating: review.rating,
    title: review.title,
    body: review.body,
    reviewerName: formatReviewerName(review.reviewerName),
    productTitle: review.eventLabel,
    createdAt: review.approvedAt,
    photos: review.photoUrls,
  }));

  return [...fromSite, ...judgeMe].sort((a, b) => {
    const aTime = a.createdAt ? Date.parse(a.createdAt) : 0;
    const bTime = b.createdAt ? Date.parse(b.createdAt) : 0;
    return bTime - aTime;
  });
}
