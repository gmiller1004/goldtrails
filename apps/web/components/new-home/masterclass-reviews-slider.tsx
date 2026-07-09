"use client";

import { Star } from "lucide-react";
import { ReviewsCarousel, reviewCardClassName } from "@/components/new-home/reviews-carousel";
import type { MasterclassReview } from "@/lib/masterclass-reviews";
import { cn } from "@/lib/utils";

type MasterclassReviewsSliderProps = {
  reviews: MasterclassReview[];
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            "h-4 w-4",
            index < rating ? "fill-primary text-primary" : "fill-transparent text-[#d0d5c4]",
          )}
          aria-hidden
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: MasterclassReview }) {
  return (
    <figure data-review-card className={reviewCardClassName}>
      <StarRating rating={review.rating} />
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-[#5c4f3f]">
        &ldquo;{review.body}&rdquo;
      </blockquote>
      <figcaption className="mt-4 text-sm font-semibold text-[#1a140f]">{review.reviewerName}</figcaption>
    </figure>
  );
}

export function MasterclassReviewsSlider({ reviews }: MasterclassReviewsSliderProps) {
  return (
    <ReviewsCarousel ariaLabel="masterclass book review">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </ReviewsCarousel>
  );
}
