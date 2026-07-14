import type { Metadata } from "next";
import { MasterclassReviewForm } from "@/components/masterclass-review-form";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Review the Masterclass Book",
    description:
      "Share feedback on Kevin Hoagland's Metal Detecting Masterclass ebook. This page is not linked in the main navigation.",
    path: "/review/masterclass",
  }),
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ approved?: string; error?: string }>;
};

function Banner({ type, children }: { type: "success" | "error"; children: React.ReactNode }) {
  return (
    <div
      className={
        type === "success"
          ? "rounded-lg border border-primary/35 bg-primary/10 px-4 py-3 text-sm text-foreground"
          : "rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-foreground"
      }
      role="status"
    >
      {children}
    </div>
  );
}

export default async function MasterclassReviewPage({ searchParams }: Props) {
  const sp = await searchParams;
  const approved = sp.approved === "1";
  const error = sp.error;

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 px-4 py-10 sm:px-6 sm:py-14">
      <header className="space-y-2 text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-primary">Masterclass book</p>
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">Leave a review</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Thank you for reading the book. Your honest feedback helps others decide if the masterclass is
          right for them. Submissions are reviewed before publishing.
        </p>
      </header>

      {approved ? (
        <Banner type="success">
          <strong>Review approved.</strong> Thank you — this submission is now marked public-ready for
          use on Gold Trails.
        </Banner>
      ) : null}

      {error === "invalid" ? (
        <Banner type="error">
          This approval link is invalid or was already used. If you need help, contact us through the
          main site.
        </Banner>
      ) : null}

      {error === "missing" ? (
        <Banner type="error">Approval link is missing a token.</Banner>
      ) : null}

      {error === "server" ? (
        <Banner type="error">Something went wrong. Please try again in a moment.</Banner>
      ) : null}

      {approved ? null : <MasterclassReviewForm />}
    </div>
  );
}
