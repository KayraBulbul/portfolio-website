import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="page site-header__inner">
        <Link to="/" className="site-name">
          Kayra Bulbul
        </Link>
        <nav aria-label="Primary">
          <ul className="site-nav">
            <li>
              <NavLink to="/projects">Projects</NavLink>
            </li>
            <li>
              <NavLink to="/devlog">Devlog</NavLink>
            </li>
            <li>
              <a href="/Kayra_Bulbul_Resume.pdf" target="_blank" rel="noreferrer">
                Resume
              </a>
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
