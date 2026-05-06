"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import { monthShort } from "@/lib/dates";

interface ScrubberEntry {
  year: string;
  month: string;
  day: string;
  label: string;
}

interface MobileScrubberProps {
  entries: ScrubberEntry[];
  currentDay?: string;
}

export function MobileScrubber({ entries, currentDay }: MobileScrubberProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const triggerHaptic = useCallback(() => {
    if (navigator.vibrate) {
      navigator.vibrate(5); // Light haptic tap
    }
  }, []);

  if (entries.length === 0) return null;

  return (
    <div className="lg:hidden fixed bottom-14 left-0 right-0 z-40 bg-gf-dark/95 backdrop-blur-sm border-t border-gf-border">
      <div
        ref={scrollRef}
        className="scrubber-track flex overflow-x-auto gap-0 px-4 py-2 no-scrollbar"
        onScroll={triggerHaptic}
      >
        {entries.map((entry) => {
          const key = `${entry.year}-${entry.month}-${entry.day}`;
          const isActive = currentDay === key;
          return (
            <Link
              key={key}
              href={`/archive/${entry.year}/${entry.month}/${entry.day}`}
              className={`scrubber-item flex-shrink-0 px-3 py-1.5 text-center transition-colors ${
                isActive
                  ? "text-gf-accent"
                  : "text-gf-muted"
              }`}
              onClick={triggerHaptic}
            >
              <span className="block text-[10px] font-mono uppercase">
                {monthShort(entry.month)}
              </span>
              <span className={`block text-sm font-mono ${isActive ? "font-bold" : ""}`}>
                {entry.day}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
