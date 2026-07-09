import { EventTestimonialsSlider } from "@/components/new-home/event-testimonials-slider";
import { getGoldTrailsTestimonials } from "@/lib/judgeme";

export async function NewHomeEventReviews() {
  const testimonials = await getGoldTrailsTestimonials();

  if (!testimonials.length) {
    return null;
  }

  return (
    <div className="mt-14 border-t border-[#e0d4b3]/80 pt-12 sm:mt-16 sm:pt-14" aria-labelledby="event-reviews-heading">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">Event reviews</p>
        <h3 id="event-reviews-heading" className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">
          What attendees say about Gold Trails events
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-[#5c4f3f] sm:text-base">
          Verified reviews from detectorists who trained in the field with Kevin.
        </p>
      </div>
      <EventTestimonialsSlider testimonials={testimonials} />
    </div>
  );
}
