"use client";

import { Star } from "lucide-react";
import { ReviewsCarousel, reviewCardClassName } from "@/components/new-home/reviews-carousel";
import type { EventTestimonial } from "@/lib/judgeme";
import { cn } from "@/lib/utils";

type EventTestimonialsSliderProps = {
  testimonials: EventTestimonial[];
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

function EventTestimonialCard({ testimonial }: { testimonial: EventTestimonial }) {
  return (
    <figure data-review-card className={reviewCardClassName}>
      <StarRating rating={testimonial.rating} />
      {testimonial.title ? (
        <p className="mt-2 text-sm font-semibold leading-snug text-[#1a140f]">{testimonial.title}</p>
      ) : null}
      <blockquote
        className={cn(
          "line-clamp-5 flex-1 text-sm leading-relaxed text-[#5c4f3f]",
          testimonial.title ? "mt-2" : "mt-3",
        )}
      >
        &ldquo;{testimonial.body}&rdquo;
      </blockquote>
      <figcaption className="mt-4 border-t border-[#e0d4b3]/80 pt-3">
        <p className="text-sm font-semibold text-[#1a140f]">{testimonial.reviewerName}</p>
        <p className="mt-0.5 text-xs text-[#6d7760]">{testimonial.productTitle}</p>
      </figcaption>
    </figure>
  );
}

export function EventTestimonialsSlider({ testimonials }: EventTestimonialsSliderProps) {
  return (
    <ReviewsCarousel ariaLabel="Gold Trails event review">
      {testimonials.map((testimonial) => (
        <EventTestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </ReviewsCarousel>
  );
}
