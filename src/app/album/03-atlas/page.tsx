"use client";
import { motion } from "framer-motion";
import { LUTS } from "@/lib/luts";
import { SAMPLE_IMAGES } from "@/lib/sample-images";
import { AlbumNav, Tick } from "@/components/album-chrome";

const DISPLAY = '"Cormorant Garamond", "Cormorant", Georgia, serif';
const MONO = "'IBM Plex Mono', monospace";

export default function Atlas() {
  const plates = SAMPLE_IMAGES.map((img, i) => ({ img, lut: LUTS[i % LUTS.length] }));

  return (
    <main className="bg-[#0a0807] text-[#e8dfd1] min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      <AlbumNav letter="C" name="Atlas" />

      <section className="pt-32 pb-10 px-8 lg:px-16 border-b border-stone-900">
        <div className="text-[10px] tracking-[0.4em] uppercase text-orange-200/70 mb-3" style={{ fontFamily: MONO }}>ATLAS · ROOM C · MMXXVI</div>
        <h1 className="text-[clamp(2.5rem,5vw,5rem)] leading-[0.98] tracking-[-0.02em] max-w-3xl" style={{ fontFamily: DISPLAY, fontWeight: 400 }}>
          A page <em className="italic text-orange-200/95" style={{ fontWeight: 300 }}>per place.</em>
        </h1>
      </section>

      <div className="divide-y divide-stone-900">
        {plates.map((p, i) => (
          <Spread key={p.img.id} idx={i} total={plates.length} img={p.img} lut={p.lut} flipped={i % 2 === 1} />
        ))}
      </div>

      <footer className="px-8 lg:px-16 py-16 border-t border-stone-900 flex items-center justify-between text-[10px] tracking-[0.4em] uppercase text-stone-500" style={{ fontFamily: MONO }}>
        <span>END OF ATLAS</span>
        <span>WILDLIGHT · ROOM C</span>
      </footer>
    </main>
  );
}

function Spread({ idx, total, img, lut, flipped }: { idx: number; total: number; img: (typeof SAMPLE_IMAGES)[number]; lut: (typeof LUTS)[number]; flipped: boolean }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="px-8 lg:px-16 py-20 lg:py-32"
    >
      <div className={`grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-center ${flipped ? "lg:[&>*:first-child]:order-2" : ""}`}>
        {/* Image side */}
        <div className="relative">
          <img src={img.url} alt={img.caption} className="block w-full h-auto" style={{ filter: lut.filter }} />
          <Tick className="-top-2 -left-2" rot={0} opacity={0.55} />
          <Tick className="-top-2 -right-2" rot={90} opacity={0.55} />
          <Tick className="-bottom-2 -right-2" rot={180} opacity={0.55} />
          <Tick className="-bottom-2 -left-2" rot={270} opacity={0.55} />
        </div>

        {/* Text side */}
        <div className="lg:px-6">
          <div className="flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-orange-200/70 mb-6" style={{ fontFamily: MONO }}>
            <span>PAGE {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
            <span className="block w-6 h-px bg-orange-300/50" />
            <span>{lut.name.toUpperCase()}</span>
          </div>

          <h2 className="text-[clamp(2.5rem,4vw,4.5rem)] leading-[0.98] tracking-[-0.02em] mb-4" style={{ fontFamily: DISPLAY, fontWeight: 400 }}>
            {img.caption}
          </h2>
          <div className="text-[10px] tracking-[0.4em] uppercase text-stone-500 mb-10" style={{ fontFamily: MONO }}>
            {img.coords} · {img.date.toUpperCase()}
          </div>

          {/* Field card */}
          <dl className="space-y-2 text-[10px] tracking-[0.35em] uppercase border border-stone-900 p-5">
            {[
              ["PHOTOGRAPHER", img.photographer],
              ["BODY", img.camera],
              ["LENS", `${img.lens} · ${img.focal}`],
              ["APERTURE", img.aperture],
              ["SHUTTER", img.shutter],
              ["EI / WB", `${img.ei} · ${img.wb}`],
              ["GRADE", `${lut.name} · ${lut.family}`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4" style={{ fontFamily: MONO }}>
                <dt className="text-stone-500">{k}</dt>
                <dd className="text-white/80 text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </motion.section>
  );
}
