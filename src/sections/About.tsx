export default function About() {
  return (
    <section
      id="about"
      className="border-b border-zinc-200 dark:border-zinc-800"
    >
      <div className="container-narrow py-20 sm:py-24">
        <p className="section-heading mb-4">/ about</p>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          A bit about me
        </h2>

        <div className="mt-10 grid gap-10 md:grid-cols-3">
          <div className="md:col-span-2 space-y-5 text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <p>
              I'm an undergraduate at{" "}
              <span className="text-accent font-medium">RMIT University</span>{" "}
              in Melbourne, studying Computer Science with minors in Enterprise
              Systems Development and Data Science. I'm drawn to the systems
              side of software, backends, data infrastructure, and the plumbing
              that makes products feel reliable.
            </p>
            <p>
              Most of my recent work lives at the intersection of{" "}
              <span className="text-accent font-medium">
                backend engineering
              </span>{" "}
              and{" "}
              <span className="text-accent font-medium">data engineering</span>,
              though I have also been dabbling in{" "}
              <span className="text-accent font-medium">
                fullstack engineering
              </span>
              . Building ETL/ELT pipelines, modelling warehouses on SQL Server
              and PostgreSQL, and wiring up Node/Express APIs with TypeScript. I
              also enjoy lower-level work, I've been writing C and C++ to keep
              myself honest about what's actually happening underneath.
            </p>
            <p>
              Outside of class, I'm usually picking apart a new dataset,
              tinkering with my Hyprland setup (I use arch btw), or playing
              around with RAG and other applied-ML side projects.
            </p>
          </div>

          <aside className="space-y-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                Education
              </p>
              <p className="mt-2 text-sm">
                <span className="font-medium">RMIT University</span>
                <br />
                <span className="text-zinc-500">B.Sc. Computer Science</span>
                <br />
                <span className="text-zinc-500">
                  Minors: Enterprise Systems Development, Data Science
                </span>
              </p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                Location
              </p>
              <p className="mt-2 text-sm">Melbourne, Australia</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                Focus
              </p>
              <p className="mt-2 text-sm">
                Backend & data engineering, distributed systems, devops.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
