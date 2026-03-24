import type { Metadata } from "next";
import { TrackedLinkButton } from "@/components/analytics/tracked-link-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { absoluteUrl, pageMetadata } from "@/lib/site";

const guideDescription =
  "Learn how beginners should choose a metal detector by ground type, budget, and goals from Gold Trails with Kevin Hoagland.";

export const metadata: Metadata = pageMetadata({
  title: "Best Metal Detector for Beginners",
  description: guideDescription,
  path: "/guides/best-metal-detector-for-beginners",
});

export default function BeginnersDetectorGuidePage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Metal Detector for Beginners (And How To Choose Right)",
    description: guideDescription,
    author: {
      "@type": "Person",
      name: "Kevin Hoagland",
    },
    publisher: {
      "@type": "Organization",
      name: "Gold Trails",
    },
    mainEntityOfPage: absoluteUrl("/guides/best-metal-detector-for-beginners"),
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.24em] text-primary">Beginner Guide</p>
        <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          Best Metal Detector for Beginners (And How To Choose Right)
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          The best beginner detector is not the most expensive one - it is the one that
          matches your ground, target type, and learning style.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">1) Match Your Detector To Terrain</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Hot mineralized ground: prioritize stable ground balancing and coil control.</p>
          <p>• Parks and relic sites: choose balanced settings for mixed targets.</p>
          <p>• Beaches: consider modes that handle wet sand conditions consistently.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">2) Start With Fundamentals, Not Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Learn threshold, sensitivity, and ground balance before chasing accessories.</p>
          <p>• Use a simple repeatable field setup process every time you hunt.</p>
          <p>• Keep your coil low and slow - this alone improves finds dramatically.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">3) Build A Smart Starter Kit</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Detector + one practical coil + recovery tools is enough to begin.</p>
          <p>• Add upgrades only after your fundamentals are stable in real ground.</p>
          <p>• Prioritize reliability and consistency over hype features.</p>
        </CardContent>
      </Card>

      <section className="rounded-2xl border border-secondary bg-white p-6 text-center shadow-sm sm:p-8">
        <h2 className="text-2xl font-semibold text-foreground">Next Steps</h2>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Get Kevin&apos;s free masterclass, explore beginner-friendly gear, and join an
          upcoming field event.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <TrackedLinkButton href="/masterclass" eventName="guide_cta_click" eventProps={{ guide: "beginners", cta: "masterclass" }}>
            Download Free Masterclass
          </TrackedLinkButton>
          <TrackedLinkButton href="/shop" variant="secondary" eventName="guide_cta_click" eventProps={{ guide: "beginners", cta: "shop" }}>
            Shop Starter Gear
          </TrackedLinkButton>
          <TrackedLinkButton href="/events" variant="secondary" eventName="guide_cta_click" eventProps={{ guide: "beginners", cta: "events" }}>
            See Events
          </TrackedLinkButton>
        </div>
      </section>
    </div>
  );
}
