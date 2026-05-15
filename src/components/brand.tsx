/* Shared brand marks — Aperture iris + lockup variants */

export function Aperture({ size = 32, color = "#f5d28a", strokeWidth = 2 }: { size?: number; color?: string; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden>
      <circle cx="32" cy="32" r="28" stroke={color} strokeWidth={strokeWidth} />
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i * 60 * Math.PI) / 180;
        const x1 = 32 + Math.cos(a) * 26;
        const y1 = 32 + Math.sin(a) * 26;
        const x2 = 32 + Math.cos(a + Math.PI / 3) * 8;
        const y2 = 32 + Math.sin(a + Math.PI / 3) * 8;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={strokeWidth} />;
      })}
    </svg>
  );
}

/** Horizontal inline lockup — for nav bars */
export function ApertureInline({ size = 22, color = "#f5d28a", textClass = "" }: { size?: number; color?: string; textClass?: string }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Aperture size={size} color={color} strokeWidth={2} />
      <span className={`tracking-[-0.02em] ${textClass}`} style={{ fontFamily: '"Cormorant Garamond", "Cormorant", Georgia, serif', fontWeight: 500 }}>
        Wildlight
      </span>
    </span>
  );
}

/** Stamp / stacked lockup — for hero accents, footer marks, etc. */
export function ApertureStamp({
  size = 44,
  color = "#f5d28a",
  est = "EST. 2026 · BROOKLYN",
  className = "",
}: {
  size?: number;
  color?: string;
  est?: string;
  className?: string;
}) {
  return (
    <div className={`inline-flex flex-col items-center gap-3 text-center ${className}`}>
      <Aperture size={size} color={color} strokeWidth={1.6} />
      <div className="tracking-[-0.02em] leading-none" style={{ fontFamily: '"Cormorant Garamond", "Cormorant", Georgia, serif', fontSize: size * 0.7, fontWeight: 500, color }}>
        Wildlight
      </div>
      <div className="text-[10px] tracking-[0.35em] uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "rgba(255,255,255,0.5)" }}>
        {est}
      </div>
    </div>
  );
}
