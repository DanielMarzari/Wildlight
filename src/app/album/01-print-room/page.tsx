"use client";
import { motion } from "framer-motion";
import { LUTS } from "@/lib/luts";
import { SAMPLE_IMAGES } from "@/lib/sample-images";
import { AlbumNav, CaptionBlock, Tick } from "@/components/album-chrome";

const DISPLAY = '"Cormorant Garamond", "Cormorant", Georgia, serif';
const MONO = "'IBM Plex Mono', monospace";

export default function PrintRoom() {
  // Pair each frame with a LUT so the album doubles as the grade showcase
  const plates = SAMPLE_IMAGES.map((img, i) => ({ img, lut: LUTS[i % LUTS.length] }));

  return (
    <main className="bg-[#0a0807] text-[#e8dfd1] min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      <AlbumNav letter="A" name="Print Room" />

      <section className="pt-32 pb-16 px-6 lg:px-12 border-b border-stone-900">
        <div className="max-w-3xl mx-auto">
          <div className="text-[10px] tracking-[0.4em] uppercase text-orange-200/70 mb-3" style={{ fontFamily: MONO }}>SPRING MMXXVI · ROOM A</div>
          <h1 className="text-[clamp(2.5rem,5vw,5rem)] leading-[0.98] tracking-[-0.02em]" style={{ fontFamily: DISPLAY, fontWeight: 400 }}>
            <em className="italic text-orange-200/90" style={{ fontWeight: 300 }}>Six photographs,</em><br/>printed in sequence.
          </h1>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12">
        <div className="max-w-3xl mx-auto space-y-28 lg:space-y-40">
          {plates.map((p, i) => (
            <motion.figure
              key={p.img.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative">
                <img
                  src={p.img.url}
                  alt={p.img.caption}
                  className="block w-full h-auto"
                  style={{ filter: p.lut.filter }}
                />
                <Tick className="-top-2 -left-2" rot={0} opacity={0.5} />
                <Tick className="-top-2 -right-2" rot={90} opacity={0.5} />
                <Tick className="-bottom-2 -right-2" rot={180} opacity={0.5} />
                <Tick className="-bottom-2 -left-2" rot={270} opacity={0.5} />
              </div>
              <figcaption className="mt-6 pt-5 border-t border-stone-900">
                <div className="text-[10px] tracking-[0.4em] uppercase text-orange-200/60 mb-3" style={{ fontFamily: MONO }}>
                  PLATE {String(i + 1).padStart(2, "0")} OF {String(plates.length).padStart(2, "0")} · {p.lut.name.toUpperCase()}
                </div>
                <CaptionBlock img={p.img} dense />
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      <footer className="px-6 lg:px-12 py-20 border-t border-stone-900 text-center">
        <p className="text-sm text-stone-500 italic max-w-xl mx-auto" style={{ fontFamily: DISPLAY, fontSize: "1.1rem" }}>
          Walk back through with cleaner eyes. The light hasn't moved.
        </p>
      </footer>
    </main>
  );
}
