import Link from "next/link";
import { getDateParts, formatDate } from "@/lib/dates";
import { GFPost } from "@/lib/ghost";

interface ArticleCardProps {
  post: GFPost;
  featured?: boolean;
}

export function ArticleCard({ post, featured = false }: ArticleCardProps) {
  const { year, month, day } = getDateParts(post.published_at);
  const href = `/archive/${year}/${month}/${day}`;

  if (featured) {
    return (
      <article className="animate-fade-in">
        {post.feature_image && (
          <Link href={href} className="block mb-6">
            <img
              src={post.feature_image}
              alt={post.feature_image_alt || post.title}
              className="w-full aspect-[16/9] object-cover rounded-sm"
            />
          </Link>
        )}
        <time className="block text-xs font-mono text-gf-muted mb-2">
          {formatDate(post.published_at)}
        </time>
        <Link href={href}>
          <h2 className="text-2xl md:text-3xl font-semibold text-gf-white mb-3 hover:text-gf-accent transition-colors leading-tight">
            {post.title}
          </h2>
        </Link>
        <p className="text-gf-text leading-relaxed mb-4">{post.excerpt}</p>
        <Link
          href={href}
          className="text-sm text-gf-accent hover:text-gf-white transition-colors"
        >
          Read more →
        </Link>
      </article>
    );
  }

  return (
    <article className="flex gap-4 py-4 border-b border-gf-border animate-fade-in">
      {post.feature_image && (
        <Link href={href} className="flex-shrink-0">
          <img
            src={post.feature_image}
            alt={post.feature_image_alt || post.title}
            className="w-24 h-24 md:w-32 md:h-20 object-cover rounded-sm"
          />
        </Link>
      )}
      <div className="min-w-0">
        <time className="block text-[10px] font-mono text-gf-muted mb-1">
          {formatDate(post.published_at)}
        </time>
        <Link href={href}>
          <h3 className="text-base font-medium text-gf-white hover:text-gf-accent transition-colors leading-snug mb-1">
            {post.title}
          </h3>
        </Link>
        <p className="text-sm text-gf-muted line-clamp-2">{post.excerpt}</p>
      </div>
    </article>
  );
}
