"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { LUTS } from "@/lib/luts";
import { SAMPLE_IMAGES, HERO_IMAGE } from "@/lib/sample-images";

const PAGE_BG = "#ebe7e0";
const INK = "#0a0a0a";

export default function Magazine() {
  return (
    <main className="min-h-screen overflow-x-hidden" style={{ background: PAGE_BG, color: INK, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=DM+Mono:wght@400;500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <TopBar />

      {/* Issue masthead */}
      <section className="px-6 lg:px-10 pt-24 pb-6 border-b-2 border-black">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <h1 className="leading-[0.85] tracking-[-0.04em] text-[clamp(5rem,18vw,18rem)]" style={{ fontFamily: '"Bodoni Moda", "Didot", serif', fontWeight: 800 }}>
            Wildlight
          </h1>
          <div className="text-right" style={{ fontFamily: "'DM Mono', monospace" }}>
            <div className="text-[10px] tracking-[0.3em] uppercase">Quarterly · No. 03</div>
            <div className="text-[10px] tracking-[0.3em] uppercase mt-1">Spring · MMXXVI</div>
            <div className="text-[10px] tracking-[0.3em] uppercase mt-1">$24 · 144 pages</div>
          </div>
        </div>
        <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: "'DM Mono', monospace" }}>
          <span>A quarterly on light, color, and the photographers who chase both.</span>
          <span>ISSN 4773-2912</span>
        </div>
      </section>

      {/* Cover spread */}
      <section className="px-6 lg:px-10 pt-10 pb-24 grid grid-cols-12 gap-6 border-b border-black/20">
        <div className="col-span-12 lg:col-span-8 relative">
          <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-black/15" />
          <div className="text-[10px] tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>
            ⌜ COVER STORY · pp. 14–47 ⌝
          </div>
          <h2 className="text-[clamp(3rem,8vw,9rem)] leading-[0.85] tracking-[-0.03em] mb-8" style={{ fontFamily: '"Bodoni Moda", "Didot", serif', fontStyle: "italic", fontWeight: 500 }}>
            The Color of a
            <br />
            Long Afternoon.
          </h2>
          <div className="grid grid-cols-2 gap-8 max-w-2xl text-base leading-[1.7]" style={{ fontFamily: '"Bodoni Moda", serif' }}>
            <p>
              <span className="float-left text-7xl pr-2 leading-[0.85] -mt-1" style={{ fontFamily: '"Bodoni Moda", serif', fontWeight: 700 }}>L</span>
              ight, like time, refuses to be hurried. The Wildlight workshop has
              spent two years cataloguing the way a single afternoon collapses —
              from sodium to amber, amber to violet, violet to nothing.
            </p>
            <p>
              These eight LUTs are not filters but field recordings. Each one
              survived twenty reference scenes, a calibrated print, and a
              twelve-hour wait under tungsten before earning its number. Inside:
              the studio, the suite, and a small grammar for color.
            </p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 relative">
          <img src={HERO_IMAGE} alt="" className="block w-full aspect-[3/4] object-cover" style={{ filter: "contrast(1.1) saturate(1.05)" }} />
          <div className="absolute -bottom-2 -right-2 bg-black text-white px-3 py-2 text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>
            Plate 014 · Ridge / dawn
          </div>
        </div>
      </section>

      {/* Section: TOC */}
      <section className="px-6 lg:px-10 py-16 grid grid-cols-12 gap-6 border-b border-black/20">
        <div className="col-span-12 lg:col-span-3">
          <div className="text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>
            ⌜ INSIDE THIS ISSUE ⌝
          </div>
        </div>
        <ol className="col-span-12 lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2 text-lg" style={{ fontFamily: '"Bodoni Moda", serif' }}>
          {[
            ["14", "The Color of a Long Afternoon"],
            ["28", "Eight Signatures, One Grammar"],
            ["46", "Inside the Atelier"],
            ["62", "How Skin Survives a Grade"],
            ["80", "A Field Guide to Reference Frames"],
            ["98", "The Print Test"],
            ["114", "Conversations: 4 photographers"],
            ["132", "Letters · Errata · Colophon"],
          ].map(([pg, t]) => (
            <li key={pg} className="flex items-baseline gap-3 border-b border-dotted border-black/30 py-2">
              <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-xs">{pg}</span>
              <span className="italic flex-1">{t}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Plates grid */}
      <section className="px-6 lg:px-10 py-24 border-b border-black/20">
        <div className="text-[10px] tracking-[0.3em] uppercase mb-8" style={{ fontFamily: "'DM Mono', monospace" }}>
          ⌜ THE EIGHT · pp. 28–45 ⌝
        </div>
        <h3 className="text-[clamp(3rem,7vw,7rem)] tracking-[-0.03em] leading-[0.9] mb-16" style={{ fontFamily: '"Bodoni Moda", serif', fontWeight: 600 }}>
          A grammar of <span style={{ fontStyle: "italic" }}>light.</span>
        </h3>

        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          {LUTS.map((l, i) => (
            <Plate key={l.id} lut={l} image={SAMPLE_IMAGES[i % SAMPLE_IMAGES.length].url} idx={i} />
          ))}
        </div>
      </section>

      <Studio />

      {/* Pull quote spread */}
      <section className="px-6 lg:px-10 py-32 border-b border-black/20 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-start-2 lg:col-span-10">
          <div className="text-[10px] tracking-[0.3em] uppercase mb-8" style={{ fontFamily: "'DM Mono', monospace" }}>
            ⌜ A PHOTOGRAPHER, ON HER WORK ⌝
          </div>
          <blockquote className="text-[clamp(2rem,5.5vw,5.5rem)] leading-[1.05] tracking-[-0.02em]" style={{ fontFamily: '"Bodoni Moda", serif', fontStyle: "italic", fontWeight: 400 }}>
            "I don't <span style={{ fontStyle: "normal" }}>grade</span> a frame
            so much as I <span style={{ fontStyle: "normal" }}>remember</span>{" "}
            what the room felt like. The LUT is just the shape of the memory."
          </blockquote>
          <div className="mt-8 flex items-center gap-4" style={{ fontFamily: "'DM Mono', monospace" }}>
            <div className="h-px w-12 bg-black" />
            <div className="text-[10px] tracking-[0.3em] uppercase">A. WEXLER · pp. 116</div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function TopBar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#ebe7e0] border-b-2 border-black">
      <nav className="h-12 px-6 lg:px-10 flex items-center justify-between" style={{ fontFamily: "'DM Mono', monospace" }}>
        <Link href="/mockups" className="text-[10px] tracking-[0.3em] uppercase hover:underline">← MOCKUPS</Link>
        <div className="text-xs tracking-[0.15em] uppercase font-medium">Wildlight Quarterly</div>
        <div className="text-[10px] tracking-[0.3em] uppercase">04 · MAGAZINE</div>
      </nav>
    </header>
  );
}

function Plate({ lut, image, idx }: { lut: (typeof LUTS)[number]; image: string; idx: number }) {
  // alternate large/small/positions for asymmetric grid
  const layouts = [
    "col-span-12 lg:col-span-7",
    "col-span-12 sm:col-span-6 lg:col-span-5",
    "col-span-12 sm:col-span-6 lg:col-span-4",
    "col-span-12 sm:col-span-6 lg:col-span-8",
    "col-span-12 sm:col-span-6 lg:col-span-6",
    "col-span-12 sm:col-span-6 lg:col-span-6",
    "col-span-12 lg:col-span-5",
    "col-span-12 lg:col-span-7",
  ];
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: idx * 0.05 }}
      className={`${layouts[idx % layouts.length]} group`}
    >
      <div className="relative overflow-hidden">
        <img src={image} alt="" className="block w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-[1.03]" style={{ filter: lut.filter }} />
        <div className="absolute top-3 left-3 bg-[#ebe7e0] text-black px-2 py-1 text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>
          PL. {String(idx + 1).padStart(2, "0")}
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between gap-4 border-t border-black/30 pt-2">
        <div>
          <h4 className="text-3xl tracking-[-0.02em]" style={{ fontFamily: '"Bodoni Moda", serif', fontWeight: 600 }}>{lut.name}</h4>
          <p className="mt-1 text-sm max-w-md leading-relaxed" style={{ fontFamily: '"Bodoni Moda", serif' }}>{lut.description}</p>
        </div>
        <div className="text-[10px] tracking-[0.3em] uppercase whitespace-nowrap" style={{ fontFamily: "'DM Mono', monospace" }}>{lut.family}</div>
      </div>
    </motion.article>
  );
}

/* ========= STUDIO MOCKUP ========= */
function Studio() {
  const [lut, setLut] = useState(LUTS[2]);
  const [img, setImg] = useState(SAMPLE_IMAGES[1]);
  return (
    <section className="px-6 lg:px-10 py-24 border-b border-black/20 bg-[#1a1a1a] text-white">
      <div className="text-[10px] tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>
        ⌜ FEATURE · THE STUDIO · pp. 46–61 ⌝
      </div>
      <h3 className="text-[clamp(3rem,7vw,7rem)] tracking-[-0.03em] leading-[0.9] mb-12" style={{ fontFamily: '"Bodoni Moda", serif', fontWeight: 600 }}>
        Inside the <span style={{ fontStyle: "italic" }}>atelier.</span>
      </h3>

      <div className="grid grid-cols-12 gap-4">
        {/* Left: tool palette */}
        <aside className="col-span-12 lg:col-span-2 border border-white/15 p-4">
          <div className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'DM Mono', monospace" }}>Tools</div>
          <div className="grid grid-cols-3 lg:grid-cols-2 gap-1">
            {["⊞","◐","◇","▣","◍","ϟ","◎","⊕","◈","✦","♢","✕"].map((s, i) => (
              <button key={i} className={`aspect-square flex items-center justify-center text-lg border ${i === 2 ? "bg-white text-black" : "border-white/20 text-white/70 hover:border-white"}`}>{s}</button>
            ))}
          </div>

          <div className="text-[10px] tracking-[0.3em] uppercase mt-6 mb-3" style={{ fontFamily: "'DM Mono', monospace" }}>Swatches</div>
          <div className="grid grid-cols-3 gap-1">
            {LUTS.flatMap(l => l.swatch).map((c, i) => (
              <div key={i} className="aspect-square" style={{ background: c }} />
            ))}
          </div>
        </aside>

        {/* Center: spread layout */}
        <div className="col-span-12 lg:col-span-7 border border-white/15 bg-[#222] p-4 lg:p-8">
          <div className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'DM Mono', monospace" }}>
            Layout · double-truck · {img.caption}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <img src={img.url} alt="" className="block w-full aspect-[4/5] object-cover" />
              <div className="text-[10px] mt-2 italic" style={{ fontFamily: '"Bodoni Moda", serif' }}>↑ Before — {img.caption}, untouched</div>
            </div>
            <div>
              <img src={img.url} alt="" className="block w-full aspect-[4/5] object-cover" style={{ filter: lut.filter }} />
              <div className="text-[10px] mt-2 italic" style={{ fontFamily: '"Bodoni Moda", serif' }}>↑ After — applied {lut.name}</div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-12 gap-4 text-xs">
            <div className="col-span-12 sm:col-span-4">
              <div className="tracking-[0.3em] uppercase text-white/60 mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>Caption</div>
              <p className="leading-relaxed" style={{ fontFamily: '"Bodoni Moda", serif' }}>{img.caption} — {img.photographer}. Graded with {lut.name}. Reference frame №14.</p>
            </div>
            <div className="col-span-12 sm:col-span-4">
              <div className="tracking-[0.3em] uppercase text-white/60 mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>Pull quote</div>
              <p className="italic text-lg leading-tight" style={{ fontFamily: '"Bodoni Moda", serif' }}>"It's the cold of the morning, not the morning itself."</p>
            </div>
            <div className="col-span-12 sm:col-span-4">
              <div className="tracking-[0.3em] uppercase text-white/60 mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>Folio</div>
              <p className="font-mono leading-relaxed">No. 03 · Spring MMXXVI · pp. 48 · ƒ8 1/125s ISO200 · Hasselblad X2D</p>
            </div>
          </div>
        </div>

        {/* Right: inspector */}
        <aside className="col-span-12 lg:col-span-3 border border-white/15 p-4 space-y-6">
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'DM Mono', monospace" }}>Photo bin</div>
            <div className="grid grid-cols-3 gap-1">
              {SAMPLE_IMAGES.map((s) => (
                <button key={s.id} onClick={() => setImg(s)} className={`aspect-square overflow-hidden border ${s.id === img.id ? "border-white border-2" : "border-white/20"}`}>
                  <img src={s.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'DM Mono', monospace" }}>Plates</div>
            <div className="space-y-0">
              {LUTS.map((l, i) => (
                <button key={l.id} onClick={() => setLut(l)} className={`w-full flex items-baseline gap-2 py-1.5 border-b border-white/10 text-left ${l.id === lut.id ? "text-white" : "text-white/50 hover:text-white"}`}>
                  <span className="font-mono text-[9px]" style={{ fontFamily: "'DM Mono', monospace" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="italic flex-1 text-sm" style={{ fontFamily: '"Bodoni Moda", serif' }}>{l.name}</span>
                  <span className="flex gap-0.5">{l.swatch.map((c, ci) => <span key={ci} className="w-1.5 h-3" style={{ background: c }} />)}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'DM Mono', monospace" }}>Paragraph style</div>
            <div className="text-xs space-y-1" style={{ fontFamily: '"Bodoni Moda", serif' }}>
              <div className="flex justify-between"><span className="italic">Body</span><span className="font-mono text-white/40">12/16</span></div>
              <div className="flex justify-between"><span className="italic">Pull quote</span><span className="font-mono text-white/40">24/24</span></div>
              <div className="flex justify-between"><span className="italic">Caption</span><span className="font-mono text-white/40">9/12</span></div>
              <div className="flex justify-between"><span className="italic">Folio</span><span className="font-mono text-white/40">7/10</span></div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 lg:px-10 py-12">
      <div className="grid grid-cols-12 gap-6 mb-8">
        <div className="col-span-12 lg:col-span-6">
          <div className="text-[clamp(2rem,4vw,3.5rem)] leading-[0.9] tracking-[-0.03em]" style={{ fontFamily: '"Bodoni Moda", serif', fontWeight: 600 }}>
            Subscribe. Print or digital.
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6 flex flex-wrap gap-2 items-center justify-end" style={{ fontFamily: "'DM Mono', monospace" }}>
          <Link href="/mockups" className="text-[10px] tracking-[0.3em] uppercase border border-black px-4 py-2 hover:bg-black hover:text-[#ebe7e0]">← MOCKUPS</Link>
          <button className="text-[10px] tracking-[0.3em] uppercase border border-black px-4 py-2 hover:bg-black hover:text-[#ebe7e0]">SUBSCRIBE — $96/yr</button>
        </div>
      </div>
      <div className="border-t-2 border-black pt-3 flex justify-between text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: "'DM Mono', monospace" }}>
        <span>© Wildlight Quarterly · MMXXVI</span>
        <span>Set in Bodoni Moda &amp; DM Mono</span>
      </div>
    </footer>
  );
}
