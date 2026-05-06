import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscribe",
  description:
    "Get a weekly digest of objects, makers, and the shift toward well-being. One email, every Monday.",
};

export default function SubscribePage() {
  return (
    <div className="pt-14">
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <h1 className="font-mono text-xs uppercase tracking-[0.3em] text-gf-muted mb-8">
          Subscribe
        </h1>

        <p className="text-xl text-gf-white leading-relaxed mb-2">
          One email. Every Monday.
        </p>
        <p className="text-sm text-gf-muted mb-10 max-w-sm mx-auto">
          The week&apos;s most interesting objects, makers, and signals from the
          shift toward well-being. Headline, image, short read. Listen on the
          go.
        </p>

        {/* 
          Ghost Members integration:
          When Ghost is connected, replace this form with Ghost's 
          native signup. For now, this is a placeholder that can 
          POST to Ghost's Members API.
        */}
        <form
          action="#"
          method="POST"
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            className="flex-1 px-4 py-3 bg-gf-surface border border-gf-border rounded-sm text-gf-text text-sm placeholder:text-gf-muted focus:outline-none focus:border-gf-accent transition-colors"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gf-accent text-gf-black text-sm font-medium rounded-sm hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>

        <p className="text-xs text-gf-muted mt-6">
          No spam. Unsubscribe anytime. We don&apos;t track opens.
        </p>

        {/* What you get */}
        <div className="mt-16 text-left max-w-sm mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gf-muted mb-4">
            What You Get
          </p>
          <div className="space-y-4 text-sm text-gf-muted">
            <div className="flex gap-3">
              <span className="text-gf-accent font-mono text-xs mt-0.5">01</span>
              <p>
                One headline story with a hero image — the most interesting
                thing we found this week.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-gf-accent font-mono text-xs mt-0.5">02</span>
              <p>
                Four to five short picks — objects, projects, events, and
                signals from the edges.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-gf-accent font-mono text-xs mt-0.5">03</span>
              <p>
                Every article lives on the site with full source attribution.
                Listen like a playlist on the go.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
