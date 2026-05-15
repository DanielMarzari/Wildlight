"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { LUTS, FAMILIES } from "@/lib/luts";
import { SAMPLE_IMAGES } from "@/lib/sample-images";

export function LutGrid() {
  const [family, setFamily] = useState<(typeof FAMILIES)[number]>("All");
  const filtered = family === "All" ? LUTS : LUTS.filter((l) => l.family === family);

  return (
    <section id="library" className="relative py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-white/50 mb-4">
              <span className="block w-6 h-px bg-twilight-300" />
              <span>The library</span>
            </div>
            <h2 className="font-display text-5xl lg:text-7xl tracking-[-0.02em] leading-[0.95]">
              Eight signatures.
              <br />
              <span className="italic text-twilight-300">Infinite weather.</span>
            </h2>
          </div>
          <p className="max-w-md text-white/60 leading-relaxed">
            Every LUT is graded against twenty reference scenes, from window-light
            portraits to high-altitude landscape. Hover a card to preview.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {FAMILIES.map((f) => (
            <button
              key={f}
              onClick={() => setFamily(f)}
              className={`px-4 py-2 rounded-full text-xs tracking-[0.18em] uppercase transition-all ${
                family === f
                  ? "bg-white text-ink-950"
                  : "border border-white/10 text-white/60 hover:text-white hover:border-white/30"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((lut, i) => {
            const img = SAMPLE_IMAGES[i % SAMPLE_IMAGES.length];
            return (
              <motion.article
                key={lut.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.04 }}
                className="group relative overflow-hidden rounded-2xl bg-ink-800 ring-1 ring-white/5 hover:ring-white/20 transition-all"
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img
                    src={img.url}
                    alt={lut.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    style={{ filter: lut.filter }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/20 to-transparent" />
                  <div className="card-glow absolute inset-0" />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    {lut.swatch.map((c, ci) => (
                      <span
                        key={ci}
                        className="w-3 h-3 rounded-full ring-1 ring-white/30"
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                  <div className="absolute top-3 right-3 text-[10px] tracking-[0.2em] uppercase text-white/70 bg-black/30 backdrop-blur px-2 py-1 rounded">
                    {lut.family}
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <div className="font-display text-2xl tracking-tight mb-1.5">{lut.name}</div>
                  <p className="text-xs text-white/60 leading-relaxed line-clamp-2">
                    {lut.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
