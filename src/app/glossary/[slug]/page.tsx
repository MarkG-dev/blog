import { glossarySchema } from "@/lib/schema";
import Link from "next/link";
import type { Metadata } from "next";

interface GlossaryEntry {
  slug: string;
  term: string;
  definition: string;
  body: string;
}

const GLOSSARY: Record<string, GlossaryEntry> = {
  "calm-technology": {
    slug: "calm-technology",
    term: "Calm Technology",
    definition:
      "Technology designed to inform without demanding attention. Objects that engage the periphery of awareness rather than the center, requiring minimal cognitive load while remaining useful.",
    body: [
      "Calm technology is a design philosophy coined by Mark Weiser and John Seely Brown at Xerox PARC in 1995. The core idea: the best technologies are those that disappear — that weave themselves into the fabric of everyday life until they are indistinguishable from it.",
      "In 2026, calm technology has moved from academic concept to consumer category. Products like breathing stones, ambient light displays, and e-ink clocks strip away notifications, apps, and screens in favor of single-purpose objects that do one thing with complete dedication.",
      "The Calm Tech Institute now certifies products against a set of calm technology principles, and plans to certify 50 products in 2026 alone — a sign that what was once a fringe philosophy is becoming a market standard.",
      "What makes calm technology different from \"simple\" technology is intentionality. A rock is simple. A breathing stone that uses haptic feedback to guide your breath at a rate clinically proven to activate the parasympathetic nervous system — that's calm. The complexity is real, but it's hidden. The technology has forgotten itself.",
      "Related concepts: post-functional design, ambient computing, the analog revival.",
    ].join("\n\n"),
  },
  "post-functional-design": {
    slug: "post-functional-design",
    term: "Post-Functional Design",
    definition:
      "Design that optimizes for well-being rather than capability. The successor to the era of maximum functionality, where the question shifts from 'what can it do?' to 'how does it make you feel?'",
    body: [
      "Every major era of design has optimized for the same thing: making things work better, for more people, at lower cost. From the Bauhaus to Apple, the trajectory has been toward maximum functionality — universal solutions that do everything for everyone.",
      "Post-functional design argues that this trajectory has reached its logical end. Functionality is solved. Your phone can do everything. The question that remains — and that nobody optimized for — is whether any of this makes you feel better.",
      "The shift from maximum functionality to maximum well-being is not incremental. It requires an entirely different design strategy. Functionality can be universal (a calculator works the same way for everyone), but well-being cannot. What calms you might annoy me. What feels sacred to you might feel silly to me. Well-being is subjectively defined.",
      "This means post-functional design produces particular solutions — objects designed for someone specific, not everyone universally. This is an opposing design strategy to everything that came before it.",
      "Evidence of the shift: the collapse of AI hardware maximalism (Humane AI Pin, Rabbit R1), the rise of single-purpose devices, Gen Z's $5B analog economy, and the growing market for breathing devices, ambient displays, and screen-free objects.",
    ].join("\n\n"),
  },
  "analog-revival": {
    slug: "analog-revival",
    term: "The Analog Revival",
    definition:
      "The $5B+ cultural and economic shift toward physical objects, dumb phones, vinyl records, and screen-free experiences, driven by Gen Z digital fatigue and a broader rejection of attention-economy products.",
    body: [
      "In April 2026, Fortune reported that Gen Z is engineering an analog future worth at least $5 billion. Dumbphone sales are up 25% year-over-year. Crafting sales at Michaels rose 136%. Vinyl records have seen 17 consecutive years of growth. Digital detox cabins have expanded from a handful of locations to over 50 in the UK alone.",
      "This is not nostalgia. Gen Z didn't grow up with vinyl — they're choosing it. Pew Research shows 48% of US teenagers view social media's effects as mostly negative (up from 32% two years prior), and 44% have actively cut back on smartphone use.",
      "The analog revival is the consumer-facing expression of a deeper shift: the rejection of products designed to capture and monetize attention. When Humane burned $230 million trying to put more AI in your pocket and bricked every shipped device, it proved the counter-thesis. The market doesn't want more functionality. It wants objects that respect the boundary between the digital and the physical.",
      "Brands riding the wave: Teenage Engineering (design-forward hardware), Nothing (transparent, playful phones), Loftie (no-subscription alarm clock), Light Phone (minimalist phone), and a growing ecosystem of independent makers building single-purpose devices.",
    ].join("\n\n"),
  },
  "object-turn": {
    slug: "object-turn",
    term: "The Object Turn",
    definition:
      "The moment design stopped optimizing screens and started optimizing things. Physical objects as the new interface — not a retreat from technology, but a transformation of where technology lives.",
    body: [
      'For two decades, "design" effectively meant "screen design." UI, UX, apps, websites, dashboards — the discipline narrowed to a rectangle of light. The object turn is the reversal of that narrowing.',
      "It's not anti-technology. The most interesting objects being made right now — breathing stones with haptic feedback, ESP32-powered ambient displays, solar-powered e-ink watches — are deeply technical. They use microcontrollers, firmware, Bluetooth, and custom PCBs. The technology is real. It just doesn't live on a screen.",
      "The object turn is visible across multiple domains simultaneously. In design education, programs like RCA, ECAL, and MIT Media Lab are producing graduates focused on physical computing and tangible interfaces. In consumer markets, the breathing device category alone has expanded from zero to dozens of products in three years. In art, festivals like CURRENTS 2026 showcase 50+ works that make invisible processes tangible through physical form.",
      "What unites these moves is a shared conviction: the next interface is not a better screen. It's an object that has forgotten it's technology. A thing you hold, not a thing you stare at. The material is the message.",
    ].join("\n\n"),
  },
  "digital-minimalism": {
    slug: "digital-minimalism",
    term: "Digital Minimalism",
    definition:
      "A philosophy of technology use in which you focus your online time on a small number of carefully selected activities that strongly support things you value, and then happily miss out on everything else.",
    body: [
      "Digital minimalism, popularized by Cal Newport in his 2019 book of the same name, has evolved from a self-help concept into a design principle. The original argument was personal: curate your digital life the way you'd curate a wardrobe. By 2026, the idea has jumped from individual behavior to product strategy.",
      "The Light Phone is digital minimalism as a product. It makes calls and texts, gives directions, and plays music. That's it. No browser, no social media, no email. The company has sold hundreds of thousands of units and inspired a category of \"dumbphones\" that now represents one of the fastest-growing consumer electronics segments.",
      "What distinguishes digital minimalism from digital detox is sustainability. A detox is temporary — a weekend cabin without WiFi, a phone-free dinner. Digital minimalism is a permanent redesign of your relationship with technology. It doesn't ask you to go offline; it asks you to be intentional about what deserves to be online.",
      "For designers, digital minimalism inverts the standard product brief. Instead of \"what features should we add?\" the question becomes \"what features should we remove?\" The constraint is not capability but attention — and the most radical act is deciding that your product should do less.",
      "The movement has accelerated as attention-economy products face regulatory pressure (EU Digital Services Act, US Kids Online Safety Act) and cultural backlash (surgeon general's advisory on social media and youth mental health). Digital minimalism offers both a consumer philosophy and a business model for the post-attention economy.",
    ].join("\n\n"),
  },
  "biomimetic-design": {
    slug: "biomimetic-design",
    term: "Biomimetic Design",
    definition:
      "Design that imitates the models, systems, and elements of nature to solve human problems. In the context of well-being, biomimicry creates objects and environments that resonate with our evolved biological responses.",
    body: [
      "Biomimetic design has a long engineering history — Velcro from burrs, bullet trains from kingfisher beaks, building ventilation from termite mounds. But the well-being application is newer and less studied: designing objects that trigger our evolved biological responses to feel right, safe, or calm.",
      "A breathing stone shaped like a river pebble isn't arbitrary. The human hand evolved to grip smooth, rounded stones. The weight, temperature, and curvature of the object activate tactile pathways that predate language. The technology — haptic motors, accelerometers, Bluetooth — is invisible. What you feel is the stone.",
      "This is biomimicry for emotion, not function. The object doesn't need to be stone-shaped to work mechanically. It's stone-shaped because 200,000 years of evolution made that shape feel comforting in your hand. The biology is the interface.",
      "In architecture, biophilic design (a close relative) has measurable outcomes: 15% higher well-being scores, 6% higher productivity, and 15% higher creativity in spaces with natural elements, according to Human Spaces research. The principles translate to product scale: natural materials, organic forms, living rhythms (circadian lighting, breath-paced haptics), and sensory richness over sensory overload.",
      "The most interesting biomimetic products in 2026 combine deep biological insight with advanced technology. An e-ink display that mimics the reflectance of paper. A speaker cabinet tuned to the resonant frequency of a hardwood forest. A desk lamp that follows solar arc timing. The biology is the design brief; the technology serves the biology.",
    ].join("\n\n"),
  },
  "haptic-design": {
    slug: "haptic-design",
    term: "Haptic Design",
    definition:
      "The design of touch-based interactions and tactile feedback in objects and interfaces. Encompasses vibration patterns, surface textures, weight distribution, and thermal properties — everything a product communicates through the sense of touch.",
    body: [
      "Touch is the first sense we develop and the last we lose, yet for two decades of digital design it was essentially ignored. A touchscreen is a glass rectangle — it feels the same whether you're deleting a photo or sending a message. Haptic design restores touch as a primary design channel.",
      "Apple's Taptic Engine was the mainstream breakthrough: a linear actuator that produces nuanced vibration patterns distinguishable enough to communicate different events. But the real frontier is beyond the phone. Breathing devices use haptic pulses at 6 breaths per minute (the rate that maximizes heart rate variability). Musical instruments use haptic feedback to teach finger placement. Wayfinding devices use directional vibration so you never look at a screen while walking.",
      "The material dimension of haptic design is equally important and less discussed. The weight of an object in your hand, the temperature of aluminum versus wood, the click resistance of a physical button, the texture of a knurled dial — these are all haptic design decisions. A Leica camera and a plastic point-and-shoot take the same photos, but the Leica communicates precision through every surface your fingers touch.",
      'In the post-functional era, haptic design becomes a primary differentiator. When two objects do the same thing, the one that feels better in your hand wins. And "feels better" is not subjective noise — it\'s measurable through grip force analysis, galvanic skin response, and cortisol markers. Touch is physiological. The body knows.',
    ].join("\n\n"),
  },
  "material-honesty": {
    slug: "material-honesty",
    term: "Material Honesty",
    definition:
      "A design principle that materials should be what they appear to be and should express their intrinsic properties rather than imitating other materials. Wood should look and feel like wood. Metal should behave like metal. No veneers, no faux finishes, no plastic pretending to be marble.",
    body: [
      'Material honesty descends from the Arts and Crafts movement through the Bauhaus to contemporary craft practice. John Ruskin\'s "Lamp of Truth" in 1849 argued that architectural deception — painting wood to look like marble, casting iron to look like stone — was a moral failure. The material should tell the truth about what it is.',
      "In product design, material honesty has practical consequences beyond aesthetics. An aluminum case that's actually aluminum ages with patina, conducts heat predictably, and can be recycled infinitely. A plastic case painted to look like aluminum peels, cracks, and ends up in landfill. The honest material is not just more beautiful — it's more durable, more repairable, and more sustainable.",
      "Teenage Engineering's products exemplify contemporary material honesty. The OP-1 synthesizer uses raw aluminum with visible machining marks. The packaging is the product case. Nothing is hidden, coated, or disguised. The manufacturing process is visible in the finished object, and that visibility is the aesthetic.",
      "The well-being dimension: honest materials create trust. Your nervous system processes material information constantly — weight, temperature, texture, resonance. When a material is pretending to be something it's not, there's a subtle mismatch between what your eyes report and what your hands feel. You may not consciously notice it, but your body does. Honest materials eliminate that mismatch. The object feels coherent. And coherence, at a somatic level, is calming.",
      "Material honesty also constrains in productive ways. When you can't hide behind a finish, every dimension, radius, and surface quality must be resolved. The material disciplines the design.",
    ].join("\n\n"),
  },
  "object-oriented-ontology": {
    slug: "object-oriented-ontology",
    term: "Object-Oriented Ontology",
    definition:
      "A philosophical framework that rejects the privileging of human existence over the existence of nonhuman objects. OOO argues that objects exist independently of human perception and have their own reality, agency, and relations — a view that fundamentally changes how designers think about the things they make.",
    body: [
      "Object-oriented ontology (OOO) emerged in philosophy through the work of Graham Harman, Ian Bogost, Timothy Morton, and Levi Bryant in the early 2000s. For designers, the relevant claim is radical: objects are not just things humans use. They have their own withdrawn essence that can never be fully accessed by any other entity — including their maker.",
      "Why does this matter for design? Because it shifts the designer's posture from master to collaborator. If an object has its own reality beyond your intention for it, then designing is not about imposing function onto matter — it's about listening to what the material wants to become. A woodworker reading the grain, a ceramicist following the clay's moisture — these are OOO practices even if the practitioners never heard the term.",
      "In technology, OOO challenges the assumption that devices are neutral tools awaiting human instruction. A phone in your pocket shapes your attention whether you're using it or not. Its weight, its notification sounds, its screen glow — these are the phone's own expressions, independent of your intent. Designing with OOO in mind means taking these autonomous expressions seriously rather than treating them as side effects.",
      "The practical output: objects designed with more respect for their own presence. A clock that doesn't interrupt. A lamp that responds to ambient light rather than waiting for commands. A material that ages rather than degrades. OOO doesn't prescribe a style — it prescribes an attitude of humility toward the things we make.",
    ].join("\n\n"),
  },
  "sensory-design": {
    slug: "sensory-design",
    term: "Sensory Design",
    definition:
      "Design that deliberately engages multiple senses — sight, touch, sound, smell, proprioception — to create richer, more embodied experiences. Rejects the visual-only bias of screen-based design in favor of full-spectrum sensory engagement.",
    body: [
      "The screen era reduced design to a single sense. Visual hierarchy, color theory, typography, layout — the entire discipline of UX operates within a rectangle of light. Sensory design is the expansion back to the full human sensorium.",
      "Jinsop Lee's TED talk on five-sense design rated everyday experiences across all five senses and found that the highest-rated experiences (riding a motorcycle, eating a meal, making love) engaged multiple senses simultaneously. The lowest-rated experiences (using a computer, sitting in traffic) engaged one or two. The correlation between multi-sensory engagement and perceived quality of experience was striking.",
      "In product design, sensory design manifests as deliberate attention to sound (the click of a button, the tone of a notification), touch (surface texture, weight, temperature), and even smell (the leather of a new bag, the wood of a freshly opened box). Bang & Olufsen's aluminum remotes are sensory design — the weight, the thermal conductivity, the mechanical precision of each button. They could make a lighter, cheaper remote. The sensory experience is the product.",
      "The well-being connection is physiological. Multi-sensory engagement activates parasympathetic responses — the body's rest-and-digest mode. A warm ceramic mug in your hands, the sound of water being poured, the smell of coffee — this is a designed sensory sequence that produces calm. Compare: scrolling a feed. One sense, sympathetic activation, cortisol. The sensory design argument is not aesthetic preference — it's nervous system regulation.",
      "For makers in the post-functional era, sensory design is the frontier. When your product can't compete on features (because features are commodified), it competes on how it makes the body feel. And the body feels with all five senses, not just one.",
    ].join("\n\n"),
  },
};

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return Object.keys(GLOSSARY).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const entry = GLOSSARY[params.slug];
  if (!entry) return { title: "Not Found" };

  return {
    title: `What is ${entry.term}?`,
    description: entry.definition,
  };
}

export default function GlossaryPage({ params }: PageProps) {
  const entry = GLOSSARY[params.slug];

  if (!entry) {
    return (
      <div className="pt-14 max-w-2xl mx-auto px-4 py-24 text-center">
        <p className="text-gf-muted">Term not found.</p>
      </div>
    );
  }

  return (
    <div className="pt-14">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Schema markup for AI citation */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(glossarySchema(entry.term, entry.definition)),
          }}
        />

        <header className="mb-8">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gf-muted mb-3">
            Glossary
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-gf-white mb-4">
            What is {entry.term}?
          </h1>
          <p className="text-lg text-gf-text leading-relaxed">
            {entry.definition}
          </p>
        </header>

        <div className="article-body text-gf-text">
          {entry.body.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <nav className="mt-12 pt-6 border-t border-gf-border">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gf-muted mb-3">
            Related Terms
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.values(GLOSSARY)
              .filter((g) => g.slug !== entry.slug)
              .map((g) => (
                <Link
                  key={g.slug}
                  href={`/glossary/${g.slug}`}
                  className="px-3 py-1.5 text-xs border border-gf-border text-gf-muted hover:text-gf-accent hover:border-gf-accent rounded-sm transition-colors"
                >
                  {g.term}
                </Link>
              ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
