"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LUTS } from "@/lib/luts";
import { SAMPLE_IMAGES } from "@/lib/sample-images";
import { AlbumNav, Tick } from "@/components/album-chrome";

const DISPLAY = '"Cormorant Garamond", "Cormorant", Georgia, serif';
const MONO = "'IBM Plex Mono', monospace";

export default function Sequence() {
  const plates = SAMPLE_IMAGES.map((img, i) => ({ img, lut: LUTS[i % LUTS.length] }));
  const [active, setActive] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback((i: number) => {
    if (!scrollerRef.current) return;
    const w = scrollerRef.current.clientWidth;
    scrollerRef.current.scrollTo({ left: i * w, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const i = Math.round(el.scrollLeft / el.clientWidth);
          setActive(Math.max(0, Math.min(plates.length - 1, i)));
          ticking = false;
        });
      }
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [plates.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") scrollTo(Math.min(plates.length - 1, active + 1));
      else if (e.key === "ArrowLeft") scrollTo(Math.max(0, active - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, plates.length, scrollTo]);

  const cur = plates[active];

  return (
    <main className="h-screen bg-[#0a0807] text-[#e8dfd1] overflow-hidden" style={{ fontFamily: "Inter, sans-serif" }}>
      <AlbumNav letter="D" name="Sequence" />

      {/* Horizontal scroller — full-bleed below the nav, above the metadata strip */}
      <div ref={scrollerRef} className="absolute top-14 bottom-32 inset-x-0 overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex no-scrollbar">
        {plates.map((p) => (
          <section key={p.img.id} className="snap-center shrink-0 w-screen h-full flex items-center justify-center px-12 lg:px-24 py-8">
            <div className="relative max-w-full max-h-full">
              <img
                src={p.img.url}
                alt={p.img.caption}
                className="block max-w-full max-h-[calc(100vh-12rem)] object-contain"
                style={{ filter: p.lut.filter }}
              />
              <Tick className="-top-3 -left-3" rot={0} opacity={0.6} />
              <Tick className="-top-3 -right-3" rot={90} opacity={0.6} />
              <Tick className="-bottom-3 -right-3" rot={180} opacity={0.6} />
              <Tick className="-bottom-3 -left-3" rot={270} opacity={0.6} />
            </div>
          </section>
        ))}
      </div>

      {/* Persistent metadata strip — always at the bottom, never covered */}
      <motion.div
        key={cur.img.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-0 inset-x-0 z-20 backdrop-blur-xl bg-black/70 border-t border-white/10"
      >
        <div className="px-6 lg:px-12 py-5 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-orange-200/70 mb-2" style={{ fontFamily: MONO }}>
              <span>PLATE {String(active + 1).padStart(2, "0")} / {String(plates.length).padStart(2, "0")}</span>
              <span className="block w-6 h-px bg-orange-300/50" />
              <span>{cur.lut.name.toUpperCase()}</span>
            </div>
            <h2 className="tracking-[-0.02em]" style={{ fontFamily: DISPLAY, fontSize: "clamp(1.6rem, 3vw, 2.5rem)", fontWeight: 400, lineHeight: 1.05 }}>
              {cur.img.caption} <span className="text-white/40 text-base ml-2" style={{ fontFamily: MONO, letterSpacing: "0.2em" }}>{cur.img.coords}</span>
            </h2>
          </div>
          <div className="text-right text-[10px] tracking-[0.35em] uppercase text-white/55 space-y-1" style={{ fontFamily: MONO }}>
            <div>{cur.img.camera} · {cur.img.lens} · {cur.img.focal}</div>
            <div>{cur.img.aperture} · {cur.img.shutter} · {cur.img.ei} · {cur.img.wb} · {cur.img.date.toUpperCase()}</div>
          </div>
        </div>

        {/* Pager */}
        <div className="px-6 lg:px-12 py-3 border-t border-white/5 flex items-center justify-between gap-4">
          <button onClick={() => scrollTo(Math.max(0, active - 1))} disabled={active === 0} className="text-[10px] tracking-[0.4em] uppercase text-stone-400 hover:text-white disabled:opacity-30" style={{ fontFamily: MONO }}>← PREV</button>
          <div className="flex-1 flex items-center gap-1.5 justify-center">
            {plates.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Go to plate ${i + 1}`}
                className={`h-1.5 transition-all ${i === active ? "w-10 bg-orange-300" : "w-4 bg-white/20 hover:bg-white/40"}`}
              />
            ))}
          </div>
          <button onClick={() => scrollTo(Math.min(plates.length - 1, active + 1))} disabled={active === plates.length - 1} className="text-[10px] tracking-[0.4em] uppercase text-stone-400 hover:text-white disabled:opacity-30" style={{ fontFamily: MONO }}>NEXT →</button>
        </div>
      </motion.div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; }
      `}</style>
    </main>
  );
}
