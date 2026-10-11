import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import "../App.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* Newest first. Bullets are taken from the CV. */
const ARCS = [
  {
    arc: "Arc 03",
    badge: "Current",
    role: "Web Developer",
    company: "IInfotanks",
    place: "Bengaluru",
    period: "May 2025 – Present",
    img: "/image/naruto attack.jpg",
    points: [
      "Ship production features for 11 client brands across WordPress, HubSpot CMS (HubL) and .NET.",
      "Delivered the frontend for 5+ end-to-end website revamps — from design handoff to go-live.",
      "Turn Figma designs into pixel-accurate, responsive React.js and Elementor components.",
      "Add JSON-LD structured data, tune Core Web Vitals, and helped recover and secure a hacked WordPress site.",
    ],
    tags: ["React.js", "WordPress", "HubSpot CMS", "OpenCMS", ".NET", "JSON-LD"],
  },
  {
    arc: "Arc 02",
    badge: "9 months",
    role: "WordPress Developer",
    company: "Digital Flame Marketing Solution",
    place: "Pune",
    period: "Apr 2024 – Jan 2025",
    img: "/image/hinata-vollyball.jpg",
    points: [
      "Built responsive, SEO-friendly client sites with WordPress, Elementor, HTML, CSS and JavaScript.",
      "Improved load times and Core Web Vitals with image optimization, caching and deferred scripts.",
      "Set up Google Analytics and Tag Manager so clients could track traffic and conversions.",
    ],
    tags: ["WordPress", "Elementor", "JavaScript", "Core Web Vitals", "GA / GTM"],
  },
  {
    arc: "Arc 01",
    badge: "6 months",
    role: "WordPress Developer",
    company: "Guest Blogging Pvt. Ltd.",
    place: "Indore",
    period: "Jan 2023 – Jun 2023",
    img: "/image/aasta bg.jpg",
    points: [
      "Built responsive WordPress sites with Elementor from client briefs.",
      "Improved performance and on-page SEO through caching, image optimization and semantic HTML.",
      "Managed themes, plugins, updates and day-to-day site maintenance.",
    ],
    tags: ["WordPress", "Elementor", "On-page SEO", "Core Web Vitals"],
  },
];

function Arc({ data, flip }) {
  return (
    <li className={`xp-arc ${flip ? "xp-arc--flip" : ""}`}>
      <span className="xp-node" aria-hidden="true" />

      <div className="xp-figure">
        <div className="xp-panel">
          <div className="xp-panel__window">
            <img className="xp-panel__img" src={data.img} alt="" loading="lazy" />
            <div className="xp-panel__halftone" aria-hidden="true" />
          </div>
          <span className="xp-badge">{data.badge}</span>
        </div>
      </div>

      <div className="xp-body">
        <p className="xp-meta">
          <span className="xp-arcno">{data.arc}</span>
          <span className="xp-period">{data.period}</span>
        </p>
        <h3 className="xp-role">{data.role}</h3>
        <p className="xp-company">
          {data.company} <span className="xp-place">· {data.place}</span>
        </p>
        <ul className="xp-points">
          {data.points.map((p) => <li key={p}>{p}</li>)}
        </ul>
        <ul className="xp-tags" aria-label="Tools used">
          {data.tags.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </div>
    </li>
  );
}

export default function Experience() {
  const sectionRef = useRef(null);

  /* ── Scroll: heading stamps in, ink spine draws with scroll, arcs land one by one ── */
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      if (reduced) { gsap.set(q(".xp-reveal"), { autoAlpha: 1 }); return; }

      const split = SplitText.create(q(".xp-heading")[0], { type: "words,chars" });
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top 70%", once: true } })
        .set(q(".xp-reveal"), { autoAlpha: 1 })
        .from(q(".xp-chapter"), { autoAlpha: 0, y: -10, duration: 0.3 })
        .from(split.chars, { yPercent: -120, rotationX: -90, autoAlpha: 0, stagger: 0.025, duration: 0.42, ease: "back.out(2)" }, "<")
        .from(q(".xp-sub"), { autoAlpha: 0, y: 14, duration: 0.4 }, "-=0.2");

      // the spine is drawn by the scroll position itself
      gsap.fromTo(q(".xp-spine__ink"), { scaleY: 0 }, {
        scaleY: 1, ease: "none",
        scrollTrigger: { trigger: q(".xp-arcs")[0], start: "top 65%", end: "bottom 65%", scrub: 0.4 },
      });

      q(".xp-arc").forEach((arc) => {
        const a = gsap.utils.selector(arc);
        const fromLeft = !arc.classList.contains("xp-arc--flip");
        gsap.timeline({ scrollTrigger: { trigger: arc, start: "top 72%", once: true } })
          .from(a(".xp-node"), { scale: 0, rotation: -120, duration: 0.45, ease: "back.out(3)" })
          // panel wipes open on a diagonal, then lands with a squash
          .fromTo(a(".xp-panel__window"),
            { clipPath: fromLeft ? "polygon(0 0, 0 0, 0 100%, 0 100%)" : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" },
            { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 0.55, ease: "power4.inOut" }, "-=0.2")
          .from(a(".xp-panel__img"), { scale: 1.4, duration: 0.9, ease: "power3.out" }, "<")
          .from(a(".xp-badge"), { scale: 2.2, rotation: 25, autoAlpha: 0, duration: 0.4, ease: "back.out(3)" }, "-=0.35")
          .from(a(".xp-meta, .xp-role, .xp-company"), { x: fromLeft ? 50 : -50, autoAlpha: 0, stagger: 0.07, duration: 0.45, ease: "power3.out" }, "-=0.55")
          .from(a(".xp-points li"), { x: fromLeft ? 30 : -30, autoAlpha: 0, stagger: 0.08, duration: 0.4, ease: "power2.out" }, "-=0.25")
          .from(a(".xp-tags li"), { scale: 1.8, autoAlpha: 0, rotation: () => gsap.utils.random(-20, 20), stagger: 0.04, duration: 0.3, ease: "back.out(2.6)" }, "-=0.2");
      });
    }, root);

    return () => ctx.revert();
  }, []);

  /* ── 3D tilt: each image panel turns toward the cursor, image drifts inside ── */
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const offs = [];
    root.querySelectorAll(".xp-panel").forEach((panel) => {
      const img = panel.querySelector(".xp-panel__img");
      const rx = gsap.quickTo(panel, "rotationX", { duration: 0.5, ease: "power3.out" });
      const ry = gsap.quickTo(panel, "rotationY", { duration: 0.5, ease: "power3.out" });
      const ix = gsap.quickTo(img, "x", { duration: 0.6, ease: "power3.out" });
      const iy = gsap.quickTo(img, "y", { duration: 0.6, ease: "power3.out" });
      const move = (e) => {
        const r = panel.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry(px * 18); rx(-py * 14); ix(-px * 22); iy(-py * 22);
      };
      const leave = () => { rx(0); ry(0); ix(0); iy(0); };
      panel.addEventListener("pointermove", move);
      panel.addEventListener("pointerleave", leave);
      offs.push(() => { panel.removeEventListener("pointermove", move); panel.removeEventListener("pointerleave", leave); });
    });
    return () => offs.forEach((f) => f());
  }, []);

  return (
    <section className="xp" id="experience" ref={sectionRef}>
      <div className="xp__inner">
        <header className="xp-head">
          <p className="xp-chapter xp-reveal">
            <span className="xp-chapter__jp" aria-hidden="true">第3話</span>
            Experience
          </p>
          <h2 className="xp-heading xp-reveal">The story so far.</h2>
          <p className="xp-sub xp-reveal">
            3+ years shipping fast, responsive websites and apps across
            WordPress, HubSpot CMS, React and React Native.
          </p>
        </header>

        <div className="xp-track">
          <div className="xp-spine" aria-hidden="true"><span className="xp-spine__ink" /></div>
          <ol className="xp-arcs">
            {ARCS.map((a, i) => <Arc data={a} flip={i % 2 === 1} key={a.arc} />)}
          </ol>
        </div>
      </div>
    </section>
  );
}