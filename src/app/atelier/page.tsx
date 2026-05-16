import Link from "next/link";
import { ApertureInline, ApertureStamp } from "@/components/brand";

export const metadata = { title: "Atelier · Wildlight" };

const DISPLAY = '"Cormorant Garamond", "Cormorant", "EB Garamond", Georgia, serif';
const MONO = "'IBM Plex Mono', monospace";

/**
 * Curated index of free professional LUT packs. We don't redistribute the
 * .cube files (licenses vary); each entry links out to the source and notes
 * the terms the publisher distributes under. Drop the .cube into Wildlight
 * studio via "+ .CUBE" and it becomes part of your library.
 */
const PACKS = [
  {
    name: "Adobe — Free Premiere Pro LUTs",
    by: "Adobe",
    href: "https://helpx.adobe.com/premiere-pro/using/applying-luts.html",
    blurb: "Premiere Pro ships dozens of high-quality looks (Universal Camera Defaults, SL Cinematic Tones, Filmstock Looks). All bundled .cube files are usable in any host that reads .cube.",
    license: "FREE WITH PR · PERSONAL & COMMERCIAL",
    swatch: ["#1a1a1f", "#7c5d3f", "#d5b189"],
  },
  {
    name: "RocketStock — 35 Free LUTs",
    by: "RocketStock",
    href: "https://www.rocketstock.com/free-after-effects-templates/35-free-luts-for-color-grading-videos/",
    blurb: "A long-standing free pack that ships .cube files for AE, Premiere, FCPX, Resolve, Photoshop. Strong starting point — cinematic blacks, golden hours, faded film looks.",
    license: "FREE · EMAIL REQUIRED · COMMERCIAL OK",
    swatch: ["#171a1f", "#9c6a3b", "#e4c9a4"],
  },
  {
    name: "Color Grading Central — Free LUTs",
    by: "Color Grading Central",
    href: "https://colorgradingcentral.com/free-luts",
    blurb: "Curated by Denver Riddle. A handful of free .cube files (Vibrant, Faded, Bleach) plus an introductory tutorial pack. Strong for narrative film starts.",
    license: "FREE · ATTRIBUTION APPRECIATED",
    swatch: ["#0f1318", "#88a6b1", "#dcd3c6"],
  },
  {
    name: "Ground Control Color — Free Sample LUTs",
    by: "Ground Control",
    href: "https://groundcontrolcolor.com/products/sample-luts",
    blurb: "A taster from a working colourist's full packs. Modern emulation looks (Aerochrome, Tungsten, Faded Print) that work straight on log footage.",
    license: "FREE SAMPLE · COMMERCIAL OK",
    swatch: ["#1a1c2a", "#bd5d3a", "#f0d289"],
  },
  {
    name: "Lutify.me — Free Sample Pack",
    by: "Lutify.me",
    href: "https://lutify.me/free-luts/",
    blurb: "Small free pack from a paid LUT studio. Useful for testing the studio pipeline and seeing how creative LUTs are constructed.",
    license: "FREE · EMAIL REQUIRED",
    swatch: ["#0c0a0f", "#a87fb8", "#dfc6e8"],
  },
  {
    name: "FilmConvert — Free Camera Profiles",
    by: "FilmConvert",
    href: "https://www.filmconvert.com/converters/",
    blurb: "Camera-matched LUT profiles (Sony, ARRI, RED, Canon) that emulate physical film stocks. The free portion includes the Camera Pack profiles.",
    license: "FREE TIER · WATERMARKED EXPORTS",
    swatch: ["#0a0a0d", "#88683a", "#e8d8b5"],
  },
  {
    name: "Adobe Camera Raw — Built-in Profiles",
    by: "Adobe",
    href: "https://helpx.adobe.com/camera-raw/using/profiles-image-camera-raw.html",
    blurb: "Hundreds of base profiles (Adobe Color, Adobe Standard, the Artistic / Vintage / B&W profile packs). Not .cube but the closest analog for Lightroom users.",
    license: "FREE WITH LR / ACR",
    swatch: ["#0a0a0a", "#5a5a5a", "#dadada"],
  },
  {
    name: "Bring your own — `+ .CUBE`",
    by: "Wildlight",
    href: "/studios/c-cell",
    blurb: "Studio accepts any standard Adobe `.cube` file (LUT_3D_SIZE up to 33). Drop it on the canvas or use `+ .CUBE` in the top bar. Your imports live in your browser only — nothing is uploaded.",
    license: "YOURS · LOCAL ONLY",
    swatch: ["#2a1d0d", "#c87a3a", "#ffd28a"],
  },
];

export default function AtelierPage() {
  return (
    <main className="bg-[#0a0807] text-[#e8dfd1] min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&display=swap" rel="stylesheet" />

      <header className="fixed top-0 inset-x-0 z-30 backdrop-blur bg-black/40 border-b border-white/5">
        <nav className="h-14 px-6 lg:px-12 flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition">
            <ApertureInline size={20} color="#e8dfd1" textClass="text-base" />
          </Link>
          <div className="hidden md:flex items-center gap-8 text-[10px] tracking-[0.4em] uppercase text-stone-400" style={{ fontFamily: MONO }}>
            <Link href="/album" className="hover:text-white transition">ALBUM</Link>
            <Link href="/guide" className="hover:text-white transition">GUIDE</Link>
            <Link href="/atelier" className="text-white transition">ATELIER</Link>
            <Link href="/design" className="hover:text-white transition">DESIGN</Link>
            <Link href="/studios/c-cell" className="hover:text-white transition">STUDIO</Link>
          </div>
          <Link href="/studios/c-cell" className="text-[10px] tracking-[0.4em] uppercase border border-white/15 hover:border-white/40 px-4 py-2 rounded-sm transition text-white/90" style={{ fontFamily: MONO }}>OPEN STUDIO →</Link>
        </nav>
      </header>

      {/* Masthead */}
      <section className="pt-36 pb-16 px-8 lg:px-16 border-b border-stone-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-orange-200/70 mb-4" style={{ fontFamily: MONO }}>THE ATELIER · CURATED PACKS</div>
        <h1 className="text-[clamp(3rem,7vw,7rem)] leading-[0.95] tracking-[-0.02em] max-w-4xl" style={{ fontFamily: DISPLAY, fontWeight: 400 }}>
          The shelf, beyond <em className="italic text-orange-200/95" style={{ fontWeight: 300 }}>the house.</em>
        </h1>
        <p className="mt-8 max-w-2xl text-white/65 leading-relaxed text-base lg:text-lg">
          The eight Wildlight signatures are the house grade. These are the
          public-domain and free professional packs we keep on the studio's
          back shelf — built by working colourists and engineers, distributed
          under their own licenses, and importable straight into the studio.
        </p>
        <div className="mt-8 inline-flex flex-wrap items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-white/55" style={{ fontFamily: MONO }}>
          <span className="px-3 py-1.5 border border-white/15 rounded-sm">+ .CUBE FILES · 17³ OR 33³</span>
          <span className="px-3 py-1.5 border border-white/15 rounded-sm">DROP ANYWHERE IN STUDIO</span>
          <span className="px-3 py-1.5 border border-white/15 rounded-sm">STORED IN YOUR BROWSER ONLY</span>
        </div>
      </section>

      {/* Pack grid */}
      <section className="px-4 lg:px-12 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PACKS.map((p, i) => (
          <article key={p.name} className="relative bg-[#0d0a08] ring-1 ring-stone-900 hover:ring-orange-300/30 transition p-6 flex flex-col">
            <div className="flex items-center justify-between text-[10px] tracking-[0.4em] uppercase text-orange-200/70 mb-4" style={{ fontFamily: MONO }}>
              <span>№ {String(i + 1).padStart(2, "0")} · {p.by.toUpperCase()}</span>
              <span className="flex gap-0.5">{p.swatch.map((c, ci) => <span key={ci} className="w-2 h-5" style={{ background: c }} />)}</span>
            </div>
            <h3 className="text-2xl lg:text-3xl tracking-[-0.02em] mb-3 leading-tight" style={{ fontFamily: DISPLAY, fontWeight: 400 }}>{p.name}</h3>
            <p className="text-sm text-white/65 leading-relaxed flex-1 mb-5">{p.blurb}</p>
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-stone-900">
              <span className="text-[9px] tracking-[0.3em] uppercase text-white/40" style={{ fontFamily: MONO }}>{p.license}</span>
              <a href={p.href} target={p.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-[10px] tracking-[0.3em] uppercase text-orange-200 hover:text-orange-100 inline-flex items-center gap-1" style={{ fontFamily: MONO }}>
                {p.href.startsWith("http") ? "VISIT →" : "OPEN →"}
              </a>
            </div>
          </article>
        ))}
      </section>

      {/* How-to */}
      <section className="px-8 lg:px-16 py-24 border-t border-stone-900">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12">
          <div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-orange-200/70 mb-4" style={{ fontFamily: MONO }}>HOW IT WORKS</div>
            <h2 className="text-5xl lg:text-6xl leading-[0.95] tracking-[-0.02em]" style={{ fontFamily: DISPLAY, fontWeight: 400 }}>
              Drop, import, <em className="italic text-orange-200/95" style={{ fontWeight: 300 }}>grade.</em>
            </h2>
          </div>
          <ol className="space-y-8 text-base text-white/70 leading-relaxed">
            <li className="grid grid-cols-[auto_1fr] gap-6">
              <span className="text-[10px] tracking-[0.3em] text-orange-200 pt-1" style={{ fontFamily: MONO }}>01</span>
              <div>
                <div className="mb-1" style={{ fontFamily: DISPLAY, fontSize: "1.4rem", fontWeight: 500 }}>Download a pack from its source.</div>
                <p>Each card above links to the publisher's distribution page. Licenses vary — read the terms before commercial use.</p>
              </div>
            </li>
            <li className="grid grid-cols-[auto_1fr] gap-6">
              <span className="text-[10px] tracking-[0.3em] text-orange-200 pt-1" style={{ fontFamily: MONO }}>02</span>
              <div>
                <div className="mb-1" style={{ fontFamily: DISPLAY, fontSize: "1.4rem", fontWeight: 500 }}>Drop a .cube onto the studio canvas.</div>
                <p>Or use <span className="text-orange-200" style={{ fontFamily: MONO }}>+ .CUBE</span> in the top bar. The file is parsed in your browser — nothing is uploaded.</p>
              </div>
            </li>
            <li className="grid grid-cols-[auto_1fr] gap-6">
              <span className="text-[10px] tracking-[0.3em] text-orange-200 pt-1" style={{ fontFamily: MONO }}>03</span>
              <div>
                <div className="mb-1" style={{ fontFamily: DISPLAY, fontSize: "1.4rem", fontWeight: 500 }}>It joins your LUT shelf.</div>
                <p>Imported LUTs appear in the bottom dock and the LUT panel, marked with an ember dot. They persist across sessions in your browser only.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <footer className="px-8 lg:px-16 py-20 border-t border-stone-900 flex flex-col lg:flex-row items-center justify-between gap-8">
        <p className="text-sm text-stone-500 max-w-xs leading-relaxed italic" style={{ fontFamily: DISPLAY, fontSize: "1.05rem" }}>
          A LUT is a recipe. Every recipe deserves an attribution.
        </p>
        <ApertureStamp size={48} color="#e8dfd1" est="EST. 2026 · BROOKLYN" />
        <Link href="/" className="text-[10px] tracking-[0.4em] uppercase text-stone-400 hover:text-white" style={{ fontFamily: MONO }}>← HOME</Link>
      </footer>
    </main>
  );
}
