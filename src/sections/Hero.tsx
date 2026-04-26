export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] dark:opacity-[0.09]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
      />

      <div className="container-narrow relative py-24 sm:py-32">
        <p className="section-heading mb-6">/ portfolio</p>
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.05]">
          Hi, I'm <span className="text-accent">Kayra Bulbul</span>.
          <br />
          <span className="text-zinc-500 dark:text-zinc-400">
            Data/Software
          </span>{" "}
          <span className="text-zinc-500 dark:text-zinc-400">Engineer</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Computer Science student at RMIT University. I care about the parts of
          software you don't see. I like to create clean schemas, reliable
          pipelines and APIs.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            View projects
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md border border-zinc-300 px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent dark:border-zinc-700"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
