import { GuideNav, GuideFooter, ChapterMasthead, Body, Section, Sub, Callout, PullQuote, WhenToUse, PrevNext, G_DISPLAY, G_MONO } from "@/components/guide-chrome";

export const metadata = { title: "Light · Wildlight Guide" };

export default function Light() {
  return (
    <main className="bg-[#0a0807] text-[#e8dfd1] min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      <GuideNav />
      <ChapterMasthead n="03" title="Light" sub="Direction, quality, color. Why golden hour is golden, what hard light means, and how to read a scene before you raise the camera." kicker="THE MEDIUM" />

      <Body>
        <Section n="3.1" title="Photography is light, then everything else">
          <p>
            "Photo-graphy" — light, writing. The thing we draw with is light. The thing we draw on is a sensor. The subject is whatever the light is doing in the moment.
          </p>
          <p>
            Photographers who think this way carry their camera until the light is good, and then take the picture. Photographers who don't think this way carry their camera, find a subject, and then wonder why the picture is flat. The subject was never the problem. The light was.
          </p>
          <PullQuote by="Joe McNally">
            Light is the language of photography. If you don't know how to speak it, you can't tell stories.
          </PullQuote>
        </Section>

        <Section n="3.2" title="The three properties of light">
          <p>
            All light, everywhere, can be described by three properties. Every photographic decision about light is a decision about one of these three.
          </p>
          <Callout label="THE TRIAD">
            <strong>Direction</strong> — where the light comes from relative to the subject.<br/>
            <strong>Quality</strong> — soft (diffused) or hard (concentrated).<br/>
            <strong>Color</strong> — the temperature, in Kelvin, plus any tint.
          </Callout>
          <p>
            Read a scene by asking those three questions before raising the camera. Once you start doing this, you stop "looking for a photograph" — you start <em className="italic">seeing what's already there</em>.
          </p>
        </Section>

        <Section n="3.3" title="Direction · the angle of the source">
          <DirectionDiagram />
          <Sub>Front light</Sub>
          <p>
            Source behind the photographer, falling on the front of the subject. Flatters skin (no harsh shadows on the face), shows color truthfully, often boring. The photo looks "lit" rather than seen. Used in driver's-license portraits for a reason.
          </p>
          <Sub>Side light · the workhorse</Sub>
          <p>
            Source 45° to 90° off to the side. This is the cinematographer's friend. Creates dimension — one side of the face bright, the other shadowed, the line between them describing the geometry. Most "good light" you've ever admired in a photograph was side light.
          </p>
          <Sub>Backlight</Sub>
          <p>
            Source behind the subject. The subject becomes a silhouette or, with some bounce light from the front, a luminous edge with a darker face. Hair lights up. Translucent things (leaves, fabric, dust in the air) glow. Romantic, cinematic, hard to expose for — meter on the subject, not the background.
          </p>
          <Sub>Top light · noon sun</Sub>
          <p>
            Source directly overhead. Casts shadows straight down — under the nose, under the brow, into the eye sockets. This is why noon is the photographer's worst hour. Faces become skulls. Avoid, or seek shade.
          </p>
          <Sub>Bottom light</Sub>
          <p>
            Source below the subject. Looks unnatural and ghoulish (it's the campfire-ghost-story angle). Useful for theatrical effect; almost never useful otherwise.
          </p>
          <Callout label="A FIELD TEST">
            Hold up your hand and turn slowly until the side of it is lit and the other side is in shadow. You're now standing perpendicular to the light source. That's the direction the subject should face for good side light. Walk around your subject this way before shooting.
          </Callout>
        </Section>

        <Section n="3.4" title="Quality · hard versus soft">
          <p>
            <strong className="text-orange-200/95">Hard light</strong> has sharp, dark, clean-edged shadows. <strong className="text-orange-200/95">Soft light</strong> has gradual, faint, blurry-edged shadows. Quality is determined by the <em className="italic">apparent size of the light source relative to the subject</em>.
          </p>
          <QualityDiagram />
          <Callout label="THE RULE">
            <strong>Bigger source = softer light. Smaller source = harder light.</strong><br/>
            The sun on a cloudless day looks tiny in the sky → hard. The sun behind clouds becomes a sky-wide softbox → soft. A bare bulb three feet away → hard. A window five feet wide one foot away → soft.
          </Callout>
          <Sub>Hard light is honest and graphic</Sub>
          <p>
            Crisp shadows, high contrast, every wrinkle visible. Hard light flatters strong subjects with strong features (older faces, weathered architecture, sculpture) and brutalizes anything you wanted soft. Use it deliberately.
          </p>
          <Sub>Soft light is forgiving and atmospheric</Sub>
          <p>
            Wraps around the subject. Hides skin imperfections, makes color shine without contrast, suits portraits of almost anyone. Overcast days, open shade, north-facing windows, dusk — all softboxes the size of the sky.
          </p>
          <Sub>How to soften hard light</Sub>
          <p>
            <em className="italic">Make the source bigger from the subject's point of view.</em> Put a translucent diffuser (sheet, curtain, white t-shirt) between the source and the subject — the diffuser becomes the new source, and it's bigger than the original sun or bulb. Or move the subject into shade and let the shaded area's wall act as a giant bounce.
          </p>
          <Sub>How to harden soft light</Sub>
          <p>
            Wait for the clouds to part, or step into direct sun. Add a spot or snoot. Move closer to the bulb. Make the source smaller relative to the subject.
          </p>
        </Section>

        <Section n="3.5" title="Color · the temperature of light">
          <p>
            Light has a temperature, measured in Kelvin (K). Low temperatures look warm and orange. High temperatures look cool and blue. Counter-intuitive: hotter numbers look cooler in feeling, because they correspond to the color of a hotter glowing thing (a star).
          </p>
          <ColorTempDiagram />
          <Callout label="COMMON TEMPERATURES">
            <span className="font-mono text-orange-200/90">1800K</span> — candle flame<br/>
            <span className="font-mono text-orange-200/90">2700K</span> — household tungsten bulb, warm restaurant<br/>
            <span className="font-mono text-orange-200/90">3200K</span> — film/studio tungsten, golden hour<br/>
            <span className="font-mono text-orange-200/90">4000K</span> — fluorescent, early morning sun<br/>
            <span className="font-mono text-orange-200/90">5500K</span> — noon sunlight, mid-day daylight balance<br/>
            <span className="font-mono text-orange-200/90">6500K</span> — overcast, computer screens<br/>
            <span className="font-mono text-orange-200/90">10000K</span> — clear blue sky, deep shade<br/>
            <span className="font-mono text-orange-200/90">12000K+</span> — twilight, blue hour
          </Callout>
          <Sub>White balance is the answer to "what color is white?"</Sub>
          <p>
            Your camera doesn't know whether the white wall in front of it is being lit by a candle or by noon sun. You tell it. Set white balance to 3200K and the camera assumes the light is candle-warm, so it cools the image to make whites look white. Set it to 6500K and the camera assumes overcast, so it warms the image.
          </p>
          <Sub>Auto white balance is usually fine — until it isn't</Sub>
          <p>
            AWB does well in mixed light and most daylight. It struggles when a single dominant color is the <em className="italic">point</em> of the photograph: golden hour can look weirdly neutral, blue hour can look gray. Set white balance manually when you want to preserve the color of the light itself.
          </p>
          <Callout label="GOLDEN RULE OF GOLDEN HOUR">
            Set white balance to <span className="font-mono text-orange-200/90">5000–5500K</span> during golden hour, even though the light is around 3200K. This <em className="italic">preserves</em> the warmth instead of correcting it away. The orange is the photograph.
          </Callout>
        </Section>

        <Section n="3.6" title="The hours of the day">
          <Sub>Blue hour · the half hour before sunrise and after sunset</Sub>
          <p>
            The sky is luminous, soft, and color-true even though the sun is below the horizon. City lights begin to register against a still-bright sky — neither dominant. The most cinematic time to photograph cities. Hard to expose for; bracket and shoot RAW.
          </p>
          <Sub>Golden hour · the hour around sunrise and sunset</Sub>
          <p>
            The sun is low, so light travels through more atmosphere and shifts warm. Shadows are long. Faces glow. Landscapes get long raking light that reveals texture. Photographers who chase golden hour have one to two hours of usable light per day; everyone else has eight hours of compromise.
          </p>
          <Sub>Daylight · the long middle</Sub>
          <p>
            Two hours after sunrise to two hours before sunset, the sun is high and the light is increasingly hard. Useful for action and street photography (lots of light, fast shutters, deep depth of field), challenging for portraits. Find open shade — a building or tree casting a soft envelope of indirect light.
          </p>
          <Sub>Noon · the hour to nap</Sub>
          <p>
            Sun directly overhead, hardest shadows, ugliest portraits. Use this hour for travel, for scouting, for sleep. If you must shoot, work with the harshness (graphic, high-contrast street; architectural details where shadows describe geometry; black and white where contrast becomes content).
          </p>
          <Sub>Bad weather · the secret good hour</Sub>
          <p>
            Overcast skies are the largest softbox in nature. Rain, fog, snow turn ordinary scenes into atmosphere. Photographers who avoid bad weather miss most of the best photographs.
          </p>
        </Section>

        <Section n="3.7" title="Reading a scene before you raise the camera">
          <p>
            Before the camera even comes up, ask:
          </p>
          <ol className="space-y-3 mt-4 list-none" style={{ fontFamily: G_DISPLAY, fontSize: "1.1rem" }}>
            <li className="grid grid-cols-[auto_1fr] gap-5">
              <span className="text-[10px] tracking-[0.4em] uppercase text-orange-200/70 pt-1" style={{ fontFamily: G_MONO }}>01</span>
              <span>Where is the light coming from? Trace shadows back to their source.</span>
            </li>
            <li className="grid grid-cols-[auto_1fr] gap-5">
              <span className="text-[10px] tracking-[0.4em] uppercase text-orange-200/70 pt-1" style={{ fontFamily: G_MONO }}>02</span>
              <span>Is it hard or soft? Look at the edge of a shadow. Sharp → hard. Fuzzy → soft.</span>
            </li>
            <li className="grid grid-cols-[auto_1fr] gap-5">
              <span className="text-[10px] tracking-[0.4em] uppercase text-orange-200/70 pt-1" style={{ fontFamily: G_MONO }}>03</span>
              <span>What color is it? Warm, neutral, cool? Mixed? (Mixed sources are the trickiest — daylight from a window + tungsten from a lamp.)</span>
            </li>
            <li className="grid grid-cols-[auto_1fr] gap-5">
              <span className="text-[10px] tracking-[0.4em] uppercase text-orange-200/70 pt-1" style={{ fontFamily: G_MONO }}>04</span>
              <span>How can I position the subject (or myself) to use the light I have?</span>
            </li>
          </ol>
          <p>
            Spending an extra ten seconds on these four questions before each frame is the single biggest improvement most photographers can make.
          </p>
        </Section>

        <Section n="3.8" title="When to wait, when to make">
          <WhenToUse items={[
            { when: "Found light — wait for it", why: "Travel, street, documentary, landscape. The world will deliver good light if you're patient. Position yourself; wait for the cloud to move." },
            { when: "Found light — chase it", why: "Sunrise and sunset are non-negotiable appointments. Set an alarm. Be in position twenty minutes before." },
            { when: "Modified light — diffuse", why: "Portraits in bad sun. Have your subject stand in open shade with sun lighting them indirectly off a wall. Or push a sheer curtain between sun and subject." },
            { when: "Modified light — bounce", why: "Indoor portraits with one window. Place a white poster board or wall opposite the window to lift the shadow side of the face." },
            { when: "Made light", why: "Studio, night, controlled environments. Speedlights, strobes, continuous LED. A whole separate craft — start with one light, learn what one light can do, then add a second only when you've outgrown it." },
          ]} />
        </Section>

        <Section n="3.9" title="Three exercises">
          <Sub>The shadow walk</Sub>
          <p>
            Go outside on a sunny day, an overcast day, a foggy day, a rainy day. Photograph only shadows. You'll learn to read light from the negative space it creates faster than any tutorial can teach you.
          </p>
          <Sub>One window, one face</Sub>
          <p>
            Sit a friend near a window. Move them through the four positions: facing the window (front light), perpendicular (side light), away from the window (rim light from behind, dark face), 45° toward the window (the classic Rembrandt). Shoot ten frames in each. Compare. You will never look at a window the same way again.
          </p>
          <Sub>Golden hour, every day, for a week</Sub>
          <p>
            Wake before sunrise. Photograph the same view, or the same person, for seven mornings. Notice how the light is never the same twice, and how much the same subject changes with the light. By day seven, you will see light without trying.
          </p>
        </Section>
      </Body>

      <PrevNext prev={{ slug: "composition", n: "02", title: "Composition" }} next={{ slug: "lenses", n: "04", title: "Lenses & Focal Length" }} />
      <GuideFooter />
    </main>
  );
}

/* ============== Diagrams ============== */

function DirectionDiagram() {
  const dirs = [
    { name: "FRONT",   angle: 0,    desc: "FLAT" },
    { name: "SIDE 45°", angle: 45,  desc: "DIMENSION" },
    { name: "SIDE 90°", angle: 90,  desc: "DRAMATIC" },
    { name: "BACK",    angle: 180,  desc: "SILHOUETTE" },
    { name: "TOP",     angle: -90,  desc: "NOON SKULL" },
  ];
  return (
    <figure className="my-10">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-3xl mx-auto">
        {dirs.map((d) => (
          <div key={d.name} className="bg-[#1a1410] p-3 rounded-sm flex flex-col items-center gap-2">
            <svg viewBox="0 0 80 80" className="w-full">
              {/* head */}
              <circle cx="40" cy="40" r="14" fill="#3a2c20" stroke="#5a4636" strokeWidth="1" />
              {/* lit side */}
              <path
                d={`M 40 40 m -14 0 a 14 14 0 1 1 28 0 a 14 14 0 1 1 -28 0`}
                fill="#f5d28a"
                opacity="0.85"
                style={{
                  clipPath: `path('M 40 40 L ${40 + 30 * Math.cos((d.angle * Math.PI) / 180 - Math.PI / 2)} ${40 + 30 * Math.sin((d.angle * Math.PI) / 180 - Math.PI / 2)} A 30 30 0 0 1 ${40 + 30 * Math.cos((d.angle * Math.PI) / 180 + Math.PI / 2)} ${40 + 30 * Math.sin((d.angle * Math.PI) / 180 + Math.PI / 2)} Z')`
                }}
              />
              {/* light source dot */}
              <circle
                cx={40 + 30 * Math.cos((d.angle * Math.PI) / 180 - Math.PI / 2)}
                cy={40 + 30 * Math.sin((d.angle * Math.PI) / 180 - Math.PI / 2)}
                r="3" fill="#ffd28a"
              />
            </svg>
            <div className="text-center">
              <div className="text-[10px] tracking-[0.25em]" style={{ fontFamily: G_MONO, color: "#f5d28a" }}>{d.name}</div>
              <div className="text-[9px] tracking-[0.2em] text-stone-500 mt-0.5" style={{ fontFamily: G_MONO }}>{d.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <figcaption className="text-center text-[10px] tracking-[0.4em] uppercase text-stone-500 mt-4" style={{ fontFamily: G_MONO }}>
        DIRECTION · WHERE THE LIGHT FALLS
      </figcaption>
    </figure>
  );
}

function QualityDiagram() {
  return (
    <figure className="my-10">
      <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
        {/* HARD */}
        <div className="bg-[#1a1410] p-6 rounded-sm">
          <div className="text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-3" style={{ fontFamily: G_MONO }}>HARD LIGHT</div>
          <svg viewBox="0 0 200 120" className="w-full">
            <circle cx="50" cy="60" r="20" fill="#3a2c20" />
            <ellipse cx="100" cy="100" rx="40" ry="8" fill="rgba(0,0,0,0.85)" />
            <circle cx="20" cy="20" r="5" fill="#ffd28a" />
            <line x1="20" y1="20" x2="50" y2="60" stroke="#ffd28a" strokeWidth="0.5" opacity="0.3" />
          </svg>
          <div className="text-[10px] text-stone-400 mt-2 leading-relaxed" style={{ fontFamily: G_DISPLAY, fontStyle: "italic", fontSize: "0.95rem" }}>
            Small source · sharp shadow
          </div>
        </div>
        {/* SOFT */}
        <div className="bg-[#1a1410] p-6 rounded-sm">
          <div className="text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-3" style={{ fontFamily: G_MONO }}>SOFT LIGHT</div>
          <svg viewBox="0 0 200 120" className="w-full">
            <circle cx="50" cy="60" r="20" fill="#3a2c20" />
            <ellipse cx="100" cy="100" rx="50" ry="10" fill="rgba(0,0,0,0.55)" />
            <ellipse cx="100" cy="100" rx="65" ry="14" fill="rgba(0,0,0,0.25)" />
            <rect x="5" y="5" width="40" height="30" fill="#ffd28a" opacity="0.7" />
          </svg>
          <div className="text-[10px] text-stone-400 mt-2 leading-relaxed" style={{ fontFamily: G_DISPLAY, fontStyle: "italic", fontSize: "0.95rem" }}>
            Big source · gradual shadow
          </div>
        </div>
      </div>
      <figcaption className="text-center text-[10px] tracking-[0.4em] uppercase text-stone-500 mt-4" style={{ fontFamily: G_MONO }}>
        QUALITY · SOURCE SIZE DETERMINES SHADOW SOFTNESS
      </figcaption>
    </figure>
  );
}

function ColorTempDiagram() {
  const stops = [
    { k: "1800",  c: "#ff5a18" },
    { k: "2700",  c: "#ff8a3d" },
    { k: "3200",  c: "#ffb673" },
    { k: "4000",  c: "#ffe5b0" },
    { k: "5500",  c: "#fff8e8" },
    { k: "6500",  c: "#e8efff" },
    { k: "8000",  c: "#a0c0ff" },
    { k: "10000", c: "#6090ff" },
  ];
  return (
    <figure className="my-10">
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 max-w-3xl mx-auto">
        {stops.map((s) => (
          <div key={s.k} className="flex flex-col items-center gap-2">
            <div className="w-full aspect-square rounded-sm border border-stone-800" style={{ background: s.c }} />
            <span className="text-[9px] tracking-[0.2em]" style={{ fontFamily: G_MONO, color: "#f5d28a" }}>{s.k}K</span>
          </div>
        ))}
      </div>
      <figcaption className="text-center text-[10px] tracking-[0.4em] uppercase text-stone-500 mt-4" style={{ fontFamily: G_MONO }}>
        COLOR TEMPERATURE · WARMER NUMBERS = COOLER LIGHT
      </figcaption>
    </figure>
  );
}
