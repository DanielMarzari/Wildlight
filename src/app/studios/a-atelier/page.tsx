"use client";
import { useState } from "react";
import { LUTS } from "@/lib/luts";
import { SAMPLE_IMAGES } from "@/lib/sample-images";
import {
  StudioTopBar,
  CornerTick,
  Histogram,
  ToneCurve,
  PanelTitle,
  StudioFooter,
} from "@/components/studio-chrome";

export default function Atelier() {
  const [lut, setLut] = useState(LUTS[7]);
  const [img, setImg] = useState(SAMPLE_IMAGES[0]);

  return (
    <main className="min-h-screen bg-[#0a0807] text-[#e8dfd1]" style={{ fontFamily: "Inter, sans-serif" }}>
      <StudioTopBar letter="A" name="The Atelier" imageCaption={img.caption} lutName={lut.name} />

      <div className="pt-12 grid grid-cols-[220px_1fr_340px] min-h-screen">
        {/* LEFT — filmstrip catalog */}
        <aside className="bg-[#0c0a09] border-r border-stone-900 overflow-y-auto">
          <div className="p-4 border-b border-stone-900">
            <PanelTitle n="240">CATALOG</PanelTitle>
            <div className="flex items-center gap-1.5 text-[10px] text-stone-500 mb-3" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              <button className="px-2 py-1 bg-stone-800 text-stone-200 rounded-sm">ALL</button>
              <button className="px-2 py-1 hover:bg-stone-900 rounded-sm">★ 14</button>
              <button className="px-2 py-1 hover:bg-stone-900 rounded-sm">PICK 6</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1.5 p-3">
            {[...SAMPLE_IMAGES, ...SAMPLE_IMAGES, ...SAMPLE_IMAGES].map((s, i) => (
              <button
                key={i}
                onClick={() => setImg(s)}
                className={`relative aspect-[4/3] overflow-hidden rounded-sm ring-1 ${s.id === img.id && i < 6 ? "ring-orange-300 ring-2" : "ring-stone-900 hover:ring-stone-700"}`}
              >
                <img src={s.url} alt="" className="w-full h-full object-cover" />
                <span className="absolute bottom-0.5 right-1 text-[8px] text-white/80" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{String(i + 1).padStart(3, "0")}</span>
                {i % 4 === 0 && <span className="absolute top-0.5 left-1 text-[8px] text-orange-300">★</span>}
              </button>
            ))}
          </div>
        </aside>

        {/* CENTER — canvas */}
        <section className="relative bg-[#080605] flex flex-col">
          {/* tool ribbon */}
          <div className="h-11 bg-[#0d0a08] border-b border-stone-900 flex items-center px-4 gap-1 text-[11px] text-stone-400" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            {["LIBRARY", "DEVELOP", "GRADE", "EXPORT"].map((t, i) => (
              <button key={t} className={`px-3 py-1 rounded-sm tracking-[0.2em] uppercase ${i === 2 ? "bg-orange-700/30 text-orange-200" : "hover:bg-stone-900"}`}>{t}</button>
            ))}
            <div className="w-px h-5 bg-stone-900 mx-2" />
            {["CROP", "HEAL", "BRUSH", "GRAD"].map((t) => (
              <button key={t} className="px-3 py-1 rounded-sm tracking-[0.2em] uppercase hover:bg-stone-900">{t}</button>
            ))}
          </div>

          {/* viewport */}
          <div className="flex-1 relative flex items-center justify-center p-8 lg:p-16">
            <div className="relative max-w-[860px] max-h-full w-full">
              <CornerTick className="-top-2 -left-2" rot={0} />
              <CornerTick className="-top-2 -right-2" rot={90} />
              <CornerTick className="-bottom-2 -right-2" rot={180} />
              <CornerTick className="-bottom-2 -left-2" rot={270} />
              <img
                src={img.url}
                alt=""
                className="block w-full max-h-[68vh] object-contain shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/5"
                style={{ filter: lut.filter }}
              />
            </div>
          </div>

          {/* footer — frame metadata */}
          <div className="h-10 bg-[#0d0a08] border-t border-stone-900 flex items-center px-4 gap-5 text-[10px] tracking-[0.4em] uppercase text-white/55" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            <span className="text-orange-200/80">{img.caption.toUpperCase()}</span>
            <span className="text-white/25">·</span>
            <span>EI 200 · ƒ8 · 1/125 · 3200K · RAW</span>
            <div className="flex-1" />
            <span>FRAME 014/240</span>
            <span className="text-white/25">·</span>
            <span>{lut.name.toUpperCase()}</span>
          </div>

          <StudioFooter lutName={lut.name} scope="waveform" />
        </section>

        {/* RIGHT — develop panels */}
        <aside className="bg-[#0c0a09] border-l border-stone-900 overflow-y-auto">
          <Panel>
            <PanelTitle n="LUMA">HISTOGRAM</PanelTitle>
            <Histogram />
            <div className="mt-2 grid grid-cols-3 gap-2 text-[10px] text-white/50" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              <div>BLK <span className="text-white">12</span></div>
              <div>MID <span className="text-white">128</span></div>
              <div>WHT <span className="text-white">240</span></div>
            </div>
          </Panel>

          <Panel>
            <PanelTitle n="RGB">TONE CURVE</PanelTitle>
            <ToneCurve />
          </Panel>

          <Panel>
            <PanelTitle>BASIC</PanelTitle>
            <Adj label="Exposure" v="+0.12" />
            <Adj label="Contrast" v="+18" />
            <Adj label="Highlights" v="-22" />
            <Adj label="Shadows" v="+34" />
            <Adj label="Whites" v="+6" />
            <Adj label="Blacks" v="-12" />
            <Adj label="Clarity" v="+8" />
            <Adj label="Vibrance" v="+4" />
            <Adj label="Saturation" v="0" />
          </Panel>

          <Panel>
            <PanelTitle n="8 CHANNELS">HSL · SELECTIVE</PanelTitle>
            <div className="space-y-1">
              {[["Red", "#c1554e"], ["Orange", "#d68a3e"], ["Yellow", "#dfc15a"], ["Green", "#6b9e6b"], ["Cyan", "#5fa7b6"], ["Blue", "#5a6ec5"], ["Purple", "#9a6cc5"], ["Magenta", "#c45a9c"]].map(([n, c]) => (
                <div key={n} className="flex items-center gap-2">
                  <span className="w-2 h-4 rounded-sm" style={{ background: c }} />
                  <span className="text-[10px] text-stone-400 w-14">{n}</span>
                  <FakeSlider />
                  <span className="text-[10px] text-stone-500 w-6 text-right" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{(Math.random() * 40 - 20).toFixed(0)}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <PanelTitle n="8">PRESETS · LUT</PanelTitle>
            <div className="space-y-0.5">
              {LUTS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLut(l)}
                  className={`w-full flex items-center gap-2 p-1.5 rounded-sm text-left text-xs ${l.id === lut.id ? "bg-orange-700/30 text-orange-100" : "hover:bg-stone-900 text-stone-300"}`}
                >
                  <span className="flex gap-0.5">{l.swatch.map((c, ci) => <span key={ci} className="w-1.5 h-5" style={{ background: c }} />)}</span>
                  <span className="flex-1 truncate">{l.name}</span>
                  <span className="text-[9px] text-stone-500" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{l.family.slice(0, 4).toUpperCase()}</span>
                </button>
              ))}
            </div>
          </Panel>

          <Panel>
            <PanelTitle>DETAIL</PanelTitle>
            <Adj label="Sharpening" v="42" />
            <Adj label="Radius" v="1.2" />
            <Adj label="Noise · Luma" v="-8" />
            <Adj label="Noise · Color" v="-4" />
            <Adj label="Texture" v="+6" />
          </Panel>

          <Panel last>
            <PanelTitle>HISTORY</PanelTitle>
            <ol className="space-y-1 text-[10px] text-stone-500" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              {["LUT · Wildlight House", "Highlights -22", "Shadows +34", "Curve · midtone lift", "Crop · 4:5", "Import 14/240"].map((t, i) => (
                <li key={i} className={`flex items-center gap-2 ${i === 0 ? "text-orange-200" : ""}`}>
                  <span className="text-white/30">{String(i + 1).padStart(2, "0")}</span>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
          </Panel>
        </aside>
      </div>
    </main>
  );
}

function Panel({ children, last }: { children: React.ReactNode; last?: boolean }) {
  return <div className={`p-4 ${last ? "" : "border-b border-stone-900"}`}>{children}</div>;
}

function Adj({ label, v }: { label: string; v: string }) {
  return (
    <div className="flex items-center gap-2 py-1">
      <span className="text-[11px] text-stone-400 flex-1">{label}</span>
      <FakeSlider />
      <span className="text-[10px] text-stone-400 w-10 text-right" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{v}</span>
    </div>
  );
}

function FakeSlider() {
  return (
    <div className="flex-1 max-w-[100px] h-px bg-stone-800 relative">
      <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-3 rounded-sm bg-orange-300" style={{ left: `${30 + Math.random() * 40}%` }} />
    </div>
  );
}
