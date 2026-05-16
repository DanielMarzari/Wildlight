"use client";
import { motion } from "framer-motion";
import { LUTS } from "@/lib/luts";
import { SAMPLE_IMAGES } from "@/lib/sample-images";
import { AlbumNav, Tick } from "@/components/album-chrome";

const DISPLAY = '"Cormorant Garamond", "Cormorant", Georgia, serif';
const MONO = "'IBM Plex Mono', monospace";

export default function MuseumWall() {
  const plates = SAMPLE_IMAGES.map((img, i) => ({ img, lut: LUTS[i % LUTS.length] }));

  return (
    <main className="bg-[#0a0807] text-[#e8dfd1] min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      <AlbumNav letter="B" name="Museum Wall" />

      <section className="pt-32 pb-12 px-8 lg:px-16 border-b border-stone-900">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-orange-200/70 mb-3" style={{ fontFamily: MONO }}>EXHIBITION I · ROOM B</div>
            <h1 className="text-[clamp(2.5rem,5vw,5rem)] leading-[0.98] tracking-[-0.02em]" style={{ fontFamily: DISPLAY, fontWeight: 400 }}>
              Hung at <em className="italic text-orange-200/95" style={{ fontWeight: 300 }}>eye level.</em>
            </h1>
          </div>
          <div className="text-right text-[10px] tracking-[0.4em] uppercase text-stone-500 max-w-xs" style={{ fontFamily: MONO }}>
            <div>SIX PLATES · UNIFORM 4:5</div>
            <div className="mt-1">EVENLY SPACED · MATTED IN BLACK</div>
          </div>
        </div>
      </section>

      <section className="px-8 lg:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-x-14 gap-y-20">
          {plates.map((p, i) => (
            <motion.figure
              key={p.img.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col"
            >
              <div className="relative bg-black p-2 ring-1 ring-stone-900">
                <div className="relative overflow-hidden">
                  <img src={p.img.url} alt={p.img.caption} className="block w-full aspect-[4/5] object-cover" style={{ filter: p.lut.filter }} />
                  <Tick className="top-2 left-2" rot={0} opacity={0.55} />
                  <Tick className="top-2 right-2" rot={90} opacity={0.55} />
                  <Tick className="bottom-2 right-2" rot={180} opacity={0.55} />
                  <Tick className="bottom-2 left-2" rot={270} opacity={0.55} />
                </div>
              </div>

              {/* Plaque */}
              <div className="mt-5 px-1">
                <div className="text-[10px] tracking-[0.4em] uppercase text-orange-200/70 mb-2" style={{ fontFamily: MONO }}>
                  №{String(i + 1).padStart(2, "0")} · {p.lut.name.toUpperCase()}
                </div>
                <div className="tracking-[-0.02em] mb-1" style={{ fontFamily: DISPLAY, fontSize: "1.5rem", fontWeight: 400, lineHeight: 1.1 }}>
                  {p.img.caption}
                </div>
                <div className="text-[10px] tracking-[0.35em] uppercase text-stone-500 mb-3" style={{ fontFamily: MONO }}>
                  {p.img.coords}
                </div>
                <div className="pt-3 border-t border-stone-900 space-y-1 text-[10px] tracking-[0.3em] uppercase text-white/55" style={{ fontFamily: MONO }}>
                  <div className="flex justify-between"><span>BODY</span><span>{p.img.camera}</span></div>
                  <div className="flex justify-between"><span>LENS</span><span>{p.img.lens} · {p.img.focal}</span></div>
                  <div className="flex justify-between"><span>EXP</span><span>{p.img.aperture} · {p.img.shutter}</span></div>
                  <div className="flex justify-between"><span>EI / WB</span><span>{p.img.ei} · {p.img.wb}</span></div>
                </div>
              </div>
            </motion.figure>
          ))}
        </div>
      </section>

      <footer className="px-8 lg:px-16 py-16 border-t border-stone-900 flex items-center justify-between text-[10px] tracking-[0.4em] uppercase text-stone-500" style={{ fontFamily: MONO }}>
        <span>END OF EXHIBITION I</span>
        <span>WILDLIGHT · ROOM B · MUSEUM WALL</span>
      </footer>
    </main>
  );
}
