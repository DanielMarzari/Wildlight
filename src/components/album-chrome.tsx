"use client";
import Link from "next/link";
import { ApertureInline } from "@/components/brand";
import type { SampleImage } from "@/lib/sample-images";

const MONO = "'IBM Plex Mono', monospace";
const DISPLAY = '"Cormorant Garamond", "Cormorant", Georgia, serif';

export function AlbumNav({ letter, name }: { letter: string; name: string }) {
  return (
    <header className="fixed top-0 inset-x-0 z-30 backdrop-blur bg-black/40 border-b border-white/5">
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&display=swap" rel="stylesheet" />
      <nav className="h-14 px-6 lg:px-12 flex items-center justify-between">
        <Link href="/album" className="text-[10px] tracking-[0.4em] uppercase text-stone-400 hover:text-white" style={{ fontFamily: MONO }}>← ALBUM</Link>
        <Link href="/" className="hover:opacity-80 transition">
          <ApertureInline size={20} color="#e8dfd1" textClass="text-base" />
        </Link>
        <div className="text-[10px] tracking-[0.4em] uppercase text-orange-200/70" style={{ fontFamily: MONO }}>
          ROOM {letter} · {name}
        </div>
      </nav>
    </header>
  );
}

/** Caption block: place + gear + EXIF in a clean two-column meta layout */
export function CaptionBlock({ img, dense = false }: { img: SampleImage; dense?: boolean }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-x-8 gap-y-3 ${dense ? "" : "pt-5"}`}>
      <div>
        <div className="tracking-[-0.02em]" style={{ fontFamily: DISPLAY, fontSize: dense ? "1.5rem" : "clamp(1.5rem, 2.5vw, 2.2rem)", fontWeight: 400, lineHeight: 1.05 }}>
          {img.caption}
        </div>
        <div className="mt-1.5 text-[10px] tracking-[0.4em] uppercase text-stone-500" style={{ fontFamily: MONO }}>
          {img.coords} · {img.photographer.toUpperCase()} · {img.date.toUpperCase()}
        </div>
      </div>
      <div className="flex flex-col items-start sm:items-end gap-1 text-[10px] tracking-[0.35em] uppercase text-white/55" style={{ fontFamily: MONO }}>
        <span>{img.camera} · {img.lens}</span>
        <span>{img.focal} · {img.aperture} · {img.shutter} · {img.ei} · {img.wb}</span>
      </div>
    </div>
  );
}

export function Tick({ className, rot, opacity = 0.65 }: { className: string; rot: number; opacity?: number }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <svg width="20" height="20" style={{ transform: `rotate(${rot}deg)` }}>
        <path d="M 0 0 L 16 0 M 0 0 L 0 16" stroke="white" strokeWidth={1} opacity={opacity} />
      </svg>
    </div>
  );
}
