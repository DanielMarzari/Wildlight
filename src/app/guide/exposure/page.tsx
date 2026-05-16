import { GuideNav, GuideFooter, ChapterMasthead, Body, Section, Sub, Callout, PullQuote, WhenToUse, Spec, PrevNext, G_DISPLAY, G_MONO } from "@/components/guide-chrome";

export const metadata = { title: "Exposure · Wildlight Guide" };

export default function Exposure() {
  return (
    <main className="bg-[#0a0807] text-[#e8dfd1] min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      <GuideNav />
      <ChapterMasthead n="01" title="The Exposure Triangle" sub="Three controls. One amount of light. Why every photograph is a choice between freezing motion, framing depth, and accepting noise." kicker="THE FOUNDATION" />

      <Body>
        <Section n="1.1" title="The whole thing in one sentence">
          <p>
            A camera is a box that lets in <em className="text-orange-200/95 italic">a specific amount of light</em> for <em className="text-orange-200/95 italic">a specific length of time</em>, and the sensor decides <em className="text-orange-200/95 italic">how sensitive to that light it will be</em>. Those three decisions — together — make the exposure.
          </p>
          <p>
            Anything you change in one of the three has to be compensated for in another, or the picture gets brighter or darker. That trade is the entire game.
          </p>
          <ExposureTriangleDiagram />
        </Section>

        <Section n="1.2" title="Aperture — the hole in the lens">
          <p>
            The aperture is a ring of overlapping blades inside the lens. Open it wide, and a lot of light pours through. Close it down to a pinhole, and only a sliver gets in. We measure it in <span className="font-mono text-orange-200/90">ƒ-stops</span>: ƒ1.4, ƒ2, ƒ2.8, ƒ4, ƒ5.6, ƒ8, ƒ11, ƒ16, ƒ22.
          </p>
          <Callout label="THE PARADOX">
            <strong>Smaller number, bigger hole.</strong> ƒ1.4 is wide open. ƒ22 is a pinhole. The number is a ratio — focal length divided by the diameter of the opening — so small numerator means small ratio means big opening.
          </Callout>
          <p>
            Every full stop on the list above lets in <em className="italic">half</em> the light of the previous one. So ƒ4 is half as bright as ƒ2.8, ƒ5.6 is half again, and so on.
          </p>
          <ApertureDiagram />
          <Sub>What aperture controls besides brightness</Sub>
          <p>
            Aperture also decides <strong className="text-orange-200/95">depth of field</strong> — how much of the scene is in sharp focus, front to back. A wide aperture (ƒ1.4, ƒ2) gives a thin, dreamy slice of sharpness with the rest melting away. A narrow aperture (ƒ11, ƒ16) keeps everything from the foreground rocks to the distant ridge tack-sharp.
          </p>
          <p>
            This is the most expressive thing about aperture. Brightness is solvable in two other ways. <em className="italic">The look of the focus is solvable only here.</em>
          </p>
          <WhenToUse items={[
            { when: "Wide (ƒ1.4–ƒ2.8)", why: "Portraits where the face floats off the background, low light without a tripod, anything where you want one thing to matter and everything else to be a wash of color." },
            { when: "Medium (ƒ4–ƒ5.6)", why: "Group portraits where everyone needs to be sharp, environmental portraits, street photography where you need a little depth but still want subject separation." },
            { when: "Narrow (ƒ8–ƒ11)", why: "Landscape, architecture, anything where you want sharpness from near to far. Most lenses are also at their sharpest two stops down from wide open — for many lenses, that's around ƒ8." },
            { when: "Pinhole (ƒ16–ƒ22)", why: "Bright daylight when you want a slower shutter (silky water, motion blur). Beware diffraction — at very small apertures, sharpness actually decreases." },
          ]} />
        </Section>

        <Section n="1.3" title="Shutter speed — the length of the moment">
          <p>
            The shutter is a pair of curtains that opens and closes in front of the sensor. The shutter speed is just how long the curtain stays open. Measured in seconds and fractions of a second: 1/8000, 1/4000, 1/2000, 1/1000, 1/500, 1/250, 1/125, 1/60, 1/30, 1/15, 1/8, 1/4, 1/2, 1s, 2s, 4s, 8s, 15s, 30s.
          </p>
          <Callout label="ALSO STOPS">
            Each step on that list lets in half (or twice) the light of the next. 1/125 is half as bright as 1/60. 1/8000 is half of 1/4000.
          </Callout>
          <Sub>What shutter speed controls besides brightness</Sub>
          <p>
            Shutter speed decides what happens to <strong className="text-orange-200/95">motion</strong>. A fast shutter (1/1000, 1/2000) freezes a hummingbird's wing mid-stroke. A slow shutter (1/15, 1s, 30s) blurs water into silk, turns headlights into rivers of color, smears a crowd into ghosts.
          </p>
          <ShutterDiagram />
          <p>
            There's also a practical floor: how slow can you go and still keep the image sharp? Two limits.
          </p>
          <Sub>The hand-holding rule</Sub>
          <Callout label="RULE OF THUMB">
            Without image stabilization, your slowest hand-holdable shutter speed is roughly <span className="font-mono text-orange-200/90">1 / focal-length</span>. With a 50mm lens, ~1/60s. With a 200mm lens, ~1/200s. Modern stabilization buys you 3–6 stops, so a stabilized 50mm lens is fine at 1/8s for a steady photographer.
          </Callout>
          <Sub>Subject motion is a different limit</Sub>
          <p>
            A still life will tolerate a 30-second exposure if the camera is on a tripod. A person breathing will not. A child running will not. Match the shutter to the slowest thing you need to be sharp.
          </p>
          <WhenToUse items={[
            { when: "1/2000s+", why: "Sports, birds in flight, drops splashing. Anything where a wing or a foot would otherwise smear." },
            { when: "1/500–1/250s", why: "Active people, candid street, kids. Safe default for most daylight." },
            { when: "1/125–1/60s", why: "Still subjects, posed portraits, indoor existing light." },
            { when: "1/30s–1s", why: "Tripod-required. Architecture, twilight, intentional motion blur (sweeping crowds, light trails, silk waterfalls)." },
          ]} />
        </Section>

        <Section n="1.4" title="ISO — how loudly the sensor listens">
          <p>
            ISO controls the sensor's sensitivity to light, but a better mental model is to think of it as <em className="text-orange-200/95 italic">how much the signal is being amplified</em>. ISO 100 is the sensor's natural voice. ISO 6400 is the volume knob turned up six clicks — louder, but with hiss.
          </p>
          <p>
            Common values, each one doubling the previous: ISO 50, 100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600.
          </p>
          <IsoNoiseDiagram />
          <Sub>The price of high ISO is noise</Sub>
          <p>
            "Noise" is the grainy, speckled texture you see when you push ISO high — green and magenta pixels in the shadows, a softening of fine detail. Modern full-frame cameras are remarkable at high ISO (ISO 6400 was unusable in 2008 and looks gorgeous in 2025), but the trade is real.
          </p>
          <Callout label="MODERN PRACTICAL FLOORS">
            <span className="font-mono text-orange-200/90">Phone (iPhone 15+)</span> · clean to ~ISO 800, usable to ISO 2500<br/>
            <span className="font-mono text-orange-200/90">APS-C mirrorless</span> · clean to ~ISO 3200, usable to ISO 12800<br/>
            <span className="font-mono text-orange-200/90">Full-frame (modern)</span> · clean to ~ISO 6400, usable to ISO 51200
          </Callout>
          <Sub>Why don't we always use ISO 100?</Sub>
          <p>
            Because the other two corners of the triangle have limits. If you're indoors at twilight, you can't open the aperture infinitely (ƒ1.4 is usually the widest you own) and you can't slow the shutter infinitely (1/60s is roughly where hand-holding breaks). So you raise ISO. The noise is the cost of getting the photograph at all.
          </p>
          <PullQuote by="An old saying among working photographers">
            A noisy photograph of the moment beats a clean photograph of nothing.
          </PullQuote>
        </Section>

        <Section n="1.5" title="Stops — the universal currency">
          <p>
            All three controls move in <strong className="text-orange-200/95">stops</strong>. One stop = a doubling or halving of light. Every full ƒ-stop, every shutter step on the list above, every ISO doubling — all of them are exactly one stop.
          </p>
          <p>
            This means you can <em className="italic">trade them against each other</em>. If you open the aperture by one stop, you can speed up the shutter by one stop, or lower ISO by one stop, and the brightness is unchanged. The picture changes — you traded depth of field for motion freezing — but the exposure stays put.
          </p>
          <Callout label="EQUIVALENT EXPOSURES — SAME BRIGHTNESS, DIFFERENT LOOK">
            <span className="font-mono text-orange-200/90">ƒ8 · 1/125 · ISO 200</span> &nbsp; — &nbsp; baseline (everything sharp, frozen, clean)<br/>
            <span className="font-mono text-orange-200/90">ƒ2.8 · 1/1000 · ISO 200</span> &nbsp; — &nbsp; same brightness, thin DoF, frozen action<br/>
            <span className="font-mono text-orange-200/90">ƒ16 · 1/30 · ISO 200</span> &nbsp; — &nbsp; same brightness, deep DoF, motion blur<br/>
            <span className="font-mono text-orange-200/90">ƒ8 · 1/15 · ISO 25</span> &nbsp; — &nbsp; same brightness, lowest noise, silk water
          </Callout>
        </Section>

        <Section n="1.6" title="Where to start — a decision order">
          <p>
            With three knobs to turn, beginners freeze. The trick is to pick which one matters most for the picture you want, set it first, and let the other two follow.
          </p>
          <Sub>The order that almost always works</Sub>
          <ol className="space-y-4 list-none counter-reset-[step]" style={{ fontFamily: G_DISPLAY, fontSize: "1.1rem" }}>
            <li className="grid grid-cols-[auto_1fr] gap-5">
              <span className="text-[10px] tracking-[0.4em] uppercase text-orange-200/70 pt-2" style={{ fontFamily: G_MONO }}>01</span>
              <div>
                <strong className="text-orange-200/95">Decide the look.</strong> Is the picture about <em className="italic">where the focus sits</em> (a portrait, a flower) or about <em className="italic">how motion looks</em> (a runner, a waterfall)? That decides whether aperture or shutter is your primary control.
              </div>
            </li>
            <li className="grid grid-cols-[auto_1fr] gap-5">
              <span className="text-[10px] tracking-[0.4em] uppercase text-orange-200/70 pt-2" style={{ fontFamily: G_MONO }}>02</span>
              <div>
                <strong className="text-orange-200/95">Set the primary first.</strong> Aperture to ƒ1.8 for the portrait. Shutter to 1s for the silky water.
              </div>
            </li>
            <li className="grid grid-cols-[auto_1fr] gap-5">
              <span className="text-[10px] tracking-[0.4em] uppercase text-orange-200/70 pt-2" style={{ fontFamily: G_MONO }}>03</span>
              <div>
                <strong className="text-orange-200/95">Set the secondary to something safe.</strong> If you chose aperture, pick a shutter fast enough to avoid blur (use the hand-holding rule). If you chose shutter, pick an aperture that gets the right depth.
              </div>
            </li>
            <li className="grid grid-cols-[auto_1fr] gap-5">
              <span className="text-[10px] tracking-[0.4em] uppercase text-orange-200/70 pt-2" style={{ fontFamily: G_MONO }}>04</span>
              <div>
                <strong className="text-orange-200/95">Let ISO float</strong> until the meter reads zero. Auto-ISO with a maximum cap is honest and fast.
              </div>
            </li>
          </ol>
          <Callout label="THE TWO PROFESSIONAL MODES">
            <strong>Aperture priority (A / Av):</strong> you set ƒ-stop and ISO, the camera picks the shutter. Best for most daylight, portraits, landscape.<br/><br/>
            <strong>Shutter priority (S / Tv):</strong> you set shutter and ISO, the camera picks the ƒ-stop. Best for sports, motion, when freezing or blurring is the point.<br/><br/>
            Full Manual (M) is for when light is constant (studio) or when you need to lock all three across many frames (a panorama or a time-lapse).
          </Callout>
        </Section>

        <Section n="1.7" title="A worked example">
          <p>
            You're at golden hour on a hilltop. A friend is sitting on the grass, the sun is behind their shoulder, hair lit up. You want their face soft and warm, the grass falling out of focus, the distant trees a wash of amber.
          </p>
          <Spec pairs={[
            ["GOAL", "Portrait, thin focus, soft golden glow"],
            ["LENS", "85mm or 50mm"],
            ["APERTURE", "ƒ1.8 — face sharp, everything else dissolves"],
            ["SHUTTER", "1/250 — they're sitting but breathing, gentle wind"],
            ["ISO", "200 — golden hour is bright enough, no need to push"],
            ["WB", "5000K — preserve the warmth"],
            ["NOTES", "Meter on the face. Use exposure compensation +⅓ to lift skin."],
          ]} />
          <p>
            Twenty minutes later, the sun drops behind the ridge. The same picture now needs different numbers — ƒ1.8 stays, but you go to 1/125 and ISO 800. Same friend, same grass, very different light. The technique adapts.
          </p>
        </Section>

        <Section n="1.8" title="What to practice next">
          <p>
            Take your camera outside tomorrow. Pick one subject — a tree, a window, a coffee cup. Photograph it five times:
          </p>
          <ul className="space-y-2 mt-4" style={{ fontFamily: G_DISPLAY, fontSize: "1.1rem" }}>
            <li>· Once at <span className="font-mono text-orange-200/90">ƒ1.8</span> if you have it, the widest you own otherwise.</li>
            <li>· Once at <span className="font-mono text-orange-200/90">ƒ8</span>.</li>
            <li>· Once at <span className="font-mono text-orange-200/90">ƒ16</span>.</li>
            <li>· Once with a fast shutter (<span className="font-mono text-orange-200/90">1/1000</span>).</li>
            <li>· Once with a slow shutter (<span className="font-mono text-orange-200/90">1/15</span>, braced).</li>
          </ul>
          <p>
            Compare them on a screen. You'll learn more about the exposure triangle in twenty minutes than from re-reading this chapter five times. Then come back and read it again.
          </p>
        </Section>
      </Body>

      <PrevNext next={{ slug: "composition", n: "02", title: "Composition" }} />
      <GuideFooter />
    </main>
  );
}

/* ============== Diagrams ============== */

function ExposureTriangleDiagram() {
  return (
    <figure className="my-12">
      <svg viewBox="0 0 360 320" className="w-full max-w-md mx-auto">
        <defs>
          <linearGradient id="tri-gradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#ff8b3d" stopOpacity="0.15" />
            <stop offset="1" stopColor="#7f63d1" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <polygon points="180,30 30,290 330,290" fill="url(#tri-gradient)" stroke="#f5d28a" strokeWidth="1.2" opacity="0.9" />
        {/* corner labels */}
        <g style={{ fontFamily: G_MONO, fontSize: "10px" }} fill="#f5d28a">
          <text x="180" y="20" textAnchor="middle" letterSpacing="3">ISO</text>
          <text x="20" y="305" textAnchor="middle" letterSpacing="3">APERTURE</text>
          <text x="340" y="305" textAnchor="middle" letterSpacing="3">SHUTTER</text>
        </g>
        {/* axis effects */}
        <g style={{ fontFamily: G_DISPLAY, fontStyle: "italic", fontSize: "13px" }} fill="rgba(232,223,209,0.7)">
          <text x="80" y="160" textAnchor="middle">depth</text>
          <text x="280" y="160" textAnchor="middle">motion</text>
          <text x="180" y="200" textAnchor="middle">noise</text>
        </g>
      </svg>
      <figcaption className="text-center text-[10px] tracking-[0.4em] uppercase text-stone-500 mt-4" style={{ fontFamily: G_MONO }}>
        THE TRIANGLE · THREE CONTROLS, ONE EXPOSURE
      </figcaption>
    </figure>
  );
}

function ApertureDiagram() {
  const stops = [
    { f: "ƒ1.4", o: 90 },
    { f: "ƒ2",   o: 75 },
    { f: "ƒ2.8", o: 60 },
    { f: "ƒ4",   o: 45 },
    { f: "ƒ5.6", o: 33 },
    { f: "ƒ8",   o: 23 },
    { f: "ƒ11",  o: 16 },
    { f: "ƒ16",  o: 11 },
  ];
  return (
    <figure className="my-10">
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
        {stops.map((s) => (
          <div key={s.f} className="flex flex-col items-center gap-2">
            <svg viewBox="0 0 60 60" className="w-12 h-12">
              <circle cx="30" cy="30" r="28" fill="none" stroke="#3a3a48" strokeWidth="1" />
              <circle cx="30" cy="30" r={s.o / 2} fill="#f5d28a" opacity="0.85" />
            </svg>
            <span className="text-[10px] tracking-[0.2em]" style={{ fontFamily: G_MONO, color: "#f5d28a" }}>{s.f}</span>
          </div>
        ))}
      </div>
      <figcaption className="text-center text-[10px] tracking-[0.4em] uppercase text-stone-500 mt-5" style={{ fontFamily: G_MONO }}>
        APERTURE · SMALLER NUMBER, BIGGER HOLE
      </figcaption>
    </figure>
  );
}

function ShutterDiagram() {
  return (
    <figure className="my-10">
      <svg viewBox="0 0 600 120" className="w-full">
        <g style={{ fontFamily: G_MONO, fontSize: "10px" }} fill="rgba(245,210,138,0.9)">
          {/* timeline */}
          <line x1="20" y1="60" x2="580" y2="60" stroke="#3a3a48" strokeWidth="1" />
          {[
            { x: 40,  label: "1/4000",  bar: 1 },
            { x: 110, label: "1/1000",  bar: 2 },
            { x: 200, label: "1/250",   bar: 4 },
            { x: 290, label: "1/60",    bar: 7 },
            { x: 380, label: "1/15",    bar: 14 },
            { x: 470, label: "1/4",     bar: 28 },
            { x: 560, label: "1s",      bar: 60 },
          ].map((t) => (
            <g key={t.label}>
              <rect x={t.x - t.bar / 2} y={50} width={t.bar} height={20} fill="#f5d28a" opacity="0.85" />
              <text x={t.x} y={90} textAnchor="middle" letterSpacing="1.5">{t.label}</text>
            </g>
          ))}
          <text x="40" y="30" textAnchor="middle" letterSpacing="2">FAST · FREEZE</text>
          <text x="560" y="30" textAnchor="middle" letterSpacing="2">SLOW · BLUR</text>
        </g>
      </svg>
      <figcaption className="text-center text-[10px] tracking-[0.4em] uppercase text-stone-500 mt-4" style={{ fontFamily: G_MONO }}>
        SHUTTER · DURATION OF THE MOMENT
      </figcaption>
    </figure>
  );
}

function IsoNoiseDiagram() {
  const stops = [
    { iso: "ISO 100",   noise: 0 },
    { iso: "ISO 400",   noise: 1 },
    { iso: "ISO 1600",  noise: 2.5 },
    { iso: "ISO 6400",  noise: 5 },
    { iso: "ISO 25600", noise: 9 },
  ];
  return (
    <figure className="my-10">
      <div className="grid grid-cols-5 gap-3">
        {stops.map((s, i) => (
          <div key={s.iso} className="flex flex-col items-center gap-2">
            <div className="w-full aspect-[3/2] relative overflow-hidden rounded-sm" style={{ background: "#1d1611" }}>
              {/* Subtle gradient to mimic a photographic patch */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #2c2620 0%, #15110d 100%)" }} />
              {/* Noise */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <filter id={`noise-${i}`}>
                  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
                  <feColorMatrix values={`0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${s.noise / 10} 0`} />
                </filter>
                <rect width="100%" height="100%" filter={`url(#noise-${i})`} />
              </svg>
            </div>
            <span className="text-[10px] tracking-[0.2em] text-center" style={{ fontFamily: G_MONO, color: "#f5d28a" }}>{s.iso}</span>
          </div>
        ))}
      </div>
      <figcaption className="text-center text-[10px] tracking-[0.4em] uppercase text-stone-500 mt-4" style={{ fontFamily: G_MONO }}>
        ISO · LOUDER SENSOR, MORE HISS
      </figcaption>
    </figure>
  );
}
