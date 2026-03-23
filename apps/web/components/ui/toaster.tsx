"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      richColors
      toastOptions={{
        className: "border border-primary/40 bg-white text-foreground shadow-md",
      }}
    />
  );
}
