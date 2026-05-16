import { GuideNav, GuideFooter, ChapterMasthead, Body, Section, Sub, Callout, PullQuote, WhenToUse, Spec, PrevNext, G_DISPLAY, G_MONO } from "@/components/guide-chrome";

export const metadata = { title: "Lenses · Wildlight Guide" };

export default function Lenses() {
  return (
    <main className="bg-[#0a0807] text-[#e8dfd1] min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      <GuideNav />
      <ChapterMasthead n="04" title="Lenses & Focal Length" sub="How focal length reshapes the world. Wide for storytelling, fifty for honesty, eighty-five for the face, two hundred for compression." kicker="THE WINDOW" />

      <Body>
        <Section n="4.1" title="What focal length actually controls">
          <p>
            Focal length is a number printed on every lens — 24mm, 50mm, 85mm, 200mm. It measures the distance from the optical center of the lens to the sensor when focused at infinity. The number alone is not interesting. What it <em className="italic">means</em> is interesting.
          </p>
          <p>
            Focal length controls two things at once:
          </p>
          <Callout label="THE TWO EFFECTS">
            <strong>Angle of view.</strong> A short focal length sees a wide swath of the world. A long focal length sees a narrow sliver. This is the obvious effect.<br/><br/>
            <strong>Apparent compression.</strong> A long focal length flattens the perceived distance between near and far objects, stacking them on top of each other. A short focal length exaggerates the distance, pushing the background away. This is the subtle effect, and it's what matters most for the look of a photograph.
          </Callout>
          <FocalLengthDiagram />
        </Section>

        <Section n="4.2" title="The focal-length families">
          <p>
            Photographers carve up the spectrum into rough families. The numbers below assume a full-frame (35mm) sensor. If you shoot APS-C, multiply by 1.5. If you shoot Micro Four Thirds, multiply by 2. A "normal" lens is a normal lens regardless of sensor, but the focal-length number that produces it changes.
          </p>
          <Sub>14–24mm · ultra-wide</Sub>
          <p>
            The world widens dramatically. Edges of the frame stretch and distort. Foreground objects loom huge while backgrounds shrink to specks. Architecture, vast landscapes, tight interiors. Used carelessly in portraits it makes noses into beaks; used carefully in storytelling photographs it puts the viewer <em className="italic">inside</em> the scene.
          </p>
          <Sub>28–35mm · wide / environmental</Sub>
          <p>
            The natural focal length for documentary, photojournalism, street, and environmental portraits. Wide enough to include context (the room around the person, the street around the subject) without distorting unnaturally. A 35mm lens on a full-frame body is the working lens of half the great documentary photographers who ever lived.
          </p>
          <Sub>50mm · normal</Sub>
          <p>
            Close to the human eye's natural field of view. Honest. Distortion-free. Subjects look the way they look. The cheapest fast lens you can buy (the "nifty fifty" — a 50mm ƒ1.8 for under $200 on every major mount) and one of the best learning lenses ever made.
          </p>
          <Sub>85–105mm · short telephoto · the portrait lens</Sub>
          <p>
            Compresses the face slightly in a flattering way, separates subject from background with thin depth of field. The classic portrait length. An 85mm ƒ1.4 is the dream lens of half the wedding photographers in the world.
          </p>
          <Sub>135–200mm · medium telephoto</Sub>
          <p>
            Reach without being absurd. Outdoor portraits at conversational distance, candid moments from across a room, sports at close range. 135mm in particular has a near-mystical reputation among photographers — magical compression, exquisite separation.
          </p>
          <Sub>300mm+ · long telephoto</Sub>
          <p>
            Wildlife, sports from the sidelines, the moon. Big, expensive, often heavy. Compression becomes extreme — a runner's foreground and the bleachers behind them squash together into one plane.
          </p>
        </Section>

        <Section n="4.3" title="The big idea: perspective comes from distance, not focal length">
          <p>
            This is the most-misunderstood thing in photography. <em className="text-orange-200/95 italic">Focal length does not change perspective. Distance does.</em>
          </p>
          <p>
            If you stand in one spot and put on a 24mm lens, then a 50mm, then a 200mm — the perspective is identical. The 200mm is just a tighter crop of the 24mm. The relative sizes of the foreground and background objects don't change.
          </p>
          <p>
            What's different is that you usually <em className="italic">move</em> when you change focal lengths. With a wide lens you step closer to fill the frame. With a long lens you step farther back to fit the subject in. That movement — that change in distance — is what changes the perspective. The lens just sets the angle of view.
          </p>
          <CompressionDiagram />
          <Callout label="A QUICK EXPERIMENT">
            Stand five feet from a friend with a wide lens. Take a photo. Now zoom to telephoto (or swap lenses) and back up until the friend fills the frame the same way. Compare the two photos. The friend's face will look completely different — wide makes the nose huge; telephoto flattens the features. Same person. Different distance. <em className="italic">That's</em> the lens choice.
          </Callout>
        </Section>

        <Section n="4.4" title="Compression — the painterly effect">
          <p>
            When a long lens is used from far away, the apparent distance between near and far objects shrinks. The sun looks enormous behind a runner. The moon looks like it's resting on the building. A row of distant cars looks stacked like dominoes. This is <strong className="text-orange-200/95">compression</strong>, and it's one of photography's most powerful effects.
          </p>
          <p>
            Compression is the reason cinematographers use long lenses to make foreground and background feel close even when they're miles apart. It's why a landscape photograph at 200mm can look like a stack of layers — mountains, then mountains, then mountains.
          </p>
          <PullQuote>
            A wide-angle lens shows what's around you. A telephoto lens shows what you're looking at.
          </PullQuote>
        </Section>

        <Section n="4.5" title="Primes versus zooms">
          <p>
            A <strong className="text-orange-200/95">prime</strong> lens has one fixed focal length. A <strong className="text-orange-200/95">zoom</strong> can shift between several. Both are useful; they encourage different ways of working.
          </p>
          <Sub>Primes — the disciplined choice</Sub>
          <p>
            Lighter, faster (wider maximum apertures), often sharper, almost always cheaper at the same quality level. The constraint forces you to <em className="italic">move</em>: to find the right distance with your feet instead of the zoom ring. Photographers who shoot primes tend to get closer to their subjects and produce more intimate work.
          </p>
          <Sub>Zooms — the practical choice</Sub>
          <p>
            Versatile. One lens replaces three. Indispensable in situations where you can't move (sports, weddings, events). Modern zooms (24-70 ƒ2.8, 70-200 ƒ2.8) are nearly as good optically as primes and are the workhorses of professional photography.
          </p>
          <Sub>The starter trinity</Sub>
          <p>
            If you can only own three lenses, these three cover almost everything:
          </p>
          <Spec pairs={[
            ["WIDE", "24mm or 35mm ƒ1.8 prime — for context and environment"],
            ["NORMAL", "50mm ƒ1.8 prime — for everyday and learning"],
            ["SHORT TELE", "85mm ƒ1.8 prime — for portraits and isolation"],
          ]} />
          <p>
            Three lenses, all under $1000 combined on most mounts, cover the focal-length spectrum from wide to portrait. A 70-200mm zoom is the natural fourth purchase.
          </p>
        </Section>

        <Section n="4.6" title="What to pick when">
          <WhenToUse items={[
            { when: "Travel · one lens for a day", why: "35mm prime or 24-70mm zoom. Wide enough for streets, long enough for a portrait, light enough to forget you're carrying it." },
            { when: "Portrait · studio or outdoor", why: "85mm prime for headshots and tight portraits. 35mm or 50mm for environmental portraits that include the world around the subject." },
            { when: "Landscape", why: "24mm for grand vistas with foreground interest. 70-200mm for the painterly compressed shots of stacked ridges. Surprisingly, 50mm often produces the most honest landscape photographs." },
            { when: "Street", why: "35mm prime. Some swear by 28mm, some by 50mm. The community is divided; everyone is right." },
            { when: "Architecture / interiors", why: "Tilt-shift if you can afford it (~$2k). Otherwise 24mm with careful camera leveling to keep verticals straight." },
            { when: "Sports / wildlife", why: "70-200mm for close sports, 300mm+ for distant. Fast aperture (ƒ2.8) helps for subject isolation and fast shutters in low light." },
            { when: "Concerts / low light", why: "Fast prime — 35mm ƒ1.4 or 50mm ƒ1.4. The aperture matters more than the focal length here." },
          ]} />
        </Section>

        <Section n="4.7" title="A quick word on full-frame vs crop sensors">
          <p>
            "Full-frame" sensors measure roughly 36×24mm (the size of a frame of 35mm film). "Crop" sensors are smaller — APS-C at ~24×16mm (Canon, Sony, Fuji, Nikon), Micro Four Thirds at ~17×13mm (Olympus, Panasonic).
          </p>
          <p>
            A smaller sensor "crops" the image circle a lens produces. A 50mm lens on an APS-C body frames roughly like a 75mm on a full-frame body (50 × 1.5). It's the same lens, the same focal length, but the sensor is smaller, so the field of view is narrower.
          </p>
          <Callout label="THE CROP-FACTOR CHEAT">
            Multiply the lens's focal length by the crop factor to get its <em className="italic">equivalent</em> on full-frame:<br/>
            <span className="font-mono text-orange-200/90">APS-C · 1.5×</span> · 50mm becomes 75mm equiv<br/>
            <span className="font-mono text-orange-200/90">Canon APS-C · 1.6×</span> · 50mm becomes 80mm equiv<br/>
            <span className="font-mono text-orange-200/90">Micro Four Thirds · 2.0×</span> · 50mm becomes 100mm equiv<br/>
            <span className="font-mono text-orange-200/90">iPhone main camera</span> · ~24mm equivalent (the "1×")
          </Callout>
        </Section>

        <Section n="4.8" title="An exercise">
          <p>
            If you have a zoom: tape it. Pick one focal length — 35mm or 50mm — and don't change it for a week. Shoot every photograph at that focal length.
          </p>
          <p>
            You'll be frustrated by Tuesday and a better photographer by Sunday. The constraint forces decisions: to move closer, to step back, to find a different angle, to abandon the photograph and find a different one. By the end of the week you'll know the lens's reach in your hands, and any other lens will feel like a deliberate choice rather than a default.
          </p>
          <Sub>If you have only one prime</Sub>
          <p>
            Even better. Skip the tape.
          </p>
        </Section>
      </Body>

      <PrevNext prev={{ slug: "light", n: "03", title: "Light" }} next={{ slug: "focus", n: "05", title: "Focus & Depth of Field" }} />
      <GuideFooter />
    </main>
  );
}

/* ============== Diagrams ============== */

function FocalLengthDiagram() {
  const lengths = [
    { mm: "14",  angle: 114, label: "ULTRA-WIDE" },
    { mm: "24",  angle: 84,  label: "WIDE" },
    { mm: "35",  angle: 63,  label: "ENVIRONMENT" },
    { mm: "50",  angle: 47,  label: "NORMAL" },
    { mm: "85",  angle: 28,  label: "PORTRAIT" },
    { mm: "135", angle: 18,  label: "MEDIUM TELE" },
    { mm: "200", angle: 12,  label: "LONG TELE" },
    { mm: "400", angle: 6,   label: "WILDLIFE" },
  ];
  return (
    <figure className="my-10">
      <svg viewBox="0 0 480 320" className="w-full max-w-2xl mx-auto bg-[#1a1410] rounded-sm">
        {/* camera point */}
        <circle cx="240" cy="280" r="6" fill="#f5d28a" />
        <text x="240" y="305" textAnchor="middle" style={{ fontFamily: G_MONO, fontSize: "10px" }} fill="rgba(245,210,138,0.9)" letterSpacing="2">CAMERA</text>
        {/* fans */}
        {lengths.map((l, i) => {
          const half = l.angle / 2;
          const len = 220;
          const x1 = 240 + len * Math.sin((-half * Math.PI) / 180);
          const y1 = 280 - len * Math.cos((-half * Math.PI) / 180);
          const x2 = 240 + len * Math.sin((half * Math.PI) / 180);
          const y2 = 280 - len * Math.cos((half * Math.PI) / 180);
          const opacity = 0.15 + (i / lengths.length) * 0.2;
          return (
            <g key={l.mm}>
              <path
                d={`M 240 280 L ${x1} ${y1} A ${len} ${len} 0 0 1 ${x2} ${y2} Z`}
                fill="#f5d28a"
                opacity={opacity}
              />
            </g>
          );
        })}
        {/* labels along the right edge */}
        <g style={{ fontFamily: G_MONO, fontSize: "9px" }} fill="#f5d28a" letterSpacing="2">
          {lengths.map((l, i) => (
            <text key={l.mm} x="460" y={30 + i * 24} textAnchor="end">{l.mm}MM · {l.label}</text>
          ))}
        </g>
      </svg>
      <figcaption className="text-center text-[10px] tracking-[0.4em] uppercase text-stone-500 mt-4" style={{ fontFamily: G_MONO }}>
        ANGLE OF VIEW · WIDER LENSES SEE MORE
      </figcaption>
    </figure>
  );
}

function CompressionDiagram() {
  return (
    <figure className="my-10">
      <div className="grid grid-cols-2 gap-4 max-w-3xl mx-auto">
        {/* WIDE */}
        <div className="bg-[#1a1410] p-4 rounded-sm">
          <div className="text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-2" style={{ fontFamily: G_MONO }}>24MM · CLOSE</div>
          <svg viewBox="0 0 200 130" className="w-full">
            <defs>
              <linearGradient id="bg24" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#3a2c1f" /><stop offset="1" stopColor="#15100a" /></linearGradient>
            </defs>
            <rect width="200" height="130" fill="url(#bg24)" />
            <polygon points="0,100 200,100 200,130 0,130" fill="#1a1208" />
            {/* big foreground subject */}
            <circle cx="100" cy="85" r="28" fill="#f5d28a" opacity="0.95" />
            {/* tiny far mountain */}
            <polygon points="80,75 100,65 120,75" fill="#5a4a3a" />
          </svg>
          <div className="text-[10px] mt-2 leading-relaxed text-stone-400" style={{ fontFamily: G_DISPLAY, fontStyle: "italic", fontSize: "0.95rem" }}>
            Subject huge, background distant
          </div>
        </div>
        {/* TELE */}
        <div className="bg-[#1a1410] p-4 rounded-sm">
          <div className="text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-2" style={{ fontFamily: G_MONO }}>200MM · FAR</div>
          <svg viewBox="0 0 200 130" className="w-full">
            <rect width="200" height="130" fill="url(#bg24)" />
            <polygon points="0,100 200,100 200,130 0,130" fill="#1a1208" />
            {/* same subject, same apparent size, BUT mountain looms big behind */}
            <polygon points="20,30 100,15 180,30 180,100 20,100" fill="#3a2c1f" />
            <circle cx="100" cy="85" r="28" fill="#f5d28a" opacity="0.95" />
          </svg>
          <div className="text-[10px] mt-2 leading-relaxed text-stone-400" style={{ fontFamily: G_DISPLAY, fontStyle: "italic", fontSize: "0.95rem" }}>
            Subject same size, background looms
          </div>
        </div>
      </div>
      <figcaption className="text-center text-[10px] tracking-[0.4em] uppercase text-stone-500 mt-4" style={{ fontFamily: G_MONO }}>
        SAME SUBJECT SIZE · DIFFERENT BACKGROUND · DISTANCE DOES THIS
      </figcaption>
    </figure>
  );
}
