const EMAIL = "kayrabuldotdev@gmail.com";

const socials = [
  { label: "GitHub", href: "https://github.com/KayraBulbul" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kayra-bulbul-62834619a/" },
  { label: "X", href: "https://x.com/kayrabulbuldev" },
];

export default function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="page">
        <h2 className="section-title">Get in touch</h2>
        <p className="footer-intro">
          I&apos;m looking for internships and junior roles in backend,
          infrastructure, or systems work, and I&apos;m always happy to talk about
          side projects. Email is the fastest way to reach me.
        </p>
        <a className="footer-email" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
        <div className="footer-meta">
          <ul className="footer-links">
            {socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noreferrer">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <p>© {new Date().getFullYear()} Kayra Bulbul</p>
        </div>
      </div>
    </footer>
  );
}
