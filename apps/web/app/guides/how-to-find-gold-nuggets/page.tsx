import type { Metadata } from "next";
import { TrackedLinkButton } from "@/components/analytics/tracked-link-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "How to Find Gold Nuggets | Gold Trails",
  description:
    "A practical nugget hunting strategy: terrain research, systematic gridding, coil control, and target recovery.",
};

export default function FindGoldNuggetsGuidePage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Find Gold Nuggets: A Repeatable Field Plan",
    description: metadata.description,
    author: {
      "@type": "Person",
      name: "Kevin Hoagland",
    },
    publisher: {
      "@type": "Organization",
      name: "Gold Trails",
    },
    mainEntityOfPage: "https://goldtrails.com/guides/how-to-find-gold-nuggets",
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.24em] text-primary">Field Guide</p>
        <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          How to Find Gold Nuggets: A Repeatable Field Plan
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Nuggets are found by process, not luck. Use this sequence to increase confidence and
          target recovery in real conditions.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">1) Start with Location Intelligence</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Prioritize proven claims, historical routes, and productive terrain.</p>
          <p>• Review recent reports and map likely concentration zones.</p>
          <p>• Pick one focused area and commit to covering it thoroughly.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">2) Hunt Systematically</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Keep the coil low and slow with 50% overlap.</p>
          <p>• Grid north-south, then east-west for missed orientation signals.</p>
          <p>• Dig iffy signals and log outcomes to train your ear faster.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">3) Optimize and Repeat</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Re-balance and adjust sensitivity as ground changes.</p>
          <p>• Expand grids around each good find before moving on.</p>
          <p>• Track settings + results so every hunt improves the next one.</p>
        </CardContent>
      </Card>

      <section className="rounded-2xl border border-secondary bg-white p-6 text-center shadow-sm sm:p-8">
        <h2 className="text-2xl font-semibold text-foreground">Next Steps</h2>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Use the complete masterclass to turn this process into muscle memory.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <TrackedLinkButton href="/masterclass" eventName="guide_cta_click" eventProps={{ guide: "nuggets", cta: "masterclass" }}>
            Get Free Masterclass
          </TrackedLinkButton>
          <TrackedLinkButton href="/events" variant="secondary" eventName="guide_cta_click" eventProps={{ guide: "nuggets", cta: "events" }}>
            Join a Live Event
          </TrackedLinkButton>
          <TrackedLinkButton href="/guides/ground-balancing-hot-ground" variant="secondary" eventName="guide_cta_click" eventProps={{ guide: "nuggets", cta: "next-guide" }}>
            Read Ground Balance Guide
          </TrackedLinkButton>
        </div>
      </section>
    </div>
  );
}
