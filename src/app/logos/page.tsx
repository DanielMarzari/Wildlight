import Link from "next/link";

export const metadata = { title: "Logos · Wildlight" };

export default function LogosPage() {
  return (
    <main className="min-h-screen bg-[#0a0807] text-[#e8dfd1]">
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />

      <header className="px-8 lg:px-16 pt-16 pb-12 border-b border-stone-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-orange-200/70 mb-3" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          A WILDLIGHT GRADE · LOGO STUDY
        </div>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <h1 className="text-6xl lg:text-8xl tracking-[-0.03em] leading-[0.9]" style={{ fontFamily: "Fraunces, Georgia, serif" }}>
            Twelve marks.
          </h1>
          <Link href="/mockups" className="text-[10px] tracking-[0.4em] uppercase text-stone-400 hover:text-white" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            ← Mockups
          </Link>
        </div>
        <p className="mt-6 max-w-xl text-stone-400 leading-relaxed">
          Twelve directions for the Wildlight mark. Each one minimalist, each one
          works at favicon size, each one stands alone or locks up with the
          wordmark. Pick one (or two — primary + secondary).
        </p>
      </header>

      <section className="px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-900">
          {LOGOS.map((l, i) => (
            <LogoCard key={l.id} {...l} idx={i + 1} />
          ))}
        </div>
      </section>

      <section className="px-8 lg:px-16 py-24 border-t border-stone-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-orange-200/70 mb-6" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          IN CONTEXT
        </div>
        <h2 className="text-4xl lg:text-6xl tracking-[-0.02em] leading-[0.95] mb-12" style={{ fontFamily: "Fraunces, Georgia, serif" }}>
          Lockups in <em className="italic">situ.</em>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-stone-900">
          {/* App icon */}
          <div className="bg-[#0a0807] p-10 flex flex-col items-center gap-6">
            <div className="text-[10px] tracking-[0.4em] uppercase text-stone-500" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>App icon · 256×256</div>
            <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-[#1a0e08] to-[#080604] flex items-center justify-center shadow-2xl ring-1 ring-white/5">
              <Aperture size={88} />
            </div>
          </div>

          {/* Browser tab */}
          <div className="bg-[#0a0807] p-10 flex flex-col items-center justify-center gap-6">
            <div className="text-[10px] tracking-[0.4em] uppercase text-stone-500" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>Browser tab</div>
            <div className="w-72 rounded-t-lg bg-stone-200 text-stone-900 px-3 py-2 flex items-center gap-2 text-xs">
              <Aperture size={14} dark />
              <span style={{ fontFamily: "Fraunces, Georgia, serif" }}>Wildlight — Studio</span>
              <span className="ml-auto text-stone-500">✕</span>
            </div>
          </div>

          {/* Print/Stamp */}
          <div className="bg-[#0a0807] p-10 flex flex-col items-center gap-6">
            <div className="text-[10px] tracking-[0.4em] uppercase text-stone-500" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>Stamp · sleeve</div>
            <div className="text-center">
              <Aperture size={44} />
              <div className="mt-3 text-3xl tracking-[-0.02em]" style={{ fontFamily: "Fraunces, Georgia, serif" }}>Wildlight</div>
              <div className="mt-1 text-[10px] tracking-[0.3em] uppercase text-stone-500" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>EST. 2026 · BROOKLYN</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-8 lg:px-16 py-12 border-t border-stone-900 flex items-center justify-between text-xs text-stone-500" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        <span>LOGO STUDY · DRAFT V1</span>
        <span className="tracking-[0.3em] uppercase">SEND THE NUMBER</span>
      </footer>
    </main>
  );
}

function LogoCard({ idx, name, kind, mark, blurb, withWordmark }: { idx: number; name: string; kind: string; mark: React.ReactNode; blurb: string; withWordmark?: boolean }) {
  return (
    <article className="bg-[#0a0807] p-10 flex flex-col">
      <div className="flex items-center justify-between text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-8" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        <span>№ {String(idx).padStart(2, "0")} / {kind}</span>
        <span className="text-orange-200/60">●</span>
      </div>

      <div className="flex-1 flex items-center justify-center min-h-[200px] py-8">
        {mark}
      </div>

      {withWordmark && (
        <div className="flex items-center justify-center gap-3 pb-6 border-b border-stone-900">
          {mark}
          <span className="text-3xl tracking-[-0.02em]" style={{ fontFamily: "Fraunces, Georgia, serif" }}>Wildlight</span>
        </div>
      )}

      <div className="mt-6">
        <div className="text-2xl tracking-tight mb-2" style={{ fontFamily: "Fraunces, Georgia, serif" }}>{name}</div>
        <p className="text-sm text-stone-400 leading-relaxed">{blurb}</p>
      </div>
    </article>
  );
}

/* ============== THE 12 MARKS ============== */

function Aperture({ size = 64, dark = false }: { size?: number; dark?: boolean }) {
  const c = dark ? "#0a0807" : "#f5d28a";
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="28" stroke={c} strokeWidth="2" />
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i * 60 * Math.PI) / 180;
        const x1 = 32 + Math.cos(a) * 26;
        const y1 = 32 + Math.sin(a) * 26;
        const x2 = 32 + Math.cos(a + Math.PI / 3) * 8;
        const y2 = 32 + Math.sin(a + Math.PI / 3) * 8;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth="2" />;
      })}
    </svg>
  );
}

function Horizon({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 100 60" fill="none">
      <circle cx="50" cy="36" r="14" fill="#f5d28a" />
      <line x1="0" y1="50" x2="100" y2="50" stroke="#f5d28a" strokeWidth="2" />
      <line x1="14" y1="56" x2="86" y2="56" stroke="#f5d28a" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function Eclipse({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="26" fill="#f5d28a" />
      <circle cx="40" cy="28" r="22" fill="#0a0807" />
    </svg>
  );
}

function Prism({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M32 8 L56 50 L8 50 Z" stroke="#f5d28a" strokeWidth="2" />
      <line x1="44" y1="36" x2="60" y2="32" stroke="#ff8b3d" strokeWidth="1.2" />
      <line x1="44" y1="40" x2="60" y2="40" stroke="#f5d28a" strokeWidth="1.2" />
      <line x1="44" y1="44" x2="60" y2="48" stroke="#7f63d1" strokeWidth="1.2" />
    </svg>
  );
}

function Wordmark() {
  return (
    <span className="text-5xl tracking-[-0.04em]" style={{ fontFamily: "Fraunces, Georgia, serif", fontWeight: 400, lineHeight: 1 }}>
      wildlight
    </span>
  );
}

function MonoMark() {
  return (
    <span className="text-2xl tracking-[0.45em]" style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 400 }}>
      WILDLIGHT
    </span>
  );
}

function Monogram({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 80 64" fill="none">
      <text x="0" y="50" style={{ fontFamily: "Fraunces, Georgia, serif", fontWeight: 600, fontSize: "56px" }} fill="#f5d28a">W</text>
      <text x="44" y="50" style={{ fontFamily: "Fraunces, Georgia, serif", fontWeight: 400, fontStyle: "italic", fontSize: "44px" }} fill="#ff8b3d">l</text>
    </svg>
  );
}

function SunDot({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="10" fill="#f5d28a" />
      <circle cx="32" cy="32" r="22" stroke="#f5d28a" strokeWidth="1" opacity="0.4" />
      <circle cx="32" cy="32" r="30" stroke="#f5d28a" strokeWidth="0.5" opacity="0.2" />
    </svg>
  );
}

function HorizontalLockup() {
  return (
    <div className="flex items-center gap-3">
      <SunDot size={28} />
      <span className="text-2xl tracking-[-0.02em]" style={{ fontFamily: "Fraunces, Georgia, serif" }}>Wildlight</span>
    </div>
  );
}

function StackedLockup() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Aperture size={36} />
      <span className="text-2xl tracking-[-0.02em]" style={{ fontFamily: "Fraunces, Georgia, serif" }}>Wildlight</span>
      <span className="text-[10px] tracking-[0.4em] uppercase text-stone-500" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>EST. 2026</span>
    </div>
  );
}

function NegativeSpaceW({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <rect x="0" y="0" width="80" height="80" rx="14" fill="#ff8b3d" />
      <text x="40" y="60" textAnchor="middle" style={{ fontFamily: "Fraunces, Georgia, serif", fontWeight: 700, fontSize: "60px" }} fill="#0a0807">W</text>
    </svg>
  );
}

function TallyMark({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 100 70" fill="none">
      <line x1="10" y1="10" x2="10" y2="60" stroke="#f5d28a" strokeWidth="3" />
      <line x1="22" y1="10" x2="22" y2="60" stroke="#f5d28a" strokeWidth="3" />
      <line x1="34" y1="10" x2="34" y2="60" stroke="#f5d28a" strokeWidth="3" />
      <line x1="46" y1="10" x2="46" y2="60" stroke="#f5d28a" strokeWidth="3" />
      <line x1="5" y1="55" x2="52" y2="15" stroke="#f5d28a" strokeWidth="3" />
      <text x="62" y="42" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "16px", letterSpacing: "0.2em" }} fill="#f5d28a">WL</text>
    </svg>
  );
}

function FrameMark({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M 8 8 L 24 8 M 8 8 L 8 24" stroke="#f5d28a" strokeWidth="2" />
      <path d="M 56 8 L 40 8 M 56 8 L 56 24" stroke="#f5d28a" strokeWidth="2" />
      <path d="M 8 56 L 24 56 M 8 56 L 8 40" stroke="#f5d28a" strokeWidth="2" />
      <path d="M 56 56 L 40 56 M 56 56 L 56 40" stroke="#f5d28a" strokeWidth="2" />
      <circle cx="32" cy="32" r="6" fill="#ff8b3d" />
    </svg>
  );
}

const LOGOS = [
  {
    id: "aperture",
    name: "Aperture",
    kind: "ICON · GEOMETRIC",
    blurb: "A six-blade aperture iris. Reads at any size; the strongest standalone glyph in the set.",
    mark: <Aperture size={120} />,
    withWordmark: true,
  },
  {
    id: "horizon",
    name: "Horizon",
    kind: "ICON · ATMOSPHERIC",
    blurb: "A low sun above a thin horizon. Photography in three lines. Quiet and bookish.",
    mark: <Horizon size={140} />,
    withWordmark: true,
  },
  {
    id: "eclipse",
    name: "Eclipse",
    kind: "ICON · CHIAROSCURO",
    blurb: "A crescent of ember half-light. Pure shape — feels like a printer's mark from the 60s.",
    mark: <Eclipse size={120} />,
    withWordmark: true,
  },
  {
    id: "prism",
    name: "Prism",
    kind: "ICON · COLOR",
    blurb: "Light splitting into three. Literal but elegant — implies grading without saying it.",
    mark: <Prism size={120} />,
    withWordmark: true,
  },
  {
    id: "wordmark",
    name: "Wordmark",
    kind: "TYPE · SERIF",
    blurb: "Fraunces, all lowercase, tight. The whole brand in eight letters. Use anywhere the icon doesn't fit.",
    mark: <Wordmark />,
  },
  {
    id: "monomark",
    name: "Mono lockup",
    kind: "TYPE · TECHNICAL",
    blurb: "IBM Plex Mono, wide-tracked caps. The voice of the studio HUD. Pairs with any icon.",
    mark: <MonoMark />,
  },
  {
    id: "monogram",
    name: "WL monogram",
    kind: "TYPE · LIGATURE",
    blurb: "A capital W kissed by a lowercase italic l. Doubles as a watermark on prints.",
    mark: <Monogram size={140} />,
  },
  {
    id: "sun-dot",
    name: "Sun dot",
    kind: "ICON · MINIMAL",
    blurb: "A single ember disc with concentric halos. The most reducible mark — almost a punctuation.",
    mark: <SunDot size={140} />,
    withWordmark: true,
  },
  {
    id: "horizontal",
    name: "Horizontal lockup",
    kind: "LOCKUP · INLINE",
    blurb: "Sun dot + wordmark in a single line. The masthead variant.",
    mark: <HorizontalLockup />,
  },
  {
    id: "stacked",
    name: "Stacked lockup",
    kind: "LOCKUP · STAMP",
    blurb: "Aperture above wordmark above established line. Looks like it was printed on the back of a frame.",
    mark: <StackedLockup />,
  },
  {
    id: "negative",
    name: "Embered W",
    kind: "ICON · INVERSE",
    blurb: "A serif W cut from a solid ember square. The high-contrast favicon / app icon variant.",
    mark: <NegativeSpaceW size={140} />,
  },
  {
    id: "frame",
    name: "Frame ticks",
    kind: "ICON · CINEMATIC",
    blurb: "Four corner ticks around a small ember pip. The reference-frame motif from the studio chrome, distilled.",
    mark: <FrameMark size={140} />,
    withWordmark: true,
  },
];
