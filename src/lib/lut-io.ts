/**
 * .cube file IO + custom LUT persistence.
 *
 * We parse the standard Adobe .cube format (LUT_3D_SIZE + RGB triplets) into a
 * preview-friendly CSS filter approximation. A full WebGL 3D-lookup pipeline is
 * future work — for now we sample the cube at characteristic points to derive
 * contrast / saturation / hue-rotate / sepia-like primitives and assemble a
 * CSS filter string. The full cube is preserved alongside so a future render
 * pipeline can use it for accurate export.
 */
import type { Lut } from "@/lib/luts";

export type CustomLut = Lut & {
  source: "user-cube" | "user-design";
  cube?: number[]; // flat [r,g,b,r,g,b,...] of N^3 entries
  cubeSize?: number; // N
  filterChain?: string; // additional CSS filter prefix (e.g. an SVG feColorMatrix reference)
};

const STORE_KEY = "wildlight:customLuts:v1";

export function loadCustomLuts(): CustomLut[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    return raw ? (JSON.parse(raw) as CustomLut[]) : [];
  } catch {
    return [];
  }
}

export function saveCustomLut(lut: CustomLut) {
  if (typeof window === "undefined") return;
  const existing = loadCustomLuts().filter((l) => l.id !== lut.id);
  const next = [...existing, lut];
  window.localStorage.setItem(STORE_KEY, JSON.stringify(next));
}

export function deleteCustomLut(id: string) {
  if (typeof window === "undefined") return;
  const next = loadCustomLuts().filter((l) => l.id !== id);
  window.localStorage.setItem(STORE_KEY, JSON.stringify(next));
}

/** Parse Adobe .cube format. Returns null on malformed input. */
export function parseCube(text: string): { size: number; data: number[] } | null {
  const lines = text.split(/\r?\n/);
  let size = 0;
  const data: number[] = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    if (line.startsWith("TITLE")) continue;
    if (line.startsWith("DOMAIN_")) continue;
    if (line.startsWith("LUT_1D_SIZE")) return null; // not handling 1D
    if (line.startsWith("LUT_3D_SIZE")) {
      const m = line.match(/LUT_3D_SIZE\s+(\d+)/);
      if (m) size = parseInt(m[1], 10);
      continue;
    }
    const parts = line.split(/\s+/).map(Number);
    if (parts.length === 3 && parts.every((n) => !Number.isNaN(n))) {
      data.push(...parts);
    }
  }
  if (!size || data.length !== size * size * size * 3) return null;
  return { size, data };
}

/**
 * Roughly characterize a 3D LUT cube so we can derive a CSS-filter preview.
 * Samples key swatches (mid-grey, primaries, near-black, near-white) and
 * estimates contrast/saturation/hue-shift/brightness biases.
 */
export function characterizeCube(size: number, data: number[]) {
  const at = (r: number, g: number, b: number) => {
    const idx = (r + g * size + b * size * size) * 3;
    return [data[idx], data[idx + 1], data[idx + 2]] as [number, number, number];
  };
  const N = size - 1;
  const mid = at(Math.floor(N / 2), Math.floor(N / 2), Math.floor(N / 2));
  const black = at(0, 0, 0);
  const white = at(N, N, N);
  const red = at(N, 0, 0);
  const green = at(0, N, 0);
  const blue = at(0, 0, N);

  const midLuma = 0.2126 * mid[0] + 0.7152 * mid[1] + 0.0722 * mid[2];
  const brightness = midLuma / 0.5;

  const whiteLuma = 0.2126 * white[0] + 0.7152 * white[1] + 0.0722 * white[2];
  const blackLuma = 0.2126 * black[0] + 0.7152 * black[1] + 0.0722 * black[2];
  const contrast = Math.max(0.6, Math.min(1.6, (whiteLuma - blackLuma)));

  const avgPrimary = (red[0] + green[1] + blue[2]) / 3;
  const saturation = Math.max(0.3, Math.min(1.8, avgPrimary * 1.05));

  // Warmth bias from primary shifts
  const warmHue = Math.atan2(red[2] - red[1], 0.1) * (180 / Math.PI) * 0.3;

  return { brightness, contrast, saturation, hue: warmHue };
}

export function cubeToFilter(size: number, data: number[]): string {
  const { brightness, contrast, saturation, hue } = characterizeCube(size, data);
  return `brightness(${brightness.toFixed(3)}) contrast(${contrast.toFixed(3)}) saturate(${saturation.toFixed(3)}) hue-rotate(${hue.toFixed(2)}deg)`;
}

/**
 * Synthesize a minimal .cube file from a CSS filter chain by rendering N^3
 * test colors through an offscreen canvas with that filter applied. Useful for
 * exporting custom LUTs from the DESIGN tab.
 */
export async function filterToCube(filter: string, size = 17): Promise<{ text: string; data: number[] }> {
  if (typeof document === "undefined") throw new Error("server");
  const canvas = document.createElement("canvas");
  canvas.width = size * size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("no 2d ctx");

  // draw identity LUT
  const id = ctx.createImageData(size * size, size);
  for (let b = 0; b < size; b++) {
    for (let g = 0; g < size; g++) {
      for (let r = 0; r < size; r++) {
        const x = b * size + r;
        const y = g;
        const i = (y * size * size + x) * 4;
        id.data[i] = Math.round((r / (size - 1)) * 255);
        id.data[i + 1] = Math.round((g / (size - 1)) * 255);
        id.data[i + 2] = Math.round((b / (size - 1)) * 255);
        id.data[i + 3] = 255;
      }
    }
  }
  ctx.putImageData(id, 0, 0);

  // apply filter by re-drawing through a filter
  const out = document.createElement("canvas");
  out.width = size * size;
  out.height = size;
  const octx = out.getContext("2d");
  if (!octx) throw new Error("no out ctx");
  octx.filter = filter;
  octx.drawImage(canvas, 0, 0);
  const pixels = octx.getImageData(0, 0, size * size, size).data;

  const data: number[] = [];
  for (let b = 0; b < size; b++) {
    for (let g = 0; g < size; g++) {
      for (let r = 0; r < size; r++) {
        const x = b * size + r;
        const y = g;
        const i = (y * size * size + x) * 4;
        data.push(pixels[i] / 255, pixels[i + 1] / 255, pixels[i + 2] / 255);
      }
    }
  }

  let text = `# Wildlight custom LUT\nLUT_3D_SIZE ${size}\n`;
  for (let i = 0; i < data.length; i += 3) {
    text += `${data[i].toFixed(6)} ${data[i + 1].toFixed(6)} ${data[i + 2].toFixed(6)}\n`;
  }
  return { text, data };
}

export function downloadFile(name: string, content: string, mime = "text/plain") {
  if (typeof document === "undefined") return;
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Bake the given CSS filter + an HTMLImageElement into a PNG download at the
 * image's natural resolution.
 */
export async function exportPng(img: HTMLImageElement, filter: string, name: string) {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no 2d ctx");
  ctx.filter = filter || "none";
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return new Promise<void>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) return reject(new Error("export failed"));
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      resolve();
    }, "image/png");
  });
}
