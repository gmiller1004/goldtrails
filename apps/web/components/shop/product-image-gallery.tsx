"use client";

import { useMemo, useState } from "react";

type ProductImageGalleryProps = {
  title: string;
  images: string[];
};

export function ProductImageGallery({ title, images }: ProductImageGalleryProps) {
  const deduped = useMemo(() => Array.from(new Set(images.filter(Boolean))), [images]);
  const [activeImage, setActiveImage] = useState(deduped[0] ?? null);

  if (!activeImage) {
    return (
      <div className="flex h-72 items-center justify-center rounded-xl border border-secondary/70 bg-white text-muted-foreground shadow-sm">
        No image available
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-xl border border-secondary/70 bg-white shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={activeImage} alt={title} className="h-full w-full object-cover" />
      </div>
      {deduped.length > 1 ? (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
          {deduped.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              className={`overflow-hidden rounded-md border bg-white ${
                image === activeImage ? "border-primary ring-1 ring-primary/30" : "border-secondary/70"
              }`}
              onClick={() => setActiveImage(image)}
              aria-label={`View image ${index + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt={`${title} image ${index + 1}`} className="h-16 w-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
