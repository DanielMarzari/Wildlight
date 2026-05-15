"use client";
import Link from "next/link";

export function StudioTopBar({ letter, name, imageCaption, lutName }: { letter: string; name: string; imageCaption: string; lutName: string }) {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-black/40 border-b border-white/10">
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <nav className="h-12 px-4 lg:px-8 flex items-center gap-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        <Link href="/studios" className="text-[10px] tracking-[0.4em] uppercase text-stone-400 hover:text-white">← STUDIOS</Link>
        <div className="w-px h-5 bg-white/10" />
        <div className="text-[10px] tracking-[0.3em] uppercase text-orange-200/80">
          <span className="text-orange-300">STUDIO {letter}</span> <span className="text-white/40">·</span> {name}
        </div>
        <div className="flex-1 text-center text-[11px] text-white/40 truncate">
          ridge_07.RAF · {imageCaption} · {lutName}
        </div>
        <div className="text-[10px] tracking-[0.3em] uppercase text-white/40">⌘S · 2m AGO</div>
      </nav>
    </header>
  );
}

export function CornerTick({ className, rot }: { className: string; rot: number }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <svg width="22" height="22" style={{ transform: `rotate(${rot}deg)` }}>
        <path d="M 0 0 L 18 0 M 0 0 L 0 18" stroke="white" strokeWidth={1} opacity={0.7} />
      </svg>
    </div>
  );
}

export function FrameMetadata({ size = "default" }: { size?: "default" | "compact" }) {
  return (
    <div
      className={`flex items-center gap-${size === "compact" ? "3" : "5"} text-[${size === "compact" ? "9" : "10"}px] tracking-[0.4em] uppercase text-white/55`}
      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
    >
      <span>EI 200</span>
      <span className="text-white/25">·</span>
      <span>ƒ8</span>
      <span className="text-white/25">·</span>
      <span>1/125</span>
      <span className="text-white/25">·</span>
      <span>3200K</span>
      <span className="text-white/25">·</span>
      <span>RAW</span>
    </div>
  );
}

export function Histogram({ accent = "#f5b878" }: { accent?: string }) {
  const bars = Array.from({ length: 64 }).map((_, i) => {
    const x = i / 64;
    return Math.max(0.05, Math.exp(-Math.pow((x - 0.45) * 3, 2)) + 0.1 * Math.sin(i * 0.4));
  });
  return (
    <svg viewBox="0 0 256 80" className="w-full h-20">
      <defs>
        <linearGradient id="hgg" x1="0" x2="1">
          <stop offset="0" stopColor="#c1554e" />
          <stop offset="0.5" stopColor={accent} />
          <stop offset="1" stopColor="#5fa7b6" />
        </linearGradient>
      </defs>
      {bars.map((h, i) => (
        <rect key={i} x={i * 4} y={80 - h * 78} width={3} height={h * 78} fill="url(#hgg)" opacity={0.85} />
      ))}
    </svg>
  );
}

export function ToneCurve() {
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

export function Waveform() {
  return (
    <svg viewBox="0 0 400 100" className="w-full h-20">
      {Array.from({ length: 200 }).map((_, i) => {
        const x = i * 2;
        const baseY = 50 + Math.sin(i * 0.05) * 22 - Math.exp(-Math.pow((i - 100) / 60, 2)) * 26;
        const spread = 7 + Math.random() * 10;
        return <line key={i} x1={x} y1={baseY - spread} x2={x} y2={baseY + spread} stroke="rgba(245, 184, 120, 0.4)" strokeWidth={1} />;
      })}
    </svg>
  );
}

export function Vectorscope() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-24 mx-auto" style={{ maxWidth: 140 }}>
      <circle cx={60} cy={60} r={50} fill="none" stroke="rgba(255,255,255,0.1)" />
      <circle cx={60} cy={60} r={30} fill="none" stroke="rgba(255,255,255,0.06)" />
      <line x1={10} y1={60} x2={110} y2={60} stroke="rgba(255,255,255,0.05)" />
      <line x1={60} y1={10} x2={60} y2={110} stroke="rgba(255,255,255,0.05)" />
      {[[35, 80, "R"], [85, 45, "Y"], [85, 80, "G"], [35, 45, "B"]].map(([x, y, l], i) => (
        <g key={i}><rect x={Number(x) - 3} y={Number(y) - 3} width={6} height={6} fill="none" stroke="rgba(255,255,255,0.2)" /><text x={Number(x) + 5} y={Number(y) - 5} fontSize={6} fill="rgba(255,255,255,0.4)">{l}</text></g>
      ))}
      {Array.from({ length: 120 }).map((_, i) => {
        const a = (i / 120) * Math.PI * 2;
        const r = 15 + Math.random() * 22;
        return <circle key={i} cx={60 + Math.cos(a) * r} cy={60 + Math.sin(a) * r * 0.7} r={0.7} fill="#f5b878" opacity={0.7} />;
      })}
    </svg>
  );
}

export function RGBParade() {
  return (
    <div className="flex gap-1 h-20">
      {["#ff7a7a", "#7aff95", "#7a95ff"].map((c, i) => (
        <svg key={i} viewBox="0 0 100 100" className="flex-1 h-full">
          {Array.from({ length: 50 }).map((_, j) => {
            const x = j * 2;
            const baseY = 50 + Math.sin(j * 0.1 + i) * 14;
            const spread = 6 + Math.random() * 9;
            return <line key={j} x1={x} y1={baseY - spread} x2={x} y2={baseY + spread} stroke={c} strokeWidth={1} opacity={0.4} />;
          })}
        </svg>
      ))}
    </div>
  );
}

export function ColorBall({ accent, size = 120 }: { accent: string; size?: number }) {
  return (
    <div className="relative mx-auto rounded-full" style={{ width: size, height: size, background: "conic-gradient(from 0deg, #ff4040, #ffd060, #60ff60, #60ffd0, #60a0ff, #c060ff, #ff60c0, #ff4040)" }}>
      <div className="absolute inset-3 rounded-full bg-[#0d0c0a] flex items-center justify-center">
        <div className="w-2 h-2 rounded-full" style={{ background: accent, boxShadow: `0 0 10px ${accent}` }} />
      </div>
    </div>
  );
}

export function PanelTitle({ children, n }: { children: React.ReactNode; n?: string }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="text-[10px] tracking-[0.3em] uppercase text-white/40" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        {children}
      </div>
      {n && <div className="text-[10px] tracking-[0.3em] uppercase text-orange-200/50" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{n}</div>}
    </div>
  );
}

export function StudioFooter({ lutName, scope = "waveform" }: { lutName: string; scope?: string }) {
  return (
    <div className="h-8 bg-[#161210] border-t border-white/5 flex items-center px-4 text-[10px] font-mono text-stone-500 justify-between" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      <span className="tracking-[0.2em] uppercase">● GPU 18% · {lutName} · HISTORY 12</span>
      <span className="tracking-[0.2em] uppercase">SCOPE · {scope.toUpperCase()} · 16-BIT REC.2020</span>
    </div>
  );
}
