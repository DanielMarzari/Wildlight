import Link from "next/link";
import { ApertureInline, ApertureStamp } from "@/components/brand";
import { SAMPLE_IMAGES } from "@/lib/sample-images";
import { LUTS } from "@/lib/luts";

export const metadata = { title: "Album · Wildlight" };

const DISPLAY = '"Cormorant Garamond", "Cormorant", Georgia, serif';
const MONO = "'IBM Plex Mono', monospace";

const VARIANTS = [
  {
    slug: "01-print-room",
    name: "Print Room",
    kind: "SINGLE COLUMN · STACKED",
    blurb: "One tall column. Each photo fills the column at native aspect, generous breathing room. Caption sits underneath like a museum label — location, gear, exposure.",
    img: 0,
    lut: 0,
  },
  {
    slug: "02-museum-wall",
    name: "Museum Wall",
    kind: "SYMMETRIC GRID · 3-UP",
    blurb: "A perfectly aligned grid: same aspect, same spacing, same caption block. No image is bigger than its neighbour. Reads as a hung exhibition wall.",
    img: 1,
    lut: 7,
  },
  {
    slug: "03-atlas",
    name: "Atlas",
    kind: "MAGAZINE SPREAD",
    blurb: "Asymmetric spread: a big plate on one side, a column of metadata + small companion frames on the other. Pages numbered. Quiet, editorial pacing.",
    img: 3,
    lut: 1,
  },
  {
    slug: "04-sequence",
    name: "Sequence",
    kind: "HORIZONTAL SNAP-SCROLL",
    blurb: "One photo per screen. Scroll sideways (or arrow keys / drag). Always centered, never cut off. Persistent metadata strip at the bottom.",
    img: 4,
    lut: 3,
  },
  {
    slug: "05-index",
    name: "Index",
    kind: "DENSE GRID · CLICK TO IMMERSE",
    blurb: "A compact contact-sheet style index — small uniform tiles you can scan. Click any tile to enter a full-bleed exhibit with the gear & EXIF sheet beside it.",
    img: 5,
    lut: 4,
  },
];

export default function AlbumIndex() {
  return (
    <main className="bg-[#0a0807] text-[#e8dfd1] min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&display=swap" rel="stylesheet" />

      <header className="fixed top-0 inset-x-0 z-30 backdrop-blur bg-black/40 border-b border-white/5">
        <nav className="h-14 px-6 lg:px-12 flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition">
            <ApertureInline size={20} color="#e8dfd1" textClass="text-base" />
          </Link>
          <div className="hidden md:flex items-center gap-8 text-[10px] tracking-[0.4em] uppercase text-stone-400" style={{ fontFamily: MONO }}>
            <Link href="/album" className="text-white transition">ALBUM</Link>
            <Link href="/guide" className="hover:text-white transition">GUIDE</Link>
            <Link href="/atelier" className="hover:text-white transition">ATELIER</Link>
            <Link href="/design" className="hover:text-white transition">DESIGN</Link>
            <Link href="/studios/c-cell" className="hover:text-white transition">STUDIO</Link>
          </div>
          <Link href="/studios/c-cell" className="text-[10px] tracking-[0.4em] uppercase border border-white/15 hover:border-white/40 px-4 py-2 rounded-sm transition text-white/90" style={{ fontFamily: MONO }}>OPEN STUDIO →</Link>
        </nav>
      </header>

      <section className="pt-36 pb-12 px-8 lg:px-16 border-b border-stone-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-orange-200/70 mb-4" style={{ fontFamily: MONO }}>ALBUM · LAYOUT STUDIES</div>
        <div className="flex items-end justify-between flex-wrap gap-6">
          <h1 className="text-[clamp(3rem,7vw,7rem)] leading-[0.95] tracking-[-0.02em] max-w-4xl" style={{ fontFamily: DISPLAY, fontWeight: 400 }}>
            Five ways to <em className="italic text-orange-200/95" style={{ fontWeight: 300 }}>hang the work.</em>
          </h1>
          <p className="max-w-md text-white/60 leading-relaxed text-base">
            Each one solves the same problem differently: show the photograph
            without crowding it, and pair it with the place + the camera
            settings instead of an editorial title. Walk through, pick one.
          </p>
        </div>
      </section>

      <section className="px-8 lg:px-16 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {VARIANTS.map((v, i) => {
          const img = SAMPLE_IMAGES[v.img];
          const lut = LUTS[v.lut];
          return (
            <Link key={v.slug} href={`/album/${v.slug}`} className="group block relative overflow-hidden bg-[#0d0a08] ring-1 ring-stone-900 hover:ring-orange-300/30 transition-all rounded-sm">
              <div className="aspect-[4/5] relative overflow-hidden">
                <img src={img.url} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" style={{ filter: lut.filter }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0807] via-[#0a0807]/30 to-transparent" />
                <Tick className="top-3 left-3" rot={0} />
                <Tick className="top-3 right-3" rot={90} />
                <Tick className="bottom-3 right-3" rot={180} />
                <Tick className="bottom-3 left-3" rot={270} />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="text-[10px] tracking-[0.4em] uppercase text-orange-200/80 mb-3" style={{ fontFamily: MONO }}>
                  ROOM {String.fromCharCode(65 + i)} · {v.kind}
                </div>
                <h2 className="text-3xl tracking-[-0.02em] mb-3" style={{ fontFamily: DISPLAY, fontWeight: 400 }}>{v.name}</h2>
                <p className="text-sm text-white/65 leading-relaxed mb-4 max-w-md">{v.blurb}</p>
                <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-white/80 border-b border-white/30 group-hover:border-white pb-0.5 transition" style={{ fontFamily: MONO }}>
                  WALK IN →
                </span>
              </div>
            </Link>
          );
        })}
      </section>

      <footer className="px-8 lg:px-16 py-20 border-t border-stone-900 flex flex-col lg:flex-row items-center justify-between gap-8">
        <p className="text-sm text-stone-500 max-w-xs leading-relaxed italic" style={{ fontFamily: DISPLAY, fontSize: "1.05rem" }}>
          The room is half the photograph. Pick the room first.
        </p>
        <ApertureStamp size={48} color="#e8dfd1" est="EST. 2026 · BROOKLYN" />
        <Link href="/" className="text-[10px] tracking-[0.4em] uppercase text-stone-400 hover:text-white" style={{ fontFamily: MONO }}>← HOME</Link>
      </footer>
    </main>
  );
}

function Tick({ className, rot }: { className: string; rot: number }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <svg width="20" height="20" style={{ transform: `rotate(${rot}deg)` }}>
        <path d="M 0 0 L 16 0 M 0 0 L 0 16" stroke="white" strokeWidth={1} opacity={0.65} />
      </svg>
    </div>
  );
}
