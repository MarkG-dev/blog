"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { getDateParts, formatDateShort } from "@/lib/dates";
import { GFPost } from "@/lib/ghost";

interface WeeklyCarouselProps {
  posts: GFPost[];
}

/**
 * The 7-image weekly carousel — inspired by the Spacecadet portfolio layout.
 * Shows this week's articles as overlapping images at varying scales,
 * with the hero centered and larger. Click any image to read.
 */
export function WeeklyCarousel({ posts }: WeeklyCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(Math.floor(posts.length / 2));
  const containerRef = useRef<HTMLDivElement>(null);

  if (posts.length === 0) return null;

  // Scale factors: center is largest, edges are smallest
  const getScale = (index: number): number => {
    const distance = Math.abs(index - activeIndex);
    if (distance === 0) return 1;
    if (distance === 1) return 0.75;
    if (distance === 2) return 0.55;
    return 0.45;
  };

  const getZIndex = (index: number): number => {
    return posts.length - Math.abs(index - activeIndex);
  };

  const getOpacity = (index: number): number => {
    const distance = Math.abs(index - activeIndex);
    if (distance === 0) return 1;
    if (distance === 1) return 0.8;
    return 0.5;
  };

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Carousel track */}
      <div
        ref={containerRef}
        className="flex items-center justify-center gap-0 relative"
        style={{ height: "360px" }}
      >
        {posts.map((post, index) => {
          const scale = getScale(index);
          const zIndex = getZIndex(index);
          const opacity = getOpacity(index);
          const { year, month, day } = getDateParts(post.published_at);
          const href = `/archive/${year}/${month}/${day}`;
          const offset = (index - activeIndex) * 140;

          return (
            <button
              key={post.id}
              onClick={() => setActiveIndex(index)}
              className="absolute transition-all duration-500 ease-out cursor-pointer group"
              style={{
                transform: `translateX(${offset}px) scale(${scale})`,
                zIndex,
                opacity,
              }}
            >
              <div className="relative w-64 h-80 overflow-hidden rounded-sm">
                {post.feature_image ? (
                  <img
                    src={post.feature_image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gf-surface flex items-center justify-center">
                    <span className="text-gf-muted font-mono text-xs">
                      {formatDateShort(post.published_at)}
                    </span>
                  </div>
                )}

                {/* Overlay on active */}
                {index === activeIndex && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                    <p className="text-xs font-mono text-gf-accent mb-1">
                      {formatDateShort(post.published_at)}
                    </p>
                    <h3 className="text-sm font-medium text-gf-white leading-tight mb-2">
                      {post.title}
                    </h3>
                    <Link
                      href={href}
                      className="text-xs text-gf-accent hover:text-gf-white transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Read →
                    </Link>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-4">
        {posts.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              index === activeIndex ? "bg-gf-accent" : "bg-gf-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
