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
      toast.success("You're enrolled — check your inbox (and spam) for lesson 1.", {
        className: "border border-primary/40 bg-white text-foreground",
      });
    } catch {
      trackEvent("certification_signup_failure");
      toast.error("Could not enroll right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEnrolled) {
    return (
      <div className={cn("rounded-xl border border-[#d0d5c4] bg-white p-5 text-left", className)}>
        <p className="font-serif text-xl font-semibold text-[#1a140f] text-center">
          You&apos;re enrolled — here&apos;s what to expect
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#5c4f3f]">
          Your certification lessons are delivered by email. To make sure you don&apos;t miss a
          week, please:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#5c4f3f]">
          <li>
            Mark{" "}
            <a
              href="mailto:gpaastore@goldprospectors.org"
              className="font-semibold !text-[#5a6348] underline underline-offset-2"
            >
              gpaastore@goldprospectors.org
            </a>{" "}
            as a safe / trusted sender
          </li>
          <li>Check Junk and Spam if lesson 1 doesn&apos;t land in your inbox within a few minutes</li>
          <li>
            Keep an eye out for Weeks 1–4 quiz links and the final exam as you progress through the
            program
          </li>
        </ul>
        <p className="mt-3 text-sm leading-relaxed text-[#5c4f3f]">
          Missing those emails means missing quiz links — and your path to the certificate and hat.
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
