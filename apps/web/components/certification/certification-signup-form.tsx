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

const certificationSignupSchema = z.object({
  name: z.string().trim().optional(),
  email: z.string().email("Please enter a valid email address."),
});

type CertificationSignupValues = z.infer<typeof certificationSignupSchema>;

type CertificationSignupFormProps = {
  className?: string;
};

export function CertificationSignupForm({ className }: CertificationSignupFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CertificationSignupValues>({
    resolver: zodResolver(certificationSignupSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    trackEvent("certification_signup_form_view");
  }, []);

  const onSubmit = async (values: CertificationSignupValues) => {
    const attribution = getAttribution();
    setIsSubmitting(true);
    trackEvent("certification_signup_submit", {
      has_name: Boolean(values.name?.trim()),
    });

    try {
      const response = await fetch("/api/subscribe/certification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name?.trim() || "",
          email: values.email,
          attribution,
        }),
      });

      const data = (await response.json()) as {
        success?: boolean;
        error?: string;
        message?: string;
      };

      if (!response.ok || !data.success) {
        throw new Error(data.error ?? "Enrollment failed.");
      }

      trackEvent("certification_signup_success", {
        has_name: Boolean(values.name?.trim()),
      });
      setIsEnrolled(true);
      reset();
      toast.success(
        data.message ??
          "You're enrolled — check your inbox for lesson 1. We'll email your quiz links as you go.",
        {
          className: "border border-primary/40 bg-white text-foreground",
        },
      );
    } catch {
      trackEvent("certification_signup_failure");
      toast.error("Could not enroll right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEnrolled) {
    return (
      <div className={cn("rounded-xl border border-[#d0d5c4] bg-white p-5 text-center", className)}>
        <p className="font-serif text-xl font-semibold text-[#1a140f]">You&apos;re enrolled</p>
        <p className="mt-2 text-sm leading-relaxed text-[#5c4f3f]">
          Check your inbox for lesson 1. Quiz links will arrive in later emails — keep an eye out
          for Weeks 1–4 and the final exam.
        </p>
      </div>
    );
  }

  return (
    <form className={cn("space-y-4", className)} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="space-y-1.5">
        <label htmlFor="certification-name" className="text-sm font-medium text-[#1a140f]">
          Name (optional)
        </label>
        <Input
          id="certification-name"
          placeholder="Your name"
          autoComplete="name"
          className="border-[#e0d4b3] bg-white focus-visible:border-[#5a6348]"
          {...register("name")}
        />
        {errors.name ? <p className="text-xs text-[#b38c14]">{errors.name.message}</p> : null}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="certification-email" className="text-sm font-medium text-[#1a140f]">
          Email
        </label>
        <Input
          id="certification-email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          className="border-[#e0d4b3] bg-white focus-visible:border-[#5a6348]"
          {...register("email")}
        />
        {errors.email ? <p className="text-xs text-[#b38c14]">{errors.email.message}</p> : null}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className={cn(nhGoldButtonClass, "w-full py-3 text-base")}
      >
        {isSubmitting ? "Enrolling…" : "Start free certification"}
      </Button>
    </form>
  );
}
