import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative pt-32 pb-12 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 mb-16">
          <div>
            <div className="font-display text-3xl tracking-tight mb-3">Wildlight</div>
            <p className="text-sm text-white/50 max-w-xs leading-relaxed">
              Hand-graded LUTs and a real-time browser studio for photographers
              who care about color.
            </p>
          </div>
          <FooterCol title="Studio" links={[["Library", "/library"], ["Editor", "/studio"], ["House pack", "#pricing"]]} />
          <FooterCol title="Atelier" links={[["Custom LUTs", "/contact"], ["Process", "#process"], ["Reference frames", "/library"]]} />
          <FooterCol title="Workshop" links={[["Field notes", "/journal"], ["Compatibility", "/docs"], ["Contact", "mailto:hello@wildlight.studio"]]} />
        </div>

        <div className="hairline mb-8" />

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-white/40">
          <span>© {new Date().getFullYear()} Wildlight Studio. All grades reserved.</span>
          <span className="font-mono">v0.1 · Made on a quiet desk</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-4">{title}</div>
      <ul className="space-y-2.5">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link href={href} className="text-sm text-white/70 hover:text-white transition">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
