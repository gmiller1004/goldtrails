"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().trim().max(120).optional(),
  email: z.string().trim().email("Please enter a valid email address."),
  subject: z.string().trim().max(200).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please enter a message (at least 10 characters).")
    .max(5000, "Message is too long."),
  company: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

type ContactFormProps = {
  className?: string;
};

export function ContactForm({ className }: ContactFormProps) {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      company: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    trackEvent("contact_form_submit");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
          company: values.company,
        }),
      });

      const data = (await response.json()) as { success?: boolean; error?: string; message?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Could not send your message.");
      }

      trackEvent("contact_form_success");
      toast.success(data.message ?? "Thanks! Your message has been sent.", {
        className: "border border-primary/40 bg-white text-foreground",
      });
      setSent(true);
    } catch {
      trackEvent("contact_form_failure");
      toast.error("Could not send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (sent) {
    return (
      <Card
        className={cn(
          "border-secondary bg-white shadow-sm",
          className,
        )}
      >
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-8 w-8 text-primary" aria-hidden />
          </div>
          <CardTitle className="font-serif text-2xl text-foreground">Message sent</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-center text-sm text-muted-foreground sm:text-base">
          <p>Thank you — your message has been sent. We&apos;ll get back to you as soon as we can.</p>
          <Button type="button" variant="secondary" className="mt-2" onClick={() => setSent(false)}>
            Send another message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn("rounded-lg border border-secondary bg-white p-6 shadow-md", className)}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-1.5">
          <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
            Name <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <Input
            id="contact-name"
            autoComplete="name"
            className="focus-visible:border-primary"
            {...register("name")}
          />
          {errors.name ? <p className="text-xs text-primary">{errors.name.message}</p> : null}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            className="focus-visible:border-primary"
            {...register("email")}
          />
          {errors.email ? <p className="text-xs text-primary">{errors.email.message}</p> : null}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="contact-subject" className="text-sm font-medium text-foreground">
            Subject <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <Input
            id="contact-subject"
            placeholder="Events, orders, media…"
            className="focus-visible:border-primary"
            {...register("subject")}
          />
          {errors.subject ? <p className="text-xs text-primary">{errors.subject.message}</p> : null}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
            Message
          </label>
          <Textarea
            id="contact-message"
            placeholder="How can we help?"
            className="focus-visible:border-primary"
            {...register("message")}
          />
          {errors.message ? <p className="text-xs text-primary">{errors.message.message}</p> : null}
        </div>

        {/* Honeypot — hidden from users; bots often fill this field */}
        <div className="hidden" aria-hidden="true">
          <input type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full py-3 text-base">
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <svg
                className="h-4 w-4 animate-spin text-primary-foreground"
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
              Sending…
            </span>
          ) : (
            "Send message"
          )}
        </Button>
      </form>
    </div>
  );
}
