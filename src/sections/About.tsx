export default function About() {
  return (
    <section id="about" className="folio-section folio-section--proof">
      <div className="folio-container">
        <header className="section-head section-head--compact">
          <h2>A bit about me</h2>
        </header>

        <div className="about-layout">
          <div className="about-copy">
            <p>
              I’m an undergraduate at <strong>RMIT University</strong> in Melbourne,
              studying Computer Science with minors in Enterprise Systems Development
              and Data Science. I’m drawn to the systems side of software, backends,
              data infrastructure and the plumbing that makes products feel reliable.
            </p>
            <p>
              My current focus is <strong>backend engineering</strong>,{" "}
              <strong>infrastructure</strong>, and <strong>systems</strong>. My recent work
              includes ETL/ELT pipelines, data warehouses on SQL Server &amp; PostgreSQL,
              and Node/Express APIs with TypeScript. I also enjoy low-level work and
              have been writing C and C++ to learn what’s actually happening under the
              hood.
            </p>
            <p>
              Outside of class, If I’m not breaking my Hyprland setup (I use arch btw),
              I’ll usually be playing video games or watching movies.
            </p>
          </div>

          <dl className="credential-ledger">
            <div>
              <dt>Education</dt>
              <dd>
                <strong>RMIT University</strong>
                <span>Bachelor of Computer Science</span>
                <span>Minors: Enterprise Systems Development, Data Science</span>
              </dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>Melbourne, Australia</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Backend engineering, infrastructure, and distributed systems.</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
