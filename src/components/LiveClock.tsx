"use client";

import { useState, useEffect } from "react";

/**
 * LiveClock — Spacecadet-inspired real-time stamp.
 * Shows: day of week, date, time ticking in monospace.
 * "Tuesday, May 5 — 22:14:07"
 */
export function LiveClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) {
    return (
      <div className="font-mono text-[11px] tracking-wide text-gf-muted h-4" />
    );
  }

  const dayName = time.toLocaleDateString("en-US", { weekday: "long" });
  const monthName = time.toLocaleDateString("en-US", { month: "long" });
  const dayNum = time.getDate();
  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const seconds = String(time.getSeconds()).padStart(2, "0");

  return (
    <div className="font-mono text-[11px] tracking-wide text-gf-muted">
      <span className="text-gf-text/40">
        {dayName}, {monthName} {dayNum}
      </span>
      <span className="mx-2 text-gf-border">—</span>
      <span className="tabular-nums text-gf-accent/60">
        {hours}:{minutes}:{seconds}
      </span>
    </div>
  );
}
