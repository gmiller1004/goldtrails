import { MasterclassReviewsSlider } from "@/components/new-home/masterclass-reviews-slider";
import { nhGoldButtonClass } from "@/components/new-home/new-home-styles";
import { getApprovedMasterclassReviews } from "@/lib/masterclass-reviews";
import { cn } from "@/lib/utils";

export async function NewHomeReviews() {
  const reviews = await getApprovedMasterclassReviews();

  if (!reviews.length) {
    return null;
  }

  return (
    <section
      id="reviews"
      className="border-t border-[#e0d4b3]/60 bg-[#f7f2e8] py-12 sm:py-16"
      aria-labelledby="reviews-heading"
    >
      <div className="mx-auto mb-8 max-w-6xl px-4 text-center sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">Reader reviews</p>
        <h2 id="reviews-heading" className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">
          What detectorists say about the masterclass book
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-[#5c4f3f] sm:text-base">
          Real feedback from readers who downloaded Kevin&apos;s free field manual.
        </p>
      </div>
      <MasterclassReviewsSlider reviews={reviews} />
      <div className="mt-10 flex justify-center px-4 sm:px-6">
        <a href="#masterclass" className={cn(nhGoldButtonClass, "px-8 py-3 text-base")}>
          Download the free book
        </a>
      </div>
    </section>
  );
}
