import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import "../App.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* Contact details — from the CV */
const EMAIL = "souravbhaisare2@gmail.com";
const CHANNELS = [
  { label: "WhatsApp",  value: "+91 95166 56752",               href: "https://wa.me/919516656752",              external: true },
  { label: "LinkedIn",  value: "linkedin.com/in/sourabh115",    href: "https://www.linkedin.com/in/sourabh115",  external: true },
  { label: "GitHub",    value: "github.com/100ravthakur",       href: "https://github.com/100ravthakur",         external: true },
];

const Arrow = () => (
  <svg className="ct-row__arrow" width="22" height="22" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

export default function CTA() {
  const sectionRef = useRef(null);
  const panelRef   = useRef(null);
  const [copied, setCopied] = useState(false);

  /* ── Copy email: works without leaving the page ── */
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;   // clipboard blocked → open the mail app instead
    }
  };

  /* ── Scroll-in: headline slams, rows slide, つづく stamps last ── */
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      if (reduced) { gsap.set(q(".ct-reveal"), { autoAlpha: 1 }); return; }

      const split = SplitText.create(q(".ct-headline")[0], { type: "words,chars" });

      gsap.timeline({ scrollTrigger: { trigger: root, start: "top 65%", once: true } })
        .set(q(".ct-reveal"), { autoAlpha: 1 })
        .from(q(".ct-chapter"), { autoAlpha: 0, y: -10, duration: 0.3 })
        .from(split.chars, {
          yPercent: -160, rotationX: -100, scale: 1.4, autoAlpha: 0,
          stagger: 0.022, duration: 0.38, ease: "power4.in",
        }, "<0.1")
        .fromTo(q(".ct-headline"), { x: 0, y: 0 }, {
          keyframes: [{ x: -10, y: 5 }, { x: 8, y: -6 }, { x: -4, y: 3 }, { x: 0, y: 0 }],
          duration: 0.3, ease: "none",
        }, "<")
        .from(q(".ct-lead"), { autoAlpha: 0, y: 16, duration: 0.4 }, "-=0.1")
        .from(q(".ct-row"), { x: -70, autoAlpha: 0, stagger: 0.09, duration: 0.45, ease: "power3.out" }, "-=0.2")
        .from(q(".ct-panel"), { x: 120, rotation: 10, autoAlpha: 0, duration: 0.6, ease: "power3.out" }, "-=0.7")
        .from(q(".ct-bubble"), { scale: 0, rotation: -15, transformOrigin: "0% 100%", duration: 0.45, ease: "back.out(2.6)" }, "-=0.15")
        .from(q(".ct-tbc"), { scale: 2.6, rotation: 30, autoAlpha: 0, duration: 0.45, ease: "back.out(3)" }, "-=0.05");
    }, root);

    return () => ctx.revert();
  }, []);

  /* ── 3D tilt on the image panel ── */
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const img = panel.querySelector("img");
    const rx = gsap.quickTo(panel, "rotationX", { duration: 0.5, ease: "power3.out" });
    const ry = gsap.quickTo(panel, "rotationY", { duration: 0.5, ease: "power3.out" });
    const ix = gsap.quickTo(img, "x", { duration: 0.6, ease: "power3.out" });
    const iy = gsap.quickTo(img, "y", { duration: 0.6, ease: "power3.out" });
    const move = (e) => {
      const r = panel.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      ry(px * 16); rx(-py * 12); ix(-px * 24); iy(-py * 24);
    };
    const leave = () => { rx(0); ry(0); ix(0); iy(0); };
    panel.addEventListener("pointermove", move);
    panel.addEventListener("pointerleave", leave);
    return () => { panel.removeEventListener("pointermove", move); panel.removeEventListener("pointerleave", leave); };
  }, []);

  return (
    <section className="ct" id="contact" ref={sectionRef}>
      <div className="ct__inner">

        {/* ── Left: headline + ways to reach him ── */}
        <div className="ct-main">
          <p className="ct-chapter ct-reveal">
            <span className="ct-chapter__jp" aria-hidden="true">最終話</span>
            Contact
          </p>

          <h2 className="ct-headline ct-reveal">Let's build something real.</h2>

          <p className="ct-lead ct-reveal">
            Fast, responsive websites and apps with React.js, React Native and
            WordPress — from Figma handoff to go-live. Open to full-time roles
            and freelance builds in Bengaluru or remote.
          </p>

          <ul className="ct-rows ct-reveal">
            {/* email: open mail app, or copy */}
            <li className="ct-row ct-row--email">
              <a className="ct-row__link" href={`mailto:${EMAIL}`}>
                <span className="ct-row__label">Email</span>
                <span className="ct-row__value">{EMAIL}</span>
                <Arrow />
              </a>
              <button type="button" className="ct-copy" onClick={copyEmail}>
                {copied ? "Copied" : "Copy"}
              </button>
              {copied && <span className="ct-copied" aria-hidden="true">コピー！</span>}
              <span className="ct-sr" role="status">{copied ? "Email address copied" : ""}</span>
            </li>

            {CHANNELS.map((c) => (
              <li className="ct-row" key={c.label}>
                <a className="ct-row__link" href={c.href} target="_blank" rel="noopener noreferrer">
                  <span className="ct-row__label">{c.label}</span>
                  <span className="ct-row__value">{c.value}</span>
                  <Arrow />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Right: image panel ── */}
        <div className="ct-side ct-reveal">
          <div className="ct-panel" ref={panelRef}>
            <div className="ct-panel__window">
              <img src="/image/HINATA SHOYO.jpg" alt="" loading="lazy" />
              <span className="ct-panel__halftone" aria-hidden="true" />
            </div>
            <p className="ct-bubble" aria-hidden="true">Let's talk!</p>
          </div>
          <p className="ct-tbc" aria-hidden="true">
            <span className="ct-tbc__jp">つづく</span>
            <span className="ct-tbc__en">To be continued…</span>
          </p>
        </div>
      </div>

      <footer className="ct-footer">
        <span>© {new Date().getFullYear()} Sourabh Bhaisare</span>
        <span>Built with React and GSAP</span>
      </footer>
    </section>
  );
}