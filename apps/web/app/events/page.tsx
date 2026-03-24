import { Suspense } from "react";
import { EventCard } from "@/components/event-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getGoldTrailsTestimonials } from "@/lib/judgeme";
import { getEvents } from "@/lib/shopify";

function EventsSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader>
            <div className="h-3 w-28 animate-pulse rounded bg-primary/25" />
            <div className="h-6 w-3/4 animate-pulse rounded bg-secondary/30" />
            <div className="h-4 w-32 animate-pulse rounded bg-primary/20" />
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-secondary/25" />
            <div className="h-4 w-[92%] animate-pulse rounded bg-secondary/25" />
            <div className="h-4 w-24 animate-pulse rounded bg-secondary/30" />
            <div className="mt-4 h-10 w-full animate-pulse rounded bg-primary/20" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

async function EventsGrid() {
  const events = await getEvents();

  if (!events.length) {
    return (
      <div className="rounded-xl border border-secondary bg-white p-8 text-center shadow-sm">
        <p className="text-lg font-semibold text-foreground">
          Check back soon - Kevin&apos;s next Gold Trails coming soon
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default function EventsPage() {
  const testimonialsPromise = getGoldTrailsTestimonials();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8 space-y-3 text-center sm:mb-10">
        <p className="text-xs uppercase tracking-[0.24em] text-primary">Gold Trails Calendar</p>
        <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          Upcoming Gold Trails Events
        </h1>
        <p className="mx-auto max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Reserve your spot for live hunts, training, and expert-led sessions with Kevin
          Hoagland.
        </p>
      </header>

      <section className="rounded-2xl bg-muted/30 p-4 sm:p-6">
        <Suspense fallback={<EventsSkeleton />}>
          <EventsGrid />
        </Suspense>
      </section>

      <Suspense fallback={null}>
        <EventTestimonials testimonialsPromise={testimonialsPromise} />
      </Suspense>
    </div>
  );
}

async function EventTestimonials({
  testimonialsPromise,
}: {
  testimonialsPromise: Promise<Awaited<ReturnType<typeof getGoldTrailsTestimonials>>>;
}) {
  const testimonials = (await testimonialsPromise).slice(0, 12);

  if (!testimonials.length) return null;

  return (
    <section className="rounded-2xl border border-secondary/70 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 space-y-2 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-primary">From the field</p>
        <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
          Gold Trails Reviews (4+ Stars)
        </h2>
        <p className="text-sm text-muted-foreground sm:text-base">
          Verified customer feedback from Judge.me for Gold Trails products.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((review) => (
          <Card key={review.id} className="h-full border-secondary/70">
            <CardHeader className="space-y-2 pb-3">
              <p className="text-sm font-medium text-foreground">
                {"★".repeat(review.rating)}
                <span className="ml-2 text-xs text-muted-foreground">({review.rating}/5)</span>
              </p>
              {review.title ? (
                <p className="text-base font-semibold text-foreground">{review.title}</p>
              ) : null}
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p className="leading-relaxed">{review.body}</p>
              <div className="pt-1 text-xs text-muted-foreground/90">
                <p className="font-medium text-foreground/90">{review.reviewerName}</p>
                <p>{review.productTitle}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
