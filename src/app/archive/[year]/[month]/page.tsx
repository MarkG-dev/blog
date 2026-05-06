import { GFPost } from "@/lib/ghost";
import { getPostsByDate, getArchiveIndex } from "@/lib/ghost";
import { ArticleCard } from "@/components/ArticleCard";
import { TimelineSidebar } from "@/components/TimelineSidebar";
import { monthName } from "@/lib/dates";

interface PageProps {
  params: { year: string; month: string };
}

export default async function MonthPage({ params }: PageProps) {
  const { year, month } = params;
  let posts: GFPost[] = [];
  let index: Record<string, Record<string, string[]>> = {};

  try {
    posts = await getPostsByDate(year, month);
    index = await getArchiveIndex();
  } catch {
    posts = [];
    index = {};
  }

  return (
    <div className="pt-14 lg:pl-48">
      <TimelineSidebar index={index} currentYear={year} currentMonth={month} />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <header className="mb-12">
          <h1 className="font-mono text-xs uppercase tracking-[0.3em] text-gf-muted mb-2">
            Archive
          </h1>
          <p className="text-2xl font-mono text-gf-accent">
            {monthName(month)} {year}
          </p>
        </header>

        {posts.length > 0 ? (
          <div>
            {posts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gf-muted font-mono text-sm">
            No entries for {monthName(month)} {year}.
          </p>
        )}
      </div>
    </div>
  );
}
