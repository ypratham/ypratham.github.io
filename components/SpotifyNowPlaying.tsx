"use client";

import { useEffect, useState } from "react";
import { Music } from "lucide-react";

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumArt?: string;
  songUrl?: string;
}

export default function SpotifyNowPlaying() {
  const [data, setData] = useState<SpotifyData | null>(null);

  useEffect(() => {
    async function fetchSpotify() {
      try {
        const res = await fetch("/api/spotify");
        const json = await res.json();
        if (json.title) setData(json);
      } catch {
        // silently fail
      }
    }

    fetchSpotify();
    const interval = setInterval(fetchSpotify, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!data?.title) return null;

  return (
    <a
      href={data.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-dashed border-border rounded-full text-xs text-muted-foreground hover:text-foreground transition-colors max-w-[200px] group"
      title={`${data.title} — ${data.artist}`}
    >
      {data.albumArt ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={data.albumArt}
          alt=""
          className="size-4 rounded-sm shrink-0"
        />
      ) : (
        <Music className="size-3.5 shrink-0" />
      )}

      {data.isPlaying && (
        <span className="flex gap-[2px] items-end h-3 shrink-0" aria-label="Now playing">
          <span className="w-[2px] bg-highlight rounded-full" style={{ animation: "equalizer 0.8s ease-in-out infinite alternate" }} />
          <span className="w-[2px] bg-highlight rounded-full" style={{ animation: "equalizer 0.6s ease-in-out infinite alternate 0.2s" }} />
          <span className="w-[2px] bg-highlight rounded-full" style={{ animation: "equalizer 0.7s ease-in-out infinite alternate 0.4s" }} />
        </span>
      )}

      <span className="truncate font-mono">
        {data.title}
      </span>
    </a>
  );
}
