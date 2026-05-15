import Link from "next/link";

export const metadata = { title: "Mockups · Wildlight" };

const MOCKUPS = [
  {
    slug: "01-darkroom",
    name: "Darkroom",
    tag: "Cinematic / Ember",
    blurb:
      "A photographer's darkroom. Deep blacks, ember safelight, slow scroll-driven storytelling. Studio feels like Capture One — histogram, curves, scopes, side filmstrip.",
    accent: "from-amber-700/40 via-amber-900/30 to-stone-950",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "02-field-journal",
    name: "Field Journal",
    tag: "Paper / Sepia / Handcraft",
    blurb:
      "A leather-bound darkroom journal. Cream paper, hand-drawn notes, Polaroid corners, taped contact sheets. Studio is a binder of developing trays and chemistry timers.",
    accent: "from-amber-200/30 via-amber-100/20 to-stone-200/10",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "03-spatial",
    name: "Spatial",
    tag: "WebGL / Glass / Color cube",
    blurb:
      "Tomorrow's grading suite. A rotating 3D LUT cube, holographic glass panels, neon hue rings, particle gradients. Studio uses spatial color wheels and depth.",
    accent: "from-violet-700/40 via-cyan-700/30 to-slate-950",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "04-magazine",
    name: "Magazine",
    tag: "Brutalist editorial / Print",
    blurb:
      "Aperture meets Brutalist web. Asymmetric grid, massive condensed type, issue numbers, marginalia. Studio styled like an InDesign layout grid with photo bins and a swatch library.",
    accent: "from-rose-100/10 via-stone-200/10 to-stone-950",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "05-cinema",
    name: "Cinema",
    tag: "Letterbox / Film-print / Resolve",
    blurb:
      "A colorist's bay. 2.35:1 letterbox, sprocket holes, frame counter, scopes (waveform, vectorscope, parade). Studio is DaVinci Resolve — three color wheels, qualifier, node graph.",
    accent: "from-slate-700/40 via-stone-900/30 to-black",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
  },
];

export default function MockupIndex() {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-100">
      <header className="px-8 lg:px-16 pt-12 pb-8 border-b border-white/5">
        <div className="text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-2">
          Wildlight · Direction Studies
        </div>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <h1 className="font-serif text-5xl lg:text-7xl tracking-[-0.02em]" style={{ fontFamily: "Fraunces, Georgia, serif" }}>
            Five rooms.
          </h1>
          <Link href="/" className="text-xs tracking-[0.2em] uppercase text-stone-400 hover:text-white transition">
            ← Current site
          </Link>
        </div>
        <p className="mt-4 max-w-2xl text-stone-400 leading-relaxed">
          Each direction is a self-contained landing + a fake "studio" view of what
          the editor could feel like at depth. Walk through them, pick one, we'll
          double down.
        </p>
      </header>

      <div className="px-8 lg:px-16 py-16 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {MOCKUPS.map((m, i) => (
          <Link
            key={m.slug}
            href={`/mockups/${m.slug}`}
            className="group relative block rounded-2xl overflow-hidden ring-1 ring-white/10 hover:ring-white/30 transition-all"
          >
            <div className="aspect-[4/5] relative">
              <img src={m.image} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className={`absolute inset-0 bg-gradient-to-t ${m.accent} opacity-90`} />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-7">
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-3">
                {String(i + 1).padStart(2, "0")} · {m.tag}
              </div>
              <h2 className="font-serif text-4xl tracking-[-0.02em] mb-3" style={{ fontFamily: "Fraunces, Georgia, serif" }}>
                {m.name}
              </h2>
              <p className="text-sm text-stone-300 leading-relaxed mb-5 max-w-md">{m.blurb}</p>
              <span className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white border-b border-white/40 group-hover:border-white pb-0.5 transition">
                Open <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      <footer className="px-8 lg:px-16 py-10 border-t border-white/5 text-xs text-stone-500 flex justify-between">
        <span>Direction studies · v0.1</span>
        <span>Pick one, send the number.</span>
      </footer>
    </main>
  );
}
