"use client";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { LutRenderer, type Adjust, type Channel, type HueMask, DEFAULT_ADJUST, DEFAULT_HUE_MASK, cubeForFilter } from "@/lib/lut-engine";

export type WebGLCanvasHandle = {
  /** Trigger a PNG download of the current rendered output at full image res. */
  exportPng: (filename: string) => Promise<void>;
  /** Get the underlying canvas (for advanced flows) */
  getCanvas: () => HTMLCanvasElement | null;
};

type CubeRef = { key: string; cube: number[] | null; size: number };

type Props = {
  /** Source image URL. Empty string = no image */
  imageUrl: string;
  /** Either pass an already-parsed cube (real .cube import) … */
  cube?: { data: number[]; size: number } | null;
  /** … or a CSS filter chain that we synthesize a cube from on the fly. */
  filterChain?: string;
  /** Memo key for the synthesized cube (LUT id, etc) */
  cubeKey?: string;
  adjust?: Adjust;
  channel?: Channel;
  mask?: HueMask;
  className?: string;
  /** Called with the natural (image) dimensions whenever a new image loads */
  onImageReady?: (w: number, h: number) => void;
  onError?: (err: Error) => void;
};

export const WebGLCanvas = forwardRef<WebGLCanvasHandle, Props>(function WebGLCanvas(
  { imageUrl, cube, filterChain, cubeKey, adjust = DEFAULT_ADJUST, channel = "off", mask = DEFAULT_HUE_MASK, className, onImageReady, onError },
  ref,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<LutRenderer | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const currentCube = useRef<CubeRef>({ key: "", cube: null, size: 17 });

  // Init renderer once
  useEffect(() => {
    if (!canvasRef.current) return;
    try {
      rendererRef.current = new LutRenderer(canvasRef.current);
    } catch (e) {
      onError?.(e instanceof Error ? e : new Error(String(e)));
    }
    return () => {
      rendererRef.current?.dispose();
      rendererRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load image
  useEffect(() => {
    if (!imageUrl || !rendererRef.current) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (!rendererRef.current) return;
      imgRef.current = img;
      rendererRef.current.setImage(img);
      onImageReady?.(img.naturalWidth, img.naturalHeight);
      // Re-apply the current LUT against the new image
      rendererRef.current.setLut(currentCube.current.cube, currentCube.current.size);
      rendererRef.current.render({ adjust, channel, mask });
    };
    img.onerror = () => onError?.(new Error("image load failed"));
    img.src = imageUrl;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  // Resolve cube data (either provided directly or synthesized from CSS filter chain)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!rendererRef.current) return;
      if (cube) {
        currentCube.current = { key: "explicit", cube: cube.data, size: cube.size };
        rendererRef.current.setLut(cube.data, cube.size);
      } else if (filterChain) {
        const key = cubeKey || filterChain;
        const entry = await cubeForFilter(key, filterChain, 17);
        if (cancelled) return;
        currentCube.current = { key, cube: entry.data, size: entry.size };
        rendererRef.current?.setLut(entry.data, entry.size);
      } else {
        currentCube.current = { key: "", cube: null, size: 17 };
        rendererRef.current.setLut(null, 17);
      }
      if (imgRef.current && rendererRef.current) {
        rendererRef.current.render({ adjust, channel, mask });
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cube, filterChain, cubeKey]);

  // Re-render on adjustment changes
  useEffect(() => {
    if (!rendererRef.current || !imgRef.current) return;
    rendererRef.current.render({ adjust, channel, mask });
  }, [adjust, channel, mask]);

  useImperativeHandle(ref, () => ({
    async exportPng(filename: string) {
      if (!rendererRef.current) return;
      rendererRef.current.render({ adjust, channel, mask });
      const blob = await rendererRef.current.toBlob();
      if (!blob) throw new Error("toBlob failed");
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = filename; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    },
    getCanvas() { return canvasRef.current; },
  }), [adjust, channel, mask]);

  return <canvas ref={canvasRef} className={className} style={{ maxWidth: "100%", maxHeight: "100%", display: "block" }} />;
});
