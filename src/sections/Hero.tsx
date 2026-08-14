export default function Hero() {
  return (
    <section id="top" className="folio-hero">
      <div className="folio-container hero-layout">
        <h1 className="hero-title">
          <span className="hero-title__intro">Hi, I’m Kayra Bulbul.</span>
          <span className="hero-title__role">Software</span>
          <span className="hero-title__break">Engineer</span>
        </h1>

        <div className="hero-lower">
          <p className="hero-summary">
            Computer Science student at RMIT University. I care about the parts of
            software you don’t see. I like building dependable backends, learning
            infrastructure, and understanding systems from the inside out.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="action-primary">
              View projects <span aria-hidden>↓</span>
            </a>
            <a href="#contact" className="action-link">
              Get in touch <span aria-hidden>↗</span>
            </a>
          </div>
        </div>

        <dl className="hero-facts">
          <div>
            <dt>Education</dt>
            <dd>RMIT University · Bachelor of Computer Science</dd>
          </div>
          <div>
            <dt>Focus</dt>
            <dd>Backend · Infrastructure · Systems</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>Melbourne, Australia</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
