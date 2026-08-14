import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Devlog from "./pages/Devlog";
import DevlogPost from "./pages/DevlogPost";

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    window.requestAnimationFrame(() => {
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth";

      if (hash) {
        const target = document.getElementById(hash.slice(1));

        if (target) {
          target.scrollIntoView({ behavior, block: "start" });
        }

        return;
      }

      window.scrollTo({ top: 0, behavior });
    });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <div className="site-shell">
      <ScrollManager />
      <Navbar />
      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/devlog" element={<Devlog />} />
          <Route path="/devlog/:slug" element={<DevlogPost />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
