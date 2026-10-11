import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
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
  "Frontend Developer",
  "React.js Developer",
  "React Native Developer",
  "WordPress Developer",
  "Web Developer",
];

// Orbits the name in the hero's 3D ring
const ORBIT = [
  "React.js", "React Native", "JavaScript", "Node.js", "WordPress",
  "HubSpot CMS", "Tailwind CSS", "MongoDB", "Firebase", "Core Web Vitals",
];

const CV = "/Sourabh-Bhaisare-CV.pdf";

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
    <p className="h3d__role">
      <span className="h3d__role-label">Currently</span>
      <span
        className={`h3d__role-text h3d__role-text--${slide}`}
        style={{ opacity: visible ? 1 : 0 }}
      >
        {ROLES[index]}
      </span>
    </p>
  );
}

/* ─────────────────────────────────────────
   EXTRUDED 3D WORD — stacked layers give real depth when the scene tilts
───────────────────────────────────────── */
const DEPTH = 10;
function Extruded({ text, variant }) {
  return (
    <span className={`h3d-word h3d-word--${variant}`} aria-hidden="true">
      {Array.from({ length: DEPTH }, (_, i) => (
        <span className="h3d-word__layer" style={{ "--z": DEPTH - i }} key={i}>{text}</span>
      ))}
      <span className="h3d-word__face">{text}</span>
    </span>
  );
}

/* ─────────────────────────────────────────
   HEADER / HERO
───────────────────────────────────────── */
function Header() {
  const heroRef  = useRef(null);
  const stageRef = useRef(null);
  const bgRef    = useRef(null);
  const nameRef  = useRef(null);
  const itemRefs = useRef([]);
  const introRef = useRef({ v: 0 });            // 0 → 1, fades the orbit in (driven by the GSAP timeline)

  /* ── Load sequence: anime slam → hit-stop → impact frame → ドン → shake ── */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(hero);
      if (reduced) {
        gsap.set(q(".h3d__slam"), { clearProps: "transform" });
        gsap.set(q(".h3d__sticker, .h3d__caption, .h3d__actions, .h3d__hint"), { autoAlpha: 1 });
        gsap.set(q(".h3d__don"), { autoAlpha: 1, scale: 1, rotation: 12 });
        gsap.set(q(".h3d__speed"), { autoAlpha: 0.6 });
        introRef.current.v = 1;
        return;
      }

      const slam = (target) => [
        [target, { y: "-140vh", rotationX: 70, scale: 1.6 },
                 { y: 0, rotationX: 0, scale: 1, duration: 0.36, ease: "power4.in" }],
        // landing squash, then rubbery settle
        [target, { scaleY: 0.82, scaleX: 1.08, transformOrigin: "50% 100%", duration: 0.05, ease: "none" }],
        [target, { scaleY: 1, scaleX: 1, duration: 0.6, ease: "elastic.out(1, 0.35)" }],
      ];

      const tl = gsap.timeline({ delay: 0.25 });
      const [a1, a2, a3] = slam(q(".h3d__slam--1"));
      tl.fromTo(...a1).to(...a2).to(...a3);
      const [b1, b2, b3] = slam(q(".h3d__slam--2"));
      tl.fromTo(b1[0], b1[1], b1[2], 0.42).to(...b2);

      tl.addLabel("impact")
        // hit-stop: everything holds for a beat before the hit lands
        .to({}, { duration: 0.08 })
        // impact frame: inverted, desaturated, speed lines, ドン at full size
        .set(hero, { filter: "grayscale(1) contrast(2.2) invert(1)" })
        .set(q(".h3d__impact"), { visibility: "visible" })
        .set(q(".h3d__don"), { autoAlpha: 1, scale: 2.4, rotation: -10 })
        .to({}, { duration: 0.1 })
        .set(q(".h3d__impact"), { visibility: "hidden" })
        .set(hero, { clearProps: "filter" })
        .to(b3[0], b3[1])
        .to(q(".h3d__don"), { scale: 1, rotation: 12, duration: 0.5, ease: "back.out(2.6)" }, "<")
        .fromTo(q(".h3d__name"), { x: 0, y: 0 }, {
          keyframes: [{ x: -12, y: 6 }, { x: 10, y: -7 }, { x: -6, y: 4 }, { x: 3, y: -2 }, { x: 0, y: 0 }],
          duration: 0.34, ease: "none",
        }, "<")
        .fromTo(q(".h3d__speed"), { autoAlpha: 0, scale: 0.55 }, { autoAlpha: 0.7, scale: 1, duration: 0.9, ease: "expo.out" }, "<")
        .fromTo(q(".h3d__sticker"), { autoAlpha: 0, scale: 1.9, rotation: 14 },
                                     { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.42, ease: "back.out(3)" }, "-=0.55")
        .fromTo(q(".h3d__caption"), { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.2")
        .fromTo(q(".h3d__actions"), { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.35")
        .to(introRef.current, { v: 1, duration: 0.9, ease: "power2.out" }, "-=0.7")
        .fromTo(q(".h3d__hint"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, "-=0.2");
    }, hero);

    return () => ctx.revert();
  }, []);

  /* ── Rubber buttons: squash-and-stretch on hover, press down on click ── */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const btns = [...hero.querySelectorAll(".h3d__btn")];
    const offs = [];
    btns.forEach((b) => {
      const enter = () => {
        gsap.timeline()
          .to(b, { scaleX: 1.14, scaleY: 0.86, duration: 0.09, ease: "power2.out" })
          .to(b, { scaleX: 1, scaleY: 1, duration: 0.75, ease: "elastic.out(1.15, 0.28)" });
      };
      const down = () => gsap.to(b, { x: 5, y: 5, duration: 0.06, ease: "power2.out" });
      const up   = () => gsap.to(b, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.4)" });
      b.addEventListener("pointerenter", enter);
      b.addEventListener("pointerdown", down);
      b.addEventListener("pointerup", up);
      b.addEventListener("pointerleave", up);
      offs.push(() => {
        b.removeEventListener("pointerenter", enter);
        b.removeEventListener("pointerdown", down);
        b.removeEventListener("pointerup", up);
        b.removeEventListener("pointerleave", up);
      });
    });
    return () => { offs.forEach((f) => f()); gsap.killTweensOf(btns); };
  }, []);

  /* Mouse tilt + orbiting stack + drag-to-spin, one rAF loop */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const target = { x: 0, y: 0 };
    const cur    = { x: 0, y: 0 };
    let angle = 0, prevAngle = 0, spin = 0;
    let dragging = false, lastX = 0, raf = 0, running = true;
    const start = performance.now();

    // Ring geometry: wide ellipse around the name, front half passes below
    // the letters and the back half passes above/behind them.
    let geo = { rx: 500, ry: 150, rz: 260, cy: 0 };
    const measure = () => {
      const w = hero.clientWidth;
      const nameEl = nameRef.current;
      const nh = nameEl ? nameEl.offsetHeight / 2 : 120;
      const nw = nameEl ? nameEl.querySelector(".h3d__name").offsetWidth / 2 : 400;
      if (w < 640) {
        // phones: a flat turntable spinning just below the name
        const rx = w * 0.34;
        geo = { rx, ry: 14, rz: rx * 0.7, cy: nh + 30 };
      } else {
        const rx = Math.min(Math.max(nw + 90, w * 0.34), w * 0.46);
        geo = { rx, ry: nh + 34, rz: rx * 0.5, cy: 0 };
      }
    };
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);

    const placeItems = () => {
      const { rx, ry, rz, cy } = geo;
      const n = itemRefs.current.length;
      const intro = introRef.current.v;
      const dv = angle - prevAngle;                    // angular speed this frame
      prevAngle = angle;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const th = angle + (i / n) * Math.PI * 2;
        const x = Math.sin(th) * rx;
        const z = Math.cos(th) * rz;
        const y = cy + Math.cos(th) * ry;
        const front = (Math.cos(th) + 1) / 2;          // 0 back … 1 front
        el.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
        el.style.opacity = String((0.25 + 0.75 * front) * intro);
        el.dataset.front = front > 0.5 ? "1" : "0";
        // smear frame: fast spins leave a streak behind each label
        const vx = Math.cos(th) * rx * dv;               // px moved sideways this frame
        if (Math.abs(vx) > 3) {
          const k = Math.min(Math.abs(vx), 40) * Math.sign(vx);
          el.style.textShadow = `${-k * 0.6}px 0 0 rgba(246,196,69,.55), ${-k * 1.2}px 0 0 rgba(200,16,46,.35)`;
          el.style.filter = `blur(${Math.min(Math.abs(vx) * 0.04, 1.6)}px)`;
        } else if (el.style.textShadow) {
          el.style.textShadow = "";
          el.style.filter = "";
        }
      });
    };

    if (reduced) {
      introRef.current.v = 1;
      placeItems();
      return () => window.removeEventListener("resize", measure);
    }

    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (dragging) {
        const dx = e.clientX - lastX;
        lastX = e.clientX;
        angle += dx * 0.006;
        spin = dx * 0.0009;
      }
    };
    const onLeave = () => { target.x = 0; target.y = 0; dragging = false; };
    const onDown = (e) => {
      if (e.target.closest("a, button")) return;
      dragging = true; lastX = e.clientX;
      hero.classList.add("h3d--grabbing");
    };
    const onUp = () => { dragging = false; hero.classList.remove("h3d--grabbing"); };

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    hero.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    const loop = (now) => {
      if (!running) return;
      const t = now - start;

      if (!finePointer) {                         // touch: gentle sway instead of mouse
        target.x = Math.sin(t / 2600) * 0.45;
        target.y = Math.cos(t / 3400) * 0.3;
      }
      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;

      if (stageRef.current) {
        stageRef.current.style.transform =
          `rotateX(${(-cur.y * 9).toFixed(3)}deg) rotateY(${(cur.x * 14).toFixed(3)}deg)`;
      }
      if (bgRef.current) {
        bgRef.current.style.transform =
          `translate3d(${(-cur.x * 28).toFixed(2)}px, ${(-cur.y * 18).toFixed(2)}px, 0) scale(1.1)`;
      }

      if (!dragging) {
        angle += 0.0042 + spin;
        spin *= 0.95;
      }
      placeItems();
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([e]) => {
      const vis = e.isIntersecting && !document.hidden;
      if (vis && !running) { running = true; raf = requestAnimationFrame(loop); }
      if (!vis) { running = false; cancelAnimationFrame(raf); }
    });
    io.observe(hero);
    raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      hero.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const goTo = (e, id) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar />

      <section id="intro" ref={heroRef} className="h3d">
        {/* ── Background: your image, parallaxed ── */}
        <div className="h3d__bg" ref={bgRef} style={{ backgroundImage: `url(${bgImage})` }} aria-hidden="true" />
        <div className="h3d__shade"    aria-hidden="true" />
        <div className="h3d__speed"    aria-hidden="true" />
        <div className="h3d__halftone" aria-hidden="true" />

        <p className="h3d__vertical" aria-hidden="true">フロントエンド開発者</p>

        {/* ── 3D scene ── */}
        <div className="h3d__scene">
          <div className="h3d__stage" ref={stageRef}>

            <div className="h3d__depth h3d__depth--sticker">
              <p className="h3d__sticker">
                <span className="h3d__sticker-dot" />
                Open to work in Bengaluru
              </p>
            </div>

            <div className="h3d__namewrap" ref={nameRef}>
            <span className="h3d__don-wrap" aria-hidden="true"><span className="h3d__don">ドン</span></span>
            <h1 className="h3d__name" aria-label="Sourabh Bhaisare">
              <span className="h3d__slam h3d__slam--1"><Extruded text="SOURABH" variant="solid" /></span>
              <span className="h3d__slam h3d__slam--2"><Extruded text="BHAISARE" variant="ink" /></span>
            </h1>

            <ul className="h3d__orbit" aria-label="Tech stack">
              {ORBIT.map((tech, i) => (
                <li className="h3d__orbit-item" key={tech} ref={(el) => (itemRefs.current[i] = el)}>
                  {tech}
                </li>
              ))}
            </ul>
            </div>

            <div className="h3d__depth h3d__depth--caption">
              <div className="h3d__caption">
                <RoleTicker />
                <p className="h3d__lead">
                  I build fast, responsive websites and apps with React.js,
                  React Native and WordPress — from Figma handoff to go&#8209;live.
                </p>
              </div>
            </div>

            <div className="h3d__depth h3d__depth--actions">
              <div className="h3d__actions">
                <a className="h3d__btn h3d__btn--primary" href="#projects" onClick={(e) => goTo(e, "#projects")}>
                  See my work
                </a>
                <a className="h3d__btn h3d__btn--ghost" href={CV} download>
                  Download CV
                </a>
              </div>
            </div>

          </div>
        </div>

        <p className="h3d__hint" aria-hidden="true">Drag to spin the stack</p>

        {/* impact frame: shown for ~0.1s when the name lands */}
        <div className="h3d__impact" aria-hidden="true" />
      </section>
    </>
  );
}

export default Header;