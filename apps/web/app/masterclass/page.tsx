import type { Metadata } from "next";
import Image from "next/image";
import { TrackedLinkButton } from "@/components/analytics/tracked-link-button";
import { LeadForm } from "@/components/lead-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pageMetadata } from "@/lib/site";

const masterclassDescription =
  "Free 75-page metal detecting masterclass PDF by Kevin Hoagland: detector settings, ground balance, gridding, legal hunting, and field-tested tactics.";

export const metadata: Metadata = pageMetadata({
  title: "Free Metal Detecting Masterclass PDF",
  description: masterclassDescription,
  path: "/masterclass",
});

const tocItems = [
  "The Ripple Effect: How every metal detector really works",
  "Frequency, threshold, and ground balancing made simple",
  "Sensitivity, gain, and coil control that finds more targets",
  "Grid systems and dig-or-don't decisions in real ground",
  "Where to hunt legally: claims, research, and terrain tactics",
  "Maintenance, upgrades, and the 30-day beginner-to-expert plan",
];

const outcomes = [
  "Understand your detector better than most people swinging one today",
  "Stop random walking and start systematic hunts that produce",
  "Tune your settings to the real ground instead of guessing",
  "Recover more good targets by hearing threshold whispers",
  "Build repeatable routines you can use on any machine",
];

const testimonials = [
  {
    name: "Dale Warren",
    quote:
      "I basically attended a master class in prospecting and enjoyed it so much I stayed for a second event.",
  },
  {
    name: "Glenn Wharregard",
    quote:
      "Great class, very useful information for prospectors on any level.",
  },
  {
    name: "Sean Bush",
    quote:
      "Fun and educational. I highly recommend attending and learning from Kevin.",
  },
];

const planSteps = [
  "Week 1: Backyard fundamentals - threshold, ground balance, and swing control",
  "Week 2: Test garden drills - depth testing and settings confidence",
  "Week 3: Real claim gridding - systematic hunting and clean recovery",
  "Week 4: Full field days - logging finds, building habits, and community",
];

export default function MasterclassPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
      <section className="rounded-2xl border border-secondary bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">Free Ebook Download</p>
            <h1 className="text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-5xl">
              Metal Detecting: A Complete Masterclass - FREE Download
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Learn the exact field-tested framework Kevin Hoagland uses to train
              detectorists from overwhelmed beginner to confident finder - without
              tech-speak, hype, or expensive-gear guesswork.
            </p>
            <div className="space-y-2">
              {outcomes.map((item) => (
                <p key={item} className="text-sm text-muted-foreground">
                  <span className="mr-2 text-primary">✓</span>
                  {item}
                </p>
              ))}
            </div>
            <p className="text-sm font-medium text-foreground">
              75 pages of practical instruction from 55 years in the field.
            </p>
          </div>

          <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-4">
            <div className="w-full overflow-hidden rounded-xl border border-secondary/80 bg-white shadow-sm">
              <Image
                src="/bookcover/uUgPy.jpg"
                alt="Metal Detecting: A Complete Masterclass ebook cover"
                width={900}
                height={1200}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary">
              Official Masterclass Ebook Cover
            </p>
            <div className="text-center">
              <p className="text-sm font-semibold text-foreground">Metal Detecting Masterclass</p>
              <p className="text-xs text-muted-foreground">Kevin Hoagland</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-xl bg-muted/35 p-4 sm:p-6">
        <div className="mx-auto mb-5 max-w-3xl text-center">
          <h2 className="text-2xl font-semibold text-foreground">Get Instant Access</h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Enter your details and Kevin will send the complete PDF to your inbox.
          </p>
        </div>
        <div className="mx-auto max-w-xl">
          <LeadForm />
        </div>
      </section>

      <section className="grid gap-8 rounded-2xl bg-muted/30 p-4 sm:p-6 lg:grid-cols-[1fr_340px] lg:items-start">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">From The Introduction</CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="border-l-2 border-primary/60 pl-4 text-sm italic leading-relaxed text-muted-foreground sm:text-base">
                &quot;Metal detecting is not complicated. Once you understand the core
                fundamentals every detector shares, you stop guessing and start finding.&quot;
              </blockquote>
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-primary/80">
                - Kevin Hoagland, GPAA/LDMA
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-primary">What You&apos;ll Master Fast</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <p>
                <span className="font-semibold text-foreground">Chapter 1 - The Ripple Effect:</span>{" "}
                The simple model that makes every detector easier to operate, regardless of
                brand or price point.
              </p>
              <p>
                <span className="font-semibold text-foreground">Chapter 2 - The 3 Biggest Questions:</span>{" "}
                Straight answers on depth, tiny-gold reality, and why there is no true
                gold-only detector.
              </p>
              <p>
                <span className="font-semibold text-foreground">Chapter 3 - Frequency Mastery:</span>{" "}
                Match frequency, coil, and terrain so your machine works with the ground
                instead of fighting it.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Table of Contents Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {tocItems.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Your 30-Day Path To Confidence</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {planSteps.map((step) => (
                  <li key={step}>• {step}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="rounded-xl border border-secondary bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-xl font-semibold text-foreground">
              Want The Full Field Manual?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Get all 14 chapters, drills, and field-proven checklists in your inbox. Read it
              tonight and hunt smarter this weekend.
            </p>
            <div className="mt-5">
              <LeadForm />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-primary">What Students Are Saying</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {testimonials.map((item) => (
                <div key={item.name} className="rounded-lg border border-secondary/70 bg-muted/30 p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary">★★★★★ Verified</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.quote}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <p className="text-xs uppercase tracking-[0.22em] text-primary">
              Instant Access
            </p>
            <LeadForm />
            <div className="rounded-lg border border-secondary bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-foreground">No fluff. No spam.</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Just proven detector fundamentals, event invites, and practical field updates.
              </p>
            </div>
          </div>
        </aside>
      </section>

      <section className="rounded-2xl border border-secondary bg-white p-6 shadow-sm sm:p-8">
        <div className="mx-auto max-w-4xl space-y-4 text-center">
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            About Kevin Hoagland
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Kevin is a veteran prospector, longtime GPAA Executive Director, and host of
            Gold Trails. For decades, he has coached detectorists across North America to
            read ground better, recover targets smarter, and turn hard-earned lessons into
            reliable results.
          </p>
          <TrackedLinkButton
            href="/events"
            className="mt-2"
            eventName="masterclass_cta_click"
            eventProps={{ cta: "join-live-event" }}
          >
            Join Kevin on a live Gold Trails event
          </TrackedLinkButton>
        </div>
      </section>

      <section className="rounded-xl bg-muted/35 p-4 sm:p-6">
        <div className="mx-auto mb-5 max-w-3xl text-center">
          <h2 className="text-2xl font-semibold text-foreground">Start Learning In Minutes</h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Download the masterclass now and use it as your field manual on your next hunt.
          </p>
        </div>
        <div className="mx-auto max-w-xl">
          <LeadForm />
        </div>
      </section>
    </div>
  );
}
