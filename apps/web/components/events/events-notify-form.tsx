"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { getAttribution } from "@/lib/attribution";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { nhGoldButtonClass } from "@/components/new-home/new-home-styles";

const eventsNotifySchema = z.object({
  name: z.string().trim().optional(),
  email: z.string().email("Please enter a valid email address."),
});

type EventsNotifyValues = z.infer<typeof eventsNotifySchema>;

type EventsNotifyFormProps = {
  className?: string;
};

export function EventsNotifyForm({ className }: EventsNotifyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventsNotifyValues>({
    resolver: zodResolver(eventsNotifySchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    trackEvent("events_notify_form_view");
  }, []);

  const onSubmit = async (values: EventsNotifyValues) => {
    const attribution = getAttribution();
    setIsSubmitting(true);
    trackEvent("events_notify_form_submit", {
      has_name: Boolean(values.name?.trim()),
    });

    try {
      const response = await fetch("/api/subscribe/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name?.trim() || "",
          email: values.email,
          attribution,
        }),
      });

      const data = (await response.json()) as { success?: boolean; error?: string; message?: string };

      if (!response.ok || !data.success) {
        throw new Error(data.error ?? "Subscription failed.");
      }

      trackEvent("events_notify_form_success", {
        has_name: Boolean(values.name?.trim()),
      });
      setIsSubscribed(true);
      reset();
      toast.success(
        data.message ??
          "You're on the list — we'll email you when new Gold Trails sessions are announced.",
        {
          className: "border border-primary/40 bg-white text-foreground",
        },
      );
    } catch {
      trackEvent("events_notify_form_failure");
      toast.error("Could not subscribe right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-[#d0d5c4] bg-white p-6 text-center shadow-sm sm:p-8",
          className,
        )}
      >
        <p className="font-serif text-xl font-semibold text-[#1a140f]">You&apos;re on the list</p>
        <p className="mt-2 text-sm leading-relaxed text-[#5c4f3f]">
          We&apos;ll email you when Kevin announces new Gold Trails training sessions at Italian Bar.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-[#d0d5c4] bg-white p-6 shadow-sm sm:p-8",
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">Stay in the loop</p>
      <h2 className="mt-2 font-serif text-2xl font-semibold text-[#1a140f] sm:text-3xl">
        Get notified about future Gold Trails training events
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-[#5c4f3f] sm:text-base">
        New Italian Bar sessions sell out fast. Join the list for early notice when dates open — no
        spam, just field training updates.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="events-notify-name" className="text-sm font-medium text-[#1a140f]">
              Name (optional)
            </label>
            <Input
              id="events-notify-name"
              placeholder="Your name"
              autoComplete="name"
              className="border-[#e0d4b3] bg-[#f7f2e8]/50 focus-visible:border-[#5a6348]"
              {...register("name")}
            />
            {errors.name ? <p className="text-xs text-[#b38c14]">{errors.name.message}</p> : null}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="events-notify-email" className="text-sm font-medium text-[#1a140f]">
              Email
            </label>
            <Input
              id="events-notify-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className="border-[#e0d4b3] bg-[#f7f2e8]/50 focus-visible:border-[#5a6348]"
              {...register("email")}
            />
            {errors.email ? <p className="text-xs text-[#b38c14]">{errors.email.message}</p> : null}
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className={cn(nhGoldButtonClass, "w-full py-3 text-base sm:w-auto sm:px-8")}
        >
          {isSubmitting ? "Joining the list…" : "Notify me about new sessions"}
        </Button>
      </form>
    </div>
  );
}
