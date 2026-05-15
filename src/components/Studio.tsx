"use client";
import { useEffect, useRef, useState } from "react";
import { LUTS } from "@/lib/luts";
import { SAMPLE_IMAGES } from "@/lib/sample-images";

type Adjustments = {
  exposure: number;
  contrast: number;
  saturation: number;
  warmth: number;
  intensity: number;
};

const DEFAULT_ADJ: Adjustments = {
  exposure: 100,
  contrast: 100,
  saturation: 100,
  warmth: 0,
  intensity: 100,
};

export function Studio() {
  const [lut, setLut] = useState(LUTS[7]);
  const [src, setSrc] = useState<string>(SAMPLE_IMAGES[0].url);
  const [adj, setAdj] = useState<Adjustments>(DEFAULT_ADJ);
  const [showOriginal, setShowOriginal] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const filter = buildFilter(adj, lut.filter, showOriginal);

  const onFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setSrc(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      const f = e.dataTransfer?.files?.[0];
      if (f && f.type.startsWith("image/")) onFile(f);
    };
    const onOver = (e: DragEvent) => e.preventDefault();
    window.addEventListener("drop", onDrop);
    window.addEventListener("dragover", onOver);
    return () => {
      window.removeEventListener("drop", onDrop);
      window.removeEventListener("dragover", onOver);
    };
  }, []);

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col lg:flex-row">
      {/* Sidebar left */}
      <aside className="w-full lg:w-80 lg:min-w-80 border-b lg:border-b-0 lg:border-r border-white/5 bg-ink-900/40 backdrop-blur p-6 overflow-y-auto">
        <SectionTitle>Image</SectionTitle>
        <button
          onClick={() => fileRef.current?.click()}
          className="w-full mb-3 rounded-lg border border-dashed border-white/20 hover:border-ember-300/60 hover:bg-white/5 transition p-4 text-sm text-white/70"
        >
          <div className="flex flex-col items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" className="text-ember-300">
              <path d="M10 3v12M4 9l6-6 6 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Drop image or click</span>
          </div>
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
        />

        <div className="grid grid-cols-3 gap-1.5 mb-8">
          {SAMPLE_IMAGES.map((s) => (
            <button
              key={s.id}
              onClick={() => setSrc(s.url)}
              className={`aspect-square rounded overflow-hidden ring-1 ${
                s.url === src ? "ring-ember-300 ring-2" : "ring-white/10 hover:ring-white/30"
              }`}
            >
              <img src={s.url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        <SectionTitle>LUT</SectionTitle>
        <div className="space-y-1 mb-8">
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
              <div className="flex-1 min-w-0">
                <div className="text-sm truncate">{l.name}</div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-white/40">{l.family}</div>
              </div>
              {l.id === lut.id && <span className="text-ember-300 text-xs">●</span>}
            </button>
          ))}
        </div>
      </aside>

      {/* Canvas */}
      <div className="flex-1 flex flex-col bg-gradient-to-b from-ink-950 to-ink-900 relative">
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative">
          <div className="absolute inset-0 aurora opacity-50" />
          <div className="relative max-w-5xl max-h-full w-full">
            <img
              src={src}
              alt="canvas"
              className="block w-full max-h-[70vh] object-contain rounded-xl shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10 transition-[filter] duration-200"
              style={{ filter }}
            />
            <div className="absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase bg-black/40 backdrop-blur px-2 py-1 rounded text-white/80">
              {showOriginal ? "Original" : lut.name}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 bg-ink-900/60 backdrop-blur px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <button
            onMouseDown={() => setShowOriginal(true)}
            onMouseUp={() => setShowOriginal(false)}
            onMouseLeave={() => setShowOriginal(false)}
            onTouchStart={() => setShowOriginal(true)}
            onTouchEnd={() => setShowOriginal(false)}
            className="text-xs tracking-[0.18em] uppercase border border-white/15 hover:border-white/40 px-4 py-2 rounded-full transition"
          >
            Hold to compare
          </button>
          <div className="text-xs text-white/40 font-mono">
            {lut.name} · ex {adj.exposure} · co {adj.contrast} · sa {adj.saturation} · wm {adj.warmth >= 0 ? `+${adj.warmth}` : adj.warmth} · int {adj.intensity}%
          </div>
          <button
            onClick={() => setAdj(DEFAULT_ADJ)}
            className="text-xs tracking-[0.18em] uppercase text-white/60 hover:text-white transition"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Sidebar right — sliders */}
      <aside className="w-full lg:w-80 lg:min-w-80 border-t lg:border-t-0 lg:border-l border-white/5 bg-ink-900/40 backdrop-blur p-6 overflow-y-auto">
        <SectionTitle>Adjust</SectionTitle>
        <div className="space-y-5">
          <Slider label="Intensity" value={adj.intensity} min={0} max={100} onChange={(v) => setAdj({ ...adj, intensity: v })} />
          <Slider label="Exposure" value={adj.exposure} min={50} max={150} onChange={(v) => setAdj({ ...adj, exposure: v })} />
          <Slider label="Contrast" value={adj.contrast} min={50} max={150} onChange={(v) => setAdj({ ...adj, contrast: v })} />
          <Slider label="Saturation" value={adj.saturation} min={0} max={200} onChange={(v) => setAdj({ ...adj, saturation: v })} />
          <Slider label="Warmth" value={adj.warmth} min={-30} max={30} onChange={(v) => setAdj({ ...adj, warmth: v })} signed />
        </div>

        <div className="mt-10">
          <SectionTitle>Export</SectionTitle>
          <button className="w-full rounded-lg bg-ember-400 hover:bg-ember-300 text-ink-950 text-sm font-medium tracking-tight px-4 py-3 transition btn-primary">
            Download PNG
          </button>
          <p className="mt-3 text-xs text-white/40 leading-relaxed">
            Export burns the LUT into the pixel data. Original file is never overwritten.
          </p>
        </div>
      </aside>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <div className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-4">{children}</div>;
}

function Slider({
  label,
  value,
  min,
  max,
  onChange,
  signed,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  signed?: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-xs text-white/70">{label}</span>
        <span className="text-[11px] text-white/40 font-mono">
          {signed && value > 0 ? "+" : ""}
          {value}
        </span>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full accent-ember-400"
      />
    </div>
  );
}

function buildFilter(adj: Adjustments, lutFilter: string, showOriginal: boolean): string {
  if (showOriginal) {
    return `brightness(${adj.exposure / 100}) contrast(${adj.contrast / 100}) saturate(${adj.saturation / 100})`;
  }
  const intensity = adj.intensity / 100;
  const warmthHue = adj.warmth * -0.4; // -12..12 deg
  return [
    `brightness(${adj.exposure / 100})`,
    `contrast(${adj.contrast / 100})`,
    `saturate(${adj.saturation / 100})`,
    `hue-rotate(${warmthHue}deg)`,
    lutFilter,
    intensity < 1 ? `opacity(${Math.max(0.05, intensity)})` : "",
  ]
    .filter(Boolean)
    .join(" ");
}
