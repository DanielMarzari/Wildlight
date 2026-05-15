import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wildlight — LUT Studio for Photographers",
  description:
    "Cinematic color grading, hand-crafted LUTs, and a real-time photo editor built for photographers who care about light.",
  metadataBase: new URL("https://wildlight.danmarzari.com"),
  openGraph: {
    title: "Wildlight — LUT Studio",
    description: "Hand-crafted LUTs and a real-time photo editor for photographers.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="grain bg-ink-950 text-[#f6f0e6] antialiased">
        {children}
      </body>
    </html>
  );
}
