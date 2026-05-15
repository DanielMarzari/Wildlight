"use client";

const WORDS = [
  "Hand-crafted",
  "Cinematic",
  "Real-time",
  "Reversible",
  "Color-true",
  "Photographer-built",
  "Quiet",
  "Editorial",
];

export function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <section className="relative py-12 border-y border-white/5 overflow-hidden">
      <div className="scroll-marquee whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-16">
            <span className="font-display italic text-3xl md:text-5xl text-white/30">{w}</span>
            <Star />
          </span>
        ))}
      </div>
    </section>
  );
}

function Star() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" className="text-ember-400 shrink-0">
      <path d="M9 0L10.5 7.5L18 9L10.5 10.5L9 18L7.5 10.5L0 9L7.5 7.5Z" fill="currentColor" />
    </svg>
  );
}
