import { getPosts } from "@/lib/ghost";
import { getDateParts } from "@/lib/dates";

export async function GET() {
  const baseUrl = "https://gentlefuture.co";

  let items = "";
  try {
    const posts = await getPosts(20);
    items = posts
      .map((post) => {
        const { year, month, day } = getDateParts(post.published_at);
        const url = `${baseUrl}/archive/${year}/${month}/${day}`;
        const pubDate = new Date(post.published_at).toUTCString();
        const description = escapeXml(post.excerpt || "");
        const title = escapeXml(post.title);
        const categories = (post.tags || [])
          .map((t) => `<category>${escapeXml(t.name)}</category>`)
          .join("\n        ");

        return `    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
      ${categories}
    </item>`;
      })
      .join("\n");
  } catch {
    // Ghost not connected — empty feed
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Gentle Future</title>
    <link>${baseUrl}</link>
    <description>Covering the shift from maximum functionality to maximum well-being in design and technology.</description>
    <language>en-us</language>
    <managingEditor>mark@deckdoctors.xyz (Mark)</managingEditor>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/icon.png</url>
      <title>Gentle Future</title>
      <link>${baseUrl}</link>
    </image>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
