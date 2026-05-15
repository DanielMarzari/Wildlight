"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { LUTS } from "@/lib/luts";
import { SAMPLE_IMAGES } from "@/lib/sample-images";
import { CornerTick, PanelTitle, Histogram, ToneCurve } from "@/components/studio-chrome";
import { ApertureInline } from "@/components/brand";

const MONO = "'IBM Plex Mono', monospace";
const DISPLAY = '"Cormorant Garamond", "Cormorant", Georgia, serif';

type PanelId = "none" | "library" | "luts" | "adjust" | "hsl" | "curves" | "masks" | "crop" | "brush" | "history";

const TOOLS: { id: PanelId; label: string; n: string; glyph: React.ReactNode }[] = [
  { id: "library", label: "LIB", n: "01", glyph: <GlyphGrid /> },
  { id: "luts",    label: "LUT", n: "02", glyph: <GlyphStripes /> },
  { id: "adjust",  label: "ADJ", n: "03", glyph: <GlyphSliders /> },
  { id: "hsl",     label: "HSL", n: "04", glyph: <GlyphCircle /> },
  { id: "curves",  label: "CRV", n: "05", glyph: <GlyphCurve /> },
  { id: "masks",   label: "MSK", n: "06", glyph: <GlyphMask /> },
  { id: "crop",    label: "CRP", n: "07", glyph: <GlyphCrop /> },
  { id: "brush",   label: "BRH", n: "08", glyph: <GlyphBrush /> },
  { id: "history", label: "HIS", n: "09", glyph: <GlyphClock /> },
];

export default function Cell() {
  const [lut, setLut] = useState(LUTS[7]);
  const [img, setImg] = useState(SAMPLE_IMAGES[1]);
  const [panel, setPanel] = useState<PanelId>("none");
  const [intensity, setIntensity] = useState(78);
  const [showOriginal, setShowOriginal] = useState(false);
  const [activeMode, setActiveMode] = useState<"LIBRARY" | "DEVELOP" | "GRADE" | "EXPORT">("GRADE");

  const liveFilter = showOriginal
    ? "none"
    : intensity === 100
      ? lut.filter
      : `${lut.filter} opacity(${intensity}%)`;

  return (
    <main className="h-screen bg-black text-[#e8dfd1] overflow-hidden relative" style={{ fontFamily: "Inter, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&display=swap" rel="stylesheet" />

      {/* ===== TOP BAR ===== */}
      <header className="absolute top-0 inset-x-0 z-50 backdrop-blur bg-black/50 border-b border-white/10">
        <nav className="h-12 px-4 lg:px-6 flex items-center gap-4">
          <Link href="/studios" className="text-[10px] tracking-[0.4em] uppercase text-stone-400 hover:text-white" style={{ fontFamily: MONO }}>← STUDIOS</Link>
          <div className="w-px h-5 bg-white/10" />
          <Link href="/" className="hover:opacity-80 transition">
            <ApertureInline size={18} color="#e8dfd1" textClass="text-sm" />
          </Link>
          <div className="w-px h-5 bg-white/10" />
          {/* Mode tabs */}
          <div className="flex items-center gap-1" style={{ fontFamily: MONO }}>
            {(["LIBRARY", "DEVELOP", "GRADE", "EXPORT"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setActiveMode(m)}
                className={`px-3 py-1 rounded-sm text-[10px] tracking-[0.3em] transition ${activeMode === m ? "bg-orange-700/30 text-orange-200" : "text-white/45 hover:text-white"}`}
              >
                {m}
              </button>
            ))}
          </div>
          <div className="flex-1" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/45" style={{ fontFamily: MONO }}>
            STUDIO C · CELL
          </span>
          <span className="flex items-center gap-1.5 text-[10px] tracking-[0.3em] uppercase text-white/45" style={{ fontFamily: MONO }}>
            <span className="block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            GPU 18%
          </span>
        </nav>
      </header>

      {/* ===== CANVAS ===== */}
      <div className="absolute inset-0 pt-12 pb-20 flex items-center justify-center px-24">
        <div className="relative max-w-[1240px] max-h-full w-full flex items-center justify-center">
          <CornerTick className="-top-4 -left-4" rot={0} />
          <CornerTick className="-top-4 -right-4" rot={90} />
          <CornerTick className="-bottom-4 -right-4" rot={180} />
          <CornerTick className="-bottom-4 -left-4" rot={270} />
          <img
            src={img.url}
            alt=""
            className="block max-w-full max-h-[72vh] object-contain shadow-[0_60px_120px_-30px_rgba(0,0,0,0.9)] transition-[filter] duration-200"
            style={{ filter: liveFilter }}
          />
        </div>
      </div>

      {/* ===== TOP-RIGHT HUD: persistent mini histogram ===== */}
      <div className="absolute top-16 right-20 z-30 w-64 bg-black/55 backdrop-blur-md border border-white/10 rounded-sm p-3" style={{ fontFamily: MONO }}>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/45">HISTOGRAM</span>
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/45">LUMA · RGB</span>
        </div>
        <Histogram />
        <div className="mt-1 grid grid-cols-3 gap-1 text-[9px] text-white/45">
          <span>BLK <span className="text-white/80">12</span></span>
          <span className="text-center">MID <span className="text-white/80">128</span></span>
          <span className="text-right">WHT <span className="text-white/80">240</span></span>
        </div>
      </div>

      {/* ===== TOP-LEFT HUD: grade label ===== */}
      <div className="absolute top-16 left-20 z-30 flex items-center gap-2 bg-black/55 backdrop-blur-md border border-white/10 rounded-sm px-3 py-1.5" style={{ fontFamily: MONO }}>
        <span className="block w-1.5 h-1.5 rounded-full bg-orange-300 animate-pulse" />
        <span className="text-[10px] tracking-[0.4em] uppercase text-orange-200/90">
          {showOriginal ? "ORIGINAL" : lut.name.toUpperCase()}
        </span>
        <span className="text-white/25 text-[10px]">·</span>
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">{intensity}%</span>
      </div>

      {/* ===== LEFT TOOL RAIL ===== */}
      <nav className="absolute left-3 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-1">
        {TOOLS.map((b) => (
          <button
            key={b.id}
            onClick={() => setPanel(panel === b.id ? "none" : b.id)}
            className={`group relative w-12 h-12 rounded-sm border flex items-center justify-center transition ${panel === b.id ? "bg-orange-300 text-black border-orange-300" : "bg-black/60 backdrop-blur border-white/15 hover:border-white/40 text-white/70"}`}
            style={{ fontFamily: MONO }}
          >
            <div className="flex flex-col items-center">
              {b.glyph}
              <span className="text-[9px] tracking-[0.15em] mt-0.5">{b.label}</span>
            </div>
            <span className={`absolute left-full ml-2 px-2 py-1 rounded-sm whitespace-nowrap text-[10px] tracking-[0.3em] uppercase pointer-events-none transition-opacity ${panel === b.id ? "opacity-0" : "opacity-0 group-hover:opacity-100"} bg-black/80 backdrop-blur border border-white/10 text-white/80`}>
              {b.n} · {fullName(b.id)}
            </span>
          </button>
        ))}
      </nav>

      {/* ===== RIGHT TOOLBAR ===== */}
      <aside className="absolute right-3 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-2">
        {/* Intensity slider */}
        <div className="w-12 h-52 rounded-sm bg-black/60 backdrop-blur border border-white/15 p-2 flex flex-col items-center" style={{ fontFamily: MONO }}>
          <span className="text-[8px] tracking-[0.2em] text-white/40 mb-2">INT</span>
          <div className="flex-1 w-1.5 bg-stone-800 rounded-full relative">
            <div className="absolute bottom-0 inset-x-0 bg-orange-300 rounded-full" style={{ height: `${intensity}%` }} />
            <input
              type="range"
              min={0}
              max={100}
              value={intensity}
              onChange={(e) => setIntensity(parseInt(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-pointer"
              style={{ writingMode: "vertical-lr" as React.CSSProperties["writingMode"], WebkitAppearance: "slider-vertical" }}
            />
          </div>
          <span className="text-[9px] text-white/80 mt-2">{intensity}</span>
        </div>

        {/* Hold to compare */}
        <button
          onMouseDown={() => setShowOriginal(true)}
          onMouseUp={() => setShowOriginal(false)}
          onMouseLeave={() => setShowOriginal(false)}
          onTouchStart={() => setShowOriginal(true)}
          onTouchEnd={() => setShowOriginal(false)}
          className={`w-12 h-12 rounded-sm border flex flex-col items-center justify-center transition ${showOriginal ? "bg-white text-black border-white" : "bg-black/60 backdrop-blur border-white/15 text-white/70 hover:border-white/40"}`}
          style={{ fontFamily: MONO }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 7h4M8 7h4M5 4l-3 3 3 3M9 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
          <span className="text-[8px] tracking-[0.15em] mt-0.5">A↔B</span>
        </button>

        {/* Zoom controls */}
        <div className="flex flex-col items-center bg-black/60 backdrop-blur border border-white/15 rounded-sm overflow-hidden" style={{ fontFamily: MONO }}>
          {["+", "1:1", "FIT", "−"].map((l, i) => (
            <button key={i} className={`w-12 h-9 text-[10px] tracking-[0.15em] text-white/70 hover:bg-white/10 ${i > 0 ? "border-t border-white/10" : ""}`}>{l}</button>
          ))}
        </div>

        {/* Export */}
        <button className="w-12 h-12 rounded-sm bg-orange-300 hover:bg-orange-200 text-black flex flex-col items-center justify-center text-[10px] tracking-[0.15em] transition" style={{ fontFamily: MONO }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 1v9M3 7l4 4 4-4M2 13h10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span className="mt-0.5">EXP</span>
        </button>
      </aside>

      {/* ===== BOTTOM DOCK ===== */}
      <div className="absolute bottom-0 inset-x-0 z-30 bg-black/70 backdrop-blur-md border-t border-white/10 h-20 flex items-stretch" style={{ fontFamily: MONO }}>
        {/* Left: current LUT pill */}
        <div className="px-5 flex items-center gap-3 shrink-0">
          <span className="flex gap-0.5">{lut.swatch.map((c, ci) => <span key={ci} className="w-1.5 h-9 rounded-sm" style={{ background: c }} />)}</span>
          <div className="leading-tight">
            <div className="tracking-[-0.01em]" style={{ fontFamily: DISPLAY, fontStyle: "italic", fontSize: "1.2rem" }}>{lut.name}</div>
            <div className="text-[9px] tracking-[0.3em] uppercase text-white/45 mt-0.5">{lut.family} · {intensity}%</div>
          </div>
        </div>

        {/* Center: LUT preview reel */}
        <div className="flex-1 min-w-0 flex items-center gap-1 px-4 overflow-x-auto border-l border-white/10">
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/45 mr-2 shrink-0">LUT</span>
          {LUTS.map((l) => (
            <button
              key={l.id}
              onClick={() => setLut(l)}
              className={`shrink-0 relative h-12 w-12 overflow-hidden rounded-sm ring-1 transition ${l.id === lut.id ? "ring-orange-300 ring-2" : "ring-white/15 hover:ring-white/40"}`}
              title={l.name}
            >
              <img src={img.url} alt="" className="w-full h-full object-cover" style={{ filter: l.filter }} />
              <div className="absolute inset-x-0 bottom-0 h-3 bg-black/60 flex items-center px-1">
                <span className="text-[7px] text-white truncate">{l.name.split(" ")[0]}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Right: metadata strip */}
        <div className="px-5 flex flex-col items-end justify-center shrink-0 border-l border-white/10 text-right text-[10px] tracking-[0.4em] uppercase text-white/55 gap-1">
          <div className="flex items-center gap-2">
            <span>EI 200</span><span className="text-white/25">·</span>
            <span>ƒ8</span><span className="text-white/25">·</span>
            <span>1/125</span><span className="text-white/25">·</span>
            <span>3200K</span>
          </div>
          <div className="flex items-center gap-2 text-white/45">
            <span>RAW</span><span className="text-white/25">·</span>
            <span>16-BIT REC.2020</span>
          </div>
        </div>
      </div>

      {/* ===== POPOVER PANELS — click toggles, fade up ===== */}
      <AnimatePresence mode="wait">
        {panel !== "none" && (
          <motion.aside
            key={panel}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-20 top-32 z-40 w-80 max-h-[60vh] bg-black/85 backdrop-blur-xl border border-white/10 rounded-sm overflow-y-auto shadow-2xl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-2.5 bg-black/85 backdrop-blur border-b border-white/10" style={{ fontFamily: MONO }}>
              <span className="text-[10px] tracking-[0.3em] uppercase text-orange-200/90">
                {TOOLS.find((t) => t.id === panel)?.n} · {fullName(panel)}
              </span>
              <button onClick={() => setPanel("none")} className="text-white/40 hover:text-white text-base leading-none">✕</button>
            </div>
            {panel === "library" && <LibraryPanel img={img} setImg={setImg} />}
            {panel === "luts" && <LutsPanel lut={lut} setLut={setLut} />}
            {panel === "adjust" && <AdjustPanel />}
            {panel === "hsl" && <HSLPanel />}
            {panel === "curves" && <CurvesPanel />}
            {panel === "masks" && <MasksPanel />}
            {panel === "crop" && <CropPanel />}
            {panel === "brush" && <BrushPanel />}
            {panel === "history" && <HistoryPanel lutName={lut.name} />}
          </motion.aside>
        )}
      </AnimatePresence>
    </main>
  );
}

function fullName(id: PanelId): string {
  const map: Record<PanelId, string> = {
    none: "", library: "LIBRARY", luts: "LUT PRESETS", adjust: "ADJUSTMENTS",
    hsl: "HSL · SELECTIVE", curves: "TONE CURVES", masks: "MASKS · QUALIFIER",
    crop: "CROP & ROTATE", brush: "BRUSH · LOCAL", history: "HISTORY",
  };
  return map[id];
}

/* ===== Toolbar glyphs (tiny) ===== */
function GlyphGrid() { return <svg width="14" height="14"><g fill="currentColor"><rect x="1" y="1" width="5" height="5" /><rect x="8" y="1" width="5" height="5" /><rect x="1" y="8" width="5" height="5" /><rect x="8" y="8" width="5" height="5" /></g></svg>; }
function GlyphStripes() { return <svg width="14" height="14"><g fill="currentColor"><rect x="1" y="2" width="2" height="10" /><rect x="5" y="2" width="2" height="10" /><rect x="9" y="2" width="2" height="10" /></g></svg>; }
function GlyphSliders() { return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4"><line x1="2" y1="4" x2="12" y2="4" /><circle cx="5" cy="4" r="1.5" fill="currentColor" /><line x1="2" y1="9" x2="12" y2="9" /><circle cx="9" cy="9" r="1.5" fill="currentColor" /></svg>; }
function GlyphCircle() { return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="7" cy="7" r="5" /><circle cx="7" cy="7" r="2" fill="currentColor" /></svg>; }
function GlyphCurve() { return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M2 12 C 5 12, 7 4, 12 2" /></svg>; }
function GlyphMask() { return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="5" cy="7" r="4" /><circle cx="9" cy="7" r="4" /></svg>; }
function GlyphCrop() { return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M4 1v9h9M1 4h9v9" /></svg>; }
function GlyphBrush() { return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M2 12 L9 5 L11 7 L4 14 z" /><line x1="9" y1="5" x2="11" y2="3" /></svg>; }
function GlyphClock() { return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="7" cy="7" r="5" /><path d="M7 4v3l2 2" /></svg>; }

/* ===== Panels ===== */
function LibraryPanel({ img, setImg }: { img: typeof SAMPLE_IMAGES[0]; setImg: (s: typeof SAMPLE_IMAGES[0]) => void }) {
  return (
    <div className="p-5">
      <PanelTitle n="240">CATALOG</PanelTitle>
      <div className="grid grid-cols-2 gap-1.5">
        {[...SAMPLE_IMAGES, ...SAMPLE_IMAGES].map((s, i) => (
          <button key={i} onClick={() => setImg(s)} className={`relative aspect-[4/3] overflow-hidden ring-1 ${s.id === img.id && i < 6 ? "ring-orange-300 ring-2" : "ring-white/10 hover:ring-white/30"}`}>
            <img src={s.url} alt="" className="w-full h-full object-cover" />
            <span className="absolute bottom-0.5 right-1 text-[8px] text-white/80" style={{ fontFamily: MONO }}>{String(i + 1).padStart(3, "0")}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function LutsPanel({ lut, setLut }: { lut: (typeof LUTS)[number]; setLut: (l: (typeof LUTS)[number]) => void }) {
  return (
    <div className="p-5">
      <PanelTitle n="8">LUT · PRESETS</PanelTitle>
      <div className="space-y-0.5">
        {LUTS.map((l) => (
          <button key={l.id} onClick={() => setLut(l)} className={`w-full flex items-center gap-2 p-2 rounded-sm text-left ${l.id === lut.id ? "bg-orange-700/30 text-orange-100" : "hover:bg-white/5 text-stone-300"}`}>
            <span className="flex gap-0.5">{l.swatch.map((c, ci) => <span key={ci} className="w-1.5 h-6" style={{ background: c }} />)}</span>
            <div className="flex-1 min-w-0">
              <div className="text-sm truncate" style={{ fontFamily: DISPLAY, fontStyle: "italic", fontSize: "1.05rem" }}>{l.name}</div>
              <div className="text-[9px] tracking-[0.25em] uppercase text-white/40" style={{ fontFamily: MONO }}>{l.family}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function AdjustPanel() {
  return (
    <div className="p-5">
      <PanelTitle>BASIC</PanelTitle>
      {[["Exposure", "+0.12"], ["Contrast", "+18"], ["Highlights", "-22"], ["Shadows", "+34"], ["Whites", "+6"], ["Blacks", "-12"], ["Texture", "+6"], ["Clarity", "+8"], ["Dehaze", "0"], ["Vibrance", "+4"], ["Saturation", "0"]].map(([l, v]) => (
        <div key={l} className="flex items-center gap-2 py-1.5">
          <span className="text-[11px] text-stone-300 flex-1">{l}</span>
          <div className="w-24 h-px bg-stone-800 relative">
            <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-3 rounded-sm bg-orange-300" style={{ left: `${30 + Math.random() * 40}%` }} />
          </div>
          <span className="text-[10px] text-white/60 w-10 text-right" style={{ fontFamily: MONO }}>{v}</span>
        </div>
      ))}
    </div>
  );
}

function HSLPanel() {
  return (
    <div className="p-5">
      <PanelTitle n="8 CHANNELS">HSL · SELECTIVE</PanelTitle>
      <div className="flex gap-1 mb-3 text-[10px]" style={{ fontFamily: MONO }}>
        {["HUE", "SAT", "LUM"].map((m, i) => (
          <button key={m} className={`flex-1 py-1 rounded-sm tracking-[0.2em] uppercase ${i === 1 ? "bg-orange-700/30 text-orange-200" : "text-white/50 bg-white/5"}`}>{m}</button>
        ))}
      </div>
      <div className="space-y-1.5">
        {[["Red", "#c1554e"], ["Orange", "#d68a3e"], ["Yellow", "#dfc15a"], ["Green", "#6b9e6b"], ["Cyan", "#5fa7b6"], ["Blue", "#5a6ec5"], ["Purple", "#9a6cc5"], ["Magenta", "#c45a9c"]].map(([n, c]) => (
          <div key={n} className="flex items-center gap-2">
            <span className="w-2 h-5 rounded-sm" style={{ background: c }} />
            <span className="text-[11px] text-stone-300 w-14">{n}</span>
            <div className="flex-1 h-px bg-stone-800 relative">
              <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-3 rounded-sm bg-orange-300" style={{ left: `${30 + Math.random() * 40}%` }} />
            </div>
            <span className="text-[9px] text-white/50 w-7 text-right" style={{ fontFamily: MONO }}>{(Math.random() * 40 - 20).toFixed(0)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CurvesPanel() {
  return (
    <div className="p-5 space-y-4">
      <div>
        <PanelTitle n="RGB">TONE CURVE</PanelTitle>
        <ToneCurve />
      </div>
      <div className="grid grid-cols-3 gap-2 text-[10px]" style={{ fontFamily: MONO }}>
        {["RGB", "R", "G", "B"].map((c, i) => (
          <button key={c} className={`py-1 rounded-sm tracking-[0.2em] ${i === 0 ? "bg-orange-700/30 text-orange-200" : "bg-white/5 text-white/50"}`}>{c}</button>
        ))}
      </div>
      <div>
        <PanelTitle>POINTS</PanelTitle>
        <div className="space-y-1 text-[10px]" style={{ fontFamily: MONO }}>
          <div className="flex justify-between text-white/60"><span>BLACK</span><span>0 / 8</span></div>
          <div className="flex justify-between text-white/60"><span>SHADOW</span><span>62 / 48</span></div>
          <div className="flex justify-between text-white/60"><span>MID</span><span>128 / 138</span></div>
          <div className="flex justify-between text-white/60"><span>HIGHLIGHT</span><span>196 / 208</span></div>
          <div className="flex justify-between text-white/60"><span>WHITE</span><span>255 / 248</span></div>
        </div>
      </div>
    </div>
  );
}

function MasksPanel() {
  return (
    <div className="p-5">
      <PanelTitle n="3 LAYERS">MASKS · QUALIFIER</PanelTitle>
      <div className="space-y-2 mb-4">
        {[["Sky", "Linear gradient · top 38%", "#5fa7b6"], ["Skin", "Hue qualifier · 12–32°", "#d68a3e"], ["Foliage", "Hue qualifier · 78–142°", "#6b9e6b"]].map(([n, sub, c], i) => (
          <div key={n} className="flex items-center gap-2 p-2 rounded-sm bg-white/5">
            <span className="w-2 h-8 rounded-sm" style={{ background: c }} />
            <div className="flex-1 min-w-0">
              <div className="text-xs text-stone-200" style={{ fontFamily: DISPLAY, fontStyle: "italic", fontSize: "1rem" }}>{n}</div>
              <div className="text-[9px] tracking-[0.2em] uppercase text-white/40" style={{ fontFamily: MONO }}>{sub}</div>
            </div>
            <span className="text-[10px] text-white/50" style={{ fontFamily: MONO }}>{i === 0 ? "ON" : "ON"}</span>
          </div>
        ))}
      </div>
      <button className="w-full py-2 rounded-sm border border-white/15 hover:border-white/40 text-[10px] tracking-[0.3em] uppercase text-white/70" style={{ fontFamily: MONO }}>+ NEW MASK</button>
    </div>
  );
}

function CropPanel() {
  return (
    <div className="p-5">
      <PanelTitle>CROP &amp; ROTATE</PanelTitle>
      <div className="grid grid-cols-3 gap-1 mb-4 text-[10px]" style={{ fontFamily: MONO }}>
        {["FREE", "1:1", "4:5", "3:2", "16:9", "ORIG"].map((r, i) => (
          <button key={r} className={`py-1.5 rounded-sm tracking-[0.2em] ${i === 2 ? "bg-orange-700/30 text-orange-200" : "bg-white/5 text-white/55"}`}>{r}</button>
        ))}
      </div>
      <div className="space-y-2 text-[11px]" style={{ fontFamily: MONO }}>
        <div className="flex justify-between text-white/60"><span>ROTATE</span><span className="text-orange-200">-1.4°</span></div>
        <div className="flex justify-between text-white/60"><span>VERTICAL</span><span>0</span></div>
        <div className="flex justify-between text-white/60"><span>HORIZONTAL</span><span>0</span></div>
        <div className="flex justify-between text-white/60"><span>ASPECT</span><span>4 : 5</span></div>
      </div>
    </div>
  );
}

function BrushPanel() {
  return (
    <div className="p-5 space-y-4">
      <PanelTitle>BRUSH · LOCAL</PanelTitle>
      <div className="text-[11px] space-y-1.5" style={{ fontFamily: MONO }}>
        <div className="flex justify-between text-white/60"><span>SIZE</span><span>32 px</span></div>
        <div className="flex justify-between text-white/60"><span>FEATHER</span><span>40</span></div>
        <div className="flex justify-between text-white/60"><span>FLOW</span><span>62</span></div>
        <div className="flex justify-between text-white/60"><span>DENSITY</span><span>100</span></div>
      </div>
      <div>
        <PanelTitle>EFFECT</PanelTitle>
        <div className="text-[11px] space-y-1.5" style={{ fontFamily: MONO }}>
          <div className="flex justify-between text-white/60"><span>EXPOSURE</span><span className="text-orange-200">-0.34</span></div>
          <div className="flex justify-between text-white/60"><span>CLARITY</span><span className="text-orange-200">+18</span></div>
          <div className="flex justify-between text-white/60"><span>SATURATION</span><span>0</span></div>
        </div>
      </div>
    </div>
  );
}

function HistoryPanel({ lutName }: { lutName: string }) {
  return (
    <div className="p-5">
      <PanelTitle n="12">HISTORY</PanelTitle>
      <ol className="space-y-1.5 text-[11px]" style={{ fontFamily: MONO }}>
        {[`LUT · ${lutName}`, "Brush · sky -0.34 EV", "Mask · skin qualifier", "Highlights -22", "Shadows +34", "Curve · midtone lift", "Crop · 4:5 / -1.4°", "Import 014 / 240"].map((t, i) => (
          <li key={i} className={`flex items-center gap-2 ${i === 0 ? "text-orange-200" : "text-stone-400"}`}>
            <span className="text-white/30 w-5">{String(i + 1).padStart(2, "0")}</span>
            <span className="flex-1">{t}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
