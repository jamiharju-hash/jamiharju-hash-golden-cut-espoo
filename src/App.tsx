import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { Scissors, Calendar, Package, Gift, Menu, Star, MapPin, Instagram, Link as LinkIcon, MenuIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./components/ui/button";

import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Inventory from "./pages/Inventory";
import GiftCards from "./pages/GiftCards";

function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { to: "/", label: "Overview", icon: Star },
    { to: "/appointments", label: "Appointments", icon: Calendar },
    { to: "/products", label: "Inventory", icon: Package },
    { to: "/gift-cards", label: "Gift Cards", icon: Gift },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-zinc-950 text-amber-500">
        <div className="flex items-center gap-2 font-bold text-xl uppercase tracking-widest">
          <Scissors className="w-6 h-6" />
          <span>Golden Cut</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <MenuIcon className="w-6 h-6 text-amber-500" />
        </Button>
      </div>

      {/* Sidebar */}
      <div className={`md:flex flex-col w-64 bg-zinc-950 text-zinc-400 border-r border-zinc-800 absolute md:relative min-h-screen z-50 ${mobileMenuOpen ? "flex" : "hidden"}`}>
        <div className="p-6 hidden md:flex items-center gap-3 text-amber-500 font-bold text-xl uppercase tracking-widest border-b border-zinc-800">
          <Scissors className="w-7 h-7" />
          <span>Golden Cut</span>
        </div>

        <div className="flex-1 py-6 px-4 space-y-2">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${
                  isActive
                    ? "bg-amber-500/10 text-amber-500"
                    : "hover:bg-zinc-900 hover:text-zinc-200"
                }`}
              >
                <link.icon className={`w-5 h-5 ${isActive ? "text-amber-500" : "text-zinc-500"}`} />
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-zinc-800 text-sm">
          <div className="flex flex-col space-y-2 text-zinc-500">
            <a href="https://maps.app.goo.gl/TfJYPNMMjTsrgR4CA" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-amber-500 transition-colors">
              <MapPin className="w-4 h-4" /> Espoon keskus
            </a>
            <a href="https://www.instagram.com/goldencut_parturi/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-amber-500 transition-colors">
              <Instagram className="w-4 h-4" /> @goldencut_parturi
            </a>
            <p className="flex items-center gap-2 mt-2">
              6 Years at same place
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-zinc-50 text-zinc-900">
        <Navigation />
        <main className="flex-1 overflow-x-hidden p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/products" element={<Inventory />} />
              <Route path="/gift-cards" element={<GiftCards />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}
