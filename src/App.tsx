import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Devlog from "./pages/Devlog";
import DevlogPost from "./pages/DevlogPost";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
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
