"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { LUTS } from "@/lib/luts";
import { SAMPLE_IMAGES } from "@/lib/sample-images";

export function EditorPreview() {
  const [lut, setLut] = useState(LUTS[0]);
  const [img, setImg] = useState(SAMPLE_IMAGES[0]);
  const [intensity, setIntensity] = useState(100);

  const filterWithIntensity =
    intensity === 100 ? lut.filter : `${lut.filter} opacity(${intensity}%)`;

  return (
    <section id="studio-preview" className="relative py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-white/50 mb-4">
          <span className="block w-6 h-px bg-ember-300" />
          <span>The studio</span>
        </div>
        <h2 className="font-display text-5xl lg:text-7xl tracking-[-0.02em] leading-[0.95] mb-4">
          Edit in the <em className="italic text-ember-300">browser.</em>
        </h2>
        <p className="text-white/60 leading-relaxed max-w-xl mb-12">
          No installer. No render queue. Drop a frame, pick a LUT, dial the
          intensity, export at full resolution.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-[1fr_300px] gap-6 rounded-3xl bg-ink-900/80 backdrop-blur ring-1 ring-white/10 p-3 lg:p-4 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]"
        >
          {/* Viewport */}
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-ink-950">
            <img
              src={img.url}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-[filter] duration-300"
              style={{ filter: filterWithIntensity }}
            />
            <div className="absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase bg-black/40 backdrop-blur px-2 py-1 rounded text-white/70">
              {img.caption} · {img.photographer}
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/40 backdrop-blur rounded-lg px-4 py-2.5 text-xs">
              <span className="text-white/70">
                <span className="font-mono text-ember-200">{lut.name}</span> · {lut.family}
              </span>
              <span className="text-white/40 font-mono">{intensity}%</span>
            </div>
          </div>

          {/* Right rail */}
          <div className="flex flex-col gap-4">
            <div className="bg-ink-800/60 rounded-2xl p-4">
              <div className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-3">Intensity</div>
              <input
                type="range"
                min={0}
                max={100}
                value={intensity}
                onChange={(e) => setIntensity(parseInt(e.target.value))}
                className="w-full accent-ember-400"
              />
              <div className="mt-2 text-xs text-white/50 font-mono">{intensity}%</div>
            </div>

            <div className="bg-ink-800/60 rounded-2xl p-4 flex-1 overflow-hidden">
              <div className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-3">LUT</div>
              <div className="space-y-1 max-h-72 overflow-y-auto pr-2 -mr-2">
                {LUTS.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLut(l)}
                    className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition ${
                      l.id === lut.id ? "bg-white/10" : "hover:bg-white/5"
                    }`}
                  >
                    <span className="flex gap-0.5">
                      {l.swatch.map((c, ci) => (
                        <span key={ci} className="w-2 h-6 rounded-sm" style={{ background: c }} />
                      ))}
                    </span>
                    <span className="text-sm flex-1">{l.name}</span>
                    {l.id === lut.id && (
                      <span className="text-ember-300 text-xs">●</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-ink-800/60 rounded-2xl p-4">
              <div className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-3">Frame</div>
              <div className="grid grid-cols-3 gap-1.5">
                {SAMPLE_IMAGES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setImg(s)}
                    className={`aspect-square rounded overflow-hidden ring-1 ${
                      s.id === img.id ? "ring-ember-300 ring-2" : "ring-white/10"
                    }`}
                  >
                    <img src={s.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
