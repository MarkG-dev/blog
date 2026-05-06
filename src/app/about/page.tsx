import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Gentle Future covers the shift from maximum functionality to maximum well-being. Here's why that matters.",
};

export default function AboutPage() {
  return (
    <div className="pt-14 lg:pl-48">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <header className="mb-12">
          <h1 className="font-mono text-xs uppercase tracking-[0.3em] text-gf-muted mb-6">
            About
          </h1>
        </header>

        <div className="article-body text-gf-text space-y-6">
          <p className="text-xl text-gf-white leading-relaxed">
            We struggled and struggled to make everything work. Then we made it
            beautiful. Then we perfected it until it was in every pocket, so
            polished and universal it became invisible — which is the worst thing
            a beautiful thing can become.
          </p>

          <p>
            That&apos;s the short version of design history. From craft to
            industry to digital to whatever Apple did, each era optimized for
            the same thing: maximum functionality. Make it work. Make it work
            for more people. Make it work for everyone.
          </p>

          <p>
            And it worked. Functionality is, for practical purposes, solved.
            Your phone can do everything. Your watch can do everything. Your
            refrigerator, apparently, can also do everything. The question
            that nobody seems to be asking is: does any of this make you
            feel better?
          </p>

          <p>
            This is what Gentle Future covers. The shift — happening right now,
            in workshops and studios and garages and design programs around the
            world — from optimizing for maximum functionality to optimizing for
            maximum well-being.
          </p>

          <h2>The Gap</h2>

          <p>
            Here&apos;s the thing about well-being that makes it fundamentally
            different from functionality: functionality can be universal, but
            well-being cannot. A calculator works the same way for everyone.
            A breathing stone doesn&apos;t. What calms you down might annoy me.
            What feels sacred to you might feel silly to me. Well-being is
            subjectively defined, which means optimizing for it requires
            particular solutions — objects designed for someone specific,
            not everyone universally.
          </p>

          <p>
            This is an opposing design strategy to everything that came before.
            And it&apos;s producing the most interesting objects, companies,
            and ideas we&apos;ve seen in a generation.
          </p>

          <h2>What We Cover</h2>

          <p>
            Makers building things that strip away features instead of adding
            them. Solar-powered watches that just tell time. Breathing devices
            carved from aluminum instead of molded in plastic. Open-source
            hardware that trades infinite customization for one thing done
            exactly right. Art installations that make invisible data tangible.
            Design graduates who think the most radical thing you can do with
            technology is make it disappear.
          </p>

          <p>
            We scan hundreds of sources daily — from Hackaday and r/ESP32 to
            RCA thesis shows and TikTok desk aesthetics — and surface the
            signals that matter. Once a week, we send you the best of what
            we found.
          </p>

          <h2>Who This Is For</h2>

          <p>
            People who make things. People who care about what things are made
            of. People who think the most interesting question in technology
            right now isn&apos;t &ldquo;what can it do?&rdquo; but &ldquo;how
            does it make you feel?&rdquo;
          </p>

          <p>
            Gentle Future is published by{" "}
            <a
              href="https://homesick.dev"
              className="text-gf-accent underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              HomeSick
            </a>
            , a studio that makes physical objects optimized for well-being.
            We make the objects. This is where we cover the movement.
          </p>
        </div>
      </div>
    </div>
  );
}
