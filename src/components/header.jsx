import { useEffect, useState, useRef, useCallback } from "react";
import "../header.css";
import bgImage from "../assets/monkey-d-luffy.png"; 

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

const ROLES = [
  "Full-Stack Developer",
  "React.js Specialist",
  "UI/UX Enthusiast",
  "Node.js Engineer",
  "WordPress Expert",
];

const TECH_CHIPS_LEFT  = ["React.js", "Node.js", "TypeScript", "Next.js"];
const TECH_CHIPS_RIGHT = ["WordPress", "MongoDB", "Tailwind CSS", "REST APIs"];

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
        <a
          className="hdr-nav__logo"
          href="#intro"
          onClick={(e) => { e.preventDefault(); handleLink("#intro"); }}
        >
          <span className="hdr-nav__logo-bracket">&lt;</span>
          SB
          <span className="hdr-nav__logo-bracket">/&gt;</span>
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

        <a
          className="hdr-nav__cta"
          href="#contact"
          onClick={(e) => { e.preventDefault(); handleLink("#contact"); }}
        >
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
   ROLE TICKER
───────────────────────────────────────── */
function RoleTicker() {
  const [index,   setIndex]   = useState(0);
  const [visible, setVisible] = useState(true);
  const [slide,   setSlide]   = useState("idle"); // "idle" | "out" | "in"

  useEffect(() => {
    const id = setInterval(() => {
      // slide out
      setSlide("out");
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % ROLES.length);
        setSlide("in");
        setVisible(true);
        setTimeout(() => setSlide("idle"), 500);
      }, 350);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hdr-role-wrap">
      <div
        className={`hdr-role-pill hdr-role-pill--${slide}`}
        style={{ opacity: visible ? 1 : 0 }}
      >
        {ROLES[index]}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   HEADER / HERO
───────────────────────────────────────── */
function Header() {
  const [loaded, setLoaded] = useState(false);
  const particleRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Spawn floating particles
  useEffect(() => {
    if (!loaded || !particleRef.current) return;
    const container = particleRef.current;
    for (let i = 0; i < 24; i++) {
      const p = document.createElement("div");
      p.className = "hdr-particle";
      const size = 2 + Math.random() * 4;
      const colors = ["255,107,53", "99,102,241", "34,197,94", "251,191,36"];
      const color  = colors[Math.floor(Math.random() * colors.length)];
      p.style.cssText = `
        width:${size}px;
        height:${size}px;
        background:rgba(${color},${0.4 + Math.random() * 0.5});
        left:${Math.random() * 100}%;
        bottom:${Math.random() * 35}%;
        animation-duration:${3 + Math.random() * 5}s;
        animation-delay:${Math.random() * 5}s;
      `;
      container.appendChild(p);
    }
    return () => { container.innerHTML = ""; };
  }, [loaded]);

  return (
    <>
      <Navbar />

      <section id="intro" className="hdr-section">

        {/* ── BG image layer ── */}
        <div
          className="hdr-bg-image"
          style={{ backgroundImage: `url(${bgImage})` }}
          aria-hidden="true"
        />

        {/* ── Overlays ── */}
        <div className="hdr-overlay"    aria-hidden="true" />
        <div className="hdr-vignette"   aria-hidden="true" />
        <div className="hdr-grid-lines" aria-hidden="true" />

        {/* ── Floating particles ── */}
        <div className="hdr-particles" ref={particleRef} aria-hidden="true" />

        {/* ── Tech chips LEFT ── */}
        <div className="hdr-chips hdr-chips--left" aria-hidden="true">
          {TECH_CHIPS_LEFT.map((chip, i) => (
            <div
              key={chip}
              className="hdr-chip"
              style={{
                animationDuration:  `${3.2 + i * 0.4}s`,
                animationDelay:     `${1.6 + i * 0.2}s`,
              }}
            >
              {chip}
            </div>
          ))}
        </div>

        {/* ── Tech chips RIGHT ── */}
        <div className="hdr-chips hdr-chips--right" aria-hidden="true">
          {TECH_CHIPS_RIGHT.map((chip, i) => (
            <div
              key={chip}
              className="hdr-chip"
              style={{
                animationDuration:  `${3.5 + i * 0.35}s`,
                animationDelay:     `${1.7 + i * 0.2}s`,
              }}
            >
              {chip}
            </div>
          ))}
        </div>

        {/* ══ HERO CONTENT ══ */}
        <div className="hdr-content">

          {/* Badge */}
          <div className={`hdr-badge ${loaded ? "hdr-badge--visible" : ""}`}>
            <span className="hdr-badge__dot" />
            Available for work — Bangalore, India
          </div>

          {/* Hi line */}
          <p className={`hdr-hi ${loaded ? "hdr-hi--visible" : ""}`}>
            Hi, I'm
          </p>

          {/* Name */}
          <h1 className={`hdr-name ${loaded ? "hdr-name--visible" : ""}`}>
            Sourabh<br />
            <span className="hdr-name__accent">Bhaisare</span>
          </h1>

          {/* Role ticker */}
          <div className={`hdr-ticker-wrap ${loaded ? "hdr-ticker-wrap--visible" : ""}`}>
            <RoleTicker />
          </div>

          {/* Description */}
          <p className={`hdr-desc ${loaded ? "hdr-desc--visible" : ""}`}>
            Crafting fast, accessible &amp; beautifully designed web experiences
            with React, Node.js &amp; modern tooling.
          </p>

          {/* CTAs */}
          <div className={`hdr-actions ${loaded ? "hdr-actions--visible" : ""}`}>
            <a
              className="hdr-btn hdr-btn--primary"
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              View My Work
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              className="hdr-btn hdr-btn--ghost"
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              Contact Me
            </a>
          </div>

        </div>

        {/* Scroll cue */}
        <div className={`hdr-scroll-cue ${loaded ? "hdr-scroll-cue--visible" : ""}`}>
          <div className="hdr-scroll-cue__arrows">
            <span /><span />
          </div>
          <span className="hdr-scroll-cue__label">Scroll</span>
        </div>

      </section>
    </>
  );
}

export default Header;
