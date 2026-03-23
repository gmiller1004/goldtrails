"use client";

import { motion } from "framer-motion";

const rippleDelays = [0, 1.4, 2.8];

export function HeroRippleBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(212,160,23,0.16),transparent_38%),radial-gradient(circle_at_80%_30%,rgba(212,160,23,0.12),transparent_42%),linear-gradient(180deg,#1a140f_0%,#100c09_100%)]"
    >
      {rippleDelays.map((delay) => (
        <motion.div
          key={delay}
          className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d4a017]/25"
          animate={{ scale: [0.65, 1.15], opacity: [0.38, 0] }}
          transition={{ duration: 5.5, repeat: Number.POSITIVE_INFINITY, delay, ease: "easeOut" }}
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,20,15,0.25)_0%,rgba(26,20,15,0.8)_100%)]" />
    </div>
  );
}
