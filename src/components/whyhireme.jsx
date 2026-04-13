import { useEffect, useRef, useState } from "react";
import "../App.css";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const whmReasons = [
  {
    id: 1,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Pixel-Perfect Execution",
    desc: "I transform designs into flawless, responsive interfaces — every shadow, spacing, and micro-interaction exactly as intended.",
  },
  {
    id: 2,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Performance Obsessed",
    desc: "Fast loading, lazy loading, code splitting — I engineer experiences that feel instant on every device.",
  },
  {
    id: 3,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
        <path
          d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Animation & Motion",
    desc: "From subtle hover states to complex scroll-driven narratives — motion that communicates and delights.",
  },
  {
    id: 4,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
        <path
          d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Clear Communication",
    desc: "Daily updates, clean documentation, and proactive problem-solving — you'll always know where the project stands.",
  },
  {
    id: 5,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <polyline
          points="22 12 18 12 15 21 9 3 6 12 2 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Deadline Reliable",
    desc: "Delivering across freelance and full-time roles on schedule. Shipping on time isn't a goal — it's a standard.",
  },
  {
    id: 6,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Clean, Scalable Code",
    desc: "Modular components, semantic HTML — code your future teammates will actually enjoy inheriting.",
  },
];

const whmStats = [
  { value: "2+",  label: "Years Experience" },
  { value: "4",   label: "Live Projects" },
  { value: "90+", label: "Lighthouse Score" },
];

/* ─────────────────────────────────────────
   REASON ITEM
───────────────────────────────────────── */
function WhmReason({ data, index, visible }) {
  return (
    <div
      className={`whm-reason ${visible ? "whm-reason--visible" : ""}`}
      style={{ "--whm-delay": `${0.1 + index * 0.1}s` }}
    >
      <div className="whm-reason__icon">{data.icon}</div>
      <div className="whm-reason__text">
        <h3 className="whm-reason__title">{data.title}</h3>
        <p className="whm-reason__desc">{data.desc}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
function WHM() {
  const sectionRef = useRef(null);
  const imgRef     = useRef(null);
  const contentRef = useRef(null);
  const reasonRefs = useRef([]);

  const [imgVis,     setImgVis]     = useState(false);
  const [contentVis, setContentVis] = useState(false);
  const [reasonVis,  setReasonVis]  = useState(
    Array(whmReasons.length).fill(false)
  );

  useEffect(() => {
    const observers = [];

    const obs = (ref, setter) => {
      if (!ref.current) return;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setter(true); },
        { threshold: 0.2 }
      );
      o.observe(ref.current);
      observers.push(o);
    };

    obs(imgRef, setImgVis);
    obs(contentRef, setContentVis);

    reasonRefs.current.forEach((el, i) => {
      if (!el) return;
      const o = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting)
            setReasonVis((prev) => {
              const n = [...prev];
              n[i] = true;
              return n;
            });
        },
        { threshold: 0.15 }
      );
      o.observe(el);
      observers.push(o);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="whm-section" ref={sectionRef} id="whyhireme">
      {/* decorative background */}
      <div className="whm-bg" aria-hidden="true">
        <div className="whm-bg__blob whm-bg__blob--1" />
        <div className="whm-bg__blob whm-bg__blob--2" />
      </div>

      <div className="whm-container">

        {/* ══ LEFT: IMAGE SIDE ══ */}
        <div
          className={`whm-img-side ${imgVis ? "whm-img-side--visible" : ""}`}
          ref={imgRef}
        >
          <div className="whm-img-ring whm-img-ring--outer" />
          <div className="whm-img-ring whm-img-ring--inner" />

          <div className="whm-img-frame">
            {/* ── Replace the src below with your own photo ── */}
            <img src="../../public/image/Asta.jpg" alt="Sourabh Bhaisare" className="whm-img" />

            {/* Placeholder shown when no photo is provided */}
            {/* <div className="whm-img-placeholder">
              <div className="whm-initials">SB</div>
              <span className="whm-initials-label">Sourabh Bhaisare</span>
            </div> */}

            <div className="whm-img-overlay" />
          </div>

          {/* floating stat badges */}
          {whmStats.map((s, i) => (
            <div
              className={`whm-stat whm-stat--${i + 1}`}
              key={s.label}
              style={{ "--whm-stat-delay": `${0.4 + i * 0.15}s` }}
            >
              <span className="whm-stat__value">{s.value}</span>
              <span className="whm-stat__label">{s.label}</span>
            </div>
          ))}

          <div className="whm-img-corner whm-img-corner--tl" />
          <div className="whm-img-corner whm-img-corner--br" />
        </div>

        {/* ══ RIGHT: CONTENT SIDE ══ */}
        <div
          className={`whm-content ${contentVis ? "whm-content--visible" : ""}`}
          ref={contentRef}
        >
          <span className="whm-eyebrow">Why Work With Me</span>

          <h2 className="whm-title">
            The <span> Developer</span> Who Delivers Every Time
          </h2>

          <p className="whm-lead">
            I'm not just a coder — I'm a craftsman who cares about the final
            experience as much as you do. Here's what sets me apart:
          </p>

          <div className="whm-reasons">
            {whmReasons.map((r, i) => (
              <div key={r.id} ref={(el) => (reasonRefs.current[i] = el)}>
                <WhmReason data={r} index={i} visible={reasonVis[i]} />
              </div>
            ))}
          </div>

          <div className={`whm-cta ${contentVis ? "whm-cta--visible" : ""}`}>
            <a href="#contact" className="whm-cta__btn whm-cta__btn--primary">
              <span>Let's Work Together</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#projects" className="whm-cta__btn whm-cta__btn--ghost">
              View My Work
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default WHM;
