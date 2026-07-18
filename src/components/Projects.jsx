import projects from "../data/projects.json";
import useReveal from "../hooks/useReveal";
import "./Projects.css";

// "2026-07" -> "2026". Falls back to the raw string if there's no dash.
function toYear(date) {
  return typeof date === "string" ? date.split("-")[0] : date;
}

// Track the cursor within an element so a soft light can follow it.
// Writes CSS custom properties directly to keep paint on the GPU and
// avoid React re-renders on every mouse move.
function handleMouseMove(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

function FeaturedRow({ project, index }) {
  const ref = useReveal();

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className="featured-row reveal-panel"
      ref={ref}
      onMouseMove={handleMouseMove}
    >
      <span className="featured-index">{String(index + 1).padStart(2, "0")}</span>
      <div className="featured-body">
        <div className="featured-head">
          <h3 className="featured-title">{project.title}</h3>
          <span className="featured-year">
            {toYear(project.date)}
            <span className="featured-arrow" aria-hidden="true">&#8599;</span>
          </span>
        </div>
        <p className="featured-desc">{project.description}</p>
        <ul className="featured-tags">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </a>
  );
}

function ProjectCard({ project }) {
  const ref = useReveal();

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className="project-card reveal-panel"
      ref={ref}
      onMouseMove={handleMouseMove}
    >
      <div className="project-card-top">
        <span className="project-date">{project.date}</span>
        <span className="project-arrow" aria-hidden="true">&#8599;</span>
      </div>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-description">{project.description}</p>
      <ul className="project-tags">
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </a>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const titleRef = useReveal();
  const moreRef = useReveal();

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="reveal" ref={titleRef}>
          <p className="eyebrow">Work</p>
          <h2 className="section-title" data-ghost="Work">Selected projects</h2>
        </div>

        {featured.length > 0 && (
          <div className="featured-list">
            {featured.map((project, i) => (
              <FeaturedRow key={project.title} project={project} index={i} />
            ))}
          </div>
        )}

        {rest.length > 0 && (
          <>
            <p className="eyebrow more-eyebrow reveal" ref={moreRef}>
              More work
            </p>
            <div className="project-grid">
              {rest.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
