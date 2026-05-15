"use client";
import { motion } from "framer-motion";

const STEPS = [
  {
    n: "01",
    title: "Reference frames",
    body:
      "Every LUT begins with twenty reference scenes shot in mixed light — window portraits, overcast landscape, neon street. The grade has to survive all of them.",
  },
  {
    n: "02",
    title: "Curves, then chroma",
    body:
      "Tone first. Contrast is built from custom RGB curves, not a single slider. Color only enters once the luminance is musical.",
  },
  {
    n: "03",
    title: "Selective hue work",
    body:
      "Skin, foliage, and sky each get their own treatment. We pull a hue without flattening the rest of the frame.",
  },
  {
    n: "04",
    title: "Print before pixel",
    body:
      "Every LUT is checked against a calibrated print. If it doesn't survive paper, it doesn't ship.",
  },
];

export function Process() {
  return (
    <section id="process" className="relative py-28 lg:py-40 bg-ink-900/40 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-white/50 mb-4">
              <span className="block w-6 h-px bg-sage-400" />
              <span>The process</span>
            </div>
            <h2 className="font-display text-5xl lg:text-7xl tracking-[-0.02em] leading-[0.95]">
              Made slowly.
              <br />
              <em className="italic text-sage-300">On purpose.</em>
            </h2>
            <p className="mt-8 text-white/60 leading-relaxed max-w-md">
              Wildlight LUTs aren't generated. They're graded by hand against
              real photographs, then tested against twenty more.
            </p>
          </div>

          <ol className="space-y-12">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="grid grid-cols-[auto_1fr] gap-6 lg:gap-10 pb-12 border-b border-white/5 last:border-0"
              >
                <div className="font-mono text-xs text-ember-300 pt-2">{s.n}</div>
                <div>
                  <h3 className="font-display text-2xl lg:text-3xl tracking-tight mb-3">{s.title}</h3>
                  <p className="text-white/60 leading-relaxed">{s.body}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
