import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gf-border/30 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-gf-accent mb-3">
              Gentle Future
            </p>
            <p className="text-xs text-gf-muted leading-relaxed max-w-xs">
              Covering the shift from maximum functionality to maximum
              well-being in design and technology.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-gf-muted mb-3">
              Navigate
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-xs text-gf-muted hover:text-gf-text transition-colors"
              >
                Today
              </Link>
              <Link
                href="/archive"
                className="text-xs text-gf-muted hover:text-gf-text transition-colors"
              >
                Archive
              </Link>
              <Link
                href="/glossary"
                className="text-xs text-gf-muted hover:text-gf-text transition-colors"
              >
                Glossary
              </Link>
              <Link
                href="/about"
                className="text-xs text-gf-muted hover:text-gf-text transition-colors"
              >
                About
              </Link>
              <Link
                href="/feed.xml"
                className="text-xs text-gf-muted hover:text-gf-text transition-colors"
              >
                RSS Feed
              </Link>
            </div>
          </div>

          {/* Studio */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-gf-muted mb-3">
              Studio
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="https://homesick.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gf-muted hover:text-gf-text transition-colors"
              >
                HomeSick
              </a>
              <Link
                href="/subscribe"
                className="text-xs text-gf-muted hover:text-gf-text transition-colors"
              >
                Subscribe
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-gf-border/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-gf-muted font-mono">
            Published by HomeSick — Physical objects optimized for well-being
          </p>
          <p className="text-[10px] text-gf-muted font-mono">
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
