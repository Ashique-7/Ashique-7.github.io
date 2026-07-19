import { useEffect, useRef } from "react";
import profile from "../data/profile.json";
import "./Hero.css";

export default function Hero() {
  const heroRef = useRef(null);

  // Mouse parallax — write the normalized cursor offset (-0.5..0.5) to
  // CSS custom properties; the mesh and floating layers translate off
  // them at different magnitudes for a subtle depth effect. rAF-throttled,
  // and skipped entirely when the user prefers reduced motion.
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    let nx = 0;
    let ny = 0;

    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      nx = (e.clientX - r.left) / r.width - 0.5;
      ny = (e.clientY - r.top) / r.height - 0.5;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        hero.style.setProperty("--mx", nx.toFixed(3));
        hero.style.setProperty("--my", ny.toFixed(3));
      });
    };
    const onLeave = () => {
      hero.style.setProperty("--mx", "0");
      hero.style.setProperty("--my", "0");
    };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <header className="hero" ref={heroRef}>
      <div className="hero-mesh" aria-hidden="true">
        <span className="hero-blob hero-blob-1" />
        <span className="hero-blob hero-blob-2" />
        <span className="hero-blob hero-blob-3" />
      </div>

      {/* Floating decorative layer — desktop only, non-interactive */}
      <div className="hero-decor" aria-hidden="true">
        <div className="hero-code">
          <div className="hero-code-bar">
            <span className="dot dot-r" />
            <span className="dot dot-y" />
            <span className="dot dot-g" />
            <span className="hero-code-title">ashique.js</span>
          </div>
          <div className="hero-code-body">
            <div className="cl">
              <span className="c-kw">const</span>{" "}
              <span className="c-var">ashique</span> <span className="c-op">=</span>{" "}
              {"{"}
            </div>
            <div className="cl indent">
              <span className="c-prop">role</span>:{" "}
              <span className="c-str">"CS student"</span>,
            </div>
            <div className="cl indent">
              <span className="c-prop">focus</span>: [
              <span className="c-str">"AI/ML"</span>,{" "}
              <span className="c-str">"systems"</span>],
            </div>
            <div className="cl indent">
              <span className="c-prop">learning</span>:{" "}
              <span className="c-bool">true</span>,
            </div>
            <div className="cl">{"}"};</div>
          </div>
        </div>

        <span className="hero-badge badge-1">PY</span>
        <span className="hero-badge badge-2">C++</span>
        <span className="hero-badge badge-3">JS</span>
        <span className="hero-badge badge-4">GIT</span>
      </div>

      <div className="container hero-inner">
        <p className="eyebrow hero-enter hero-enter-1">Portfolio</p>
        <h1 className="hero-name hero-enter hero-enter-2">{profile.name}</h1>
        <p className="hero-tagline hero-enter hero-enter-3">{profile.tagline}</p>
        <div className="hero-enter hero-enter-4">
          <a className="hero-cta" href="#projects">
            View projects
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>

      <a className="hero-scroll" href="#about" aria-label="Scroll to content">
        <span className="hero-scroll-text">Scroll</span>
        <span className="hero-scroll-arrow" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </span>
      </a>
    </header>
  );
}
