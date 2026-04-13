import "../App.css";

const SKILLS = [
  "React.js", "JavaScript", "HTML5 / CSS3",
  "Node.js", "MongoDB", "WordPress",
  "REST APIs", "Git / GitHub",
];

export default function About() {
  return (
    <section className="about" id="about">

      {/* ── Left: image ── */}
      <div className="about-image-side">
        <div className="about-img-frame">
          {/* Replace src with your actual photo */}
          <img
            src="/image/uzumaki.jpg"
            alt="Sourabh Bhaisare"
          />
        </div>

        {/* Floating years badge */}
        <div className="stat-badge">
          <span className="stat-num">2+</span>
          <span className="stat-label">Years of<br />experience</span>
        </div>
      </div>

      {/* ── Right: content ── */}
      <div className="about-content">
        <div className="about-label">
          <span className="about-label-line" />
          Who I Am
        </div>

        <h2 className="about-heading">
          Crafting Digital <span>Experiences</span>.
        </h2>

        <div className="about-divider" />

        <p className="about-bio">
          I'm a <strong>Full-Stack Developer</strong> with a sharp eye for design
          and a love for building things that feel fast, clean, and intentional.
          Skilled in HTML, CSS, JavaScript, React.js, Node.js, MongoDB, and REST APIs.
        </p>
        <p className="about-bio">
          2+ years delivering responsive, performance-optimized web solutions in
          WordPress and React. <strong>Fast learner</strong> with a
          <strong> product-driven mindset</strong> — highly fit for React/MERN
          full-stack roles and ready to add value from day one.
        </p>

        {/* Skills */}
        <div className="about-skills">
          {SKILLS.map((skill) => (
            <span className="skill-tag" key={skill}>{skill}</span>
          ))}
        </div>

        {/* Actions */}
        <div className="about-actions">
          <button className="about-btn-primary">
            Download CV
            <span className="arrow">↓</span>
          </button>
          <button className="about-btn-ghost">Let's Connect</button>
        </div>
      </div>
    </section>
  );
}
