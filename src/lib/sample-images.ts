export type SampleImage = {
  id: string;
  url: string;
  caption: string;
  photographer: string;
};

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const SAMPLE_IMAGES: SampleImage[] = [
  { id: "1469474968028-56623f02e42e", url: u("1469474968028-56623f02e42e"), caption: "Cliffside, dawn", photographer: "S. Lehman" },
  { id: "1501785888041-af3ef285b470", url: u("1501785888041-af3ef285b470"), caption: "Lake reflection", photographer: "L. Maddalena" },
  { id: "1500530855697-b586d89ba3ee", url: u("1500530855697-b586d89ba3ee"), caption: "Field at golden hour", photographer: "K. Mitch Hodge" },
  { id: "1506905925346-21bda4d32df4", url: u("1506905925346-21bda4d32df4"), caption: "Alpine ridge", photographer: "S. Pawar" },
  { id: "1470770841072-f978cf4d019e", url: u("1470770841072-f978cf4d019e"), caption: "Foggy spruce", photographer: "L. Mancini" },
  { id: "1518173946687-a4c8892bbd9f", url: u("1518173946687-a4c8892bbd9f"), caption: "Coastal light", photographer: "M. Roviello" },
];

export const HERO_IMAGE = u("1506905925346-21bda4d32df4", 2400);
