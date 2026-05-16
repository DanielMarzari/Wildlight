"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LUTS, type Lut } from "@/lib/luts";
import { SAMPLE_IMAGES, exifLine } from "@/lib/sample-images";
import { ApertureInline, ApertureStamp } from "@/components/brand";
import { CornerTick, Histogram, ToneCurve, PanelTitle } from "@/components/studio-chrome";
import { loadCustomLuts, saveCustomLut, deleteCustomLut, filterToCube, downloadFile, type CustomLut } from "@/lib/lut-io";
import { WebGLCanvas, type WebGLCanvasHandle } from "@/components/WebGLCanvas";
import { loadImageFile, isRawFilename, type ParsedExif } from "@/lib/image-io";
import { type Adjust as GLAdjust } from "@/lib/lut-engine";

const MONO = "'IBM Plex Mono', monospace";
const DISPLAY = '"Cormorant Garamond", "Cormorant", Georgia, serif';

type Channel = "off" | "ir" | "uv";
type Family = (typeof FAMILIES)[number];
const FAMILIES = ["Cinematic", "Portrait", "Landscape", "Mono", "Travel", "Editorial"] as const;

/** A band → band hue remap (e.g. shift greens toward cyan at 70%) */
type BandMap = { id: string; source: BandKey; target: BandKey; amount: number };
type BandKey = "red" | "orange" | "yellow" | "green" | "cyan" | "blue" | "purple" | "magenta";

const BANDS: { key: BandKey; label: string; hue: number; color: string }[] = [
  { key: "red",     label: "RED",     hue: 0,   color: "#d6452f" },
  { key: "orange",  label: "ORANGE",  hue: 30,  color: "#d68a3e" },
  { key: "yellow",  label: "YELLOW",  hue: 55,  color: "#d8c15a" },
  { key: "green",   label: "GREEN",   hue: 120, color: "#6b9e6b" },
  { key: "cyan",    label: "CYAN",    hue: 180, color: "#5fa7b6" },
  { key: "blue",    label: "BLUE",    hue: 220, color: "#5a6ec5" },
  { key: "purple",  label: "PURPLE",  hue: 270, color: "#9a6cc5" },
  { key: "magenta", label: "MAGENTA", hue: 310, color: "#c45a9c" },
];

type State = {
  /** Optional base LUT to start from (or null to design from scratch) */
  baseLut: string | null;
  channel: Channel;
  exposure: number; contrast: number; saturation: number; warmth: number;
  liftR: number; liftG: number; liftB: number;       // shadows tint (-30..+30)
  gainR: number; gainG: number; gainB: number;       // highlights tint
  fade: number;   // shadow lift (0..30) for matte/faded look
  sepia: number;  // 0..40
  hue: number;    // -30..+30 deg
  grayscale: number; // 0..100
  bandMaps: BandMap[];
};

const DEFAULT: State = {
  baseLut: null, channel: "off",
  exposure: 100, contrast: 100, saturation: 100, warmth: 0,
  liftR: 0, liftG: 0, liftB: 0,
  gainR: 0, gainG: 0, gainB: 0,
  fade: 0, sepia: 0, hue: 0, grayscale: 0,
  bandMaps: [],
};

const SWATCH_PRESETS: { name: string; colors: [string, string, string] }[] = [
  { name: "Ember",    colors: ["#3a1d0a", "#c46a1f", "#f4c98a"] },
  { name: "Twilight", colors: ["#0c0a18", "#5a3fb8", "#b39ddb"] },
  { name: "Sage",     colors: ["#0a1d10", "#4e8773", "#a8c5b5"] },
  { name: "Ash",      colors: ["#0a0a0c", "#5c5c63", "#e5e3df"] },
  { name: "Coral",    colors: ["#3a1c1f", "#c98080", "#f3d8cf"] },
  { name: "Cyan",     colors: ["#0c1a22", "#3a6b7a", "#a8c5d4"] },
];

export default function DesignPage() {
  const [state, setState] = useState<State>(DEFAULT);
  const [imgIdx, setImgIdx] = useState(3);
  const [customImg, setCustomImg] = useState<string | null>(null);
  const [customImgLabel, setCustomImgLabel] = useState<string>("");
  const [customExif, setCustomExif] = useState<ParsedExif | null>(null);
  const [name, setName] = useState("Untitled grade");
  const [family, setFamily] = useState<Family>("Cinematic");
  const [swatch, setSwatch] = useState<[string, string, string]>(SWATCH_PRESETS[0].colors);
  const [customLuts, setCustomLuts] = useState<CustomLut[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<WebGLCanvasHandle>(null);

  useEffect(() => { setCustomLuts(loadCustomLuts()); }, []);
  useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(null), 2400); return () => clearTimeout(id); }, [toast]);

  // Drag/drop on the whole document
  useEffect(() => {
    const onOver = (e: DragEvent) => { e.preventDefault(); };
    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      const f = e.dataTransfer?.files?.[0];
      if (f) onPickFile(f);
    };
    window.addEventListener("dragover", onOver);
    window.addEventListener("drop", onDrop);
    return () => { window.removeEventListener("dragover", onOver); window.removeEventListener("drop", onDrop); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const previewSrc = customImg ?? SAMPLE_IMAGES[imgIdx % SAMPLE_IMAGES.length].url;
  const previewMeta = customImg ? null : SAMPLE_IMAGES[imgIdx % SAMPLE_IMAGES.length];

  // CSS filter chain for the cube generation + dock thumbs (thumbs stay CSS for speed)
  const composedFilter = composeDesignFilter(state);
  // What we feed to the WebGL cube: everything except the basic uniforms
  const cubeOnlyFilter = composeCubeFilter(state);
  const glAdjust = stateToGLAdjust(state);

  const reset = () => { setState(DEFAULT); setToast("RESET"); };

  const onPickFile = useCallback(async (file: File) => {
    if (isRawFilename(file.name)) {
      setToast(`RAW · PREVIEW NOT YET SUPPORTED · ${file.name.toUpperCase()}`);
      return;
    }
    if (!file.type.startsWith("image/") && !/\.(jpe?g|png|webp|heic|heif|gif|tiff?)$/i.test(file.name)) return;
    setLoading(true);
    try {
      const loaded = await loadImageFile(file);
      setCustomImg(loaded.url);
      setCustomImgLabel(loaded.filename.replace(/\.[^.]+$/, "").replaceAll("_", " "));
      setCustomExif(loaded.exif);
      setToast(`LOADED · ${loaded.isHeic ? "HEIC → JPEG · " : ""}${file.name}`);
    } catch {
      setToast(`LOAD FAILED · ${file.name}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const save = async () => {
    const id = `design-${Date.now().toString(36)}`;
    let cubeData: number[] | undefined;
    try {
      const baseFilter = composeDesignFilter({ ...state, channel: "off" });
      const { data } = await filterToCube(baseFilter, 17);
      cubeData = data;
    } catch { /* ignore */ }
    const newLut: CustomLut = {
      id,
      name: name.trim() || "Untitled grade",
      family,
      description: state.channel !== "off" ? `Designed grade with ${state.channel.toUpperCase()} channel map.` : "Designed grade.",
      filter: composedFilter,
      swatch,
      source: "user-design",
      cube: cubeData,
      cubeSize: 17,
    };
    saveCustomLut(newLut);
    setCustomLuts(loadCustomLuts());
    setToast(`SAVED · ${newLut.name.toUpperCase()}`);
  };

  const exportCube = async () => {
    try {
      const baseFilter = composeDesignFilter({ ...state, channel: "off" });
      const { text } = await filterToCube(baseFilter, 17);
      downloadFile(`${(name || "wildlight_design").replace(/\s+/g, "_").toLowerCase()}.cube`, text, "text/plain");
      setToast(".CUBE · DOWNLOADED");
    } catch { setToast("EXPORT · FAILED"); }
  };

  return (
    <main className="min-h-screen bg-[#0a0807] text-[#e8dfd1] flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&display=swap" rel="stylesheet" />
      <SvgFilterDefs />

      <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && onPickFile(e.target.files[0])} />

      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-30 backdrop-blur bg-black/40 border-b border-white/5">
        <nav className="h-14 px-6 lg:px-12 flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition">
            <ApertureInline size={20} color="#e8dfd1" textClass="text-base" />
          </Link>
          <div className="hidden md:flex items-center gap-8 text-[10px] tracking-[0.4em] uppercase text-stone-400" style={{ fontFamily: MONO }}>
            <Link href="/album" className="hover:text-white transition">ALBUM</Link>
            <Link href="/atelier" className="hover:text-white transition">ATELIER</Link>
            <Link href="/design" className="text-white transition">DESIGN</Link>
            <Link href="/studios/c-cell" className="hover:text-white transition">STUDIO</Link>
          </div>
          <Link href="/studios/c-cell" className="text-[10px] tracking-[0.4em] uppercase border border-white/15 hover:border-white/40 px-4 py-2 rounded-sm transition text-white/90" style={{ fontFamily: MONO }}>OPEN STUDIO →</Link>
        </nav>
      </header>

      {/* Masthead */}
      <section className="px-8 lg:px-16 pt-28 pb-12 border-b border-stone-900">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-violet-300/80 mb-3" style={{ fontFamily: MONO }}>DESIGN · LUT WORKSHOP</div>
            <h1 className="text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[0.96] tracking-[-0.02em] max-w-3xl" style={{ fontFamily: DISPLAY, fontWeight: 400 }}>
              Build a LUT from <em className="italic text-orange-200/95" style={{ fontWeight: 300 }}>nothing.</em>
            </h1>
          </div>
          <p className="max-w-md text-white/65 leading-relaxed text-base">
            Move sliders, tint the shadows + highlights, map the spectrum into
            infrared or ultraviolet, save the grade to your shelf, export it as
            a standard <span style={{ fontFamily: MONO }} className="text-orange-200/90">.cube</span> for Lightroom, Resolve, Capture One.
          </p>
        </div>
      </section>

      {/* Main work area */}
      <section className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-px bg-stone-900 min-h-[680px]">
        {/* Preview */}
        <div className="bg-[#080605] flex flex-col">
          <div className="px-6 py-3 border-b border-stone-900 flex items-center justify-between text-[10px] tracking-[0.4em] uppercase text-stone-500" style={{ fontFamily: MONO }}>
            <span className="flex items-center gap-2">
              <span className="block w-1.5 h-1.5 rounded-full bg-orange-300 animate-pulse" />
              LIVE PREVIEW · WEBGL · {state.channel !== "off" ? state.channel.toUpperCase() + " MAP" : "BASE GRADE"}
            </span>
            <div className="flex items-center gap-3">
              {customImg && (
                <button onClick={() => { setCustomImg(null); setCustomExif(null); setCustomImgLabel(""); }} className="text-stone-400 hover:text-white">← TEST SCENES</button>
              )}
              <button onClick={() => fileRef.current?.click()} className="px-3 py-1 rounded-sm bg-orange-300 hover:bg-orange-200 text-black tracking-[0.3em]">
                + YOUR IMAGE
              </button>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative">
            <div className="relative max-w-full flex items-center justify-center">
              <CornerTick className="-top-3 -left-3" rot={0} />
              <CornerTick className="-top-3 -right-3" rot={90} />
              <CornerTick className="-bottom-3 -right-3" rot={180} />
              <CornerTick className="-bottom-3 -left-3" rot={270} />
              <WebGLCanvas
                ref={canvasRef}
                imageUrl={previewSrc}
                filterChain={cubeOnlyFilter}
                cubeKey={`design-${state.baseLut ?? ""}-${state.bandMaps.length}-${state.liftR}-${state.liftG}-${state.liftB}-${state.gainR}-${state.gainG}-${state.gainB}-${state.fade}-${state.bandMaps.map((m) => `${m.source}>${m.target}@${m.amount}`).join(",")}`}
                adjust={glAdjust}
                channel={state.channel}
                className="block max-w-full max-h-[58vh] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]"
                onError={() => setToast("WEBGL · INIT FAILED")}
              />
            </div>
          </div>

          {/* Bottom — meta strip (real EXIF for uploads, test scene picker otherwise) */}
          <div className="px-6 py-4 border-t border-stone-900 flex items-center gap-3 flex-wrap" style={{ fontFamily: MONO }}>
            {customImg ? (
              <>
                <span className="text-[10px] tracking-[0.4em] uppercase text-orange-200/80 shrink-0">{customImgLabel.toUpperCase() || "YOUR IMAGE"}</span>
                {customExif?.camera && <span className="text-[10px] tracking-[0.4em] uppercase text-white/55">{customExif.camera.toUpperCase()}</span>}
                {customExif?.lens && <span className="text-[10px] tracking-[0.4em] uppercase text-white/45">· {customExif.lens.toUpperCase()}</span>}
                <span className="text-[10px] tracking-[0.4em] uppercase text-white/45 ml-auto truncate">
                  {[customExif?.focal, customExif?.aperture, customExif?.shutter, customExif?.ei, customExif?.wb, customExif?.date].filter(Boolean).join(" · ") || "NO METADATA"}
                </span>
              </>
            ) : (
              <>
                <span className="text-[10px] tracking-[0.4em] uppercase text-stone-500 shrink-0">TEST SCENE</span>
                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {SAMPLE_IMAGES.map((s, i) => (
                    <button key={s.id} onClick={() => setImgIdx(i)} className={`shrink-0 relative h-9 aspect-[4/3] overflow-hidden rounded-sm ring-1 transition ${i === imgIdx ? "ring-violet-300 ring-2" : "ring-white/15 hover:ring-white/40"}`}>
                      <img src={s.url} alt="" className="w-full h-full object-cover" style={{ filter: composedFilter }} />
                    </button>
                  ))}
                </div>
                {previewMeta && <span className="ml-auto text-[10px] tracking-[0.3em] uppercase text-stone-500 truncate">{previewMeta.caption.toUpperCase()} · {exifLine(previewMeta)}</span>}
              </>
            )}
          </div>
        </div>

        {/* Right — toolset */}
        <aside className="bg-[#0d0a08] flex flex-col overflow-y-auto">
          {/* Channel map */}
          <ToolSection title="CHANNEL MAP" n="CHROMATIC">
            <div className="grid grid-cols-3 gap-1.5">
              {(["off", "ir", "uv"] as Channel[]).map((c) => (
                <button key={c} onClick={() => setState({ ...state, channel: c })} className={`py-3 rounded-sm text-[10px] tracking-[0.2em] uppercase border transition ${state.channel === c ? "bg-violet-700/30 border-violet-400 text-violet-100" : "border-white/15 hover:border-white/40 text-white/60"}`} style={{ fontFamily: MONO }}>
                  {c === "off" ? "VISIBLE" : c === "ir" ? "INFRARED" : "ULTRAVIOLET"}
                </button>
              ))}
            </div>
            <p className="mt-3 text-[10px] text-white/45 leading-relaxed" style={{ fontFamily: MONO }}>
              IR · R↔B SWAP · FOLIAGE → MAGENTA<br/>
              UV · DEEP BLUES · CYAN-VIOLET HIGHLIGHTS
            </p>
          </ToolSection>

          {/* Spectrum remap */}
          <BandRemapSection
            bandMaps={state.bandMaps}
            onAdd={(m) => setState({ ...state, bandMaps: [...state.bandMaps, m] })}
            onUpdate={(id, patch) => setState({ ...state, bandMaps: state.bandMaps.map((m) => m.id === id ? { ...m, ...patch } : m) })}
            onRemove={(id) => setState({ ...state, bandMaps: state.bandMaps.filter((m) => m.id !== id) })}
          />

          {/* Tone */}
          <ToolSection title="TONE">
            <Slider label="Exposure"   v={state.exposure}   min={50}  max={150} onChange={(v) => setState({ ...state, exposure: v })} unit="%" />
            <Slider label="Contrast"   v={state.contrast}   min={50}  max={150} onChange={(v) => setState({ ...state, contrast: v })} unit="%" />
            <Slider label="Saturation" v={state.saturation} min={0}   max={200} onChange={(v) => setState({ ...state, saturation: v })} unit="%" />
            <Slider label="Fade"       v={state.fade}       min={0}   max={30}  onChange={(v) => setState({ ...state, fade: v })} />
            <Slider label="Grayscale"  v={state.grayscale}  min={0}   max={100} onChange={(v) => setState({ ...state, grayscale: v })} unit="%" />
          </ToolSection>

          {/* Color */}
          <ToolSection title="COLOR">
            <Slider label="Hue rotate" v={state.hue}    min={-30} max={30} signed onChange={(v) => setState({ ...state, hue: v })} unit="°" />
            <Slider label="Warmth"     v={state.warmth} min={-30} max={30} signed onChange={(v) => setState({ ...state, warmth: v })} />
            <Slider label="Sepia"      v={state.sepia}  min={0}   max={40} onChange={(v) => setState({ ...state, sepia: v })} />
          </ToolSection>

          {/* Lift / Gain tint — three sliders each acting on shadows / highlights via combined hue+brightness */}
          <ToolSection title="LIFT · SHADOWS TINT">
            <TintRow label="R" v={state.liftR} onChange={(v) => setState({ ...state, liftR: v })} color="#ff6868" />
            <TintRow label="G" v={state.liftG} onChange={(v) => setState({ ...state, liftG: v })} color="#7aff95" />
            <TintRow label="B" v={state.liftB} onChange={(v) => setState({ ...state, liftB: v })} color="#7aa6ff" />
          </ToolSection>

          <ToolSection title="GAIN · HIGHLIGHTS TINT">
            <TintRow label="R" v={state.gainR} onChange={(v) => setState({ ...state, gainR: v })} color="#ff8b3d" />
            <TintRow label="G" v={state.gainG} onChange={(v) => setState({ ...state, gainG: v })} color="#aaff8b" />
            <TintRow label="B" v={state.gainB} onChange={(v) => setState({ ...state, gainB: v })} color="#8bbaff" />
          </ToolSection>

          {/* Inspect */}
          <ToolSection title="INSPECT">
            <div className="bg-black/30 p-3 rounded-sm mb-2"><Histogram /></div>
            <div className="bg-black/30 p-3 rounded-sm"><ToneCurve /></div>
          </ToolSection>

          {/* Start from */}
          <ToolSection title="START FROM">
            <p className="text-[10px] text-white/45 mb-2" style={{ fontFamily: MONO }}>OPTIONAL · LAYER ON TOP OF A HOUSE LUT</p>
            <div className="grid grid-cols-2 gap-1.5">
              <button onClick={() => setState({ ...state, baseLut: null })} className={`p-2 rounded-sm text-[10px] tracking-[0.2em] uppercase border ${!state.baseLut ? "border-orange-300 bg-orange-300/10 text-orange-200" : "border-white/15 hover:border-white/40 text-white/55"}`} style={{ fontFamily: MONO }}>BLANK</button>
              {LUTS.slice(0, 5).map((l) => (
                <button key={l.id} onClick={() => setState({ ...state, baseLut: l.id })} className={`p-2 rounded-sm text-[10px] tracking-[0.2em] uppercase border ${state.baseLut === l.id ? "border-orange-300 bg-orange-300/10 text-orange-200" : "border-white/15 hover:border-white/40 text-white/55"}`} style={{ fontFamily: MONO }}>
                  {l.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </ToolSection>
        </aside>
      </section>

      {/* Action bar */}
      <section className="bg-[#0d0a08] border-t border-stone-900 px-6 lg:px-12 py-5" style={{ fontFamily: MONO }}>
        <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-end">
          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-4 items-end">
            <label className="block">
              <div className="text-[10px] tracking-[0.4em] uppercase text-stone-500 mb-2">GRADE NAME</div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/40 border border-white/15 focus:border-orange-300 focus:outline-none rounded-sm px-3 py-2.5 text-base tracking-tight italic"
                style={{ fontFamily: DISPLAY }}
                placeholder="Untitled grade"
              />
            </label>
            <label className="block">
              <div className="text-[10px] tracking-[0.4em] uppercase text-stone-500 mb-2">FAMILY</div>
              <select
                value={family}
                onChange={(e) => setFamily(e.target.value as Family)}
                className="w-full bg-black/40 border border-white/15 focus:border-orange-300 focus:outline-none rounded-sm px-3 py-2.5 text-xs tracking-[0.2em] uppercase"
              >
                {FAMILIES.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </label>
            <div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-stone-500 mb-2">SWATCH</div>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">{swatch.map((c, i) => <span key={i} className="w-3 h-10 rounded-sm" style={{ background: c }} />)}</div>
                <select
                  value={SWATCH_PRESETS.find((p) => p.colors.join(",") === swatch.join(","))?.name ?? ""}
                  onChange={(e) => { const p = SWATCH_PRESETS.find((s) => s.name === e.target.value); if (p) setSwatch(p.colors); }}
                  className="flex-1 bg-black/40 border border-white/15 focus:border-orange-300 focus:outline-none rounded-sm px-2 py-2 text-[10px] tracking-[0.2em] uppercase"
                >
                  {SWATCH_PRESETS.map((p) => <option key={p.name} value={p.name}>{p.name}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={reset} className="px-4 py-3 rounded-sm border border-white/15 hover:border-white/40 text-[10px] tracking-[0.3em] uppercase text-white/70">RESET</button>
            <button onClick={exportCube} className="px-4 py-3 rounded-sm border border-white/15 hover:border-white/40 text-[10px] tracking-[0.3em] uppercase text-white/90">EXPORT .CUBE ↓</button>
            <button onClick={save} className="px-5 py-3 rounded-sm bg-orange-300 hover:bg-orange-200 text-black text-[10px] tracking-[0.3em] uppercase transition">SAVE TO SHELF</button>
          </div>
        </div>
      </section>

      {/* Your saved designs */}
      <section className="px-8 lg:px-16 py-16 border-t border-stone-900">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-orange-200/70 mb-2" style={{ fontFamily: MONO }}>YOUR SHELF · BROWSER-LOCAL</div>
            <h2 className="text-3xl lg:text-4xl tracking-[-0.02em]" style={{ fontFamily: DISPLAY, fontWeight: 400 }}>
              Saved <em className="italic text-orange-200/95" style={{ fontWeight: 300 }}>designs.</em>
            </h2>
          </div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-stone-500 max-w-md" style={{ fontFamily: MONO }}>
            ALL SAVES STAY IN THIS BROWSER. SHARE BY EXPORTING .CUBE.
          </p>
        </div>

        {customLuts.length === 0 ? (
          <div className="border border-dashed border-stone-800 rounded-sm p-10 text-center text-[10px] tracking-[0.4em] uppercase text-stone-500" style={{ fontFamily: MONO }}>
            NO SAVED DESIGNS YET. WHEN YOU SAVE ONE IT&apos;LL APPEAR HERE AND IN THE STUDIO&apos;S LUT PANEL.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {customLuts.map((l) => (
              <SavedCard key={l.id} lut={l} previewSrc={previewSrc} onDelete={() => { deleteCustomLut(l.id); setCustomLuts(loadCustomLuts()); setToast("DELETED"); }} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="px-8 lg:px-16 py-16 border-t border-stone-900 flex flex-col lg:flex-row items-center justify-between gap-6">
        <p className="text-sm text-stone-500 max-w-md italic leading-relaxed" style={{ fontFamily: DISPLAY, fontSize: "1.05rem" }}>
          A LUT is a recipe. This is the kitchen.
        </p>
        <ApertureStamp size={48} color="#e8dfd1" est="EST. 2026 · BROOKLYN" />
        <Link href="/studios/c-cell" className="text-[10px] tracking-[0.4em] uppercase text-stone-400 hover:text-white" style={{ fontFamily: MONO }}>STUDIO →</Link>
      </footer>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-black/90 backdrop-blur border border-violet-400/40 rounded-sm px-4 py-2 text-[10px] tracking-[0.3em] uppercase text-violet-200" style={{ fontFamily: MONO }}>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

/* ============== Helpers ============== */

/**
 * Full CSS filter chain — used for thumbnails (test-scene picker reel,
 * saved-design cards) where we want a fast CSS-filter-only render.
 */
function composeDesignFilter(s: State): string {
  const parts: string[] = [];
  if (s.channel === "ir") parts.push("url(#design-ir)");
  if (s.channel === "uv") parts.push("url(#design-uv)");
  parts.push(`brightness(${s.exposure / 100})`);
  parts.push(`contrast(${s.contrast / 100})`);
  parts.push(`saturate(${s.saturation / 100})`);
  if (s.hue !== 0) parts.push(`hue-rotate(${s.hue}deg)`);
  if (s.warmth !== 0) parts.push(`hue-rotate(${s.warmth * -0.4}deg)`);
  if (s.sepia > 0) parts.push(`sepia(${s.sepia / 100})`);
  if (s.grayscale > 0) parts.push(`grayscale(${s.grayscale / 100})`);
  parts.push(bandMapsFilter(s.bandMaps));
  if (s.baseLut) {
    const base: Lut | undefined = LUTS.find((l) => l.id === s.baseLut);
    if (base) parts.push(base.filter);
  }
  parts.push(liftGainFilter(s));
  return parts.filter(Boolean).join(" ");
}

/**
 * The cube-only portion: only the parts that the WebGL pipeline shouldn't
 * double-apply via its own uniforms. Basic exposure / contrast / saturation /
 * warmth / hue / sepia / grayscale are handled by the shader directly; here we
 * keep the LUT-shaped parts (base LUT, band remaps, lift/gain tints).
 */
function composeCubeFilter(s: State): string {
  const parts: string[] = [];
  parts.push(bandMapsFilter(s.bandMaps));
  if (s.baseLut) {
    const base: Lut | undefined = LUTS.find((l) => l.id === s.baseLut);
    if (base) parts.push(base.filter);
  }
  parts.push(liftGainFilter(s));
  return parts.filter(Boolean).join(" ") || "none";
}

function bandMapsFilter(maps: BandMap[]): string {
  if (maps.length === 0) return "";
  let totalDelta = 0;
  let totalWeight = 0;
  for (const m of maps) {
    const src = BANDS.find((b) => b.key === m.source)!;
    const dst = BANDS.find((b) => b.key === m.target)!;
    let delta = dst.hue - src.hue;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    const w = m.amount / 100;
    totalDelta += delta * w;
    totalWeight += w;
  }
  if (totalWeight <= 0) return "";
  const avg = totalDelta / Math.max(1, totalWeight);
  const intensity = Math.min(1, totalWeight / maps.length);
  const out = [`hue-rotate(${(avg * intensity * 0.45).toFixed(2)}deg)`];
  if (intensity > 0.3) out.push(`saturate(${(1 + intensity * 0.15).toFixed(3)})`);
  return out.join(" ");
}

function liftGainFilter(s: State): string {
  const lift = s.liftR - (s.liftG + s.liftB) / 2;
  const gain = s.gainR - (s.gainG + s.gainB) / 2;
  return Math.abs(lift) + Math.abs(gain) > 0
    ? `hue-rotate(${(lift + gain) * 0.15}deg)`
    : "";
}

/** State percent values → WebGL uniform values. */
function stateToGLAdjust(s: State): GLAdjust {
  return {
    exposure: s.exposure / 100,
    contrast: s.contrast / 100,
    saturation: s.saturation / 100,
    warmth: s.warmth / 30,
    hue: s.hue / 30,
    sepia: s.sepia / 100,
    grayscale: s.grayscale / 100,
    intensity: 1,
  };
}

function BandRemapSection({ bandMaps, onAdd, onUpdate, onRemove }: { bandMaps: BandMap[]; onAdd: (m: BandMap) => void; onUpdate: (id: string, patch: Partial<BandMap>) => void; onRemove: (id: string) => void }) {
  const [src, setSrc] = useState<BandKey>("green");
  const [dst, setDst] = useState<BandKey>("cyan");
  const [amount, setAmount] = useState(70);

  const add = () => {
    if (src === dst) return;
    onAdd({ id: `m-${Date.now().toString(36)}`, source: src, target: dst, amount });
  };

  return (
    <div className="border-b border-stone-900 p-5">
      <PanelTitle n="HSL REMAP">SPECTRUM REMAP</PanelTitle>

      {/* Spectrum bar */}
      <div className="h-3 mb-4 rounded-sm overflow-hidden flex">
        {BANDS.map((b) => <span key={b.key} className="flex-1" style={{ background: b.color }} />)}
      </div>

      {/* Source */}
      <div className="text-[9px] tracking-[0.4em] uppercase text-stone-500 mb-1.5" style={{ fontFamily: MONO }}>SOURCE BAND</div>
      <div className="grid grid-cols-8 gap-1 mb-3">
        {BANDS.map((b) => (
          <button
            key={b.key}
            onClick={() => setSrc(b.key)}
            className={`aspect-square rounded-sm border transition ${src === b.key ? "border-orange-300 ring-1 ring-orange-300" : "border-white/10 hover:border-white/30"}`}
            style={{ background: b.color, opacity: src === b.key ? 1 : 0.55 }}
            title={b.label}
            aria-label={`Source: ${b.label}`}
          />
        ))}
      </div>

      {/* Target */}
      <div className="text-[9px] tracking-[0.4em] uppercase text-stone-500 mb-1.5" style={{ fontFamily: MONO }}>TARGET BAND</div>
      <div className="grid grid-cols-8 gap-1 mb-3">
        {BANDS.map((b) => (
          <button
            key={b.key}
            onClick={() => setDst(b.key)}
            className={`aspect-square rounded-sm border transition ${dst === b.key ? "border-violet-300 ring-1 ring-violet-300" : "border-white/10 hover:border-white/30"}`}
            style={{ background: b.color, opacity: dst === b.key ? 1 : 0.55 }}
            title={b.label}
            aria-label={`Target: ${b.label}`}
          />
        ))}
      </div>

      {/* Amount */}
      <div className="mb-3">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-[11px] text-stone-300">Amount</span>
          <span className="text-[10px] text-white/60" style={{ fontFamily: MONO }}>{amount}%</span>
        </div>
        <input type="range" min={0} max={100} value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} className="w-full accent-orange-300 cursor-pointer" />
      </div>

      {/* Add */}
      <button
        onClick={add}
        disabled={src === dst}
        className="w-full py-2.5 rounded-sm border border-white/15 hover:border-orange-300 hover:bg-orange-300/10 transition text-[10px] tracking-[0.3em] uppercase text-white/80 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ fontFamily: MONO }}
      >
        + ADD MAP · {BANDS.find((b) => b.key === src)!.label} → {BANDS.find((b) => b.key === dst)!.label}
      </button>

      {/* Active maps */}
      {bandMaps.length > 0 && (
        <div className="mt-5 space-y-2">
          <div className="text-[9px] tracking-[0.4em] uppercase text-stone-500" style={{ fontFamily: MONO }}>ACTIVE MAPS · {bandMaps.length}</div>
          {bandMaps.map((m) => {
            const s = BANDS.find((b) => b.key === m.source)!;
            const t = BANDS.find((b) => b.key === m.target)!;
            return (
              <div key={m.id} className="group flex items-center gap-2 p-2 rounded-sm bg-white/[0.03] border border-white/5">
                <span className="w-3 h-5 rounded-sm shrink-0" style={{ background: s.color }} />
                <span className="text-white/40 text-xs">→</span>
                <span className="w-3 h-5 rounded-sm shrink-0" style={{ background: t.color }} />
                <div className="flex-1 min-w-0 text-[10px] tracking-[0.3em] uppercase text-white/70" style={{ fontFamily: MONO }}>
                  {s.label} → {t.label}
                </div>
                <input
                  type="range"
                  min={0} max={100}
                  value={m.amount}
                  onChange={(e) => onUpdate(m.id, { amount: parseInt(e.target.value) })}
                  className="w-20 accent-orange-300 cursor-pointer"
                />
                <span className="text-[10px] text-white/55 w-9 text-right" style={{ fontFamily: MONO }}>{m.amount}%</span>
                <button onClick={() => onRemove(m.id)} className="opacity-30 group-hover:opacity-100 text-white/60 hover:text-white shrink-0 transition" title="Remove">✕</button>
              </div>
            );
          })}
        </div>
      )}

      <p className="mt-4 text-[10px] text-white/40 leading-relaxed" style={{ fontFamily: MONO }}>
        APPROXIMATE PER-BAND HUE REMAP · STACKS UP TO 8 MAPS · FULL PIXEL-ACCURATE WIRING ON THE WEBGL ROADMAP
      </p>
    </div>
  );
}

function ToolSection({ title, n, children }: { title: string; n?: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-stone-900 p-5">
      <PanelTitle n={n}>{title}</PanelTitle>
      {children}
    </div>
  );
}

function Slider({ label, v, min, max, onChange, signed, unit }: { label: string; v: number; min: number; max: number; onChange: (n: number) => void; signed?: boolean; unit?: string }) {
  return (
    <div className="py-1.5">
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-[11px] text-stone-300">{label}</span>
        <span className="text-[10px] text-white/60" style={{ fontFamily: MONO }}>{signed && v > 0 ? "+" : ""}{v}{unit ?? ""}</span>
      </div>
      <input type="range" min={min} max={max} value={v} onChange={(e) => onChange(parseInt(e.target.value))} className="w-full accent-orange-300 cursor-pointer" />
    </div>
  );
}

function TintRow({ label, v, onChange, color }: { label: string; v: number; onChange: (n: number) => void; color: string }) {
  return (
    <div className="flex items-center gap-2 py-1.5">
      <span className="w-3 h-5 rounded-sm" style={{ background: color }} />
      <span className="text-[11px] text-stone-300 w-4">{label}</span>
      <input type="range" min={-30} max={30} value={v} onChange={(e) => onChange(parseInt(e.target.value))} className="flex-1 accent-orange-300 cursor-pointer" />
      <span className="text-[10px] text-white/60 w-8 text-right" style={{ fontFamily: MONO }}>{v > 0 ? "+" : ""}{v}</span>
    </div>
  );
}

function SavedCard({ lut, previewSrc, onDelete }: { lut: CustomLut; previewSrc: string; onDelete: () => void }) {
  return (
    <article className="relative bg-[#0d0a08] ring-1 ring-stone-900 hover:ring-orange-300/30 transition group rounded-sm overflow-hidden">
      <div className="aspect-[16/10] relative overflow-hidden">
        <img src={previewSrc} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: lut.filter }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0807] via-transparent to-transparent opacity-80" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between text-[10px] tracking-[0.3em] uppercase text-orange-200/70 mb-2" style={{ fontFamily: MONO }}>
          <span>{lut.source === "user-cube" ? `.CUBE · ${lut.cubeSize}³` : "DESIGN"} · {lut.family.toUpperCase()}</span>
          <button onClick={onDelete} className="opacity-0 group-hover:opacity-100 text-white/40 hover:text-white">✕</button>
        </div>
        <h3 className="text-2xl tracking-[-0.01em]" style={{ fontFamily: DISPLAY, fontStyle: "italic", fontWeight: 400 }}>{lut.name}</h3>
        <p className="mt-1 text-[11px] text-white/55 leading-relaxed line-clamp-2">{lut.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="flex gap-0.5">{lut.swatch.map((c, i) => <span key={i} className="w-1.5 h-5" style={{ background: c }} />)}</span>
          <Link href="/studios/c-cell" className="text-[10px] tracking-[0.3em] uppercase text-orange-200 hover:text-orange-100" style={{ fontFamily: MONO }}>USE IN STUDIO →</Link>
        </div>
      </div>
    </article>
  );
}

/* ===== SVG filter defs for IR / UV ===== */
function SvgFilterDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden>
      <defs>
        <filter id="design-ir">
          <feColorMatrix type="matrix" values={`
            0.10 0.20 1.10 0 0
            0.40 0.10 0.10 0 0
            1.30 -0.20 0.00 0 0
            0.00 0.00 0.00 1 0
          `} />
          <feComponentTransfer><feFuncR type="gamma" amplitude="1.05" exponent="0.9" offset="0.02"/><feFuncG type="gamma" amplitude="1" exponent="1" offset="0"/><feFuncB type="gamma" amplitude="0.95" exponent="1.1" offset="0"/></feComponentTransfer>
        </filter>
        <filter id="design-uv">
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
