/** Shared chapter index for the photography guide. Kept out of the
 *  "use client" chrome file so server components can import it cleanly. */

export const CHAPTERS = [
  { n: "01", slug: "exposure",     title: "The Exposure Triangle", sub: "ISO · Aperture · Shutter Speed" },
  { n: "02", slug: "composition",  title: "Composition",           sub: "How the Eye Moves Through the Frame" },
  { n: "03", slug: "light",        title: "Light",                 sub: "Direction · Quality · Color" },
  { n: "04", slug: "lenses",       title: "Lenses & Focal Length", sub: "Wide, Normal, Telephoto, Compression" },
  { n: "05", slug: "focus",        title: "Focus & Depth of Field",sub: "Where the Plane Sits, How Thick It Is" },
] as const;
