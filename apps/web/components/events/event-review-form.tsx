"use client";

import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ImagePlus, Star, X } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { trackEvent } from "@/lib/analytics";
import {
  MAX_REVIEW_PHOTOS,
  OTHER_EVENT_KEY,
  PHOTO_CONSENT_TEXT,
  REVIEW_PUBLISH_NOTICE,
  type ReviewableEvent,
} from "@/lib/events/review-events";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { nhGoldButtonClass } from "@/components/new-home/new-home-styles";
import { cn } from "@/lib/utils";

const schema = z
  .object({
    name: z.string().trim().min(1, "Please enter your name.").max(120),
    email: z.string().trim().email("Please enter a valid email address.").max(254),
    eventKey: z.string().min(1, "Please choose the event you attended."),
    eventOther: z.string().trim().max(160).optional(),
    rating: z.coerce.number().int().min(1).max(5),
    title: z.string().trim().max(120).optional(),
    body: z.string().trim().min(20, "Please write at least a few sentences (20+ characters).").max(4000),
    website: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.eventKey === OTHER_EVENT_KEY && (data.eventOther?.trim().length ?? 0) < 3) {
      ctx.addIssue({ code: "custom", message: "Please tell us which event you attended.", path: ["eventOther"] });
    }
  });

type FormValues = z.infer<typeof schema>;

type ReviewPhoto = { id: string; file: File; previewUrl: string };

const MAX_EDGE_PX = 1600;
const TARGET_MAX_BYTES = 1.4 * 1024 * 1024;

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("unsupported"));
    };
    image.src = url;
  });
}

function canvasToJpeg(image: HTMLImageElement, maxEdge: number, quality: number): Promise<Blob | null> {
  const scale = Math.min(1, maxEdge / Math.max(image.naturalWidth, image.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
}

/** Resizes and re-encodes as JPEG so uploads stay small and HEIC from iPhones becomes web-safe. */
async function preparePhoto(file: File): Promise<File> {
  const image = await loadImage(file);
  let blob = await canvasToJpeg(image, MAX_EDGE_PX, 0.82);
  if (blob && blob.size > TARGET_MAX_BYTES) {
    blob = await canvasToJpeg(image, 1280, 0.72);
  }
  if (!blob) throw new Error("unsupported");
  const baseName = file.name.replace(/\.[^.]+$/, "") || "photo";
  return new File([blob], `${baseName}.jpg`, { type: "image/jpeg" });
}

type EventReviewFormProps = {
  events: ReviewableEvent[];
  defaultEventKey?: string;
  photosEnabled: boolean;
  className?: string;
};

export function EventReviewForm({ events, defaultEventKey, photosEnabled, className }: EventReviewFormProps) {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [starHover, setStarHover] = useState<number | null>(null);
  const [photos, setPhotos] = useState<ReviewPhoto[]>([]);
  const [processingPhotos, setProcessingPhotos] = useState(false);
  const [photoConsent, setPhotoConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photosRef = useRef<ReviewPhoto[]>([]);
  photosRef.current = photos;

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      eventKey: defaultEventKey ?? "",
      eventOther: "",
      rating: 5,
      title: "",
      body: "",
      website: "",
    },
  });

  const eventKey = watch("eventKey");

  useEffect(() => () => photosRef.current.forEach((photo) => URL.revokeObjectURL(photo.previewUrl)), []);

  const addPhotos = async (fileList: FileList | null) => {
    if (!fileList?.length) return;
    const room = MAX_REVIEW_PHOTOS - photos.length;
    const selected = Array.from(fileList).slice(0, room);
    if (fileList.length > room) {
      toast.error(`You can attach up to ${MAX_REVIEW_PHOTOS} photos.`);
    }
    setProcessingPhotos(true);
    const prepared: ReviewPhoto[] = [];
    let failed = 0;
    for (const file of selected) {
      try {
        const ready = await preparePhoto(file);
        prepared.push({ id: crypto.randomUUID(), file: ready, previewUrl: URL.createObjectURL(ready) });
      } catch {
        failed += 1;
      }
    }
    setProcessingPhotos(false);
    if (failed) {
      toast.error(
        failed === 1
          ? "One photo couldn't be read. Please try a JPG or PNG."
          : `${failed} photos couldn't be read. Please try JPG or PNG files.`,
      );
    }
    if (prepared.length) {
      setPhotos((current) => [...current, ...prepared]);
      trackEvent("event_review_photos_added", { count: prepared.length });
    }
  };

  const removePhoto = (id: string) => {
    setPhotos((current) => {
      const target = current.find((photo) => photo.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return current.filter((photo) => photo.id !== id);
    });
  };

  const onSubmit = async (values: FormValues) => {
    if (photos.length && !photoConsent) {
      setConsentError(true);
      return;
    }
    setSubmitting(true);
    trackEvent("event_review_submit", { rating: values.rating, event: values.eventKey, photos: photos.length });

    const body = new FormData();
    body.set("name", values.name);
    body.set("email", values.email);
    body.set("eventKey", values.eventKey);
    if (values.eventOther) body.set("eventOther", values.eventOther);
    body.set("rating", String(values.rating));
    if (values.title) body.set("title", values.title);
    body.set("body", values.body);
    body.set("website", values.website ?? "");
    body.set("photoConsent", photos.length && photoConsent ? "true" : "false");
    for (const photo of photos) body.append("photos", photo.file);

    try {
      const res = await fetch("/api/event-reviews", { method: "POST", body });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Could not submit your review.");

      trackEvent("event_review_success", { rating: values.rating, event: values.eventKey, photos: photos.length });
      toast.success("Thank you! Your review was submitted for approval.", {
        className: "border border-primary/40 bg-white text-foreground",
      });
      setDone(true);
    } catch (error) {
      trackEvent("event_review_failure");
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className={cn("rounded-2xl border border-[#d0d5c4] bg-white p-6 text-center shadow-sm sm:p-8", className)}>
        <p className="font-serif text-xl font-semibold text-[#1a140f]">Thanks for sharing your experience</p>
        <p className="mt-2 text-sm leading-relaxed text-[#5c4f3f]">
          Your review was sent to the Gold Trails team. Once it&apos;s approved, it may appear on the Gold Trails
          events pages. You can close this page.
        </p>
      </div>
    );
  }

  const labelClass = "text-sm font-medium text-[#1a140f]";
  const fieldClass = "border-[#e0d4b3] bg-[#f7f2e8]/50 focus-visible:border-[#5a6348]";
  const errorClass = "text-xs text-[#b38c14]";

  return (
    <form
      className={cn("space-y-5 rounded-2xl border border-[#d0d5c4] bg-white p-6 shadow-sm sm:p-8", className)}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="event-review-name" className={labelClass}>
            Your name
          </label>
          <Input id="event-review-name" autoComplete="name" className={fieldClass} {...register("name")} />
          {errors.name ? <p className={errorClass}>{errors.name.message}</p> : null}
        </div>
        <div className="space-y-1.5">
          <label htmlFor="event-review-email" className={labelClass}>
            Email <span className="font-normal text-[#6d7760]">(not shown publicly)</span>
          </label>
          <Input
            id="event-review-email"
            type="email"
            autoComplete="email"
            className={fieldClass}
            {...register("email")}
          />
          {errors.email ? <p className={errorClass}>{errors.email.message}</p> : null}
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="event-review-event" className={labelClass}>
          Which event did you attend?
        </label>
        <select
          id="event-review-event"
          className={cn("h-10 w-full rounded-md border px-3 text-sm text-[#1a140f]", fieldClass)}
          {...register("eventKey")}
        >
          <option value="" disabled>
            Choose your session
          </option>
          {events.map((event) => (
            <option key={event.key} value={event.key}>
              {event.label}
            </option>
          ))}
        </select>
        {errors.eventKey ? <p className={errorClass}>{errors.eventKey.message}</p> : null}
      </div>

      {eventKey === OTHER_EVENT_KEY ? (
        <div className="space-y-1.5">
          <label htmlFor="event-review-event-other" className={labelClass}>
            Event name and date
          </label>
          <Input
            id="event-review-event-other"
            placeholder="e.g. Claim meetup, May 2026"
            className={fieldClass}
            {...register("eventOther")}
          />
          {errors.eventOther ? <p className={errorClass}>{errors.eventOther.message}</p> : null}
        </div>
      ) : null}

      <div className="space-y-2">
        <span id="event-review-rating-label" className={labelClass}>
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
                aria-labelledby="event-review-rating-label"
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
                      className="rounded-md p-1 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
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
                          active ? "fill-amber-400 text-amber-500 drop-shadow-sm" : "fill-transparent text-[#c4b59a]",
                        )}
                        strokeWidth={active ? 0 : 1.35}
                        aria-hidden
                      />
                    </button>
                  );
                })}
                <span className="ml-2 text-sm tabular-nums text-[#6d7760]">{field.value} / 5</span>
              </div>
            );
          }}
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="event-review-title" className={labelClass}>
          Headline <span className="font-normal text-[#6d7760]">(optional)</span>
        </label>
        <Input
          id="event-review-title"
          placeholder="e.g. Found my first nugget!"
          className={fieldClass}
          {...register("title")}
        />
        {errors.title ? <p className={errorClass}>{errors.title.message}</p> : null}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="event-review-body" className={labelClass}>
          Your review
        </label>
        <Textarea
          id="event-review-body"
          rows={6}
          placeholder="What did you learn? What was the highlight of your time in the field with Kevin? Would you recommend it to another prospector?"
          className={cn("resize-y", fieldClass)}
          {...register("body")}
        />
        {errors.body ? <p className={errorClass}>{errors.body.message}</p> : null}
      </div>

      {photosEnabled ? (
        <div className="space-y-3">
          <div>
            <p className={labelClass}>
              Photos <span className="font-normal text-[#6d7760]">(optional, up to {MAX_REVIEW_PHOTOS})</span>
            </p>
            <p className="mt-0.5 text-xs text-[#6d7760]">Finds, field time, camp life — show other prospectors what it was like.</p>
          </div>

          {photos.length ? (
            <ul className="grid grid-cols-3 gap-3 sm:grid-cols-5">
              {photos.map((photo) => (
                <li key={photo.id} className="relative overflow-hidden rounded-lg border border-[#e0d4b3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo.previewUrl} alt="" className="aspect-square w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removePhoto(photo.id)}
                    className="absolute right-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#1a140f]/75 text-white hover:bg-[#1a140f]"
                    aria-label="Remove photo"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}

          {photos.length < MAX_REVIEW_PHOTOS ? (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={(event) => {
                  void addPhotos(event.target.files);
                  event.target.value = "";
                }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={processingPhotos}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[#c4b59a] bg-[#f7f2e8]/60 px-4 py-4 text-sm font-semibold text-[#5a6348] hover:bg-[#efe4cf] disabled:opacity-60"
              >
                <ImagePlus className="h-4 w-4" aria-hidden />
                {processingPhotos ? "Preparing photos…" : photos.length ? "Add more photos" : "Add photos"}
              </button>
            </>
          ) : null}

          {photos.length ? (
            <div className="rounded-lg border border-[#e0d4b3] bg-[#f7f2e8]/70 p-3">
              <label className="flex items-start gap-3 text-xs leading-relaxed text-[#5c4f3f]">
                <input
                  type="checkbox"
                  checked={photoConsent}
                  onChange={(event) => {
                    setPhotoConsent(event.target.checked);
                    if (event.target.checked) setConsentError(false);
                  }}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#5a6348]"
                />
                <span>{PHOTO_CONSENT_TEXT}</span>
              </label>
              {consentError ? (
                <p className={cn(errorClass, "mt-2")}>Please check the box to include your photos, or remove them.</p>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="hidden" aria-hidden="true">
        <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <Button
        type="submit"
        disabled={submitting || processingPhotos}
        className={cn(nhGoldButtonClass, "w-full py-3 text-base")}
      >
        {submitting ? (photos.length ? "Uploading photos…" : "Submitting…") : "Submit review"}
      </Button>
      <p className="text-center text-xs leading-relaxed text-[#6d7760]">{REVIEW_PUBLISH_NOTICE}</p>
    </form>
  );
}
