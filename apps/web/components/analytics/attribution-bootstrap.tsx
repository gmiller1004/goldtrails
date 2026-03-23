"use client";

import { useEffect } from "react";
import { captureAttributionFromLocation } from "@/lib/attribution";

export function AttributionBootstrap() {
  useEffect(() => {
    captureAttributionFromLocation();
  }, []);

  return null;
}
