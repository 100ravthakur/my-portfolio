import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import "../App.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* Skills slapped on as stickers; r is each sticker's resting tilt */
const SKILLS = [
  { name: "React.js",          r: -3 },
  { name: "JavaScript (ES6+)", r:  2 },
  { name: "React Native",      r: -1 },
  { name: "HTML5 / CSS3",      r:  3 },
  { name: "Tailwind CSS",      r: -2 },
  { name: "WordPress",         r:  1 },
  { name: "HubSpot CMS",       r: -3 },
  { name: "OpenCMS",           r:  2 },
  { name: "Node.js",           r:  2 },
  { name: "MongoDB",           r: -1 },
  { name: "Git / GitHub",      r:  3 },
];

const CV       = "/Sourabh-Bhaisare-CV.pdf";
const WHATSAPP = "https://wa.me/919516656752";

export default function About() {
  const sectionRef = useRef(null);
  const panelRef   = useRef(null);
  const imgRef     = useRef(null);

  /* ── Scroll-in: the manga page lands panel by panel ── */
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const count = q(".ab-burst__num")[0];

      if (reduced) {
        gsap.set(q(".ab-reveal"), { autoAlpha: 1 });
        return;
      }

      const split = SplitText.create(q(".ab-heading")[0], { type: "words,chars" });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 68%", once: true },
      });

      tl.set(q(".ab-reveal"), { autoAlpha: 1 })
        // image panel slams in from the left and lands with a squash
        .from(q(".ab-figure"), { xPercent: -60, rotation: -14, scale: 1.25, duration: 0.42, ease: "power4.in" })
        .to(q(".ab-figure"), { scaleY: 0.94, scaleX: 1.03, transformOrigin: "50% 100%", duration: 0.05 })
        .to(q(".ab-figure"), { scaleY: 1, scaleX: 1, duration: 0.6, ease: "elastic.out(1, 0.4)" })
        .fromTo(q(".ab__inner"), { x: 0 }, { keyframes: [{ x: -8 }, { x: 6 }, { x: -3 }, { x: 0 }], duration: 0.24, ease: "none" }, "<")
        // the 3+ burst explodes out and counts up
        .from(q(".ab-burst"), { scale: 0, rotation: -90, duration: 0.55, ease: "back.out(2.4)" }, "<0.05")
        .fromTo({ v: 0 }, { v: 0 }, {
          v: 3, duration: 0.6, ease: "power2.out",
          onUpdate() { if (count) count.textContent = Math.round(this.targets()[0].v) + "+"; },
        }, "<")
        .from(q(".ab-gogogo span"), { autoAlpha: 0, x: 30, stagger: 0.08, duration: 0.3, ease: "power2.out" }, "<0.1")
        // heading: letters drop in like stamped type
        .from(split.chars, {
          yPercent: -120, rotationX: -90, autoAlpha: 0,
          stagger: 0.022, duration: 0.42, ease: "back.out(2)",
        }, "-=0.6")
        .from(q(".ab-chapter"), { autoAlpha: 0, y: -10, duration: 0.3 }, "<")
        // speech bubble pops, narration box slides in
        .from(q(".ab-bubble"), { scale: 0.2, rotation: -10, transformOrigin: "0% 60%", duration: 0.5, ease: "back.out(2.2)" }, "-=0.25")
        .from(q(".ab-narration"), { x: 60, rotation: 4, autoAlpha: 0, duration: 0.45, ease: "power3.out" }, "-=0.25")
        // stickers slap on one by one
        .from(q(".ab-sticker"), {
          scale: 1.9, autoAlpha: 0, rotation: () => gsap.utils.random(-25, 25),
          stagger: 0.05, duration: 0.32, ease: "back.out(2.6)",
          clearProps: "transform,opacity,visibility",
        }, "-=0.2")
        .from(q(".ab-btn"), { y: 30, autoAlpha: 0, stagger: 0.08, duration: 0.4, ease: "power3.out" }, "-=0.25");
    }, root);

    return () => ctx.revert();
  }, []);

  /* ── 3D tilt: panel turns toward the cursor, image drifts inside the frame ── */
  useEffect(() => {
    const panel = panelRef.current;
    const img = imgRef.current;
    if (!panel || !img) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const rx = gsap.quickTo(panel, "rotationX", { duration: 0.5, ease: "power3.out" });
    const ry = gsap.quickTo(panel, "rotationY", { duration: 0.5, ease: "power3.out" });
    const ix = gsap.quickTo(img, "x", { duration: 0.6, ease: "power3.out" });
    const iy = gsap.quickTo(img, "y", { duration: 0.6, ease: "power3.out" });

    const move = (e) => {
      const r = panel.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      ry(px * 18); rx(-py * 14);
      ix(-px * 26); iy(-py * 26);
    };
    const leave = () => { rx(0); ry(0); ix(0); iy(0); };

    panel.addEventListener("pointermove", move);
    panel.addEventListener("pointerleave", leave);
    return () => {
      panel.removeEventListener("pointermove", move);
      panel.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <section className="ab" id="about" ref={sectionRef}>
      <div className="ab__inner">

        {/* ── Left: image panel (3D) ── */}
        <div className="ab-figure ab-reveal">
          <div className="ab-panel" ref={panelRef}>
            <div className="ab-panel__window">
              <img ref={imgRef} className="ab-panel__img" src="/image/uzumaki.jpg" alt="" />
              <div className="ab-panel__halftone" aria-hidden="true" />
            </div>

            <div className="ab-burst">
              <span className="ab-burst__num">3+</span>
              <span className="ab-burst__label">years shipping</span>
            </div>

            <p className="ab-gogogo" aria-hidden="true">
              <span>ゴ</span><span>ゴ</span><span>ゴ</span>
            </p>
          </div>
        </div>

        {/* ── Right: the page ── */}
        <div className="ab-page">
          <p className="ab-chapter ab-reveal">
            <span className="ab-chapter__jp" aria-hidden="true">第1話</span>
            Who I am
          </p>

          <h2 className="ab-heading ab-reveal">Crafting digital experiences.</h2>

          <blockquote className="ab-bubble ab-reveal">
            <p>
              At IInfotanks I ship for <strong>11 client brands</strong> — and I've
              built the frontend for <strong>5+ full website revamps</strong>.
            </p>
          </blockquote>

          <div className="ab-narration ab-reveal">
            <p>
              I'm a frontend developer with 3+ years building fast, responsive
              websites and web apps, mostly in React.js, JavaScript and WordPress.
              I've also shipped a cross-platform app with React Native and Expo,
              plus full-stack projects on the MERN stack.
            </p>
            <p>
              Core Web Vitals, clean architecture and SEO matter to me as much as
              how an interface looks — and I keep code simple enough for the next
              developer to pick up.
            </p>
          </div>

          <ul className="ab-stickers ab-reveal" aria-label="Main skills">
            {SKILLS.map((s) => (
              <li className="ab-sticker" style={{ "--r": `${s.r}deg` }} key={s.name}>{s.name}</li>
            ))}
          </ul>

          <div className="ab-actions ab-reveal">
            <a className="ab-btn ab-btn--primary" href={CV} download>Download CV</a>
            <a className="ab-btn ab-btn--ghost" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
              Chat on WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}