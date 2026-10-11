import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import "../App.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* Each reason is backed by something on the CV.
   sfx = manga sound effect drawn in the panel corner (decorative). */
const REASONS = [
  {
    title: "Figma to pixel-accurate code",
    desc: "Responsive builds for desktop, tablet and mobile, backed by a library of reusable React.js and Elementor components.",
    sfx: "キラッ",
    icon: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />,
  },
  {
    title: "Core Web Vitals first",
    desc: "Lazy loading, code splitting, caching and image optimization — with Lighthouse and Core Web Vitals as the benchmark.",
    sfx: "シュッ",
    icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
  },
  {
    title: "Web and mobile",
    desc: "Built Naimo in React Native and Expo and took it through App Store and Google Play review.",
    sfx: "ピコン",
    icon: <><rect x="6" y="2" width="12" height="20" rx="2.5" /><path d="M11 18h2" /></>,
  },
  {
    title: "Works well in a team",
    desc: "Day-to-day with design, content, SEO and QC in an Agile setup, turning QC feedback around fast.",
    sfx: "ワイワイ",
    icon: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></>,
  },
  {
    title: "Ships at agency pace",
    desc: "Production work for 11 client brands and the frontend for 5+ full website revamps, from design handoff to go-live.",
    sfx: "ドドド",
    icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
  },
  {
    title: "SEO and security built in",
    desc: "JSON-LD schema for Google and AI search, plus WordPress hardening — including securing a hacked site.",
    sfx: "ガシッ",
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  },
];

const STATS = [
  { value: 3,  suffix: "+", label: "years shipping" },
  { value: 11, suffix: "",  label: "client brands" },
  { value: 5,  suffix: "+", label: "site revamps" },
];

export default function WhyHireMe() {
  const sectionRef = useRef(null);

  /* ── Scroll-in: panels ink in, in reading order ── */
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      if (reduced) { gsap.set(q(".wm-reveal"), { autoAlpha: 1 }); return; }

      const split = SplitText.create(q(".wm-heading")[0], { type: "words,chars" });
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top 70%", once: true } })
        .set(q(".wm-reveal"), { autoAlpha: 1 })
        .from(q(".wm-chapter"), { autoAlpha: 0, y: -10, duration: 0.3 })
        .from(split.chars, { yPercent: -120, rotationX: -90, autoAlpha: 0, stagger: 0.025, duration: 0.42, ease: "back.out(2)" }, "<")
        .from(q(".wm-lead"), { autoAlpha: 0, y: 14, duration: 0.4 }, "-=0.2");

      // wipe directions vary so the page feels hand-assembled
      const wipes = [
        "inset(0 0 100% 0)", "inset(0 100% 0 0)", "inset(0 0 0 100%)",
        "inset(100% 0 0 0)", "inset(0 100% 0 0)", "inset(0 0 100% 0)",
        "inset(0 0 0 100%)", "inset(100% 0 0 0)",
      ];
      const panels = q(".wm-panel");
      const tl = gsap.timeline({ scrollTrigger: { trigger: q(".wm-page")[0], start: "top 75%", once: true } });
      panels.forEach((p, i) => {
        tl.fromTo(p, { clipPath: wipes[i % wipes.length] }, { clipPath: "inset(0 0 0 0)", duration: 0.5, ease: "power3.inOut" }, i * 0.12);
      });
      tl.from(q(".wm-figure img"), { scale: 1.35, duration: 1, ease: "power3.out" }, 0)
        .from(q(".wm-sfx"), { scale: 2.4, rotation: -30, autoAlpha: 0, stagger: 0.08, duration: 0.35, ease: "back.out(3)" }, 0.5)
        .from(q(".wm-stat"), { scale: 0, rotation: -60, stagger: 0.12, duration: 0.5, ease: "back.out(2.4)" }, 0.35);

      // stats count up
      q(".wm-stat__num").forEach((el) => {
        const end = Number(el.dataset.value);
        const suffix = el.dataset.suffix || "";
        const o = { v: 0 };
        tl.to(o, {
          v: end, duration: 0.9, ease: "power2.out",
          onUpdate: () => { el.textContent = Math.round(o.v) + suffix; },
        }, 0.4);
      });
    }, root);

    return () => ctx.revert();
  }, []);

  /* ── 3D: a panel lifts toward you and follows the cursor ── */
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const offs = [];
    root.querySelectorAll(".wm-tilt").forEach((el) => {
      const rx = gsap.quickTo(el, "rotationX", { duration: 0.45, ease: "power3.out" });
      const ry = gsap.quickTo(el, "rotationY", { duration: 0.45, ease: "power3.out" });
      const z  = gsap.quickTo(el, "z",         { duration: 0.45, ease: "power3.out" });
      const move = (e) => {
        const r = el.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 12);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 12);
        z(36);
      };
      const leave = () => { rx(0); ry(0); z(0); };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      offs.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); });
    });
    return () => offs.forEach((f) => f());
  }, []);

  return (
    <section className="wm" id="whyhireme" ref={sectionRef}>
      <div className="wm__inner">
        <header className="wm-head">
          <p className="wm-chapter wm-reveal">
            <span className="wm-chapter__jp" aria-hidden="true">第5話</span>
            Why me
          </p>
          <h2 className="wm-heading wm-reveal">Why bring me on board.</h2>
          <p className="wm-lead wm-reveal">
            I care as much about Core Web Vitals, clean architecture and SEO as
            about how an interface looks. Here's what that means in practice.
          </p>
        </header>

        <div className="wm-page">
          {/* lead panel: image + stat bursts */}
          <div className="wm-cell wm-cell--figure">
            <div className="wm-tilt">
              <figure className="wm-panel wm-figure">
                <img src="/image/Asta.jpg" alt="" loading="lazy" />
                <span className="wm-figure__halftone" aria-hidden="true" />
              </figure>
              <ul className="wm-stats" aria-label="At a glance">
                {STATS.map((s, i) => (
                  <li className={`wm-stat wm-stat--${i + 1}`} key={s.label}>
                    <span className="wm-stat__num" data-value={s.value} data-suffix={s.suffix}>
                      {s.value}{s.suffix}
                    </span>
                    <span className="wm-stat__label">{s.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {REASONS.map((r, i) => (
            <div className={`wm-cell wm-cell--r${i + 1}`} key={r.title}>
              <div className="wm-tilt">
                <article className="wm-panel wm-reason">
                  <span className="wm-sfx" aria-hidden="true"><span className="wm-sfx__text">{r.sfx}</span></span>
                  <svg className="wm-icon" width="30" height="30" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {r.icon}
                  </svg>
                  <h3 className="wm-reason__title">{r.title}</h3>
                  <p className="wm-reason__desc">{r.desc}</p>
                </article>
              </div>
            </div>
          ))}

          {/* closing panel */}
          <div className="wm-cell wm-cell--cta">
            <div className="wm-panel wm-cta">
              <p className="wm-cta__line">Got a site or app to build?</p>
              <div className="wm-cta__actions">
                <a href="#contact" className="wm-btn wm-btn--primary">Let's work together</a>
                <a href="#projects" className="wm-btn wm-btn--ghost">See my work</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}