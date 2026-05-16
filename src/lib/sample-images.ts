export type SampleImage = {
  id: string;
  url: string;
  /** Location label — used as the caption / primary label */
  caption: string;
  /** Coords-style label (decimal degrees) — secondary line */
  coords: string;
  photographer: string;
  camera: string;
  lens: string;
  focal: string;
  aperture: string;
  shutter: string;
  ei: string;
  wb: string;
  date: string;
};

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const SAMPLE_IMAGES: SampleImage[] = [
  {
    id: "1469474968028-56623f02e42e",
    url: u("1469474968028-56623f02e42e"),
    caption: "Cliffside, dawn",
    coords: "37.79°N · 122.50°W",
    photographer: "S. Lehman",
    camera: "Hasselblad X2D",
    lens: "XCD 38V",
    focal: "38mm",
    aperture: "ƒ8",
    shutter: "1/125",
    ei: "EI 200",
    wb: "3200K",
    date: "Apr 11, 2026",
  },
  {
    id: "1501785888041-af3ef285b470",
    url: u("1501785888041-af3ef285b470"),
    caption: "Lake reflection",
    coords: "47.85°N · 12.21°E",
    photographer: "L. Maddalena",
    camera: "Leica Q3",
    lens: "Summilux 28",
    focal: "28mm",
    aperture: "ƒ5.6",
    shutter: "1/250",
    ei: "EI 100",
    wb: "5200K",
    date: "Mar 02, 2026",
  },
  {
    id: "1500530855697-b586d89ba3ee",
    url: u("1500530855697-b586d89ba3ee"),
    caption: "Field at golden hour",
    coords: "44.43°N · 110.59°W",
    photographer: "K. Mitch Hodge",
    camera: "Sony α7R V",
    lens: "GM 50/1.4",
    focal: "50mm",
    aperture: "ƒ2.8",
    shutter: "1/640",
    ei: "EI 400",
    wb: "4800K",
    date: "Sep 21, 2025",
  },
  {
    id: "1506905925346-21bda4d32df4",
    url: u("1506905925346-21bda4d32df4"),
    caption: "Alpine ridge",
    coords: "46.55°N · 8.21°E",
    photographer: "S. Pawar",
    camera: "Phase One IQ4",
    lens: "Schneider 80LS",
    focal: "80mm",
    aperture: "ƒ11",
    shutter: "1/60",
    ei: "EI 50",
    wb: "5600K",
    date: "Jun 14, 2025",
  },
  {
    id: "1470770841072-f978cf4d019e",
    url: u("1470770841072-f978cf4d019e"),
    caption: "Foggy spruce",
    coords: "60.39°N · 5.32°E",
    photographer: "L. Mancini",
    camera: "Fuji GFX 100 II",
    lens: "GF 32-64",
    focal: "44mm",
    aperture: "ƒ8",
    shutter: "1/40",
    ei: "EI 800",
    wb: "6500K",
    date: "Nov 02, 2025",
  },
  {
    id: "1518173946687-a4c8892bbd9f",
    url: u("1518173946687-a4c8892bbd9f"),
    caption: "Coastal light",
    coords: "36.41°N · 25.39°E",
    photographer: "M. Roviello",
    camera: "Canon R5",
    lens: "RF 24-70",
    focal: "35mm",
    aperture: "ƒ4",
    shutter: "1/800",
    ei: "EI 200",
    wb: "5400K",
    date: "Aug 07, 2025",
  },
];

export const HERO_IMAGE = u("1506905925346-21bda4d32df4", 2400);

/** Inline mono-typeset EXIF line, e.g. "ƒ8 · 1/125 · EI 200 · 3200K" */
export function exifLine(img: SampleImage): string {
  return `${img.aperture} · ${img.shutter} · ${img.ei} · ${img.wb}`;
}
/** Full body+lens line, e.g. "Hasselblad X2D · XCD 38V · 38mm" */
export function gearLine(img: SampleImage): string {
  return `${img.camera} · ${img.lens} · ${img.focal}`;
}
