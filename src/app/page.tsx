import { GFPost } from "@/lib/ghost";
import { getPosts, getLatestPost } from "@/lib/ghost";
import { ArticleCard } from "@/components/ArticleCard";
import { WeeklyCarousel } from "@/components/WeeklyCarousel";
import Link from "next/link";

// Fallback content for when Ghost isn't connected yet
const PLACEHOLDER_POST = {
  id: "placeholder",
  slug: "welcome",
  title: "The Best Technology Disappears",
  headline: "The Best Technology Disappears",
  excerpt:
    "An open-source watch that strips away everything a smartwatch 'should' do and optimizes for one thing: telling time without ever needing to charge. The philosophy of subtraction as a design move.",
  html: "",
  feature_image: null,
  feature_image_alt: null,
  published_at: new Date().toISOString(),
  reading_time: 3,
  tags: [{ name: "calm tech", slug: "calm-tech" }],
  plaintext: "",
};

export default async function HomePage() {
  let latestPost: GFPost | null = null;
  let recentPosts: GFPost[] = [];

  try {
    latestPost = await getLatestPost();
    const allPosts = await getPosts(10);
    recentPosts = allPosts.slice(1);
  } catch {
    // Ghost not connected yet — show placeholder
    latestPost = null;
    recentPosts = [];
  }

  return (
    <div className="pt-14">
      {/* Hero section — full-width, atmospheric */}
      <section className="relative min-h-[70vh] flex flex-col justify-center items-center px-6 py-24">
        {/* Subtle radial gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gf-black via-gf-dark to-gf-black pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Bold title — Spacecadet energy */}
          <h1 className="font-mono text-[clamp(2rem,6vw,4.5rem)] font-bold tracking-[0.15em] uppercase text-gf-white leading-none mb-6">
            Gentle Future
          </h1>

          {/* Thesis line */}
          <p className="text-sm md:text-base text-gf-muted max-w-lg mx-auto leading-relaxed tracking-wide">
            Covering the shift from maximum functionality
            <br className="hidden sm:block" />
            to maximum well-being.
          </p>

          {/* Divider accent */}
          <div className="w-12 h-px bg-gf-accent/40 mx-auto mt-8" />
        </div>

        {/* Latest post — hero card below the title */}
        <div className="relative z-10 mt-12 w-full max-w-2xl mx-auto">
          {latestPost ? (
            <ArticleCard post={latestPost} featured />
          ) : (
            <div className="animate-fade-in">
              <div className="aspect-[16/9] bg-gf-surface rounded-sm mb-6 flex items-center justify-center border border-gf-border/30">
                <p className="text-gf-muted font-mono text-sm tracking-wider">
                  Coming Soon
                </p>
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gf-white mb-3 leading-tight">
                {PLACEHOLDER_POST.title}
              </h2>
              <p className="text-gf-text leading-relaxed mb-4">
                {PLACEHOLDER_POST.excerpt}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Weekly carousel — the 7-image Spacecadet-style spread */}
      {recentPosts.length > 0 && (
        <section className="py-16 border-t border-gf-border/30">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-gf-muted">
                This Week
              </h2>
              <Link
                href="/archive"
                className="text-xs text-gf-muted hover:text-gf-accent transition-colors tracking-wide"
              >
                Full Archive →
              </Link>
            </div>
            <WeeklyCarousel posts={recentPosts.slice(0, 7)} />
          </div>
        </section>
      )}

      {/* Recent articles — clean list */}
      {recentPosts.length > 0 && (
        <section className="py-12 border-t border-gf-border/30">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-gf-muted mb-8">
              Recent
            </h2>
            <div>
              {recentPosts.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Subscribe CTA — wider, more presence */}
      <section className="py-20 border-t border-gf-border/30">
        <div className="max-w-lg mx-auto px-6 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gf-muted mb-4">
            Weekly
          </p>
          <p className="text-lg text-gf-text mb-6 leading-relaxed">
            Objects, makers, and the shift toward well-being.
            <br />
            One email. Every Monday.
          </p>
          <Link
            href="/subscribe"
            className="inline-block px-8 py-3 bg-gf-accent text-gf-black text-sm font-medium tracking-wide rounded-sm hover:opacity-90 transition-opacity"
          >
            Subscribe
          </Link>
        </div>
      </section>
    </div>
  );
}
