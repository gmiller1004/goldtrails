"use client";

import { ATTRIBUTION_STORAGE_KEY, type AttributionData } from "@/lib/attribution";
import { trackMetaEvent } from "@/lib/meta-pixel";

type EventProperties = Record<string, string | number | boolean | null | undefined>;

function parseCurrencyValue(value: unknown) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parts = value.trim().split(/\s+/);
    const maybeAmount = parts.length > 1 ? parts[1] : parts[0];
    const parsed = Number(maybeAmount);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: string, properties: EventProperties = {}) {
  if (typeof window === "undefined") return;

  let attribution: AttributionData | null = null;
  try {
    const raw = localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (raw) {
      attribution = JSON.parse(raw) as AttributionData;
    }
  } catch {
    attribution = null;
  }

  const payload = {
    event,
    ...properties,
    ...(attribution ?? {}),
    page_path: window.location.pathname,
    ts: Date.now(),
  };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);

  if (typeof window.gtag === "function") {
    window.gtag("event", event, properties);
  }

  if (event === "lead_form_success") {
    trackMetaEvent("Lead", {
      content_name: "masterclass_signup",
    });
  }

  if (event === "contact_form_success") {
    trackMetaEvent("Contact");
  }

  if (event === "add_to_cart") {
    trackMetaEvent("AddToCart", {
      content_type: "product",
      content_ids: String(properties.product_id ?? ""),
      content_name: String(properties.product_title ?? ""),
      currency: String(properties.currency ?? "USD"),
      value: parseCurrencyValue(properties.value),
    });
  }

}
