import type { Metadata } from "next";
import Image from "next/image";
import { LeadForm } from "@/components/lead-form";
import { TrackedLinkButton } from "@/components/analytics/tracked-link-button";
import { MediaTrust } from "@/components/media-trust";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { testimonials } from "@/lib/testimonials";
import { DEFAULT_SITE_TITLE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: DEFAULT_SITE_TITLE },
  description:
    "Download the free metal detecting masterclass (75-page PDF), join Gold Trails events with Kevin Hoagland, and shop detectors and field gear-trusted GPAA training.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_15%,hsl(var(--primary)/0.13),transparent_40%)]">
        <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
        <div className="mb-8 w-full">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-primary sm:text-sm">
              Gold Trails Masterclass
          </p>
          <h1 className="text-balance font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl md:text-6xl">
            55 Years of Metal Detecting Wisdom - Download Kevin Hoagland&apos;s FREE
            Masterclass
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg">
            Learn proven field tactics, detector mastery, and recovery strategies from one
            of the most trusted voices in prospecting.
          </p>
        </div>
        <Card className="mx-auto w-full max-w-lg rounded-xl border-secondary bg-white p-8 shadow-lg">
          <LeadForm className="border-0 bg-transparent p-0 shadow-none" />
        </Card>
        </div>
      </section>

      <section className="border-y border-primary/20 bg-muted py-4">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm font-medium tracking-wide text-foreground sm:px-6 sm:text-base">
          GPAA Executive Director • Gold Trails Host • 55+ Years
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-5 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">What You&apos;ll Learn</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                <li>• Proven patch reading and research techniques</li>
                <li>• Detector setup tips for depth and target clarity</li>
                <li>• Nugget hunting strategy for washes and benches</li>
                <li>• Recovery methods to protect finds and terrain</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Upcoming Gold Trails Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Join Kevin in the field for guided hunts, live demos, and practical
                training sessions.
              </p>
              <TrackedLinkButton
                href="/events"
                className="w-full"
                eventName="home_cta_click"
                eventProps={{ cta: "events-card" }}
              >
                View Events
              </TrackedLinkButton>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Recommended Detectors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Explore field-tested detectors and gear Kevin trusts for prospecting
                success.
              </p>
              <TrackedLinkButton
                href="/shop"
                className="w-full"
                eventName="home_cta_click"
                eventProps={{ cta: "shop-card" }}
              >
                Shop Gear
              </TrackedLinkButton>
            </CardContent>
          </Card>
        </div>
        </div>
      </section>

      <section className="border-t border-primary/20 bg-muted py-14 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mx-auto mb-6 max-w-3xl text-center">
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
              Start Your Gold Trails Journey
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Get the free masterclass and stay first in line for upcoming releases and
              events.
            </p>
          </div>
          <div className="mx-auto max-w-xl">
            <LeadForm />
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-primary">In The Field</p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
              Real Gold Trails Training Moments
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["gt1.jpg", "gt2.jpg", "gt3.jpg", "gt4.jpg"].map((file) => (
              <div key={file} className="overflow-hidden rounded-xl border border-secondary/70 bg-white shadow-sm">
                <Image
                  src={`/images/${file}`}
                  alt="Gold Trails event photo"
                  width={900}
                  height={900}
                  className="h-56 w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/35 py-14 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-primary">Testimonials</p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
              What Prospectors Say About Kevin
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {testimonials.slice(0, 4).map((item) => (
              <Card key={item.name} className="h-full">
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
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <MediaTrust />
        </div>
      </section>
    </div>
  );
}
