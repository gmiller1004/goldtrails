"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type WaitlistValues = z.infer<typeof waitlistSchema>;

type WaitlistFormProps = {
  topic: string;
  topicLabel: string;
  className?: string;
  compact?: boolean;
  onDark?: boolean;
};

/** Mock waitlist — Klaviyo profile fields / API wiring TBD. */
export function WaitlistForm({
  topic,
  topicLabel,
  className,
  compact = false,
  onDark = false,
}: WaitlistFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WaitlistValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: WaitlistValues) => {
    setIsSubmitting(true);
    trackEvent("webinar_waitlist_submit", { topic, topic_label: topicLabel });
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      trackEvent("webinar_waitlist_success", { topic, topic_label: topicLabel });
      toast.success(`You're on the waitlist for ${topicLabel}. We'll email you when seats open.`);
      reset();
    } catch {
      trackEvent("webinar_waitlist_failure", { topic });
      toast.error("Could not join the waitlist. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className={cn(compact ? "flex flex-col gap-2 sm:flex-row" : "space-y-3", className)}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className={cn(compact ? "min-w-0 flex-1" : "space-y-1.5")}>
        {!compact ? (
          <label htmlFor={`waitlist-${topic}`} className="text-sm font-medium text-[#1a140f]">
            Email
          </label>
        ) : null}
        <Input
          id={`waitlist-${topic}`}
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          className="border-[#e0d4b3] bg-white focus-visible:border-[#c8960c]"
          {...register("email")}
        />
        {errors.email ? <p className="text-xs text-[#b38c14]">{errors.email.message}</p> : null}
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className={cn("font-semibold", compact ? "shrink-0 sm:px-5" : "w-full")}
      >
        {isSubmitting ? "Joining…" : "Join the waitlist"}
      </Button>
    </form>
  );
}
