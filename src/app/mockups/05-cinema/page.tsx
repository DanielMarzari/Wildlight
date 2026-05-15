"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LUTS } from "@/lib/luts";
import { SAMPLE_IMAGES, HERO_IMAGE } from "@/lib/sample-images";

export default function Cinema() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden" style={{ fontFamily: "'IBM Plex Sans', system-ui, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=IBM+Plex+Sans:wght@300;400;500;600&family=Cinzel:wght@400..900&display=swap" rel="stylesheet" />
      <TopBar />

      {/* Hero — letterboxed cinema frame */}
      <section className="relative h-[100svh] flex items-center justify-center">
        {/* sprocket holes left/right */}
        <SprocketColumn side="left" />
        <SprocketColumn side="right" />

        <div className="relative w-full mx-16 lg:mx-24" style={{ aspectRatio: "2.35/1" }}>
          {/* the frame */}
          <img src={HERO_IMAGE} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "contrast(1.18) saturate(1.05) hue-rotate(-2deg)" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

          {/* corner ticks */}
          <CornerTick className="top-3 left-3" rot={0} />
          <CornerTick className="top-3 right-3" rot={90} />
          <CornerTick className="bottom-3 right-3" rot={180} />
          <CornerTick className="bottom-3 left-3" rot={270} />

          {/* HUD top */}
          <div className="absolute top-4 inset-x-4 flex justify-between text-[10px] tracking-[0.3em] uppercase text-white/80" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            <span>● REC · TC 01:14:32:08 · 24FPS</span>
            <FrameCounter />
          </div>

          {/* title block */}
          <div className="absolute left-8 lg:left-16 bottom-12 lg:bottom-20 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-[10px] tracking-[0.5em] uppercase text-white/70 mb-4"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              A WILDLIGHT GRADE · 2026
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="leading-[0.85] tracking-[0.02em]"
              style={{ fontFamily: '"Cinzel", "Trajan Pro", serif', fontSize: "clamp(2.5rem, 7vw, 7rem)", fontWeight: 500 }}
            >
              THE COLORIST
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
              className="mt-6 text-sm text-white/70 max-w-md leading-relaxed"
            >
              An eight-reel color suite for photographers. Three-way wheels,
              vectorscope, qualifier, node graph. Built around the same workflow
              a feature uses, scaled down to a single frame.
            </motion.div>
          </div>

          {/* HUD bottom */}
          <div className="absolute bottom-4 inset-x-4 flex justify-between text-[10px] tracking-[0.3em] uppercase text-white/80" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            <span>EI 800 · ƒ2.8 · 1/50 · 3200K</span>
            <span>RAW · LOG-C · REC.2020</span>
          </div>
        </div>

        {/* CTAs below the frame */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.5em] uppercase text-white/40"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          [ SCROLL TO ENTER THE SUITE ]
        </motion.div>
      </section>

      {/* Reel strip */}
      <section className="relative py-32 px-4 lg:px-12 overflow-hidden border-y border-white/10">
        <div className="text-[10px] tracking-[0.5em] uppercase text-white/40 mb-8 px-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          ◗ REEL 02 · EIGHT GRADES
        </div>
        <h2 className="px-4 mb-12 leading-[0.92] tracking-[-0.01em]" style={{ fontFamily: '"Cinzel", serif', fontSize: "clamp(2.5rem, 6vw, 6rem)" }}>
          Each grade · one signature.
        </h2>

        <div className="relative">
          <div className="flex gap-2 overflow-x-auto pb-8" style={{ scrollbarColor: "rgba(255,255,255,0.1) transparent" }}>
            {LUTS.concat(LUTS).map((l, i) => (
              <FilmFrame key={i} lut={l} image={SAMPLE_IMAGES[i % SAMPLE_IMAGES.length].url} idx={i % LUTS.length} />
            ))}
          </div>
        </div>
      </section>

      <Studio />

      {/* Credits roll */}
      <section className="px-6 lg:px-16 py-40 border-t border-white/10">
        <div className="text-[10px] tracking-[0.5em] uppercase text-white/40 mb-8" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          ◗ END CREDITS
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="leading-[0.9] tracking-[0.02em] mb-12" style={{ fontFamily: '"Cinzel", serif', fontSize: "clamp(2rem, 5vw, 5rem)" }}>
            A LUT — pressed,
            <br />
            timed, &amp; printed.
          </h3>
          <div className="space-y-6 text-sm" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            <Credit role="COLOR" name="Wildlight Atelier" />
            <Credit role="REFERENCE FRAMES" name="A. Wexler · S. Marchand · D. Holm · M. Iyer" />
            <Credit role="CALIBRATION" name="Eizo CG319X · X-Rite i1Display Pro" />
            <Credit role="GRADE FORMAT" name=".cube  ·  .3dl  ·  .dcp" />
            <Credit role="MASTERED IN" name="Rec.2020 · DCI-P3 · sRGB" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function SprocketColumn({ side }: { side: "left" | "right" }) {
  return (
    <div className={`absolute top-0 bottom-0 ${side === "left" ? "left-0" : "right-0"} w-8 lg:w-12 flex flex-col items-center justify-around bg-black border-${side === "left" ? "r" : "l"} border-white/10`}>
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} className="w-4 h-2 rounded-sm bg-white/15" />
      ))}
    </div>
  );
}

function CornerTick({ className, rot }: { className: string; rot: number }) {
  return (
    <div className={`absolute ${className}`}>
      <svg width="24" height="24" style={{ transform: `rotate(${rot}deg)` }}>
        <path d="M 0 0 L 20 0 M 0 0 L 0 20" stroke="white" strokeWidth={1} opacity={0.7} />
      </svg>
    </div>
  );
}

function FrameCounter() {
  const [n, setN] = useState(174);
  useEffect(() => {
    const id = setInterval(() => setN((x) => x + 1), 42);
    return () => clearInterval(id);
  }, []);
  return <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>FRM {String(n).padStart(5, "0")}</span>;
}

function FilmFrame({ lut, image, idx }: { lut: (typeof LUTS)[number]; image: string; idx: number }) {
  return (
    <div className="shrink-0 relative" style={{ width: 280 }}>
      {/* sprocket holes top */}
      <div className="flex justify-around h-4 bg-black mb-1">
        {Array.from({ length: 6 }).map((_, i) => <div key={i} className="w-6 h-2 bg-white/15 mt-1 rounded-sm" />)}
      </div>
      <div className="relative" style={{ aspectRatio: "1/1" }}>
        <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: lut.filter }} />
        <div className="absolute top-1 left-2 text-[9px] tracking-[0.3em] uppercase text-white/80" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          R{idx + 1}-F{String(idx * 24 + 8).padStart(3, "0")}
        </div>
        <div className="absolute bottom-1 left-2 right-2 flex justify-between text-[9px] text-white/80" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          <span>{lut.name}</span>
          <span>{lut.family}</span>
        </div>
      </div>
      <div className="flex justify-around h-4 bg-black mt-1">
        {Array.from({ length: 6 }).map((_, i) => <div key={i} className="w-6 h-2 bg-white/15 mt-1 rounded-sm" />)}
      </div>
    </div>
  );
}

function Credit({ role, name }: { role: string; name: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 w-48 text-right">{role}</span>
      <span className="h-px w-12 bg-white/20" />
      <span className="text-white/90 text-left flex-1 tracking-wide">{name}</span>
    </div>
  );
}

function TopBar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-black/80 border-b border-white/10">
      <nav className="h-11 px-6 lg:px-12 flex items-center justify-between" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        <Link href="/mockups" className="text-[10px] tracking-[0.4em] uppercase text-white/60 hover:text-white">← MOCKUPS</Link>
        <div className="text-xs tracking-[0.25em] uppercase">WILDLIGHT · DAILIES</div>
        <div className="text-[10px] tracking-[0.4em] uppercase text-white/60">05 · CINEMA</div>
      </nav>
    </header>
  );
}

/* ========= STUDIO MOCKUP — DaVinci Resolve style ========= */
function Studio() {
  const [lut, setLut] = useState(LUTS[7]);
  const [img, setImg] = useState(SAMPLE_IMAGES[3]);
  return (
    <section className="relative py-24 lg:py-32 px-3 lg:px-8 bg-[#0a0a0a]">
      <div className="text-[10px] tracking-[0.5em] uppercase text-white/40 mb-6 px-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        ◗ REEL 04 · THE COLOR SUITE
      </div>
      <h3 className="px-2 leading-[0.92] tracking-[-0.01em] mb-12" style={{ fontFamily: '"Cinzel", serif', fontSize: "clamp(2.5rem, 6vw, 6rem)" }}>
        The colorist's bay.
      </h3>

      <div className="rounded bg-[#0d0d0e] ring-1 ring-white/10 overflow-hidden shadow-[0_60px_120px_-30px_rgba(0,0,0,0.8)]" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
        {/* Title bar */}
        <div className="h-9 bg-[#161617] border-b border-white/10 flex items-center px-3 gap-3 text-[11px]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="text-white/40">▸ Wildlight Color Suite — Reel 04 — {img.caption}</span>
          <div className="flex-1" />
          {["MEDIA", "CUT", "EDIT", "FX", "FAIRLIGHT", "COLOR", "DELIVER"].map((t) => (
            <span key={t} className={`text-[10px] tracking-[0.2em] ${t === "COLOR" ? "text-amber-400" : "text-white/40"}`}>{t}</span>
          ))}
        </div>

        {/* Top: viewport + scopes */}
        <div className="grid grid-cols-[1fr_420px] gap-px bg-white/5">
          {/* Viewport */}
          <div className="bg-black flex items-center justify-center p-6 min-h-[420px] relative">
            <div className="absolute top-3 inset-x-3 flex justify-between text-[10px] text-white/60" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              <span>TC 01:14:32:08 ▸ {lut.name}</span>
              <span>16-BIT · LOG-C ▸ REC.709</span>
            </div>
            <div className="relative max-w-[78%]" style={{ aspectRatio: "2.35/1" }}>
              <img src={img.url} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: lut.filter }} />
              {/* corner ticks */}
              <CornerTick className="top-1 left-1" rot={0} />
              <CornerTick className="top-1 right-1" rot={90} />
              <CornerTick className="bottom-1 right-1" rot={180} />
              <CornerTick className="bottom-1 left-1" rot={270} />
            </div>
          </div>

          {/* Scopes column */}
          <div className="bg-[#0d0d0e] grid grid-rows-3 gap-px">
            <Scope title="WAVEFORM"><Waveform /></Scope>
            <Scope title="VECTORSCOPE"><Vectorscope /></Scope>
            <Scope title="PARADE · RGB"><RGBParade /></Scope>
          </div>
        </div>

        {/* Middle: node graph */}
        <div className="bg-[#0a0a0b] border-t border-white/5 p-4">
          <div className="flex items-center justify-between mb-3 text-[10px] tracking-[0.3em] uppercase text-white/40" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            <span>NODE GRAPH · 06</span>
            <span>SERIAL · LIN ▸ LOG ▸ REC709</span>
          </div>
          <ResolveNodeGraph activeIdx={3} />
        </div>

        {/* Bottom: three-way + qualifier + LUT */}
        <div className="grid grid-cols-[1fr_1fr_1fr_320px] gap-px bg-white/5">
          <PanelSection title="LIFT">
            <ColorBall accent="#7fb3ff" />
            <KnobRow label="MASTER" v="-0.04" />
            <KnobRow label="OFFSET" v="0.00" />
          </PanelSection>

          <PanelSection title="GAMMA">
            <ColorBall accent="#ffd680" />
            <KnobRow label="MASTER" v="+0.12" />
            <KnobRow label="CONTRAST" v="1.18" />
          </PanelSection>

          <PanelSection title="GAIN">
            <ColorBall accent="#ff7c8a" />
            <KnobRow label="MASTER" v="+0.06" />
            <KnobRow label="PIVOT" v="0.42" />
          </PanelSection>

          <PanelSection title="LUT · 1D + 3D">
            <div className="space-y-0.5">
              {LUTS.map((l) => (
                <button key={l.id} onClick={() => setLut(l)} className={`w-full flex items-center gap-2 p-1.5 rounded text-left ${l.id === lut.id ? "bg-amber-400/15 text-amber-200" : "hover:bg-white/5 text-white/70"}`}>
                  <span className="flex gap-0.5">{l.swatch.map((c, ci) => <span key={ci} className="w-1.5 h-4 rounded-sm" style={{ background: c }} />)}</span>
                  <span className="text-xs flex-1 truncate">{l.name}</span>
                  <span className="text-[9px] text-white/40" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{l.family.slice(0, 4).toUpperCase()}</span>
                </button>
              ))}
            </div>
          </PanelSection>
        </div>

        {/* Filmstrip timeline */}
        <div className="border-t border-white/10 p-3 bg-[#0a0a0b]">
          <div className="flex items-center justify-between mb-2 text-[10px] tracking-[0.3em] uppercase text-white/40" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            <span>TIMELINE · CLIPS · 06</span>
            <span>240 FRAMES @ 24FPS</span>
          </div>
          <div className="flex gap-1 overflow-x-auto">
            {SAMPLE_IMAGES.concat(SAMPLE_IMAGES).map((s, i) => (
              <button key={i} onClick={() => setImg(s)} className={`shrink-0 relative w-24 ${s.url === img.url && i < 6 ? "ring-2 ring-amber-400" : "ring-1 ring-white/10 hover:ring-white/30"}`}>
                <img src={s.url} alt="" className="block w-full aspect-[16/9] object-cover" />
                <div className="absolute bottom-0 inset-x-0 text-[8px] text-white bg-black/60 px-1 py-0.5 font-mono">CLIP {String(i + 1).padStart(2, "0")}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="h-7 bg-[#161617] border-t border-white/10 flex items-center px-3 text-[10px] text-white/40 justify-between" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          <span>● GPU 22% · DEBAYER OFF · 23.976 FPS</span>
          <span>SAVED · 14s AGO</span>
        </div>
      </div>
    </section>
  );
}

function PanelSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#0d0d0e] p-4">
      <div className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{title}</div>
      {children}
    </div>
  );
}

function ColorBall({ accent }: { accent: string }) {
  return (
    <div className="relative mx-auto w-36 h-36 rounded-full mb-3" style={{ background: "conic-gradient(from 0deg, #ff4040, #ffd060, #60ff60, #60ffd0, #60a0ff, #c060ff, #ff60c0, #ff4040)" }}>
      <div className="absolute inset-3 rounded-full bg-[#0d0d0e] flex items-center justify-center">
        <div className="w-2 h-2 rounded-full" style={{ background: accent, boxShadow: `0 0 10px ${accent}` }} />
      </div>
    </div>
  );
}

function KnobRow({ label, v }: { label: string; v: string }) {
  return (
    <div className="flex items-center justify-between py-1 text-[10px]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      <span className="text-white/60">{label}</span>
      <span className="text-amber-200">{v}</span>
    </div>
  );
}

function Scope({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#0a0a0b] p-3">
      <div className="text-[9px] tracking-[0.3em] uppercase text-white/40 mb-1" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{title}</div>
      {children}
    </div>
  );
}

function Waveform() {
  return (
    <svg viewBox="0 0 400 120" className="w-full h-24">
      {Array.from({ length: 200 }).map((_, i) => {
        const x = i * 2;
        const baseY = 60 + Math.sin(i * 0.05) * 25 - Math.exp(-Math.pow((i - 100) / 60, 2)) * 30;
        const spread = 8 + Math.random() * 12;
        return <line key={i} x1={x} y1={baseY - spread} x2={x} y2={baseY + spread} stroke="rgba(180, 240, 180, 0.4)" strokeWidth={1} />;
      })}
    </svg>
  );
}

function Vectorscope() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-24 mx-auto" style={{ maxWidth: 140 }}>
      <circle cx={60} cy={60} r={50} fill="none" stroke="rgba(255,255,255,0.1)" />
      <circle cx={60} cy={60} r={30} fill="none" stroke="rgba(255,255,255,0.06)" />
      <line x1={10} y1={60} x2={110} y2={60} stroke="rgba(255,255,255,0.05)" />
      <line x1={60} y1={10} x2={60} y2={110} stroke="rgba(255,255,255,0.05)" />
      {/* Target boxes for skin tone, etc — fake */}
      {[[35, 80, "R"], [85, 45, "Y"], [85, 80, "G"], [35, 45, "B"]].map(([x, y, l], i) => (
        <g key={i}><rect x={Number(x) - 3} y={Number(y) - 3} width={6} height={6} fill="none" stroke="rgba(255,255,255,0.2)" /><text x={Number(x) + 5} y={Number(y) - 5} fontSize={6} fill="rgba(255,255,255,0.4)">{l}</text></g>
      ))}
      {Array.from({ length: 120 }).map((_, i) => {
        const a = (i / 120) * Math.PI * 2;
        const r = 15 + Math.random() * 25;
        return <circle key={i} cx={60 + Math.cos(a) * r} cy={60 + Math.sin(a) * r * 0.7} r={0.7} fill="#ffd680" opacity={0.7} />;
      })}
    </svg>
  );
}

function RGBParade() {
  return (
    <div className="flex gap-1 h-24">
      {["#ff5050", "#50ff70", "#5070ff"].map((c, i) => (
        <svg key={i} viewBox="0 0 100 100" className="flex-1 h-full">
          {Array.from({ length: 50 }).map((_, j) => {
            const x = j * 2;
            const baseY = 50 + Math.sin(j * 0.1 + i) * 15;
            const spread = 6 + Math.random() * 10;
            return <line key={j} x1={x} y1={baseY - spread} x2={x} y2={baseY + spread} stroke={c} strokeWidth={1} opacity={0.4} />;
          })}
        </svg>
      ))}
    </div>
  );
}

function ResolveNodeGraph({ activeIdx }: { activeIdx: number }) {
  const nodes = ["INPUT", "TONE", "BALANCE", "LUT", "MASK", "OUTPUT"];
  return (
    <div className="flex items-center gap-1 overflow-x-auto">
      {nodes.map((n, i) => (
        <div key={n} className="flex items-center">
          <div className={`relative w-32 h-16 rounded ring-1 ${i === activeIdx ? "ring-amber-400 bg-amber-400/10" : "ring-white/20 bg-white/[0.02]"} flex items-center justify-center text-xs`}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{String(i + 1).padStart(2, "0")}. {n}</span>
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-400/80" />
            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-400/80" />
          </div>
          {i < nodes.length - 1 && <div className="w-4 h-px bg-white/20" />}
        </div>
      ))}
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 lg:px-16 py-12">
      <div className="flex items-end justify-between flex-wrap gap-6">
        <div>
          <div className="leading-[0.9] tracking-[0.02em]" style={{ fontFamily: '"Cinzel", serif', fontSize: "2.5rem" }}>WILDLIGHT</div>
          <div className="text-[10px] tracking-[0.4em] uppercase text-white/50 mt-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            A COLOR SUITE FOR PHOTOGRAPHERS · 2026
          </div>
        </div>
        <Link href="/mockups" className="text-[10px] tracking-[0.4em] uppercase text-white/60 hover:text-white" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>← MOCKUPS</Link>
      </div>
    </footer>
  );
}
