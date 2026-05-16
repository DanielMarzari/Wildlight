import Link from "next/link";
import { ApertureInline, ApertureStamp } from "@/components/brand";

export const G_DISPLAY = '"Cormorant Garamond", "Cormorant", "EB Garamond", Georgia, serif';
export const G_MONO = "'IBM Plex Mono', monospace";

export { CHAPTERS } from "@/lib/guide-toc";

export function GuideNav({ active }: { active?: string }) {
  return (
    <header className="fixed top-0 inset-x-0 z-30 backdrop-blur bg-black/40 border-b border-white/5">
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&display=swap" rel="stylesheet" />
      <nav className="h-14 px-6 lg:px-12 flex items-center justify-between">
        <Link href="/" className="hover:opacity-80 transition">
          <ApertureInline size={20} color="#e8dfd1" textClass="text-base" />
        </Link>
        <div className="hidden md:flex items-center gap-8 text-[10px] tracking-[0.4em] uppercase text-stone-400" style={{ fontFamily: G_MONO }}>
          <Link href="/album" className="hover:text-white transition">ALBUM</Link>
          <Link href="/guide" className={active === "guide" ? "text-white" : "hover:text-white transition"}>GUIDE</Link>
          <Link href="/atelier" className="hover:text-white transition">ATELIER</Link>
          <Link href="/design" className="hover:text-white transition">DESIGN</Link>
          <Link href="/studios/c-cell" className="hover:text-white transition">STUDIO</Link>
        </div>
        <Link href="/studios/c-cell" className="text-[10px] tracking-[0.4em] uppercase border border-white/15 hover:border-white/40 px-4 py-2 rounded-sm transition text-white/90" style={{ fontFamily: G_MONO }}>
          OPEN STUDIO →
        </Link>
      </nav>
    </header>
  );
}

export function GuideFooter() {
  return (
    <footer className="px-8 lg:px-16 py-20 border-t border-stone-900 flex flex-col lg:flex-row items-center justify-between gap-8">
      <p className="text-sm text-stone-500 max-w-xs leading-relaxed italic" style={{ fontFamily: G_DISPLAY, fontSize: "1.05rem" }}>
        Photography is a practice, not a feature. Read once. Shoot for a year. Read again.
      </p>
      <ApertureStamp size={48} color="#e8dfd1" est="EST. 2026 · BROOKLYN" />
      <Link href="/guide" className="text-[10px] tracking-[0.4em] uppercase text-stone-400 hover:text-white" style={{ fontFamily: G_MONO }}>
        ← GUIDE INDEX
      </Link>
    </footer>
  );
}

export function ChapterMasthead({ n, title, sub, kicker }: { n: string; title: string; sub: string; kicker?: string }) {
  return (
    <section className="px-8 lg:px-16 pt-36 pb-16 border-b border-stone-900">
      <div className="max-w-5xl">
        <div className="flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-orange-200/70 mb-6" style={{ fontFamily: G_MONO }}>
          <span className="block w-8 h-px bg-orange-300/70" />
          <span>CHAPTER {n}</span>
          {kicker && <><span className="text-white/25">·</span><span className="text-white/55">{kicker}</span></>}
        </div>
        <h1 className="text-[clamp(3rem,8vw,8rem)] leading-[0.95] tracking-[-0.02em]" style={{ fontFamily: G_DISPLAY, fontWeight: 400 }}>
          {title}
        </h1>
        <p className="mt-6 text-xl lg:text-2xl text-white/70 leading-snug max-w-3xl" style={{ fontFamily: G_DISPLAY, fontStyle: "italic", fontWeight: 300 }}>
          {sub}
        </p>
      </div>
    </section>
  );
}

export function Body({ children }: { children: React.ReactNode }) {
  return (
    <article className="px-8 lg:px-16 py-20 max-w-3xl mx-auto" style={{ fontFamily: G_DISPLAY }}>
      <div className="space-y-12 text-[1.2rem] leading-[1.65] text-white/85">
        {children}
      </div>
    </article>
  );
}

export function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="scroll-mt-24" id={`s-${n}`}>
      <div className="flex items-baseline gap-4 mb-6">
        <span className="text-[10px] tracking-[0.4em] uppercase text-orange-200/70 pt-2" style={{ fontFamily: G_MONO }}>§ {n}</span>
        <h2 className="text-3xl lg:text-4xl tracking-[-0.02em]" style={{ fontFamily: G_DISPLAY, fontWeight: 500 }}>{title}</h2>
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

export function Sub({ children }: { children: React.ReactNode }) {
  return <h3 className="text-2xl tracking-[-0.01em] mt-8 mb-3" style={{ fontFamily: G_DISPLAY, fontWeight: 500 }}>{children}</h3>;
}

/** A boxed technical callout — used for definitions, "rules of thumb", numeric facts */
export function Callout({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <aside className="my-8 border-l-2 border-orange-300/50 pl-6 py-3 bg-white/[0.02]">
      {label && (
        <div className="text-[10px] tracking-[0.4em] uppercase text-orange-200/80 mb-2" style={{ fontFamily: G_MONO }}>
          {label}
        </div>
      )}
      <div className="text-base text-white/75 leading-relaxed" style={{ fontFamily: G_DISPLAY }}>
        {children}
      </div>
    </aside>
  );
}

export function PullQuote({ children, by }: { children: React.ReactNode; by?: string }) {
  return (
    <blockquote className="my-12 py-6 border-y border-stone-900">
      <p className="text-2xl lg:text-3xl leading-[1.25] tracking-[-0.01em] italic text-white/90" style={{ fontFamily: G_DISPLAY, fontWeight: 300 }}>
        "{children}"
      </p>
      {by && <div className="mt-4 text-[10px] tracking-[0.4em] uppercase text-stone-500" style={{ fontFamily: G_MONO }}>— {by}</div>}
    </blockquote>
  );
}

export function WhenToUse({ items }: { items: { when: string; why: string }[] }) {
  return (
    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((it, i) => (
        <div key={i} className="bg-white/[0.02] border border-stone-900 p-5 rounded-sm">
          <div className="text-[10px] tracking-[0.4em] uppercase text-orange-200/80 mb-2" style={{ fontFamily: G_MONO }}>
            {String(i + 1).padStart(2, "0")} · WHEN
          </div>
          <div className="text-base text-white/85 mb-2" style={{ fontFamily: G_DISPLAY, fontWeight: 500 }}>{it.when}</div>
          <div className="text-sm text-white/55 leading-relaxed" style={{ fontFamily: G_DISPLAY }}>{it.why}</div>
        </div>
      ))}
    </div>
  );
}

export function Spec({ pairs }: { pairs: [string, string][] }) {
  return (
    <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-1.5 text-[11px]" style={{ fontFamily: G_MONO }}>
      {pairs.map(([k, v]) => (
        <div key={k} className="flex items-center justify-between border-b border-dotted border-stone-800 py-1">
          <span className="text-stone-500 tracking-[0.2em] uppercase">{k}</span>
          <span className="text-white/85">{v}</span>
        </div>
      ))}
    </div>
  );
}

export function PrevNext({ prev, next }: { prev?: { slug: string; n: string; title: string }; next?: { slug: string; n: string; title: string } }) {
  return (
    <nav className="px-8 lg:px-16 py-12 border-t border-stone-900 grid grid-cols-2 gap-8">
      <div>
        {prev && (
          <Link href={`/guide/${prev.slug}`} className="group block">
            <div className="text-[10px] tracking-[0.4em] uppercase text-stone-500 mb-2" style={{ fontFamily: G_MONO }}>← CHAPTER {prev.n}</div>
            <div className="text-2xl text-white/70 group-hover:text-white tracking-[-0.01em] transition" style={{ fontFamily: G_DISPLAY, fontWeight: 400 }}>{prev.title}</div>
          </Link>
        )}
      </div>
      <div className="text-right">
        {next && (
          <Link href={`/guide/${next.slug}`} className="group block">
            <div className="text-[10px] tracking-[0.4em] uppercase text-stone-500 mb-2" style={{ fontFamily: G_MONO }}>CHAPTER {next.n} →</div>
            <div className="text-2xl text-white/70 group-hover:text-white tracking-[-0.01em] transition" style={{ fontFamily: G_DISPLAY, fontWeight: 400 }}>{next.title}</div>
          </Link>
        )}
      </div>
    </nav>
  );
}

/** Tiny SVG corner ticks reused throughout the site */
export function GuideTick({ className, rot }: { className: string; rot: number }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <svg width="18" height="18" style={{ transform: `rotate(${rot}deg)` }}>
        <path d="M 0 0 L 14 0 M 0 0 L 0 14" stroke="white" strokeWidth={1} opacity={0.55} />
      </svg>
    </div>
  );
}
