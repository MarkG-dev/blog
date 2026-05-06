"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { GFPost } from "@/lib/ghost";
import { getDateParts, monthShort } from "@/lib/dates";

interface HorizontalTimelineProps {
  posts: GFPost[];
}

/**
 * Horizontal timeline — inspired by the Spacecadet timeline layout.
 * Posts float as images along a horizontal time axis.
 * Years marked along the bottom. Click an image to read.
 */
export function HorizontalTimeline({ posts }: HorizontalTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (posts.length === 0) return null;

  // Group posts by year for axis labels
  const years = Array.from(new Set(posts.map((p) => new Date(p.published_at).getFullYear()))).sort();

  return (
    <div className="relative w-full">
      {/* Scrollable timeline */}
      <div
        ref={scrollRef}
        className="overflow-x-auto no-scrollbar"
        style={{ cursor: "grab" }}
      >
        <div
          className="relative flex items-end gap-0"
          style={{
            width: `${Math.max(posts.length * 200, 1200)}px`,
            height: "500px",
            paddingBottom: "60px",
          }}
        >
          {/* Vertical grid lines for years */}
          {years.map((year, i) => {
            const firstPostIdx = posts.findIndex(
              (p) => new Date(p.published_at).getFullYear() === year
            );
            const x = firstPostIdx * 200;
            return (
              <div
                key={year}
                className="absolute top-0 bottom-0"
                style={{ left: `${x}px` }}
              >
                <div className="h-full w-px bg-gf-border/30" />
                <span className="absolute bottom-2 left-2 text-xs font-mono text-gf-muted">
                  {year}
                </span>
              </div>
            );
          })}

          {/* Floating post images */}
          {posts.map((post, index) => {
            const { year, month, day } = getDateParts(post.published_at);
            const href = `/archive/${year}/${month}/${day}`;
            const isHovered = hoveredId === post.id;

            // Stagger vertical positions for visual interest
            const yOffsets = [120, 60, 180, 40, 150, 90, 200, 70, 160, 100];
            const yOffset = yOffsets[index % yOffsets.length];
            const sizes = [180, 140, 160, 120, 170, 130, 150, 140, 160, 120];
            const size = sizes[index % sizes.length];

            return (
              <Link
                key={post.id}
                href={href}
                className="absolute group"
                style={{
                  left: `${index * 200 + 20}px`,
                  top: `${yOffset}px`,
                  width: `${size}px`,
                  height: `${size}px`,
                }}
                onMouseEnter={() => setHoveredId(post.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div
                  className={`w-full h-full rounded-sm overflow-hidden border transition-all duration-300 ${
                    isHovered
                      ? "border-gf-accent shadow-lg shadow-gf-accent/10 scale-110"
                      : "border-gf-border/20"
                  }`}
                >
                  {post.feature_image ? (
                    <img
                      src={post.feature_image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gf-surface flex items-center justify-center">
                      <span className="text-gf-muted font-mono text-[10px]">
                        {monthShort(month)} {day}
                      </span>
                    </div>
                  )}
                </div>

                {/* Hover tooltip */}
                {isHovered && (
                  <div className="absolute -bottom-16 left-0 w-48 z-50 animate-fade-in">
                    <p className="text-[10px] font-mono text-gf-accent">
                      {monthShort(month)} {Number(day)}, {year}
                    </p>
                    <p className="text-xs text-gf-white leading-tight mt-0.5">
                      {post.title}
                    </p>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom axis line */}
      <div className="absolute bottom-[58px] left-0 right-0 h-px bg-gf-border/50" />
    </div>
  );
}
