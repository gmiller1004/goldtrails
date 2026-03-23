"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { getAttribution } from "@/lib/attribution";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const leadFormSchema = z.object({
  name: z.string().trim().optional(),
  email: z.string().email("Please enter a valid email address."),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

type LeadFormProps = {
  className?: string;
};

export function LeadForm({ className }: LeadFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    trackEvent("lead_form_view");
  }, []);

  const onSubmit = async (values: LeadFormValues) => {
    const attribution = getAttribution();
    setIsSubmitting(true);
    trackEvent("lead_form_submit", {
      has_name: Boolean(values.name?.trim()),
    });
    try {
      const response = await fetch("/api/subscribe", {
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

      if (!response.ok) {
        throw new Error("Subscription failed.");
      }

      trackEvent("lead_form_success", {
        has_name: Boolean(values.name?.trim()),
      });
      toast.success("Success! Your Masterclass PDF is on its way. Check your inbox (and spam).", {
        className: "border border-primary/40 bg-white text-foreground",
      });
      router.push("/thank-you");
    } catch {
      trackEvent("lead_form_failure");
      toast.error("Could not subscribe right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("rounded-lg border border-secondary bg-white p-6 shadow-md", className)}>
      <p className="mb-1 text-xs uppercase tracking-[0.2em] text-primary">
        Free Masterclass Access
      </p>
      <h2 className="mb-5 text-xl font-semibold text-foreground">
        Get Kevin&apos;s Metal Detecting Masterclass
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Name (optional)
          </label>
          <Input
            id="name"
            placeholder="Your name"
            autoComplete="name"
            className="focus-visible:border-primary"
            {...register("name")}
          />
          {errors.name ? (
            <p className="text-xs text-primary">{errors.name.message}</p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className="focus-visible:border-primary"
            {...register("email")}
          />
          {errors.email ? (
            <p className="text-xs text-primary">{errors.email.message}</p>
          ) : null}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full py-3 text-base">
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <svg
                className="h-4 w-4 animate-spin text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <circle className="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-100"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Claiming your spot...
            </span>
          ) : (
            "Download Free Masterclass"
          )}
        </Button>
      </form>
    </div>
  );
}
