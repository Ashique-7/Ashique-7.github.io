import profile from "../data/profile.json";
import useReveal from "../hooks/useReveal";
import "./Contact.css";

export default function Contact() {
  const ref = useReveal();

  return (
    <section id="contact" className="section">
      <div className="container reveal" ref={ref}>
        <p className="eyebrow">Get in touch</p>
        <h2 className="section-title" data-ghost="Contact">Let's talk</h2>
        <p className="contact-lead">
          Open to internships, collaborations, and interesting problems. Reach out any of these ways.
        </p>
        <div className="contact-links">
          <a className="contact-link" href={`mailto:${profile.email}`}>
            <span className="contact-label">Email</span>
            <span className="contact-detail">{profile.email}</span>
          </a>
          <a className="contact-link" href={profile.github} target="_blank" rel="noreferrer">
            <span className="contact-label">GitHub</span>
            <span className="contact-detail">{profile.github.replace("https://", "")}</span>
          </a>
          <a className="contact-link" href={profile.linkedin} target="_blank" rel="noreferrer">
            <span className="contact-label">LinkedIn</span>
            <span className="contact-detail">{profile.linkedin.replace("https://", "")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
