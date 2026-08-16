const socials = [
  { label: "Email", href: "mailto:kayra19206@gmail.com" },
  { label: "GitHub", href: "https://github.com/KayraBulbul" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kayra-bulbul-62834619a/",
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="folio-container footer-grid">
        <p className="footer-wordmark">Kayra Bulbul</p>
        <ul className="footer-links" aria-label="Social links">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {social.label} ↗
              </a>
            </li>
          ))}
        </ul>
        <p className="footer-colophon">
          Set in Bricolage Grotesque, Fraunces, and JetBrains Mono. Melbourne · ©{" "}
          {new Date().getFullYear()} Kayra Bulbul.
        </p>
      </div>
    </footer>
  );
}
