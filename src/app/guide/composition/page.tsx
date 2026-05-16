import { GuideNav, GuideFooter, ChapterMasthead, Body, Section, Sub, Callout, PullQuote, WhenToUse, PrevNext, G_DISPLAY, G_MONO } from "@/components/guide-chrome";

export const metadata = { title: "Composition · Wildlight Guide" };

export default function Composition() {
  return (
    <main className="bg-[#0a0807] text-[#e8dfd1] min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      <GuideNav />
      <ChapterMasthead n="02" title="Composition" sub="The grammar of where things sit in the frame. Rule of thirds, leading lines, negative space — and when to break each one on purpose." kicker="THE EYE" />

      <Body>
        <Section n="2.1" title="What composition actually is">
          <p>
            Composition is the choice of <em className="text-orange-200/95 italic">what to leave out</em>. The frame is a window of a fixed size. The world is much larger than the window. Everything inside it is there because you decided it should be; everything outside it is there because you decided it shouldn't.
          </p>
          <p>
            That's the whole craft. The rules below are not laws — they're shortcuts that make the choosing easier. Photographers who shoot for thirty years can break every rule in this chapter and produce masterpieces. But they learned the rules first.
          </p>
          <PullQuote by="Henri Cartier-Bresson">
            Photography is, for me, a spontaneous impulse coming from an ever-attentive eye which captures the moment and its eternity.
          </PullQuote>
        </Section>

        <Section n="2.2" title="The Rule of Thirds">
          <p>
            Imagine a tic-tac-toe board over your frame: two horizontal lines, two vertical lines, dividing the picture into nine equal rectangles. The four points where the lines cross are <strong className="text-orange-200/95">power points</strong>. The human eye tends to land on them.
          </p>
          <ThirdsDiagram />
          <p>
            Place the most important thing in the frame on one of those four crossings, and the picture will feel balanced without you having to think about it. Place horizons on the top or bottom horizontal line, not the dead middle. Place eyes (in a portrait) on the upper third.
          </p>
          <Callout label="WHY THE DEAD CENTER IS USUALLY WRONG">
            A subject in the exact middle creates symmetric tension. The eye has nowhere to travel. Centered compositions are powerful when the subject is symmetric itself (a face looking straight ahead, an architectural façade), but a general subject in the middle feels stuck.
          </Callout>
          <Sub>When to break it</Sub>
          <p>
            Break the rule of thirds when the subject is the kind that wants a center: portraits taken straight on, architecture shot head-on, repeating patterns, mirror-symmetric scenes. The rule serves balance; symmetry is its own kind of balance.
          </p>
        </Section>

        <Section n="2.3" title="Leading Lines">
          <p>
            The eye follows lines. A road, a fence, the edge of a river, a row of streetlights, the shadow of a wall, the perspective of a hallway — all of these are arrows. Aim them at your subject and the viewer follows them in.
          </p>
          <LeadingLinesDiagram />
          <Sub>The strongest lead is the one that converges</Sub>
          <p>
            Two lines that converge — railroad tracks, the sides of a road, the edges of a corridor — pull the eye toward their vanishing point with enormous force. Put the subject at or near that point and the photograph almost looks at itself.
          </p>
          <Sub>The line doesn't have to be straight</Sub>
          <p>
            A river bends. A path curls. A row of trees swerves into the distance. Curved leading lines are softer and feel more like an invitation than an arrow. Useful for landscapes and dreamy scenes where you want the eye to wander, not stab.
          </p>
        </Section>

        <Section n="2.4" title="Framing within the frame">
          <p>
            Use elements <em className="italic">inside</em> the scene to build a second frame around your subject — a doorway, a window, an arch, an overhanging branch, a gap in a crowd. This focuses attention and adds depth (something near, something far) without adding clutter.
          </p>
          <Callout label="DEPTH FROM FRAMING">
            A foreground frame plus a midground subject plus a background tells a viewer: I am standing here, looking through there, at that. Three planes is a story. One plane is a snapshot.
          </Callout>
          <Sub>Negative space as a frame</Sub>
          <p>
            The most powerful frame is often nothing at all — a vast quiet of empty sky, fog, ocean, wall. Negative space (large areas of low detail) makes the subject sing. It is the photographic equivalent of a long pause before a sentence.
          </p>
        </Section>

        <Section n="2.5" title="Foreground · Midground · Background">
          <p>
            A photograph with depth has something near, something in the middle, and something far. Even a portrait benefits: an out-of-focus shoulder in the foreground, the face in the midground, the world dissolving behind. The eye reads near-to-far as <em className="italic">space</em>, and space is the difference between a photograph that feels like a window and one that feels like a sticker.
          </p>
          <LayersDiagram />
          <Sub>How to find a foreground when there isn't one</Sub>
          <p>
            Get low. Walk forward three steps. Find a flower, a rock, a fencepost, a hand. Anything close to the lens becomes a foreground. Going low especially — knees, elbows, belly — makes the world bigger and the photograph deeper. Most amateur photos are taken from standing height because standing is where the photographer happens to be. <em className="italic">Move.</em>
          </p>
        </Section>

        <Section n="2.6" title="Balance and weight">
          <p>
            Every element in a frame has visual <strong className="text-orange-200/95">weight</strong>. A bright object is heavier than a dark one. A sharp object is heavier than a blurred one. A face is heavier than a tree. A small bright thing can balance a large dim one.
          </p>
          <p>
            The trick is to feel the picture like a see-saw. Drop a heavy element on one side; ask if the other side has something to counter it. If the picture tips, it feels unsettled. Sometimes you <em className="italic">want</em> unsettled — but that should be a choice, not an accident.
          </p>
          <Callout label="A SIMPLE TEST">
            Squint at your photograph. The squint blurs detail and shows you raw blocks of light and dark. If the heavy blocks are stacked on one side and the other side is hollow, the picture is off-balance. If they alternate, it's stable.
          </Callout>
        </Section>

        <Section n="2.7" title="Symmetry, repetition, pattern">
          <p>
            Symmetry is its own gravity. A reflection in still water, a perfectly head-on door, a face dead center — these break the rule of thirds and look stunning because they're so honestly symmetric. <em className="italic">Commit to the symmetry, or don't.</em> Almost-symmetric pictures feel wrong.
          </p>
          <Sub>Pattern broken by one thing</Sub>
          <p>
            A field of yellow umbrellas with one red one. A row of identical windows with one curtained. A grid of subway tiles missing one. The eye locks instantly to the break. Pattern is the setup; the broken element is the punchline. Both halves of the joke matter.
          </p>
          <RepeatedPatternDiagram />
        </Section>

        <Section n="2.8" title="The frame edges are a tool">
          <p>
            What touches the edge — and what doesn't — is composition. A subject that touches the top edge feels pinned, claustrophobic, big. A subject with sky above it feels free, small, quiet. A subject cropped at the edge feels like part of something larger off-screen. A subject with breathing room on every side feels formal and stable.
          </p>
          <Callout label="A COMMON MISTAKE">
            People accidentally crop joints — wrists, elbows, ankles, the crown of the head — and the photo looks awkward. Either include the whole joint or crop well into the limb (mid-forearm, mid-shin). The rule: crops at <em className="italic">arbitrary</em> places, never at <em className="italic">articulating</em> ones.
          </Callout>
        </Section>

        <Section n="2.9" title="When to break the rules">
          <p>
            All of the above are defaults. The picture you actually want may need:
          </p>
          <WhenToUse items={[
            { when: "Dead-center subject", why: "When the subject is symmetric or confrontational. A portrait staring straight at the camera demands the center." },
            { when: "Horizon in the middle", why: "When the sky and the ground are equally important — reflective water, vast skies with no foreground, an even split is the truth of the scene." },
            { when: "Joints in the crop", why: "Never. This one really isn't worth breaking. Either include or cut well past." },
            { when: "Cluttered frame", why: "Markets, crowds, rooms full of objects. Sometimes the picture is about abundance. Bring order through color or repetition rather than emptiness." },
            { when: "No subject at all", why: "Pure texture or atmospheric photographs — fog, a stretch of sand, a wall of bark — work as pure rhythm. The frame becomes a field." },
          ]} />
        </Section>

        <Section n="2.10" title="An exercise">
          <p>
            Set your camera to a single fixed focal length (50mm if you have a prime, otherwise tape your zoom). Walk for an hour. Photograph one thing fifteen ways:
          </p>
          <ul className="space-y-2 mt-4" style={{ fontFamily: G_DISPLAY, fontSize: "1.1rem" }}>
            <li>· From three feet away.</li>
            <li>· From twenty feet away.</li>
            <li>· From above.</li>
            <li>· From the ground.</li>
            <li>· Through something else.</li>
            <li>· Behind something else.</li>
            <li>· At three power points (left, right, top).</li>
            <li>· Dead center.</li>
            <li>· With one foreground element.</li>
            <li>· With deep background.</li>
            <li>· With sky above.</li>
            <li>· With sky cropped out.</li>
            <li>· At sunrise.</li>
            <li>· At blue hour.</li>
            <li>· In bad weather.</li>
          </ul>
          <p>
            Most of the fifteen will be mediocre. Two will be much better than you expected. Notice why.
          </p>
        </Section>
      </Body>

      <PrevNext prev={{ slug: "exposure", n: "01", title: "The Exposure Triangle" }} next={{ slug: "light", n: "03", title: "Light" }} />
      <GuideFooter />
    </main>
  );
}

/* ============== Diagrams ============== */

function ThirdsDiagram() {
  return (
    <figure className="my-10">
      <svg viewBox="0 0 480 320" className="w-full max-w-2xl mx-auto bg-[#1a1410] rounded-sm">
        {/* faux landscape */}
        <defs>
          <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#7c5d3f" />
            <stop offset="1" stopColor="#3a2418" />
          </linearGradient>
          <linearGradient id="ground" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#231711" />
            <stop offset="1" stopColor="#0d0807" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="480" height="213" fill="url(#sky)" />
        <rect x="0" y="213" width="480" height="107" fill="url(#ground)" />
        {/* grid */}
        <g stroke="rgba(245,210,138,0.6)" strokeWidth="1" strokeDasharray="3 3">
          <line x1="160" y1="0" x2="160" y2="320" />
          <line x1="320" y1="0" x2="320" y2="320" />
          <line x1="0" y1="107" x2="480" y2="107" />
          <line x1="0" y1="213" x2="480" y2="213" />
        </g>
        {/* power points */}
        {[[160, 107], [320, 107], [160, 213], [320, 213]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="6" fill="#f5d28a" stroke="#0a0807" strokeWidth="2" />
        ))}
        {/* sun on a power point */}
        <circle cx="320" cy="107" r="22" fill="#ffd28a" opacity="0.95" />
      </svg>
      <figcaption className="text-center text-[10px] tracking-[0.4em] uppercase text-stone-500 mt-3" style={{ fontFamily: G_MONO }}>
        RULE OF THIRDS · FOUR POWER POINTS, TWO HORIZON LINES
      </figcaption>
    </figure>
  );
}

function LeadingLinesDiagram() {
  return (
    <figure className="my-10">
      <svg viewBox="0 0 480 280" className="w-full max-w-2xl mx-auto bg-[#1a1410] rounded-sm">
        {/* converging road */}
        <polygon points="0,280 480,280 280,140 200,140" fill="#2c2218" />
        <polygon points="220,140 260,140 480,260 0,260" fill="#221813" opacity="0.6" />
        {/* lane lines */}
        <line x1="40" y1="280" x2="230" y2="140" stroke="#f5d28a" strokeWidth="2" opacity="0.8" />
        <line x1="440" y1="280" x2="250" y2="140" stroke="#f5d28a" strokeWidth="2" opacity="0.8" />
        {/* subject at vanishing point */}
        <circle cx="240" cy="138" r="12" fill="#ffd28a" />
        <text x="240" y="115" textAnchor="middle" style={{ fontFamily: G_MONO, fontSize: "9px" }} fill="rgba(245,210,138,0.9)" letterSpacing="3">SUBJECT</text>
      </svg>
      <figcaption className="text-center text-[10px] tracking-[0.4em] uppercase text-stone-500 mt-3" style={{ fontFamily: G_MONO }}>
        LEADING LINES · TWO ARROWS POINTING TO THE PUNCTUM
      </figcaption>
    </figure>
  );
}

function LayersDiagram() {
  return (
    <figure className="my-10">
      <svg viewBox="0 0 480 240" className="w-full max-w-2xl mx-auto bg-[#1a1410] rounded-sm">
        <defs>
          <linearGradient id="bg-l" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#3a2c1f" />
            <stop offset="1" stopColor="#15100a" />
          </linearGradient>
        </defs>
        <rect width="480" height="240" fill="url(#bg-l)" />
        {/* far mountain */}
        <polygon points="80,180 200,90 320,180" fill="#2a1e15" />
        <polygon points="200,180 320,80 440,180" fill="#332419" />
        {/* mid: figure */}
        <ellipse cx="240" cy="170" rx="22" ry="40" fill="#0d0805" />
        {/* foreground grass */}
        <polygon points="0,240 0,200 480,200 480,240" fill="#0a0604" />
        {/* labels */}
        <g style={{ fontFamily: G_MONO, fontSize: "9px" }} fill="rgba(245,210,138,0.85)" letterSpacing="3">
          <text x="240" y="225" textAnchor="middle">FOREGROUND</text>
          <text x="240" y="165" textAnchor="middle">MIDGROUND</text>
          <text x="240" y="60" textAnchor="middle">BACKGROUND</text>
        </g>
      </svg>
      <figcaption className="text-center text-[10px] tracking-[0.4em] uppercase text-stone-500 mt-3" style={{ fontFamily: G_MONO }}>
        THREE LAYERS · NEAR, MIDDLE, FAR — A PHOTOGRAPH WITH DEPTH
      </figcaption>
    </figure>
  );
}

function RepeatedPatternDiagram() {
  return (
    <figure className="my-10">
      <div className="grid grid-cols-8 gap-1 max-w-2xl mx-auto bg-[#1a1410] p-4 rounded-sm">
        {Array.from({ length: 32 }).map((_, i) => (
          <div key={i} className="aspect-square" style={{ background: i === 19 ? "#ff8b3d" : "#3a2c1f", opacity: i === 19 ? 1 : 0.7 }} />
        ))}
      </div>
      <figcaption className="text-center text-[10px] tracking-[0.4em] uppercase text-stone-500 mt-3" style={{ fontFamily: G_MONO }}>
        PATTERN BROKEN BY ONE THING · THE EYE LOCKS INSTANTLY
      </figcaption>
    </figure>
  );
}
