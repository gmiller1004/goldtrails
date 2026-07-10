import { EventTestimonialsSlider } from "@/components/new-home/event-testimonials-slider";
import { getGoldTrailsTestimonials } from "@/lib/judgeme";

export async function EventsReviewsSection() {
  const testimonials = await getGoldTrailsTestimonials();

  if (!testimonials.length) {
    return null;
  }

  return (
    <section
      className="border-t border-[#e0d4b3]/60 bg-[#f7f2e8] py-14 sm:py-16"
      aria-labelledby="events-reviews-heading"
    >
      <div className="mx-auto mb-8 max-w-6xl px-4 text-center sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">From the field</p>
        <h2 id="events-reviews-heading" className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">
          What attendees say about Gold Trails
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-[#5c4f3f] sm:text-base">
          Verified Judge.me reviews from detectorists who trained at Gold Trails events.
        </p>
      </div>
      <EventTestimonialsSlider testimonials={testimonials} />
    </section>
  );
}
