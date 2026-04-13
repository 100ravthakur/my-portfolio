import { useEffect, useRef } from "react";
import "../App.css";

export default function CTA() {
  const orbRef     = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!orbRef.current || !wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left  - 350;
      const y = e.clientY - rect.top   - 350;
      orbRef.current.style.transform = `translate(${x * 0.14}px, ${y * 0.14}px)`;
    };

    const wrapper = wrapperRef.current;
    wrapper?.addEventListener("mousemove", handleMouseMove);
    return () => wrapper?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="cta-wrapper" id="contact" ref={wrapperRef}>
      {/* Parallax glow orb */}
      <div className="orb" ref={orbRef} />

      <div className="cta-inner">

        {/* ── Right: content ── */}
        <div className="cta-card">
          {/* Corner brackets */}
          <div className="corner corner-tl" />
          <div className="corner corner-tr" />
          <div className="corner corner-bl" />
          <div className="corner corner-br" />

          <div className="label">
            <span className="label-dot" />
            Available for work
          </div>

          <h1 className="headline">
            Let's Build
            <span className="headline-accent">Something</span>
            Real.
          </h1>

          <div className="divider" />

         <p className="subtext">
  Building scalable, high-performance web and mobile applications using React, MERN, and modern technologies.
  <br />
  From idea to production — I focus on clean code, smooth UI, and real-world impact.
  <br />
  Let’s connect and build something meaningful.{" "}
  <a
    href="https://wa.me/916266045950"
    target="_blank"
    rel="noopener noreferrer"
    className="cta-phone"
  >
    +91 6266045950
  </a>
</p>

          <div className="cta-actions">
            <a
              className="btn-primary"
              href="mailto:souravbhaisare2@gmail.com"
            >
              Start a project
              <span className="arrow-icon">→</span>
            </a>
            <a
              className="btn-ghost"
              href="https://www.linkedin.com/in/sourabh-bhaisare-357443245/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>

          {/* ── Left: image panel ── */}
        <div className="cta-image-panel">
                      <img src="../../public/image/HINATA SHOYO.jpg" alt="Sourabh Bhaisare" />
         
          {/* <div className="cta-img-placeholder">
            <div className="cta-img-initials">SB</div>
          </div>
          <span className="image-label">Portfolio 2025</span> */}
        </div>

      </div>
    </div>
  );
}
