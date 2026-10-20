import type { Metadata } from "next";
import { EventReviewForm } from "@/components/events/event-review-form";
import { getReviewableEvent, reviewableEvents } from "@/lib/events/review-events";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Review Your Gold Trails Event",
    description:
      "Share your experience at a Gold Trails field event with Kevin Hoagland. This page is not linked in the main navigation.",
    path: "/review/events",
  }),
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ approved?: string; error?: string; event?: string }>;
};

function Banner({ type, children }: { type: "success" | "error"; children: React.ReactNode }) {
  return (
    <div
      className={
        type === "success"
          ? "rounded-lg border border-primary/35 bg-primary/10 px-4 py-3 text-sm text-[#1a140f]"
          : "rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-[#1a140f]"
      }
      role="status"
    >
      {children}
    </div>
  );
}

export default async function EventReviewPage({ searchParams }: Props) {
  const sp = await searchParams;
  const approved = sp.approved === "1";
  const error = sp.error;
  const defaultEventKey = getReviewableEvent(sp.event)?.key;
  const photosEnabled = Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());

  return (
    <div className="bg-[#f7f2e8] text-[#1a140f]">
      <div className="mx-auto w-full max-w-2xl space-y-6 px-4 py-10 sm:px-6 sm:py-14">
        <header className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">Gold Trails events</p>
          <h1 className="font-serif text-3xl font-semibold sm:text-4xl">How was your time in the field?</h1>
          <p className="text-sm leading-relaxed text-[#5c4f3f] sm:text-base">
            Thanks for training with Kevin. Your honest review — and a few photos if you have them — helps other
            prospectors decide which event is right for them. Submissions are reviewed before publishing.
          </p>
        </header>

        {approved ? (
          <Banner type="success">
            <strong>Review approved.</strong> Thank you — this event review is now public-ready for use on Gold
            Trails.
          </Banner>
        ) : null}
        {error === "invalid" ? (
          <Banner type="error">
            This approval link is invalid or was already used. If you need help, contact us through the main site.
          </Banner>
        ) : null}
        {error === "missing" ? <Banner type="error">Approval link is missing a token.</Banner> : null}
        {error === "server" ? (
          <Banner type="error">Something went wrong. Please try again in a moment.</Banner>
        ) : null}

        {approved ? null : (
          <EventReviewForm
            events={reviewableEvents}
            defaultEventKey={defaultEventKey}
            photosEnabled={photosEnabled}
          />
        )}
      </div>
    </div>
  );
}
