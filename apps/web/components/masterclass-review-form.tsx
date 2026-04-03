"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const schema = z
  .object({
    name: z.string().trim().min(1, "Please enter your name.").max(120),
    email: z.string().trim().max(254).optional(),
    rating: z.coerce.number().int().min(1).max(5),
    body: z.string().trim().min(20, "Please write at least a few sentences (20+ characters).").max(4000),
    website: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const e = data.email?.trim();
    if (e && !z.string().email().safeParse(e).success) {
      ctx.addIssue({ code: "custom", message: "Please enter a valid email.", path: ["email"] });
    }
  });

type FormValues = z.infer<typeof schema>;

type MasterclassReviewFormProps = {
  className?: string;
};

export function MasterclassReviewForm({ className }: MasterclassReviewFormProps) {
  const [done, setDone] = useState(false);
  const [starHover, setStarHover] = useState<number | null>(null);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      rating: 5,
      body: "",
      website: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    trackEvent("masterclass_review_submit", { rating: values.rating });
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email?.trim() || undefined,
          rating: values.rating,
          body: values.body,
          website: values.website,
        }),
      });
      const data = (await res.json()) as { error?: string; success?: boolean };

      if (!res.ok) {
        throw new Error(data.error ?? "Could not submit your review.");
      }

      trackEvent("masterclass_review_success", { rating: values.rating });
      toast.success("Thank you! Your review was submitted for approval.", {
        className: "border border-primary/40 bg-white text-foreground",
      });
      setDone(true);
    } catch (e) {
      trackEvent("masterclass_review_failure");
      toast.error(e instanceof Error ? e.message : "Something went wrong.");
    }
  };

  if (done) {
    return (
      <div className={cn("rounded-lg border border-secondary bg-white p-6 shadow-md", className)}>
        <p className="text-sm font-medium text-foreground">Thanks for your feedback.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          If your review is approved, it may appear on Gold Trails in the future. You can close this page.
        </p>
      </div>
    );
  }

  return (
    <form
      className={cn("space-y-4 rounded-lg border border-secondary bg-white p-6 shadow-md", className)}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="space-y-1.5">
        <label htmlFor="review-name" className="text-sm font-medium text-foreground">
          Your name
        </label>
        <Input id="review-name" autoComplete="name" {...register("name")} />
        {errors.name ? <p className="text-xs text-primary">{errors.name.message}</p> : null}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="review-email" className="text-sm font-medium text-foreground">
          Email <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <Input id="review-email" type="email" autoComplete="email" {...register("email")} />
        {errors.email ? <p className="text-xs text-primary">{errors.email.message}</p> : null}
      </div>

      <div className="space-y-2">
        <span id="review-rating-label" className="text-sm font-medium text-foreground">
          Rating
        </span>
        <Controller
          name="rating"
          control={control}
          render={({ field }) => {
            const shown = starHover ?? field.value;
            return (
              <div
                role="radiogroup"
                aria-labelledby="review-rating-label"
                className="flex flex-wrap items-center gap-0.5"
                onMouseLeave={() => setStarHover(null)}
              >
                {[1, 2, 3, 4, 5].map((n) => {
                  const active = n <= shown;
                  return (
                    <button
                      key={n}
                      type="button"
                      role="radio"
                      aria-checked={field.value === n}
                      aria-label={`${n} out of 5 stars`}
                      className={cn(
                        "rounded-md p-1 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                      )}
                      onMouseEnter={() => setStarHover(n)}
                      onFocus={() => setStarHover(n)}
                      onBlur={() => setStarHover(null)}
                      onClick={() => {
                        field.onChange(n);
                        setStarHover(null);
                      }}
                    >
                      <Star
                        className={cn(
                          "h-9 w-9 sm:h-10 sm:w-10",
                          active
                            ? "fill-amber-400 text-amber-500 drop-shadow-sm"
                            : "fill-transparent text-muted-foreground/45",
                        )}
                        strokeWidth={active ? 0 : 1.35}
                        aria-hidden
                      />
                    </button>
                  );
                })}
                <span className="ml-2 text-sm tabular-nums text-muted-foreground">
                  {field.value} / 5
                </span>
              </div>
            );
          }}
        />
        {errors.rating ? <p className="text-xs text-primary">{errors.rating.message}</p> : null}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="review-body" className="text-sm font-medium text-foreground">
          Your review
        </label>
        <Textarea
          id="review-body"
          rows={6}
          placeholder="What did you find most useful? How would you describe the book to another detectorist?"
          className="resize-y"
          {...register("body")}
        />
        {errors.body ? <p className="text-xs text-primary">{errors.body.message}</p> : null}
      </div>

      <div className="hidden" aria-hidden="true">
        <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <Button type="submit" className="w-full py-3 text-base">
        Submit review
      </Button>
    </form>
  );
}
