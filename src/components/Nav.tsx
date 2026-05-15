"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export function Nav() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ink-950/40 border-b border-white/5"
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Logo />
          <span className="font-display text-lg tracking-tight">Wildlight</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <Link href="/library" className="hover:text-white transition">Library</Link>
          <Link href="/studio" className="hover:text-white transition">Studio</Link>
          <Link href="#process" className="hover:text-white transition">Process</Link>
          <Link href="#pricing" className="hover:text-white transition">Pricing</Link>
        </div>
        <Link
          href="/studio"
          className="btn-primary rounded-full bg-white text-ink-950 px-5 py-2 text-sm font-medium tracking-tight hover:bg-ember-200 transition"
        >
          Open Studio
        </Link>
      </nav>
    </motion.header>
  );
}

function Logo() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" className="text-ember-300 group-hover:rotate-12 transition-transform duration-500">
      <defs>
        <radialGradient id="lg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffb673" />
          <stop offset="100%" stopColor="#7f63d1" />
        </radialGradient>
      </defs>
      <circle cx="13" cy="13" r="11" fill="url(#lg)" opacity="0.9" />
      <circle cx="13" cy="13" r="4" fill="#0c0a18" />
    </svg>
  );
}
