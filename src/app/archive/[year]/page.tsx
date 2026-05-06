import { getPostsByDate, getArchiveIndex } from "@/lib/ghost";
import { ArticleCard } from "@/components/ArticleCard";
import { TimelineSidebar } from "@/components/TimelineSidebar";
import { monthName } from "@/lib/dates";
import Link from "next/link";

interface PageProps {
  params: { year: string };
}

export default async function YearPage({ params }: PageProps) {
  const { year } = params;
  let index: Record<string, Record<string, string[]>> = {};

  try {
    index = await getArchiveIndex();
  } catch {
    index = {};
  }

  const months = index[year]
    ? Object.keys(index[year]).sort((a, b) => Number(b) - Number(a))
    : [];

  return (
    <div className="pt-14 lg:pl-48">
      <TimelineSidebar index={index} currentYear={year} />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <header className="mb-12">
          <h1 className="font-mono text-xs uppercase tracking-[0.3em] text-gf-muted mb-2">
            Archive
          </h1>
          <p className="text-2xl font-mono text-gf-accent">{year}</p>
        </header>

        {months.length > 0 ? (
          <div className="space-y-6">
            {months.map((month) => (
              <Link
                key={month}
                href={`/archive/${year}/${month}`}
                className="block p-4 border border-gf-border rounded-sm hover:border-gf-accent transition-colors"
              >
                <p className="text-lg text-gf-white">{monthName(month)}</p>
                <p className="text-xs text-gf-muted mt-1">
                  {index[year][month].length} entries
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gf-muted font-mono text-sm">
            No entries for {year}.
          </p>
        )}
      </div>
    </div>
  );
}
