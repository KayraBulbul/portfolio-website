import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/#top", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#devlogs", label: "Devlogs" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const { pathname, hash } = useLocation();
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sections = links
      .map(({ href }) => document.getElementById(href.split("#")[1]))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    const updateActiveSection = () => {
      const readingLine = window.innerHeight * 0.36;
      const sectionInView = sections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= readingLine && bounds.bottom > readingLine;
      });

      if (sectionInView) {
        setActiveSection(sectionInView.id);
      }
    };

    const observer = new IntersectionObserver(updateActiveSection, {
      rootMargin: "-35% 0px -64% 0px",
      threshold: 0,
    });

    sections.forEach((section) => observer.observe(section));
    window.requestAnimationFrame(updateActiveSection);

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/" && hash) {
      setActiveSection(hash.slice(1));
    }
  }, [hash, pathname]);

  const isCurrent = (href: string) => {
    const targetHash = href.split("#")[1];

    if (pathname.startsWith("/devlog")) {
      return targetHash === "devlogs";
    }

    return pathname === "/" && targetHash === activeSection;
  };

  return (
    <header className="site-navigation">
      <nav className="rail-nav" aria-label="Primary navigation">
        <Link to="/#top" className="rail-wordmark" aria-label="Kayra Bulbul — home">
          <span>Kayra Bulbul</span>
          <span className="rail-wordmark__role">Engineer</span>
        </Link>

        <ol className="rail-index">
          {links.map((link, index) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className="rail-index__link"
                aria-current={isCurrent(link.href) ? "location" : undefined}
              >
                <span className="rail-index__number">{String(index + 1).padStart(2, "0")}</span>
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ol>

        <div className="rail-meta">
          <ThemeToggle />
        </div>
      </nav>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        <Link to="/#top" className="mobile-wordmark">
          Kayra Bulbul
        </Link>
        <div className="mobile-nav__actions">
          <ThemeToggle />
          <details className="mobile-index">
            <summary aria-label="Toggle navigation menu">
              <span className="mobile-menu-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </summary>
            <ol>
              {links.map((link, index) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    aria-current={isCurrent(link.href) ? "location" : undefined}
                    onClick={(event) =>
                      event.currentTarget.closest("details")?.removeAttribute("open")
                    }
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ol>
          </details>
        </div>
      </nav>
    </header>
  );
}
