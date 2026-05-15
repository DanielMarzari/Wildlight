import { Nav } from "@/components/Nav";
import { LutGrid } from "@/components/LutGrid";
import { Footer } from "@/components/Footer";

export const metadata = { title: "Library · Wildlight" };

export default function LibraryPage() {
  return (
    <>
      <Nav />
      <main className="pt-24">
        <section className="relative py-20 lg:py-32">
          <div className="aurora" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-white/50 mb-6">
              <span className="block w-6 h-px bg-ember-300" />
              <span>Library</span>
            </div>
            <h1 className="font-display text-6xl lg:text-8xl tracking-[-0.02em] leading-[0.9]">
              The full catalog.
            </h1>
            <p className="mt-6 max-w-xl text-white/60 leading-relaxed text-lg">
              Filter by family, hover any card for a live preview, click through
              to open the LUT in the studio.
            </p>
          </div>
        </section>
        <LutGrid />
        <Footer />
      </main>
    </>
  );
}
