"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { getAttribution } from "@/lib/attribution";
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

export function WaitlistForm({
  topic,
  topicLabel,
  className,
  compact = false,
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
      const response = await fetch("/api/subscribe/webinar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          topic,
          topicLabel,
          attribution: getAttribution(),
        }),
      });
      const data = (await response.json()) as {
        success?: boolean;
        error?: string;
        message?: string;
      };

      if (!response.ok || !data.success) {
        throw new Error(data.error ?? "Could not join the waitlist.");
      }

      trackEvent("webinar_waitlist_success", { topic, topic_label: topicLabel });
      toast.success(
        data.message ?? `You're on the waitlist for ${topicLabel}. We'll email you when seats open.`,
        { className: "border border-primary/40 bg-white text-foreground" },
      );
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
