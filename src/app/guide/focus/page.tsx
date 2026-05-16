import { GuideNav, GuideFooter, ChapterMasthead, Body, Section, Sub, Callout, PullQuote, WhenToUse, PrevNext, G_DISPLAY, G_MONO } from "@/components/guide-chrome";

export const metadata = { title: "Focus · Wildlight Guide" };

export default function Focus() {
  return (
    <main className="bg-[#0a0807] text-[#e8dfd1] min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      <GuideNav />
      <ChapterMasthead n="05" title="Focus & Depth of Field" sub="Where the plane of sharpness sits, and how thick it is. Depth of field, hyperfocal distance, focus modes, and the math of bokeh." kicker="THE PLANE" />

      <Body>
        <Section n="5.1" title="Focus is a plane, not a point">
          <p>
            Lenses don't focus at a "point" — they focus at a <em className="text-orange-200/95 italic">plane</em>. A flat, two-dimensional slice of the world, parallel to the sensor, at one specific distance from the camera. Everything on that plane is sharp. Everything off it is, technically, blurred.
          </p>
          <p>
            "Technically." In practice, things <em className="italic">near</em> the plane are blurred so slightly that we still perceive them as sharp. The zone — both in front of the focal plane and behind it — where things look acceptably sharp is called the <strong className="text-orange-200/95">depth of field</strong>.
          </p>
          <DofDiagram />
        </Section>

        <Section n="5.2" title="What controls depth of field">
          <p>
            Three things, in roughly this order of importance:
          </p>
          <Callout label="DEPTH-OF-FIELD CONTROLS">
            <strong>01 · Aperture.</strong> Wider ƒ-stop (smaller number) → thinner DoF. ƒ1.4 is paper-thin. ƒ16 is deep enough to fit a house in.<br/><br/>
            <strong>02 · Focus distance.</strong> Closer subject → thinner DoF. Macro-close subjects have ridiculous, eyelash-thin DoF even at ƒ8. Subjects at infinity have effectively-infinite DoF at any aperture.<br/><br/>
            <strong>03 · Focal length.</strong> Longer lens → thinner-feeling DoF (with the same aperture and same subject framing). This is partly real and partly because long lenses are usually used at greater distance — the math is subtle.
          </Callout>
          <Sub>The fourth, often forgotten</Sub>
          <p>
            <strong className="text-orange-200/95">Sensor size.</strong> Bigger sensors (full-frame, medium format) produce thinner DoF at the same equivalent framing. This is one of the reasons full-frame photographs have that "look" — smaller sensors physically can't reach the same shallow depth.
          </p>
          <p>
            This is also why phone cameras need software-simulated bokeh ("Portrait Mode") to fake what a real ƒ1.4 lens does naturally — the sensor is too small to produce serious DoF on its own.
          </p>
        </Section>

        <Section n="5.3" title="Bokeh — the shape of out-of-focus">
          <p>
            <strong className="text-orange-200/95">Bokeh</strong> (from the Japanese boke, "blur") is the quality and character of the out-of-focus areas. Not the amount of blur — that's just DoF. The <em className="italic">look</em> of the blur.
          </p>
          <Sub>The shape of point lights</Sub>
          <p>
            When out-of-focus point lights (candles, fairy lights, sun reflecting off water) blur, they take on the shape of the aperture opening. With many aperture blades that round off near-wide-open, they're circular. With fewer blades or stopped-down apertures, they become polygonal (heptagonal, octagonal).
          </p>
          <BokehDiagram />
          <Sub>Why some lenses are famous for bokeh</Sub>
          <p>
            Two things make a lens's bokeh "good": <em className="italic">smoothness</em> of the blur (creamy, no harsh edges) and <em className="italic">roundness</em> of point lights (especially toward the edges of the frame, where some lenses produce ugly "lemon-shaped" bokeh from optical vignetting).
          </p>
          <p>
            Lenses with reputations for exceptional bokeh — the Canon 85mm ƒ1.2, the Nikon 105mm ƒ1.4, the Voigtländer Nokton 35mm — are bought specifically for the quality of their blur. The sharp areas of any modern lens are basically perfect; what separates them is what they do <em className="italic">around</em> the sharp areas.
          </p>
        </Section>

        <Section n="5.4" title="Hyperfocal distance — the landscape photographer's trick">
          <p>
            At any given aperture and focal length, there is a specific distance — the <strong className="text-orange-200/95">hyperfocal distance</strong> — where if you focus there, everything from <em className="italic">half that distance</em> to <em className="italic">infinity</em> is acceptably sharp.
          </p>
          <p>
            This is the landscape photographer's quiet weapon. Set the aperture to ƒ8, look up the hyperfocal distance for your lens (or use an app), focus there, and shoot. The whole picture — foreground rocks, midground tree, distant mountains — is sharp from end to end without bracketing or focus stacking.
          </p>
          <Callout label="ROUGH HYPERFOCAL NUMBERS · FULL-FRAME, ƒ8">
            <span className="font-mono text-orange-200/90">24mm</span> · ~7 feet · everything from 3.5ft to infinity sharp<br/>
            <span className="font-mono text-orange-200/90">35mm</span> · ~16 feet · everything from 8ft to infinity sharp<br/>
            <span className="font-mono text-orange-200/90">50mm</span> · ~33 feet · everything from 16ft to infinity sharp<br/>
            <span className="font-mono text-orange-200/90">85mm</span> · ~95 feet · everything from 47ft to infinity sharp
          </Callout>
          <Sub>The shortcut</Sub>
          <p>
            Don't memorize the numbers. The shortcut: <em className="italic">at ƒ8 with a wide-ish lens, focus about a third of the way into the scene</em>. For most landscape situations, this gets you within hyperfocal range without doing math at the trailhead.
          </p>
        </Section>

        <Section n="5.5" title="Focus modes — let the camera do its share">
          <Sub>Single-shot autofocus (AF-S / One Shot)</Sub>
          <p>
            Press the shutter halfway. Camera focuses. Focus locks. Press fully to take the picture. Best for still subjects: portraits, landscape, architecture, still life.
          </p>
          <Sub>Continuous autofocus (AF-C / AI Servo)</Sub>
          <p>
            Camera tracks a moving subject, refocusing constantly while the shutter is half-pressed. Best for: sports, wildlife, candid people, anything that's moving. Pair with continuous burst mode for fast action.
          </p>
          <Sub>Manual focus</Sub>
          <p>
            Set focus distance by hand using the lens ring. Slower, more deliberate. Useful when AF is fooled (low contrast, low light, busy backgrounds, glass between you and the subject) or when you need <em className="italic">exact</em> focus (macro, focus stacking, video).
          </p>
          <Callout label="MODERN AF · FACE AND EYE DETECTION">
            Mirrorless cameras since ~2020 can detect human (and often animal) eyes in real time and pin focus there even as the subject moves. This is the single biggest practical advance in autofocus in decades. Turn it on for portraits, leave it on for street, marvel.
          </Callout>
        </Section>

        <Section n="5.6" title="Focus points — where to put the dot">
          <p>
            Your camera shows you focus points — usually a grid of dots across the viewfinder. You can pick which one the camera uses to find focus.
          </p>
          <Sub>Single-point AF · the workhorse</Sub>
          <p>
            One specific point. Move it (with a joystick or arrow keys) to exactly where you want focus. Default mode for thoughtful, controlled photography. Slow but precise.
          </p>
          <Sub>Zone AF / area modes</Sub>
          <p>
            Camera uses a cluster of points and picks within them. Faster, less precise. Good for tracking moving subjects when you can keep them in roughly the same part of the frame.
          </p>
          <Sub>Wide / Auto AF</Sub>
          <p>
            Camera picks any point it likes. Almost always wrong; almost always picks the highest-contrast thing in the frame (often the background, not the subject). Use only when you have no idea where the subject will be and you trust face detection to save you.
          </p>
          <Sub>The classic technique: focus and recompose</Sub>
          <p>
            With single-point AF, put the focus point on the subject, half-press to lock, then recompose the frame (move the camera) to put the subject where you want it in the composition. Fast, reliable. <em className="italic">Caveat:</em> with very thin DoF (ƒ1.4 close-up) this technique can introduce focus error from the small lateral movement. For critical thin-DoF work, move the focus point instead.
          </p>
        </Section>

        <Section n="5.7" title="When DoF matters, when it doesn't">
          <WhenToUse items={[
            { when: "Portrait — separate subject", why: "ƒ1.4–ƒ2.8 with an 85mm or 50mm. Eyes razor-sharp; background a wash of color. The face floats." },
            { when: "Group portrait", why: "ƒ4–ƒ5.6. Thin DoF won't keep everyone in focus. Get the whole group on roughly one plane (same distance from camera) for safety." },
            { when: "Landscape — everything sharp", why: "ƒ8–ƒ11, focus a third in (or at the hyperfocal distance). Front to back sharpness." },
            { when: "Macro / close-up", why: "DoF becomes paper-thin. Stop down (ƒ8–ƒ16) and accept that even then, only a sliver of the subject will be sharp. Focus stacking for extreme close-ups." },
            { when: "Street", why: "ƒ5.6–ƒ8, prefocus at ~8 feet, single-point AF or even manual focus. Pre-set the focus zone so you can shoot fast without waiting for AF to confirm." },
            { when: "Astrophotography", why: "Wide open (ƒ1.4–ƒ2.8), focused at infinity. Confirm infinity by zooming in on a bright star in live view and adjusting until it's a pinprick, not a smear." },
          ]} />
        </Section>

        <Section n="5.8" title="When focus is the photograph">
          <p>
            Sometimes <em className="italic">where</em> the focus sits is the entire point. A portrait where one eye is sharp and the other already softens. A still life where the front of the apple is crisp and the back fuzzes into impressionism. A street scene where a face emerges from a sea of blurred bodies.
          </p>
          <p>
            These photographs are difficult to make accidentally and difficult to make consistently. They reward you for putting the focus point where it matters and stopping down only as much as the picture needs. The temptation to play it safe and pick ƒ4 — "in case" — kills more would-be ƒ1.4 photographs than missed focus does.
          </p>
          <PullQuote>
            Sharpness is a bourgeois concept. — Henri Cartier-Bresson
          </PullQuote>
        </Section>

        <Section n="5.9" title="Two exercises">
          <Sub>Same subject, every aperture</Sub>
          <p>
            Pick a subject with foreground and background depth — flowers in front of a fence, a coffee cup on a table near a window. Shoot it at ƒ1.8, ƒ2.8, ƒ4, ƒ5.6, ƒ8, ƒ11, ƒ16 — keeping focus on the same point each time. Look at the seven photographs side by side. You'll understand DoF intuitively in twenty minutes.
          </p>
          <Sub>The "where did you focus?" game</Sub>
          <p>
            Look at photographs you love (from a magazine, a photographer's website, a book). For each one, ask: "where did they focus, and how thin is the DoF?" Then ask: "would the picture work if they'd focused somewhere else, or at a different aperture?" This trains your eye to read focus decisions as part of the picture.
          </p>
        </Section>

        <Section n="5.10" title="Closing — the whole guide in one paragraph">
          <p>
            A photograph is a choice about how much light to let in (exposure), what to leave out of the frame (composition), what kind of light is falling on the subject (light), how wide a slice of the world to see (lens), and where the plane of sharpness sits inside that slice (focus). Five decisions. Every photograph you'll ever take involves all five, whether you make them consciously or not. The difference between a snapshot and a photograph is how many of the five you noticed.
          </p>
          <p>
            Now go take pictures.
          </p>
        </Section>
      </Body>

      <PrevNext prev={{ slug: "lenses", n: "04", title: "Lenses & Focal Length" }} />
      <GuideFooter />
    </main>
  );
}

/* ============== Diagrams ============== */

function DofDiagram() {
  return (
    <figure className="my-10">
      <svg viewBox="0 0 480 200" className="w-full max-w-2xl mx-auto bg-[#1a1410] rounded-sm">
        {/* depth axis */}
        <line x1="40" y1="160" x2="450" y2="160" stroke="#3a2c1f" strokeWidth="1" />
        {/* camera */}
        <rect x="20" y="140" width="30" height="40" rx="3" fill="#f5d28a" />
        <text x="35" y="125" textAnchor="middle" style={{ fontFamily: G_MONO, fontSize: "9px" }} fill="rgba(245,210,138,0.9)" letterSpacing="2">CAMERA</text>

        {/* DoF zone */}
        <rect x="200" y="60" width="120" height="100" fill="#f5d28a" opacity="0.15" />
        {/* focus plane line */}
        <line x1="260" y1="40" x2="260" y2="180" stroke="#ff8b3d" strokeWidth="2" />
        <text x="260" y="32" textAnchor="middle" style={{ fontFamily: G_MONO, fontSize: "9px" }} fill="#ff8b3d" letterSpacing="2">FOCUS PLANE</text>

        {/* DoF boundary lines */}
        <line x1="200" y1="50" x2="200" y2="170" stroke="#f5d28a" strokeWidth="1" strokeDasharray="2 3" />
        <line x1="320" y1="50" x2="320" y2="170" stroke="#f5d28a" strokeWidth="1" strokeDasharray="2 3" />

        {/* labels */}
        <text x="260" y="195" textAnchor="middle" style={{ fontFamily: G_MONO, fontSize: "9px" }} fill="rgba(245,210,138,0.9)" letterSpacing="2">DEPTH OF FIELD</text>
        <text x="155" y="105" textAnchor="middle" style={{ fontFamily: G_DISPLAY, fontStyle: "italic", fontSize: "11px" }} fill="rgba(232,223,209,0.5)">blurred</text>
        <text x="385" y="105" textAnchor="middle" style={{ fontFamily: G_DISPLAY, fontStyle: "italic", fontSize: "11px" }} fill="rgba(232,223,209,0.5)">blurred</text>
        <text x="260" y="110" textAnchor="middle" style={{ fontFamily: G_DISPLAY, fontStyle: "italic", fontSize: "13px" }} fill="rgba(232,223,209,0.9)">sharp</text>
      </svg>
      <figcaption className="text-center text-[10px] tracking-[0.4em] uppercase text-stone-500 mt-4" style={{ fontFamily: G_MONO }}>
        FOCUS PLANE · WITH A ZONE OF ACCEPTABLE SHARPNESS AROUND IT
      </figcaption>
    </figure>
  );
}

function BokehDiagram() {
  const apertures = [
    { f: "ƒ1.4", blades: 0, fill: "#ffd28a" },
    { f: "ƒ2",   blades: 9, fill: "#ffc78a" },
    { f: "ƒ4",   blades: 9, fill: "#ffb673", scale: 0.85 },
    { f: "ƒ8",   blades: 7, fill: "#ff9e4a", scale: 0.65 },
    { f: "ƒ16",  blades: 7, fill: "#f25c00", scale: 0.45 },
  ];
  return (
    <figure className="my-10">
      <div className="grid grid-cols-5 gap-3 max-w-3xl mx-auto">
        {apertures.map((a) => (
          <div key={a.f} className="bg-[#1a1410] p-3 rounded-sm flex flex-col items-center gap-2">
            <svg viewBox="0 0 80 80" className="w-full">
              {a.blades === 0 ? (
                <circle cx="40" cy="40" r={28 * (a.scale ?? 1)} fill={a.fill} />
              ) : (
                <polygon
                  points={Array.from({ length: a.blades }, (_, i) => {
                    const ang = (i / a.blades) * Math.PI * 2 - Math.PI / 2;
                    const r = 28 * (a.scale ?? 1);
                    return `${40 + r * Math.cos(ang)},${40 + r * Math.sin(ang)}`;
                  }).join(" ")}
                  fill={a.fill}
                />
              )}
            </svg>
            <span className="text-[10px] tracking-[0.2em] text-center" style={{ fontFamily: G_MONO, color: "#f5d28a" }}>{a.f}</span>
          </div>
        ))}
      </div>
      <figcaption className="text-center text-[10px] tracking-[0.4em] uppercase text-stone-500 mt-4" style={{ fontFamily: G_MONO }}>
        BOKEH SHAPES · POINT LIGHTS TAKE THE FORM OF THE APERTURE
      </figcaption>
    </figure>
  );
}
