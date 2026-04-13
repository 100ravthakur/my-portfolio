import { useEffect, useRef } from "react";
import "../App.css";

const skillsData = [
  {
    name: "HTML / CSS",
    pct: 95,
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },

   {
    name: "JavaScript",
    pct: 70,
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "React.js",
    pct: 60,
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "TypeScript",
    pct: 30,
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
   {
    name: "WordPress",
    pct: 90,
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg",
  },
  {
    name: "Redux Toolkit / React Query",
    pct: 35,
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  },

  {
    name: "Node.js",
    pct: 70,
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Express.js / REST APIs",
    pct: 75,
    img: "https://logowik.com/content/uploads/images/express-js1720895493.logowik.com.webp",
  },
  {
    name: "MongoDB / Atlas",
    pct: 75,
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "JWT Auth",
    pct: 70,
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Vercel / Render",
    pct: 75,
    img: "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png",
  },
  {
    name: "AWS",
    pct: 50,
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
 
];

function Skills() {
  const cardRefs  = useRef([]);
  const dotsRef   = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Floating bg dots
    const container = dotsRef.current;
    if (container) {
      for (let i = 0; i < 14; i++) {
        const dot = document.createElement("div");
        dot.className = "skill-dot";
        const size = Math.random() * 100 + 30;
        dot.style.cssText = `
          width:${size}px; height:${size}px;
          left:${Math.random() * 100}%;
          top:${Math.random() * 100}%;
          animation-duration:${Math.random() * 20 + 15}s;
          animation-delay:-${Math.random() * 20}s;
        `;
        container.appendChild(dot);
      }
    }
    return () => {
      if (container) container.innerHTML = "";
    };
  }, []);

  useEffect(() => {
    // Intersection observer to animate bars when in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.indexOf(entry.target);
            if (idx !== -1) {
              setTimeout(() => {
                entry.target.classList.add("skill-animated");
              }, idx * 80);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="skill-section" ref={sectionRef} id="skills">
      {/* Floating bg dots — position:absolute now, not fixed */}
      <div className="skill-bg-dots" ref={dotsRef} />

      <div className="skill-header">
        <h2>My Work <span>Skills</span></h2>
      </div>
      <p className="skill-subtitle">
        High-performing Full-Stack Developer skilled in modern web technologies,
        from pixel-perfect frontend to scalable backend APIs.
      </p>

      <div className="skill-grid">
        {skillsData.map((skill, i) => (
          <div
            className="skill-card"
            key={skill.name}
            ref={(el) => (cardRefs.current[i] = el)}
          >
            <div className="skill-icon-wrap">
              <img
                src={skill.img}
                alt={skill.name}
                style={skill.style || {}}
              />
            </div>
            <span className="skill-name">{skill.name}</span>
            <div className="skill-bar-wrap">
              <div
                className="skill-bar"
                style={{ "--pct": `${skill.pct}%` }}
              >
                {skill.pct}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
