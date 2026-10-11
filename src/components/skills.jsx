import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import "../App.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

const DEV = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
const OPENCMS_ICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' fill='none'%3E" +
  "%3Crect x='10' y='6' width='36' height='46' rx='4' fill='%231e3a5f' stroke='%2360a5fa' stroke-width='3'/%3E" +
  "%3Crect x='18' y='14' width='36' height='46' rx='4' fill='%230f172a' stroke='%2360a5fa' stroke-width='3'/%3E" +
  "%3Cpath d='M30 31l-5 6 5 6M42 31l5 6-5 6M38 28l-4 18' stroke='%23f6c445' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

/* pct values are Sourabh's own self-ratings — adjust to taste.
   note = where he actually used it (from the CV), shown on the back of the card. */
const GROUPS = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML5 / CSS3",             pct: 95, img: `${DEV}/html5/html5-original.svg`,
        note: "Pixel-accurate, mobile-first layouts for 11 client brands." },
      { name: "JavaScript (ES6+)",        pct: 70, img: `${DEV}/javascript/javascript-original.svg`,
        note: "Interactive UI, API integration and performance work on every build." },
      { name: "React.js",                 pct: 60, img: `${DEV}/react/react-original.svg`,
        note: "Reusable component libraries for site revamps, plus Set Sail and Weatherly." },
      { name: "Tailwind CSS / Bootstrap", pct: 75, img: `${DEV}/tailwindcss/tailwindcss-original.svg`,
        note: "Fast, consistent responsive styling across projects." },
      { name: "Core Web Vitals / SEO",    pct: 85, img: "https://cdn.simpleicons.org/lighthouse/F44B21",
        note: "Lazy loading, code splitting, caching and JSON-LD schema for Google and AI search." },
    ],
  },
  {
    title: "CMS",
    skills: [
      { name: "WordPress / Elementor",    pct: 90, img: `${DEV}/wordpress/wordpress-plain.svg`,
        note: "Custom themes, ACF and plugins — and recovering a hacked site with 2FA and a firewall." },
      { name: "HubSpot CMS / HubL",       pct: 75, img: "https://cdn.simpleicons.org/hubspot/FF7A59",
        note: "Production pages and modules for client brands at IInfotanks." },
      { name: "OpenCMS",                  pct: 60, img: OPENCMS_ICON,
        note: "Client site builds and updates at IInfotanks." },
    ],
  },
  {
    title: "Mobile & backend",
    skills: [
      { name: "React Native / Expo",      pct: 65, img: "https://cdn.simpleicons.org/expo/000000",
        note: "Naimo — an iOS and Android delivery app taken through App Store and Play review." },
      { name: "Firebase Auth / FCM",      pct: 60, img: `${DEV}/firebase/firebase-original.svg`,
        note: "Phone OTP login, push notifications and App Check for Naimo." },
      { name: "Node.js",                  pct: 70, img: `${DEV}/nodejs/nodejs-original.svg`,
        note: "Backend APIs for Naimo and the Set Sail travel journal." },
      { name: "Express.js / REST APIs",   pct: 75, img: "https://logowik.com/content/uploads/images/express-js1720895493.logowik.com.webp",
        note: "REST APIs with JWT login and protected routes." },
      { name: "MongoDB",                  pct: 75, img: `${DEV}/mongodb/mongodb-original.svg`,
        note: "Data layer for Naimo and Set Sail." },
    ],
  },
];

const SEGMENTS = 10;

function SkillCard({ skill }) {
  const filled = Math.round(skill.pct / 10);
  const signature = skill.pct >= 85;

  const flip = (e) => {
    const btn = e.currentTarget;
    const on = btn.getAttribute("aria-pressed") !== "true";
    btn.setAttribute("aria-pressed", String(on));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.to(btn, { rotationY: on ? 180 : 0, duration: reduced ? 0 : 0.7, ease: "back.out(1.5)" });
  };

  return (
    <li className="sk-card">
      <div className="sk-tilt">
        <button
          type="button"
          className="sk-flip"
          aria-pressed="false"
          aria-label={`${skill.name}. ${skill.note}`}
          onClick={flip}
        >
          {/* front */}
          <span className="sk-face sk-face--front">
            {signature && <span className="sk-signature">Signature move</span>}
            <span className="sk-icon"><img src={skill.img} alt="" loading="lazy" /></span>
            <span className="sk-name">{skill.name}</span>
            <span className="sk-meter" aria-hidden="true">
              {Array.from({ length: SEGMENTS }, (_, i) => (
                <i key={i} className={i < filled ? "on" : ""} />
              ))}
            </span>
          </span>
          {/* back */}
          <span className="sk-face sk-face--back" aria-hidden="true">
            <span className="sk-back-name">{skill.name}</span>
            <span className="sk-back-note">{skill.note}</span>
          </span>
        </button>
      </div>
    </li>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);

  /* ── Scroll-in: cards are dealt face-down, then flip over ── */
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      if (reduced) { gsap.set(q(".sk-reveal"), { autoAlpha: 1 }); return; }

      const split = SplitText.create(q(".sk-heading")[0], { type: "words,chars" });

      gsap.timeline({ scrollTrigger: { trigger: root, start: "top 70%", once: true } })
        .set(q(".sk-reveal"), { autoAlpha: 1 })
        .from(q(".sk-chapter"), { autoAlpha: 0, y: -10, duration: 0.3 })
        .from(split.chars, { yPercent: -120, rotationX: -90, autoAlpha: 0, stagger: 0.025, duration: 0.42, ease: "back.out(2)" }, "<")
        .from(q(".sk-sub"), { autoAlpha: 0, y: 14, duration: 0.4 }, "-=0.2");

      // each group deals its own cards when it scrolls into view
      q(".sk-group").forEach((group) => {
        const g = gsap.utils.selector(group);
        gsap.timeline({ scrollTrigger: { trigger: group, start: "top 80%", once: true } })
          .from(g(".sk-group__title"), { scale: 2, rotation: -12, autoAlpha: 0, duration: 0.35, ease: "back.out(3)" })
          .from(g(".sk-card"), {
            y: 160, x: () => gsap.utils.random(-80, 80), rotation: () => gsap.utils.random(-30, 30),
            autoAlpha: 0, stagger: 0.08, duration: 0.5, ease: "power3.out",
          }, "-=0.1")
          .fromTo(g(".sk-flip"), { rotationY: 180 }, { rotationY: 0, stagger: 0.08, duration: 0.6, ease: "back.out(1.6)" }, "-=0.45")
          .from(g(".sk-meter i.on"), { scaleY: 0, transformOrigin: "50% 100%", stagger: 0.012, duration: 0.18, ease: "power2.out" }, "-=0.3")
          .from(g(".sk-signature"), { scale: 0, rotation: 30, duration: 0.4, ease: "back.out(3)" }, "-=0.2");
      });
    }, root);

    return () => ctx.revert();
  }, []);

  /* ── 3D tilt toward the cursor on each card ── */
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const offs = [];
    root.querySelectorAll(".sk-card").forEach((card) => {
      const tilt = card.querySelector(".sk-tilt");
      const rx = gsap.quickTo(tilt, "rotationX", { duration: 0.4, ease: "power3.out" });
      const ry = gsap.quickTo(tilt, "rotationY", { duration: 0.4, ease: "power3.out" });
      const lift = gsap.quickTo(tilt, "z", { duration: 0.4, ease: "power3.out" });
      const move = (e) => {
        const r = card.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 22);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 22);
        lift(30);
      };
      const leave = () => { rx(0); ry(0); lift(0); };
      card.addEventListener("pointermove", move);
      card.addEventListener("pointerleave", leave);
      offs.push(() => { card.removeEventListener("pointermove", move); card.removeEventListener("pointerleave", leave); });
    });
    return () => offs.forEach((f) => f());
  }, []);

  return (
    <section className="sk" id="skills" ref={sectionRef}>
      <div className="sk__inner">
        <header className="sk-head">
          <p className="sk-chapter sk-reveal">
            <span className="sk-chapter__jp" aria-hidden="true">第2話</span>
            Skills
          </p>
          <h2 className="sk-heading sk-reveal">My move set.</h2>
          <p className="sk-sub sk-reveal">
            Frontend-first — React.js, JavaScript and WordPress — with React Native
            for mobile and Node.js, Express and MongoDB on the backend.
            <span className="sk-hint"> Tap a card to see where I've used it.</span>
          </p>
        </header>

        {GROUPS.map((group) => (
          <div className="sk-group" key={group.title}>
            <h3 className="sk-group__title">{group.title}</h3>
            <ul className="sk-grid">
              {group.skills.map((s) => <SkillCard skill={s} key={s.name} />)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}