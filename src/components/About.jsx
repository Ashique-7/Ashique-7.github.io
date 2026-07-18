import profile from "../data/profile.json";
import useReveal from "../hooks/useReveal";
import "./About.css";

export default function About() {
  const ref = useReveal();

  return (
    <section id="about" className="section">
      <div className="container about-grid">
        {/* Photo is always visible — no scroll-reveal gate, so it can't
            get stuck hidden. Only the text column animates in. */}
        <div className="about-photo">
          <img src={profile.photo} alt={profile.name} />
        </div>
        <div className="about-text reveal" ref={ref}>
          <p className="eyebrow">About</p>
          <h2 className="section-title" data-ghost="About">Who I am</h2>
          <p className="about-bio">{profile.bio}</p>
        </div>
      </div>
    </section>
  );
}
