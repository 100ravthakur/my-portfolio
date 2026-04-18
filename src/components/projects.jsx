import { useEffect, useRef, useState } from "react";
import "../App.css";

/* ─────────────────────────────────────────
   DATA — Real projects from resume
───────────────────────────────────────── */
const wordpressProjects = [
  {
    id: "wp1",
    title: "Prateek Group",
    category: ".NET · Frontend",
    desc: "Worked on a corporate website using .NET with HTML, CSS, and JavaScript. Built responsive pages, handled UI updates, and maintained performance-focused layouts.",
    tags: [".NET", "HTML", "CSS", "JavaScript"],
    img: "/image/net.jpg",
    link: "https://prateekgroup.com/",
    color: "#ff5500",
  },
  {
    id: "wp2",
    title: "Calance",
    category: "HubSpot CMS",
    desc: "Developed and maintained marketing pages using HTML, CSS, JavaScript, and HubL. Focused on responsive design, content updates, and smooth UI performance.",
    tags: ["HubL", "HTML", "CSS", "JavaScript"],
    img: "/image/HubSpot.jpg",
    link: "https://www.calanceus.com/",
    color: "#ff7733",
  },
  {
    id: "wp3",
    title: "Kaivalyadhama",
    category: "WordPress",
    desc: "Built and managed website pages using WordPress and Elementor. Handled content updates, responsive layouts, and ensured stable performance across devices.",
    tags: ["WordPress", "Elementor", "HTML", "CSS", "JavaScript"],
    img: "/image/wordpress img.jpg",
    link: "https://kdham.com/",
    color: "#ff9955",
  },
  {
    id: "wp4",
    title: "Bullseye",
    category: "WordPress",
    desc: "Created and updated web pages using WordPress and Elementor. Focused on responsive design, UI improvements, and maintaining overall website performance.",
    tags: ["WordPress", "Elementor", "HTML", "CSS", "JavaScript"],
    img: "/image/wordpress img.jpg",
    link: "https://beta.bullseyeengagement.com/",
    color: "#ffbb44",
  },
];

const personalProjects = [
  {
    id: "p1",
    title: "Nakama's Set Sail",
    category: "MERN Stack",
    desc: "Built a travel journal web app using the MERN stack with authentication, image uploads, and weather API integration. Managed dynamic trip data with responsive UI.",
    tags: ["React", "Node.js", "MongoDB", "Express", "REST API"],
    img: "/image/Hiring MERN.jpg",
    link: "https://set-sail-nakamas.vercel.app",
    color: "#ff5500",
  },
  {
    id: "p2",
    title: "Anishop",
    category: "E-Commerce",
    desc: "Developed a responsive e-commerce website with product listings, cart functionality, and smooth navigation. Focused on clean UI, usability, and performance optimization.",
    tags: ["HTML", "CSS3", "Responsive", "JavaScript"],
    img: "/image/React JS.jpg",
    link: "https://anishop.netlify.app",
    color: "#ff7733",
  },
  {
    id: "p3",
    title: "Weatherly",
    category: "React · API",
    desc: "Created a weather forecast app using React with real-time API integration. Implemented location-based search, responsive design, and dynamic data rendering for users.",
    tags: ["React.js", "REST API", "CSS3", "Responsive"],
    img: "/image/React JS.jpg",
    link: "https://weathering-with-clouds.netlify.app",
    color: "#ff9955",
  },
  {
    id: "p4",
    title: "Naimo Delivery App",
    category: "React Native · Full Stack",
    desc: "Developed a quick commerce delivery app using React Native with JWT authentication and REST APIs. Implemented smooth navigation, real-time flow, and scalable backend integration.",
    tags: ["React Native", "JWT Auth", "REST API", "Navigation", "MongoDB", "AWS"],
    img: "/image/react native.jpg",
    link: "https://naimo.in/",
    color: "#ffbb44",
  },
];

/* ─────────────────────────────────────────
   3-D TILT CARD
───────────────────────────────────────── */
function ProjCard({ data, index, visible }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const rotX = -dy * 10;
    const rotY = dx * 10;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`;

    if (glowRef.current) {
      const gx = ((e.clientX - rect.left) / rect.width) * 100;
      const gy = ((e.clientY - rect.top) / rect.height) * 100;
      glowRef.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%, ${data.color}22 0%, transparent 65%)`;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    if (glowRef.current) glowRef.current.style.background = "transparent";
  };

  return (
    <div
      className={`proj-card ${visible ? "proj-card--visible" : ""}`}
      style={{ "--proj-color": data.color, "--proj-delay": `${index * 0.12}s` }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="proj-card__glow" ref={glowRef} />

      <div className="proj-card__img-wrap">
        <img src={data.img} alt={data.title} className="proj-card__img" />
        <div className="proj-card__img-fade" />
      </div>

      <span className="proj-card__category">{data.category}</span>

      <div className="proj-card__body">
        <h3 className="proj-card__title">{data.title}</h3>
        <p className="proj-card__desc">{data.desc}</p>
        <div className="proj-card__tags">
          {data.tags.map((t) => (
            <span className="proj-card__tag" key={t}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="proj-card__footer">
        <a href={data.link} target="_blank" rel="noopener noreferrer" className="proj-card__btn">
          <span>View Project</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2.5 7h9M7.5 3.5L11 7l-3.5 3.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <a
          href={data.link}
          target="_blank"
          rel="noopener noreferrer"
          className="proj-card__icon-btn"
          aria-label="GitHub"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
        </a>
      </div>

      <div className="proj-card__corner" />
    </div>
  );
}

/* ─────────────────────────────────────────
   SECTION TITLE
───────────────────────────────────────── */
function ProjSectionTitle({ label, title, accent, visible }) {
  return (
    <div
      className={`proj-section-title ${visible ? "proj-section-title--visible" : ""}`}
    >
      <span
        className="proj-section-title__label"
        style={{ "--proj-color": accent }}
      >
        {label}
      </span>
      <h2 className="proj-section-title__h2">{title}</h2>
      <div
        className="proj-section-title__line"
        style={{ "--proj-color": accent }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
function Projects() {
  const wpTitleRef = useRef(null);
  const pTitleRef  = useRef(null);
  const wpCardsRef = useRef([]);
  const pCardsRef  = useRef([]);
  const headerRef  = useRef(null);

  const [headerVis,  setHeaderVis]  = useState(false);
  const [wpTitleVis, setWpTitleVis] = useState(false);
  const [pTitleVis,  setPTitleVis]  = useState(false);
  const [wpVisible,  setWpVisible]  = useState(Array(4).fill(false));
  const [pVisible,   setPVisible]   = useState(Array(4).fill(false));

  useEffect(() => {
    const observers = [];

    const observe = (ref, setter) => {
      if (!ref.current) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setter(true); },
        { threshold: 0.25 }
      );
      obs.observe(ref.current);
      observers.push(obs);
    };

    const observeCards = (refs, setter) => {
      refs.current.forEach((el, i) => {
        if (!el) return;
        const obs = new IntersectionObserver(
          ([e]) => {
            if (e.isIntersecting)
              setter((prev) => {
                const n = [...prev];
                n[i] = true;
                return n;
              });
          },
          { threshold: 0.2 }
        );
        obs.observe(el);
        observers.push(obs);
      });
    };

    observe(headerRef,  setHeaderVis);
    observe(wpTitleRef, setWpTitleVis);
    observe(pTitleRef,  setPTitleVis);
    observeCards(wpCardsRef, setWpVisible);
    observeCards(pCardsRef,  setPVisible);

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="proj-section" id="projects">
      <div className="proj-bg" aria-hidden="true">
        <div className="proj-bg__grid" />
        <div className="proj-bg__radial" />
      </div>

      <div className="proj-container">
        {/* ── main header */}
        <div
          className={`proj-header ${headerVis ? "proj-header--visible" : ""}`}
          ref={headerRef}
        >
          <span className="proj-header__eyebrow">Selected Work</span>
          <h2 className="proj-header__title">
            My <span>Projects</span>
          </h2>
          <p className="proj-header__sub">
            WordPress client builds and personal React/MERN projects —
            crafted with precision, performance, and attention to detail.
          </p>
        </div>

        {/* ══ WORDPRESS PROJECTS ══ */}
        <div ref={wpTitleRef}>
          <ProjSectionTitle
            label="Client Work"
            title="WordPress Projects"
            accent="#ff5500"
            visible={wpTitleVis}
          />
        </div>

        <div className="proj-grid">
          {wordpressProjects.map((item, i) => (
            <div key={item.id} ref={(el) => (wpCardsRef.current[i] = el)}>
              <ProjCard data={item} index={i} visible={wpVisible[i]} />
            </div>
          ))}
        </div>

        {/* ══ PERSONAL PROJECTS ══ */}
        <div ref={pTitleRef} style={{ marginTop: "80px" }}>
          <ProjSectionTitle
            label="Personal Work"
            title="Personal Projects"
            accent="#ff9955"
            visible={pTitleVis}
          />
        </div>

        <div className="proj-grid">
          {personalProjects.map((item, i) => (
            <div key={item.id} ref={(el) => (pCardsRef.current[i] = el)}>
              <ProjCard data={item} index={i} visible={pVisible[i]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
