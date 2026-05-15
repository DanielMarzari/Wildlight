"use client";
import { useRef, useState, useEffect } from "react";

type Props = {
  src: string;
  filter: string;
  lutName: string;
  className?: string;
};

export function BeforeAfter({ src, filter, lutName, className = "" }: Props) {
  const [pos, setPos] = useState(50);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current || !wrapRef.current) return;
      const r = wrapRef.current.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      setPos(Math.max(0, Math.min(100, x)));
    };
    const onUp = () => (dragging.current = false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden rounded-2xl select-none ${className}`}
      onPointerDown={(e) => {
        dragging.current = true;
        const r = e.currentTarget.getBoundingClientRect();
        setPos(((e.clientX - r.left) / r.width) * 100);
      }}
    >
      {/* BEFORE */}
      <img
        src={src}
        alt=""
        className="block w-full h-full object-cover"
        draggable={false}
      />
      {/* AFTER (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      >
        <img
          src={src}
          alt=""
          className="block w-full h-full object-cover"
          style={{ filter }}
          draggable={false}
        />
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white/90 shadow-[0_0_24px_rgba(255,255,255,0.6)] pointer-events-none"
        style={{ left: `${pos}%` }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white/95 border border-white shadow-2xl flex items-center justify-center text-ink-950 pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14">
          <path d="M3 7l3-3v6zM11 7L8 4v6z" fill="currentColor" />
        </svg>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase bg-black/40 backdrop-blur px-2 py-1 rounded text-white/80">
        Original
      </div>
      <div className="absolute top-4 right-4 text-[10px] tracking-[0.2em] uppercase bg-black/40 backdrop-blur px-2 py-1 rounded text-ember-200">
        {lutName}
      </div>
    </div>
  );
}
