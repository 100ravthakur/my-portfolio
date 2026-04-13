import { useEffect, useState, useRef, useCallback } from "react";
import "../App.css";
import "../header.css";

import luffyImg from "../assets/luffy.png";
import zoroImg  from "../assets/zoro.png";
import sanjiImg from "../assets/sanji.png";

/* ─────────────────────────────────────────
   NAV LINKS
───────────────────────────────────────── */
const navLinks = [
  { label: "Home",       href: "#intro" },
  { label: "Skills",     href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects" },
  { label: "Why Me",     href: "#whyhireme" },
  { label: "Contact",    href: "#contact" },
];

/* ─────────────────────────────────────────
   NAVBAR
───────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState("#intro");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navLinks.map((l) => document.querySelector(l.href));
      const idx = sections.reduce((acc, el, i) => {
        if (!el) return acc;
        return el.getBoundingClientRect().top <= 120 ? i : acc;
      }, 0);
      setActive(navLinks[idx]?.href || "#intro");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLink = (href) => {
    setActive(href);
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`hdr-nav ${scrolled ? "hdr-nav--scrolled" : ""}`}>
      <div className="hdr-nav__inner">
        <a className="hdr-nav__logo" href="#intro" onClick={(e) => { e.preventDefault(); handleLink("#intro"); }}>
          <span className="hdr-nav__logo-bracket">&lt;</span>SB<span className="hdr-nav__logo-bracket">/&gt;</span>
        </a>
        <ul className="hdr-nav__links">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                className={`hdr-nav__link ${active === l.href ? "hdr-nav__link--active" : ""}`}
                href={l.href}
                onClick={(e) => { e.preventDefault(); handleLink(l.href); }}
              >
                {l.label}
                <span className="hdr-nav__link-dot" />
              </a>
            </li>
          ))}
        </ul>
        <a className="hdr-nav__cta" href="#contact"
          onClick={(e) => { e.preventDefault(); handleLink("#contact"); }}>
          Hire Me
        </a>
        <button
          className={`hdr-nav__burger ${menuOpen ? "hdr-nav__burger--open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
      <div className={`hdr-nav__drawer ${menuOpen ? "hdr-nav__drawer--open" : ""}`}>
        {navLinks.map((l) => (
          <a
            key={l.href}
            className={`hdr-nav__drawer-link ${active === l.href ? "hdr-nav__drawer-link--active" : ""}`}
            href={l.href}
            onClick={(e) => { e.preventDefault(); handleLink(l.href); }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────
   GLASS BREAK HELPERS
───────────────────────────────────────── */

function generateShards(cx, cy, count = 24) {
  const shards = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
    const dist  = 20 + Math.random() * 60;
    const size  = 18 + Math.random() * 52;
    const sx    = cx + Math.cos(angle) * dist * 0.3;
    const sy    = cy + Math.sin(angle) * dist * 0.3;
    const tx    = Math.cos(angle) * (100 + Math.random() * 220);
    const ty    = Math.sin(angle) * (100 + Math.random() * 200) + Math.random() * 80;

    const sides = Math.random() > 0.4 ? 3 : 4;
    const pts = [];
    for (let s = 0; s < sides; s++) {
      const a2 = (s / sides) * Math.PI * 2 + (Math.random() - 0.5) * 1.2;
      const r2 = size * (0.35 + Math.random() * 0.65);
      pts.push([r2 * Math.cos(a2), r2 * Math.sin(a2)]);
    }
    const clipPath = `polygon(${pts.map(([x, y]) =>
      `${50 + (x / size) * 50}% ${50 + (y / size) * 50}%`
    ).join(',')})`;

    shards.push({
      id: i,
      left: `${sx}px`, top: `${sy}px`,
      width: `${size}px`, height: `${size}px`,
      clipPath,
      tx: `${tx}px`, ty: `${ty}px`,
      rot: `${-180 + Math.random() * 360}deg`,
      sc: 0.1 + Math.random() * 0.3,
      dur: `${0.8 + Math.random() * 0.7}s`,
      delay: `${Math.random() * 0.15}s`,
    });
  }
  return shards;
}

function buildCracks(cx, cy, W, H) {
  const lines = [];
  const count = 8;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
    const len   = 90 + Math.random() * 150;
    let x = cx, y = cy;
    let d = `M ${x} ${y}`;
    const segs = 3 + Math.floor(Math.random() * 2);
    for (let s = 0; s < segs; s++) {
      const segLen = len / segs;
      const jitter = (Math.random() - 0.5) * 30;
      x += Math.cos(angle) * segLen + Math.cos(angle + Math.PI / 2) * jitter;
      y += Math.sin(angle) * segLen + Math.sin(angle + Math.PI / 2) * jitter;
      d += ` L ${x} ${y}`;
    }
    lines.push({ id: i, d });

    if (Math.random() > 0.35) {
      const ba = angle + (Math.random() - 0.5) * 1.2;
      const bLen = 40 + Math.random() * 70;
      const mx = cx + Math.cos(angle) * len * 0.35;
      const my = cy + Math.sin(angle) * len * 0.35;
      lines.push({
        id: i + 100,
        d: `M ${mx} ${my} L ${mx + Math.cos(ba) * bLen} ${my + Math.sin(ba) * bLen}`,
      });
    }
  }
  return lines;
}

/* ─────────────────────────────────────────
   HEADER / HERO
───────────────────────────────────────── */
function Header() {
  const [loaded,      setLoaded]      = useState(false);
  const [glassActive, setGlassActive] = useState(false);
  const [shards,      setShards]      = useState([]);
  const [cracks,      setCracks]      = useState([]);
  const [impactPos,   setImpactPos]   = useState({ x: "50%", y: "52%" });
  const [wave1,       setWave1]       = useState(false);
  const [wave2,       setWave2]       = useState(false);
  const [flash,       setFlash]       = useState(false);
  const [shake,       setShake]       = useState(false);

  const particleRef = useRef(null);
  const sectionRef  = useRef(null);
  const glassTimer  = useRef(null);
  const loopTimer   = useRef(null);
  const busyRef     = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!loaded || !particleRef.current) return;
    const container = particleRef.current;
    for (let i = 0; i < 18; i++) {
      const p = document.createElement("div");
      p.className = "hdr-fire-particle";
      const size = Math.random() * 14 + 5;
      p.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random() * 100}%;
        animation-delay:${Math.random() * 2}s;
        animation-duration:${0.8 + Math.random() * 1}s;
      `;
      container.appendChild(p);
    }
    return () => { container.innerHTML = ""; };
  }, [loaded]);

  const triggerGlass = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;

    const section = sectionRef.current;
    const W = section?.offsetWidth  || window.innerWidth;
    const H = section?.offsetHeight || window.innerHeight;
    const cx = W * (0.2 + Math.random() * 0.6);
const cy = H * (0.2 + Math.random() * 0.6);

    setShards(generateShards(cx, cy, 24));
    setCracks(buildCracks(cx, cy, W, H));
    setImpactPos({ x: `${(cx / W) * 100}%`, y: `${(cy / H) * 100}%` });

    setGlassActive(true);
    setFlash(true);
    setWave1(true);
    setShake(true);

    setTimeout(() => setWave2(true),  100);
    setTimeout(() => setFlash(false), 500);
    setTimeout(() => setShake(false), 500);
    setTimeout(() => {
      setGlassActive(false);
      setWave1(false);
      setWave2(false);
      setShards([]);
      setCracks([]);
      busyRef.current = false;
    }, 2700);
  }, []);

  // Auto-trigger: fires ~1.4s after Luffy drops in, then every 6s
  useEffect(() => {
    if (!loaded) return;
    glassTimer.current = setTimeout(() => {
      triggerGlass();
      loopTimer.current = setInterval(triggerGlass, 6000);
    }, 1400);
    return () => {
      clearTimeout(glassTimer.current);
      clearInterval(loopTimer.current);
    };
  }, [loaded, triggerGlass]);

  return (
    <>
      <Navbar />

      <section
        id="intro"
        ref={sectionRef}
        className={`hdr-section ${shake ? "hdr-section--shake" : ""}`}
      >
        {/* ── background ── */}
        <div className="hdr-bg" aria-hidden="true">
          <div className="hdr-bg__grid" />
          <div className="hdr-bg__radial hdr-bg__radial--orange" />
          <div className="hdr-bg__radial hdr-bg__radial--green" />
          <div className="hdr-bg__radial hdr-bg__radial--gold" />
        </div>

        {/* ══ GLASS BREAK LAYER ══ */}

        {/* Impact flash */}
        <div
          className={`hdr-impact-flash ${flash ? "hdr-impact-flash--active" : ""}`}
          style={{ "--fx": impactPos.x, "--fy": impactPos.y }}
          aria-hidden="true"
        />

        {/* Shockwave ring 1 */}
        <div
          className={`hdr-shockwave ${wave1 ? "hdr-shockwave--active" : ""}`}
          style={{ left: impactPos.x, top: impactPos.y, width: "60px", height: "60px" }}
          aria-hidden="true"
        />
        {/* Shockwave ring 2 */}
        <div
          className={`hdr-shockwave hdr-shockwave--2 ${wave2 ? "hdr-shockwave--active" : ""}`}
          style={{ left: impactPos.x, top: impactPos.y, width: "80px", height: "80px" }}
          aria-hidden="true"
        />

        {/* Crack lines */}
        {cracks.length > 0 && (
          <svg
            className={`hdr-crack-svg ${glassActive ? "hdr-crack-svg--active" : ""}`}
            viewBox={`0 0 ${sectionRef.current?.offsetWidth || 1440} ${sectionRef.current?.offsetHeight || 900}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {cracks.map((c) => (
              <path key={c.id} className="hdr-crack-line" d={c.d} />
            ))}
          </svg>
        )}

        {/* Glass shards */}
        {shards.map((s) => (
          <div
            key={s.id}
            className={`hdr-shard ${glassActive ? "hdr-shard--fly" : ""}`}
            style={{
              left: s.left, top: s.top,
              width: s.width, height: s.height,
              clipPath: s.clipPath,
              "--tx": s.tx, "--ty": s.ty,
              "--rot": s.rot, "--sc": s.sc,
              "--dur": s.dur, "--delay": s.delay,
            }}
            aria-hidden="true"
          />
        ))}

        {/* ══ THREE-COLUMN LAYOUT ══ */}
        <div className="hdr-layout">

          {/* ── LEFT COL: Zoro ── */}
          <div className="hdr-col--left">
            <div className={`hdr-char hdr-char--zoro ${loaded ? "hdr-char--zoro-in" : ""}`}>
              <div className="hdr-char__aura hdr-char__aura--zoro" />
              <img src={zoroImg} alt="Zoro" className="hdr-char__img" draggable={false} />
              <div className="hdr-char__shadow hdr-char__shadow--zoro" />
            </div>
          </div>

          {/* ── CENTER COL: Content + Luffy ── */}
          <div className="hdr-col--center">

            {/* Luffy sits behind text; click to manually punch */}
            <div
              className={`hdr-char hdr-char--luffy ${loaded ? "hdr-char--luffy-in" : ""}`}
              aria-hidden="true"
              onClick={triggerGlass}
              style={{ cursor: "pointer", pointerEvents: "auto" }}
              title="Click to punch!"
            >
              <div className="hdr-char__aura hdr-char__aura--luffy" />
              <img src={luffyImg} alt="Luffy" className="hdr-char__img" draggable={false} />
              <div className="hdr-char__shadow hdr-char__shadow--luffy" />
            </div>

            {/* Top: badge */}
            <div className={`hdr-text-top ${loaded ? "hdr-text-top--visible" : ""}`}>
              <span className="hdr-badge">
                <span className="hdr-badge__dot" />
                Available for work — Bangalore, India
              </span>
            </div>

            {/* Middle: name ONE LINE + role */}
            <div className={`hdr-text-center ${loaded ? "hdr-text-center--visible" : ""}`}>
              <p className="hdr-subtitle">Hi, I'm</p>
              <h1 className="hdr-title">
                Sourabh <br></br><span className="hdr-title__last">Bhaisare</span>
              </h1>
              <p className="hdr-role">Full-Stack Developer</p>
            </div>

            {/* Bottom: desc + CTAs */}
            <div className={`hdr-text-bottom ${loaded ? "hdr-text-bottom--visible" : ""}`}>
              <p className="hdr-desc">
                Skilled in React.js, JavaScript, Node.js &amp; WordPress —
                building fast, responsive, user-focused experiences.
              </p>
              {/* <div className="hdr-actions">
                <a className="hdr-btn hdr-btn--primary" href="#projects"
                  onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}>
                  View My Work
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a className="hdr-btn hdr-btn--ghost" href="#contact"
                  onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}>
                  Contact Me
                </a>
              </div> */}
            </div>

          </div>

          {/* ── RIGHT COL: Sanji ── */}
          <div className="hdr-col--right">
            <div className={`hdr-char hdr-char--sanji ${loaded ? "hdr-char--sanji-in" : ""}`}>
              <div className="hdr-fire-wrap" ref={particleRef} />
              <div className="hdr-char__aura hdr-char__aura--sanji" />
              <img src={sanjiImg} alt="Sanji" className="hdr-char__img" draggable={false} />
              <div className="hdr-char__shadow hdr-char__shadow--sanji" />
            </div>
          </div>

        </div>

        {/* Scroll cue */}
        <div className={`hdr-scroll-cue ${loaded ? "hdr-scroll-cue--visible" : ""}`}>
          <div className="hdr-scroll-cue__arrow">
            <span />
            <span />
          </div>
          <span className="hdr-scroll-cue__label">Scroll</span>
        </div>

      </section>
    </>
  );
}

export default Header;