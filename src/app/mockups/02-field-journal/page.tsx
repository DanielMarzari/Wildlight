"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { LUTS } from "@/lib/luts";
import { SAMPLE_IMAGES } from "@/lib/sample-images";

const PAPER = "#f3ead8";
const INK = "#2a221b";
const SEPIA = "#7c5a3a";
const RED_STAMP = "#a8392d";

export default function FieldJournal() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: PAPER, color: INK, fontFamily: '"EB Garamond", Georgia, serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Caveat:wght@400..700&family=Special+Elite&display=swap" rel="stylesheet" />
      <Paper>
        <TopBar />

        {/* Hero — taped photo + handwritten title */}
        <section className="relative min-h-[100svh] px-6 lg:px-20 pt-32 pb-20">
          {/* Background paper texture overlays */}
          <FoxedPaper />

          <div className="relative grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
            <div>
              <div style={{ fontFamily: "'Special Elite', monospace" }} className="text-xs tracking-[0.2em] uppercase mb-6" >
                Field Notebook — Vol. ⅠⅠⅠ · Spring 2026
              </div>
              <h1
                className="text-[clamp(3.5rem,9vw,9rem)] leading-[0.9] tracking-[-0.02em]"
                style={{ fontFamily: '"Caveat", cursive', color: INK }}
              >
                a slow, sun-warm
                <br />
                <em className="italic" style={{ color: SEPIA }}>workshop</em>
                <br />
                for color.
              </h1>
              <div className="mt-10 max-w-md text-lg leading-[1.7]" style={{ fontFamily: '"EB Garamond", serif' }}>
                <p>
                  This is a quiet binder of LUTs and small editing trays. Every
                  grade was made by hand in a converted attic; every reference
                  frame is taped to the wall behind the monitor. We sell paper
                  copies of memory.
                </p>
                <p className="mt-4" style={{ fontFamily: '"Caveat", cursive', color: SEPIA, fontSize: "1.4rem" }}>
                  — D., for the studio
                </p>
              </div>

              <div className="mt-12 inline-flex items-center gap-4">
                <Link href="#studio" className="px-7 py-3 text-sm tracking-[0.2em] uppercase border-2 border-current rounded-none transition hover:bg-current hover:text-[#f3ead8]" style={{ fontFamily: "'Special Elite', monospace" }}>
                  Open the Workshop
                </Link>
                <span className="text-xs italic" style={{ color: SEPIA }}>↗ ←</span>
              </div>
            </div>

            <PolaroidStack />
          </div>
        </section>

        {/* Two-column journal page */}
        <section className="px-6 lg:px-20 py-24 relative">
          <RuledLines />
          <div className="grid lg:grid-cols-2 gap-16 relative">
            <article>
              <div className="text-xs tracking-[0.25em] uppercase mb-3" style={{ fontFamily: "'Special Elite', monospace", color: SEPIA }}>
                ENTRY № 014 · April 3
              </div>
              <h2 className="text-5xl mb-6" style={{ fontFamily: '"EB Garamond", serif' }}>
                <em>On what a LUT actually is.</em>
              </h2>
              <p className="text-lg leading-[1.8]" style={{ fontFamily: '"EB Garamond", serif' }}>
                A LUT is the photographer's signature in three dimensions. A
                fixed map: <em>this red becomes that red, this blue becomes
                that blue, every time.</em> Done well, it carries the same weight
                as paper choice in a darkroom. Done badly, it's a costume.
              </p>
              <div className="mt-6 pl-4 border-l-2" style={{ borderColor: SEPIA, fontFamily: '"Caveat", cursive', fontSize: "1.4rem", color: SEPIA }}>
                "The grade should feel like the room, not the filter."
              </div>
            </article>

            <article>
              <div className="text-xs tracking-[0.25em] uppercase mb-3" style={{ fontFamily: "'Special Elite', monospace", color: SEPIA }}>
                ENTRY № 015 · April 11
              </div>
              <h2 className="text-5xl mb-6" style={{ fontFamily: '"EB Garamond", serif' }}>
                <em>Our shelf of signatures.</em>
              </h2>
              <ul className="space-y-3 text-lg" style={{ fontFamily: '"EB Garamond", serif' }}>
                {LUTS.map((l, i) => (
                  <li key={l.id} className="flex items-baseline gap-3 border-b border-dotted pb-2" style={{ borderColor: "#c9b89c" }}>
                    <span style={{ fontFamily: "'Special Elite', monospace", color: SEPIA, fontSize: "0.8rem" }}>{String(i + 1).padStart(2, "0")}.</span>
                    <span className="italic flex-1">{l.name}</span>
                    <span className="text-sm" style={{ color: SEPIA }}>{l.family}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        {/* Studio mockup */}
        <Studio />

        {/* Closing */}
        <section className="px-6 lg:px-20 py-32 relative">
          <FoxedPaper />
          <div className="relative max-w-3xl">
            <h2 className="text-7xl leading-[0.95] tracking-[-0.02em] mb-8" style={{ fontFamily: '"Caveat", cursive', color: INK }}>
              Buy a grade, get the journal.
            </h2>
            <p className="text-lg leading-[1.8]" style={{ fontFamily: '"EB Garamond", serif' }}>
              Every purchase ships with a PDF excerpt from the studio binder: the
              reference frames the LUT was tested against, the failed iterations,
              the notes scribbled in the margin. A little context for the color.
            </p>
            <Stamp />
          </div>
        </section>

        <Footer />
      </Paper>
    </main>
  );
}

function Paper({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 30% 20%, rgba(168, 130, 80, 0.08), transparent 50%),
          radial-gradient(ellipse at 80% 70%, rgba(168, 130, 80, 0.06), transparent 50%),
          url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3'/><feColorMatrix values='0 0 0 0 0.5 0 0 0 0 0.4 0 0 0 0 0.3 0 0 0 0.06 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")
        `,
        backgroundSize: "cover, cover, 400px",
      }}
    >
      {children}
    </div>
  );
}

function FoxedPaper() {
  return (
    <>
      <div className="absolute top-10 left-10 w-2 h-2 rounded-full" style={{ background: "rgba(124, 90, 58, 0.4)" }} />
      <div className="absolute top-20 right-32 w-1.5 h-1.5 rounded-full" style={{ background: "rgba(124, 90, 58, 0.3)" }} />
      <div className="absolute bottom-32 left-1/4 w-2 h-2 rounded-full" style={{ background: "rgba(124, 90, 58, 0.35)" }} />
      <div className="absolute bottom-40 right-20 w-1 h-1 rounded-full" style={{ background: "rgba(124, 90, 58, 0.5)" }} />
    </>
  );
}

function RuledLines() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, #b5946a 31px, #b5946a 32px)", backgroundPosition: "0 80px" }} />
  );
}

function PolaroidStack() {
  const photos = SAMPLE_IMAGES.slice(0, 4);
  const rots = [-7, 4, -3, 6];
  return (
    <div className="relative h-[520px] lg:h-[640px]">
      {photos.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 30, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: rots[i] }}
          transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
          className="absolute bg-white shadow-2xl"
          style={{
            top: `${i * 60 + 20}px`,
            left: `${i * 50 + 20}px`,
            padding: "14px 14px 60px",
            transform: `rotate(${rots[i]}deg)`,
          }}
        >
          <img src={p.url} alt="" className="w-64 h-64 object-cover" style={{ filter: i % 2 ? "sepia(0.15) contrast(1.05)" : "contrast(1.08)" }} />
          <div className="absolute bottom-3 left-0 right-0 text-center" style={{ fontFamily: '"Caveat", cursive', fontSize: "1.2rem", color: INK }}>
            {p.caption}
          </div>
          {/* tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 opacity-50" style={{ background: "rgba(255, 240, 180, 0.7)", clipPath: "polygon(5% 0, 100% 10%, 95% 100%, 0 90%)" }} />
        </motion.div>
      ))}
    </div>
  );
}

function Stamp() {
  return (
    <div
      className="absolute top-12 right-12 lg:right-32 w-44 h-44 border-4 flex items-center justify-center rotate-[-8deg] opacity-70"
      style={{ borderColor: RED_STAMP, color: RED_STAMP, fontFamily: "'Special Elite', monospace" }}
    >
      <div className="text-center leading-tight">
        <div className="text-xs tracking-[0.3em]">EST. 2026</div>
        <div className="text-3xl my-1 italic" style={{ fontFamily: '"EB Garamond", serif', fontWeight: 600 }}>WILDLIGHT</div>
        <div className="text-xs tracking-[0.3em]">ATTIC STUDIO</div>
      </div>
    </div>
  );
}

function TopBar() {
  return (
    <header className="absolute top-0 inset-x-0 z-30 px-6 lg:px-20 py-6 flex items-center justify-between">
      <Link href="/mockups" style={{ fontFamily: "'Special Elite', monospace" }} className="text-xs tracking-[0.25em] uppercase hover:underline">← Mockups</Link>
      <div style={{ fontFamily: '"EB Garamond", serif' }} className="text-xl italic">Wildlight · field journal</div>
      <div style={{ fontFamily: "'Special Elite', monospace", color: SEPIA }} className="text-xs tracking-[0.25em] uppercase">02 · Journal</div>
    </header>
  );
}

/* ========= STUDIO mockup styled as a workshop binder ========= */
function Studio() {
  const [lut, setLut] = useState(LUTS[1]);
  const [img, setImg] = useState(SAMPLE_IMAGES[0]);
  return (
    <section id="studio" className="px-6 lg:px-20 py-24 relative">
      <div className="text-xs tracking-[0.25em] uppercase mb-6" style={{ fontFamily: "'Special Elite', monospace", color: SEPIA }}>
        Inside the workshop
      </div>
      <h2 className="text-7xl mb-12 leading-[0.95] tracking-[-0.02em]" style={{ fontFamily: '"Caveat", cursive' }}>
        the editing binder.
      </h2>

      <div className="relative rounded-sm shadow-[0_30px_80px_-20px_rgba(60,40,20,0.4)]" style={{ background: "#ecdfc4", border: `1px solid #c9b89c` }}>
        {/* Binder rings down the left */}
        <div className="absolute -left-6 top-12 bottom-12 flex flex-col justify-between">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-12 h-12 rounded-full border-4" style={{ borderColor: "#8a7355", background: "rgba(60, 50, 35, 0.1)" }} />
          ))}
        </div>

        <div className="grid lg:grid-cols-[260px_1fr_280px] gap-0">
          {/* Left tab: rolls of film */}
          <aside className="p-6 border-r" style={{ borderColor: "#c9b89c" }}>
            <div className="text-xs tracking-[0.25em] uppercase mb-4" style={{ fontFamily: "'Special Elite', monospace", color: SEPIA }}>Contact sheet</div>
            <div className="grid grid-cols-2 gap-2">
              {SAMPLE_IMAGES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setImg(s)}
                  className="relative bg-white p-1 pb-4 shadow-sm hover:shadow-md transition"
                  style={{ transform: `rotate(${(Math.random() - 0.5) * 4}deg)` }}
                >
                  <img src={s.url} alt="" className="block w-full aspect-square object-cover" style={{ filter: s.id === img.id ? lut.filter : "sepia(0.05)" }} />
                  <div className="absolute bottom-0 left-0 right-0 text-center text-[10px]" style={{ fontFamily: '"Caveat", cursive', color: INK }}>{s.caption}</div>
                </button>
              ))}
            </div>

            <div className="mt-8 text-xs tracking-[0.25em] uppercase mb-3" style={{ fontFamily: "'Special Elite', monospace", color: SEPIA }}>Trays</div>
            <ol className="space-y-2 text-sm">
              {["Develop · 4min", "Stop · 30s", "Fix · 5min", "Wash · 12min", "Tone · 8min"].map((t, i) => (
                <li key={t} className="flex items-center gap-2" style={{ fontFamily: '"EB Garamond", serif' }}>
                  <span className="w-3 h-3 rounded-full border-2" style={{ borderColor: SEPIA, background: i < 2 ? SEPIA : "transparent" }} />
                  <span className={i < 2 ? "line-through opacity-60" : ""}>{t}</span>
                </li>
              ))}
            </ol>
          </aside>

          {/* Center: the developing print */}
          <div className="relative p-8 lg:p-12 flex flex-col items-center justify-center min-h-[600px]">
            <div className="text-xs tracking-[0.25em] uppercase mb-4 self-start" style={{ fontFamily: "'Special Elite', monospace", color: SEPIA }}>
              Print № 014 — developing
            </div>
            <div className="relative bg-white p-4 pb-16 shadow-[0_30px_60px_-15px_rgba(60,40,20,0.4)] max-w-md w-full" style={{ transform: "rotate(-1deg)" }}>
              <img src={img.url} alt="" className="block w-full aspect-[4/5] object-cover" style={{ filter: lut.filter }} />
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-5 opacity-60" style={{ background: "rgba(220, 200, 130, 0.8)", clipPath: "polygon(5% 0, 100% 10%, 95% 100%, 0 90%)" }} />
              <div className="absolute bottom-4 left-0 right-0 text-center" style={{ fontFamily: '"Caveat", cursive', fontSize: "1.4rem", color: INK }}>
                {img.caption} — {lut.name}
              </div>
            </div>
            <div className="mt-4 text-sm italic self-end" style={{ fontFamily: '"Caveat", cursive', color: SEPIA }}>
              " try cooler shadows " ↘
            </div>
          </div>

          {/* Right: chemistry + recipe */}
          <aside className="p-6 border-l" style={{ borderColor: "#c9b89c" }}>
            <div className="text-xs tracking-[0.25em] uppercase mb-4" style={{ fontFamily: "'Special Elite', monospace", color: SEPIA }}>Today's recipe</div>
            <h3 className="text-3xl italic mb-1" style={{ fontFamily: '"EB Garamond", serif' }}>{lut.name}</h3>
            <div className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: SEPIA }}>{lut.family}</div>
            <p className="text-sm leading-relaxed mb-6 italic" style={{ fontFamily: '"EB Garamond", serif' }}>
              {lut.description}
            </p>

            <Recipe label="Highlights" v="−⅓ stop" />
            <Recipe label="Shadows" v="+⅔ stop" />
            <Recipe label="Whites" v="+12" />
            <Recipe label="Blacks" v="−8" />
            <Recipe label="Clarity" v="+6" />
            <Recipe label="Vibrance" v="+4" />
            <Recipe label="Saturation" v="0" />

            <div className="mt-6 text-xs tracking-[0.25em] uppercase mb-3" style={{ fontFamily: "'Special Elite', monospace", color: SEPIA }}>Signatures</div>
            <div className="space-y-1.5">
              {LUTS.slice(0, 5).map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLut(l)}
                  className={`w-full flex items-center gap-2 p-1 text-left text-sm transition ${l.id === lut.id ? "underline" : "hover:underline"}`}
                  style={{ fontFamily: '"EB Garamond", serif' }}
                >
                  <span className="flex gap-0.5">{l.swatch.map((c, ci) => <span key={ci} className="w-1.5 h-4" style={{ background: c }} />)}</span>
                  <span className="italic flex-1">{l.name}</span>
                </button>
              ))}
            </div>

            <button className="mt-8 w-full px-4 py-3 border-2 border-current text-sm tracking-[0.2em] uppercase hover:bg-current hover:text-[#f3ead8] transition" style={{ fontFamily: "'Special Elite', monospace" }}>
              Press to paper →
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Recipe({ label, v }: { label: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-dotted py-1.5" style={{ borderColor: "#c9b89c", fontFamily: '"EB Garamond", serif' }}>
      <span className="text-sm">{label}</span>
      <span className="text-sm italic" style={{ color: SEPIA }}>{v}</span>
    </div>
  );
}

function Footer() {
  return (
    <footer className="px-6 lg:px-20 py-12 border-t" style={{ borderColor: "#c9b89c" }}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-4xl mb-1" style={{ fontFamily: '"Caveat", cursive' }}>Wildlight Studio</div>
          <div className="text-sm italic" style={{ color: SEPIA, fontFamily: '"EB Garamond", serif' }}>
            Made on Bond №24, indexed by hand, posted from a Brooklyn attic.
          </div>
        </div>
        <Link href="/mockups" className="text-xs tracking-[0.25em] uppercase hover:underline" style={{ fontFamily: "'Special Elite', monospace" }}>← Mockups</Link>
      </div>
    </footer>
  );
}
