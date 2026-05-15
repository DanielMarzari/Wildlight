"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const TIERS = [
  {
    name: "Single LUT",
    price: "$12",
    description: "Pick any one signature. Yours, forever.",
    features: ["1 LUT of your choice", ".cube + .3dl exports", "Browser studio access", "Free updates"],
    cta: "Choose a LUT",
    href: "/library",
  },
  {
    name: "House Pack",
    price: "$48",
    description: "All eight signatures, every variant.",
    features: ["All 8 LUTs", "32 stylistic variants", ".cube + .3dl + DCP", "Browser studio access", "Free updates"],
    cta: "Get the pack",
    href: "/checkout",
    featured: true,
  },
  {
    name: "Atelier",
    price: "$240",
    description: "We grade a custom LUT against your own work.",
    features: ["1 bespoke LUT", "60-min consult", "Two revision passes", "All House Pack LUTs included"],
    cta: "Book the atelier",
    href: "/contact",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs tracking-[0.25em] uppercase text-white/50 mb-4">
            <span className="block w-6 h-px bg-ember-300" />
            <span>Pricing</span>
            <span className="block w-6 h-px bg-ember-300" />
          </div>
          <h2 className="font-display text-5xl lg:text-7xl tracking-[-0.02em] leading-[0.95]">
            Buy <em className="italic">once.</em>
          </h2>
          <p className="mt-6 text-white/60">No subscription. No render credits. Files you own.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`relative rounded-3xl p-8 lg:p-10 flex flex-col ${
                t.featured
                  ? "bg-gradient-to-br from-ember-600/20 via-ink-900 to-twilight-600/20 ring-2 ring-ember-400/50"
                  : "bg-ink-900/60 ring-1 ring-white/10"
              }`}
            >
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ember-400 text-ink-950 text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full font-medium">
                  Most chosen
                </div>
              )}
              <div className="font-display text-2xl tracking-tight">{t.name}</div>
              <div className="mt-3 font-display text-6xl tracking-[-0.02em]">{t.price}</div>
              <p className="mt-4 text-sm text-white/60 leading-relaxed">{t.description}</p>
              <ul className="mt-8 space-y-3 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-white/80">
                    <svg width="16" height="16" viewBox="0 0 16 16" className="text-ember-300 mt-0.5 shrink-0">
                      <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={t.href}
                className={`mt-10 btn-primary rounded-full text-center text-sm font-medium tracking-tight px-6 py-3.5 transition ${
                  t.featured
                    ? "bg-ember-400 hover:bg-ember-300 text-ink-950"
                    : "border border-white/15 hover:border-white/40 hover:bg-white/5"
                }`}
              >
                {t.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
