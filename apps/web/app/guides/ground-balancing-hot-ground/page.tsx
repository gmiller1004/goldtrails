import type { Metadata } from "next";
import { TrackedLinkButton } from "@/components/analytics/tracked-link-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "How to Ground Balance in Hot Ground | Gold Trails",
  description:
    "Learn how to ground balance in mineralized soil, reduce detector chatter, and improve target confidence in the field.",
};

export default function GroundBalancingGuidePage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Ground Balancing in Hot Ground: The Practical Method",
    description: metadata.description,
    author: {
      "@type": "Person",
      name: "Kevin Hoagland",
    },
    publisher: {
      "@type": "Organization",
      name: "Gold Trails",
    },
    mainEntityOfPage: "https://goldtrails.com/guides/ground-balancing-hot-ground",
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
          Ground Balancing in Hot Ground: The Practical Method
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Hot mineralized soil can make a detector sound unstable. The key is a repeatable setup
          routine you run every time ground conditions change.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Fast Setup Sequence</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>1) Factory reset your machine to a known baseline.</p>
          <p>2) Set threshold to a faint steady hum.</p>
          <p>3) Pump coil over clear ground and ground balance until stable.</p>
          <p>4) Raise sensitivity to the edge of stability, then back off one click.</p>
          <p>5) Re-check balance whenever soil color/mineralization shifts.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Common Mistakes to Avoid</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Swinging too fast and mistaking noise for targets.</p>
          <p>• Running sensitivity too high in unstable soil.</p>
          <p>• Not re-balancing when moving to a new patch.</p>
          <p>• Lifting the coil off the ground and losing depth.</p>
        </CardContent>
      </Card>

      <section className="rounded-2xl border border-secondary bg-white p-6 text-center shadow-sm sm:p-8">
        <h2 className="text-2xl font-semibold text-foreground">Next Steps</h2>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Get the full masterclass, shop detector gear, and apply these settings at your next
          event.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <TrackedLinkButton href="/masterclass" eventName="guide_cta_click" eventProps={{ guide: "ground-balance", cta: "masterclass" }}>
            Get Free Masterclass
          </TrackedLinkButton>
          <TrackedLinkButton href="/shop" variant="secondary" eventName="guide_cta_click" eventProps={{ guide: "ground-balance", cta: "shop" }}>
            Shop Gear
          </TrackedLinkButton>
          <TrackedLinkButton href="/guides/how-to-find-gold-nuggets" variant="secondary" eventName="guide_cta_click" eventProps={{ guide: "ground-balance", cta: "next-guide" }}>
            Read Nugget Guide
          </TrackedLinkButton>
        </div>
      </section>
    </div>
  );
}
