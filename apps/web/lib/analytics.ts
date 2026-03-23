"use client";

import { ATTRIBUTION_STORAGE_KEY, type AttributionData } from "@/lib/attribution";

type EventProperties = Record<string, string | number | boolean | null | undefined>;

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
}
