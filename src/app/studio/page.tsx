import { Nav } from "@/components/Nav";
import { Studio } from "@/components/Studio";

export const metadata = { title: "Studio · Wildlight" };

export default function StudioPage() {
  return (
    <>
      <Nav />
      <main className="pt-20">
        <Studio />
      </main>
    </>
  );
}
