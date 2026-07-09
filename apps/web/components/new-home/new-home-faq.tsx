"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type FaqItem = {
  question: string;
  answer: string;
};

export function NewHomeFaq({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[#e0d4b3] rounded-2xl border border-[#e0d4b3] bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="text-base font-semibold text-[#1a140f]">{item.question}</span>
              <ChevronDown
                className={cn("h-5 w-5 shrink-0 text-[#5a6348] transition-transform", isOpen && "rotate-180")}
              />
            </button>
            {isOpen ? (
              <div className="px-5 pb-4 text-sm leading-relaxed text-[#5c4f3f]">{item.answer}</div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
