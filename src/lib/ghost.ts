/**
 * Ghost Content API client for Gentle Future
 * 
 * Set these env vars:
 *   GHOST_URL=https://your-ghost-instance.com
 *   GHOST_CONTENT_API_KEY=your-content-api-key
 */

export interface GFPost {
  id: string;
  slug: string;
  title: string;
  headline: string;      // custom: extracted from title or custom field
  excerpt: string;
  html: string;
  feature_image: string | null;
  feature_image_alt: string | null;
  published_at: string;
  reading_time: number;
  tags: { name: string; slug: string }[];
  source_url?: string;   // custom field: original source attribution
  source_name?: string;  // custom field: source publication name
  plaintext: string;     // for audio player
}

export interface GFPostMeta {
  slug: string;
  title: string;
  feature_image: string | null;
  published_at: string;
  excerpt: string;
}

const GHOST_URL = process.env.GHOST_URL || 'http://localhost:2368';
const GHOST_KEY = process.env.GHOST_CONTENT_API_KEY || '';

async function ghostFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`/ghost/api/content/${endpoint}/`, GHOST_URL);
  url.searchParams.set('key', GHOST_KEY);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  
  const res = await fetch(url.toString(), { next: { revalidate: 300 } }); // 5min cache
  if (!res.ok) throw new Error(`Ghost API error: ${res.status}`);
  return res.json();
}

export async function getPosts(limit = 50): Promise<GFPost[]> {
  const data = await ghostFetch<{ posts: GFPost[] }>('posts', {
    limit: String(limit),
    include: 'tags',
    // Don't use 'fields' with 'include' — Ghost ignores include when fields is set
  });
  return data.posts;
}

export async function getPostBySlug(slug: string): Promise<GFPost | null> {
  try {
    const data = await ghostFetch<{ posts: GFPost[] }>(`posts/slug/${slug}`, {
      include: 'tags',
    });
    return data.posts[0] || null;
  } catch {
    return null;
  }
}

export async function getPostsByDate(year: string, month: string, day?: string): Promise<GFPost[]> {
  const startDate = day 
    ? `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}` 
    : `${year}-${month.padStart(2, '0')}-01`;
  const endDate = day
    ? `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T23:59:59`
    : getLastDayOfMonth(year, month);
  
  const data = await ghostFetch<{ posts: GFPost[] }>('posts', {
    limit: 'all',
    include: 'tags',
    filter: `published_at:>='${startDate}'+published_at:<='${endDate}'`,
    order: 'published_at desc',
  });
  return data.posts;
}

export async function getArchiveIndex(): Promise<Record<string, Record<string, string[]>>> {
  const posts = await getPosts(500);
  const index: Record<string, Record<string, string[]>> = {};
  
  for (const post of posts) {
    const date = new Date(post.published_at);
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    if (!index[year]) index[year] = {};
    if (!index[year][month]) index[year][month] = [];
    if (!index[year][month].includes(day)) {
      index[year][month].push(day);
    }
  }
  
  // Sort days
  Object.values(index).forEach(months => {
    Object.keys(months).forEach(m => {
      months[m].sort((a, b) => Number(b) - Number(a));
    });
  });
  
  return index;
}

export async function getLatestPost(): Promise<GFPost | null> {
  const data = await ghostFetch<{ posts: GFPost[] }>('posts', {
    limit: '1',
    include: 'tags',
    order: 'published_at desc',
  });
  return data.posts[0] || null;
}

function getLastDayOfMonth(year: string, month: string): string {
  const d = new Date(Number(year), Number(month), 0);
  return `${year}-${month.padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}T23:59:59`;
}
