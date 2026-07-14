import type { Metadata } from "next";
import Link from "next/link";
import { MediaTrust } from "@/components/media-trust";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { testimonials } from "@/lib/testimonials";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Student Testimonials",
  description:
    "Verified reviews and stories from metal detectorists who trained with Kevin Hoagland at Gold Trails events and classes.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
      <header className="space-y-3 text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-primary">Testimonials</p>
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
          Real Feedback From Gold Trails Students
        </h1>
        <p className="mx-auto max-w-3xl text-sm text-muted-foreground sm:text-base">
          Read what detectorists say about Kevin&apos;s training, field events, and practical
          instruction.
        </p>
      </header>

      <section className="rounded-2xl bg-muted/30 p-4 sm:p-6">
        <div className="grid gap-5 md:grid-cols-2">
          {testimonials.map((item) => (
            <Card key={item.name + item.title}>
              <CardHeader className="space-y-2">
                <p className="text-xs uppercase tracking-[0.18em] text-primary">★★★★★ Verified</p>
                <CardTitle className="text-foreground">{item.title}</CardTitle>
                <p className="text-sm font-medium text-foreground">{item.name}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.quote}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <MediaTrust />

      <section className="rounded-2xl border border-secondary bg-white p-6 text-center shadow-sm sm:p-8">
        <h2 className="text-2xl font-semibold text-foreground">Ready To Learn In The Field?</h2>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Join Kevin at an upcoming event or start with the free masterclass.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/events">View Events</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/masterclass">Get The Masterclass</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
