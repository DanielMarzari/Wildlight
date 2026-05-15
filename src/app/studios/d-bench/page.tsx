"use client";
import { useState } from "react";
import { LUTS } from "@/lib/luts";
import { SAMPLE_IMAGES } from "@/lib/sample-images";
import { StudioTopBar, CornerTick, Histogram, ToneCurve, PanelTitle, StudioFooter } from "@/components/studio-chrome";

export default function Bench() {
  const [lutA, setLutA] = useState(LUTS[0]); // Ember Falls
  const [lutB, setLutB] = useState(LUTS[7]); // House
  const [img, setImg] = useState(SAMPLE_IMAGES[0]);
  const [activeSide, setActiveSide] = useState<"A" | "B">("B");

  return (
    <main className="min-h-screen bg-[#0a0807] text-[#e8dfd1]" style={{ fontFamily: "Inter, sans-serif" }}>
      <StudioTopBar letter="D" name="The Bench" imageCaption={img.caption} lutName={`A · ${lutA.name} ▸ B · ${lutB.name}`} />

      <div className="pt-12">
        {/* Top — dual viewports */}
        <div className="grid grid-cols-2 gap-px bg-stone-900 min-h-[60vh]">
          {/* A */}
          <div className={`relative bg-black p-6 flex flex-col cursor-pointer transition ${activeSide === "A" ? "ring-1 ring-orange-300 z-10" : ""}`} onClick={() => setActiveSide("A")}>
            <div className="flex items-center justify-between text-[10px] tracking-[0.4em] uppercase text-white/55 mb-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              <span className={activeSide === "A" ? "text-orange-200" : ""}>● A · {lutA.name.toUpperCase()}</span>
              <span>{lutA.family.toUpperCase()}</span>
            </div>
            <div className="flex-1 flex items-center justify-center min-h-[420px] relative">
              <div className="relative max-h-[55vh]">
                <CornerTick className="-top-2 -left-2" rot={0} />
                <CornerTick className="-top-2 -right-2" rot={90} />
                <CornerTick className="-bottom-2 -right-2" rot={180} />
                <CornerTick className="-bottom-2 -left-2" rot={270} />
                <img src={img.url} alt="" className="block max-h-[55vh] w-auto object-contain" style={{ filter: lutA.filter }} />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-[10px] tracking-[0.4em] uppercase text-white/45" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              <span className="flex gap-0.5">{lutA.swatch.map((c, ci) => <span key={ci} className="w-2 h-3" style={{ background: c }} />)}</span>
              <span>VARIANT A</span>
            </div>
          </div>

          {/* B */}
          <div className={`relative bg-black p-6 flex flex-col cursor-pointer transition ${activeSide === "B" ? "ring-1 ring-orange-300 z-10" : ""}`} onClick={() => setActiveSide("B")}>
            <div className="flex items-center justify-between text-[10px] tracking-[0.4em] uppercase text-white/55 mb-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              <span className={activeSide === "B" ? "text-orange-200" : ""}>● B · {lutB.name.toUpperCase()}</span>
              <span>{lutB.family.toUpperCase()}</span>
            </div>
            <div className="flex-1 flex items-center justify-center min-h-[420px] relative">
              <div className="relative max-h-[55vh]">
                <CornerTick className="-top-2 -left-2" rot={0} />
                <CornerTick className="-top-2 -right-2" rot={90} />
                <CornerTick className="-bottom-2 -right-2" rot={180} />
                <CornerTick className="-bottom-2 -left-2" rot={270} />
                <img src={img.url} alt="" className="block max-h-[55vh] w-auto object-contain" style={{ filter: lutB.filter }} />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-[10px] tracking-[0.4em] uppercase text-white/45" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              <span className="flex gap-0.5">{lutB.swatch.map((c, ci) => <span key={ci} className="w-2 h-3" style={{ background: c }} />)}</span>
              <span>VARIANT B</span>
            </div>
          </div>
        </div>

        {/* Sticky control between */}
        <div className="bg-[#0d0a08] border-y border-stone-900 px-6 py-3 flex items-center justify-between" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          <span className="text-[10px] tracking-[0.4em] uppercase text-orange-200/80">EI 200 · ƒ8 · 1/125 · 3200K · RAW</span>
          <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase">
            <button className="px-3 py-1.5 rounded-sm bg-stone-900 text-stone-300 hover:bg-stone-800">SWAP A↔B</button>
            <button className="px-3 py-1.5 rounded-sm bg-stone-900 text-stone-300 hover:bg-stone-800">SYNC FRAMES</button>
            <button className="px-3 py-1.5 rounded-sm bg-orange-700/30 text-orange-200 hover:bg-orange-700/50">PICK {activeSide} →</button>
          </div>
          <span className="text-[10px] tracking-[0.4em] uppercase text-stone-500">{img.caption.toUpperCase()}</span>
        </div>

        {/* Below — shared controls in 3 columns */}
        <div className="grid grid-cols-[280px_1fr_320px] gap-px bg-stone-900">
          {/* Left — frames */}
          <aside className="bg-[#0c0a09] p-4 overflow-y-auto">
            <PanelTitle n="240">FRAMES</PanelTitle>
            <div className="grid grid-cols-2 gap-1.5">
              {SAMPLE_IMAGES.concat(SAMPLE_IMAGES).map((s, i) => (
                <button
                  key={i}
                  onClick={() => setImg(s)}
                  className={`relative aspect-[4/3] overflow-hidden ring-1 ${s.id === img.id && i < 6 ? "ring-orange-300 ring-2" : "ring-stone-900 hover:ring-stone-700"}`}
                >
                  <img src={s.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </aside>

          {/* Center — shared scopes + adjustments */}
          <section className="bg-[#0a0807] p-6">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <PanelTitle n={`A · ${lutA.name.toUpperCase()}`}>HISTOGRAM A</PanelTitle>
                <Histogram accent="#7fb3ff" />
              </div>
              <div>
                <PanelTitle n={`B · ${lutB.name.toUpperCase()}`}>HISTOGRAM B</PanelTitle>
                <Histogram accent="#f5b878" />
              </div>
            </div>

            <div className="mb-6">
              <PanelTitle n={`EDITING · ${activeSide}`}>TONE CURVE</PanelTitle>
              <div className="grid grid-cols-2 gap-6">
                <ToneCurve />
                <ToneCurve />
              </div>
            </div>

            <div>
              <PanelTitle>BASIC ADJUSTMENTS · LINKED</PanelTitle>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[11px]">
                {[["Exposure", "+0.12"], ["Contrast", "+18"], ["Highlights", "-22"], ["Shadows", "+34"], ["Whites", "+6"], ["Blacks", "-12"], ["Clarity", "+8"], ["Vibrance", "+4"]].map(([l, v]) => (
                  <div key={l} className="flex items-center gap-2 py-1">
                    <span className="text-stone-400 flex-1">{l}</span>
                    <div className="w-20 h-px bg-stone-800 relative">
                      <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-3 rounded-sm bg-orange-300" style={{ left: `${30 + Math.random() * 40}%` }} />
                    </div>
                    <span className="text-stone-400 w-10 text-right" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Right — LUT picker for both sides */}
          <aside className="bg-[#0c0a09] p-4 overflow-y-auto">
            <PanelTitle>VARIANT A · LUT</PanelTitle>
            <div className="space-y-0.5 mb-6">
              {LUTS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLutA(l)}
                  className={`w-full flex items-center gap-2 p-1.5 rounded-sm text-left ${l.id === lutA.id ? "bg-blue-700/30 text-blue-100" : "hover:bg-stone-900 text-stone-300"}`}
                >
                  <span className="flex gap-0.5">{l.swatch.map((c, ci) => <span key={ci} className="w-1.5 h-5" style={{ background: c }} />)}</span>
                  <span className="text-xs flex-1 truncate">{l.name}</span>
                </button>
              ))}
            </div>

            <PanelTitle>VARIANT B · LUT</PanelTitle>
            <div className="space-y-0.5">
              {LUTS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLutB(l)}
                  className={`w-full flex items-center gap-2 p-1.5 rounded-sm text-left ${l.id === lutB.id ? "bg-orange-700/30 text-orange-100" : "hover:bg-stone-900 text-stone-300"}`}
                >
                  <span className="flex gap-0.5">{l.swatch.map((c, ci) => <span key={ci} className="w-1.5 h-5" style={{ background: c }} />)}</span>
                  <span className="text-xs flex-1 truncate">{l.name}</span>
                </button>
              ))}
            </div>
          </aside>
        </div>

        <StudioFooter lutName={`A · ${lutA.name} / B · ${lutB.name}`} scope="dual-histogram" />
      </div>
    </main>
  );
}
