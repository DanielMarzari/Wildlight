import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { LutGrid } from "@/components/LutGrid";
import { Process } from "@/components/Process";
import { EditorPreview } from "@/components/EditorPreview";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main className="relative">
        <Hero />
        <Marquee />
        <LutGrid />
        <Process />
        <EditorPreview />
        <Pricing />
        <Footer />
      </main>
    </>
  );
}
