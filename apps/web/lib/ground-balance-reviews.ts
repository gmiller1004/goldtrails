import {
  getApprovedMasterclassReviews,
  type MasterclassReview,
} from "@/lib/masterclass-reviews";

/** Real approved masterclass-book reviews curated for the ground-balance landing page. */
export const GROUND_BALANCE_BOOK_REVIEW_FALLBACK: MasterclassReview[] = [
  {
    id: "fallback-joe-kinney",
    reviewerName: "Joe Kinney",
    rating: 5,
    body: "Ground balancing is so important and also the most challenging.",
    approvedAt: null,
  },
  {
    id: "fallback-steven-lacy",
    reviewerName: "Steven Lacy",
    rating: 5,
    body: "Kevin's book is the best explanation of how detectors work that i have ever read. The information is easy to understand and applies to all detectors. If you are a detectorist that struggles wirh tuning your detector in difficult ground this book will help you. Thank you Kevin Hoaglin.",
    approvedAt: null,
  },
  {
    id: "fallback-greg",
    reviewerName: "Greg",
    rating: 5,
    body: 'After reading this masterclass, I feel like I have a much better understanding of how to use my machine to find gold nuggets! Kevin did a great job of explaining "hard to understand" concepts in very simple terms. Thank you. I can\'t wait to get out there, put this into practice, and find my first nugget!',
    approvedAt: null,
  },
  {
    id: "fallback-conrad",
    reviewerName: "Conrad",
    rating: 5,
    body: "I am new to the metal detector world so understanding what the detector was “telling me” was somewhat confusing before reading this book. There is a wealth of information in this book along with practice drills to help familiarize yourself with your particular detector in different conditions.",
    approvedAt: null,
  },
  {
    id: "fallback-brady",
    reviewerName: "Brady",
    rating: 5,
    body: "I haven't made it through the whole class yet. I already feel more confident with my detector and understanding of what is happening. Kevin explains things in an understandable way and gives tips/drills to do to improve your detecting.",
    approvedAt: null,
  },
  {
    id: "fallback-joseph-emery",
    reviewerName: "Joseph Emery",
    rating: 5,
    body: "I’m currently reading your book for the second time. Once I purchase my detector I know I will be reading your book again and again. I’m excited to get out with my detector and fine tuning it, following your instructions as well as your tips and tricks out in the field.",
    approvedAt: null,
  },
];

function scoreGroundBalanceRelevance(body: string): number {
  const text = body.toLowerCase();
  let score = 0;
  if (/ground\s*balanc/.test(text)) score += 10;
  if (/tun(e|ing)|difficult ground/.test(text)) score += 8;
  if (/understand|understanding/.test(text)) score += 7;
  if (/settings|fine.?tun|threshold|sensitiv/.test(text)) score += 5;
  if (/confident with my detector|what the detector was/.test(text)) score += 4;
  if (/detector|machine/.test(text)) score += 2;
  return score;
}

function normalizeBody(body: string): string {
  return body.replace(/\s+/g, " ").trim();
}

function dedupeByBody(reviews: MasterclassReview[]): MasterclassReview[] {
  const seen = new Set<string>();
  return reviews.filter((review) => {
    const key = normalizeBody(review.body).toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function rankGroundBalanceBookReviews(
  reviews: MasterclassReview[],
): MasterclassReview[] {
  return dedupeByBody(reviews)
    .map((review) => ({
      review: { ...review, body: normalizeBody(review.body) },
      score: scoreGroundBalanceRelevance(review.body),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.review.rating - a.review.rating)
    .map(({ review }) => review);
}

export type GroundBalanceReviewSelection = {
  featured: MasterclassReview;
  supporting: MasterclassReview[];
};

export async function getGroundBalanceBookReviews(): Promise<GroundBalanceReviewSelection> {
  const live = await getApprovedMasterclassReviews(40);
  const ranked = rankGroundBalanceBookReviews(
    live.length ? live : GROUND_BALANCE_BOOK_REVIEW_FALLBACK,
  );
  const pool = ranked.length
    ? ranked
    : rankGroundBalanceBookReviews(GROUND_BALANCE_BOOK_REVIEW_FALLBACK);

  const featured =
    pool.find((review) => /ground\s*balanc/i.test(review.body)) ??
    pool[0] ??
    GROUND_BALANCE_BOOK_REVIEW_FALLBACK[0]!;
  const supporting = pool.filter((review) => review.id !== featured.id).slice(0, 3);

  return { featured, supporting };
}
