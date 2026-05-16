"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LUTS } from "@/lib/luts";
import { SAMPLE_IMAGES } from "@/lib/sample-images";
import { AlbumNav, Tick } from "@/components/album-chrome";

const DISPLAY = '"Cormorant Garamond", "Cormorant", Georgia, serif';
const MONO = "'IBM Plex Mono', monospace";

export default function IndexRoom() {
  const plates = SAMPLE_IMAGES.map((img, i) => ({ img, lut: LUTS[i % LUTS.length], n: i + 1 }));
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (open === null) return;
      if (e.key === "ArrowRight") setOpen((o) => Math.min(plates.length - 1, (o ?? 0) + 1));
      if (e.key === "ArrowLeft") setOpen((o) => Math.max(0, (o ?? 0) - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, plates.length]);

  return (
    <main className="bg-[#0a0807] text-[#e8dfd1] min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      <AlbumNav letter="E" name="Index" />

      <section className="pt-32 pb-10 px-8 lg:px-16 border-b border-stone-900">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-orange-200/70 mb-3" style={{ fontFamily: MONO }}>CONTACT SHEET · ROOM E</div>
            <h1 className="text-[clamp(2.5rem,5vw,5rem)] leading-[0.98] tracking-[-0.02em]" style={{ fontFamily: DISPLAY, fontWeight: 400 }}>
              The whole roll, <em className="italic text-orange-200/95" style={{ fontWeight: 300 }}>at a glance.</em>
            </h1>
          </div>
          <div className="text-right text-[10px] tracking-[0.4em] uppercase text-stone-500 max-w-xs" style={{ fontFamily: MONO }}>
            CLICK ANY TILE · ESC TO LEAVE
          </div>
        </div>
      </section>

      {/* Contact-sheet grid */}
      <section className="px-4 lg:px-10 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4">
          {plates.map((p, i) => (
            <motion.button
              key={p.img.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              onClick={() => setOpen(i)}
              className="group relative bg-black aspect-[4/5] overflow-hidden ring-1 ring-stone-900 hover:ring-orange-300/50 transition"
            >
              <img src={p.img.url} alt={p.img.caption} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ filter: p.lut.filter }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
              <div className="absolute top-2 left-2 text-[8px] tracking-[0.3em] uppercase text-white/80 px-1.5 py-0.5 bg-black/40 backdrop-blur" style={{ fontFamily: MONO }}>
                №{String(p.n).padStart(2, "0")}
              </div>
              <div className="absolute bottom-2 left-2 right-2">
                <div className="text-[10px] tracking-[-0.01em] truncate" style={{ fontFamily: DISPLAY, fontSize: "0.95rem" }}>{p.img.caption}</div>
                <div className="text-[8px] tracking-[0.25em] uppercase text-white/55 mt-0.5" style={{ fontFamily: MONO }}>{p.img.aperture} · {p.img.shutter} · {p.img.ei}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <footer className="px-8 lg:px-16 py-12 border-t border-stone-900 flex items-center justify-between text-[10px] tracking-[0.4em] uppercase text-stone-500" style={{ fontFamily: MONO }}>
        <span>CONTACT SHEET · {plates.length} FRAMES</span>
        <span>WILDLIGHT · ROOM E</span>
      </footer>

      <AnimatePresence>
        {open !== null && (
          <Exhibit plate={plates[open]} idx={open} total={plates.length} onClose={() => setOpen(null)} onPrev={() => setOpen(Math.max(0, open - 1))} onNext={() => setOpen(Math.min(plates.length - 1, open + 1))} />
        )}
      </AnimatePresence>
    </main>
  );
}

function Exhibit({ plate, idx, total, onClose, onPrev, onNext }: { plate: { img: (typeof SAMPLE_IMAGES)[number]; lut: (typeof LUTS)[number]; n: number }; idx: number; total: number; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur"
    >
      {/* Top HUD */}
      <div className="absolute top-0 inset-x-0 px-6 lg:px-12 py-4 flex items-center justify-between text-[10px] tracking-[0.4em] uppercase z-10" style={{ fontFamily: MONO }}>
        <span className="flex items-center gap-2 text-orange-200/90">
          <span className="block w-1.5 h-1.5 rounded-full bg-orange-300 animate-pulse" />
          №{String(plate.n).padStart(2, "0")} OF {String(total).padStart(2, "0")} · {plate.lut.name.toUpperCase()}
        </span>
        <button onClick={onClose} className="text-white/60 hover:text-white">ESC · CLOSE ✕</button>
      </div>

      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-[1fr_360px]">
        {/* Image — guaranteed contained, never overlapped */}
        <div className="relative flex items-center justify-center p-8 lg:p-16 min-h-0">
          <motion.div
            key={plate.img.id}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-full max-h-full"
          >
            <Tick className="-top-3 -left-3" rot={0} />
            <Tick className="-top-3 -right-3" rot={90} />
            <Tick className="-bottom-3 -right-3" rot={180} />
            <Tick className="-bottom-3 -left-3" rot={270} />
            <img src={plate.img.url} alt={plate.img.caption} className="block max-w-full max-h-[calc(100vh-8rem)] object-contain shadow-[0_60px_120px_-30px_rgba(0,0,0,0.95)]" style={{ filter: plate.lut.filter }} />
          </motion.div>

          {/* Prev/next floating */}
          <button onClick={onPrev} disabled={idx === 0} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur border border-white/15 hover:border-white/40 disabled:opacity-20 text-white/80">←</button>
          <button onClick={onNext} disabled={idx === total - 1} className="absolute right-4 lg:right-[380px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur border border-white/15 hover:border-white/40 disabled:opacity-20 text-white/80">→</button>
        </div>

        {/* Field card — fixed right rail */}
        <aside className="relative bg-[#0a0807] border-l border-stone-900 overflow-y-auto p-8 lg:p-10">
          <div className="text-[10px] tracking-[0.4em] uppercase text-orange-200/70 mb-3" style={{ fontFamily: MONO }}>FIELD CARD</div>
          <h2 className="tracking-[-0.02em] mb-2" style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem, 3.5vw, 3.2rem)", fontWeight: 400, lineHeight: 1.05 }}>
            {plate.img.caption}
          </h2>
          <div className="text-[10px] tracking-[0.4em] uppercase text-stone-500 mb-8" style={{ fontFamily: MONO }}>{plate.img.coords}</div>

          <dl className="space-y-3 text-[10px] tracking-[0.35em] uppercase" style={{ fontFamily: MONO }}>
            {[
              ["PHOTOGRAPHER", plate.img.photographer],
              ["DATE", plate.img.date],
              ["BODY", plate.img.camera],
              ["LENS", plate.img.lens],
              ["FOCAL", plate.img.focal],
              ["APERTURE", plate.img.aperture],
              ["SHUTTER", plate.img.shutter],
              ["EXPOSURE INDEX", plate.img.ei],
              ["WHITE BALANCE", plate.img.wb],
              ["GRADE", `${plate.lut.name} · ${plate.lut.family}`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 pb-2 border-b border-stone-900">
                <dt className="text-stone-500">{k}</dt>
                <dd className="text-white/85 text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </motion.div>
  );
}
