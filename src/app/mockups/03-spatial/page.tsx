"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { LUTS } from "@/lib/luts";
import { SAMPLE_IMAGES } from "@/lib/sample-images";

export default function Spatial() {
  return (
    <main className="min-h-screen bg-[#070818] text-white overflow-x-hidden" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <Backdrop />
      <TopBar />

      {/* Hero */}
      <section className="relative min-h-[100svh] flex items-center px-8 lg:px-20 pt-20">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center w-full">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-mono text-[10px] tracking-[0.4em] uppercase text-cyan-300/70 mb-8 flex items-center gap-3"
            >
              <span className="block w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
              SPATIAL GRADING / V0.1
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15 }}
              className="text-[clamp(3rem,8vw,8rem)] leading-[0.92] tracking-[-0.03em] font-light"
            >
              Color lives
              <br />
              in <em className="italic font-medium bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-violet-300 to-pink-300">three dimensions.</em>
              <br />
              We finally let it.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-10 max-w-xl text-white/60 text-lg leading-relaxed"
            >
              A grading suite that thinks the way light actually behaves —
              volumetric, holographic, navigable. Reach into the color cube,
              twist a hue ring, watch the frame respond.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 flex flex-wrap gap-4"
            >
              <Link href="#studio" className="group relative px-7 py-3.5 text-sm tracking-tight font-medium rounded-full bg-white text-[#070818] overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Enter the suite
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
              <Link href="#library" className="px-7 py-3.5 text-sm tracking-tight font-medium rounded-full border border-white/15 hover:border-cyan-300/60 hover:bg-white/5 transition">
                See the cubes
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
              className="mt-16 grid grid-cols-3 gap-8 max-w-md"
            >
              <Stat label="LUT cube" value="64³" />
              <Stat label="Latency" value="< 8ms" />
              <Stat label="Bit depth" value="16-bit" />
            </motion.div>
          </div>

          {/* 3D LUT cube */}
          <div className="relative aspect-square">
            <LutCube />
          </div>
        </div>
      </section>

      {/* LUT cubes library */}
      <section id="library" className="relative py-32 lg:py-44 px-8 lg:px-20">
        <div className="font-mono text-[10px] tracking-[0.4em] uppercase text-violet-300/70 mb-6">∴ Volumetric library</div>
        <h2 className="text-5xl lg:text-7xl tracking-[-0.02em] font-light leading-[0.95] mb-16">
          Each grade is a <em className="italic bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-pink-300">cube</em> of color.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LUTS.map((l, i) => (
            <CubeCard key={l.id} lut={l} image={SAMPLE_IMAGES[i % SAMPLE_IMAGES.length].url} delay={i * 0.05} />
          ))}
        </div>
      </section>

      <Studio />

      <Footer />
    </main>
  );
}

function Backdrop() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Aurora orbs */}
      <div className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vw] rounded-full opacity-50 blur-[160px]" style={{ background: "radial-gradient(circle, #6c44ff, transparent 70%)" }} />
      <div className="absolute -bottom-1/4 -right-1/4 w-[70vw] h-[70vw] rounded-full opacity-40 blur-[140px]" style={{ background: "radial-gradient(circle, #44d3ff, transparent 70%)" }} />
      <div className="absolute top-1/3 left-1/2 w-[40vw] h-[40vw] rounded-full opacity-30 blur-[120px]" style={{ background: "radial-gradient(circle, #ff44b3, transparent 70%)" }} />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}

function LutCube() {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const loop = () => {
      setT((performance.now() - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  const rx = Math.sin(t * 0.3) * 15 + 20;
  const ry = t * 18;

  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: 1200 }}>
      <div className="absolute inset-12 rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(circle, #6c44ff, transparent 60%)" }} />

      <div className="relative w-[300px] h-[300px] lg:w-[420px] lg:h-[420px]" style={{ transformStyle: "preserve-3d", transform: `rotateX(${rx}deg) rotateY(${ry}deg)` }}>
        {/* 6 faces */}
        {[
          { f: "front", t: "translateZ(150px)", c: "linear-gradient(135deg, #ff3865, #ff8b3d)" },
          { f: "back", t: "rotateY(180deg) translateZ(150px)", c: "linear-gradient(135deg, #44d3ff, #6c44ff)" },
          { f: "right", t: "rotateY(90deg) translateZ(150px)", c: "linear-gradient(135deg, #ff44b3, #6c44ff)" },
          { f: "left", t: "rotateY(-90deg) translateZ(150px)", c: "linear-gradient(135deg, #ffe23d, #ff8b3d)" },
          { f: "top", t: "rotateX(90deg) translateZ(150px)", c: "linear-gradient(135deg, #44ff9a, #44d3ff)" },
          { f: "bottom", t: "rotateX(-90deg) translateZ(150px)", c: "linear-gradient(135deg, #6c44ff, #2a0049)" },
        ].map((face, i) => (
          <div
            key={i}
            className="absolute inset-0 backdrop-blur-md border border-white/20"
            style={{
              transform: face.t,
              background: face.c,
              opacity: 0.7,
              boxShadow: "inset 0 0 40px rgba(255,255,255,0.15)",
            }}
          >
            {/* color grid */}
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-50">
              {Array.from({ length: 64 }).map((_, j) => (
                <div key={j} className="border border-white/10" />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* HUD */}
      <div className="absolute top-4 left-4 font-mono text-[10px] text-cyan-300/70">
        <div>X 64</div><div>Y 64</div><div>Z 64</div>
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-[10px] text-violet-300/70 text-right">
        <div>R • G • B</div><div>16-bit Rec.2020</div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-xs text-white/40 tracking-[0.2em] uppercase mb-1">{label}</div>
      <div className="text-2xl font-light tracking-tight">{value}</div>
    </div>
  );
}

function CubeCard({ lut, image, delay }: { lut: (typeof LUTS)[number]; image: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      className="group relative rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/[0.02] backdrop-blur-xl hover:ring-cyan-300/40 transition-all"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" style={{ filter: lut.filter }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070818] via-[#070818]/40 to-transparent" />

        {/* mini cube */}
        <div className="absolute top-4 right-4 w-12 h-12 rounded-md backdrop-blur-md border border-white/30 shadow-lg" style={{ background: `linear-gradient(135deg, ${lut.swatch[0]}, ${lut.swatch[2]})` }} />
      </div>
      <div className="absolute bottom-0 inset-x-0 p-5">
        <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-cyan-300/80 mb-1.5">{lut.family} · {lut.id.toUpperCase()}</div>
        <div className="text-2xl font-light tracking-tight">{lut.name}</div>
        <div className="mt-2 flex gap-1">
          {lut.swatch.map((c, ci) => (
            <span key={ci} className="w-6 h-1 rounded-full" style={{ background: c, boxShadow: `0 0 12px ${c}` }} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function TopBar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-[#070818]/40 border-b border-white/5">
      <nav className="h-14 px-6 lg:px-12 flex items-center justify-between">
        <Link href="/mockups" className="text-xs tracking-[0.3em] uppercase text-white/60 hover:text-white">← Mockups</Link>
        <div className="font-light text-lg tracking-tight">Wildlight <span className="text-cyan-300">/</span> Spatial</div>
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-cyan-300/70">03 · SPATIAL</div>
      </nav>
    </header>
  );
}

/* ========= STUDIO MOCKUP ========= */
function Studio() {
  const [lut, setLut] = useState(LUTS[5]);
  const [img, setImg] = useState(SAMPLE_IMAGES[2]);
  return (
    <section id="studio" className="relative py-24 lg:py-32 px-4 lg:px-12">
      <div className="font-mono text-[10px] tracking-[0.4em] uppercase text-cyan-300/70 mb-6 px-4">∴ The suite</div>
      <h2 className="text-5xl lg:text-7xl tracking-[-0.02em] font-light leading-[0.95] mb-12 px-4">
        Grading, <em className="italic">from inside the color.</em>
      </h2>

      <div className="rounded-3xl overflow-hidden backdrop-blur-2xl bg-white/[0.03] ring-1 ring-white/10 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.5)]">
        {/* Top toolbar */}
        <div className="h-12 bg-white/[0.03] border-b border-white/10 flex items-center px-4 gap-4">
          <div className="flex items-center gap-2 text-cyan-300/80">
            <span className="block w-2 h-2 rounded-full bg-cyan-300 animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase">LIVE GPU</span>
          </div>
          <div className="flex gap-1">
            {["Color", "Tone", "Detail", "Spatial", "FX"].map((t, i) => (
              <button key={t} className={`px-3 py-1 rounded-md text-xs font-light ${i === 0 ? "bg-cyan-300/15 text-cyan-200" : "text-white/50 hover:text-white"}`}>{t}</button>
            ))}
          </div>
          <div className="flex-1" />
          <span className="font-mono text-[10px] text-white/40">4032 × 5040 · 16bit</span>
        </div>

        <div className="grid grid-cols-[260px_1fr_320px] min-h-[680px]">
          {/* Left: nodes + filmstrip */}
          <aside className="bg-white/[0.02] border-r border-white/10 p-5 overflow-y-auto">
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3">Node graph</div>
            <NodeGraph />

            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3 mt-8">Frames</div>
            <div className="grid grid-cols-2 gap-2">
              {SAMPLE_IMAGES.map((s) => (
                <button key={s.id} onClick={() => setImg(s)} className={`relative aspect-square overflow-hidden rounded-lg ring-1 ${s.id === img.id ? "ring-cyan-300 ring-2 shadow-[0_0_20px_rgba(68,211,255,0.4)]" : "ring-white/10 hover:ring-white/30"}`}>
                  <img src={s.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </aside>

          {/* Canvas */}
          <div className="relative flex items-center justify-center p-8 bg-gradient-to-br from-[#0c0e26] via-[#070818] to-[#0a0c1f]">
            <div className="absolute top-4 left-4 font-mono text-[10px] text-white/40">{img.caption} · {img.photographer}</div>
            <div className="absolute top-4 right-4 font-mono text-[10px] text-cyan-300/80">{lut.name}</div>
            <div className="relative max-w-[80%]">
              <div className="absolute -inset-3 rounded-2xl opacity-50 blur-2xl" style={{ background: `radial-gradient(circle, ${lut.swatch[1]}, transparent 70%)` }} />
              <img src={img.url} alt="" className="relative block max-h-[500px] w-auto rounded-xl ring-1 ring-white/20 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]" style={{ filter: lut.filter }} />
            </div>

            {/* Floating scope */}
            <div className="absolute bottom-4 left-4 w-44 h-24 rounded-lg backdrop-blur-md bg-white/5 border border-white/10 p-2">
              <div className="font-mono text-[9px] text-white/40 mb-1">VECTORSCOPE</div>
              <svg viewBox="0 0 80 60" className="w-full h-14">
                <circle cx={40} cy={30} r={25} fill="none" stroke="rgba(255,255,255,0.1)" />
                <circle cx={40} cy={30} r={15} fill="none" stroke="rgba(255,255,255,0.08)" />
                {Array.from({ length: 80 }).map((_, i) => {
                  const a = (i / 80) * Math.PI * 2 + Math.sin(i) * 0.1;
                  const r = 10 + Math.random() * 12;
                  return <circle key={i} cx={40 + Math.cos(a) * r} cy={30 + Math.sin(a) * r * 0.7} r={0.6} fill="#44d3ff" opacity={0.7} />;
                })}
              </svg>
            </div>
          </div>

          {/* Right: color wheels + LUT list */}
          <aside className="bg-white/[0.02] border-l border-white/10 p-5 overflow-y-auto space-y-6">
            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3">3D LUT</div>
              <div className="space-y-1">
                {LUTS.slice(0, 5).map((l) => (
                  <button key={l.id} onClick={() => setLut(l)} className={`w-full flex items-center gap-2 p-2 rounded-lg text-left transition ${l.id === lut.id ? "bg-cyan-300/10 ring-1 ring-cyan-300/40" : "hover:bg-white/5"}`}>
                    <span className="w-6 h-6 rounded-md shrink-0" style={{ background: `linear-gradient(135deg, ${l.swatch[0]}, ${l.swatch[2]})`, boxShadow: `0 0 12px ${l.swatch[1]}` }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm truncate">{l.name}</div>
                      <div className="font-mono text-[9px] text-white/40">{l.family}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3">Color wheels</div>
              <div className="grid grid-cols-3 gap-2">
                {["LIFT", "GAMMA", "GAIN"].map((label, i) => (
                  <ColorWheel key={label} label={label} accent={["#ff8b3d", "#44d3ff", "#ff44b3"][i]} />
                ))}
              </div>
            </div>

            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3">Hue ring</div>
              <HueRing />
            </div>
          </aside>
        </div>

        {/* Bottom */}
        <div className="h-10 bg-white/[0.02] border-t border-white/10 flex items-center px-4 justify-between text-[10px] font-mono text-white/40">
          <span>● render queue 0 · GPU 18% · 8.2ms</span>
          <span>spatial v0.1 · {lut.name}</span>
        </div>
      </div>
    </section>
  );
}

function NodeGraph() {
  return (
    <svg viewBox="0 0 220 280" className="w-full h-72">
      <defs>
        <linearGradient id="ng" x1="0" x2="1"><stop offset="0" stopColor="#44d3ff" /><stop offset="1" stopColor="#6c44ff" /></linearGradient>
      </defs>
      <g stroke="rgba(68,211,255,0.4)" strokeWidth={1.5} fill="none">
        <path d="M50,40 C50,60 50,60 80,80" />
        <path d="M170,40 C170,60 170,60 140,80" />
        <path d="M110,110 V160" />
        <path d="M110,190 V230" />
      </g>
      {[
        { x: 30, y: 20, label: "INPUT", c: "#44d3ff" },
        { x: 150, y: 20, label: "MASK", c: "#ff44b3" },
        { x: 80, y: 80, label: "LUT", c: "#6c44ff" },
        { x: 80, y: 160, label: "WHEELS", c: "#ff8b3d" },
        { x: 80, y: 230, label: "OUTPUT", c: "#44ff9a" },
      ].map((n, i) => (
        <g key={i}>
          <rect x={n.x} y={n.y} width={80} height={30} rx={6} fill="rgba(255,255,255,0.04)" stroke={n.c} strokeWidth={1.5} />
          <text x={n.x + 40} y={n.y + 19} textAnchor="middle" fontSize={9} fill="white" fontFamily="JetBrains Mono">{n.label}</text>
        </g>
      ))}
    </svg>
  );
}

function ColorWheel({ label, accent }: { label: string; accent: string }) {
  return (
    <div>
      <div className="font-mono text-[9px] text-white/40 mb-1.5">{label}</div>
      <div className="relative w-full aspect-square rounded-full" style={{ background: "conic-gradient(from 0deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)" }}>
        <div className="absolute inset-2 rounded-full bg-[#070818]/80 backdrop-blur" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ background: accent, boxShadow: `0 0 12px ${accent}`, transform: `translate(${(Math.random() - 0.5) * 30}px, ${(Math.random() - 0.5) * 30}px)` }} />
      </div>
    </div>
  );
}

function HueRing() {
  return (
    <div className="relative w-full aspect-square rounded-full max-w-[200px] mx-auto" style={{ background: "conic-gradient(red, orange, yellow, lime, cyan, blue, magenta, red)" }}>
      <div className="absolute inset-6 rounded-full bg-[#070818]/85 backdrop-blur ring-1 ring-white/10 flex items-center justify-center font-mono text-[10px] text-white/60">
        <div className="text-center">
          <div>HUE</div>
          <div className="text-cyan-300 text-base">+12°</div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 px-8 lg:px-20 py-12 mt-32">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-light">Wildlight / Spatial</div>
          <div className="text-xs text-white/40 mt-1">A volumetric grading studio.</div>
        </div>
        <Link href="/mockups" className="text-xs tracking-[0.3em] uppercase text-white/60 hover:text-white">← Mockups</Link>
      </div>
    </footer>
  );
}
