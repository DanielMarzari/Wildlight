import Link from "next/link";
import { GuideNav, GuideFooter, G_DISPLAY, G_MONO, CHAPTERS } from "@/components/guide-chrome";

export const metadata = { title: "Guide · Wildlight" };

const EXPANDED: { slug: string; sentence: string; readMins: number }[] = [
  {
    slug: "exposure",
    sentence: "Three controls. One amount of light. Why every photograph is a choice between freezing motion, framing depth, and accepting noise.",
    readMins: 12,
  },
  {
    slug: "composition",
    sentence: "The grammar of where things sit in the frame. Rule of thirds, leading lines, negative space, symmetry, and when to break each one on purpose.",
    readMins: 10,
  },
  {
    slug: "light",
    sentence: "Direction, quality, and color. Why golden hour is golden, what \"hard light\" means, and how to read a scene before you raise the camera.",
    readMins: 9,
  },
  {
    slug: "lenses",
    sentence: "How focal length reshapes the world. Wide for storytelling, fifty for honesty, eighty-five for the face, two hundred for compression.",
    readMins: 8,
  },
  {
    slug: "focus",
    sentence: "Where the plane of sharpness sits, and how thick it is. Depth of field, hyperfocal distance, focus modes, and the math of bokeh.",
    readMins: 9,
  },
];

const COMING_SOON: { title: string; sub: string }[] = [
  { title: "Color & White Balance", sub: "Kelvin, magenta/green, and how to lie honestly" },
  { title: "Histogram & Metering", sub: "Reading the curve, exposure compensation, ETTR" },
  { title: "Portrait, Landscape, Street", sub: "Field-specific notes" },
];

export default function GuideIndex() {
  return (
    <main className="bg-[#0a0807] text-[#e8dfd1] min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      <GuideNav active="guide" />

      {/* Masthead */}
      <section className="pt-36 pb-16 px-8 lg:px-16 border-b border-stone-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-orange-200/70 mb-4" style={{ fontFamily: G_MONO }}>
          THE GUIDE · A WILDLIGHT PRIMER
        </div>
        <div className="flex items-end justify-between flex-wrap gap-6 max-w-6xl">
          <h1 className="text-[clamp(3rem,9vw,9rem)] leading-[0.92] tracking-[-0.02em]" style={{ fontFamily: G_DISPLAY, fontWeight: 400 }}>
            How to <em className="italic text-orange-200/95" style={{ fontWeight: 300 }}>see</em>.
          </h1>
          <p className="max-w-xl text-white/70 leading-relaxed text-lg" style={{ fontFamily: G_DISPLAY }}>
            Photography is a craft with five or six durable ideas — the rest is
            taste, patience, and ten thousand frames. This is a comprehensive,
            unhurried guide to those ideas. Read in any order. Re-read in any
            order. Take a camera outside between each chapter.
          </p>
        </div>
      </section>

      {/* TOC */}
      <section className="px-8 lg:px-16 py-20">
        <div className="text-[10px] tracking-[0.4em] uppercase text-orange-200/70 mb-6" style={{ fontFamily: G_MONO }}>
          INDEX · FIVE CHAPTERS
        </div>
        <ol className="border-t border-stone-900">
          {CHAPTERS.map((ch) => {
            const ex = EXPANDED.find((e) => e.slug === ch.slug)!;
            return (
              <li key={ch.slug} className="border-b border-stone-900">
                <Link href={`/guide/${ch.slug}`} className="group grid grid-cols-1 lg:grid-cols-[120px_1fr_140px] gap-6 lg:gap-12 items-start py-8 lg:py-10">
                  <div className="text-[10px] tracking-[0.4em] uppercase text-orange-200/70 pt-3" style={{ fontFamily: G_MONO }}>
                    CHAPTER {ch.n}
                  </div>
                  <div>
                    <h2 className="text-3xl lg:text-5xl tracking-[-0.02em] text-white/90 group-hover:text-white transition leading-[1.05]" style={{ fontFamily: G_DISPLAY, fontWeight: 400 }}>
                      {ch.title}
                    </h2>
                    <div className="mt-2 text-base lg:text-lg text-white/55 italic" style={{ fontFamily: G_DISPLAY, fontWeight: 300 }}>
                      {ch.sub}
                    </div>
                    <p className="mt-4 text-white/70 leading-relaxed max-w-2xl" style={{ fontFamily: G_DISPLAY, fontSize: "1.1rem" }}>
                      {ex.sentence}
                    </p>
                  </div>
                  <div className="text-right text-[10px] tracking-[0.3em] uppercase text-stone-500 pt-3" style={{ fontFamily: G_MONO }}>
                    <div>{ex.readMins} MIN READ</div>
                    <div className="mt-3 text-orange-200/70 group-hover:text-orange-200">READ →</div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Coming next */}
      <section className="px-8 lg:px-16 py-16 border-t border-stone-900 bg-white/[0.01]">
        <div className="text-[10px] tracking-[0.4em] uppercase text-orange-200/70 mb-6" style={{ fontFamily: G_MONO }}>
          NEXT ON THE SHELF
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
          {COMING_SOON.map((c) => (
            <div key={c.title}>
              <div className="text-2xl tracking-[-0.01em]" style={{ fontFamily: G_DISPLAY, fontWeight: 400 }}>{c.title}</div>
              <div className="mt-2 text-sm text-white/55 italic" style={{ fontFamily: G_DISPLAY }}>{c.sub}</div>
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm text-white/40 max-w-2xl leading-relaxed italic" style={{ fontFamily: G_DISPLAY, fontSize: "1.05rem" }}>
          These are sketched and will appear in subsequent editions. The first five chapters cover the load-bearing fundamentals.
        </p>
      </section>

      <GuideFooter />
    </main>
  );
}
