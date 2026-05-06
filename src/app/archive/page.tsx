import { GFPost } from "@/lib/ghost";
import { getPosts, getArchiveIndex } from "@/lib/ghost";
import { ArticleCard } from "@/components/ArticleCard";
import { TimelineSidebar } from "@/components/TimelineSidebar";
import { MobileScrubber } from "@/components/MobileScrubber";

export const metadata = {
  title: "Archive",
  description:
    "Browse the Gentle Future archive — a timeline of the shift from maximum functionality to maximum well-being.",
};

export default async function ArchivePage() {
  let posts: GFPost[] = [];
  let index: Record<string, Record<string, string[]>> = {};
  let scrubberEntries: { year: string; month: string; day: string; label: string }[] = [];

  try {
    posts = await getPosts(50);
    index = await getArchiveIndex();
    scrubberEntries = posts.map((p) => {
      const d = new Date(p.published_at);
      return {
        year: String(d.getFullYear()),
        month: String(d.getMonth() + 1).padStart(2, "0"),
        day: String(d.getDate()).padStart(2, "0"),
        label: p.title,
      };
    });
  } catch {
    posts = [];
    index = {};
    scrubberEntries = [];
  }

  return (
    <div className="pt-14 lg:pl-48">
      <TimelineSidebar index={index} />
      <MobileScrubber entries={scrubberEntries} />

      <div className="max-w-2xl mx-auto px-4 py-12">
        <header className="mb-12">
          <h1 className="font-mono text-xs uppercase tracking-[0.3em] text-gf-muted mb-4">
            Archive
          </h1>
          <p className="text-sm text-gf-muted leading-relaxed max-w-md">
            Every signal, every object, every shift — organized by time.
          </p>
        </header>

        {posts.length > 0 ? (
          <div>
            {posts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gf-muted font-mono text-sm">
              The archive begins when the first article publishes.
            </p>
            <p className="text-gf-muted text-xs mt-2">
              Connect Ghost to start populating the timeline.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
