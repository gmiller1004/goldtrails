"use client";

type PixelEventProps = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function isPixelEnabled() {
  return process.env.NODE_ENV === "production" && Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID);
}

export function trackMetaPageView() {
  if (typeof window === "undefined" || !isPixelEnabled() || typeof window.fbq !== "function") return;
  window.fbq("track", "PageView");
}

export function trackMetaEvent(eventName: string, properties: PixelEventProps = {}) {
  if (typeof window === "undefined" || !isPixelEnabled() || typeof window.fbq !== "function") return;
  window.fbq("track", eventName, properties);
}
