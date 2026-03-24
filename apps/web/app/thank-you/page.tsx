import type { Metadata } from "next";
import { TrackedDownloadButton } from "@/components/analytics/tracked-download-button";
import { TrackedLinkButton } from "@/components/analytics/tracked-link-button";
import { GpaaMembershipPitch } from "@/components/gpaa-membership-pitch";
import { LeadForm } from "@/components/lead-form";
import { ThankYouUpsell } from "@/components/shop/thank-you-upsell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDetectors } from "@/lib/shopify";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Thank you",
    description:
      "Your Gold Trails masterclass download is on the way. Check your email or download the PDF here.",
    path: "/thank-you",
  }),
  robots: { index: false, follow: false },
};

export default async function ThankYouPage() {
  const products = await getDetectors();
  const beginnerPicks = products.slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
      <section className="rounded-2xl border border-secondary bg-white p-6 text-center shadow-sm sm:p-10">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-primary">
          Gold Trails Masterclass
        </p>
        <h1 className="text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          Your Masterclass is on the way! Check your inbox (and spam)
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          We&apos;ve sent your free PDF and next-step resources. If it does not arrive in a
          few minutes, check promotions and spam folders.
        </p>
        <div className="mt-6 flex justify-center">
          <TrackedDownloadButton
            href="/masterclass.pdf"
            eventName="pdf_download_click"
            eventProps={{ source: "thank-you-hero" }}
            className="w-full max-w-sm text-base sm:w-auto"
          >
            Download Masterclass PDF
          </TrackedDownloadButton>
        </div>
      </section>

      <GpaaMembershipPitch />

      <section className="grid gap-5 rounded-2xl bg-muted/30 p-4 sm:p-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">
              Ready to hunt with Kevin? See Upcoming Gold Trails Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TrackedLinkButton
              href="/events"
              className="w-full"
              eventName="thank_you_cta_click"
              eventProps={{ cta: "events" }}
            >
              View Upcoming Events
            </TrackedLinkButton>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Upgrade your gear</CardTitle>
          </CardHeader>
          <CardContent>
            <TrackedLinkButton
              href="/shop"
              className="w-full"
              eventName="thank_you_cta_click"
              eventProps={{ cta: "shop" }}
            >
              Shop Recommended Gear
            </TrackedLinkButton>
          </CardContent>
        </Card>
      </section>

      <ThankYouUpsell products={beginnerPicks} />

      <section className="rounded-2xl border border-secondary bg-white p-5 shadow-sm sm:p-6">
        <div className="mx-auto mb-5 max-w-3xl text-center">
          <h2 className="text-2xl font-semibold text-foreground">Share with a friend</h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Know someone who&apos;s getting started in metal detecting? Send them the free
            masterclass too.
          </p>
        </div>
        <div className="mx-auto max-w-xl">
          <LeadForm />
        </div>
      </section>
    </div>
  );
}
