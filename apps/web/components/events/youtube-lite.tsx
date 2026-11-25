"use client";

import { Play } from "lucide-react";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

type YouTubeLiteProps = {
  videoId: string;
  title: string;
  source: string;
};

/** Click-to-play YouTube embed: shows the video's thumbnail and loads the player only on click. */
export function YouTubeLite({ videoId, title, source }: YouTubeLiteProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#d0d5c4] bg-black shadow-lg">
      {playing ? (
        <iframe
          title={title}
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            setPlaying(true);
            trackEvent("venue_video_play", { video_id: videoId, source });
          }}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Play video: ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-[#1a140f]/40 via-transparent to-transparent" />
          <span className="absolute left-1/2 top-1/2 inline-flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#d4a017] text-white shadow-xl transition-transform group-hover:scale-110 sm:h-24 sm:w-24">
            <Play className="ml-1 h-9 w-9 fill-current sm:h-10 sm:w-10" aria-hidden />
          </span>
        </button>
      )}
    </div>
  );
}
