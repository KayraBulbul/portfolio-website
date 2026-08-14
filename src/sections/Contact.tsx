type Link = { label: string; href: string; handle: string };

const links: Link[] = [
  {
    label: "Email",
    href: "mailto:kayrabuldotdev@gmail.com",
    handle: "kayrabuldotdev@gmail.com",
  },
  {
    label: "GitHub",
    href: "https://github.com/KayraBulbul",
    handle: "KayraBulbul",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kayra-bulbul-62834619a/",
    handle: "Kayra Bulbul",
  },
  {
    label: "X",
    href: "https://x.com/kayrabulbuldev",
    handle: "@kayrabulbuldev",
  },
  {
    label: "Resume",
    href: "/Kayra_Bulbul_Resume.pdf",
    handle: "Open here!",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="folio-section contact-section">
      <div className="folio-container contact-layout">
        <header className="section-head section-head--compact">
          <h2>Let&apos;s talk</h2>
        </header>
        <p className="contact-intro">
          I&apos;m open to internships, junior backend, infrastructure, or systems roles,
          and interesting side projects. The fastest way to reach me is email.
        </p>

        <ul className="contact-ledger">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={
                  link.href.startsWith("http") || link.href.endsWith(".pdf")
                    ? "_blank"
                    : undefined
                }
                rel={
                  link.href.startsWith("http") || link.href.endsWith(".pdf")
                    ? "noreferrer"
                    : undefined
                }
                className="contact-row"
              >
                <span className="contact-row__text">
                  <span>{link.label}</span>
                  <span>{link.handle}</span>
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
                  className="contact-row__arrow"
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
