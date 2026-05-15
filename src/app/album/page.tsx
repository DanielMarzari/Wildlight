"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LUTS, type Lut } from "@/lib/luts";
import { SAMPLE_IMAGES } from "@/lib/sample-images";
import { ApertureInline, ApertureStamp } from "@/components/brand";

const DISPLAY = '"Cormorant Garamond", "Cormorant", "EB Garamond", Georgia, serif';
const MONO = "'IBM Plex Mono', monospace";

export default function AlbumPage() {
  const [selected, setSelected] = useState<{ lut: Lut; imgIdx: number } | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="bg-[#0a0807] text-[#e8dfd1] min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&display=swap" rel="stylesheet" />

      {/* Top bar */}
      <header className="fixed top-0 inset-x-0 z-30 backdrop-blur bg-black/40 border-b border-white/5">
        <nav className="h-14 px-6 lg:px-12 flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition">
            <ApertureInline size={20} color="#e8dfd1" textClass="text-base" />
          </Link>
          <div className="hidden md:flex items-center gap-8 text-[10px] tracking-[0.4em] uppercase text-stone-400" style={{ fontFamily: MONO }}>
            <Link href="/album" className="text-white transition">ALBUM</Link>
            <Link href="/atelier" className="hover:text-white transition">ATELIER</Link>
            <Link href="/studios/c-cell" className="hover:text-white transition">STUDIO</Link>
            <Link href="/logos" className="hover:text-white transition">LOGOS</Link>
          </div>
          <Link href="/studios/c-cell" className="text-[10px] tracking-[0.4em] uppercase border border-white/15 hover:border-white/40 px-4 py-2 rounded-sm transition text-white/90" style={{ fontFamily: MONO }}>OPEN STUDIO →</Link>
        </nav>
      </header>

      {/* Masthead */}
      <section className="pt-32 pb-12 px-8 lg:px-16 border-b border-stone-900">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-orange-200/70 mb-4" style={{ fontFamily: MONO }}>
          <span className="block w-6 h-px bg-orange-300" />
          <span>THE ALBUM · EIGHT PLATES</span>
        </div>
        <div className="flex items-end justify-between flex-wrap gap-6">
          <h1 className="text-[clamp(3rem,8vw,8rem)] leading-[0.92] tracking-[-0.02em] max-w-4xl" style={{ fontFamily: DISPLAY, fontWeight: 400 }}>
            Each grade, <em className="italic text-orange-200/95" style={{ fontWeight: 300 }}>printed.</em>
          </h1>
          <p className="max-w-md text-white/60 leading-relaxed text-base">
            The album is the gallery. Hover any plate to see it move. Click to
            walk inside — the photograph fills the room, the grade speaks for
            itself, and the technical sheet sits where you can read it.
          </p>
        </div>
      </section>

      {/* Plate grid — varied scale, asymmetric like a hung wall */}
      <section className="px-4 lg:px-12 py-20">
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          {LUTS.map((l, i) => {
            // alternating spans for asymmetric layout
            const spans = [
              "col-span-12 md:col-span-7",
              "col-span-12 md:col-span-5",
              "col-span-12 md:col-span-5",
              "col-span-12 md:col-span-7",
              "col-span-12 md:col-span-6",
              "col-span-12 md:col-span-6",
              "col-span-12 md:col-span-8",
              "col-span-12 md:col-span-4",
            ];
            return (
              <Plate key={l.id} lut={l} idx={i} className={spans[i % spans.length]} onClick={() => setSelected({ lut: l, imgIdx: i })} />
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 lg:px-16 py-20 border-t border-stone-900 flex flex-col lg:flex-row items-center justify-between gap-8">
        <p className="text-sm text-stone-500 max-w-xs leading-relaxed italic" style={{ fontFamily: DISPLAY, fontSize: "1.05rem" }}>
          Each plate is hung, lit, and printed once. If it moves you, click in.
        </p>
        <ApertureStamp size={48} color="#e8dfd1" est="EST. 2026 · BROOKLYN" />
        <Link href="/" className="text-[10px] tracking-[0.4em] uppercase text-stone-400 hover:text-white" style={{ fontFamily: MONO }}>← HOME</Link>
      </footer>

      {/* Immersive viewer */}
      <AnimatePresence>
        {selected && <Immersive lut={selected.lut} startImgIdx={selected.imgIdx} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </main>
  );
}

function Plate({ lut, idx, className, onClick }: { lut: Lut; idx: number; className: string; onClick: () => void }) {
  const img = SAMPLE_IMAGES[idx % SAMPLE_IMAGES.length];
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative block text-left ${className}`}
    >
      <div className="relative overflow-hidden bg-[#080605]">
        <img
          src={img.url}
          alt={lut.name}
          className="block w-full aspect-[3/4] object-cover transition-transform duration-1000 group-hover:scale-105"
          style={{ filter: lut.filter }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
        {/* corner ticks */}
        <Tick className="top-3 left-3" rot={0} />
        <Tick className="top-3 right-3" rot={90} />
        <Tick className="bottom-3 right-3" rot={180} />
        <Tick className="bottom-3 left-3" rot={270} />
      </div>

      {/* Caption strip */}
      <div className="relative pt-4 flex items-end justify-between gap-4">
        <div>
          <div className="text-[10px] tracking-[0.4em] uppercase text-orange-200/70 mb-2" style={{ fontFamily: MONO }}>
            PLATE №{String(idx + 1).padStart(2, "0")} · {lut.family.toUpperCase()}
          </div>
          <h2 className="tracking-[-0.02em]" style={{ fontFamily: DISPLAY, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 400 }}>
            {lut.name}
          </h2>
        </div>
        <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-white/40 group-hover:text-white/80 transition pb-2" style={{ fontFamily: MONO }}>
          <span>STEP IN</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </motion.button>
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

/* ===== Immersive single-plate exhibit ===== */
function Immersive({ lut, startImgIdx, onClose }: { lut: Lut; startImgIdx: number; onClose: () => void }) {
  const [imgIdx, setImgIdx] = useState(startImgIdx);
  const [showOriginal, setShowOriginal] = useState(false);
  const img = SAMPLE_IMAGES[imgIdx % SAMPLE_IMAGES.length];

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
    >
      {/* image */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-[88vw] max-h-[80vh]"
      >
        <Tick className="-top-3 -left-3" rot={0} />
        <Tick className="-top-3 -right-3" rot={90} />
        <Tick className="-bottom-3 -right-3" rot={180} />
        <Tick className="-bottom-3 -left-3" rot={270} />
        <img
          src={img.url}
          alt={lut.name}
          className="block max-w-[88vw] max-h-[80vh] object-contain shadow-[0_60px_120px_-30px_rgba(0,0,0,0.95)] transition-[filter] duration-300"
          style={{ filter: showOriginal ? "none" : lut.filter }}
        />
      </motion.div>

      {/* Top HUD: plate label */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute top-6 inset-x-6 flex items-center justify-between text-[10px] tracking-[0.4em] uppercase"
        style={{ fontFamily: MONO }}
      >
        <span className="flex items-center gap-2 text-orange-200/90">
          <span className="block w-1.5 h-1.5 rounded-full bg-orange-300 animate-pulse" />
          PLATE №{String(startImgIdx + 1).padStart(2, "0")} · {lut.family.toUpperCase()}
        </span>
        <button onClick={onClose} className="text-white/60 hover:text-white">ESC · CLOSE ✕</button>
      </motion.div>

      {/* Bottom plaque */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute bottom-6 inset-x-6 max-w-5xl mx-auto"
      >
        <div className="grid grid-cols-[1fr_auto_auto] gap-6 items-end">
          <div>
            <h2 className="tracking-[-0.02em]" style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 400, lineHeight: 1 }}>
              {showOriginal ? "Original" : <>{lut.name} <em className="italic text-orange-200/80" style={{ fontWeight: 300, fontSize: "0.7em" }}>— {lut.family.toLowerCase()}</em></>}
            </h2>
            <p className="mt-3 text-sm text-white/60 max-w-xl leading-relaxed">{lut.description}</p>
          </div>

          {/* Frame switcher */}
          <div className="flex gap-1.5">
            {SAMPLE_IMAGES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setImgIdx(i)}
                className={`w-12 h-12 overflow-hidden rounded-sm ring-1 transition ${i === imgIdx ? "ring-orange-300 ring-2" : "ring-white/20 hover:ring-white/50"}`}
                aria-label={s.caption}
              >
                <img src={s.url} alt="" className="w-full h-full object-cover" style={{ filter: lut.filter }} />
              </button>
            ))}
          </div>

          {/* Action stack */}
          <div className="flex flex-col gap-1.5 text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: MONO }}>
            <button
              onMouseDown={() => setShowOriginal(true)}
              onMouseUp={() => setShowOriginal(false)}
              onMouseLeave={() => setShowOriginal(false)}
              className="border border-white/15 hover:border-white/40 px-4 py-2 rounded-sm transition text-white/80"
            >
              HOLD · COMPARE
            </button>
            <Link href={`/studios/c-cell?lut=${lut.id}`} className="bg-orange-300 hover:bg-orange-200 text-black px-4 py-2 rounded-sm transition text-center">
              OPEN IN STUDIO →
            </Link>
          </div>
        </div>

        {/* metadata strip */}
        <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-6 text-[10px] tracking-[0.4em] uppercase text-white/45" style={{ fontFamily: MONO }}>
          <span>{img.caption.toUpperCase()} · {img.photographer.toUpperCase()}</span>
          <span>EI 200 · ƒ8 · 1/125 · 3200K · RAW · 16-BIT REC.2020</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
