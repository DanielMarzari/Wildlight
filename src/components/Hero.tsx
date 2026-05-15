"use client";
import { motion } from "framer-motion";
import { BeforeAfter } from "./BeforeAfter";
import { HERO_IMAGE } from "@/lib/sample-images";
import { LUTS } from "@/lib/luts";
import Link from "next/link";

export function Hero() {
  const houseLut = LUTS.find((l) => l.id === "wildlight-house")!;
  return (
    <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
      <div className="aurora" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-white/60 mb-8"
        >
          <span className="block w-8 h-px bg-ember-300" />
          <span>A LUT studio for photographers</span>
        </motion.div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.92] tracking-[-0.03em] text-glow"
            >
              Light, <em className="italic text-ember-300">tamed.</em>
              <br />
              Color, <em className="italic text-twilight-300">considered.</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mt-8 max-w-xl text-lg lg:text-xl text-white/70 leading-relaxed"
            >
              Wildlight is a quiet, beautiful workshop for color grading.
              Hand-crafted LUTs from working photographers, a real-time editor in
              your browser, and a library that grows with your eye.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/studio"
                className="btn-primary group rounded-full bg-ember-400 hover:bg-ember-300 text-ink-950 px-7 py-3.5 text-sm font-medium tracking-tight inline-flex items-center gap-2 transition"
              >
                Open the studio
                <svg width="14" height="14" viewBox="0 0 14 14" className="group-hover:translate-x-1 transition-transform">
                  <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/library"
                className="rounded-full border border-white/15 hover:border-white/40 px-7 py-3.5 text-sm font-medium tracking-tight text-white/90 transition"
              >
                Browse the library →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="mt-14 flex items-center gap-8 text-xs text-white/40"
            >
              <span>32 hand-graded LUTs</span>
              <span className="w-px h-3 bg-white/15" />
              <span>Real-time browser editor</span>
              <span className="w-px h-3 bg-white/15" />
              <span className="hidden sm:inline">No render queue</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-gradient-to-br from-ember-500/20 via-transparent to-twilight-500/20 blur-3xl" />
            <BeforeAfter
              src={HERO_IMAGE}
              filter={houseLut.filter}
              lutName={houseLut.name}
              className="aspect-[4/5] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10"
            />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-ink-900/90 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 shadow-2xl"
            >
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">House LUT</div>
              <div className="font-display text-lg mt-0.5">{houseLut.name}</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
