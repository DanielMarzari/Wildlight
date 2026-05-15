export type Lut = {
  id: string;
  name: string;
  family: "Cinematic" | "Portrait" | "Landscape" | "Mono" | "Travel" | "Editorial";
  description: string;
  /** CSS filter chain used for the live preview */
  filter: string;
  /** Tailwind-friendly tint stops for the swatch */
  swatch: [string, string, string];
};

export const LUTS: Lut[] = [
  {
    id: "ember-falls",
    name: "Ember Falls",
    family: "Cinematic",
    description: "Warm amber highlights with cool teal shadows. The 4 a.m. golden hour you wish you woke up for.",
    filter: "contrast(1.12) saturate(1.18) sepia(0.18) hue-rotate(-8deg) brightness(1.03)",
    swatch: ["#3a1d0a", "#c46a1f", "#f4c98a"],
  },
  {
    id: "still-water",
    name: "Still Water",
    family: "Landscape",
    description: "Glacial blues, lifted blacks, gentle desaturation. Built for water, fog, and silence.",
    filter: "contrast(1.05) saturate(0.78) hue-rotate(8deg) brightness(0.98)",
    swatch: ["#0c1a22", "#3a6b7a", "#a8c5d4"],
  },
  {
    id: "fraunce",
    name: "Fraunce",
    family: "Editorial",
    description: "Faded magazine print. Crushed shadows, paper-soft highlights, the faintest cyan bias.",
    filter: "contrast(0.92) saturate(0.82) sepia(0.06) hue-rotate(180deg) brightness(1.04)",
    swatch: ["#2a2530", "#9b8a82", "#efe7d8"],
  },
  {
    id: "north-meadow",
    name: "North Meadow",
    family: "Landscape",
    description: "Verdant greens pushed toward chartreuse. Lush, almost painterly. Wedding photographers love it.",
    filter: "contrast(1.08) saturate(1.22) hue-rotate(-12deg) brightness(1.02)",
    swatch: ["#0a1d10", "#4e8773", "#d1e0a8"],
  },
  {
    id: "rosewell",
    name: "Rosewell",
    family: "Portrait",
    description: "Skin-true warmth without orange. Lifted reds, gentle bloom, perfect for window light.",
    filter: "contrast(1.04) saturate(1.08) sepia(0.08) hue-rotate(-4deg) brightness(1.05)",
    swatch: ["#3a1c1f", "#c98080", "#f3d8cf"],
  },
  {
    id: "kodachrome-iv",
    name: "Kodachrome IV",
    family: "Travel",
    description: "Punchy primaries, deep midnight blues, a memory of slide film. Streets, markets, mountains.",
    filter: "contrast(1.18) saturate(1.32) hue-rotate(-2deg) brightness(0.98)",
    swatch: ["#0a1230", "#c43a2a", "#f0c243"],
  },
  {
    id: "ash-grain",
    name: "Ash Grain",
    family: "Mono",
    description: "Mid-tone preserving monochrome with a charcoal weight. Built for portraits and architecture.",
    filter: "grayscale(1) contrast(1.16) brightness(1.02)",
    swatch: ["#0a0a0c", "#5c5c63", "#e5e3df"],
  },
  {
    id: "wildlight-house",
    name: "Wildlight House",
    family: "Cinematic",
    description: "Our house LUT. Cinema-warm midtones, ember highlights, twilight blacks. A signature finish.",
    filter: "contrast(1.14) saturate(1.06) sepia(0.12) hue-rotate(-6deg) brightness(1.02)",
    swatch: ["#0c0a18", "#7f5e3a", "#ffb673"],
  },
];

export const FAMILIES = [
  "All",
  "Cinematic",
  "Portrait",
  "Landscape",
  "Mono",
  "Travel",
  "Editorial",
] as const;
