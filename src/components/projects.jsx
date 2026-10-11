import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import "../App.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* ─────────────────────────────────────────
   DATA — from the CV
   (WordPress client builds kept out for now, as before)
───────────────────────────────────────── */
const FEATURED = {
  vol: "Vol. 01",
  title: "Naimo Delivery App",
  kind: "Cross-platform quick-commerce app",
  status: "Pre-launch",
  img: "/image/react native.jpg",
  link: "https://naimo.in/",
  linkLabel: "Visit naimo.in",
  points: [
    "Built for iOS and Android with separate flows for customers, vendors, delivery partners and admins.",
    "Phone OTP login and push notifications with Firebase Auth, Cloud Messaging and App Check.",
    "Location features with expo-location and GeoJSON service areas, plus a quick-commerce location picker.",
    "Took it through App Store and Google Play review; backend on Node.js, Express and MongoDB, deployed on AWS.",
  ],
  tags: ["React Native", "Expo Router", "Firebase", "Node.js", "MongoDB", "AWS"],
};

const VOLUMES = [
  {
    vol: "Vol. 02",
    title: "Nakama's Set Sail",
    kind: "Travel journal web app",
    img: "/image/Hiring MERN.jpg",
    spine: "straw",
    desc: "Full-stack MERN travel journal with JWT login, protected routes and session management. Trip entries with full CRUD, image uploads and live weather data.",
    tags: ["React.js", "Node.js", "Express", "MongoDB", "JWT"],
    live: "https://set-sail-nakamas.vercel.app",
    code: "https://github.com/100ravthakur/set-sail-nakamas",
  },
  {
    vol: "Vol. 03",
    title: "Anishop",
    kind: "E-commerce website",
    img: "/image/React JS.jpg",
    spine: "crimson",
    desc: "Responsive e-commerce frontend with product listings, a Context API cart and smooth routing, designed mobile-first with reusable components.",
    tags: ["HTML5", "CSS3", "JavaScript", "Context API"],
    live: "https://anishop.netlify.app",
  },
  {
    vol: "Vol. 04",
    title: "Weatherly",
    kind: "Weather forecast app",
    img: "/image/React JS.jpg",
    spine: "paper",
    desc: "Real-time weather app with location search and live temperatures, handling API errors, loading states and conditional rendering cleanly.",
    tags: ["React.js", "REST API", "JavaScript", "CSS3"],
    live: "https://weathering-with-clouds.netlify.app",
  },
];

/* ─────────────────────────────────────────
   3D BOOK — cover + spine; rests angled to show the spine
───────────────────────────────────────── */
function Volume({ v }) {
  return (
    <li className="pv-vol">
      <div className="pv-stage">
        <div className={`pv-book pv-book--${v.spine}`}>
          <div className="pv-book__spine" aria-hidden="true">
            <span className="pv-book__spine-vol">{v.vol.replace("Vol. ", "")}</span>
            <span className="pv-book__spine-title">{v.title}</span>
          </div>
          <div className="pv-book__cover">
            <img src={v.img} alt="" loading="lazy" />
            <span className="pv-book__band">
              <span className="pv-book__vol">{v.vol}</span>
              <span className="pv-book__title">{v.title}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="pv-info">
        <h3 className="pv-info__title">{v.title}</h3>
        <p className="pv-info__kind">{v.kind}</p>
        <p className="pv-info__desc">{v.desc}</p>
        <ul className="pv-tags" aria-label="Built with">
          {v.tags.map((t) => <li key={t}>{t}</li>)}
        </ul>
        <div className="pv-links">
          <a className="pv-btn pv-btn--primary" href={v.live} target="_blank" rel="noopener noreferrer">
            Live demo
          </a>
          {v.code && (
            <a className="pv-btn pv-btn--ghost" href={v.code} target="_blank" rel="noopener noreferrer">
              Code
            </a>
          )}
        </div>
      </div>
    </li>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);

  /* ── Scroll-in: spread opens like a page, books drop onto the shelf ── */
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      if (reduced) { gsap.set(q(".pv-reveal"), { autoAlpha: 1 }); return; }

      const split = SplitText.create(q(".pv-heading")[0], { type: "words,chars" });
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top 70%", once: true } })
        .set(q(".pv-reveal"), { autoAlpha: 1 })
        .from(q(".pv-chapter"), { autoAlpha: 0, y: -10, duration: 0.3 })
        .from(split.chars, { yPercent: -120, rotationX: -90, autoAlpha: 0, stagger: 0.025, duration: 0.42, ease: "back.out(2)" }, "<")
        .from(q(".pv-sub"), { autoAlpha: 0, y: 14, duration: 0.4 }, "-=0.2");

      // featured spread: the panel swings open on its left hinge
      gsap.timeline({ scrollTrigger: { trigger: q(".pv-feature")[0], start: "top 75%", once: true } })
        .from(q(".pv-feature__panel"), { rotationY: -95, transformOrigin: "0% 50%", autoAlpha: 0, duration: 0.8, ease: "power3.out" })
        .from(q(".pv-feature__sticker"), { scale: 2.2, rotation: -25, autoAlpha: 0, duration: 0.4, ease: "back.out(3)" }, "-=0.3")
        .from(q(".pv-feature__text > *"), { x: 40, autoAlpha: 0, stagger: 0.07, duration: 0.45, ease: "power3.out" }, "-=0.55")
        .from(q(".pv-feature .pv-tags li"), { scale: 1.8, autoAlpha: 0, rotation: () => gsap.utils.random(-20, 20), stagger: 0.04, duration: 0.3, ease: "back.out(2.6)" }, "-=0.25");

      // books fall onto the shelf and bounce, one after another
      gsap.timeline({ scrollTrigger: { trigger: q(".pv-shelf")[0], start: "top 78%", once: true } })
        .from(q(".pv-shelf__plank"), { scaleX: 0, transformOrigin: "0% 50%", duration: 0.5, ease: "power3.out" })
        .from(q(".pv-stage"), {
          y: -260, rotation: () => gsap.utils.random(-25, 25), autoAlpha: 0,
          stagger: 0.14, duration: 0.75, ease: "bounce.out",
        }, "-=0.2")
        .from(q(".pv-info"), { y: 30, autoAlpha: 0, stagger: 0.12, duration: 0.45, ease: "power3.out" }, "-=0.5");
    }, root);

    return () => ctx.revert();
  }, []);

  /* ── 3D: featured panel tilts; books turn to face you and follow the cursor ── */
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const offs = [];
    const bind = (el, handlers) => {
      Object.entries(handlers).forEach(([ev, fn]) => el.addEventListener(ev, fn));
      offs.push(() => Object.entries(handlers).forEach(([ev, fn]) => el.removeEventListener(ev, fn)));
    };

    const panel = root.querySelector(".pv-feature__window");
    if (panel) {
      const img = panel.querySelector("img");
      const rx = gsap.quickTo(panel, "rotationX", { duration: 0.5, ease: "power3.out" });
      const ry = gsap.quickTo(panel, "rotationY", { duration: 0.5, ease: "power3.out" });
      const ix = gsap.quickTo(img, "x", { duration: 0.6, ease: "power3.out" });
      const iy = gsap.quickTo(img, "y", { duration: 0.6, ease: "power3.out" });
      bind(panel, {
        pointermove: (e) => {
          const r = panel.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          ry(px * 14); rx(-py * 10); ix(-px * 24); iy(-py * 24);
        },
        pointerleave: () => { rx(0); ry(0); ix(0); iy(0); },
      });
    }

    root.querySelectorAll(".pv-vol").forEach((vol) => {
      const book = vol.querySelector(".pv-book");
      const ry = gsap.quickTo(book, "rotationY", { duration: 0.55, ease: "power3.out" });
      const rx = gsap.quickTo(book, "rotationX", { duration: 0.55, ease: "power3.out" });
      const lift = gsap.quickTo(book, "z", { duration: 0.55, ease: "power3.out" });
      const stage = vol.querySelector(".pv-stage");
      bind(stage, {
        pointermove: (e) => {
          const r = stage.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          ry(px * 16); rx(-py * 12); lift(40);           // face the viewer, follow the cursor
        },
        pointerleave: () => { ry(28); rx(0); lift(0); },  // back to resting on the shelf
      });
    });

    return () => offs.forEach((f) => f());
  }, []);

  return (
    <section className="pv" id="projects" ref={sectionRef}>
      <div className="pv__inner">
        <header className="pv-head">
          <p className="pv-chapter pv-reveal">
            <span className="pv-chapter__jp" aria-hidden="true">第4話</span>
            Projects
          </p>
          <h2 className="pv-heading pv-reveal">Selected volumes.</h2>
          <p className="pv-sub pv-reveal">
            A cross-platform delivery app, plus React and MERN builds you can
            try live.
          </p>
        </header>

        {/* ── Featured: two-page spread ── */}
        <article className="pv-feature">
          <div className="pv-feature__panel">
            <div className="pv-feature__window">
              <img src={FEATURED.img} alt="" loading="lazy" />
              <div className="pv-feature__halftone" aria-hidden="true" />
            </div>
            <span className="pv-feature__sticker">{FEATURED.status}</span>
          </div>

          <div className="pv-feature__text">
            <p className="pv-feature__meta">
              <span className="pv-feature__vol">{FEATURED.vol}</span>
              <span>Featured</span>
            </p>
            <h3 className="pv-feature__title">{FEATURED.title}</h3>
            <p className="pv-feature__kind">{FEATURED.kind}</p>
            <ul className="pv-points">
              {FEATURED.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
            <ul className="pv-tags" aria-label="Built with">
              {FEATURED.tags.map((t) => <li key={t}>{t}</li>)}
            </ul>
            <div className="pv-links">
              <a className="pv-btn pv-btn--primary" href={FEATURED.link} target="_blank" rel="noopener noreferrer">
                {FEATURED.linkLabel}
              </a>
            </div>
          </div>
        </article>

        {/* ── Shelf of volumes ── */}
        <div className="pv-shelf">
          <ul className="pv-vols">
            {VOLUMES.map((v) => <Volume v={v} key={v.vol} />)}
          </ul>
          <div className="pv-shelf__plank" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}