import { useEffect, useRef, useState, useCallback } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import photo1 from "@/imports/IMG_20260610_180549.jpg";
import photo2 from "@/imports/IMG_20260610_180739.jpg";
import photo3 from "@/imports/IMG_1185.jpg";
import photo4 from "@/imports/IMG_1154.jpg";
import photo5 from "@/imports/IMG_20260315_183635.jpg";
import photo6 from "@/imports/IMG_20260430_000116.jpg";
import photo7 from "@/imports/IMG_20260430_000616.jpg";
import photo8 from "@/imports/IMG_20260325_203303.jpg";

/* ─── Data ─────────────────────────────────────────────────────── */

const REASONS = [
  "Because your laugh is the most genuine sound I have ever heard.",
  "Because you carry so much with so much grace, and I see it.",
  "Because the way you see the world makes me want to look closer.",
  "Because even when I'm difficult, you still choose patience.",
  "Because you deserve someone who chooses you loudly and I do.",
  "Because thinking about you is the best part of an ordinary day.",
  "Because your heart is something rare, and I refuse to take it for granted.",
  "Because the version of myself I am around you is the best one I know.",
  "Because you make ordinary moments feel like they matter.",
  "Because I haven't stopped thinking about you since the first time we talked.",
  "Because the way you care for others tells me exactly who you are inside.",
  "Because your ambition makes me want to match my level to yours.",
  "Because even the silences with you feel comfortable and right.",
  "Because you are not someone to get over you are someone to get closer to.",
  "Because every day I know you, I find another reason to stay.",
];

const ADMIRE = [
  { icon: "🌿", title: "Your Kindness", body: "The way you treat people especially when no one is watching is the kind of quiet goodness that I think about long after you say it." },
  { icon: "🔥", title: "Your Ambition", body: "You know what you want and you go after it. That drive is attractive in a way I can't quite put into words it makes me want to match your energy." },
  { icon: "✨", title: "How You Make Me Feel", body: "Around you, I feel like I want to be a better version of myself not because I have to, but because you make me believe I can be." },
  { icon: "💬", title: "The Way You Talk", body: "You speak with intention. Your words carry weight, and your honesty even when it's hard is something I deeply respect." },
  { icon: "🌙", title: "Your Quiet Strength", body: "You carry so much privately. There's a resilience in you that I find both inspiring and profoundly moving I love that about you." },
  { icon: "💛", title: "Your Laugh", body: "Honest admission: it is my favorite sound. And I will spend as long as you'll let me, trying to be the reason for it." },
];

const PHOTOS = [
  { src: photo1, caption: "That Golden Hour",                      rotate: -3.5, mt: 0,   imgRotate: 0 },
  { src: photo2, caption: "I love your smile",                     rotate: 2.8,  mt: -24, imgRotate: 0 },
  { src: photo3, caption: "Grabe ka Risky TT",                     rotate: -2,   mt: 0,   imgRotate: 90 },
  { src: photo4, caption: "The times where I feel most at home",   rotate: 3.2,  mt: -16, imgRotate: 360 },
  { src: photo5, caption: "Istitik",    rotate: -2.8, mt: 0,   imgRotate: 0 },
  { src: photo6, caption: "Surprise wala siya kasagang oi",   rotate: 2.2,  mt: -18, imgRotate: 0 },
  { src: photo7, caption: "Mutago jud na siya basta mu pic ko",          rotate: -3.8, mt: 0,   imgRotate: 0 },
  { src: photo8, caption: "Locked in masyado maem",    rotate: 2.5,  mt: -14, imgRotate: 0 },
];

const PROMISES = [
  "I will focus entirely on what we are building not on what was before.",
  "I will extend you the trust you have always deserved.",
  "I will be the kind of person who makes you feel safe, not questioned.",
  "My care for you is real — and it only grows.",
];

/* ─── Petal Canvas ──────────────────────────────────────────────── */

function PetalCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0, raf = 0;

    type Petal = { x: number; y: number; r: number; spd: number; dx: number; rot: number; drot: number; alpha: number; hue: number };
    let petals: Petal[] = [];

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    const make = (): Petal => ({
      x: Math.random() * W, y: -16,
      r: 5 + Math.random() * 7,
      spd: 0.6 + Math.random() * 0.9,
      dx: (Math.random() - 0.5) * 0.7,
      rot: Math.random() * Math.PI * 2,
      drot: (Math.random() - 0.5) * 0.04,
      alpha: 0.12 + Math.random() * 0.22,
      hue: 340 + Math.random() * 20,
    });

    const draw = (p: Petal) => {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.beginPath();
      ctx.moveTo(0, -p.r);
      ctx.bezierCurveTo(p.r * 0.9, -p.r * 0.4, p.r * 0.9, p.r * 0.4, 0, p.r);
      ctx.bezierCurveTo(-p.r * 0.9, p.r * 0.4, -p.r * 0.9, -p.r * 0.4, 0, -p.r);
      ctx.fillStyle = `hsl(${p.hue}, 65%, 78%)`;
      ctx.fill();
      ctx.restore();
    };

    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      if (petals.length < 22 && Math.random() < 0.04) petals.push(make());
      petals = petals.filter(p => {
        p.y += p.spd; p.x += p.dx + Math.sin(p.y / 60) * 0.4; p.rot += p.drot;
        draw(p);
        return p.y < H + 20;
      });
      raf = requestAnimationFrame(frame);
    };

    window.addEventListener("resize", resize);
    resize();
    frame();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
    />
  );
}

/* ─── Scroll Reveal Wrapper ─────────────────────────────────────── */

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Heart SVG ─────────────────────────────────────────────────── */

function Heart({ size = 72 }: { size?: number }) {
  return (
    <svg viewBox="0 0 80 74" width={size} fill="none" style={{ animation: "heartbeat 1.6s ease-in-out infinite" }}>
      <defs>
        <linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4919f" />
          <stop offset="100%" stopColor="#c4687a" />
        </linearGradient>
      </defs>
      <path d="M40 68 C40 68 6 46 6 24 C6 13 15 5 26 9 C31 11 36 17 40 23 C44 17 49 11 54 9 C65 5 74 13 74 24 C74 46 40 68 40 68Z" fill="url(#hg)" />
    </svg>
  );
}

/* ─── Section Divider ───────────────────────────────────────────── */

function Divider({ label }: { label: string }) {
  return (
    <Reveal className="text-center mb-16">
      <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "#b85c6e", marginBottom: 12 }}>
        {label}
      </p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
        <div style={{ flex: 1, maxWidth: 64, height: 1, background: "#f2c4ce" }} />
        <span style={{ color: "#c9a484", fontSize: 14 }}>✦</span>
        <div style={{ flex: 1, maxWidth: 64, height: 1, background: "#f2c4ce" }} />
      </div>
    </Reveal>
  );
}

/* ─── Side Nav Dots ─────────────────────────────────────────────── */

const SECTIONS = ["hero", "apology", "gallery", "admire", "reasons", "promise"];

function SideNav() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = SECTIONS.indexOf(e.target.id);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { threshold: 0.4 }
    );
    SECTIONS.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav style={{ position: "fixed", right: 24, top: "50%", transform: "translateY(-50%)", zIndex: 50, display: "flex", flexDirection: "column", gap: 12 }}
      className="hidden lg:flex">
      {SECTIONS.map((id, i) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          style={{
            width: 10, height: 10, borderRadius: "50%",
            background: active === i ? "#c4687a" : "rgba(196,104,122,0.3)",
            border: "none", cursor: "pointer",
            transform: active === i ? "scale(1.4)" : "scale(1)",
            transition: "background 0.3s, transform 0.3s",
          }}
        />
      ))}
    </nav>
  );
}

/* ─── App ───────────────────────────────────────────────────────── */

export default function App() {
  const [reason, setReason]   = useState<string | null>(null);
  const [count, setCount]     = useState(0);
  const [fading, setFading]   = useState(false);
  const lastIdx = useRef(-1);

  const showReason = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      let idx: number;
      do { idx = Math.floor(Math.random() * REASONS.length); } while (idx === lastIdx.current);
      lastIdx.current = idx;
      setReason(REASONS[idx]);
      setCount((c) => c + 1);
      setFading(false);
    }, 380);
  }, []);

  return (
    <>
      {/* Global keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,700&family=Lato:wght@300;400;700&display=swap');
        @keyframes heartbeat {
          0%,100%{transform:scale(1)} 15%{transform:scale(1.2)} 30%{transform:scale(1)} 45%{transform:scale(1.12)} 60%{transform:scale(1)}
        }
        @keyframes bounceDown {
          0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(10px)}
        }
        ::-webkit-scrollbar{width:6px}
        ::-webkit-scrollbar-track{background:#fdf8f2}
        ::-webkit-scrollbar-thumb{background:#c4687a;border-radius:3px}
        html{scroll-behavior:smooth}
      `}</style>

      <PetalCanvas />
      <SideNav />

      <div style={{ fontFamily: "'Lato', sans-serif", background: "#fdf8f2", color: "#3a2e2e", overflowX: "hidden", position: "relative" }}>

        {/* Ambient gradient overlay */}
        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          background: "radial-gradient(ellipse at 25% 55%, rgba(242,196,206,0.35) 0%, transparent 55%), radial-gradient(ellipse at 80% 15%, rgba(201,164,132,0.18) 0%, transparent 50%)",
        }} />

        {/* ══ 1. HERO ══════════════════════════════════════════════ */}
        <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "96px 24px", zIndex: 1 }}>
          <div style={{ maxWidth: 560 }}>
            <Reveal>
              <div style={{ marginBottom: 28, display: "inline-block" }}>
                <Heart size={72} />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "#b85c6e", opacity: 0.85, marginBottom: 16 }}>
                A heartfelt message
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(3rem, 8vw, 5rem)", lineHeight: 1.15, color: "#3a2e2e", marginBottom: 24 }}>
                A Note for<br /><em style={{ color: "#b85c6e" }}>You</em>
              </h1>
            </Reveal>

            <Reveal delay={0.3}>
              <p style={{ fontSize: 16, color: "#8a7070", lineHeight: 1.8, maxWidth: 340, margin: "0 auto 48px" }}>
                There are things I should have said sooner.<br />
                This is my way of finally saying them.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <p style={{ color: "#c9a484", opacity: 0.75, letterSpacing: 6, fontSize: 16 }}>✦ ✦ ✦</p>
            </Reveal>
          </div>

          {/* Bounce arrow */}
          <a
            href="#apology"
            style={{
              position: "absolute", bottom: 40, left: "50%",
              animation: "bounceDown 1.8s ease-in-out infinite",
              color: "#b85c6e", opacity: 0.6, zIndex: 1,
            }}
            onClick={(e) => { e.preventDefault(); document.getElementById("apology")?.scrollIntoView({ behavior: "smooth" }); }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </section>

        {/* ══ 2. APOLOGY — Stationery ═══════════════════════════════ */}
        <section id="apology" style={{ position: "relative", padding: "112px 24px", zIndex: 1 }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <Divider label="The Apology" />

            <Reveal delay={0}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontStyle: "italic", color: "#3a2e2e", textAlign: "center", marginBottom: 40 }}>
                I owe you these words
              </h2>
            </Reveal>

            <Reveal delay={0.15}>
              <div style={{
                background: "#fff9f3",
                border: "1px solid rgba(196,104,122,0.18)",
                borderRadius: 2,
                boxShadow: "0 4px 48px rgba(196,104,122,0.08), 0 1px 4px rgba(196,104,122,0.06)",
                padding: "48px 40px 48px",
                position: "relative",
                backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, rgba(196,104,122,0.07) 31px, rgba(196,104,122,0.07) 32px)",
                backgroundSize: "100% 32px",
              }}>
                {/* Top color bar */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #c4687a, #c9a484, #c4687a)", borderRadius: "2px 2px 0 0" }} />
                {/* Corner ornaments */}
                <div style={{ position: "absolute", top: 16, left: 16, width: 18, height: 18, borderTop: "1px solid rgba(196,104,122,0.35)", borderLeft: "1px solid rgba(196,104,122,0.35)" }} />
                <div style={{ position: "absolute", top: 16, right: 16, width: 18, height: 18, borderTop: "1px solid rgba(196,104,122,0.35)", borderRight: "1px solid rgba(196,104,122,0.35)" }} />
                <div style={{ position: "absolute", bottom: 16, left: 16, width: 18, height: 18, borderBottom: "1px solid rgba(196,104,122,0.35)", borderLeft: "1px solid rgba(196,104,122,0.35)" }} />
                <div style={{ position: "absolute", bottom: 16, right: 16, width: 18, height: 18, borderBottom: "1px solid rgba(196,104,122,0.35)", borderRight: "1px solid rgba(196,104,122,0.35)" }} />

                <p style={{ fontFamily: "'Lato'", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#8a7070", marginBottom: 28 }}>To you —</p>

                {[
                  "I want to apologize for letting my insecurities cloud how I see us. I got caught in a story that existed entirely in my head one where the past was a threat, when in truth, it was just history that had nothing to do with who you are to me now.",
                  "You deserve someone who celebrates your present, not someone caught up in what came before. You deserve to feel fully trusted, fully seen, and fully safe and I let you down on that. That wasn't fair to you, and I'm genuinely sorry.",
                  "The truth is: I care about you more than my fear. And it took stepping back to realize I had been letting that fear do the talking. That ends here. You are not a risk to manage you are someone I genuinely want to know, cherish, and grow with.",
                  "Thank you for still being here. I don't take that lightly.",
                ].map((para, i) => (
                  <p key={i} style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1rem, 2.2vw, 1.2rem)", color: "#3a2e2e", lineHeight: 1.9, marginBottom: i < 3 ? 24 : 40 }}>
                    {para}
                  </p>
                ))}

                <div style={{ textAlign: "right" }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontStyle: "italic", color: "#b85c6e" }}>With all of me</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ 3. GALLERY — Polaroids ════════════════════════════════ */}
        <section id="gallery" style={{ position: "relative", padding: "112px 24px", zIndex: 1, background: "radial-gradient(ellipse at 60% 50%, rgba(242,196,206,0.18) 0%, transparent 65%)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Divider label="Our Moments" />

            <Reveal>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontStyle: "italic", color: "#3a2e2e", textAlign: "center", marginBottom: 12 }}>
                Memories I hold close
              </h2>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "clamp(14px, 3vw, 32px)", alignItems: "end" }}>
              {PHOTOS.map((photo, i) => (
                <Reveal key={i} delay={i * 0.12}>
                  <div
                    style={{
                      background: "#fff",
                      padding: "12px 12px 44px",
                      boxShadow: "0 8px 32px rgba(60,40,40,0.13), 0 2px 8px rgba(60,40,40,0.07)",
                      transform: `rotate(${photo.rotate}deg)`,
                      marginTop: photo.mt,
                      transition: "transform 0.35s ease, box-shadow 0.35s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "rotate(0deg) scale(1.05)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 48px rgba(60,40,40,0.18)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = `rotate(${photo.rotate}deg)`; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(60,40,40,0.13), 0 2px 8px rgba(60,40,40,0.07)"; }}
                  >
                    {/* Square crop container */}
                    <div style={{ width: "100%", aspectRatio: "1/1", overflow: "hidden", background: "#f0e0e5", position: "relative" }}>
                      <ImageWithFallback
                        src={photo.src}
                        alt={photo.caption}
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: photo.imgRotate ? "135%" : "100%",
                          height: photo.imgRotate ? "135%" : "100%",
                          top: photo.imgRotate ? "-17.5%" : "0",
                          left: photo.imgRotate ? "-17.5%" : "0",
                          objectFit: "cover",
                          transform: photo.imgRotate ? `rotate(${photo.imgRotate}deg)` : "none",
                          transformOrigin: "center center",
                        }}
                      />
                    </div>
                    <p style={{ fontFamily: "'Lato'", fontSize: 12, color: "#8a7070", textAlign: "center", marginTop: 10, letterSpacing: "0.02em" }}>
                      {photo.caption}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <p style={{ textAlign: "center", fontFamily: "'Lato'", fontSize: 11, color: "#8a7070", marginTop: 48, opacity: 0.55, fontStyle: "italic", letterSpacing: "0.05em" }}>
              Every photo a memory. Every memory, mine to keep.
            </p>
          </div>
        </section>

        {/* ══ 4. WHY YOU MATTER ════════════════════════════════════ */}
        <section id="admire" style={{ position: "relative", padding: "112px 24px", zIndex: 1 }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <Divider label="Why You Matter" />

            <Reveal>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontStyle: "italic", color: "#3a2e2e", textAlign: "center", marginBottom: 56 }}>
                The things I see in you
              </h2>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
              {ADMIRE.map((item, i) => (
                <Reveal key={i} delay={(i % 3) * 0.12}>
                  <div
                    style={{
                      background: "#fff9f3",
                      border: "1px solid rgba(196,104,122,0.14)",
                      borderRadius: 4,
                      padding: "28px 28px",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      const d = e.currentTarget as HTMLDivElement;
                      d.style.transform = "translateY(-5px)";
                      d.style.boxShadow = "0 12px 36px rgba(196,104,122,0.12)";
                      d.style.borderColor = "rgba(196,104,122,0.4)";
                    }}
                    onMouseLeave={(e) => {
                      const d = e.currentTarget as HTMLDivElement;
                      d.style.transform = "translateY(0)";
                      d.style.boxShadow = "none";
                      d.style.borderColor = "rgba(196,104,122,0.14)";
                    }}
                  >
                    <div style={{ fontSize: 30, marginBottom: 14 }}>{item.icon}</div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#3a2e2e", marginBottom: 10 }}>{item.title}</h3>
                    <p style={{ fontSize: 14, color: "#8a7070", lineHeight: 1.75 }}>{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 5. REASONS I CARE — Interactive ══════════════════════ */}
        <section id="reasons" style={{ position: "relative", padding: "112px 24px", zIndex: 1, textAlign: "center", background: "radial-gradient(ellipse at 40% 50%, rgba(242,196,206,0.22) 0%, transparent 65%)" }}>
          <div style={{ maxWidth: 520, margin: "0 auto" }}>
            <Divider label="Just for You" />

            <Reveal>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontStyle: "italic", color: "#3a2e2e", marginBottom: 12 }}>
                Reasons I Care
              </h2>
              <p style={{ fontSize: 15, color: "#8a7070", lineHeight: 1.8, marginBottom: 48 }}>
                Every time you press this, a new one appears.<br />
                I have more than I could ever list.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              {/* Message box */}
              <div style={{ minHeight: 80, marginBottom: 32, padding: "0 16px", transition: "opacity 0.38s ease, transform 0.38s ease", opacity: fading ? 0 : 1, transform: fading ? "translateY(8px)" : "translateY(0)" }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.1rem, 3vw, 1.4rem)", fontStyle: "italic", color: "#3a2e2e", lineHeight: 1.6 }}>
                  {reason
                    ? `"${reason}"`
                    : "Press the button and let me tell you something."}
                </p>
              </div>

              <button
                onClick={showReason}
                style={{
                  background: "linear-gradient(135deg, #c4687a, #c9a484)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 2,
                  padding: "14px 40px",
                  fontFamily: "'Lato', sans-serif",
                  fontSize: 13,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(196,104,122,0.3)",
                  transition: "opacity 0.25s, transform 0.25s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.9"; (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.03)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
              >
                Show Me a Reason ✦
              </button>

              {count > 0 && (
                <p style={{ fontFamily: "'Lato'", fontSize: 12, color: "#8a7070", marginTop: 20, letterSpacing: "0.06em" }}>
                  Reason #{count} of many...
                </p>
              )}
            </Reveal>
          </div>
        </section>

        {/* ══ 6. THE PROMISE ═══════════════════════════════════════ */}
        <section id="promise" style={{ position: "relative", padding: "112px 24px", zIndex: 1 }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <Divider label="The Promise" />

            <Reveal>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontStyle: "italic", color: "#3a2e2e", textAlign: "center", marginBottom: 40 }}>
                What I am committing to
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <div style={{
                background: "linear-gradient(135deg, #c4687a 0%, #c9a484 100%)",
                borderRadius: 2,
                padding: "56px clamp(28px, 6vw, 72px)",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 8px 56px rgba(196,104,122,0.25)",
              }}>
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)", pointerEvents: "none" }} />

                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.2rem, 3vw, 1.7rem)", fontStyle: "italic", color: "#fff", lineHeight: 1.7, marginBottom: 36, position: "relative" }}>
                  "I will choose trust over fear.<br />
                  I will see you for exactly who you are <br />
                  not through the lens of my insecurities."
                </p>

                <div style={{ width: 48, height: 1, background: "rgba(255,255,255,0.4)", margin: "0 auto 36px" }} />

                <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "relative" }}>
                  {PROMISES.map((p, i) => (
                    <p key={i} style={{ fontFamily: "'Lato'", fontSize: 14, color: "#fff", opacity: 0.92, lineHeight: 1.7 }}>
                      ✦ &nbsp; {p}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", fontStyle: "italic", color: "#3a2e2e", textAlign: "center", marginTop: 48, lineHeight: 1.8 }}>
                You were never the problem.<br />
                <span style={{ color: "#b85c6e" }}>I was. And I'm choosing to do better.</span>
              </p>
            </Reveal>
          </div>
        </section>

        {/* ══ 7. FOOTER ════════════════════════════════════════════ */}
        <footer style={{ position: "relative", padding: "80px 24px", textAlign: "center", borderTop: "1px solid rgba(242,196,206,0.6)", zIndex: 1 }}>
          <Reveal>
            <div style={{ marginBottom: 20, display: "inline-block", animation: "heartbeat 1.6s ease-in-out infinite" }}>
              <Heart size={36} />
            </div>

            <p style={{ fontFamily: "'Lato'", fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "#8a7070", marginBottom: 16 }}>
              With all the sincerity I have
            </p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ width: 60, height: 1, background: "rgba(196,104,122,0.35)", display: "inline-block", margin: "0 16px" }} />
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontStyle: "italic", color: "#3a2e2e" }}>
                Always, <em style={{ color: "#b85c6e" }}>Me</em>
              </p>
              <span style={{ width: 60, height: 1, background: "rgba(196,104,122,0.35)", display: "inline-block", margin: "0 16px" }} />
            </div>

            <p style={{ fontFamily: "'Lato'", fontSize: 11, color: "#8a7070", marginTop: 32, opacity: 0.55, letterSpacing: "0.1em" }}>
              Made with intention · Just for you
            </p>
            
          </Reveal>
        </footer>

      </div>
    </>
  );
}
