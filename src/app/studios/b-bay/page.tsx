"use client";
import { useState } from "react";
import { LUTS } from "@/lib/luts";
import { SAMPLE_IMAGES } from "@/lib/sample-images";
import {
  StudioTopBar,
  CornerTick,
  Waveform,
  Vectorscope,
  RGBParade,
  ColorBall,
  PanelTitle,
  StudioFooter,
} from "@/components/studio-chrome";

export default function Bay() {
  const [lut, setLut] = useState(LUTS[7]);
  const [img, setImg] = useState(SAMPLE_IMAGES[2]);

  return (
    <main className="min-h-screen bg-[#0a0807] text-[#e8dfd1]" style={{ fontFamily: "Inter, sans-serif" }}>
      <StudioTopBar letter="B" name="The Bay" imageCaption={img.caption} lutName={lut.name} />

      <div className="pt-12">
        {/* Mode tabs */}
        <div className="h-10 bg-[#0d0a08] border-b border-stone-900 flex items-center px-6 gap-1" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          {["MEDIA", "EDIT", "GRADE", "MASKS", "DELIVER"].map((t, i) => (
            <button key={t} className={`px-3 py-1 rounded-sm text-[10px] tracking-[0.3em] uppercase ${i === 2 ? "bg-orange-700/30 text-orange-200" : "text-stone-400 hover:bg-stone-900"}`}>{t}</button>
          ))}
        </div>

        {/* Top — viewport + scopes */}
        <div className="grid grid-cols-[1fr_440px] gap-px bg-stone-900">
          {/* Viewport */}
          <div className="bg-black p-6 flex flex-col">
            <div className="flex items-center justify-between text-[10px] tracking-[0.4em] uppercase text-white/55 mb-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              <span>TC 01:14:32:08 · {lut.name.toUpperCase()}</span>
              <span>16-BIT · LOG-C ▸ REC.709</span>
            </div>
            <div className="flex-1 flex items-center justify-center min-h-[460px] relative">
              <div className="relative" style={{ aspectRatio: "2.35/1", width: "min(100%, 780px)" }}>
                <img src={img.url} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: lut.filter }} />
                <CornerTick className="-top-1 -left-1" rot={0} />
                <CornerTick className="-top-1 -right-1" rot={90} />
                <CornerTick className="-bottom-1 -right-1" rot={180} />
                <CornerTick className="-bottom-1 -left-1" rot={270} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-5 text-[10px] tracking-[0.4em] uppercase text-white/55" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              <span>EI 200 · ƒ8 · 1/125 · 3200K · RAW</span>
              <div className="flex-1" />
              <span className="text-orange-200/80">{img.caption.toUpperCase()}</span>
            </div>
          </div>

          {/* Scopes column */}
          <div className="bg-[#0c0a09] grid grid-rows-3 gap-px">
            <Scope title="WAVEFORM · LUMA"><Waveform /></Scope>
            <Scope title="VECTORSCOPE"><Vectorscope /></Scope>
            <Scope title="PARADE · RGB"><RGBParade /></Scope>
          </div>
        </div>

        {/* Middle — node graph */}
        <div className="bg-[#0a0807] border-t border-stone-900 px-6 py-5">
          <div className="flex items-center justify-between mb-4 text-[10px] tracking-[0.3em] uppercase text-white/40" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            <span>NODE GRAPH · CHAIN 06</span>
            <span>LIN ▸ TONE ▸ BALANCE ▸ LUT ▸ MASK ▸ OUT</span>
          </div>
          <NodeChain activeIdx={3} lutName={lut.name} />
        </div>

        {/* Bottom — three-way + qualifier + LUT */}
        <div className="grid grid-cols-[1fr_1fr_1fr_360px] gap-px bg-stone-900 border-t border-stone-900">
          <WheelSection title="LIFT · SHADOWS" accent="#7fb3ff" master="-0.04" extra="OFFSET 0.00" />
          <WheelSection title="GAMMA · MIDS" accent="#ffd680" master="+0.12" extra="CONTRAST 1.18" />
          <WheelSection title="GAIN · HIGHS" accent="#ff7c8a" master="+0.06" extra="PIVOT 0.42" />

          <aside className="bg-[#0c0a09] p-4 overflow-y-auto">
            <PanelTitle n="8">LUT LIBRARY</PanelTitle>
            <div className="space-y-0.5">
              {LUTS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLut(l)}
                  className={`w-full flex items-center gap-2 p-1.5 rounded-sm text-left ${l.id === lut.id ? "bg-orange-700/30 text-orange-100" : "hover:bg-stone-900 text-stone-300"}`}
                >
                  <span className="flex gap-0.5">{l.swatch.map((c, ci) => <span key={ci} className="w-1.5 h-5" style={{ background: c }} />)}</span>
                  <span className="text-xs flex-1 truncate">{l.name}</span>
                  <span className="text-[9px] text-stone-500" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{l.family.slice(0, 4).toUpperCase()}</span>
                </button>
              ))}
            </div>
          </aside>
        </div>

        {/* Qualifier strip */}
        <div className="bg-[#0c0a09] border-t border-stone-900 px-6 py-4 grid grid-cols-4 gap-6">
          <div>
            <PanelTitle>QUALIFIER · HUE</PanelTitle>
            <div className="h-3 rounded-sm" style={{ background: "linear-gradient(90deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)" }} />
            <div className="mt-1 text-[10px] text-stone-500" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>RANGE 32–58 · SOFT 8</div>
          </div>
          <div>
            <PanelTitle>QUALIFIER · SAT</PanelTitle>
            <div className="h-3 rounded-sm" style={{ background: "linear-gradient(90deg, #555, #ff8b3d)" }} />
            <div className="mt-1 text-[10px] text-stone-500" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>RANGE 12–88 · SOFT 6</div>
          </div>
          <div>
            <PanelTitle>QUALIFIER · LUMA</PanelTitle>
            <div className="h-3 rounded-sm bg-gradient-to-r from-black to-white" />
            <div className="mt-1 text-[10px] text-stone-500" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>RANGE 64–204 · SOFT 12</div>
          </div>
          <div>
            <PanelTitle>KEY · OUTPUT</PanelTitle>
            <div className="flex items-center gap-2">
              <div className="w-12 h-8 bg-white rounded-sm" />
              <div className="text-[10px] text-stone-500" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                <div>BLUR 0.4</div>
                <div>INVERT ▢</div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-[#0a0807] border-t border-stone-900 p-4">
          <div className="flex items-center justify-between mb-2 text-[10px] tracking-[0.3em] uppercase text-white/40" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            <span>TIMELINE · CLIPS · 12</span>
            <span>240 FRAMES @ 24FPS</span>
          </div>
          <div className="flex gap-1 overflow-x-auto pb-1">
            {SAMPLE_IMAGES.concat(SAMPLE_IMAGES).map((s, i) => (
              <button key={i} onClick={() => setImg(s)} className={`shrink-0 relative w-24 ${s.url === img.url && i < 6 ? "ring-2 ring-orange-300" : "ring-1 ring-stone-900 hover:ring-stone-700"}`}>
                <img src={s.url} alt="" className="block w-full aspect-[16/9] object-cover" />
                <div className="absolute bottom-0 inset-x-0 text-[8px] text-white bg-black/60 px-1 py-0.5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>CLIP {String(i + 1).padStart(2, "0")}</div>
              </button>
            ))}
          </div>
        </div>

        <StudioFooter lutName={lut.name} scope="parade" />
      </div>
    </main>
  );
}

function Scope({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#0a0807] p-4">
      <PanelTitle>{title}</PanelTitle>
      {children}
    </div>
  );
}

function WheelSection({ title, accent, master, extra }: { title: string; accent: string; master: string; extra: string }) {
  return (
    <div className="bg-[#0c0a09] p-5">
      <PanelTitle>{title}</PanelTitle>
      <ColorBall accent={accent} />
      <div className="mt-4 space-y-1.5 text-[11px]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        <div className="flex justify-between"><span className="text-stone-500">MASTER</span><span className="text-orange-200">{master}</span></div>
        <div className="flex justify-between"><span className="text-stone-500">{extra.split(" ")[0]}</span><span className="text-orange-200">{extra.split(" ").slice(1).join(" ")}</span></div>
      </div>
    </div>
  );
}

function NodeChain({ activeIdx, lutName }: { activeIdx: number; lutName: string }) {
  const nodes = [
    { n: "INPUT", sub: "LOG-C" },
    { n: "TONE", sub: "+0.12 EV" },
    { n: "BALANCE", sub: "3200K" },
    { n: "LUT", sub: lutName },
    { n: "MASK", sub: "QUAL · SKY" },
    { n: "OUT", sub: "REC.709" },
  ];
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      {nodes.map((node, i) => (
        <div key={node.n} className="flex items-center shrink-0">
          <div className={`relative w-40 h-16 rounded-sm flex flex-col justify-center px-4 ${i === activeIdx ? "ring-1 ring-orange-300 bg-orange-300/5" : "ring-1 ring-stone-800 bg-[#0a0807]"}`}>
            <div className="text-[10px] tracking-[0.3em] uppercase text-stone-300" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{String(i + 1).padStart(2, "0")} · {node.n}</div>
            <div className={`text-[10px] mt-0.5 ${i === activeIdx ? "text-orange-200" : "text-stone-500"}`} style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{node.sub}</div>
            <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-orange-300/70" />
            <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-orange-300/70" />
          </div>
          {i < nodes.length - 1 && <div className="w-3 h-px bg-stone-800" />}
        </div>
      ))}
    </div>
  );
}
