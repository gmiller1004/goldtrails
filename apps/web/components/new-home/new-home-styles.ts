/** Shared palette + button styles for the homepage (matches site `primary` gold). */
export const nh = {
  cream: "#f7f2e8",
  ink: "#1a140f",
  muted: "#5c4f3f",
  border: "#e0d4b3",
  olive: "#5a6348",
  oliveLight: "#6d7760",
  oliveMuted: "#eef0e8",
  oliveDark: "#3d4535",
  charcoal: "#1f1810",
} as const;

/** Primary CTA — same gold + white text as event/shop buttons (`bg-primary`). */
export const nhGoldButtonClass =
  "inline-flex items-center justify-center rounded-lg bg-primary font-semibold !text-primary-foreground no-underline shadow-sm transition-colors hover:bg-primary/90 hover:!text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
