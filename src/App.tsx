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
      if (hash) {
        const target = document.getElementById(hash.slice(1));

        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        return;
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollManager />
      <Navbar />
      <main className="flex-1">
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
