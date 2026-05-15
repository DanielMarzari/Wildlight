import Link from "next/link";

export const metadata = { title: "Studio mockups · Wildlight" };

const STUDIOS = [
  {
    slug: "a-atelier",
    name: "The Atelier",
    kind: "3-COLUMN / CAPTURE ONE",
    blurb:
      "Filmstrip catalog left, full canvas center, deep panel stack right (histogram → curves → HSL → detail). The conservative, photographer-fluent layout.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "b-bay",
    name: "The Bay",
    kind: "SCOPES + NODES / RESOLVE",
    blurb:
      "Viewport with waveform + vectorscope + parade. Node-graph mid-bar. Three-way color balls and qualifier below. The grading-suite layout.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "c-cell",
    name: "The Cell",
    kind: "IMMERSIVE / FLOATING",
    blurb:
      "Pure canvas. Chrome dissolves at rest, panels glide in from the edges on hover. The 'press tab to disappear' editor.",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "d-bench",
    name: "The Bench",
    kind: "TWO-UP / BEFORE-AFTER",
    blurb:
      "Permanent dual viewport, shared toolbar below. Built for comparison: A vs B grades, before/after, two LUTs duelling.",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function StudiosIndex() {
  return (
    <main className="min-h-screen bg-[#0a0807] text-[#e8dfd1]">
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />

      <header className="px-8 lg:px-16 pt-16 pb-12 border-b border-stone-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-orange-200/70 mb-3" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          A WILDLIGHT GRADE · STUDIO STUDIES
        </div>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <h1 className="text-6xl lg:text-8xl tracking-[-0.03em] leading-[0.9]" style={{ fontFamily: "Fraunces, Georgia, serif" }}>
            Four rooms.
          </h1>
          <Link href="/mockups" className="text-[10px] tracking-[0.4em] uppercase text-stone-400 hover:text-white" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            ← Mockups
          </Link>
        </div>
        <p className="mt-6 max-w-2xl text-stone-400 leading-relaxed">
          Four layouts for the studio at depth. Each one is a real, click-through
          mockup — same image, same LUTs, four different ways of arranging the
          work. Walk through them and pick.
        </p>
      </header>

      <div className="px-8 lg:px-16 py-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {STUDIOS.map((s, i) => (
          <Link
            key={s.slug}
            href={`/studios/${s.slug}`}
            className="group relative block rounded-lg overflow-hidden ring-1 ring-stone-900 hover:ring-orange-300/30 transition-all"
          >
            <div className="aspect-[16/10] relative overflow-hidden">
              <img src={s.image} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" style={{ filter: "contrast(1.1) saturate(0.95) brightness(0.7)" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0807] via-[#0a0807]/30 to-transparent" />
              {/* corner ticks */}
              <Tick className="top-3 left-3" rot={0} />
              <Tick className="top-3 right-3" rot={90} />
              <Tick className="bottom-3 right-3" rot={180} />
              <Tick className="bottom-3 left-3" rot={270} />
            </div>
            <div className="absolute bottom-0 inset-x-0 p-7">
              <div className="text-[10px] tracking-[0.4em] uppercase text-orange-200/70 mb-3" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                STUDIO {String.fromCharCode(65 + i)} · {s.kind}
              </div>
              <h2 className="text-4xl tracking-[-0.02em] mb-3" style={{ fontFamily: "Fraunces, Georgia, serif" }}>
                {s.name}
              </h2>
              <p className="text-sm text-stone-300 leading-relaxed mb-4 max-w-md">{s.blurb}</p>
              <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-white border-b border-white/40 group-hover:border-white pb-0.5 transition" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                ENTER →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <footer className="px-8 lg:px-16 py-10 border-t border-stone-900 flex justify-between text-xs text-stone-500" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        <span>STUDIO STUDIES · V1</span>
        <span className="tracking-[0.3em] uppercase">SEND THE LETTER</span>
      </footer>
    </main>
  );
}

function Tick({ className, rot }: { className: string; rot: number }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <svg width="22" height="22" style={{ transform: `rotate(${rot}deg)` }}>
        <path d="M 0 0 L 18 0 M 0 0 L 0 18" stroke="white" strokeWidth={1} opacity={0.6} />
      </svg>
    </div>
  );
}
