type Link = { label: string; href: string; handle: string };

const links: Link[] = [
  {
    label: "Email",
    href: "mailto:kayra19206@gmail.com",
    handle: "kayra19206@gmail.com",
  },
  {
    label: "GitHub",
    href: "https://github.com/KayraBulbul",
    handle: "github.com/KayraBulbul",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kayra-bulbul-62834619a/",
    handle: "linkedin.com/in/kayra-bulbul",
  },
];

export default function Contact() {
  return (
    <section id="contact">
      <div className="container-narrow py-20 sm:py-28">
        <p className="section-heading mb-4">/ contact</p>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Let's talk
        </h2>
        <p className="mt-5 max-w-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          I'm open to internships, junior backend or data-engineering roles,
          and interesting side projects. The fastest way to reach me is email.
        </p>

        <ul className="mt-10 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex items-center justify-between py-5 transition-colors hover:text-accent"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 w-20">
                    {l.label}
                  </span>
                  <span className="text-base sm:text-lg">{l.handle}</span>
                </span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:text-accent"
                  aria-hidden
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
