"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LUTS } from "@/lib/luts";
import { SAMPLE_IMAGES } from "@/lib/sample-images";
import { StudioTopBar, CornerTick, PanelTitle, Histogram, ToneCurve } from "@/components/studio-chrome";

export default function Cell() {
  const [lut, setLut] = useState(LUTS[7]);
  const [img, setImg] = useState(SAMPLE_IMAGES[1]);
  const [panel, setPanel] = useState<"none" | "library" | "luts" | "adjust" | "history">("none");

  return (
    <main className="h-screen bg-black text-[#e8dfd1] overflow-hidden" style={{ fontFamily: "Inter, sans-serif" }}>
      <StudioTopBar letter="C" name="The Cell" imageCaption={img.caption} lutName={lut.name} />

      {/* Full-bleed canvas */}
      <div className="absolute inset-0 pt-12 flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center px-4 lg:px-12">
          <div className="relative max-w-[1400px] max-h-[80vh] w-full">
            <CornerTick className="-top-4 -left-4" rot={0} />
            <CornerTick className="-top-4 -right-4" rot={90} />
            <CornerTick className="-bottom-4 -right-4" rot={180} />
            <CornerTick className="-bottom-4 -left-4" rot={270} />
            <img
              src={img.url}
              alt=""
              className="block w-full max-h-[80vh] object-contain shadow-[0_60px_120px_-30px_rgba(0,0,0,0.9)]"
              style={{ filter: lut.filter }}
            />
          </div>
        </div>
      </div>

      {/* Top HUD strip */}
      <div className="absolute top-12 inset-x-0 z-30 px-6 lg:px-12 pt-4 flex items-center justify-between text-[10px] tracking-[0.4em] uppercase text-white/55" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        <span className="flex items-center gap-2">
          <span className="block w-1.5 h-1.5 rounded-full bg-orange-300/80 animate-pulse" />
          A WILDLIGHT GRADE · {lut.name.toUpperCase()}
        </span>
        <span>FRAME 014 / 240</span>
      </div>

      {/* Bottom HUD strip */}
      <div className="absolute bottom-0 inset-x-0 z-30 px-6 lg:px-12 pb-4 flex items-center justify-between text-[10px] tracking-[0.4em] uppercase text-white/55" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        <span className="flex items-center gap-5">
          <span className="text-orange-200/80">{img.caption.toUpperCase()}</span>
          <span className="text-white/25">·</span>
          <span>EI 200 · ƒ8 · 1/125 · 3200K · RAW</span>
        </span>
        <span>16-BIT · REC.2020</span>
      </div>

      {/* Left edge — tool rail */}
      <nav className="absolute left-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-1 pl-3">
        {[
          { id: "library", label: "LIB", n: "01" },
          { id: "luts", label: "LUT", n: "02" },
          { id: "adjust", label: "ADJ", n: "03" },
          { id: "history", label: "HIS", n: "04" },
        ].map((b) => (
          <button
            key={b.id}
            onMouseEnter={() => setPanel(b.id as typeof panel)}
            onClick={() => setPanel(panel === b.id ? "none" : (b.id as typeof panel))}
            className={`w-11 h-11 rounded-sm border flex flex-col items-center justify-center transition ${panel === b.id ? "bg-orange-300 text-black border-orange-300" : "bg-black/60 backdrop-blur border-white/15 hover:border-white/40 text-white/70"}`}
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            <span className="text-[8px] tracking-[0.2em]">{b.n}</span>
            <span className="text-[10px] tracking-[0.2em] mt-0.5">{b.label}</span>
          </button>
        ))}
      </nav>

      {/* Right edge — quick controls */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-40 pr-3 flex flex-col items-end gap-3">
        <div className="w-11 h-44 rounded-sm bg-black/60 backdrop-blur border border-white/15 p-2 flex flex-col items-center gap-2">
          <span className="text-[8px] tracking-[0.2em] text-white/40 -rotate-90 origin-center mt-3 mb-3" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>INTENSITY</span>
          <div className="flex-1 w-1.5 bg-stone-800 rounded-full relative">
            <div className="absolute bottom-0 inset-x-0 bg-orange-300 rounded-full" style={{ height: "78%" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-orange-300" style={{ bottom: "78%" }} />
          </div>
        </div>

        <button className="w-11 h-11 rounded-sm bg-orange-300 text-black flex items-center justify-center font-mono text-[10px] tracking-[0.15em] hover:bg-orange-200 transition" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          EXP
        </button>
        <button className="w-11 h-11 rounded-sm bg-black/60 backdrop-blur border border-white/15 text-white/70 flex items-center justify-center font-mono text-[10px] tracking-[0.15em] hover:border-white/40" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          ⇆
        </button>
      </div>

      {/* Slide-in panels */}
      <AnimatePresence>
        {panel !== "none" && (
          <motion.aside
            key={panel}
            initial={{ x: -360, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -360, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-20 top-32 z-30 w-80 max-h-[68vh] bg-black/85 backdrop-blur-xl border border-white/10 rounded-sm overflow-y-auto"
            onMouseLeave={() => setPanel("none")}
          >
            {panel === "library" && <LibraryPanel img={img} setImg={setImg} />}
            {panel === "luts" && <LutsPanel lut={lut} setLut={setLut} />}
            {panel === "adjust" && <AdjustPanel />}
            {panel === "history" && <HistoryPanel lutName={lut.name} />}
          </motion.aside>
        )}
      </AnimatePresence>
    </main>
  );
}

function LibraryPanel({ img, setImg }: { img: typeof SAMPLE_IMAGES[0]; setImg: (s: typeof SAMPLE_IMAGES[0]) => void }) {
  return (
    <div className="p-5">
      <PanelTitle n="240">CATALOG</PanelTitle>
      <div className="grid grid-cols-2 gap-1.5">
        {[...SAMPLE_IMAGES, ...SAMPLE_IMAGES].map((s, i) => (
          <button
            key={i}
            onClick={() => setImg(s)}
            className={`relative aspect-[4/3] overflow-hidden ring-1 ${s.id === img.id && i < 6 ? "ring-orange-300 ring-2" : "ring-white/10 hover:ring-white/30"}`}
          >
            <img src={s.url} alt="" className="w-full h-full object-cover" />
            <span className="absolute bottom-0.5 right-1 text-[8px] text-white/80" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{String(i + 1).padStart(3, "0")}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function LutsPanel({ lut, setLut }: { lut: (typeof LUTS)[number]; setLut: (l: (typeof LUTS)[number]) => void }) {
  return (
    <div className="p-5">
      <PanelTitle n="8">LUT</PanelTitle>
      <div className="space-y-0.5">
        {LUTS.map((l) => (
          <button
            key={l.id}
            onClick={() => setLut(l)}
            className={`w-full flex items-center gap-2 p-2 rounded-sm text-left ${l.id === lut.id ? "bg-orange-700/30 text-orange-100" : "hover:bg-white/5 text-stone-300"}`}
          >
            <span className="flex gap-0.5">{l.swatch.map((c, ci) => <span key={ci} className="w-1.5 h-5" style={{ background: c }} />)}</span>
            <span className="text-sm flex-1 truncate">{l.name}</span>
            <span className="text-[9px] text-stone-500" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{l.family.slice(0, 4).toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function AdjustPanel() {
  return (
    <div className="p-5 space-y-5">
      <div>
        <PanelTitle n="LUMA">HISTOGRAM</PanelTitle>
        <Histogram />
      </div>
      <div>
        <PanelTitle n="RGB">CURVE</PanelTitle>
        <ToneCurve />
      </div>
      <div>
        <PanelTitle>BASIC</PanelTitle>
        {[["Exposure", "+0.12"], ["Contrast", "+18"], ["Highlights", "-22"], ["Shadows", "+34"], ["Clarity", "+8"]].map(([l, v]) => (
          <div key={l} className="flex items-center gap-2 py-1">
            <span className="text-[11px] text-stone-400 flex-1">{l}</span>
            <div className="w-20 h-px bg-stone-800 relative">
              <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-3 rounded-sm bg-orange-300" style={{ left: `${30 + Math.random() * 40}%` }} />
            </div>
            <span className="text-[10px] text-stone-400 w-10 text-right" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HistoryPanel({ lutName }: { lutName: string }) {
  return (
    <div className="p-5">
      <PanelTitle n="12">HISTORY</PanelTitle>
      <ol className="space-y-1.5 text-[11px]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        {[`LUT · ${lutName}`, "Highlights -22", "Shadows +34", "Curve · midtone lift", "Crop · 4:5", "Import 014/240"].map((t, i) => (
          <li key={i} className={`flex items-center gap-2 ${i === 0 ? "text-orange-200" : "text-stone-400"}`}>
            <span className="text-white/30">{String(i + 1).padStart(2, "0")}</span>
            <span>{t}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
