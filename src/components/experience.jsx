import { useEffect, useRef, useState } from "react";
import "../App.css";

const expData = [
  {
    id: 1,
    role: "Web Developer",
    company: "IInfotanks",
    period: "May 2025 – Present",
    duration: "Current",
    description:
      "Front-End Developer building scalable interfaces across WordPress, HubSpot CMS, and .NET platforms. Focused on responsive UI, performance optimization, and SEO improvements.",
    tags: ["HTML/CSS", "JavaScript", "WordPress", "HubSpot CMS", "SEO"],
    img: "/image/naruto attack.jpg",
    accent: "#ff5500",
  },
  {
    id: 2,
    role: "WordPress Developer",
    company: "Digital Flame Marketing",
    period: "Apr 2024 – Jan 2025",
    duration: "9 Months",
    description:
      "Designed and developed custom WordPress websites using Elementor. Managed ongoing maintenance, plugin updates, and performance optimization for multiple client projects.",
    tags: ["WordPress", "Elementor", "SEO", "WooCommerce", "PHP"],
    img: "/image/hinata-vollyball.jpg",
    accent: "#ff7733",
  },
  {
    id: 3,
    role: "WordPress Developer",
    company: "Guest Blogging",
    period: "Jan 2023 – Jun 2023",
    duration: "6 Months",
    description:
      "Built responsive WordPress sites with Elementor. Enhanced Core Web Vitals using WP Rocket, Autoptimize, and Smush. Improved SEO and mobile-first responsiveness.",
    tags: ["WordPress", "Elementor", "WP Rocket", "Core Web Vitals"],
    img: "/image/aasta bg.jpg",
    accent: "#ff9955",
  },
];

function ExpCard({ data, index }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`exp-card ${visible ? "exp-card--visible" : ""}`}
      ref={cardRef}
      style={{
        "--exp-delay": `${index * 0.18}s`,
        "--exp-accent": data.accent,
      }}
    >
      {/* Image layer */}
      <div className="exp-card__img-wrap">
        <img src={data.img} alt={data.company} className="exp-card__img" />
        <div className="exp-card__img-overlay" />
        <span className="exp-card__duration">{data.duration}</span>
      </div>

      {/* Hover content layer */}
      <div className="exp-card__content">
        <div className="exp-card__content-inner">
          <span className="exp-card__period">{data.period}</span>
          <h3 className="exp-card__role">{data.role}</h3>
          <p className="exp-card__company">{data.company}</p>
          <p className="exp-card__desc">{data.description}</p>
          <div className="exp-card__tags">
            {data.tags.map((tag) => (
              <span className="exp-card__tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <div className="exp-card__cta">
            <span>View Details</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Always-visible bottom bar */}
      <div className="exp-card__bar">
        <div className="exp-card__bar-role">{data.role}</div>
        <div className="exp-card__bar-company">{data.company}</div>
      </div>
    </div>
  );
}

function Experience() {
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeaderVisible(true);
      },
      { threshold: 0.3 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="exp-section" id="experience">
      {/* Decorative bg lines */}
      <div className="exp-bg-lines" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <div
            className="exp-bg-line"
            key={i}
            style={{ "--exp-line-i": i }}
          />
        ))}
      </div>

      <div className="exp-container">
        <div
          className={`exp-header ${headerVisible ? "exp-header--visible" : ""}`}
          ref={headerRef}
        >
          <span className="exp-header__label">Career Journey</span>
          <h2 className="exp-header__title">
            My <span>Experience</span>
          </h2>
          <p className="exp-header__subtitle">
            2+ years building and delivering exceptional digital products
            across WordPress, React, and full-stack environments.
          </p>
        </div>

        <div className="exp-grid">
          {expData.map((item, i) => (
            <ExpCard data={item} index={i} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
