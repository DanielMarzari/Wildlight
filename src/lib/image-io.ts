/**
 * Browser image loading with HEIC conversion + EXIF parsing.
 *
 * iPhone photos arrive as either HEIC (Camera default) or JPG (Share Sheet
 * converts). HEIC only renders natively in Safari; everywhere else we transcode
 * to JPEG via libheif (heic2any). Both formats carry full EXIF — model, lens,
 * focal length, aperture, shutter, ISO, white-balance, GPS, capture date —
 * which we surface in the studio metadata strip.
 *
 * RAW formats (.DNG, .CR3, .ARW, .NEF, .RAF, .ORF, .PEF, .RW2) aren't
 * demosaiced in the browser yet — that needs a full LibRaw WASM pipeline.
 * We detect the file, extract whatever EXIF the file embeds, and surface a
 * 'preview-only' state instead of pretending to render the linear sensor data.
 */

export type ParsedExif = {
  camera: string | null;
  lens: string | null;
  focal: string | null;
  aperture: string | null;
  shutter: string | null;
  ei: string | null;
  wb: string | null;
  date: string | null;
  coords: string | null;
  location: string | null;
};

export type LoadedImage = {
  url: string;          // blob URL ready for <img src>
  width: number;
  height: number;
  filename: string;
  exif: ParsedExif | null;
  isRaw: boolean;
  isHeic: boolean;
};

const RAW_EXTS = ["dng", "cr2", "cr3", "arw", "nef", "raf", "orf", "pef", "rw2", "srw", "x3f"];

export function isRawFilename(name: string): boolean {
  const ext = name.split(".").pop()?.toLowerCase();
  return !!ext && RAW_EXTS.includes(ext);
}

export function isHeicFile(file: File): boolean {
  if (file.type === "image/heic" || file.type === "image/heif") return true;
  const ext = file.name.split(".").pop()?.toLowerCase();
  return ext === "heic" || ext === "heif";
}

/** Convert HEIC → JPEG blob via libheif (dynamic import to keep bundle slim). */
async function heicToJpeg(file: File): Promise<Blob> {
  const heic2any = (await import("heic2any")).default;
  const result = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.92 });
  return Array.isArray(result) ? result[0] : result;
}

/** Parse EXIF via exifr (dynamic import, ~30KB) */
export async function readExif(file: File | Blob): Promise<ParsedExif | null> {
  try {
    const exifr = (await import("exifr")).default;
    const data = await exifr.parse(file, { gps: true, tiff: true, exif: true }).catch(() => null);
    if (!data) return null;
    return {
      camera: formatCamera(data.Make, data.Model),
      lens: data.LensModel || data.LensInfo || (Array.isArray(data.LensInfo) ? data.LensInfo.join(" ") : null) || null,
      focal: data.FocalLength ? `${Math.round(data.FocalLength)}mm` : null,
      aperture: data.FNumber ? `ƒ${Number(data.FNumber).toFixed(1).replace(/\.0$/, "")}` : null,
      shutter: formatShutter(data.ExposureTime),
      ei: data.ISO ? `ISO ${data.ISO}` : data.ExposureIndex ? `EI ${data.ExposureIndex}` : null,
      wb: formatWb(data.WhiteBalance, data.ColorTemperature),
      date: data.DateTimeOriginal ? formatDate(data.DateTimeOriginal) : null,
      coords: data.latitude !== undefined && data.longitude !== undefined ? formatCoords(data.latitude, data.longitude) : null,
      location: null, // reverse-geocoded by caller if desired
    };
  } catch {
    return null;
  }
}

function formatCamera(make: string | undefined, model: string | undefined): string | null {
  if (!make && !model) return null;
  if (!make) return model!;
  // Avoid double-printing "Apple iPhone 15 Pro" when the model already starts with the make
  if (model && model.toLowerCase().startsWith(make.toLowerCase())) return model;
  return [make, model].filter(Boolean).join(" ");
}

function formatShutter(seconds: number | undefined): string | null {
  if (!seconds) return null;
  if (seconds >= 1) return `${seconds.toFixed(1)}s`;
  return `1/${Math.round(1 / seconds)}`;
}

function formatWb(wb: number | string | undefined, kelvin: number | undefined): string | null {
  if (typeof kelvin === "number" && kelvin > 1000) return `${Math.round(kelvin)}K`;
  if (typeof wb === "string") return wb;
  if (typeof wb === "number") return wb === 0 ? "Auto WB" : "Manual WB";
  return null;
}

function formatDate(d: Date | string): string {
  const date = d instanceof Date ? d : new Date(d);
  if (isNaN(date.getTime())) return String(d);
  return date.toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" });
}

function formatCoords(lat: number, lon: number): string {
  const ns = lat >= 0 ? "N" : "S";
  const ew = lon >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(2)}°${ns} · ${Math.abs(lon).toFixed(2)}°${ew}`;
}

/** Read a file into an HTMLImageElement (after HEIC conversion if needed) */
async function loadAsImage(blob: Blob): Promise<{ img: HTMLImageElement; url: string }> {
  const url = URL.createObjectURL(blob);
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = () => reject(new Error("image decode failed"));
    i.src = url;
  });
  return { img, url };
}

/**
 * The single entry point — give it a File, get back a normalized image
 * (with metadata) ready to render. Throws for RAW until we ship LibRaw.
 */
export async function loadImageFile(file: File): Promise<LoadedImage> {
  const filename = file.name;
  const isRaw = isRawFilename(filename);
  const isHeic = isHeicFile(file);

  // Always try to read EXIF — works on JPG/HEIC/most RAW (exifr supports a lot)
  const exifFromOriginal = await readExif(file);

  if (isRaw) {
    return {
      url: "",
      width: 0,
      height: 0,
      filename,
      exif: exifFromOriginal,
      isRaw: true,
      isHeic: false,
    };
  }

  let blob: Blob = file;
  if (isHeic) {
    try {
      blob = await heicToJpeg(file);
    } catch (e) {
      throw new Error("HEIC conversion failed");
    }
  }

  const { img, url } = await loadAsImage(blob);
  return {
    url,
    width: img.naturalWidth,
    height: img.naturalHeight,
    filename,
    exif: exifFromOriginal,
    isRaw: false,
    isHeic,
  };
}
