"use client";

import { useState } from "react";
import Link from "next/link";
import { monthShort } from "@/lib/dates";

interface TimelineIndex {
  [year: string]: {
    [month: string]: string[];
  };
}

interface TimelineSidebarProps {
  index: TimelineIndex;
  currentYear?: string;
  currentMonth?: string;
  currentDay?: string;
}

export function TimelineSidebar({
  index,
  currentYear,
  currentMonth,
  currentDay,
}: TimelineSidebarProps) {
  const years = Object.keys(index).sort((a, b) => Number(b) - Number(a));
  const [expandedYear, setExpandedYear] = useState<string | null>(
    currentYear || years[0] || null
  );
  const [expandedMonth, setExpandedMonth] = useState<string | null>(
    currentMonth || null
  );

  return (
    <aside className="hidden lg:block fixed left-0 top-14 bottom-0 w-48 border-r border-gf-border bg-gf-black timeline-sidebar overflow-y-auto">
      <div className="p-4 pt-6">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gf-muted mb-4">
          Archive
        </p>

        {years.map((year) => (
          <div key={year} className="mb-1">
            {/* Year */}
            <button
              onClick={() =>
                setExpandedYear(expandedYear === year ? null : year)
              }
              className={`w-full text-left py-1.5 px-2 rounded text-sm font-mono transition-colors ${
                expandedYear === year
                  ? "text-gf-white bg-gf-surface"
                  : "text-gf-muted hover:text-gf-text"
              }`}
            >
              {year}
            </button>

            {/* Months */}
            {expandedYear === year && (
              <div className="ml-3 mt-1">
                {Object.keys(index[year])
                  .sort((a, b) => Number(b) - Number(a))
                  .map((month) => (
                    <div key={month}>
                      <button
                        onClick={() =>
                          setExpandedMonth(
                            expandedMonth === month ? null : month
                          )
                        }
                        className={`w-full text-left py-1 px-2 rounded text-xs font-mono transition-colors ${
                          expandedMonth === month &&
                          currentYear === year
                            ? "text-gf-accent"
                            : "text-gf-muted hover:text-gf-text"
                        }`}
                      >
                        {monthShort(month)}
                      </button>

                      {/* Days */}
                      {expandedMonth === month && (
                        <div className="ml-3 mt-0.5 mb-1">
                          {index[year][month].map((day) => {
                            const isActive =
                              currentYear === year &&
                              currentMonth === month &&
                              currentDay === day;
                            return (
                              <Link
                                key={day}
                                href={`/archive/${year}/${month}/${day}`}
                                className={`block py-0.5 px-2 rounded text-xs font-mono transition-colors ${
                                  isActive
                                    ? "text-gf-accent bg-gf-surface"
                                    : "text-gf-muted hover:text-gf-text"
                                }`}
                              >
                                {day}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
