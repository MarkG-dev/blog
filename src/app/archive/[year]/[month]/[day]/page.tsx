import { GFPost } from "@/lib/ghost";
import { getPostsByDate, getArchiveIndex } from "@/lib/ghost";
import { TimelineSidebar } from "@/components/TimelineSidebar";
import { AudioPlayer } from "@/components/AudioPlayer";
import { articleSchema } from "@/lib/schema";
import { formatDate, dayOfWeek, monthName } from "@/lib/dates";
import Link from "next/link";
import type { Metadata } from "next";

interface PageProps {
  params: { year: string; month: string; day: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { year, month, day } = params;
  let posts: GFPost[] = [];
  try {
    posts = await getPostsByDate(year, month, day);
  } catch {
    posts = [];
  }

  const title = posts[0]?.title || `${monthName(month)} ${day}, ${year}`;
  const description =
    posts[0]?.excerpt ||
    `Gentle Future coverage for ${monthName(month)} ${day}, ${year}`;

  const ogImage = posts[0]?.feature_image
    ? posts[0].feature_image
    : `/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(description)}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} — Gentle Future`,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Gentle Future`,
      description,
      images: [ogImage],
    },
  };
}

export default async function DayPage({ params }: PageProps) {
  const { year, month, day } = params;

  let posts: GFPost[] = [];
  let index: Record<string, Record<string, string[]>> = {};
  try {
    posts = await getPostsByDate(year, month, day);
    index = await getArchiveIndex();
  } catch {
    posts = [];
    index = {};
  }

  // Build audio tracks from posts
  const tracks = posts.map((p) => ({
    title: p.title,
    text: p.plaintext || p.excerpt,
    slug: p.slug,
  }));

  // Navigate prev/next days
  const allDays = Object.entries(index)
    .flatMap(([y, months]) =>
      Object.entries(months).flatMap(([m, days]) =>
        days.map((d) => ({ year: y, month: m, day: d }))
      )
    )
    .sort((a, b) => {
      const da = `${a.year}-${a.month}-${a.day}`;
      const db = `${b.year}-${b.month}-${b.day}`;
      return da.localeCompare(db);
    });

  const currentIdx = allDays.findIndex(
    (d) => d.year === year && d.month === month && d.day === day
  );
  const prevDay = currentIdx > 0 ? allDays[currentIdx - 1] : null;
  const nextDay =
    currentIdx < allDays.length - 1 ? allDays[currentIdx + 1] : null;

  const dateStr = `${year}-${month}-${day}`;

  return (
    <div className="pt-14 lg:pl-48">
      <TimelineSidebar
        index={index}
        currentYear={year}
        currentMonth={month}
        currentDay={day}
      />

      <div className="max-w-2xl mx-auto px-4 py-12 pb-32">
        {/* Date header */}
        <header className="mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gf-muted mb-1">
            {dayOfWeek(dateStr)}
          </p>
          <h1 className="text-lg font-mono text-gf-accent">
            {monthName(month)} {Number(day)}, {year}
          </h1>
        </header>

        {/* Articles for this day */}
        {posts.length > 0 ? (
          posts.map((post, i) => (
            <article key={post.id} className="mb-16 animate-fade-in">
              {/* Schema markup */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(articleSchema(post)),
                }}
              />

              {/* Hero image */}
              {post.feature_image && (
                <img
                  src={post.feature_image}
                  alt={post.feature_image_alt || post.title}
                  className="w-full aspect-[16/9] object-cover rounded-sm mb-6"
                />
              )}

              {/* Headline */}
              <h2 className="text-2xl md:text-3xl font-semibold text-gf-white mb-4 leading-tight">
                {post.title}
              </h2>

              {/* Reading time */}
              <div className="flex items-center gap-3 text-xs text-gf-muted mb-6">
                <span>{post.reading_time} min read</span>
                {post.tags?.length > 0 && (
                  <>
                    <span className="text-gf-border">·</span>
                    <span>{post.tags.map((t) => t.name).join(", ")}</span>
                  </>
                )}
              </div>

              {/* Article body */}
              <div
                className="article-body text-gf-text"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />

              {/* Source attribution */}
              {post.tags?.find((t) => t.slug === "source") && (
                <div className="mt-8 pt-4 border-t border-gf-border">
                  <p className="text-xs font-mono text-gf-muted uppercase tracking-wider">
                    Source
                  </p>
                </div>
              )}

              {i < posts.length - 1 && (
                <hr className="border-gf-border mt-16" />
              )}
            </article>
          ))
        ) : (
          <div className="text-center py-20">
            <p className="text-gf-muted font-mono text-sm">
              Nothing published this day.
            </p>
            <Link
              href="/archive"
              className="text-sm text-gf-accent hover:text-gf-white transition-colors mt-4 inline-block"
            >
              ← Back to archive
            </Link>
          </div>
        )}

        {/* Prev / Next navigation */}
        <nav className="flex justify-between items-center mt-16 pt-6 border-t border-gf-border">
          {prevDay ? (
            <Link
              href={`/archive/${prevDay.year}/${prevDay.month}/${prevDay.day}`}
              className="text-sm text-gf-muted hover:text-gf-accent transition-colors"
            >
              ← {monthName(prevDay.month)} {Number(prevDay.day)}
            </Link>
          ) : (
            <span />
          )}
          <Link
            href="/archive"
            className="text-xs font-mono text-gf-muted hover:text-gf-text transition-colors"
          >
            Archive
          </Link>
          {nextDay ? (
            <Link
              href={`/archive/${nextDay.year}/${nextDay.month}/${nextDay.day}`}
              className="text-sm text-gf-muted hover:text-gf-accent transition-colors"
            >
              {monthName(nextDay.month)} {Number(nextDay.day)} →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>

      {/* Audio player — listen through today's articles */}
      {tracks.length > 0 && <AudioPlayer tracks={tracks} />}
    </div>
  );
}
