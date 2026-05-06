import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glossary — Key Concepts in Post-Functional Design",
  description:
    "A growing lexicon of the ideas shaping the shift from maximum functionality to maximum well-being. Calm technology, haptic design, material honesty, and more.",
};

const TERMS = [
  {
    slug: "calm-technology",
    term: "Calm Technology",
    short: "Technology designed to inform without demanding attention.",
  },
  {
    slug: "post-functional-design",
    term: "Post-Functional Design",
    short:
      "Design that optimizes for well-being rather than capability.",
  },
  {
    slug: "analog-revival",
    term: "The Analog Revival",
    short:
      "The $5B+ shift toward physical objects, dumb phones, and screen-free experiences.",
  },
  {
    slug: "object-turn",
    term: "The Object Turn",
    short:
      "The moment design stopped optimizing screens and started optimizing things.",
  },
  {
    slug: "digital-minimalism",
    term: "Digital Minimalism",
    short:
      "A philosophy focused on carefully selected digital activities that support what you value.",
  },
  {
    slug: "biomimetic-design",
    term: "Biomimetic Design",
    short:
      "Design that imitates nature to create objects resonating with evolved biological responses.",
  },
  {
    slug: "haptic-design",
    term: "Haptic Design",
    short:
      "Touch-based interactions — vibration patterns, textures, weight, and thermal properties.",
  },
  {
    slug: "material-honesty",
    term: "Material Honesty",
    short:
      "Materials should be what they appear to be. No veneers, no faux finishes.",
  },
  {
    slug: "object-oriented-ontology",
    term: "Object-Oriented Ontology",
    short:
      "Objects exist independently of human perception with their own reality and agency.",
  },
  {
    slug: "sensory-design",
    term: "Sensory Design",
    short:
      "Design engaging multiple senses for richer, more embodied experiences.",
  },
];

export default function GlossaryIndex() {
  return (
    <div className="pt-14">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <header className="mb-12">
          <h1 className="font-mono text-xs uppercase tracking-[0.3em] text-gf-muted mb-4">
            Glossary
          </h1>
          <p className="text-lg text-gf-text leading-relaxed max-w-lg">
            A growing lexicon of the ideas shaping the shift from maximum
            functionality to maximum well-being.
          </p>
        </header>

        <div className="space-y-0">
          {TERMS.map((t, i) => (
            <Link
              key={t.slug}
              href={`/glossary/${t.slug}`}
              className="group block py-5 border-b border-gf-border/50 transition-colors hover:border-gf-accent/30"
            >
              <div className="flex items-start gap-4">
                <span className="font-mono text-[10px] text-gf-muted mt-1.5 w-6 flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="text-base font-medium text-gf-white group-hover:text-gf-accent transition-colors mb-1">
                    {t.term}
                  </h2>
                  <p className="text-sm text-gf-muted leading-relaxed">
                    {t.short}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
