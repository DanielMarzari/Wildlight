"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { LUTS, type Lut } from "@/lib/luts";
import { CornerTick, PanelTitle, Histogram, ToneCurve } from "@/components/studio-chrome";
import { ApertureInline } from "@/components/brand";
import { loadCustomLuts, saveCustomLut, deleteCustomLut, parseCube, cubeToFilter, filterToCube, downloadFile, exportPng, type CustomLut } from "@/lib/lut-io";

const MONO = "'IBM Plex Mono', monospace";
const DISPLAY = '"Cormorant Garamond", "Cormorant", Georgia, serif';

type Mode = "ALBUM" | "DEVELOP" | "GRADE" | "DESIGN" | "EXPORT";
type PanelId = "none" | "library" | "luts" | "adjust" | "hsl" | "curves" | "masks" | "crop" | "brush" | "history" | "design";

type Adjust = {
  exposure: number;   // 50..150 (%)
  contrast: number;   // 50..150
  saturation: number; // 0..200
  warmth: number;     // -30..+30 (deg hue-rotate scaler)
  intensity: number;  // 0..100 (LUT mix via opacity proxy)
};

const DEFAULT_ADJ: Adjust = { exposure: 100, contrast: 100, saturation: 100, warmth: 0, intensity: 100 };

const TOOLS: { id: PanelId; label: string; n: string; glyph: React.ReactNode; mode?: Mode }[] = [
  { id: "library", label: "ALB", n: "01", glyph: <GlyphGrid /> },
  { id: "luts",    label: "LUT", n: "02", glyph: <GlyphStripes /> },
  { id: "adjust",  label: "ADJ", n: "03", glyph: <GlyphSliders /> },
  { id: "hsl",     label: "HSL", n: "04", glyph: <GlyphCircle /> },
  { id: "curves",  label: "CRV", n: "05", glyph: <GlyphCurve /> },
  { id: "masks",   label: "MSK", n: "06", glyph: <GlyphMask /> },
  { id: "crop",    label: "CRP", n: "07", glyph: <GlyphCrop /> },
  { id: "brush",   label: "BRH", n: "08", glyph: <GlyphBrush /> },
  { id: "design",  label: "DSN", n: "09", glyph: <GlyphDesign />, mode: "DESIGN" },
  { id: "history", label: "HIS", n: "10", glyph: <GlyphClock /> },
];

export default function Cell() {
  const [customLuts, setCustomLuts] = useState<CustomLut[]>([]);
  const [lut, setLut] = useState<Lut | CustomLut>(LUTS[7]);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [imgLabel, setImgLabel] = useState<string>("");
  const [panel, setPanel] = useState<PanelId>("none");
  const [adj, setAdj] = useState<Adjust>(DEFAULT_ADJ);
  const [showOriginal, setShowOriginal] = useState(false);
  const [activeMode, setActiveMode] = useState<Mode>("GRADE");
  const [extraFilter, setExtraFilter] = useState<string>(""); // for DESIGN: IR/UV effects
  const [toast, setToast] = useState<string | null>(null);

  const imgRef = useRef<HTMLImageElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cubeInputRef = useRef<HTMLInputElement>(null);

  // Load custom LUTs once
  useEffect(() => { setCustomLuts(loadCustomLuts()); }, []);

  // Toast auto-clear
  useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(null), 2400); return () => clearTimeout(id); }, [toast]);

  // Compose the actual filter applied to the <img>
  const composedFilter = composeFilter(adj, lut.filter, extraFilter, showOriginal);

  /* --- File handlers --- */
  const handleImageFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImgSrc(e.target?.result as string);
      setImgLabel(file.name.replace(/\.[^.]+$/, "").replaceAll("_", " "));
      setToast(`LOADED · ${file.name}`);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleCubeFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsed = parseCube(text);
      if (!parsed) { setToast("CUBE · INVALID FILE"); return; }
      const id = `user-${file.name}-${Date.now().toString(36)}`;
      const newLut: CustomLut = {
        id,
        name: file.name.replace(/\.cube$/i, "").replaceAll("_", " "),
        family: "Editorial",
        description: `Imported from ${file.name} · ${parsed.size}³ cube · ${parsed.size * parsed.size * parsed.size} entries`,
        filter: cubeToFilter(parsed.size, parsed.data),
        swatch: ["#3a2a1d", "#a17552", "#e6cba3"],
        source: "user-cube",
        cube: parsed.data,
        cubeSize: parsed.size,
      };
      saveCustomLut(newLut);
      setCustomLuts(loadCustomLuts());
      setLut(newLut);
      setToast(`CUBE · ${parsed.size}³ IMPORTED`);
    };
    reader.readAsText(file);
  }, []);

  // Drag/drop on the whole document
  useEffect(() => {
    const onOver = (e: DragEvent) => { e.preventDefault(); };
    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer?.files?.[0];
      if (!file) return;
      if (file.type.startsWith("image/")) handleImageFile(file);
      else if (file.name.toLowerCase().endsWith(".cube")) handleCubeFile(file);
    };
    window.addEventListener("dragover", onOver);
    window.addEventListener("drop", onDrop);
    return () => { window.removeEventListener("dragover", onOver); window.removeEventListener("drop", onDrop); };
  }, [handleImageFile, handleCubeFile]);

  /* --- DESIGN: IR/UV/save/export --- */
  const setDesignEffect = (kind: "none" | "ir" | "uv") => {
    setExtraFilter(kind === "none" ? "" : `url(#wildlight-${kind})`);
    setToast(kind === "none" ? "DESIGN · RESET" : `DESIGN · ${kind.toUpperCase()} MAP ON`);
  };

  const saveDesignAsLut = async () => {
    // Combine LUT + adj + extra into a single filter chain (extra ColorMatrix
    // cannot be baked into .cube here because feColorMatrix requires SVG
    // rasterization; we save the visible CSS pipeline as a custom LUT)
    const fullFilter = composeFilter(adj, lut.filter, extraFilter, false);
    const baseFilter = composeFilter(adj, lut.filter, "", false);
    let cube: { text: string; data: number[] } | null = null;
    try { cube = await filterToCube(baseFilter, 17); } catch { /* ignore */ }
    const name = prompt("Name this LUT:", "Untitled grade");
    if (!name) return;
    const newLut: CustomLut = {
      id: `design-${Date.now().toString(36)}`,
      name,
      family: "Editorial",
      description: extraFilter ? `Design grade with ${extraFilter.includes("ir") ? "IR" : "UV"} channel map` : "Custom design grade.",
      filter: fullFilter,
      swatch: ["#2a1d3a", "#a37bbf", "#d8c1ea"],
      source: "user-design",
      cube: cube?.data,
      cubeSize: 17,
    };
    saveCustomLut(newLut);
    setCustomLuts(loadCustomLuts());
    setLut(newLut);
    setToast(`SAVED · ${name.toUpperCase()}`);
  };

  const exportCube = async () => {
    const baseFilter = composeFilter(adj, lut.filter, "", false);
    try {
      const { text } = await filterToCube(baseFilter, 17);
      downloadFile(`${lut.name.replace(/\s+/g, "_").toLowerCase()}.cube`, text, "text/plain");
      setToast(`.CUBE · DOWNLOADED`);
    } catch { setToast("EXPORT · FAILED"); }
  };

  /* --- EXPORT current view as PNG at native resolution --- */
  const exportImage = async () => {
    if (!imgRef.current) return;
    try {
      const filter = composeFilter(adj, lut.filter, extraFilter, false);
      const safeName = `wildlight_${(lut.name).replace(/\s+/g, "_").toLowerCase()}_${Date.now().toString(36)}.png`;
      await exportPng(imgRef.current, filter, safeName);
      setToast(`EXPORTED · ${safeName}`);
    } catch (e) {
      setToast(`EXPORT · FAILED`);
    }
  };

  const allLuts = [...LUTS, ...customLuts];

  return (
    <main className="h-screen bg-black text-[#e8dfd1] overflow-hidden relative" style={{ fontFamily: "Inter, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&display=swap" rel="stylesheet" />

      {/* SVG filters for IR/UV — referenced as filter: url(#wildlight-ir) */}
      <SvgFilterDefs />

      {/* hidden inputs */}
      <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && handleImageFile(e.target.files[0])} />
      <input ref={cubeInputRef} type="file" accept=".cube,text/plain" hidden onChange={(e) => e.target.files?.[0] && handleCubeFile(e.target.files[0])} />

      {/* ===== TOP BAR ===== */}
      <header className="absolute top-0 inset-x-0 z-50 backdrop-blur bg-black/50 border-b border-white/10">
        <nav className="h-12 px-4 lg:px-6 flex items-center gap-4">
          <Link href="/" className="text-[10px] tracking-[0.4em] uppercase text-stone-400 hover:text-white" style={{ fontFamily: MONO }}>← HOME</Link>
          <div className="w-px h-5 bg-white/10" />
          <Link href="/" className="hover:opacity-80 transition">
            <ApertureInline size={18} color="#e8dfd1" textClass="text-sm" />
          </Link>
          <div className="w-px h-5 bg-white/10" />
          <div className="flex items-center gap-1" style={{ fontFamily: MONO }}>
            {(["ALBUM", "DEVELOP", "GRADE", "EXPORT"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setActiveMode(m);
                  if (m === "ALBUM") setPanel("library");
                  else if (m === "EXPORT") setPanel("none");
                }}
                className={`px-3 py-1 rounded-sm text-[10px] tracking-[0.3em] transition ${activeMode === m ? "bg-orange-700/30 text-orange-200" : "text-white/45 hover:text-white"}`}
              >
                {m}
              </button>
            ))}
            <Link href="/design" className="px-3 py-1 rounded-sm text-[10px] tracking-[0.3em] text-violet-300 hover:text-violet-100 hover:bg-violet-700/20 transition">
              DESIGN ↗
            </Link>
          </div>
          <div className="flex-1" />
          <button onClick={() => fileInputRef.current?.click()} className="text-[10px] tracking-[0.3em] uppercase text-white/45 hover:text-white" style={{ fontFamily: MONO }} title="Upload image">+ IMAGE</button>
          <button onClick={() => cubeInputRef.current?.click()} className="text-[10px] tracking-[0.3em] uppercase text-white/45 hover:text-white" style={{ fontFamily: MONO }} title="Import .cube LUT">+ .CUBE</button>
          <button onClick={exportImage} className="text-[10px] tracking-[0.3em] uppercase text-orange-200 hover:text-orange-100" style={{ fontFamily: MONO }} title="Export PNG">EXPORT PNG ↓</button>
        </nav>
      </header>

      {/* ===== CANVAS ===== */}
      <div className="absolute inset-0 pt-12 pb-32 flex items-center justify-center px-24" ref={dropZoneRef}>
        {imgSrc ? (
          <div className="relative max-w-[1240px] max-h-full w-full flex items-center justify-center">
            <CornerTick className="-top-4 -left-4" rot={0} />
            <CornerTick className="-top-4 -right-4" rot={90} />
            <CornerTick className="-bottom-4 -right-4" rot={180} />
            <CornerTick className="-bottom-4 -left-4" rot={270} />
            <img
              ref={imgRef}
              src={imgSrc}
              alt=""
              crossOrigin="anonymous"
              className="block max-w-full max-h-[72vh] object-contain shadow-[0_60px_120px_-30px_rgba(0,0,0,0.9)] transition-[filter] duration-150"
              style={{ filter: composedFilter }}
            />
          </div>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="group relative w-[min(680px,80vw)] aspect-[16/10] border border-dashed border-white/15 hover:border-orange-300/60 hover:bg-white/[0.02] transition rounded-sm flex flex-col items-center justify-center gap-4"
            style={{ fontFamily: MONO }}
          >
            <CornerTick className="-top-3 -left-3" rot={0} />
            <CornerTick className="-top-3 -right-3" rot={90} />
            <CornerTick className="-bottom-3 -right-3" rot={180} />
            <CornerTick className="-bottom-3 -left-3" rot={270} />
            <svg width="34" height="34" viewBox="0 0 34 34" className="text-orange-300/80 group-hover:text-orange-300 transition">
              <path d="M17 5v22M7 15l10-10 10 10M5 29h24" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="text-center">
              <div className="text-base tracking-[0.3em] uppercase text-white/80">DROP AN IMAGE</div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-stone-500 mt-2">OR CLICK · OR + IMAGE IN TOP BAR</div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-stone-600 mt-1">.JPG · .PNG · .WEBP · .HEIC</div>
            </div>
          </button>
        )}
      </div>

      {/* ===== TOP-RIGHT HUD ===== */}
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
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">{adj.intensity}%</span>
        {extraFilter && <span className="text-[10px] tracking-[0.4em] uppercase text-violet-300 ml-1">· {extraFilter.includes("ir") ? "IR" : "UV"}</span>}
      </div>

      {/* ===== LEFT TOOL RAIL ===== */}
      <nav className="absolute left-3 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-1">
        {TOOLS.map((b) => {
          if (b.id === "design") {
            return (
              <Link
                key={b.id}
                href="/design"
                className={`group relative w-12 h-12 rounded-sm border flex items-center justify-center transition bg-black/60 backdrop-blur border-violet-400/30 hover:border-violet-300 text-violet-300`}
                style={{ fontFamily: MONO }}
              >
                <div className="flex flex-col items-center">
                  {b.glyph}
                  <span className="text-[9px] tracking-[0.15em] mt-0.5">{b.label}</span>
                </div>
                <span className="absolute left-full ml-2 px-2 py-1 rounded-sm whitespace-nowrap text-[10px] tracking-[0.3em] uppercase pointer-events-none opacity-0 group-hover:opacity-100 bg-black/80 backdrop-blur border border-white/10 text-violet-200">
                  {b.n} · DESIGN PAGE ↗
                </span>
              </Link>
            );
          }
          return (
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
          );
        })}
      </nav>

      {/* ===== RIGHT TOOLBAR ===== */}
      <aside className="absolute right-3 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-2">
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

        {/* Reset */}
        <button onClick={() => { setAdj(DEFAULT_ADJ); setExtraFilter(""); setToast("RESET"); }} className="w-12 h-9 rounded-sm bg-black/60 backdrop-blur border border-white/15 text-white/70 hover:border-white/40 text-[10px] tracking-[0.15em]" style={{ fontFamily: MONO }}>RST</button>

        {/* Export */}
        <button onClick={exportImage} className="w-12 h-12 rounded-sm bg-orange-300 hover:bg-orange-200 text-black flex flex-col items-center justify-center text-[10px] tracking-[0.15em] transition" style={{ fontFamily: MONO }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 1v9M3 7l4 4 4-4M2 13h10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span className="mt-0.5">EXP</span>
        </button>
      </aside>

      {/* ===== INTENSITY STRIP ===== */}
      <div className="absolute bottom-20 inset-x-0 z-30 bg-black/55 backdrop-blur-md border-t border-white/5" style={{ fontFamily: MONO }}>
        <div className="px-6 lg:px-10 py-2.5 flex items-center gap-4">
          <span className="text-[10px] tracking-[0.4em] uppercase text-white/55 shrink-0">INTENSITY</span>
          <input
            type="range"
            min={0}
            max={100}
            value={adj.intensity}
            onChange={(e) => setAdj({ ...adj, intensity: parseInt(e.target.value) })}
            className="flex-1 accent-orange-300 cursor-pointer h-1"
          />
          <span className="text-[10px] tracking-[0.3em] uppercase text-orange-200/90 w-12 text-right">{adj.intensity}%</span>
        </div>
      </div>

      {/* ===== BOTTOM DOCK ===== */}
      <div className="absolute bottom-0 inset-x-0 z-30 bg-black/70 backdrop-blur-md border-t border-white/10 h-20 flex items-stretch" style={{ fontFamily: MONO }}>
        <div className="px-5 flex items-center gap-3 shrink-0">
          <span className="flex gap-0.5">{lut.swatch.map((c, ci) => <span key={ci} className="w-1.5 h-9 rounded-sm" style={{ background: c }} />)}</span>
          <div className="leading-tight">
            <div className="tracking-[-0.01em]" style={{ fontFamily: DISPLAY, fontStyle: "italic", fontSize: "1.2rem" }}>{lut.name}</div>
            <div className="text-[9px] tracking-[0.3em] uppercase text-white/45 mt-0.5">{lut.family} · {adj.intensity}%</div>
          </div>
        </div>

        <div className="flex-1 min-w-0 flex items-center gap-1 px-4 overflow-x-auto border-l border-white/10">
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/45 mr-2 shrink-0">LUT</span>
          {allLuts.map((l) => (
            <button
              key={l.id}
              onClick={() => setLut(l)}
              className={`shrink-0 relative h-12 w-12 overflow-hidden rounded-sm ring-1 transition ${l.id === lut.id ? "ring-orange-300 ring-2" : "ring-white/15 hover:ring-white/40"}`}
              title={l.name}
            >
              <img src={imgSrc} alt="" className="w-full h-full object-cover" style={{ filter: l.filter }} crossOrigin="anonymous" />
              <div className="absolute inset-x-0 bottom-0 h-3 bg-black/60 flex items-center px-1">
                <span className="text-[7px] text-white truncate">{l.name.split(" ")[0]}</span>
              </div>
              {("source" in l) && <span className="absolute top-0 right-0.5 text-[8px] text-orange-300">●</span>}
            </button>
          ))}
        </div>

        <div className="px-5 flex flex-col items-end justify-center shrink-0 border-l border-white/10 text-right text-[10px] tracking-[0.4em] uppercase text-white/55 gap-1">
          <div className="flex items-center gap-2 truncate max-w-[300px]">
            <span className="text-orange-200/80 truncate">{imgLabel.toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-2 text-white/45">
            <span>EI 200</span><span className="text-white/25">·</span>
            <span>ƒ8</span><span className="text-white/25">·</span>
            <span>1/125</span><span className="text-white/25">·</span>
            <span>3200K</span>
          </div>
        </div>
      </div>

      {/* ===== POPOVER PANELS ===== */}
      <AnimatePresence mode="wait">
        {panel !== "none" && (
          <motion.aside
            key={panel}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-20 top-32 z-40 w-80 max-h-[68vh] bg-black/85 backdrop-blur-xl border border-white/10 rounded-sm overflow-y-auto shadow-2xl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-2.5 bg-black/85 backdrop-blur border-b border-white/10" style={{ fontFamily: MONO }}>
              <span className="text-[10px] tracking-[0.3em] uppercase text-orange-200/90">
                {TOOLS.find((t) => t.id === panel)?.n} · {fullName(panel)}
              </span>
              <button onClick={() => setPanel("none")} className="text-white/40 hover:text-white text-base leading-none">✕</button>
            </div>
            {panel === "library" && <LibraryPanel imgSrc={imgSrc} setImg={(url, label) => { setImgSrc(url); setImgLabel(label); }} onUpload={() => fileInputRef.current?.click()} />}
            {panel === "luts" && <LutsPanel lut={lut} setLut={setLut} luts={allLuts} onImportCube={() => cubeInputRef.current?.click()} onDelete={(id) => { deleteCustomLut(id); setCustomLuts(loadCustomLuts()); }} />}
            {panel === "adjust" && <AdjustPanel adj={adj} setAdj={setAdj} />}
            {panel === "hsl" && <HSLPanel />}
            {panel === "curves" && <CurvesPanel />}
            {panel === "masks" && <MasksPanel />}
            {panel === "crop" && <CropPanel />}
            {panel === "brush" && <BrushPanel />}
            {panel === "design" && <DesignPanel extra={extraFilter} setEffect={setDesignEffect} onSave={saveDesignAsLut} onExportCube={exportCube} />}
            {panel === "history" && <HistoryPanel lutName={lut.name} />}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 z-50 bg-black/90 backdrop-blur border border-orange-300/40 rounded-sm px-4 py-2 text-[10px] tracking-[0.3em] uppercase text-orange-200"
            style={{ fontFamily: MONO }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

/* ============== Helpers ============== */

function composeFilter(adj: Adjust, lutFilter: string, extra: string, showOriginal: boolean): string {
  if (showOriginal) {
    return `brightness(${adj.exposure / 100}) contrast(${adj.contrast / 100}) saturate(${adj.saturation / 100})`;
  }
  const intensity = adj.intensity / 100;
  const warmthHue = adj.warmth * -0.4;
  const lutPart = intensity > 0 ? lutFilter : "";
  return [
    extra,
    `brightness(${adj.exposure / 100})`,
    `contrast(${adj.contrast / 100})`,
    `saturate(${adj.saturation / 100})`,
    `hue-rotate(${warmthHue}deg)`,
    lutPart,
    intensity < 1 && intensity > 0 ? `opacity(${Math.max(0.05, intensity)})` : "",
  ].filter(Boolean).join(" ");
}

function fullName(id: PanelId): string {
  const map: Record<PanelId, string> = {
    none: "", library: "ALBUM", luts: "LUT · PRESETS", adjust: "ADJUSTMENTS",
    hsl: "HSL · SELECTIVE", curves: "TONE CURVES", masks: "MASKS · QUALIFIER",
    crop: "CROP & ROTATE", brush: "BRUSH · LOCAL", design: "DESIGN · NEW LUT", history: "HISTORY",
  };
  return map[id];
}

/* ===== SVG filter definitions for IR/UV ===== */
function SvgFilterDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden>
      <defs>
        {/*
          Aerochrome-style IR: swap red ↔ blue, push greens into magenta range,
          boost reds for "glowing foliage" effect. ColorMatrix RGBA.
        */}
        <filter id="wildlight-ir">
          <feColorMatrix type="matrix" values={`
            0.10 0.20 1.10 0 0
            0.40 0.10 0.10 0 0
            1.30 -0.20 0.00 0 0
            0.00 0.00 0.00 1 0
          `} />
          <feComponentTransfer><feFuncR type="gamma" amplitude="1.05" exponent="0.9" offset="0.02"/><feFuncG type="gamma" amplitude="1" exponent="1" offset="0"/><feFuncB type="gamma" amplitude="0.95" exponent="1.1" offset="0"/></feComponentTransfer>
        </filter>
        {/*
          UV-fluorescence look: dark blues, lifted cyans, pushed violets in
          highlights, deepened blacks.
        */}
        <filter id="wildlight-uv">
          <feColorMatrix type="matrix" values={`
            0.55 -0.15 0.55 0 0
            -0.05 0.65 0.55 0 0
            0.10 0.10 1.20 0 0
            0.00 0.00 0.00 1 0
          `} />
          <feComponentTransfer><feFuncR type="gamma" amplitude="0.9" exponent="1.15" offset="0"/><feFuncG type="gamma" amplitude="0.95" exponent="1.05" offset="0"/><feFuncB type="gamma" amplitude="1.15" exponent="0.85" offset="0.03"/></feComponentTransfer>
        </filter>
      </defs>
    </svg>
  );
}

/* ============== Toolbar glyphs ============== */
function GlyphGrid() { return <svg width="14" height="14"><g fill="currentColor"><rect x="1" y="1" width="5" height="5" /><rect x="8" y="1" width="5" height="5" /><rect x="1" y="8" width="5" height="5" /><rect x="8" y="8" width="5" height="5" /></g></svg>; }
function GlyphStripes() { return <svg width="14" height="14"><g fill="currentColor"><rect x="1" y="2" width="2" height="10" /><rect x="5" y="2" width="2" height="10" /><rect x="9" y="2" width="2" height="10" /></g></svg>; }
function GlyphSliders() { return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4"><line x1="2" y1="4" x2="12" y2="4" /><circle cx="5" cy="4" r="1.5" fill="currentColor" /><line x1="2" y1="9" x2="12" y2="9" /><circle cx="9" cy="9" r="1.5" fill="currentColor" /></svg>; }
function GlyphCircle() { return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="7" cy="7" r="5" /><circle cx="7" cy="7" r="2" fill="currentColor" /></svg>; }
function GlyphCurve() { return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M2 12 C 5 12, 7 4, 12 2" /></svg>; }
function GlyphMask() { return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="5" cy="7" r="4" /><circle cx="9" cy="7" r="4" /></svg>; }
function GlyphCrop() { return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M4 1v9h9M1 4h9v9" /></svg>; }
function GlyphBrush() { return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M2 12 L9 5 L11 7 L4 14 z" /><line x1="9" y1="5" x2="11" y2="3" /></svg>; }
function GlyphClock() { return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="7" cy="7" r="5" /><path d="M7 4v3l2 2" /></svg>; }
function GlyphDesign() { return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M2 12 L8 6 L12 10" /><circle cx="11" cy="3" r="1.5" fill="currentColor" /></svg>; }

/* ============== Panels ============== */
function LibraryPanel({ imgSrc, onUpload }: { imgSrc: string; setImg: (url: string, label: string) => void; onUpload: () => void }) {
  return (
    <div className="p-5">
      <PanelTitle>YOUR ALBUM</PanelTitle>
      <button onClick={onUpload} className="w-full rounded-sm border border-dashed border-white/20 hover:border-orange-300/60 hover:bg-white/5 transition p-6 text-[10px] tracking-[0.3em] uppercase text-white/70 flex flex-col items-center gap-2" style={{ fontFamily: MONO }}>
        <svg width="20" height="20" viewBox="0 0 20 20"><path d="M10 2v14M4 9l6-6 6 6M3 18h14" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        UPLOAD · OR DRAG ANYWHERE
      </button>
      {imgSrc ? (
        <p className="mt-4 text-[10px] tracking-[0.3em] uppercase text-stone-500 leading-relaxed" style={{ fontFamily: MONO }}>
          1 IMAGE LOADED · DROP ANOTHER TO REPLACE
        </p>
      ) : (
        <p className="mt-4 text-[10px] tracking-[0.3em] uppercase text-stone-500 leading-relaxed" style={{ fontFamily: MONO }}>
          NO IMAGE LOADED · YOUR FILES STAY LOCAL · NOTHING IS UPLOADED OFF-DEVICE
        </p>
      )}
    </div>
  );
}

function LutsPanel({ lut, setLut, luts, onImportCube, onDelete }: { lut: Lut | CustomLut; setLut: (l: Lut | CustomLut) => void; luts: (Lut | CustomLut)[]; onImportCube: () => void; onDelete: (id: string) => void }) {
  const customs = luts.filter((l) => "source" in l) as CustomLut[];
  const builtins = luts.filter((l) => !("source" in l));
  return (
    <div className="p-5 space-y-4">
      <button onClick={onImportCube} className="w-full rounded-sm border border-dashed border-white/20 hover:border-orange-300/60 hover:bg-white/5 transition p-3 text-[10px] tracking-[0.3em] uppercase text-white/70" style={{ fontFamily: MONO }}>
        + IMPORT .CUBE
      </button>
      {customs.length > 0 && (
        <div>
          <PanelTitle n={`${customs.length}`}>YOUR LUTS</PanelTitle>
          <div className="space-y-0.5">
            {customs.map((l) => (
              <div key={l.id} className={`group flex items-center gap-2 p-2 rounded-sm ${l.id === lut.id ? "bg-orange-700/30 text-orange-100" : "hover:bg-white/5 text-stone-300"}`}>
                <button onClick={() => setLut(l)} className="flex items-center gap-2 flex-1 min-w-0 text-left">
                  <span className="flex gap-0.5">{l.swatch.map((c, ci) => <span key={ci} className="w-1.5 h-6" style={{ background: c }} />)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate" style={{ fontFamily: DISPLAY, fontStyle: "italic", fontSize: "1.05rem" }}>{l.name}</div>
                    <div className="text-[9px] tracking-[0.25em] uppercase text-white/40" style={{ fontFamily: MONO }}>{l.source === "user-cube" ? `.CUBE · ${l.cubeSize}³` : "DESIGN"}</div>
                  </div>
                </button>
                <button onClick={() => onDelete(l.id)} className="opacity-0 group-hover:opacity-100 text-white/40 hover:text-white text-xs" title="Remove">✕</button>
              </div>
            ))}
          </div>
        </div>
      )}
      <div>
        <PanelTitle n="8">HOUSE</PanelTitle>
        <div className="space-y-0.5">
          {builtins.map((l) => (
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
    </div>
  );
}

function AdjustPanel({ adj, setAdj }: { adj: Adjust; setAdj: (a: Adjust) => void }) {
  const Row = ({ label, k, min, max, signed }: { label: string; k: keyof Adjust; min: number; max: number; signed?: boolean }) => (
    <div className="py-2">
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-[11px] text-stone-300">{label}</span>
        <span className="text-[10px] text-white/60" style={{ fontFamily: MONO }}>{signed && adj[k] > 0 ? "+" : ""}{adj[k]}</span>
      </div>
      <input type="range" min={min} max={max} value={adj[k]} onChange={(e) => setAdj({ ...adj, [k]: parseInt(e.target.value) })} className="w-full accent-orange-300" />
    </div>
  );
  return (
    <div className="p-5">
      <PanelTitle>BASIC · LIVE</PanelTitle>
      <Row label="Intensity" k="intensity" min={0} max={100} />
      <Row label="Exposure" k="exposure" min={50} max={150} />
      <Row label="Contrast" k="contrast" min={50} max={150} />
      <Row label="Saturation" k="saturation" min={0} max={200} />
      <Row label="Warmth" k="warmth" min={-30} max={30} signed />
    </div>
  );
}

function DesignPanel({ extra, setEffect, onSave, onExportCube }: { extra: string; setEffect: (k: "none" | "ir" | "uv") => void; onSave: () => void; onExportCube: () => void }) {
  const active = extra.includes("ir") ? "ir" : extra.includes("uv") ? "uv" : "none";
  return (
    <div className="p-5 space-y-5">
      <div>
        <PanelTitle>CHANNEL MAPPING</PanelTitle>
        <p className="text-[11px] text-white/55 leading-relaxed mb-3" style={{ fontFamily: DISPLAY, fontStyle: "italic", fontSize: "0.95rem" }}>
          Re-route the spectrum. IR swaps red ↔ blue and pushes greens into magenta (Aerochrome-style); UV deepens skies and pulls highlights into cyan-violet.
        </p>
        <div className="grid grid-cols-3 gap-2">
          {([["none", "OFF"], ["ir", "INFRARED"], ["uv", "ULTRAVIOLET"]] as const).map(([k, l]) => (
            <button
              key={k}
              onClick={() => setEffect(k)}
              className={`py-3 rounded-sm text-[10px] tracking-[0.2em] uppercase border transition ${active === k ? "bg-violet-700/30 border-violet-400 text-violet-100" : "border-white/15 hover:border-white/40 text-white/60"}`}
              style={{ fontFamily: MONO }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div>
        <PanelTitle>RECIPE</PanelTitle>
        <p className="text-[11px] text-white/55 leading-relaxed" style={{ fontFamily: DISPLAY, fontStyle: "italic", fontSize: "0.95rem" }}>
          Tune Adjustments &amp; pick a base LUT to shape the grade. When you like it, save the recipe as a custom LUT, or export it to .cube for use in Lightroom, Resolve, Capture One.
        </p>
      </div>

      <div className="space-y-2 pt-2">
        <button onClick={onSave} className="w-full py-3 rounded-sm bg-orange-300 hover:bg-orange-200 text-black text-[10px] tracking-[0.3em] uppercase transition" style={{ fontFamily: MONO }}>
          SAVE AS CUSTOM LUT
        </button>
        <button onClick={onExportCube} className="w-full py-3 rounded-sm border border-white/15 hover:border-white/40 text-[10px] tracking-[0.3em] uppercase text-white/80 transition" style={{ fontFamily: MONO }}>
          EXPORT .CUBE ↓
        </button>
      </div>

      <p className="text-[9px] text-white/35 leading-relaxed" style={{ fontFamily: MONO }}>
        NOTE · IR / UV CHANNEL MAPS USE SVG FECOLORMATRIX. ACCURATE BAKING TO .CUBE REQUIRES A WEBGL RENDER STAGE (PLANNED). UNTIL THEN, EXPORTED .CUBE FILES INCLUDE THE BASE GRADE WITHOUT THE IR/UV MATRIX.
      </p>
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
              <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-3 rounded-sm bg-orange-300" style={{ left: `${30 + (n.charCodeAt(0) % 4) * 10}%` }} />
            </div>
            <span className="text-[9px] text-white/50 w-7 text-right" style={{ fontFamily: MONO }}>{((n.charCodeAt(0) % 7) - 3) * 4}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[9px] text-white/35 leading-relaxed" style={{ fontFamily: MONO }}>NOTE · HSL READ-ONLY IN PREVIEW · WIRING UNDERWAY</p>
    </div>
  );
}

function CurvesPanel() {
  return (
    <div className="p-5 space-y-4">
      <div><PanelTitle n="RGB">TONE CURVE</PanelTitle><ToneCurve /></div>
      <div className="grid grid-cols-4 gap-2 text-[10px]" style={{ fontFamily: MONO }}>
        {["RGB", "R", "G", "B"].map((c, i) => (
          <button key={c} className={`py-1 rounded-sm tracking-[0.2em] ${i === 0 ? "bg-orange-700/30 text-orange-200" : "bg-white/5 text-white/50"}`}>{c}</button>
        ))}
      </div>
      <p className="text-[9px] text-white/35 leading-relaxed" style={{ fontFamily: MONO }}>NOTE · CURVES READ-ONLY IN PREVIEW · WIRING UNDERWAY</p>
    </div>
  );
}

function MasksPanel() {
  return <div className="p-5"><PanelTitle n="3 LAYERS">MASKS · QUALIFIER</PanelTitle><p className="text-[11px] text-white/55" style={{ fontFamily: DISPLAY, fontStyle: "italic", fontSize: "0.95rem" }}>Local masking is on the roadmap (hue / luma / linear gradient qualifiers).</p></div>;
}
function CropPanel() {
  return <div className="p-5"><PanelTitle>CROP &amp; ROTATE</PanelTitle><p className="text-[11px] text-white/55" style={{ fontFamily: DISPLAY, fontStyle: "italic", fontSize: "0.95rem" }}>Aspect lock + free rotate is on the roadmap.</p></div>;
}
function BrushPanel() {
  return <div className="p-5"><PanelTitle>BRUSH · LOCAL</PanelTitle><p className="text-[11px] text-white/55" style={{ fontFamily: DISPLAY, fontStyle: "italic", fontSize: "0.95rem" }}>Local paintable adjustments are on the roadmap.</p></div>;
}

function HistoryPanel({ lutName }: { lutName: string }) {
  return (
    <div className="p-5">
      <PanelTitle n="12">HISTORY</PanelTitle>
      <ol className="space-y-1.5 text-[11px]" style={{ fontFamily: MONO }}>
        {[`LUT · ${lutName}`, "Adj · exposure +0.12", "Adj · contrast +18", "Design · IR map", "Import · ridge_07.RAF"].map((t, i) => (
          <li key={i} className={`flex items-center gap-2 ${i === 0 ? "text-orange-200" : "text-stone-400"}`}>
            <span className="text-white/30 w-5">{String(i + 1).padStart(2, "0")}</span>
            <span className="flex-1">{t}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
