"use client";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { LUTS } from "@/lib/luts";
import { SAMPLE_IMAGES, HERO_IMAGE } from "@/lib/sample-images";
import { ApertureInline, ApertureStamp, Aperture } from "@/components/brand";

const DISPLAY = '"Cormorant Garamond", "Cormorant", "EB Garamond", Georgia, serif';
const MONO = "'IBM Plex Mono', monospace";

export default function Darkroom() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroFade = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <main className="bg-[#0a0807] text-[#e8dfd1] min-h-screen overflow-x-hidden" style={{ fontFamily: "Inter, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&display=swap" rel="stylesheet" />
      <TopBar />

      {/* Hero — full-bleed photo with slow zoom + cinematic framing */}
      <section ref={heroRef} className="relative h-[100svh] overflow-hidden">
        <motion.div style={{ scale: heroScale, opacity: heroFade }} className="absolute inset-0">
          <img src={HERO_IMAGE} alt="" className="w-full h-full object-cover" style={{ filter: "contrast(1.15) saturate(1.05) sepia(0.1) hue-rotate(-5deg)" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
          {/* safelight ember glow */}
          <div className="absolute -top-32 -right-32 w-[60vw] h-[60vw] rounded-full bg-orange-700/30 blur-[160px]" />
        </motion.div>

        {/* Framing ticks — at the safe area, not the bleed edge */}
        <FrameTick className="top-20 left-8 lg:top-24 lg:left-16" rot={0} />
        <FrameTick className="top-20 right-8 lg:top-24 lg:right-16" rot={90} />
        <FrameTick className="bottom-20 right-8 lg:bottom-24 lg:right-16" rot={180} />
        <FrameTick className="bottom-20 left-8 lg:bottom-24 lg:left-16" rot={270} />

        {/* HUD — top */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.6 }}
          className="absolute top-20 lg:top-24 inset-x-12 lg:inset-x-24 flex items-center justify-between text-[10px] tracking-[0.4em] uppercase text-white/55"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          <span className="flex items-center gap-2">
            <span className="block w-1.5 h-1.5 rounded-full bg-orange-300/80" />
            A WILDLIGHT GRADE · 2026
          </span>
          <span>VOL. 01 · NO. III · SPRING</span>
        </motion.div>

        <div className="relative h-full flex flex-col justify-end px-12 lg:px-24 pb-28">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(4rem,12vw,12rem)] leading-[0.85] tracking-[-0.02em] max-w-6xl"
            style={{ fontFamily: DISPLAY, fontWeight: 400 }}
          >
            What the
            <br />
            <em className="italic text-orange-200/95" style={{ fontWeight: 300 }}>light</em> remembers.
          </motion.h1>
        </div>

        {/* HUD — bottom: technical metadata strip */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 1.2 }}
          className="absolute bottom-20 lg:bottom-24 inset-x-12 lg:inset-x-24 flex flex-wrap items-center justify-between gap-6 text-[10px] tracking-[0.4em] uppercase text-white/55"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          <div className="flex flex-wrap items-center gap-6">
            <span>EI 200</span>
            <span className="text-white/25">·</span>
            <span>ƒ8</span>
            <span className="text-white/25">·</span>
            <span>1/125</span>
            <span className="text-white/25">·</span>
            <span>3200K</span>
            <span className="text-white/25">·</span>
            <span>RAW / REC.2020</span>
          </div>
          <span>FRAME 014 / 240</span>
        </motion.div>
      </section>

      {/* Manifesto */}
      <section className="relative py-32 lg:py-56 px-8 lg:px-16 border-y border-stone-900">
        <div className="max-w-5xl mx-auto">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-orange-300/70 mb-8">— I —</div>
          <p className="font-serif text-3xl lg:text-5xl leading-[1.2] tracking-[-0.01em]" style={{ fontFamily: DISPLAY }}>
            A LUT is a memory of light a photographer once decided to keep. We
            sell <em className="italic text-orange-200">memories</em>, not filters.
            Each one shaped by hand against twenty reference frames, tested on
            calibrated paper, and shipped only when it survives the print.
          </p>
        </div>
      </section>

      {/* The Studio mockup */}
      <Studio />

      {/* Plate cards */}
      <section className="relative py-32 px-8 lg:px-16">
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-orange-300/70 mb-8">— II — The Plates</div>
        <h2 className="font-serif text-6xl lg:text-8xl tracking-[-0.03em] mb-16 leading-[0.9]" style={{ fontFamily: DISPLAY }}>
          Eight signatures
          <br />
          <em className="italic text-orange-200/90">graded in shadow.</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-900">
          {LUTS.map((l, i) => (
            <motion.div
              key={l.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
              className="relative bg-[#0a0807] aspect-[3/4] group overflow-hidden"
            >
              <img src={SAMPLE_IMAGES[i % SAMPLE_IMAGES.length].url} alt="" className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" style={{ filter: l.filter }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.3em] uppercase text-stone-300">
                Plate № {String(i + 1).padStart(2, "0")}
              </div>
              <div className="absolute bottom-0 inset-x-0 p-6">
                <div className="font-serif text-3xl mb-1" style={{ fontFamily: DISPLAY }}>{l.name}</div>
                <div className="text-xs text-stone-400 tracking-wide">{l.family}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function FrameTick({ className, rot }: { className: string; rot: number }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <svg width="28" height="28" style={{ transform: `rotate(${rot}deg)` }}>
        <path d="M 0 0 L 22 0 M 0 0 L 0 22" stroke="white" strokeWidth={1} opacity={0.7} />
      </svg>
    </div>
  );
}

/* ============== STUDIO MOCKUP ============== */
function Studio() {
  const [lut, setLut] = useState(LUTS[7]);
  const [img, setImg] = useState(SAMPLE_IMAGES[0]);
  return (
    <section className="relative py-24 lg:py-32 px-4 lg:px-8 bg-gradient-to-b from-[#0a0807] via-[#0d0a08] to-[#0a0807]">
      <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-orange-300/70 mb-8 px-4">— THE STUDIO —</div>
      <h3 className="font-serif text-5xl lg:text-7xl tracking-[-0.02em] mb-12 px-4 leading-[0.95]" style={{ fontFamily: DISPLAY }}>
        Built like a <em className="italic text-orange-200">working room.</em>
      </h3>

      {/* Faux studio chrome */}
      <div className="rounded-lg bg-[#141110] ring-1 ring-stone-800 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Title bar */}
        <div className="h-10 bg-[#1a1614] border-b border-stone-800 flex items-center px-4 gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-stone-600" />
            <div className="w-2.5 h-2.5 rounded-full bg-stone-600" />
            <div className="w-2.5 h-2.5 rounded-full bg-stone-600" />
          </div>
          <div className="flex-1 text-center text-[11px] text-stone-500 font-mono tracking-wider">
            wildlight · ridge_07.RAF · {img.caption}
          </div>
          <div className="text-[10px] text-stone-500 font-mono">⌘ S  saved 2m ago</div>
        </div>

        {/* Tool bar */}
        <div className="h-12 bg-[#161210] border-b border-stone-800 flex items-center px-4 gap-1 text-stone-400 text-xs">
          {["Library", "Develop", "Grade", "Export"].map((t, i) => (
            <button key={t} className={`px-3 py-1.5 rounded ${i === 2 ? "bg-orange-700/30 text-orange-200" : "hover:bg-stone-800"}`}>{t}</button>
          ))}
          <div className="w-px h-5 bg-stone-800 mx-2" />
          {["Crop", "Heal", "Brush", "Gradient", "Radial"].map((t) => (
            <button key={t} className="px-3 py-1.5 rounded hover:bg-stone-800">{t}</button>
          ))}
          <div className="flex-1" />
          <span className="font-mono text-[10px] text-stone-500">100% · sRGB · 24.3 MP</span>
        </div>

        <div className="grid grid-cols-[200px_1fr_320px] min-h-[640px]">
          {/* Left: filmstrip */}
          <aside className="bg-[#0e0b0a] border-r border-stone-800 p-3 overflow-y-auto">
            <div className="text-[10px] tracking-[0.25em] uppercase text-stone-500 mb-3 px-1">Catalog · 240</div>
            <div className="grid grid-cols-2 gap-1.5">
              {[...SAMPLE_IMAGES, ...SAMPLE_IMAGES].map((s, i) => (
                <button
                  key={i}
                  onClick={() => setImg(s)}
                  className={`relative aspect-[3/2] overflow-hidden rounded-sm ring-1 ${s.id === img.id ? "ring-orange-400 ring-2" : "ring-stone-800 hover:ring-stone-600"}`}
                >
                  <img src={s.url} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <span className="absolute bottom-0.5 right-1 font-mono text-[8px] text-white/80">{i + 1}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Center: canvas */}
          <div className="relative bg-[#08070a] flex items-center justify-center p-10">
            <div className="absolute top-3 right-3 font-mono text-[10px] text-stone-500">{lut.name} · {lut.family}</div>
            <div className="relative max-w-[90%] max-h-[90%]">
              <img src={img.url} alt="" className="block max-h-[440px] w-auto shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]" style={{ filter: lut.filter }} />
              {/* Rule of thirds overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/10" />
                <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/10" />
                <div className="absolute top-1/3 left-0 right-0 h-px bg-white/10" />
                <div className="absolute top-2/3 left-0 right-0 h-px bg-white/10" />
              </div>
            </div>
          </div>

          {/* Right: panels */}
          <aside className="bg-[#0e0b0a] border-l border-stone-800 overflow-y-auto">
            <Panel title="Histogram">
              <Histogram />
            </Panel>
            <Panel title="Tone curve">
              <ToneCurve />
            </Panel>
            <Panel title="LUT">
              <div className="space-y-0.5">
                {LUTS.slice(0, 5).map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLut(l)}
                    className={`w-full flex items-center gap-2 p-1.5 rounded text-left text-xs ${l.id === lut.id ? "bg-orange-700/30 text-orange-100" : "hover:bg-stone-800/60 text-stone-300"}`}
                  >
                    <span className="flex gap-0.5">{l.swatch.map((c, ci) => <span key={ci} className="w-1.5 h-5" style={{ background: c }} />)}</span>
                    <span className="flex-1 truncate">{l.name}</span>
                  </button>
                ))}
              </div>
            </Panel>
            <Panel title="HSL · selective">
              <div className="space-y-1.5">
                {[["Red", "#c1554e"], ["Orange", "#d68a3e"], ["Yellow", "#dfc15a"], ["Green", "#6b9e6b"], ["Cyan", "#5fa7b6"], ["Blue", "#5a6ec5"], ["Purple", "#9a6cc5"], ["Magenta", "#c45a9c"]].map(([n, c]) => (
                  <div key={n} className="flex items-center gap-2">
                    <span className="w-2 h-4 rounded-sm" style={{ background: c }} />
                    <span className="text-[10px] text-stone-400 w-12">{n}</span>
                    <FakeSlider />
                  </div>
                ))}
              </div>
            </Panel>
            <Panel title="Detail">
              <FakeLabeled label="Sharpening" v="42" />
              <FakeLabeled label="Noise" v="-8" />
              <FakeLabeled label="Clarity" v="+12" />
              <FakeLabeled label="Texture" v="+6" />
            </Panel>
          </aside>
        </div>

        {/* Bottom status */}
        <div className="h-7 bg-[#1a1614] border-t border-stone-800 flex items-center px-4 text-[10px] font-mono text-stone-500 justify-between">
          <span>● 14/240 selected · grade applied · history depth 12</span>
          <span>RGB 1.0 2.2 G · scope: parade</span>
        </div>
      </div>
    </section>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-stone-800 p-3">
      <div className="text-[10px] tracking-[0.25em] uppercase text-stone-500 mb-2.5">{title}</div>
      {children}
    </div>
  );
}

function FakeSlider() {
  return (
    <div className="flex-1 h-1 bg-stone-800 rounded-full relative">
      <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange-300" style={{ left: `${30 + Math.random() * 40}%` }} />
    </div>
  );
}

function FakeLabeled({ label, v }: { label: string; v: string }) {
  return (
    <div className="flex items-center gap-2 py-1">
      <span className="text-[11px] text-stone-400 flex-1">{label}</span>
      <span className="font-mono text-[10px] text-stone-500 w-8 text-right">{v}</span>
      <div className="w-24 h-1 bg-stone-800 rounded-full relative">
        <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange-300" style={{ left: `${30 + Math.random() * 40}%` }} />
      </div>
    </div>
  );
}

function Histogram() {
  // SVG histogram (fake but believable)
  const bars = Array.from({ length: 64 }).map((_, i) => {
    const x = i / 64;
    const h = Math.max(0.05, Math.exp(-Math.pow((x - 0.45) * 3, 2)) + 0.1 * Math.sin(i * 0.4));
    return h;
  });
  return (
    <svg viewBox="0 0 256 80" className="w-full h-20">
      <defs>
        <linearGradient id="hg" x1="0" x2="1">
          <stop offset="0" stopColor="#c1554e" />
          <stop offset="0.5" stopColor="#dfc15a" />
          <stop offset="1" stopColor="#5fa7b6" />
        </linearGradient>
      </defs>
      {bars.map((h, i) => (
        <rect key={i} x={i * 4} y={80 - h * 78} width={3} height={h * 78} fill="url(#hg)" opacity={0.85} />
      ))}
    </svg>
  );
}

function ToneCurve() {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-28 bg-black/30 rounded">
      <g stroke="#222" strokeWidth={0.5}>
        {[0, 0.25, 0.5, 0.75, 1].map((p) => <line key={`v${p}`} x1={p * 200} y1={0} x2={p * 200} y2={120} />)}
        {[0, 0.25, 0.5, 0.75, 1].map((p) => <line key={`h${p}`} x1={0} y1={p * 120} x2={200} y2={p * 120} />)}
      </g>
      <line x1={0} y1={120} x2={200} y2={0} stroke="#333" strokeDasharray="2 2" />
      <path d="M 0 120 C 30 110, 70 60, 100 50 S 170 25, 200 10" stroke="#f5b878" strokeWidth={1.5} fill="none" />
      <circle cx={50} cy={88} r={3} fill="#f5b878" />
      <circle cx={100} cy={50} r={3} fill="#f5b878" />
      <circle cx={160} cy={20} r={3} fill="#f5b878" />
    </svg>
  );
}

function TopBar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-black/30 border-b border-white/5">
      <nav className="h-14 px-6 lg:px-12 flex items-center justify-between">
        <Link href="/mockups" className="text-[10px] tracking-[0.4em] uppercase text-stone-400 hover:text-white" style={{ fontFamily: MONO }}>← MOCKUPS</Link>
        <Link href="/" className="text-[#e8dfd1] hover:opacity-80 transition">
          <ApertureInline size={20} color="#e8dfd1" textClass="text-base" />
        </Link>
        <div className="text-[10px] tracking-[0.4em] uppercase text-orange-200/70" style={{ fontFamily: MONO }}>01 · DARKROOM</div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="px-8 lg:px-16 py-20 border-t border-stone-900 mt-32 relative">
      <div className="grid lg:grid-cols-[1fr_auto_1fr] items-center gap-12 mb-12">
        <div>
          <p className="text-sm text-stone-500 max-w-xs leading-relaxed" style={{ fontFamily: DISPLAY, fontStyle: "italic", fontSize: "1.05rem" }}>
            Made in a quiet room. Tested in the rain. Shipped only when the print survives.
          </p>
        </div>
        <ApertureStamp size={56} color="#e8dfd1" est="EST. 2026 · BROOKLYN" />
        <div className="text-right">
          <Link href="/mockups" className="text-[10px] tracking-[0.4em] uppercase text-stone-400 hover:text-white" style={{ fontFamily: MONO }}>← BACK TO MOCKUPS</Link>
        </div>
      </div>
      <div className="border-t border-stone-900 pt-6 flex flex-wrap items-center justify-between gap-4 text-[10px] tracking-[0.4em] uppercase text-stone-600" style={{ fontFamily: MONO }}>
        <span>© WILDLIGHT MMXXVI · VOL. 01 · NO. III</span>
        <span>SET IN CORMORANT GARAMOND &amp; IBM PLEX MONO</span>
      </div>
    </footer>
  );
}
