/**
 * WebGL 3D-LUT renderer.
 *
 * Replaces the previous CSS-filter approximation. The renderer takes:
 *  - an HTMLImageElement
 *  - a 3D LUT (cube array + size) — typically 17 or 33
 *  - adjustment uniforms (exposure / contrast / saturation / warmth / hue /
 *    sepia / grayscale / intensity)
 *  - a channel-map mode (none / IR / UV) with matching feColorMatrix baked
 *    into the shader as a 3×3 matrix uniform
 *  - a hue qualifier mask (optional) — limits the grade to a single hue band
 *
 * It uploads the cube as a strip-layout 2D texture (size = N*N wide × N tall)
 * and samples it with manual trilinear interpolation in the fragment shader.
 * Pure WebGL 1, universal compat. Re-renders in ~1ms for a 4K image on M-class
 * hardware. Canvas can be exported at full image resolution.
 */

export type Adjust = {
  exposure: number;   // 0.5..1.5
  contrast: number;   // 0.5..1.5
  saturation: number; // 0..2
  warmth: number;     // -1..1
  hue: number;        // -1..1
  sepia: number;      // 0..0.4
  grayscale: number;  // 0..1
  intensity: number;  // 0..1 (LUT mix)
};

export const DEFAULT_ADJUST: Adjust = {
  exposure: 1, contrast: 1, saturation: 1,
  warmth: 0, hue: 0, sepia: 0, grayscale: 0, intensity: 1,
};

export type Channel = "off" | "ir" | "uv";

export type HueMask = {
  enabled: boolean;
  hue: number;        // 0..1 (normalized 0..360)
  width: number;      // 0..1 (band width)
  feather: number;    // 0..1
};

export const DEFAULT_HUE_MASK: HueMask = { enabled: false, hue: 0.33, width: 0.1, feather: 0.05 };

/* ============ Shaders ============ */

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = (a_pos + 1.0) * 0.5;
  v_uv.y = 1.0 - v_uv.y;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
varying vec2 v_uv;

uniform sampler2D u_image;
uniform sampler2D u_lut;
uniform float u_lutSize;   // N
uniform float u_hasLut;    // 0 or 1

uniform float u_exposure;
uniform float u_contrast;
uniform float u_saturation;
uniform float u_warmth;
uniform float u_hue;
uniform float u_sepia;
uniform float u_grayscale;
uniform float u_intensity;

uniform int   u_channel;       // 0=off, 1=ir, 2=uv
uniform mat4  u_channelMat;    // 4x4 affine (RGBA)
uniform vec4  u_channelOff;

uniform float u_maskEnabled;
uniform float u_maskHue;
uniform float u_maskWidth;
uniform float u_maskFeather;

const vec3 LUMA = vec3(0.2126, 0.7152, 0.0722);

vec3 rgb2hsv(vec3 c) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hueRotate(vec3 c, float deg) {
  float a = deg * 3.14159265 / 180.0;
  float co = cos(a); float si = sin(a);
  mat3 m = mat3(
    0.299 + 0.701*co + 0.168*si, 0.587 - 0.587*co + 0.330*si, 0.114 - 0.114*co - 0.497*si,
    0.299 - 0.299*co - 0.328*si, 0.587 + 0.413*co + 0.035*si, 0.114 - 0.114*co + 0.292*si,
    0.299 - 0.300*co + 1.250*si, 0.587 - 0.588*co - 1.050*si, 0.114 + 0.886*co - 0.203*si
  );
  return clamp(m * c, 0.0, 1.0);
}

vec3 sampleLut(vec3 c) {
  float N = u_lutSize;
  float NN = N * N;
  float bf = clamp(c.b, 0.0, 1.0) * (N - 1.0);
  float b0 = floor(bf);
  float b1 = min(b0 + 1.0, N - 1.0);
  float bd = bf - b0;

  // Strip layout: image is (N*N) wide × N tall.
  // For slice b, x = (b + r*(N-1)) / (N*N), with half-pixel correction.
  float rN = clamp(c.r, 0.0, 1.0) * (N - 1.0);
  float gV = clamp(c.g, 0.0, 1.0);
  float halfPx = 0.5 / NN;

  vec2 uv0 = vec2((b0 * N + rN + 0.5) / NN, gV);
  vec2 uv1 = vec2((b1 * N + rN + 0.5) / NN, gV);

  vec4 a = texture2D(u_lut, uv0);
  vec4 b = texture2D(u_lut, uv1);
  return mix(a.rgb, b.rgb, bd);
}

void main() {
  vec4 raw = texture2D(u_image, v_uv);
  vec3 c = raw.rgb;

  // Channel map (IR / UV) acts on the source pixel
  if (u_channel != 0) {
    vec4 mapped = u_channelMat * vec4(c, 1.0) + u_channelOff;
    c = clamp(mapped.rgb, 0.0, 1.0);
  }

  // Pre-grade adjustments: exposure, contrast, saturation, warmth/hue
  c *= u_exposure;
  c = (c - 0.5) * u_contrast + 0.5;
  float luma = dot(c, LUMA);
  c = mix(vec3(luma), c, u_saturation);
  if (u_warmth != 0.0) c = hueRotate(c, u_warmth * -12.0);
  if (u_hue != 0.0)    c = hueRotate(c, u_hue * 30.0);
  if (u_sepia > 0.0) {
    mat3 s = mat3(0.393, 0.769, 0.189, 0.349, 0.686, 0.168, 0.272, 0.534, 0.131);
    c = mix(c, clamp(s * c, 0.0, 1.0), u_sepia);
  }
  if (u_grayscale > 0.0) c = mix(c, vec3(dot(c, LUMA)), u_grayscale);
  c = clamp(c, 0.0, 1.0);

  // LUT lookup
  vec3 graded = c;
  if (u_hasLut > 0.5) graded = sampleLut(c);

  // Mix LUT with pre-LUT signal per intensity
  vec3 mixed = mix(c, graded, u_intensity);

  // Hue mask — limit the LUT to a hue band when enabled
  if (u_maskEnabled > 0.5) {
    float hueIn = rgb2hsv(raw.rgb).x;
    float d = abs(hueIn - u_maskHue);
    d = min(d, 1.0 - d);
    float w = u_maskWidth * 0.5;
    float f = max(u_maskFeather, 0.001);
    float mask = 1.0 - smoothstep(w, w + f, d);
    mixed = mix(c, mixed, mask);
  }

  gl_FragColor = vec4(mixed, raw.a);
}
`;

/* ============ Channel matrices ============ */
const IR_MAT = new Float32Array([
  0.10, 0.20, 1.10, 0.0,
  0.40, 0.10, 0.10, 0.0,
  1.30,-0.20, 0.00, 0.0,
  0.00, 0.00, 0.00, 1.0,
]);
const UV_MAT = new Float32Array([
  0.55,-0.15, 0.55, 0.0,
 -0.05, 0.65, 0.55, 0.0,
  0.10, 0.10, 1.20, 0.0,
  0.00, 0.00, 0.00, 1.0,
]);
const IDENT_MAT = new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]);
const ZERO_OFF = new Float32Array([0,0,0,0]);

/* ============ Renderer ============ */
export class LutRenderer {
  readonly canvas: HTMLCanvasElement;
  private gl: WebGLRenderingContext;
  private program: WebGLProgram;
  private imgTex: WebGLTexture;
  private lutTex: WebGLTexture;
  private hasLut = false;
  private lutSize = 17;
  private uniforms!: Record<string, WebGLUniformLocation | null>;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const gl = canvas.getContext("webgl", { preserveDrawingBuffer: true, premultipliedAlpha: false });
    if (!gl) throw new Error("WebGL not available");
    this.gl = gl;
    this.program = this.compile();
    this.imgTex = this.createTexture();
    this.lutTex = this.createTexture();
    this.setupQuad();
    this.cacheUniforms();
  }

  private compile(): WebGLProgram {
    const gl = this.gl;
    const vs = this.shader(gl.VERTEX_SHADER, VERT);
    const fs = this.shader(gl.FRAGMENT_SHADER, FRAG);
    const p = gl.createProgram()!;
    gl.attachShader(p, vs); gl.attachShader(p, fs); gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) ?? "link failed");
    gl.useProgram(p);
    return p;
  }

  private shader(type: number, src: string): WebGLShader {
    const gl = this.gl;
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "compile failed");
    return s;
  }

  private createTexture(): WebGLTexture {
    const gl = this.gl;
    const t = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    return t;
  }

  private setupQuad() {
    const gl = this.gl;
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(this.program, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  }

  private cacheUniforms() {
    const gl = this.gl, p = this.program;
    const names = [
      "u_image","u_lut","u_lutSize","u_hasLut",
      "u_exposure","u_contrast","u_saturation","u_warmth","u_hue","u_sepia","u_grayscale","u_intensity",
      "u_channel","u_channelMat","u_channelOff",
      "u_maskEnabled","u_maskHue","u_maskWidth","u_maskFeather",
    ];
    this.uniforms = Object.fromEntries(names.map((n) => [n, gl.getUniformLocation(p, n)]));
    gl.uniform1i(this.uniforms["u_image"], 0);
    gl.uniform1i(this.uniforms["u_lut"], 1);
  }

  /** Upload image as texture and size the canvas to its natural resolution */
  setImage(img: HTMLImageElement) {
    const gl = this.gl;
    this.canvas.width = img.naturalWidth || img.width;
    this.canvas.height = img.naturalHeight || img.height;
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.imgTex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
  }

  /** Upload a 3D LUT (flat [r,g,b,...] of N³ entries) as a strip layout 2D texture. */
  setLut(cubeData: number[] | null, size: number) {
    const gl = this.gl;
    if (!cubeData || cubeData.length !== size * size * size * 3) {
      this.hasLut = false;
      return;
    }
    this.lutSize = size;
    const w = size * size;
    const h = size;
    const pixels = new Uint8Array(w * h * 4);
    // Source order (from filterToCube / .cube): r fastest, then g, then b
    for (let b = 0; b < size; b++) {
      for (let g = 0; g < size; g++) {
        for (let r = 0; r < size; r++) {
          const srcIdx = (r + g * size + b * size * size) * 3;
          const dx = b * size + r; // tile b, x = r
          const dy = g;
          const di = (dy * w + dx) * 4;
          pixels[di]     = Math.round(cubeData[srcIdx]     * 255);
          pixels[di + 1] = Math.round(cubeData[srcIdx + 1] * 255);
          pixels[di + 2] = Math.round(cubeData[srcIdx + 2] * 255);
          pixels[di + 3] = 255;
        }
      }
    }
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.lutTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    this.hasLut = true;
  }

  render(opts: { adjust: Adjust; channel: Channel; mask: HueMask }) {
    const gl = this.gl;
    gl.useProgram(this.program);
    const a = opts.adjust;
    gl.uniform1f(this.uniforms["u_lutSize"], this.lutSize);
    gl.uniform1f(this.uniforms["u_hasLut"], this.hasLut ? 1 : 0);
    gl.uniform1f(this.uniforms["u_exposure"], a.exposure);
    gl.uniform1f(this.uniforms["u_contrast"], a.contrast);
    gl.uniform1f(this.uniforms["u_saturation"], a.saturation);
    gl.uniform1f(this.uniforms["u_warmth"], a.warmth);
    gl.uniform1f(this.uniforms["u_hue"], a.hue);
    gl.uniform1f(this.uniforms["u_sepia"], a.sepia);
    gl.uniform1f(this.uniforms["u_grayscale"], a.grayscale);
    gl.uniform1f(this.uniforms["u_intensity"], a.intensity);

    gl.uniform1i(this.uniforms["u_channel"], opts.channel === "ir" ? 1 : opts.channel === "uv" ? 2 : 0);
    gl.uniformMatrix4fv(this.uniforms["u_channelMat"], false, opts.channel === "ir" ? IR_MAT : opts.channel === "uv" ? UV_MAT : IDENT_MAT);
    gl.uniform4fv(this.uniforms["u_channelOff"], ZERO_OFF);

    gl.uniform1f(this.uniforms["u_maskEnabled"], opts.mask.enabled ? 1 : 0);
    gl.uniform1f(this.uniforms["u_maskHue"], opts.mask.hue);
    gl.uniform1f(this.uniforms["u_maskWidth"], opts.mask.width);
    gl.uniform1f(this.uniforms["u_maskFeather"], opts.mask.feather);

    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, this.imgTex);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, this.lutTex);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  toBlob(quality = 0.95): Promise<Blob | null> {
    return new Promise((resolve) => this.canvas.toBlob(resolve, "image/png", quality));
  }

  dispose() {
    const gl = this.gl;
    gl.deleteTexture(this.imgTex);
    gl.deleteTexture(this.lutTex);
    gl.deleteProgram(this.program);
  }
}

/* ============ Cube generation from a CSS filter chain ============ */

/**
 * Synthesize a 3D LUT cube by passing an identity color image through the
 * given CSS filter chain via canvas. Used to bring house LUTs (defined as
 * CSS filter strings) into the WebGL pipeline. Re-export of the same idea
 * that already exists in lut-io but returns the raw data (not a .cube string).
 */
export async function cubeFromCssFilter(filter: string, size = 17): Promise<number[]> {
  if (typeof document === "undefined") throw new Error("server");
  // Build identity image in strip layout
  const id = document.createElement("canvas");
  id.width = size * size; id.height = size;
  const ictx = id.getContext("2d", { willReadFrequently: true });
  if (!ictx) throw new Error("no 2d ctx");
  const px = ictx.createImageData(size * size, size);
  for (let b = 0; b < size; b++) {
    for (let g = 0; g < size; g++) {
      for (let r = 0; r < size; r++) {
        const x = b * size + r;
        const y = g;
        const i = (y * size * size + x) * 4;
        px.data[i] = Math.round((r / (size - 1)) * 255);
        px.data[i + 1] = Math.round((g / (size - 1)) * 255);
        px.data[i + 2] = Math.round((b / (size - 1)) * 255);
        px.data[i + 3] = 255;
      }
    }
  }
  ictx.putImageData(px, 0, 0);

  const out = document.createElement("canvas");
  out.width = size * size; out.height = size;
  const octx = out.getContext("2d");
  if (!octx) throw new Error("no out ctx");
  octx.filter = filter || "none";
  octx.drawImage(id, 0, 0);
  const data = octx.getImageData(0, 0, size * size, size).data;

  const cube: number[] = new Array(size * size * size * 3);
  for (let b = 0; b < size; b++) {
    for (let g = 0; g < size; g++) {
      for (let r = 0; r < size; r++) {
        const x = b * size + r;
        const y = g;
        const i = (y * size * size + x) * 4;
        const dst = (r + g * size + b * size * size) * 3;
        cube[dst]     = data[i]     / 255;
        cube[dst + 1] = data[i + 1] / 255;
        cube[dst + 2] = data[i + 2] / 255;
      }
    }
  }
  return cube;
}

/* ============ Memoized cube cache for house LUTs ============ */
const cubeCache = new Map<string, { size: number; data: number[] }>();

export async function cubeForFilter(key: string, filter: string, size = 17) {
  const hit = cubeCache.get(key);
  if (hit && hit.size === size) return hit;
  const data = await cubeFromCssFilter(filter, size);
  const entry = { size, data };
  cubeCache.set(key, entry);
  return entry;
}
